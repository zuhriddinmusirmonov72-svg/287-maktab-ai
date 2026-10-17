import { Markup } from 'telegraf';
import { t } from '../utils/language.js';

export function getSettingsKeyboard(lang = 'uz') {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback(t(lang, 'settings_language'), 'settings_language'),
    ],
    [
      Markup.button.callback(t(lang, 'settings_mode'), 'settings_mode'),
    ],
    [
      Markup.button.callback(t(lang, 'settings_response_style'), 'settings_style'),
    ],
    [
      Markup.button.callback(t(lang, 'settings_clear'), 'settings_clear'),
    ],
    [
      Markup.button.callback(t(lang, 'back'), 'main_menu'),
    ]
  ]);
}

export function getLanguageKeyboard(lang = 'uz') {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback(t(lang, 'language_uzbek'), 'lang_uz'),
    ],
    [
      Markup.button.callback(t(lang, 'language_russian'), 'lang_ru'),
    ],
    [
      Markup.button.callback(t(lang, 'language_english'), 'lang_en'),
    ],
    [
      Markup.button.callback(t(lang, 'back'), 'show_settings'),
    ]
  ]);
}

export function getLanguageSelectionKeyboard() {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback('🇺🇿 O\'zbekcha', 'select_lang_uz'),
    ],
    [
      Markup.button.callback('🇷🇺 Русский', 'select_lang_ru'),
    ],
    [
      Markup.button.callback('🇬🇧 English', 'select_lang_en'),
    ]
  ]);
}

export function getModeKeyboard(lang = 'uz') {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback(`🤖 ${t(lang, 'mode_general')}`, 'setmode_general'),
    ],
    [
      Markup.button.callback(`📚 ${t(lang, 'mode_study')}`, 'setmode_study'),
    ],
    [
      Markup.button.callback(`💻 ${t(lang, 'mode_coding')}`, 'setmode_coding'),
    ],
    [
      Markup.button.callback(`🌐 ${t(lang, 'mode_translation')}`, 'setmode_translation'),
    ],
    [
      Markup.button.callback(`✍️ ${t(lang, 'mode_writing')}`, 'setmode_writing'),
    ],
    [
      Markup.button.callback(`🧠 ${t(lang, 'mode_creative')}`, 'setmode_creative'),
    ],
    [
      Markup.button.callback(t(lang, 'back'), 'show_settings'),
    ]
  ]);
}

export function getStyleKeyboard(lang = 'uz') {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback(t(lang, 'style_concise'), 'style_concise'),
    ],
    [
      Markup.button.callback(t(lang, 'style_detailed'), 'style_detailed'),
    ],
    [
      Markup.button.callback(t(lang, 'back'), 'show_settings'),
    ]
  ]);
}

export function getClearConfirmKeyboard(lang = 'uz') {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback(t(lang, 'clear_yes'), 'clear_confirm_yes'),
      Markup.button.callback(t(lang, 'clear_no'), 'clear_confirm_no'),
    ]
  ]);
}
