import { Markup } from 'telegraf';
import { t } from '../utils/language.js';

export function getAdminKeyboard(lang = 'uz') {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback(t(lang, 'admin_stats'), 'admin_stats'),
    ],
    [
      Markup.button.callback(t(lang, 'admin_users'), 'admin_users'),
    ],
    [
      Markup.button.callback(t(lang, 'admin_announce'), 'admin_announce'),
    ],
    [
      Markup.button.callback(t(lang, 'admin_config'), 'admin_config'),
    ],
    [
      Markup.button.callback(t(lang, 'admin_health'), 'admin_health'),
    ],
    [
      Markup.button.callback(t(lang, 'back'), 'main_menu'),
    ]
  ]);
}

export function getAnnounceConfirmKeyboard(lang = 'uz') {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback(t(lang, 'confirm'), 'announce_confirm_yes'),
      Markup.button.callback(t(lang, 'cancel'), 'announce_confirm_no'),
    ]
  ]);
}
