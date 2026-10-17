import aiService from '../services/ai.js';
import conversationService from '../services/conversation.js';
import usageService from '../services/usage.js';
import config from '../config.js';
import { t } from '../utils/language.js';
import { splitLongMessage } from '../utils/formatting.js';
import logger from '../logger.js';

export async function handleChatMessage(ctx) {
  const userId = ctx.from?.id;
  const messageText = ctx.message?.text;
  const lang = ctx.session?.user?.language_code || 'uz';
  const aiMode = ctx.session?.user?.ai_mode || 'general';
  const responseStyle = ctx.session?.user?.response_style || 'concise';

  if (!messageText) {
    await ctx.reply(t(lang, 'error_no_message'));
    return;
  }

  // Validate input
  const validation = aiService.validateInput(messageText, config.limits.maxInputLength);
  if (!validation.valid) {
    if (validation.error === 'too_long') {
      await ctx.reply(t(lang, 'error_too_long', { max: validation.maxLength }));
    } else {
      await ctx.reply(t(lang, 'error_no_message'));
    }
    return;
  }

  // Show typing indicator
  await ctx.sendChatAction('typing');

  try {
    // Add user message to conversation
    conversationService.addUserMessage(userId, validation.text);

    // Get conversation history
    const history = conversationService.getFormattedHistory(userId);

    // Get AI response
    const aiResponse = await aiService.chat(history, aiMode, lang, responseStyle);

    if (!aiResponse.success) {
      // Record failed request
      usageService.recordRequest(userId, 'ai_chat', false, aiResponse.error);
      
      logger.warn('AI request failed', { 
        userId, 
        error: aiResponse.error,
        message: aiResponse.message 
      });
      
      await ctx.reply(t(lang, 'error_ai_unavailable'));
      return;
    }

    // Add assistant response to conversation
    conversationService.addAssistantMessage(userId, aiResponse.content);

    // Record successful request
    usageService.recordRequest(userId, 'ai_chat', true);

    // Split long messages
    const chunks = splitLongMessage(aiResponse.content);

    // Send response(s)
    for (const chunk of chunks) {
      await ctx.reply(chunk);
      
      // Small delay between chunks to maintain order
      if (chunks.length > 1) {
        await new Promise(resolve => setTimeout(resolve, 300));
      }
    }

    logger.info('AI response sent', { 
      userId, 
      messageLength: aiResponse.content.length,
      chunks: chunks.length,
      model: aiResponse.model
    });

  } catch (error) {
    logger.error('Chat handler error', error, { userId });
    
    // Record failed request
    usageService.recordRequest(userId, 'ai_chat', false, error.message);
    
    await ctx.reply(t(lang, 'error_generic'));
  }
}
