/**
 * ============================================================================
 * VANTAGE VIRALITY OS — DURABLE DATABASE ENGINE
 * Multi-Tenant, Multi-Collection Embedded Database with Atomic Persistence
 * Compatible with Local File Storage and Cloud / Serverless /tmp Environments
 * ============================================================================
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class VantageDatabase {
  constructor() {
    this.dbPath = this._resolveDbPath();
    this.data = {
      users: [],
      profiles: {},
      library_items: {},
      trends_cache: [],
      scoring_history: [],
      settings: {},
      api_keys: {}
    };
    this.initialized = false;
    this.init();
  }

  _resolveDbPath() {
    const os = require('os');
    const isServerless = Boolean(
      process.env.VERCEL ||
      process.env.AWS_LAMBDA_FUNCTION_NAME ||
      process.env.LAMBDA_TASK_ROOT ||
      process.env.NOW_REGION
    );

    if (isServerless) {
      try {
        const tmpDir = path.join(os.tmpdir(), 'vantage_data');
        if (!fs.existsSync(tmpDir)) {
          fs.mkdirSync(tmpDir, { recursive: true });
        }
        return path.join(tmpDir, 'vantage_database.json');
      } catch (err) {
        return path.join(os.tmpdir(), 'vantage_database.json');
      }
    }

    try {
      const localDataDir = path.join(__dirname, '..', 'data');
      if (!fs.existsSync(localDataDir)) {
        fs.mkdirSync(localDataDir, { recursive: true });
      }
      return path.join(localDataDir, 'vantage_database.json');
    } catch (e) {
      try {
        const tmpDir = path.join(os.tmpdir(), 'vantage_data');
        if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });
        return path.join(tmpDir, 'vantage_database.json');
      } catch (err) {
        return null;
      }
    }
  }

  init() {
    if (this.initialized) return;

    if (this.dbPath && fs.existsSync(this.dbPath)) {
      try {
        const content = fs.readFileSync(this.dbPath, 'utf8');
        const parsed = JSON.parse(content);
        this.data = { ...this.data, ...parsed };
      } catch (err) {
        console.warn('[VantageDB] Read error, creating fresh state:', err.message);
      }
    }

    // Seed default admin user if no users exist
    if (!this.data.users || this.data.users.length === 0) {
      const defaultUser = {
        id: 'usr_arka_master',
        email: 'arkadeb.mondal@example.com',
        password_hash: this.hashPassword('arka1234'),
        name: 'Arka Mondal',
        tier: 'pro',
        created_at: new Date().toISOString(),
        last_login: new Date().toISOString()
      };
      this.data.users = [defaultUser];

      this.data.profiles[defaultUser.id] = {
        id: `prof_${defaultUser.id}`,
        user_id: defaultUser.id,
        name: 'Arka Mondal',
        email: defaultUser.email,
        content_types: ['reels', 'shorts', 'youtube'],
        niches: ['ai', 'technology'],
        age_range: '18-34',
        country: 'India',
        language: 'English',
        audience_description: 'Young tech professionals, developers, and creators interested in AI productivity tools.',
        goals: 'views',
        preferred_formats: ['trending', 'storytelling', 'case-studies', 'educational', 'controversial', 'tutorials'],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        onboarding_completed: true
      };

      this.data.library_items[defaultUser.id] = [
        {
          id: 'lib-1',
          title: 'I gave 3 AI agents $1,000 each and let them trade for 30 days',
          hook: "I gave 3 AI agents $1,000 each and let them trade for 30 days — the results broke my model.",
          niche: 'ai',
          platform: 'youtube',
          score: 98,
          scoreTier: 'EXPLOSIVE',
          source: 'AI Autonomous Trading Agents',
          stage: 'filming',
          stageName: 'Filming',
          script: `[HOOK - 0:00 - 0:03]
Visual: Split-screen of 3 glowing AI terminal windows alongside live trading charts.
Headline: "I gave 3 AI agents $1,000 each and let them trade for 30 days."

[THE STAKES - 0:03 - 0:15]
Voiceover: "Agent 1 used DeepSeek reasoning. Agent 2 used Claude 3.5 Sonnet. Agent 3 ran a raw quantitative momentum model."

[THE SURPRISE - 0:15 - 0:40]
Voiceover: "By Day 14, Agent 2 was up 34%, but Agent 1 noticed a hidden arbitrage in ETF options that doubled its portfolio overnight."

[CLIMAX & LESSON - 0:40 - 0:55]
Voiceover: "Here is the exact Python architecture they used to execute trades without human intervention."

[CALL TO ACTION - 0:55 - 1:00]
Voiceover: "Comment 'AGENT' and I'll send you the open-source GitHub repo."`,
          createdAt: '2026-08-27'
        },
        {
          id: 'lib-2',
          title: 'Rating client red flags before the discovery call ends',
          hook: "Rating client red flags before the discovery call even ends.",
          niche: 'business',
          platform: 'shorts',
          score: 93,
          scoreTier: 'EXPLOSIVE',
          source: 'Solopreneur Micro-SaaS Playbook',
          stage: 'scripted',
          stageName: 'Scripted',
          createdAt: '2026-08-26'
        },
        {
          id: 'lib-3',
          title: 'Delete these 3 VS Code extensions before your next build',
          hook: "Delete these 3 VS Code extensions before they secretly slow down your build times.",
          niche: 'technology',
          platform: 'shorts',
          score: 87,
          scoreTier: 'STRONG',
          source: 'VS Code Extensions Optimization',
          stage: 'idea',
          stageName: 'Ideas',
          createdAt: '2026-08-28'
        }
      ];

      this.persist();
    }

    this.initialized = true;
  }

  hashPassword(password) {
    return crypto.createHash('sha256').update(password + '_vantage_salt_2026').digest('hex');
  }

  generateToken(user) {
    const payload = {
      userId: user.id,
      email: user.email,
      name: user.name,
      tier: user.tier || 'pro',
      exp: Date.now() + (30 * 24 * 60 * 60 * 1000) // 30 days
    };
    const str = Buffer.from(JSON.stringify(payload)).toString('base64');
    const signature = crypto.createHmac('sha256', 'vantage_jwt_secret_key_2026').update(str).digest('hex');
    return `${str}.${signature}`;
  }

  verifyToken(token) {
    if (!token || typeof token !== 'string') return null;
    try {
      const parts = token.split('.');
      if (parts.length !== 2) return null;
      const str = parts[0];
      const signature = parts[1];
      const expectedSig = crypto.createHmac('sha256', 'vantage_jwt_secret_key_2026').update(str).digest('hex');
      if (signature !== expectedSig) return null;

      const payload = JSON.parse(Buffer.from(str, 'base64').toString('utf8'));
      if (payload.exp && payload.exp < Date.now()) return null;
      return payload;
    } catch (e) {
      return null;
    }
  }

  persist() {
    if (!this.dbPath) return;
    try {
      const tempPath = `${this.dbPath}.tmp`;
      fs.writeFileSync(tempPath, JSON.stringify(this.data, null, 2), 'utf8');
      fs.renameSync(tempPath, this.dbPath);
    } catch (e) {
      console.warn('[VantageDB] Persist warning (falling back to memory):', e.message);
    }
  }

  // --- User Collection Operations ---
  findUserByEmail(email) {
    if (!email) return null;
    return this.data.users.find(u => u.email.toLowerCase() === email.toLowerCase().trim()) || null;
  }

  findUserById(id) {
    if (!id) return null;
    return this.data.users.find(u => u.id === id) || null;
  }

  createUser(name, email, password) {
    const existing = this.findUserByEmail(email);
    if (existing) throw new Error('An account with this email address already exists.');

    const userId = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const newUser = {
      id: userId,
      name: (name || 'Creator').trim(),
      email: email.toLowerCase().trim(),
      password_hash: this.hashPassword(password),
      tier: 'pro',
      created_at: new Date().toISOString(),
      last_login: new Date().toISOString()
    };

    this.data.users.push(newUser);

    // Create default profile for user
    this.data.profiles[userId] = {
      id: `prof_${userId}`,
      user_id: userId,
      name: newUser.name,
      email: newUser.email,
      content_types: ['reels', 'shorts', 'youtube'],
      niches: ['ai', 'technology'],
      age_range: '18-34',
      country: 'India',
      language: 'English',
      audience_description: 'Tech enthusiasts, developers, and online creators.',
      goals: 'views',
      preferred_formats: ['trending', 'storytelling', 'case-studies', 'educational', 'controversial', 'tutorials'],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      onboarding_completed: true
    };

    this.data.library_items[userId] = [];
    this.persist();
    return newUser;
  }

  // --- Profile Operations ---
  getProfile(userId) {
    return this.data.profiles[userId] || this.data.profiles['usr_arka_master'] || null;
  }

  updateProfile(userId, profileData) {
    if (!userId) userId = 'usr_arka_master';
    const current = this.getProfile(userId) || {};
    const updated = {
      ...current,
      ...profileData,
      user_id: userId,
      updated_at: new Date().toISOString()
    };
    this.data.profiles[userId] = updated;

    // Update user name if provided
    const user = this.findUserById(userId);
    if (user && profileData.name) {
      user.name = profileData.name;
    }

    this.persist();
    return updated;
  }

  // --- Library Operations ---
  getLibrary(userId) {
    if (!userId) userId = 'usr_arka_master';
    return this.data.library_items[userId] || [];
  }

  saveLibrary(userId, items) {
    if (!userId) userId = 'usr_arka_master';
    this.data.library_items[userId] = Array.isArray(items) ? items : [];
    this.persist();
    return this.data.library_items[userId];
  }

  addLibraryItem(userId, item) {
    if (!userId) userId = 'usr_arka_master';
    if (!this.data.library_items[userId]) {
      this.data.library_items[userId] = [];
    }
    const newItem = {
      id: item.id || `lib-${Date.now()}`,
      title: item.title || 'Untitled Idea Concept',
      hook: item.hook || item.title || '',
      niche: item.niche || 'ai',
      platform: item.platform || 'shorts',
      score: item.score || 92,
      scoreTier: item.scoreTier || 'EXPLOSIVE',
      source: item.source || 'AI Generation',
      stage: item.stage || 'idea',
      stageName: item.stageName || 'Ideas',
      script: item.script || '',
      notes: item.notes || '',
      createdAt: item.createdAt || new Date().toISOString().slice(0, 10)
    };
    this.data.library_items[userId].unshift(newItem);
    this.persist();
    return newItem;
  }

  deleteLibraryItem(userId, itemId) {
    if (!userId) userId = 'usr_arka_master';
    if (!this.data.library_items[userId]) return false;
    const initialLen = this.data.library_items[userId].length;
    this.data.library_items[userId] = this.data.library_items[userId].filter(i => i.id !== itemId);
    this.persist();
    return this.data.library_items[userId].length < initialLen;
  }

  // --- Scorer History Operations ---
  addScorerHistory(record) {
    this.data.scoring_history.unshift({
      id: `score_${Date.now()}`,
      timestamp: new Date().toISOString(),
      ...record
    });
    if (this.data.scoring_history.length > 50) {
      this.data.scoring_history = this.data.scoring_history.slice(0, 50);
    }
    this.persist();
  }

  // --- API Key Manager ---
  getApiKeys(userId) {
    if (!userId) userId = 'usr_arka_master';
    return this.data.api_keys[userId] || {};
  }

  saveApiKeys(userId, keys) {
    if (!userId) userId = 'usr_arka_master';
    this.data.api_keys[userId] = {
      ...(this.data.api_keys[userId] || {}),
      ...keys,
      updated_at: new Date().toISOString()
    };
    this.persist();
    return this.data.api_keys[userId];
  }

  // --- Telemetry & Stats ---
  getStats() {
    return {
      total_users: this.data.users.length,
      total_profiles: Object.keys(this.data.profiles).length,
      total_library_items: Object.values(this.data.library_items).reduce((acc, curr) => acc + (curr?.length || 0), 0),
      total_scored_hooks: this.data.scoring_history.length,
      db_driver: 'embedded-json-v2',
      db_path: this.dbPath,
      storage_status: 'online'
    };
  }
}

// Global Singleton
const db = new VantageDatabase();
module.exports = db;
