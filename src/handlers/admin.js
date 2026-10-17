import config from '../config.js';
import { t } from '../utils/language.js';
import usageService from '../services/usage.js';
import database from '../database.js';
import { getAdminKeyboard, getAnnounceConfirmKeyboard } from '../keyboards/adminMenu.js';
import logger from '../logger.js';

function checkAdmin(ctx) {
  const userId = ctx.from?.id;
  if (!config.isAdmin(userId)) {
    const lang = ctx.session?.user?.language_code || 'uz';
    ctx.reply(t(lang, 'admin_unauthorized'));
    return false;
  }
  return true;
}

export async function handleAdminMenu(ctx) {
  if (!checkAdmin(ctx)) return;
  
  const lang = ctx.session?.user?.language_code || 'uz';
  const message = t(lang, 'admin_menu_title');
  
  await ctx.reply(message, getAdminKeyboard(lang));
}

export async function handleAdminStats(ctx) {
  if (!checkAdmin(ctx)) return;
  
  const lang = ctx.session?.user?.language_code || 'uz';
  const stats = usageService.getGlobalStats();
  
  const message = `${t(lang, 'stats_title')}\n\n` +
    `**${t(lang, 'stats_total_users')}:** ${stats.totalUsers}\n` +
    `**${t(lang, 'stats_active_today')}:** ${stats.activeToday}\n` +
    `**${t(lang, 'stats_requests_today')}:** ${stats.requestsToday}\n` +
    `**${t(lang, 'stats_success_rate')}:** ${stats.successRate}%\n` +
    `**${t(lang, 'stats_db_status')}:** ✅ Connected`;
  
  if (ctx.callbackQuery) {
    await ctx.editMessageText(message, {
      parse_mode: 'Markdown',
      ...getAdminKeyboard(lang)
    });
    await ctx.answerCbQuery();
  } else {
    await ctx.reply(message, {
      parse_mode: 'Markdown',
      ...getAdminKeyboard(lang)
    });
  }
}

export async function handleAdminUsers(ctx) {
  if (!checkAdmin(ctx)) return;
  
  const lang = ctx.session?.user?.language_code || 'uz';
  const stats = usageService.getGlobalStats();
  
  const message = `${t(lang, 'admin_users')}\n\n` +
    `**${t(lang, 'stats_total_users')}:** ${stats.totalUsers}\n` +
    `**${t(lang, 'stats_active_today')}:** ${stats.activeToday}`;
  
  if (ctx.callbackQuery) {
    await ctx.editMessageText(message, {
      parse_mode: 'Markdown',
      ...getAdminKeyboard(lang)
    });
    await ctx.answerCbQuery();
  } else {
    await ctx.reply(message, {
      parse_mode: 'Markdown',
      ...getAdminKeyboard(lang)
    });
  }
}

export async function handleAdminAnnounce(ctx) {
  if (!checkAdmin(ctx)) return;
  
  const lang = ctx.session?.user?.language_code || 'uz';
  
  ctx.session.awaitingAnnouncement = true;
  
  await ctx.reply(t(lang, 'announce_prompt'));
  
  if (ctx.callbackQuery) {
    await ctx.answerCbQuery();
  }
}

export async function handleAnnouncementText(ctx, text) {
  if (!checkAdmin(ctx)) return;
  
  const lang = ctx.session?.user?.language_code || 'uz';
  const users = database.getAllUsers();
  
  ctx.session.pendingAnnouncement = text;
  ctx.session.awaitingAnnouncement = false;
  
  const message = t(lang, 'announce_confirm', { count: users.length });
  
  await ctx.reply(message, getAnnounceConfirmKeyboard(lang));
}

export async function handleAnnouncementConfirm(ctx) {
  if (!checkAdmin(ctx)) return;
  
  const lang = ctx.session?.user?.language_code || 'uz';
  const announcement = ctx.session.pendingAnnouncement;
  
  if (!announcement) {
    await ctx.reply(t(lang, 'error_generic'));
    return;
  }
  
  await ctx.editMessageText(t(lang, 'announce_sending'));
  await ctx.answerCbQuery();
  
  const users = database.getAllUsers();
  let successCount = 0;
  let failCount = 0;
  
  for (const user of users) {
    try {
      await ctx.telegram.sendMessage(user.telegram_id, announcement);
      successCount++;
      
      // Rate limiting to avoid Telegram flood
      if (successCount % 20 === 0) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      failCount++;
      logger.warn('Failed to send announcement', { userId: user.telegram_id, error: error.message });
    }
  }
  
  ctx.session.pendingAnnouncement = null;
  
  await ctx.reply(t(lang, 'announce_complete', { success: successCount, failed: failCount }));
}

export async function handleAnnouncementCancel(ctx) {
  if (!checkAdmin(ctx)) return;
  
  const lang = ctx.session?.user?.language_code || 'uz';
  ctx.session.pendingAnnouncement = null;
  ctx.session.awaitingAnnouncement = false;
  
  await ctx.editMessageText(t(lang, 'announce_cancelled'));
  await ctx.answerCbQuery();
}

export async function handleAdminConfig(ctx) {
  if (!checkAdmin(ctx)) return;
  
  const lang = ctx.session?.user?.language_code || 'uz';
  const redactedConfig = config.getRedactedConfig();
  
  const message = `${t(lang, 'admin_config')}\n\n` +
    `**Model:** ${redactedConfig.openrouter.model}\n` +
    `**Timeout:** ${redactedConfig.openrouter.timeout}ms\n` +
    `**Daily Limit:** ${redactedConfig.limits.dailyUserLimit}\n` +
    `**Max History:** ${redactedConfig.limits.maxHistoryMessages}\n` +
    `**Timezone:** ${redactedConfig.system.timezone}\n` +
    `**Admins:** ${redactedConfig.admin.count}`;
  
  if (ctx.callbackQuery) {
    await ctx.editMessageText(message, {
      parse_mode: 'Markdown',
      ...getAdminKeyboard(lang)
    });
    await ctx.answerCbQuery();
  } else {
    await ctx.reply(message, {
      parse_mode: 'Markdown',
      ...getAdminKeyboard(lang)
    });
  }
}

export async function handleAdminHealth(ctx) {
  if (!checkAdmin(ctx)) return;
  
  const lang = ctx.session?.user?.language_code || 'uz';
  
  const uptime = process.uptime();
  const uptimeHours = Math.floor(uptime / 3600);
  const uptimeMinutes = Math.floor((uptime % 3600) / 60);
  
  const memUsage = process.memoryUsage();
  const memUsedMB = Math.round(memUsage.heapUsed / 1024 / 1024);
  const memTotalMB = Math.round(memUsage.heapTotal / 1024 / 1024);
  
  const message = `${t(lang, 'admin_health')}\n\n` +
    `**Status:** ✅ Running\n` +
    `**Uptime:** ${uptimeHours}h ${uptimeMinutes}m\n` +
    `**Memory:** ${memUsedMB}MB / ${memTotalMB}MB\n` +
    `**Database:** ✅ Connected\n` +
    `**Node.js:** ${process.version}`;
  
  if (ctx.callbackQuery) {
    await ctx.editMessageText(message, {
      parse_mode: 'Markdown',
      ...getAdminKeyboard(lang)
    });
    await ctx.answerCbQuery();
  } else {
    await ctx.reply(message, {
      parse_mode: 'Markdown',
      ...getAdminKeyboard(lang)
    });
  }
}
