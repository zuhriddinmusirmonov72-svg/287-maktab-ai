const translations = {
  uz: {
    // Welcome and Menu
    welcome_title: "👋 UZ AI HUB ga xush kelibsiz!",
    welcome_description: "O'qish, dasturlash, tarjima, yozish va kundalik savollar uchun shaxsiy AI yordamchingiz.",
    welcome_instruction: "Quyida xizmatni tanlang yoki menga xabar yuboring.",
    
    // Main Menu Buttons
    menu_ai_chat: "🤖 AI Suhbat",
    menu_study: "📚 O'qish Yordamchisi",
    menu_coding: "💻 Dasturlash Yordamchisi",
    menu_translation: "🌐 Tarjima",
    menu_writing: "✍️ Yozish Yordamchisi",
    menu_creative: "🧠 Ijodiy G'oyalar",
    menu_profile: "👤 Mening Profilim",
    menu_settings: "⚙️ Sozlamalar",
    menu_help: "❓ Yordam",
    
    // Commands
    help_title: "📖 Yordam",
    help_text: "**Mavjud buyruqlar:**\n\n" +
      "/start - Botni boshlash\n" +
      "/menu - Asosiy menyu\n" +
      "/newchat - Yangi suhbat boshlash\n" +
      "/clear - Suhbat tarixini tozalash\n" +
      "/profile - Mening profilim\n" +
      "/settings - Sozlamalar\n" +
      "/language - Tilni o'zgartirish\n" +
      "/help - Yordam\n" +
      "/cancel - Bekor qilish\n\n" +
      "**Qanday foydalanish:**\n" +
      "Menga har qanday savol yoki vazifani yuboring va men sizga yordam beraman!",
    
    // Profile
    profile_title: "👤 Sizning profilingiz",
    profile_user_id: "Foydalanuvchi ID",
    profile_registered: "Ro'yxatdan o'tgan",
    profile_total_requests: "Jami so'rovlar",
    profile_today_requests: "Bugungi so'rovlar",
    profile_current_mode: "Joriy rejim",
    profile_language: "Til",
    profile_limit_info: "Kunlik limit: {used}/{total}",
    
    // Settings
    settings_title: "⚙️ Sozlamalar",
    settings_language: "🌐 Til",
    settings_mode: "🤖 AI Rejimi",
    settings_clear: "🗑️ Suhbatni Tozalash",
    settings_response_style: "📝 Javob Uslubi",
    settings_usage_info: "📊 Foydalanish Ma'lumoti",
    settings_privacy: "🔒 Maxfiylik",
    
    // Language Selection
    language_select: "Interfeys tilini tanlang:",
    language_uzbek: "🇺🇿 O'zbekcha",
    language_russian: "🇷🇺 Русский",
    language_english: "🇬🇧 English",
    language_changed: "Til o'zgartirildi: {language}",
    
    // AI Modes
    mode_general: "Umumiy Yordamchi",
    mode_study: "O'qish Yordamchisi",
    mode_coding: "Dasturlash Yordamchisi",
    mode_translation: "Tarjima",
    mode_writing: "Yozish Yordamchisi",
    mode_creative: "Ijodiy G'oyalar",
    mode_changed: "AI rejimi o'zgartirildi: {mode}",
    mode_select: "AI rejimini tanlang:",
    
    // Response Style
    style_concise: "Qisqa",
    style_detailed: "Batafsil",
    style_changed: "Javob uslubi o'zgartirildi: {style}",
    style_select: "Javob uslubini tanlang:",
    
    // Conversation
    new_chat: "✨ Yangi suhbat boshlandi!",
    clear_confirm: "Haqiqatan ham suhbat tarixini tozalamoqchimisiz?",
    clear_yes: "✅ Ha, tozalash",
    clear_no: "❌ Yo'q, bekor qilish",
    clear_success: "✅ Suhbat tarixi tozalandi.",
    clear_cancelled: "❌ Tozalash bekor qilindi.",
    
    // Errors
    error_generic: "❌ Xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.",
    error_ai_unavailable: "🤖 AI xizmati hozirda mavjud emas. Iltimos, keyinroq urinib ko'ring.",
    error_rate_limit: "⏳ Juda ko'p so'rovlar. Iltimos, {seconds} soniya kuting.",
    error_daily_limit: "📊 Kunlik limitingiz tugadi ({limit} so'rov). Ertaga qayta urinib ko'ring.",
    error_too_long: "📏 Xabar juda uzun. Maksimal uzunlik: {max} belgi.",
    error_no_message: "Iltimos, xabar yuboring.",
    
    // Admin
    admin_menu_title: "👨‍💼 Administrator Paneli",
    admin_stats: "📊 Statistika",
    admin_users: "👥 Foydalanuvchilar",
    admin_announce: "📢 E'lon",
    admin_config: "⚙️ Konfiguratsiya",
    admin_health: "❤️ Xizmat Holati",
    admin_unauthorized: "⛔ Ruxsat etilmagan.",
    
    // Stats
    stats_title: "📊 Statistika",
    stats_total_users: "Jami foydalanuvchilar",
    stats_active_today: "Bugun faol",
    stats_requests_today: "Bugungi so'rovlar",
    stats_success_rate: "Muvaffaqiyat darajasi",
    stats_db_status: "Ma'lumotlar bazasi",
    
    // Announcements
    announce_prompt: "📢 E'lon matnini yuboring:",
    announce_confirm: "Haqiqatan ham {count} foydalanuvchiga e'lon yubormoqchimisiz?",
    announce_sending: "E'lon yuborilmoqda...",
    announce_complete: "✅ E'lon {success} foydalanuvchiga yuborildi. Muvaffaqiyatsiz: {failed}",
    announce_cancelled: "❌ E'lon bekor qilindi.",
    
    // Misc
    back: "⬅️ Orqaga",
    cancel: "❌ Bekor qilish",
    confirm: "✅ Tasdiqlash",
    processing: "⏳ Ishlanmoqda...",
    done: "✅ Tayyor!",
  },
  
  ru: {
    // Welcome and Menu
    welcome_title: "👋 Добро пожаловать в UZ AI HUB!",
    welcome_description: "Ваш персональный AI-ассистент для обучения, программирования, перевода, написания текстов и повседневных вопросов.",
    welcome_instruction: "Выберите функцию ниже или просто отправьте мне сообщение.",
    
    // Main Menu Buttons
    menu_ai_chat: "🤖 AI Чат",
    menu_study: "📚 Помощник по Учёбе",
    menu_coding: "💻 Помощник по Программированию",
    menu_translation: "🌐 Перевод",
    menu_writing: "✍️ Помощник по Письму",
    menu_creative: "🧠 Творческие Идеи",
    menu_profile: "👤 Мой Профиль",
    menu_settings: "⚙️ Настройки",
    menu_help: "❓ Помощь",
    
    // Commands
    help_title: "📖 Помощь",
    help_text: "**Доступные команды:**\n\n" +
      "/start - Запустить бота\n" +
      "/menu - Главное меню\n" +
      "/newchat - Начать новый чат\n" +
      "/clear - Очистить историю\n" +
      "/profile - Мой профиль\n" +
      "/settings - Настройки\n" +
      "/language - Изменить язык\n" +
      "/help - Помощь\n" +
      "/cancel - Отмена\n\n" +
      "**Как использовать:**\n" +
      "Отправьте мне любой вопрос или задачу, и я помогу вам!",
    
    // Profile
    profile_title: "👤 Ваш профиль",
    profile_user_id: "ID пользователя",
    profile_registered: "Зарегистрирован",
    profile_total_requests: "Всего запросов",
    profile_today_requests: "Запросов сегодня",
    profile_current_mode: "Текущий режим",
    profile_language: "Язык",
    profile_limit_info: "Дневной лимит: {used}/{total}",
    
    // Settings
    settings_title: "⚙️ Настройки",
    settings_language: "🌐 Язык",
    settings_mode: "🤖 Режим AI",
    settings_clear: "🗑️ Очистить Чат",
    settings_response_style: "📝 Стиль Ответа",
    settings_usage_info: "📊 Информация об Использовании",
    settings_privacy: "🔒 Конфиденциальность",
    
    // Language Selection
    language_select: "Выберите язык интерфейса:",
    language_uzbek: "🇺🇿 O'zbekcha",
    language_russian: "🇷🇺 Русский",
    language_english: "🇬🇧 English",
    language_changed: "Язык изменён: {language}",
    
    // AI Modes
    mode_general: "Общий Помощник",
    mode_study: "Помощник по Учёбе",
    mode_coding: "Помощник по Программированию",
    mode_translation: "Перевод",
    mode_writing: "Помощник по Письму",
    mode_creative: "Творческие Идеи",
    mode_changed: "Режим AI изменён: {mode}",
    mode_select: "Выберите режим AI:",
    
    // Response Style
    style_concise: "Краткий",
    style_detailed: "Подробный",
    style_changed: "Стиль ответа изменён: {style}",
    style_select: "Выберите стиль ответа:",
    
    // Conversation
    new_chat: "✨ Начат новый чат!",
    clear_confirm: "Вы действительно хотите очистить историю чата?",
    clear_yes: "✅ Да, очистить",
    clear_no: "❌ Нет, отменить",
    clear_success: "✅ История чата очищена.",
    clear_cancelled: "❌ Очистка отменена.",
    
    // Errors
    error_generic: "❌ Произошла ошибка. Пожалуйста, попробуйте снова.",
    error_ai_unavailable: "🤖 AI-сервис временно недоступен. Пожалуйста, попробуйте позже.",
    error_rate_limit: "⏳ Слишком много запросов. Пожалуйста, подождите {seconds} секунд.",
    error_daily_limit: "📊 Вы достигли дневного лимита ({limit} запросов). Попробуйте завтра.",
    error_too_long: "📏 Сообщение слишком длинное. Максимальная длина: {max} символов.",
    error_no_message: "Пожалуйста, отправьте сообщение.",
    
    // Admin
    admin_menu_title: "👨‍💼 Панель Администратора",
    admin_stats: "📊 Статистика",
    admin_users: "👥 Пользователи",
    admin_announce: "📢 Объявление",
    admin_config: "⚙️ Конфигурация",
    admin_health: "❤️ Состояние Сервиса",
    admin_unauthorized: "⛔ Доступ запрещён.",
    
    // Stats
    stats_title: "📊 Статистика",
    stats_total_users: "Всего пользователей",
    stats_active_today: "Активных сегодня",
    stats_requests_today: "Запросов сегодня",
    stats_success_rate: "Успешность",
    stats_db_status: "База данных",
    
    // Announcements
    announce_prompt: "📢 Отправьте текст объявления:",
    announce_confirm: "Вы действительно хотите отправить объявление {count} пользователям?",
    announce_sending: "Отправка объявления...",
    announce_complete: "✅ Объявление отправлено {success} пользователям. Неудачно: {failed}",
    announce_cancelled: "❌ Объявление отменено.",
    
    // Misc
    back: "⬅️ Назад",
    cancel: "❌ Отмена",
    confirm: "✅ Подтвердить",
    processing: "⏳ Обработка...",
    done: "✅ Готово!",
  },
  
  en: {
    // Welcome and Menu
    welcome_title: "👋 Welcome to UZ AI HUB!",
    welcome_description: "Your personal AI assistant for learning, coding, translation, writing, and everyday questions.",
    welcome_instruction: "Choose a feature below or simply send me a message.",
    
    // Main Menu Buttons
    menu_ai_chat: "🤖 AI Chat",
    menu_study: "📚 Study Assistant",
    menu_coding: "💻 Coding Assistant",
    menu_translation: "🌐 Translation",
    menu_writing: "✍️ Writing Assistant",
    menu_creative: "🧠 Creative Ideas",
    menu_profile: "👤 My Profile",
    menu_settings: "⚙️ Settings",
    menu_help: "❓ Help",
    
    // Commands
    help_title: "📖 Help",
    help_text: "**Available commands:**\n\n" +
      "/start - Start the bot\n" +
      "/menu - Main menu\n" +
      "/newchat - Start a new chat\n" +
      "/clear - Clear chat history\n" +
      "/profile - My profile\n" +
      "/settings - Settings\n" +
      "/language - Change language\n" +
      "/help - Help\n" +
      "/cancel - Cancel\n\n" +
      "**How to use:**\n" +
      "Send me any question or task, and I'll help you!",
    
    // Profile
    profile_title: "👤 Your Profile",
    profile_user_id: "User ID",
    profile_registered: "Registered",
    profile_total_requests: "Total Requests",
    profile_today_requests: "Today's Requests",
    profile_current_mode: "Current Mode",
    profile_language: "Language",
    profile_limit_info: "Daily limit: {used}/{total}",
    
    // Settings
    settings_title: "⚙️ Settings",
    settings_language: "🌐 Language",
    settings_mode: "🤖 AI Mode",
    settings_clear: "🗑️ Clear Chat",
    settings_response_style: "📝 Response Style",
    settings_usage_info: "📊 Usage Information",
    settings_privacy: "🔒 Privacy",
    
    // Language Selection
    language_select: "Select interface language:",
    language_uzbek: "🇺🇿 O'zbekcha",
    language_russian: "🇷🇺 Русский",
    language_english: "🇬🇧 English",
    language_changed: "Language changed: {language}",
    
    // AI Modes
    mode_general: "General Assistant",
    mode_study: "Study Assistant",
    mode_coding: "Coding Assistant",
    mode_translation: "Translation",
    mode_writing: "Writing Assistant",
    mode_creative: "Creative Ideas",
    mode_changed: "AI mode changed: {mode}",
    mode_select: "Select AI mode:",
    
    // Response Style
    style_concise: "Concise",
    style_detailed: "Detailed",
    style_changed: "Response style changed: {style}",
    style_select: "Select response style:",
    
    // Conversation
    new_chat: "✨ New chat started!",
    clear_confirm: "Do you really want to clear the chat history?",
    clear_yes: "✅ Yes, clear",
    clear_no: "❌ No, cancel",
    clear_success: "✅ Chat history cleared.",
    clear_cancelled: "❌ Clear cancelled.",
    
    // Errors
    error_generic: "❌ An error occurred. Please try again.",
    error_ai_unavailable: "🤖 AI service is temporarily unavailable. Please try later.",
    error_rate_limit: "⏳ Too many requests. Please wait {seconds} seconds.",
    error_daily_limit: "📊 You've reached your daily limit ({limit} requests). Try again tomorrow.",
    error_too_long: "📏 Message is too long. Maximum length: {max} characters.",
    error_no_message: "Please send a message.",
    
    // Admin
    admin_menu_title: "👨‍💼 Administrator Panel",
    admin_stats: "📊 Statistics",
    admin_users: "👥 Users",
    admin_announce: "📢 Announcement",
    admin_config: "⚙️ Configuration",
    admin_health: "❤️ Service Health",
    admin_unauthorized: "⛔ Unauthorized.",
    
    // Stats
    stats_title: "📊 Statistics",
    stats_total_users: "Total Users",
    stats_active_today: "Active Today",
    stats_requests_today: "Requests Today",
    stats_success_rate: "Success Rate",
    stats_db_status: "Database",
    
    // Announcements
    announce_prompt: "📢 Send announcement text:",
    announce_confirm: "Do you really want to send an announcement to {count} users?",
    announce_sending: "Sending announcement...",
    announce_complete: "✅ Announcement sent to {success} users. Failed: {failed}",
    announce_cancelled: "❌ Announcement cancelled.",
    
    // Misc
    back: "⬅️ Back",
    cancel: "❌ Cancel",
    confirm: "✅ Confirm",
    processing: "⏳ Processing...",
    done: "✅ Done!",
  }
};

export function t(lang, key, params = {}) {
  const langData = translations[lang] || translations.uz;
  let text = langData[key] || translations.en[key] || key;
  
  // Replace parameters
  for (const [param, value] of Object.entries(params)) {
    text = text.replace(new RegExp(`\\{${param}\\}`, 'g'), value);
  }
  
  return text;
}

export function getLanguageName(lang) {
  const names = {
    uz: "O'zbekcha",
    ru: "Русский",
    en: "English"
  };
  return names[lang] || names.uz;
}

export default { t, getLanguageName };
