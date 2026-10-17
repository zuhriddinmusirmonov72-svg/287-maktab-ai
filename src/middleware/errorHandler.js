import logger from '../logger.js';
import { t } from '../utils/language.js';

export async function errorHandlerMiddleware(ctx, next) {
  try {
    await next();
  } catch (error) {
    logger.error('Unhandled error in middleware', error, {
      userId: ctx.from?.id,
      updateType: ctx.updateType,
      chatId: ctx.chat?.id
    });

    const lang = ctx.session?.user?.language_code || 'uz';
    
    try {
      await ctx.reply(t(lang, 'error_generic'));
    } catch (replyError) {
      logger.error('Failed to send error message', replyError);
    }
  }
}
