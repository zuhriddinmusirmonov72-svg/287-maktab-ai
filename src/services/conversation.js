import database from '../database.js';
import config from '../config.js';

class ConversationService {
  getOrCreateConversation(userId) {
    return database.getOrCreateConversation(userId);
  }

  addUserMessage(userId, message) {
    const conversation = this.getOrCreateConversation(userId);
    database.addMessage(conversation.id, userId, 'user', message);
    return conversation;
  }

  addAssistantMessage(userId, message) {
    const conversation = this.getOrCreateConversation(userId);
    database.addMessage(conversation.id, userId, 'assistant', message);
  }

  getHistory(userId, limit = null) {
    const conversation = this.getOrCreateConversation(userId);
    const actualLimit = limit || config.limits.maxHistoryMessages;
    return database.getConversationHistory(conversation.id, actualLimit);
  }

  getFormattedHistory(userId) {
    const history = this.getHistory(userId);
    return history.map(msg => ({
      role: msg.role,
      content: msg.content
    }));
  }

  clearHistory(userId) {
    database.clearConversation(userId);
  }

  createNewChat(userId) {
    return database.createNewConversation(userId);
  }

  getMessageCount(userId) {
    const history = this.getHistory(userId, 1000);
    return history.length;
  }
}

export default new ConversationService();
