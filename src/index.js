import config from './config.js';
import logger from './logger.js';
import Bot from './bot.js';

async function main() {
  try {
    // Print startup banner
    console.log('\n' + '='.repeat(50));
    console.log('🤖 UZ AI HUB - Telegram AI Assistant');
    console.log('='.repeat(50) + '\n');

    // Validate configuration
    const errors = config.validate();
    if (errors.length > 0) {
      console.error('❌ Configuration errors:\n');
      errors.forEach(error => console.error(`   - ${error}`));
      console.error('\n💡 Please check your .env file and ensure all required variables are set.\n');
      process.exit(1);
    }

    logger.info('Configuration validated successfully');
    logger.debug('Configuration', { config: config.getRedactedConfig() });

    // Initialize and start bot
    const bot = new Bot();
    await bot.initialize();
    await bot.start();

  } catch (error) {
    logger.error('Fatal error during startup', error);
    console.error('\n❌ Failed to start bot:', error.message);
    console.error('\nPlease check the logs and your configuration.\n');
    process.exit(1);
  }
}

// Handle uncaught errors
process.on('uncaughtException', (error) => {
  logger.error('Uncaught exception', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled rejection', reason);
  process.exit(1);
});

// Start the application
main();
