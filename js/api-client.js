/**
 * VANTAGE VIRALITY OS — Client API Service & Storage Handler
 */

const VantageAPI = {
  isOnline: false,

  async checkHealth() {
    try {
      const res = await fetch(`${VantageConfig.API_BASE}/health`, { method: 'GET', signal: AbortSignal.timeout(1500) });
      if (res.ok) {
        this.isOnline = true;
        return await res.json();
      }
    } catch (e) {
      this.isOnline = false;
    }
    return null;
  },

  loadProfile() {
    try {
      const saved = localStorage.getItem(VantageConfig.STORAGE_KEY_PROFILE);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('LocalStorage profile error:', e);
    }
    return { ...VantageConfig.DEFAULT_CREATOR_PROFILE };
  },

  async saveProfile(profile) {
    try {
      localStorage.setItem(VantageConfig.STORAGE_KEY_PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }

    if (this.isOnline) {
      try {
        await fetch(`${VantageConfig.API_BASE}/profile`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(profile)
        });
      } catch (e) {
        console.debug('Backend sync offline');
      }
    }
  },

  loadLibrary() {
    try {
      const saved = localStorage.getItem(VantageConfig.STORAGE_KEY_LIBRARY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('LocalStorage library error:', e);
    }
    return [...VantageConfig.DEFAULT_LIBRARY_IDEAS];
  },

  async saveLibrary(lib) {
    try {
      localStorage.setItem(VantageConfig.STORAGE_KEY_LIBRARY, JSON.stringify(lib));
    } catch (e) {
      console.warn('LocalStorage library error:', e);
    }

    if (this.isOnline) {
      try {
        await fetch(`${VantageConfig.API_BASE}/library`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(lib)
        });
      } catch (e) {
        console.debug('Backend library sync offline');
      }
    }
  }
};

window.VantageAPI = VantageAPI;
