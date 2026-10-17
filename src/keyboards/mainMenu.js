import { Markup } from 'telegraf';
import { t } from '../utils/language.js';

export function getMainMenuKeyboard(lang = 'uz') {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback(t(lang, 'menu_ai_chat'), 'mode_general'),
    ],
    [
      Markup.button.callback(t(lang, 'menu_study'), 'mode_study'),
      Markup.button.callback(t(lang, 'menu_coding'), 'mode_coding'),
    ],
    [
      Markup.button.callback(t(lang, 'menu_translation'), 'mode_translation'),
      Markup.button.callback(t(lang, 'menu_writing'), 'mode_writing'),
    ],
    [
      Markup.button.callback(t(lang, 'menu_creative'), 'mode_creative'),
    ],
    [
      Markup.button.callback(t(lang, 'menu_profile'), 'show_profile'),
      Markup.button.callback(t(lang, 'menu_settings'), 'show_settings'),
    ],
    [
      Markup.button.callback(t(lang, 'menu_help'), 'show_help'),
    ]
  ]);
}
