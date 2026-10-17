import { describe, it } from 'node:test';
import assert from 'node:assert';

describe('Usage Service Tests', () => {
  it('should check if user can make request', () => {
    const canMakeRequest = (currentCount, limit) => {
      return {
        allowed: currentCount < limit,
        current: currentCount,
        limit: limit,
        remaining: Math.max(0, limit - currentCount)
      };
    };

    const result1 = canMakeRequest(5, 30);
    assert.strictEqual(result1.allowed, true);
    assert.strictEqual(result1.remaining, 25);

    const result2 = canMakeRequest(30, 30);
    assert.strictEqual(result2.allowed, false);
    assert.strictEqual(result2.remaining, 0);

    const result3 = canMakeRequest(35, 30);
    assert.strictEqual(result3.allowed, false);
    assert.strictEqual(result3.remaining, 0);
  });

  it('should check rate limits', () => {
    const checkRateLimit = (lastRequest, cooldown) => {
      const now = Date.now();
      if (lastRequest && (now - lastRequest) < cooldown) {
        const waitSeconds = Math.ceil((cooldown - (now - lastRequest)) / 1000);
        return { allowed: false, waitSeconds };
      }
      return { allowed: true };
    };

    const now = Date.now();
    const cooldown = 2000; // 2 seconds

    const result1 = checkRateLimit(now - 3000, cooldown);
    assert.strictEqual(result1.allowed, true);

    const result2 = checkRateLimit(now - 1000, cooldown);
    assert.strictEqual(result2.allowed, false);
    assert.ok(result2.waitSeconds > 0);

    const result3 = checkRateLimit(null, cooldown);
    assert.strictEqual(result3.allowed, true);
  });
});
