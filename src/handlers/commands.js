import { t } from '../utils/language.js';
import conversationService from '../services/conversation.js';
import { getMainMenuKeyboard } from '../keyboards/mainMenu.js';

export async function handleHelp(ctx) {
  const lang = ctx.session?.user?.language_code || 'uz';
  
  const message = `${t(lang, 'help_title')}\n\n${t(lang, 'help_text')}`;
  
  if (ctx.callbackQuery) {
    await ctx.editMessageText(message, {
      parse_mode: 'Markdown',
      ...getMainMenuKeyboard(lang)
    });
    await ctx.answerCbQuery();
  } else {
    await ctx.reply(message, {
      parse_mode: 'Markdown',
      ...getMainMenuKeyboard(lang)
    });
  }
}

export async function handleNewChat(ctx) {
  const userId = ctx.from?.id;
  const lang = ctx.session?.user?.language_code || 'uz';
  
  conversationService.createNewChat(userId);
  
  await ctx.reply(t(lang, 'new_chat'), getMainMenuKeyboard(lang));
}

export async function handleClear(ctx) {
  const lang = ctx.session?.user?.language_code || 'uz';
  
  const { getClearConfirmKeyboard } = await import('../keyboards/settingsMenu.js');
  
  await ctx.reply(t(lang, 'clear_confirm'), getClearConfirmKeyboard(lang));
}

export async function handleCancel(ctx) {
  const lang = ctx.session?.user?.language_code || 'uz';
  
  // Clear any pending state if needed
  if (ctx.session) {
    ctx.session.pendingAnnouncement = null;
  }
  
  await ctx.reply(t(lang, 'clear_cancelled'), getMainMenuKeyboard(lang));
}

export async function handleLanguage(ctx) {
  const lang = ctx.session?.user?.language_code || 'uz';
  
  const { getLanguageKeyboard } = await import('../keyboards/settingsMenu.js');
  
  await ctx.reply(t(lang, 'language_select'), getLanguageKeyboard(lang));
}
