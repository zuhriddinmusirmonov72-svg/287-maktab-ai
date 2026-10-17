import { t, getLanguageName } from '../utils/language.js';
import usageService from '../services/usage.js';
import { formatDate } from '../utils/formatting.js';
import { getMainMenuKeyboard } from '../keyboards/mainMenu.js';

export async function handleProfile(ctx) {
  const userId = ctx.from?.id;
  const lang = ctx.session?.user?.language_code || 'uz';
  const user = ctx.session?.user;

  if (!user) {
    await ctx.reply(t(lang, 'error_generic'));
    return;
  }

  const stats = usageService.getUserStats(userId);
  const usageCheck = usageService.canMakeRequest(userId);

  const modeNames = {
    general: t(lang, 'mode_general'),
    study: t(lang, 'mode_study'),
    coding: t(lang, 'mode_coding'),
    translation: t(lang, 'mode_translation'),
    writing: t(lang, 'mode_writing'),
    creative: t(lang, 'mode_creative')
  };

  const profileMessage = `${t(lang, 'profile_title')}\n\n` +
    `**${t(lang, 'profile_user_id')}:** ${userId}\n` +
    `**${t(lang, 'profile_registered')}:** ${formatDate(stats.registeredAt, lang)}\n` +
    `**${t(lang, 'profile_total_requests')}:** ${stats.totalRequests}\n` +
    `**${t(lang, 'profile_today_requests')}:** ${stats.todayRequests}\n` +
    `**${t(lang, 'profile_current_mode')}:** ${modeNames[user.ai_mode] || user.ai_mode}\n` +
    `**${t(lang, 'profile_language')}:** ${getLanguageName(lang)}\n\n` +
    `${t(lang, 'profile_limit_info', { used: usageCheck.current, total: usageCheck.limit })}`;

  await ctx.reply(profileMessage, {
    parse_mode: 'Markdown',
    ...getMainMenuKeyboard(lang)
  });
}
