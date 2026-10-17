import { Telegraf } from 'telegraf';
import config from './config.js';
import logger from './logger.js';
import database from './database.js';
import { errorHandlerMiddleware } from './middleware/errorHandler.js';
import { userTrackingMiddleware } from './middleware/userTracking.js';
import { rateLimitMiddleware } from './middleware/rateLimit.js';
import { handleStart, handleMenu } from './handlers/start.js';
import { handleHelp, handleNewChat, handleClear, handleCancel, handleLanguage } from './handlers/commands.js';
import { handleProfile } from './handlers/profile.js';
import { handleSettings } from './handlers/settings.js';
import { handleChatMessage } from './handlers/chat.js';
import { handleAdminMenu } from './handlers/admin.js';
import { handleAnnouncementText } from './handlers/admin.js';
import { registerCallbacks } from './handlers/callbacks.js';

class Bot {
  constructor() {
    this.bot = null;
    this.isShuttingDown = false;
  }

  async initialize() {
    try {
      // Initialize database
      database.initialize();

      // Create bot instance
      this.bot = new Telegraf(config.telegram.botToken);

      // Error handling middleware (must be first)
      this.bot.catch((error, ctx) => {
        logger.error('Telegraf error', error, { 
          userId: ctx.from?.id,
          updateType: ctx.updateType 
        });
      });

      // Global middleware
      this.bot.use(errorHandlerMiddleware);
      this.bot.use(userTrackingMiddleware);

      // Commands
      this.bot.command('start', handleStart);
      this.bot.command('menu', handleMenu);
      this.bot.command('help', handleHelp);
      this.bot.command('newchat', handleNewChat);
      this.bot.command('clear', handleClear);
      this.bot.command('profile', handleProfile);
      this.bot.command('settings', handleSettings);
      this.bot.command('language', handleLanguage);
      this.bot.command('cancel', handleCancel);
      this.bot.command('admin', handleAdminMenu);

      // Register all callbacks
      registerCallbacks(this.bot);

      // Text messages with rate limiting
      this.bot.on('text', rateLimitMiddleware, async (ctx) => {
        // Check if admin is sending announcement
        if (ctx.session?.awaitingAnnouncement && config.isAdmin(ctx.from?.id)) {
          await handleAnnouncementText(ctx, ctx.message.text);
          return;
        }

        // Regular chat message
        await handleChatMessage(ctx);
      });

      // Handle unsupported update types gracefully
      this.bot.on('sticker', async (ctx) => {
        const lang = ctx.session?.user?.language_code || 'uz';
        await ctx.reply('👍');
      });

      this.bot.on('photo', async (ctx) => {
        const lang = ctx.session?.user?.language_code || 'uz';
        await ctx.reply('📷 ' + (lang === 'uz' ? 'Rasm qabul qilindi' : 
                               lang === 'ru' ? 'Изображение получено' : 
                               'Image received'));
      });

      logger.info('Bot initialized successfully');
    } catch (error) {
      logger.error('Failed to initialize bot', error);
      throw error;
    }
  }

  async start() {
    try {
      // Setup graceful shutdown
      process.once('SIGINT', () => this.stop('SIGINT'));
      process.once('SIGTERM', () => this.stop('SIGTERM'));
      process.once('SIGHUP', () => this.stop('SIGHUP'));

      // Start bot with long polling
      await this.bot.launch({
        dropPendingUpdates: config.isDevelopment(),
      });

      const botInfo = await this.bot.telegram.getMe();
      logger.info('Bot started successfully', { 
        username: botInfo.username,
        id: botInfo.id,
        environment: config.system.nodeEnv
      });

      console.log(`\n✅ Bot is running as @${botInfo.username}`);
      console.log(`📊 Environment: ${config.system.nodeEnv}`);
      console.log(`🤖 AI Model: ${config.openrouter.model}`);
      console.log(`👥 Admins: ${config.admin.ids.length}`);
      console.log(`\nPress Ctrl+C to stop\n`);

    } catch (error) {
      logger.error('Failed to start bot', error);
      throw error;
    }
  }

  async stop(signal) {
    if (this.isShuttingDown) {
      return;
    }

    this.isShuttingDown = true;
    logger.info(`Received ${signal}, shutting down gracefully...`);

    try {
      if (this.bot) {
        await this.bot.stop(signal);
      }

      database.close();

      logger.info('Bot stopped successfully');
      process.exit(0);
    } catch (error) {
      logger.error('Error during shutdown', error);
      process.exit(1);
    }
  }
}

export default Bot;
