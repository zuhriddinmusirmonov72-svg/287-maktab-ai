import database from '../database.js';
import logger from '../logger.js';

export async function userTrackingMiddleware(ctx, next) {
  const userId = ctx.from?.id;
  
  if (!userId) {
    return next();
  }

  try {
    let user = database.getUser(userId);

    if (!user) {
      user = database.createUser(userId, {
        username: ctx.from.username,
        first_name: ctx.from.first_name,
        last_name: ctx.from.last_name,
        language_code: ctx.from.language_code?.startsWith('ru') ? 'ru' : 
                       ctx.from.language_code?.startsWith('en') ? 'en' : 'uz'
      });
      logger.info('New user registered', { userId, username: ctx.from.username });
    } else {
      // Update last active
      database.updateUser(userId, {});
    }

    // Store user in session
    ctx.session = ctx.session || {};
    ctx.session.user = user;

  } catch (error) {
    logger.error('User tracking error', error, { userId });
  }

  return next();
}
