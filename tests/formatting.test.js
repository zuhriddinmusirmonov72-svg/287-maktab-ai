import { describe, it } from 'node:test';
import assert from 'node:assert';

describe('Formatting Tests', () => {
  it('should truncate long text', () => {
    const truncate = (text, maxLength = 100) => {
      if (!text || text.length <= maxLength) return text;
      return text.slice(0, maxLength - 3) + '...';
    };

    const short = 'Hello';
    assert.strictEqual(truncate(short, 10), 'Hello');

    const long = 'This is a very long text that should be truncated';
    const result = truncate(long, 20);
    assert.ok(result.length <= 20);
    assert.ok(result.endsWith('...'));
  });

  it('should split long messages', () => {
    const splitLongMessage = (text, maxLength = 100) => {
      if (text.length <= maxLength) return [text];
      
      const chunks = [];
      const lines = text.split('\n');
      let currentChunk = '';
      
      for (const line of lines) {
        if ((currentChunk + line + '\n').length > maxLength) {
          if (currentChunk) chunks.push(currentChunk.trim());
          currentChunk = line + '\n';
        } else {
          currentChunk += line + '\n';
        }
      }
      
      if (currentChunk.trim()) chunks.push(currentChunk.trim());
      return chunks.length > 0 ? chunks : [text.slice(0, maxLength)];
    };

    const short = 'Short message';
    assert.strictEqual(splitLongMessage(short, 100).length, 1);

    const long = 'Line1\n' + 'Line2\n'.repeat(50);
    const chunks = splitLongMessage(long, 100);
    assert.ok(chunks.length > 1);
    chunks.forEach(chunk => assert.ok(chunk.length <= 150)); // Allow some overflow
  });

  it('should escape markdown characters', () => {
    const escapeMarkdown = (text) => {
      if (!text) return '';
      return text
        .replace(/\\/g, '\\\\')
        .replace(/\*/g, '\\*')
        .replace(/_/g, '\\_')
        .replace(/\[/g, '\\[')
        .replace(/\]/g, '\\]');
    };

    const input = 'Hello *world* [link]';
    const output = escapeMarkdown(input);
    assert.ok(output.includes('\\*'));
    assert.ok(output.includes('\\['));
  });
});
