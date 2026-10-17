import initSqlJs from 'sql.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import logger from './logger.js';
import config from './config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class DatabaseManager {
  constructor() {
    this.db = null;
    this.dbPath = null;
  }

  async initialize() {
    try {
      const dbPath = path.resolve(config.database.path);
      const dbDir = path.dirname(dbPath);
      this.dbPath = dbPath;

      if (!existsSync(dbDir)) {
        mkdirSync(dbDir, { recursive: true });
        logger.info(`Database directory created: ${dbDir}`);
      }

      const SQL = await initSqlJs();
      
      // Load existing database or create new
      if (existsSync(dbPath)) {
        const buffer = readFileSync(dbPath);
        this.db = new SQL.Database(buffer);
        logger.info('Database loaded from file');
      } else {
        this.db = new SQL.Database();
        logger.info('New database created');
      }

      this.createTables();
      this.save(); // Save initial structure
      
      logger.info('Database initialized successfully');
    } catch (error) {
      logger.error('Failed to initialize database', error);
      throw error;
    }
  }

  save() {
    if (this.db && this.dbPath) {
      const data = this.db.export();
      const buffer = Buffer.from(data);
      writeFileSync(this.dbPath, buffer);
    }
  }

  createTables() {
    this.db.run(`
      CREATE TABLE IF NOT EXISTS users (
        telegram_id INTEGER PRIMARY KEY,
        username TEXT,
        first_name TEXT,
        last_name TEXT,
        language_code TEXT DEFAULT 'uz',
        ai_mode TEXT DEFAULT 'general',
        response_style TEXT DEFAULT 'concise',
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        last_active TEXT DEFAULT CURRENT_TIMESTAMP,
        total_requests INTEGER DEFAULT 0,
        is_blocked INTEGER DEFAULT 0
      )
    `);

    this.db.run(`
      CREATE TABLE IF NOT EXISTS conversations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(telegram_id) ON DELETE CASCADE
      )
    `);

    this.db.run(`
      CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        conversation_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        role TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(telegram_id) ON DELETE CASCADE
      )
    `);

    this.db.run(`
      CREATE TABLE IF NOT EXISTS usage_records (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        request_type TEXT NOT NULL,
        success INTEGER DEFAULT 1,
        error_message TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(telegram_id) ON DELETE CASCADE
      )
    `);

    // Create indexes
    try {
      this.db.run('CREATE INDEX IF NOT EXISTS idx_conversations_user ON conversations(user_id)');
      this.db.run('CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(conversation_id)');
      this.db.run('CREATE INDEX IF NOT EXISTS idx_messages_user ON messages(user_id)');
      this.db.run('CREATE INDEX IF NOT EXISTS idx_usage_user_date ON usage_records(user_id, created_at)');
    } catch (e) {
      // Indexes might already exist
    }
  }

  // User operations
  getUser(telegramId) {
    const result = this.db.exec('SELECT * FROM users WHERE telegram_id = ?', [telegramId]);
    if (result.length === 0 || result[0].values.length === 0) return null;
    
    const columns = result[0].columns;
    const values = result[0].values[0];
    const user = {};
    columns.forEach((col, i) => user[col] = values[i]);
    return user;
  }

  createUser(telegramId, userData = {}) {
    this.db.run(
      'INSERT INTO users (telegram_id, username, first_name, last_name, language_code) VALUES (?, ?, ?, ?, ?)',
      [
        telegramId,
        userData.username || null,
        userData.first_name || null,
        userData.last_name || null,
        userData.language_code || 'uz'
      ]
    );
    this.save();
    return this.getUser(telegramId);
  }

  updateUser(telegramId, updates) {
    const fields = [];
    const values = [];

    for (const [key, value] of Object.entries(updates)) {
      fields.push(`${key} = ?`);
      values.push(value);
    }

    if (fields.length === 0) {
      this.db.run('UPDATE users SET last_active = CURRENT_TIMESTAMP WHERE telegram_id = ?', [telegramId]);
    } else {
      values.push(telegramId);
      this.db.run(
        `UPDATE users SET ${fields.join(', ')}, last_active = CURRENT_TIMESTAMP WHERE telegram_id = ?`,
        values
      );
    }
    this.save();
  }

  incrementUserRequests(telegramId) {
    this.db.run(
      'UPDATE users SET total_requests = total_requests + 1, last_active = CURRENT_TIMESTAMP WHERE telegram_id = ?',
      [telegramId]
    );
    this.save();
  }

  // Conversation operations
  getOrCreateConversation(userId) {
    let result = this.db.exec(
      'SELECT * FROM conversations WHERE user_id = ? ORDER BY updated_at DESC LIMIT 1',
      [userId]
    );

    if (result.length === 0 || result[0].values.length === 0) {
      this.db.run('INSERT INTO conversations (user_id) VALUES (?)', [userId]);
      this.save();
      result = this.db.exec('SELECT * FROM conversations WHERE user_id = ? ORDER BY updated_at DESC LIMIT 1', [userId]);
    }

    const columns = result[0].columns;
    const values = result[0].values[0];
    const conversation = {};
    columns.forEach((col, i) => conversation[col] = values[i]);
    return conversation;
  }

  clearConversation(userId) {
    const conversation = this.getOrCreateConversation(userId);
    this.db.run('DELETE FROM messages WHERE conversation_id = ?', [conversation.id]);
    this.db.run('UPDATE conversations SET updated_at = CURRENT_TIMESTAMP WHERE id = ?', [conversation.id]);
    this.save();
  }

  createNewConversation(userId) {
    this.db.run('INSERT INTO conversations (user_id) VALUES (?)', [userId]);
    this.save();
    const result = this.db.exec('SELECT last_insert_rowid() as id');
    return { id: result[0].values[0][0], user_id: userId };
  }

  // Message operations
  addMessage(conversationId, userId, role, content) {
    this.db.run(
      'INSERT INTO messages (conversation_id, user_id, role, content) VALUES (?, ?, ?, ?)',
      [conversationId, userId, role, content]
    );
    this.db.run('UPDATE conversations SET updated_at = CURRENT_TIMESTAMP WHERE id = ?', [conversationId]);
    this.save();
  }

  getConversationHistory(conversationId, limit = 20) {
    const result = this.db.exec(
      'SELECT role, content, created_at FROM messages WHERE conversation_id = ? ORDER BY created_at DESC LIMIT ?',
      [conversationId, limit]
    );
    
    if (result.length === 0 || result[0].values.length === 0) return [];
    
    const columns = result[0].columns;
    const messages = result[0].values.map(values => {
      const msg = {};
      columns.forEach((col, i) => msg[col] = values[i]);
      return msg;
    });
    
    return messages.reverse();
  }

  // Usage operations
  recordUsage(userId, requestType, success = true, errorMessage = null) {
    this.db.run(
      'INSERT INTO usage_records (user_id, request_type, success, error_message) VALUES (?, ?, ?, ?)',
      [userId, requestType, success ? 1 : 0, errorMessage]
    );
    this.save();
  }

  getTodayUsageCount(userId) {
    const result = this.db.exec(
      "SELECT COUNT(*) as count FROM usage_records WHERE user_id = ? AND date(created_at) = date('now')",
      [userId]
    );
    return result[0]?.values[0]?.[0] || 0;
  }

  // Statistics
  getTotalUsers() {
    const result = this.db.exec('SELECT COUNT(*) as count FROM users');
    return result[0]?.values[0]?.[0] || 0;
  }

  getActiveUsersToday() {
    const result = this.db.exec(
      "SELECT COUNT(DISTINCT user_id) as count FROM usage_records WHERE date(created_at) = date('now')"
    );
    return result[0]?.values[0]?.[0] || 0;
  }

  getTodayRequestsCount() {
    const result = this.db.exec(
      "SELECT COUNT(*) as count FROM usage_records WHERE date(created_at) = date('now')"
    );
    return result[0]?.values[0]?.[0] || 0;
  }

  getSuccessRate() {
    const result = this.db.exec(
      "SELECT COUNT(*) as total, SUM(success) as successful FROM usage_records WHERE date(created_at) = date('now')"
    );
    
    if (result.length === 0 || result[0].values.length === 0) return 100;
    
    const total = result[0].values[0][0] || 0;
    const successful = result[0].values[0][1] || 0;
    
    if (total === 0) return 100;
    return Math.round((successful / total) * 100);
  }

  getAllUsers() {
    const result = this.db.exec('SELECT telegram_id FROM users WHERE is_blocked = 0');
    if (result.length === 0 || result[0].values.length === 0) return [];
    
    return result[0].values.map(row => ({ telegram_id: row[0] }));
  }

  close() {
    if (this.db) {
      this.save();
      this.db.close();
      logger.info('Database connection closed');
    }
  }
}

export default new DatabaseManager();
