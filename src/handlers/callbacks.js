import database from '../database.js';
import conversationService from '../services/conversation.js';
import { t, getLanguageName } from '../utils/language.js';
import { getMainMenuKeyboard } from '../keyboards/mainMenu.js';
import { getSettingsKeyboard } from '../keyboards/settingsMenu.js';
import * as settingsHandlers from './settings.js';
import * as adminHandlers from './admin.js';
import { handleStart } from './start.js';
import { handleHelp } from './commands.js';
import { handleProfile } from './profile.js';
import logger from '../logger.js';

export function registerCallbacks(bot) {
  // Main menu
  bot.action('main_menu', async (ctx) => {
    await handleStart(ctx);
    await ctx.answerCbQuery();
  });

  bot.action('show_help', handleHelp);
  bot.action('show_profile', handleProfile);
  bot.action('show_settings', settingsHandlers.handleSettings);

  // AI Mode selection
  bot.action(/^mode_(.+)$/, async (ctx) => {
    const mode = ctx.match[1];
    const userId = ctx.from?.id;
    const lang = ctx.session?.user?.language_code || 'uz';

    database.updateUser(userId, { ai_mode: mode });
    ctx.session.user.ai_mode = mode;

    const modeNames = {
      general: t(lang, 'mode_general'),
      study: t(lang, 'mode_study'),
      coding: t(lang, 'mode_coding'),
      translation: t(lang, 'mode_translation'),
      writing: t(lang, 'mode_writing'),
      creative: t(lang, 'mode_creative')
    };

    const modeDescriptions = {
      uz: {
        general: "Endi umumiy yordamchi rejimida ishlayman. Menga har qanday savol bering!",
        study: "O'qish yordamchisi rejimida. Menga maktab fanlaridan savol bering, men bosqichma-bosqich tushuntiraman!",
        coding: "Dasturlash yordamchisi rejimida. Kod, xatolar va dasturlash haqida savol bering!",
        translation: "Tarjima rejimida. Matnni yuboring va qaysi tilga tarjima kerakligini ayting!",
        writing: "Yozish yordamchisi rejimida. Matn yozishda yordam beraman!",
        creative: "Ijodiy g'oyalar rejimida. Loyiha g'oyalari va ijodiy fikrlar uchun suhbatlashamiz!"
      },
      ru: {
        general: "Теперь работаю в режиме общего помощника. Задавайте любые вопросы!",
        study: "Режим помощника по учёбе. Спрашивайте о школьных предметах, я объясню шаг за шагом!",
        coding: "Режим помощника по программированию. Спрашивайте о коде, ошибках и программировании!",
        translation: "Режим перевода. Отправьте текст и скажите на какой язык перевести!",
        writing: "Режим помощника по письму. Помогу с написанием текста!",
        creative: "Режим творческих идей. Давайте обсудим идеи проектов и творческие мысли!"
      },
      en: {
        general: "Now working in general assistant mode. Ask me anything!",
        study: "Study assistant mode. Ask about school subjects, I'll explain step by step!",
        coding: "Coding assistant mode. Ask about code, errors and programming!",
        translation: "Translation mode. Send text and tell me which language to translate to!",
        writing: "Writing assistant mode. I'll help with writing text!",
        creative: "Creative ideas mode. Let's discuss project ideas and creative thoughts!"
      }
    };

    const description = modeDescriptions[lang]?.[mode] || modeDescriptions.en[mode];

    // Delete the menu message and send simple mode change confirmation
    await ctx.deleteMessage().catch(() => {});
    await ctx.reply(`✅ ${modeNames[mode]}\n\n${description}`);
    await ctx.answerCbQuery();
  });

  // Settings
  bot.action('settings_language', settingsHandlers.handleLanguageSettings);
  bot.action('settings_mode', settingsHandlers.handleModeSettings);
  bot.action('settings_style', settingsHandlers.handleStyleSettings);
  bot.action('settings_clear', settingsHandlers.handleClearSettings);

  // Initial language selection (from /start)
  bot.action(/^select_lang_(.+)$/, async (ctx) => {
    const newLang = ctx.match[1];
    const userId = ctx.from?.id;

    database.updateUser(userId, { language_code: newLang });
    ctx.session.user.language_code = newLang;
    ctx.session.awaitingLanguageSelection = false;

    // Show welcome message in selected language
    const welcomeMessage = `${t(newLang, 'welcome_title')}\n\n${t(newLang, 'welcome_description')}\n\n${t(newLang, 'welcome_instruction')}`;
    
    await ctx.editMessageText(welcomeMessage, getMainMenuKeyboard(newLang));
    await ctx.answerCbQuery(t(newLang, 'done'));
  });

  // Language selection from settings
  bot.action(/^lang_(.+)$/, async (ctx) => {
    const newLang = ctx.match[1];
    const userId = ctx.from?.id;

    database.updateUser(userId, { language_code: newLang });
    ctx.session.user.language_code = newLang;

    await ctx.editMessageText(
      t(newLang, 'language_changed', { language: getLanguageName(newLang) }),
      getSettingsKeyboard(newLang)
    );
    await ctx.answerCbQuery(t(newLang, 'done'));
  });

  // Mode selection from settings
  bot.action(/^setmode_(.+)$/, async (ctx) => {
    const mode = ctx.match[1];
    const userId = ctx.from?.id;
    const lang = ctx.session?.user?.language_code || 'uz';

    database.updateUser(userId, { ai_mode: mode });
    ctx.session.user.ai_mode = mode;

    const modeNames = {
      general: t(lang, 'mode_general'),
      study: t(lang, 'mode_study'),
      coding: t(lang, 'mode_coding'),
      translation: t(lang, 'mode_translation'),
      writing: t(lang, 'mode_writing'),
      creative: t(lang, 'mode_creative')
    };

    const modeDescriptions = {
      uz: {
        general: "Umumiy yordamchi",
        study: "O'qish yordamchisi",
        coding: "Dasturlash yordamchisi",
        translation: "Tarjima",
        writing: "Yozish yordamchisi",
        creative: "Ijodiy g'oyalar"
      },
      ru: {
        general: "Общий помощник",
        study: "Помощник по учёбе",
        coding: "Помощник по программированию",
        translation: "Перевод",
        writing: "Помощник по письму",
        creative: "Творческие идеи"
      },
      en: {
        general: "General assistant",
        study: "Study assistant",
        coding: "Coding assistant",
        translation: "Translation",
        writing: "Writing assistant",
        creative: "Creative ideas"
      }
    };

    await ctx.editMessageText(
      `✅ ${t(lang, 'mode_changed', { mode: modeNames[mode] || mode })}\n\n📝 ${modeDescriptions[lang]?.[mode] || mode}`,
      getSettingsKeyboard(lang)
    );
    await ctx.answerCbQuery(t(lang, 'done'));
  });

  // Response style
  bot.action(/^style_(.+)$/, async (ctx) => {
    const style = ctx.match[1];
    const userId = ctx.from?.id;
    const lang = ctx.session?.user?.language_code || 'uz';

    database.updateUser(userId, { response_style: style });
    ctx.session.user.response_style = style;

    const styleName = t(lang, `style_${style}`);

    await ctx.editMessageText(
      t(lang, 'style_changed', { style: styleName }),
      getSettingsKeyboard(lang)
    );
    await ctx.answerCbQuery(t(lang, 'done'));
  });

  // Clear conversation
  bot.action('clear_confirm_yes', async (ctx) => {
    const userId = ctx.from?.id;
    const lang = ctx.session?.user?.language_code || 'uz';

    conversationService.clearHistory(userId);

    await ctx.editMessageText(
      t(lang, 'clear_success'),
      getSettingsKeyboard(lang)
    );
    await ctx.answerCbQuery(t(lang, 'done'));
  });

  bot.action('clear_confirm_no', async (ctx) => {
    const lang = ctx.session?.user?.language_code || 'uz';

    await ctx.editMessageText(
      t(lang, 'clear_cancelled'),
      getSettingsKeyboard(lang)
    );
    await ctx.answerCbQuery();
  });

  // Admin callbacks
  bot.action('admin_stats', adminHandlers.handleAdminStats);
  bot.action('admin_users', adminHandlers.handleAdminUsers);
  bot.action('admin_announce', adminHandlers.handleAdminAnnounce);
  bot.action('admin_config', adminHandlers.handleAdminConfig);
  bot.action('admin_health', adminHandlers.handleAdminHealth);
  bot.action('announce_confirm_yes', adminHandlers.handleAnnouncementConfirm);
  bot.action('announce_confirm_no', adminHandlers.handleAnnouncementCancel);

  logger.info('Callbacks registered');
}
