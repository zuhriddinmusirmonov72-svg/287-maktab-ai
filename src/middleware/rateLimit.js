import usageService from '../services/usage.js';
import { t } from '../utils/language.js';
import logger from '../logger.js';

const userStates = new Map();

export async function rateLimitMiddleware(ctx, next) {
  const userId = ctx.from?.id;
  
  if (!userId) {
    return next();
  }

  // Get or create user state
  if (!userStates.has(userId)) {
    userStates.set(userId, { lastRequest: 0 });
  }
  
  const userState = userStates.get(userId);
  const lang = ctx.session?.user?.language_code || 'uz';

  // Check cooldown
  const rateLimitCheck = usageService.checkRateLimit(userId, userState);
  if (!rateLimitCheck.allowed) {
    logger.debug('Rate limit hit', { userId, waitSeconds: rateLimitCheck.waitSeconds });
    await ctx.reply(t(lang, 'error_rate_limit', { seconds: rateLimitCheck.waitSeconds }));
    return;
  }

  // Check daily limit
  const usageCheck = usageService.canMakeRequest(userId);
  if (!usageCheck.allowed) {
    logger.debug('Daily limit hit', { userId, current: usageCheck.current, limit: usageCheck.limit });
    await ctx.reply(t(lang, 'error_daily_limit', { limit: usageCheck.limit }));
    return;
  }

  // Update last request time
  userState.lastRequest = Date.now();

  return next();
}
