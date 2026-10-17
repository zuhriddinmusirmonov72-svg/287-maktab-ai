import database from '../database.js';
import config from '../config.js';

class UsageService {
  recordRequest(userId, requestType, success = true, errorMessage = null) {
    database.recordUsage(userId, requestType, success, errorMessage);
    if (success) {
      database.incrementUserRequests(userId);
    }
  }

  getTodayCount(userId) {
    return database.getTodayUsageCount(userId);
  }

  canMakeRequest(userId) {
    const todayCount = this.getTodayCount(userId);
    const limit = config.limits.dailyUserLimit;
    
    return {
      allowed: todayCount < limit,
      current: todayCount,
      limit: limit,
      remaining: Math.max(0, limit - todayCount)
    };
  }

  checkRateLimit(userId, userState = {}) {
    const now = Date.now();
    const cooldown = config.limits.userCooldownSeconds * 1000;
    
    if (userState.lastRequest && (now - userState.lastRequest) < cooldown) {
      const waitSeconds = Math.ceil((cooldown - (now - userState.lastRequest)) / 1000);
      return {
        allowed: false,
        waitSeconds
      };
    }

    return { allowed: true };
  }

  getUserStats(userId) {
    const user = database.getUser(userId);
    const todayCount = this.getTodayCount(userId);
    
    return {
      totalRequests: user?.total_requests || 0,
      todayRequests: todayCount,
      dailyLimit: config.limits.dailyUserLimit,
      registeredAt: user?.created_at,
      lastActive: user?.last_active
    };
  }

  getGlobalStats() {
    return {
      totalUsers: database.getTotalUsers(),
      activeToday: database.getActiveUsersToday(),
      requestsToday: database.getTodayRequestsCount(),
      successRate: database.getSuccessRate()
    };
  }
}

export default new UsageService();
