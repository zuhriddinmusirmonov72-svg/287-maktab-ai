class Logger {
  constructor() {
    this.secretPatterns = [
      /\d{10}:[A-Za-z0-9_-]{35}/g, // Telegram bot tokens
      /sk-[A-Za-z0-9-_]{20,}/g, // API keys starting with sk-
      /Bearer\s+[A-Za-z0-9\-._~+/]+=*/g, // Bearer tokens
    ];
  }

  redact(message) {
    if (typeof message !== 'string') {
      message = JSON.stringify(message, null, 2);
    }

    let redacted = message;
    for (const pattern of this.secretPatterns) {
      redacted = redacted.replace(pattern, '***REDACTED***');
    }
    return redacted;
  }

  formatMessage(level, message, meta = {}) {
    const timestamp = new Date().toISOString();
    const metaStr = Object.keys(meta).length > 0 ? ` ${JSON.stringify(meta)}` : '';
    return `[${timestamp}] [${level}] ${message}${metaStr}`;
  }

  info(message, meta = {}) {
    console.log(this.redact(this.formatMessage('INFO', message, meta)));
  }

  warn(message, meta = {}) {
    console.warn(this.redact(this.formatMessage('WARN', message, meta)));
  }

  error(message, error = null, meta = {}) {
    const errorMeta = error ? { error: error.message, stack: error.stack, ...meta } : meta;
    console.error(this.redact(this.formatMessage('ERROR', message, errorMeta)));
  }

  debug(message, meta = {}) {
    if (process.env.NODE_ENV === 'development') {
      console.debug(this.redact(this.formatMessage('DEBUG', message, meta)));
    }
  }
}

export default new Logger();
