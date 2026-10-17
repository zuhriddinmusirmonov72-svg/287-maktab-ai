import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

class Config {
  constructor() {
    this.telegram = {
      botToken: process.env.TELEGRAM_BOT_TOKEN || '',
    };

    this.openrouter = {
      apiKey: process.env.OPENROUTER_API_KEY || '',
      model: process.env.OPENROUTER_MODEL || 'openrouter/free',
      timeout: parseInt(process.env.AI_TIMEOUT_MS) || 60000,
    };

    this.admin = {
      ids: this.parseAdminIds(process.env.ADMIN_IDS || ''),
    };

    this.database = {
      path: process.env.DATABASE_PATH || './data/uz-ai-hub.db',
    };

    this.limits = {
      dailyUserLimit: parseInt(process.env.DAILY_USER_LIMIT) || 30,
      userCooldownSeconds: parseInt(process.env.USER_COOLDOWN_SECONDS) || 2,
      maxHistoryMessages: parseInt(process.env.MAX_HISTORY_MESSAGES) || 12,
      maxInputLength: parseInt(process.env.MAX_INPUT_LENGTH) || 6000,
    };

    this.system = {
      timezone: process.env.TIMEZONE || 'Asia/Tashkent',
      nodeEnv: process.env.NODE_ENV || 'development',
    };
  }

  parseAdminIds(idsString) {
    if (!idsString) return [];
    return idsString
      .split(',')
      .map(id => id.trim())
      .filter(id => id.length > 0)
      .map(id => parseInt(id))
      .filter(id => !isNaN(id));
  }

  validate() {
    const errors = [];

    if (!this.telegram.botToken) {
      errors.push('TELEGRAM_BOT_TOKEN is required');
    }

    if (!this.openrouter.apiKey) {
      errors.push('OPENROUTER_API_KEY is required');
    }

    if (!this.openrouter.model) {
      errors.push('OPENROUTER_MODEL is required');
    }

    if (this.admin.ids.length === 0) {
      errors.push('ADMIN_IDS should contain at least one administrator Telegram ID');
    }

    if (this.limits.dailyUserLimit < 1) {
      errors.push('DAILY_USER_LIMIT must be at least 1');
    }

    if (this.limits.maxHistoryMessages < 1) {
      errors.push('MAX_HISTORY_MESSAGES must be at least 1');
    }

    return errors;
  }

  isAdmin(userId) {
    return this.admin.ids.includes(userId);
  }

  isDevelopment() {
    return this.system.nodeEnv === 'development';
  }

  getRedactedConfig() {
    return {
      telegram: { botToken: this.telegram.botToken ? '***' : 'NOT SET' },
      openrouter: {
        apiKey: this.openrouter.apiKey ? '***' : 'NOT SET',
        model: this.openrouter.model,
        timeout: this.openrouter.timeout,
      },
      admin: { count: this.admin.ids.length },
      database: this.database,
      limits: this.limits,
      system: this.system,
    };
  }
}

export default new Config();
