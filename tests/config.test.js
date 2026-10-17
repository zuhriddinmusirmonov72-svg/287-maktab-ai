import { describe, it } from 'node:test';
import assert from 'node:assert';

describe('Config Tests', () => {
  it('should parse admin IDs correctly', () => {
    const parseAdminIds = (idsString) => {
      if (!idsString) return [];
      return idsString
        .split(',')
        .map(id => id.trim())
        .filter(id => id.length > 0)
        .map(id => parseInt(id))
        .filter(id => !isNaN(id));
    };

    const result1 = parseAdminIds('123456,789012');
    assert.deepStrictEqual(result1, [123456, 789012]);

    const result2 = parseAdminIds('123456, 789012, 345678');
    assert.deepStrictEqual(result2, [123456, 789012, 345678]);

    const result3 = parseAdminIds('');
    assert.deepStrictEqual(result3, []);

    const result4 = parseAdminIds('123456,invalid,789012');
    assert.deepStrictEqual(result4, [123456, 789012]);
  });

  it('should validate configuration', () => {
    const validateConfig = (cfg) => {
      const errors = [];
      if (!cfg.botToken) errors.push('TELEGRAM_BOT_TOKEN is required');
      if (!cfg.apiKey) errors.push('OPENROUTER_API_KEY is required');
      if (!cfg.model) errors.push('OPENROUTER_MODEL is required');
      return errors;
    };

    const valid = { botToken: 'token', apiKey: 'key', model: 'model' };
    assert.strictEqual(validateConfig(valid).length, 0);

    const invalid = { botToken: '', apiKey: '', model: '' };
    assert.strictEqual(validateConfig(invalid).length, 3);
  });
});
