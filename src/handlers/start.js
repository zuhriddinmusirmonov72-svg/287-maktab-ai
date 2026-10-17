import { t } from '../utils/language.js';
import { getMainMenuKeyboard } from '../keyboards/mainMenu.js';
import { getLanguageSelectionKeyboard } from '../keyboards/settingsMenu.js';
import database from '../database.js';
import logger from '../logger.js';

export async function handleStart(ctx) {
  const userId = ctx.from?.id;
  const user = ctx.session?.user;
  
  logger.info('Start command', { userId: ctx.from?.id, username: ctx.from?.username });

  // Check if this is a new user or user hasn't selected language yet
  if (!user || !user.language_code || user.language_code === 'uz') {
    // Show language selection first
    const message = "🌐 Tilni tanlang / Выберите язык / Choose language:";
    await ctx.reply(message, getLanguageSelectionKeyboard());
    
    // Mark that we're waiting for language selection
    ctx.session.awaitingLanguageSelection = true;
  } else {
    // User already has language preference, show main menu
    const lang = user.language_code;
    const welcomeMessage = `${t(lang, 'welcome_title')}\n\n${t(lang, 'welcome_description')}\n\n${t(lang, 'welcome_instruction')}`;
    await ctx.reply(welcomeMessage, getMainMenuKeyboard(lang));
  }
}

export async function handleMenu(ctx) {
  const lang = ctx.session?.user?.language_code || 'uz';
  
  const menuMessage = `${t(lang, 'welcome_title')}\n\n${t(lang, 'welcome_instruction')}`;

  await ctx.reply(menuMessage, getMainMenuKeyboard(lang));
}
