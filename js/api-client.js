/**
 * ============================================================================
 * VANTAGE VIRALITY OS — MASTER CLIENT API SERVICE (V2.5 PRO)
 * Multi-Tenant JWT Auth, Embedded DB Sync, Multi-LLM Inference,
 * YouTube/Instagram Outlier Intelligence & Script Studio Client
 * ============================================================================
 */

const VantageAPI = {
  isOnline: false,

  getToken() {
    try {
      return localStorage.getItem('vantage_auth_token_v2') || '';
    } catch (e) {
      return '';
    }
  },

  setToken(token) {
    try {
      if (token) localStorage.setItem('vantage_auth_token_v2', token);
      else localStorage.removeItem('vantage_auth_token_v2');
    } catch (e) {}
  },

  getHeaders() {
    const headers = { 'Content-Type': 'application/json' };
    const token = this.getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return headers;
  },

  async checkHealth() {
    try {
      const res = await fetch(`${VantageConfig.API_BASE}/health`, { method: 'GET', signal: AbortSignal.timeout(2000) });
      if (res.ok) {
        this.isOnline = true;
        return await res.json();
      }
    } catch (e) {
      this.isOnline = false;
    }
    return null;
  },

  // Auth Endpoints
  async checkSession() {
    try {
      const res = await fetch(`${VantageConfig.API_BASE}/auth/me`, {
        headers: this.getHeaders()
      });
      if (res.ok) {
        this.isOnline = true;
        return await res.json();
      }
    } catch (e) {}
    return null;
  },

  async login(email, password) {
    const res = await fetch(`${VantageConfig.API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');
    if (data.token) this.setToken(data.token);
    this.isOnline = true;
    return data;
  },

  async register(name, email, password) {
    const res = await fetch(`${VantageConfig.API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Registration failed');
    if (data.token) this.setToken(data.token);
    this.isOnline = true;
    return data;
  },

  async guestLogin() {
    try {
      const res = await fetch(`${VantageConfig.API_BASE}/auth/guest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.token) this.setToken(data.token);
        this.isOnline = true;
        return data;
      }
    } catch (e) {}
    return null;
  },

  // Creator Profile Management
  loadProfile() {
    try {
      const saved = localStorage.getItem('vantage_creator_profile_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('LocalStorage profile error:', e);
    }
    return { ...VantageConfig.DEFAULT_CREATOR_PROFILE };
  },

  async saveProfile(profile) {
    try {
      localStorage.setItem('vantage_creator_profile_v2', JSON.stringify(profile));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }

    try {
      await fetch(`${VantageConfig.API_BASE}/profile`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(profile)
      });
    } catch (e) {
      console.debug('Backend profile sync offline');
    }
  },

  // Content Library Management
  loadLibrary() {
    try {
      const saved = localStorage.getItem('vantage_saved_library_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('LocalStorage library error:', e);
    }
    return [...VantageConfig.DEFAULT_LIBRARY_IDEAS];
  },

  async saveLibrary(lib) {
    try {
      localStorage.setItem('vantage_saved_library_v2', JSON.stringify(lib));
    } catch (e) {
      console.warn('LocalStorage library error:', e);
    }

    try {
      await fetch(`${VantageConfig.API_BASE}/library`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(lib)
      });
    } catch (e) {
      console.debug('Backend library sync offline');
    }
  },

  // Multi-LLM & AI Endpoints
  async generateAngles(topic, niche, platform, profile) {
    try {
      const res = await fetch(`${VantageConfig.API_BASE}/ai/generate-angles`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ topic, niche, platform, profile })
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return null;
  },

  async scoreHookAI(hookText, platform, niche) {
    try {
      const res = await fetch(`${VantageConfig.API_BASE}/ai/score-hook`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ hook: hookText, platform, niche })
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return null;
  },

  async generateScriptAI(title, hook, platform, niche) {
    try {
      const res = await fetch(`${VantageConfig.API_BASE}/ai/generate-script`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ title, hook, platform, niche })
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return null;
  },

  // Real YouTube & Instagram Outlier Scanner
  async scanChannelOutliers(handle) {
    try {
      const res = await fetch(`${VantageConfig.API_BASE}/trends/channel`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ handle })
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return null;
  }
};

if (typeof window !== 'undefined') {
  window.VantageAPI = VantageAPI;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = VantageAPI;
}
