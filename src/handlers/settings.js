import { t } from '../utils/language.js';
import { 
  getSettingsKeyboard, 
  getLanguageKeyboard, 
  getModeKeyboard, 
  getStyleKeyboard,
  getClearConfirmKeyboard 
} from '../keyboards/settingsMenu.js';

export async function handleSettings(ctx) {
  const lang = ctx.session?.user?.language_code || 'uz';
  
  const message = t(lang, 'settings_title');
  
  if (ctx.callbackQuery) {
    await ctx.editMessageText(message, getSettingsKeyboard(lang));
    await ctx.answerCbQuery();
  } else {
    await ctx.reply(message, getSettingsKeyboard(lang));
  }
}

export async function handleLanguageSettings(ctx) {
  const lang = ctx.session?.user?.language_code || 'uz';
  
  const message = t(lang, 'language_select');
  
  await ctx.editMessageText(message, getLanguageKeyboard(lang));
  await ctx.answerCbQuery();
}

export async function handleModeSettings(ctx) {
  const lang = ctx.session?.user?.language_code || 'uz';
  
  const message = t(lang, 'mode_select');
  
  await ctx.editMessageText(message, getModeKeyboard(lang));
  await ctx.answerCbQuery();
}

export async function handleStyleSettings(ctx) {
  const lang = ctx.session?.user?.language_code || 'uz';
  
  const message = t(lang, 'style_select');
  
  await ctx.editMessageText(message, getStyleKeyboard(lang));
  await ctx.answerCbQuery();
}

export async function handleClearSettings(ctx) {
  const lang = ctx.session?.user?.language_code || 'uz';
  
  const message = t(lang, 'clear_confirm');
  
  await ctx.editMessageText(message, getClearConfirmKeyboard(lang));
  await ctx.answerCbQuery();
}
