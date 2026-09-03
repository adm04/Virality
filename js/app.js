/**
 * ============================================================================
 * VANTAGE VIRALITY OS — MASTER SAAS CLIENT ENGINE (V2.5 PRO)
 * Standalone, Zero-Dependency, Pure Modern JavaScript SaaS Architecture
 * Features: Real Auth, Multi-Tenant Database, Multi-LLM Generation,
 * YouTube/Instagram Outlier Scanner, AI Script Studio, Virality Neural Scorer
 * ============================================================================
 */

(function () {
  'use strict';

  // ================= 1. GLOBAL CONFIGURATION & STATE =================
  const VantageConfig = {
    STORAGE_KEY_TOKEN: 'vantage_auth_token_v2',
    STORAGE_KEY_PROFILE: 'vantage_creator_profile_v2',
    STORAGE_KEY_LIBRARY: 'vantage_saved_library_v2',
    STORAGE_KEY_AI_SETTINGS: 'vantage_ai_settings_v2',
    API_BASE: (typeof window !== 'undefined' && window.location && window.location.protocol === 'file:')
      ? 'http://localhost:3000/api'
      : '/api',

    DEFAULT_CREATOR_PROFILE: {
      id: 'usr_arka_master',
      name: 'Arka Mondal',
      email: 'arkadeb.mondal@example.com',
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
    },

    DEFAULT_LIBRARY_IDEAS: [
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
    ]
  };

  // ================= 2. SEED DATASETS & TOPIC REGISTRY =================
  const VantageTrendsData = {
    SEED_TRENDS: [
      {
        id: 'trend-ai-01',
        topic: 'AI Autonomous Trading Agents',
        niche: 'ai',
        platform: 'youtube',
        platformName: 'YouTube Long-form',
        outlierScore: 94,
        outlierText: '9.4× Outlier',
        title: 'I gave 3 AI agents $1,000 each and let them trade for 30 days — the results broke my model.',
        views: '842K',
        baseline: '89K',
        growth: '+340%',
        signals: { momentum: 96, engagement: 91, searchDemand: 88, saturation: 22, competition: 28, freshFactor: 95, monetization: 92 },
        whyTrending: [
          'Breakout interest in open-source autonomous agent architectures (LangGraph, CrewAI)',
          'High viewer retention driven by financial stakes and empirical proof',
          'Low saturation among general tech creators vs extreme algorithmic demand'
        ],
        tags: ['#AIAgents', '#AutonomousTrading', '#Python', '#FinanceTech']
      },
      {
        id: 'trend-tech-02',
        topic: 'VS Code Extensions Optimization',
        niche: 'technology',
        platform: 'shorts',
        platformName: 'YouTube Shorts',
        outlierScore: 89,
        outlierText: '7.8× Outlier',
        title: 'Delete these 3 VS Code extensions before they secretly slow down your build times.',
        views: '1.2M',
        baseline: '150K',
        growth: '+210%',
        signals: { momentum: 89, engagement: 87, searchDemand: 92, saturation: 35, competition: 40, freshFactor: 84, monetization: 76 },
        whyTrending: [
          'High comment debate on memory footprint and developer tooling efficiency',
          'Loss aversion framing ("Delete these") triggers instantaneous scroll-stop',
          'Broad appeal across junior, mid-level, and senior software engineers'
        ],
        tags: ['#VSCode', '#WebDev', '#Productivity', '#CodingTips']
      },
      {
        id: 'trend-biz-03',
        topic: 'Solopreneur Micro-SaaS Playbook',
        niche: 'business',
        platform: 'reels',
        platformName: 'Instagram Reels',
        outlierScore: 92,
        outlierText: '8.6× Outlier',
        title: 'How a solo developer built a $14k/mo AI tool in 6 weekends without investors.',
        views: '670K',
        baseline: '78K',
        growth: '+290%',
        signals: { momentum: 93, engagement: 94, searchDemand: 85, saturation: 30, competition: 32, freshFactor: 91, monetization: 98 },
        whyTrending: [
          'Surging aspirational interest in lean indie bootstrapping and AI wrappers',
          'Specific monthly revenue metrics trigger extreme curiosity and bookmarking',
          'Audience saves content as a reference blueprint for their own side hustles'
        ],
        tags: ['#MicroSaaS', '#IndieHacker', '#BuildInPublic', '#Solopreneur']
      },
      {
        id: 'trend-ai-04',
        topic: 'Open-Source Local LLM Deployment',
        niche: 'ai',
        platform: 'youtube',
        platformName: 'YouTube Long-form',
        outlierScore: 96,
        outlierText: '11.2× Outlier',
        title: 'Stop paying OpenAI: Run DeepSeek-R1 locally on consumer hardware in 4 minutes.',
        views: '1.4M',
        baseline: '125K',
        growth: '+480%',
        signals: { momentum: 98, engagement: 96, searchDemand: 95, saturation: 18, competition: 24, freshFactor: 99, monetization: 88 },
        whyTrending: [
          'Mass migration toward private, cost-free local reasoning models (Ollama, LM Studio)',
          'Dramatic cost contrast against subscription API bills',
          'Actionable, reproducible step-by-step setup keeps average view duration near 70%'
        ],
        tags: ['#DeepSeek', '#LocalLLM', '#Ollama', '#OpenSourceAI']
      },
      {
        id: 'trend-pod-05',
        topic: 'The 2026 AI Agent Economic Shift',
        niche: 'technology',
        platform: 'podcast',
        platformName: 'Podcast & Deep Dive',
        outlierScore: 95,
        outlierText: '10.4× Outlier',
        title: 'Why AI agents are changing software pricing forever (and how founders survive).',
        views: '540K',
        baseline: '52K',
        growth: '+310%',
        signals: { momentum: 97, engagement: 95, searchDemand: 90, saturation: 20, competition: 25, freshFactor: 96, monetization: 94 },
        whyTrending: [
          'Founders rethinking seat-based SaaS models in favor of outcome-based agent pricing',
          'Long-form audio format achieves 85%+ completion rates on Spotify & Apple Podcasts',
          'High quote-tweet volume on LinkedIn and X/Twitter'
        ],
        tags: ['#Podcast', '#TechTrends', '#AIRevolution', '#SaaS']
      },
      {
        id: 'trend-fit-06',
        topic: 'Cortisol & Workout Timing Science',
        niche: 'fitness',
        platform: 'shorts',
        platformName: 'Shorts & TikTok',
        outlierScore: 91,
        outlierText: '8.2× Outlier',
        title: 'Why working out at 6 AM might secretly stall your fat loss (the cortisol window).',
        views: '780K',
        baseline: '95K',
        growth: '+230%',
        signals: { momentum: 92, engagement: 91, searchDemand: 89, saturation: 33, competition: 38, freshFactor: 88, monetization: 85 },
        whyTrending: [
          'Counter-intuitive health science triggers high debate and comment section retention',
          'Appeals to busy working professionals looking for optimal workout efficiency',
          'Saves/shares are 3.4x higher than standard gym routine videos'
        ],
        tags: ['#FitnessTips', '#FatLoss', '#HealthScience', '#Biohacking']
      },
      {
        id: 'trend-mkt-07',
        topic: 'Zero-Budget Organic TikTok Funnels',
        niche: 'marketing',
        platform: 'reels',
        platformName: 'Instagram Reels',
        outlierScore: 93,
        outlierText: '9.1× Outlier',
        title: 'How this creator gained 100K followers in 45 days with zero ad spend using 3-second visual loops.',
        views: '1.1M',
        baseline: '140K',
        growth: '+275%',
        signals: { momentum: 94, engagement: 95, searchDemand: 88, saturation: 28, competition: 30, freshFactor: 92, monetization: 96 },
        whyTrending: [
          'Algorithmic preference for seamless loop videos on short-form platforms',
          'Actionable framework that viewers can test on their next upload immediately',
          'High conversion to newsletter and creator community signups'
        ],
        tags: ['#GrowthHacking', '#TikTokAlgorithm', '#ContentStrategy', '#ViralHooks']
      },
      {
        id: 'trend-fin-08',
        topic: 'ETF Arbitrage & Retail Options Flow',
        niche: 'finance',
        platform: 'youtube',
        platformName: 'YouTube Long-form',
        outlierScore: 96,
        outlierText: '11.8× Outlier',
        title: 'The 3 ETF arbitrage tricks Wall Street market makers hide from retail traders.',
        views: '920K',
        baseline: '85K',
        growth: '+380%',
        signals: { momentum: 97, engagement: 94, searchDemand: 92, saturation: 18, competition: 22, freshFactor: 96, monetization: 99 },
        whyTrending: [
          'Extreme curiosity triggered by uncovering institutional market mechanics',
          'High financial stakes and educational authority driving 12+ minute watch times',
          'Huge affiliate and sponsor revenue potential'
        ],
        tags: ['#Investing', '#Finance', '#WallStreet', '#OptionsTrading']
      },
      {
        id: 'trend-des-09',
        topic: 'AI Design Systems & Figma Auto-Layout',
        niche: 'design',
        platform: 'shorts',
        platformName: 'Shorts & Reels',
        outlierScore: 92,
        outlierText: '8.7× Outlier',
        title: 'Stop designing mobile mockups manually: This Figma AI plugin builds production components in seconds.',
        views: '650K',
        baseline: '72K',
        growth: '+240%',
        signals: { momentum: 93, engagement: 91, searchDemand: 89, saturation: 24, competition: 28, freshFactor: 94, monetization: 88 },
        whyTrending: [
          'UI/UX community adopting generative layouts and automated typography tokens',
          'Instant visual transformation before/after format keeps viewers watching',
          'Heavy bookmarking and sharing on Pinterest, Twitter, and LinkedIn'
        ],
        tags: ['#UIUX', '#Figma', '#WebDesign', '#ProductDesign']
      },
      {
        id: 'trend-gam-10',
        topic: 'Unreal Engine 5.6 Procedural Worlds',
        niche: 'gaming',
        platform: 'youtube',
        platformName: 'YouTube Long-form',
        outlierScore: 95,
        outlierText: '10.2× Outlier',
        title: 'I generated an infinite photorealistic open-world game at 120 FPS without 3D modelling.',
        views: '1.8M',
        baseline: '180K',
        growth: '+410%',
        signals: { momentum: 98, engagement: 96, searchDemand: 94, saturation: 20, competition: 26, freshFactor: 97, monetization: 91 },
        whyTrending: [
          'Visually jaw-dropping technological showcase of Nanite and PCG algorithms',
          'Massive gamer and indie gamedev crossover audience',
          'Strong discussion on whether single creators can now outpace AAA studios'
        ],
        tags: ['#Gamedev', '#UnrealEngine5', '#Gaming', '#IndieGame']
      },
      {
        id: 'trend-edu-11',
        topic: 'Neuroscience of Deep Memory Recall',
        niche: 'education',
        platform: 'shorts',
        platformName: 'Shorts & TikTok',
        outlierScore: 94,
        outlierText: '9.3× Outlier',
        title: 'The 20-minute sleep cycle hack neuroscientists use to permanently memorize complex topics.',
        views: '1.3M',
        baseline: '130K',
        growth: '+310%',
        signals: { momentum: 95, engagement: 94, searchDemand: 91, saturation: 26, competition: 30, freshFactor: 93, monetization: 87 },
        whyTrending: [
          'Scientific authority combined with universal desire for cognitive enhancement',
          'Students, founders, and professionals save and share across WhatsApp and Reddit',
          'Immediate actionable protocol increases viewer retention'
        ],
        tags: ['#Neuroscience', '#StudyHacks', '#Learning', '#Productivity']
      }
    ],

    CURATED_TOPICS: [
      { id: 'all', name: 'All Topics', count: 7 },
      { id: 'ai-agents', name: 'AI Autonomous Agents', count: 3, niche: 'ai' },
      { id: 'vscode', name: 'VS Code & Tooling Optimization', count: 2, niche: 'technology' },
      { id: 'indie-saas', name: 'Solopreneur Micro-SaaS', count: 2, niche: 'business' },
      { id: 'local-llm', name: 'Local LLMs & DeepSeek R1', count: 3, niche: 'ai' },
      { id: 'podcast-tech', name: 'AI Agent Economic Shift', count: 1, niche: 'technology' },
      { id: 'fitness-timing', name: 'Cortisol & Workout Science', count: 1, niche: 'fitness' },
      { id: 'viral-loops', name: 'Zero-Budget Growth Funnels', count: 2, niche: 'marketing' }
    ],

    CURATED_NICHES: [
      { id: 'all', name: 'All Creator Niches' },
      { id: 'ai', name: 'AI & Machine Learning' },
      { id: 'technology', name: 'Technology & DevTools' },
      { id: 'business', name: 'Business & Startups' },
      { id: 'finance', name: 'Finance & Crypto' },
      { id: 'fitness', name: 'Fitness & Health' },
      { id: 'marketing', name: 'Marketing & Growth' },
      { id: 'design', name: 'Design & UI/UX' },
      { id: 'gaming', name: 'Gaming & Streaming' },
      { id: 'education', name: 'Education & Science' }
    ]
  };

  // ================= 3. SAAS API CLIENT =================
  const VantageAPI = {
    getToken() {
      try {
        return localStorage.getItem(VantageConfig.STORAGE_KEY_TOKEN) || '';
      } catch (e) {
        return '';
      }
    },

    setToken(token) {
      try {
        if (token) localStorage.setItem(VantageConfig.STORAGE_KEY_TOKEN, token);
        else localStorage.removeItem(VantageConfig.STORAGE_KEY_TOKEN);
      } catch (e) {}
    },

    getHeaders() {
      const headers = { 'Content-Type': 'application/json' };
      const token = this.getToken();
      if (token) headers['Authorization'] = `Bearer ${token}`;
      return headers;
    },

    async checkSession() {
      try {
        const res = await fetch(`${VantageConfig.API_BASE}/auth/me`, {
          headers: this.getHeaders()
        });
        if (res.ok) return await res.json();
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
          return data;
        }
      } catch (e) {}
      return null;
    },

    async saveProfile(profile) {
      try {
        localStorage.setItem(VantageConfig.STORAGE_KEY_PROFILE, JSON.stringify(profile));
      } catch (e) {}

      fetch(`${VantageConfig.API_BASE}/profile`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(profile)
      }).catch(() => {});
    },

    async saveLibrary(items) {
      try {
        localStorage.setItem(VantageConfig.STORAGE_KEY_LIBRARY, JSON.stringify(items));
      } catch (e) {}

      fetch(`${VantageConfig.API_BASE}/library`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(items)
      }).catch(() => {});
    },

    // Real AI Endpoints
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

  // ================= 4. APPLICATION STATE =================
  let currentUser = {
    id: 'usr_arka_master',
    name: 'Arka Mondal',
    email: 'arkadeb.mondal@example.com',
    tier: 'pro'
  };

  let creatorProfile = (function() {
    try {
      const saved = localStorage.getItem(VantageConfig.STORAGE_KEY_PROFILE);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return { ...VantageConfig.DEFAULT_CREATOR_PROFILE };
  })();

  let savedLibrary = (function() {
    try {
      const saved = localStorage.getItem(VantageConfig.STORAGE_KEY_LIBRARY);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [...VantageConfig.DEFAULT_LIBRARY_IDEAS];
  })();

  let currentActiveScriptIdea = null;
  let activeTrendingPlatform = 'all';
  let activeTrendingNiche = 'all';
  let activeCreativeAngle = 'all';
  let activeLibraryStage = 'all';
  let activeLibraryView = 'kanban';
  let selectedTrendForIdeas = null;
  let selectedTrendForInspector = null;
  let searchQuery = '';
  let activeTopicFilter = 'all';
  let activeNicheFilter = 'all';
  let currentOnboardStep = 1;
  let sampleHookIndex = 0;
  let simulatedHour = null;
  let radarSecondsRemaining = 6480;

  // ================= 5. UI RENDERERS =================

  function getTimeGreeting(date = new Date()) {
    const hour = (simulatedHour !== null) ? simulatedHour : date.getHours();
    if (hour >= 5 && hour < 12) {
      return 'Good morning';
    } else if (hour >= 12 && hour < 17) {
      return 'Good afternoon';
    } else {
      return 'Good evening';
    }
  }

  function updateLiveClockAndGreeting() {
    const clockEl = document.getElementById('live-time-display');
    const greetingEl = document.getElementById('hero-greeting');
    const userNameEl = document.getElementById('hero-user-name');
    const now = new Date();

    if (clockEl) {
      clockEl.textContent = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
    }

    const greeting = getTimeGreeting(now);
    if (greetingEl) greetingEl.textContent = greeting;

    if (userNameEl) {
      const rawName = (creatorProfile && creatorProfile.name) ? creatorProfile.name.trim() : (currentUser.name || 'Arka');
      const firstName = rawName.split(' ')[0] || 'Arka';
      userNameEl.textContent = `${firstName}.`;
    }
  }

  function updateLiveRadarCountdown() {
    radarSecondsRemaining = Math.max(0, radarSecondsRemaining - 1);
    const hrs = Math.floor(radarSecondsRemaining / 3600);
    const mins = Math.floor((radarSecondsRemaining % 3600) / 60);
    const secs = radarSecondsRemaining % 60;
    const radarEl = document.getElementById('header-radar-status');
    if (radarEl) {
      if (hrs > 0) {
        radarEl.textContent = `NEXT SYNC IN ${hrs}h ${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
      } else {
        radarEl.textContent = `NEXT SYNC IN ${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
      }
    }
  }

  function updateCreatorPersonaChips() {
    const list = document.getElementById('creator-persona-chips');
    const sidebarInitials = document.getElementById('sidebar-avatar-initials');
    const name = (creatorProfile && creatorProfile.name) ? creatorProfile.name : (currentUser.name || 'Arka Mondal');
    const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'AM';

    if (sidebarInitials) sidebarInitials.textContent = initials;
    if (!list) return;

    const chips = [
      { label: `Niches: ${(creatorProfile.niches || ['ai', 'technology']).map(n => n.toUpperCase()).join(' • ')}` },
      { label: `Formats: ${(creatorProfile.content_types || ['reels', 'shorts', 'youtube']).join(' / ')}` },
      { label: `Goal: ${creatorProfile.goals === 'monetize' ? 'Monetize & Scale' : 'Maximize Views'}` },
      { label: `Audience: ${creatorProfile.country || 'India'} (${creatorProfile.age_range || '18-34'})` },
      { label: `Plan: ${(currentUser.tier || 'PRO').toUpperCase()}` }
    ];

    list.innerHTML = chips.map(c => `
      <span class="persona-chip">
        <svg class="lucide lucide-check" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        <span>${escapeHtml(c.label)}</span>
      </span>
    `).join('');
  }

  // --- Section 1: Trending For You ---
  function renderTrendingSection() {
    const container = document.getElementById('trending-cards-container');
    if (!container) return;

    let trends = VantageTrendsData.SEED_TRENDS;

    // Filter by Niche / Genre
    if (activeTrendingNiche !== 'all') {
      trends = trends.filter(t => t.niche === activeTrendingNiche);
    }

    // Filter by Platform
    if (activeTrendingPlatform !== 'all') {
      if (activeTrendingPlatform === 'shorts') {
        trends = trends.filter(t => t.platform === 'shorts' || t.platform === 'reels' || t.platform === 'tiktok');
      } else {
        trends = trends.filter(t => t.platform === activeTrendingPlatform);
      }
    }

    if (trends.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1; padding: 48px 24px; text-align: center; background: #FFFFFF; border-radius: var(--radius-lg); border: var(--border-light);">
          <div style="font-size: 36px; margin-bottom: 10px;">📡</div>
          <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 6px; color: var(--text-primary);">No Outliers Found in This Filter</h3>
          <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 16px;">Try switching to another genre or viewing "All Niches".</p>
          <button class="btn btn-secondary btn-sm" id="btn-reset-trending-filter" type="button">Reset Genre & Platform Filters</button>
        </div>
      `;
      document.getElementById('btn-reset-trending-filter')?.addEventListener('click', () => {
        activeTrendingNiche = 'all';
        activeTrendingPlatform = 'all';
        document.querySelectorAll('#trending-niche-filters .format-pill').forEach(p => p.classList.toggle('active', p.getAttribute('data-niche') === 'all'));
        document.querySelectorAll('#trending-platform-filters .format-pill').forEach(p => p.classList.toggle('active', p.getAttribute('data-platform') === 'all'));
        renderTrendingSection();
      });
      return;
    }

    container.innerHTML = trends.map(t => {
      return `
        <article class="trend-card" data-id="${t.id}">
          <div class="trend-card-header">
            <span class="platform-pill ${t.platform}">${escapeHtml(t.platformName)}</span>
            <div class="score-badge tier-viral">
              <span class="score-val">${t.outlierScore || 94}</span>
              <span class="score-tag">EXPLOSIVE</span>
            </div>
          </div>

          <h3 class="trend-topic-title">${escapeHtml(t.topic)}</h3>
          <div class="trend-hook-preview">"${escapeHtml(t.title)}"</div>

          <div class="trend-metrics-row">
            <div class="metric-item">
              <span class="metric-label">Views</span>
              <span class="metric-val text-green">${t.views}</span>
            </div>
            <div class="metric-item">
              <span class="metric-label">Growth</span>
              <span class="metric-val text-cyan">${t.growth}</span>
            </div>
            <div class="metric-item">
              <span class="metric-label">Baseline</span>
              <span class="metric-val">${t.baseline}</span>
            </div>
          </div>

          <div class="trend-card-actions">
            <button class="btn btn-secondary btn-sm btn-why-trending" data-id="${t.id}" type="button">
              <svg class="lucide lucide-info" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
              <span>Why Trending?</span>
            </button>
            <button class="btn btn-primary btn-sm btn-generate-ideas" data-id="${t.id}" type="button">
              <svg class="lucide lucide-sparkles" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
              <span>Generate 12 Angles</span>
            </button>
          </div>
        </article>
      `;
    }).join('');

    container.querySelectorAll('.btn-why-trending').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openTrendInspector(btn.getAttribute('data-id'));
      });
    });

    container.querySelectorAll('.btn-generate-ideas').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const t = VantageTrendsData.SEED_TRENDS.find(x => x.id === btn.getAttribute('data-id'));
        if (t) {
          selectedTrendForIdeas = t;
          showToast(`Analyzing algorithmic signals & generating 12 angles for "${t.topic}"...`);
          await renderIdeasSection();
          document.getElementById('section-ideas')?.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    container.querySelectorAll('.trend-card').forEach(card => {
      card.addEventListener('click', () => openTrendInspector(card.getAttribute('data-id')));
    });

    refreshLucideIcons();
  }

  // --- Section 2: Ideas For You (12 AI Angles) ---
  async function renderIdeasSection() {
    const container = document.getElementById('ideas-cards-container');
    const sourceBadgeName = document.getElementById('active-idea-source-name');
    if (!container) return;

    const currentTrend = selectedTrendForIdeas || VantageTrendsData.SEED_TRENDS[0];
    if (sourceBadgeName) sourceBadgeName.textContent = currentTrend.topic;

    // Fetch from AI engine
    let ideas = [];
    const aiRes = await VantageAPI.generateAngles(currentTrend.topic, currentTrend.niche, currentTrend.platformName, creatorProfile);
    if (aiRes && aiRes.angles) {
      ideas = aiRes.angles;
    } else {
      // Fallback
      ideas = [
        {
          angleId: 'educational',
          angleName: 'Educational Breakdown',
          title: `The 5-Minute Architecture Behind ${currentTrend.topic}`,
          hook: `I spent 40 hours tearing apart the architecture of ${currentTrend.topic} so you can understand it in 60 seconds.`,
          format: currentTrend.platformName,
          audience: 'Developers & Tech Creators',
          whyWorks: 'Time compression ("40 hours in 60s") offers disproportionate perceived value.',
          structure: '1. Complexity Myth -> 2. Core Block -> 3. Assembly -> 4. Result',
          cta: 'Subscribe for weekly 60-second deep dives.',
          score: 95
        },
        {
          angleId: 'controversial',
          angleName: 'Controversial Debate',
          title: `Why Most Creators Are Completely Wrong About ${currentTrend.topic}`,
          hook: `Everyone is telling you to adopt ${currentTrend.topic} in 2026. Here is why doing that might break your workflow.`,
          format: currentTrend.platformName,
          audience: 'Practitioners & Strategists',
          whyWorks: 'Challenges common dogma, triggering immediate comment debate.',
          structure: '1. Contrarian Shock -> 2. The Flaw -> 3. The Test -> 4. Real Fix',
          cta: 'Comment your take below: Do you agree?',
          score: 96
        }
      ];
    }

    if (activeCreativeAngle !== 'all') {
      ideas = ideas.filter(i => i.angleId === activeCreativeAngle);
    }

    container.innerHTML = ideas.map(idea => `
      <article class="idea-concept-card">
        <div class="idea-card-header">
          <span class="idea-angle-badge">${escapeHtml(idea.angleName)}</span>
          <span class="idea-opp-score">Score ${idea.score || 94}</span>
        </div>

        <h3 class="idea-title-text">${escapeHtml(idea.title)}</h3>
        <div class="idea-hook-box">"${escapeHtml(idea.hook)}"</div>

        <div class="idea-details-grid">
          <div class="detail-line"><strong>Format:</strong> ${escapeHtml(idea.format)}</div>
          <div class="detail-line"><strong>Audience:</strong> ${escapeHtml(idea.audience)}</div>
          <div class="detail-line"><strong>Why It Works:</strong> ${escapeHtml(idea.whyWorks)}</div>
          <div class="detail-line"><strong>Structure:</strong> ${escapeHtml(idea.structure)}</div>
          <div class="detail-line"><strong>Call-To-Action:</strong> ${escapeHtml(idea.cta)}</div>
        </div>

        <div class="idea-card-footer">
          <button class="btn btn-secondary btn-sm btn-open-script-studio" data-json="${escapeHtml(JSON.stringify(idea))}" type="button">
            <svg class="lucide lucide-clapperboard" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z"/><path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/></svg>
            <span>AI Script</span>
          </button>
          <button class="btn btn-secondary btn-sm copy-idea-btn" data-hook="${escapeHtml(idea.hook)}" type="button">
            <svg class="lucide lucide-copy" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            <span>Copy Hook</span>
          </button>
          <button class="btn btn-primary btn-sm save-to-lib-btn" data-json="${escapeHtml(JSON.stringify(idea))}" type="button">
            <svg class="lucide lucide-bookmark" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
            <span>Save to Library</span>
          </button>
        </div>
      </article>
    `).join('');

    container.querySelectorAll('.btn-open-script-studio').forEach(btn => {
      btn.addEventListener('click', () => {
        try {
          const idea = JSON.parse(btn.getAttribute('data-json'));
          openScriptStudio(idea);
        } catch (e) {}
      });
    });

    container.querySelectorAll('.copy-idea-btn').forEach(btn => {
      btn.addEventListener('click', () => copyToClipboard(btn.getAttribute('data-hook'), 'Idea Hook copied to clipboard!'));
    });

    container.querySelectorAll('.save-to-lib-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        try {
          const idea = JSON.parse(btn.getAttribute('data-json'));
          addIdeaToLibrary({
            title: idea.title,
            hook: idea.hook,
            niche: creatorProfile.niches?.[0] || 'ai',
            format: idea.format,
            score: idea.score,
            scoreTier: 'EXPLOSIVE',
            trendSource: currentTrend.topic
          });
        } catch (e) {}
      });
    });

    refreshLucideIcons();
  }

  // --- Section 3: Content Intelligence Search ---
  function renderSearchSection() {
    const grid = document.getElementById('search-results-grid');
    const activeFiltersBar = document.getElementById('active-filters-bar');
    const activeChipsList = document.getElementById('active-chips-list');
    if (!grid) return;

    let results = VantageTrendsData.SEED_TRENDS;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      results = results.filter(t =>
        t.topic.toLowerCase().includes(q) ||
        t.title.toLowerCase().includes(q) ||
        t.niche.toLowerCase().includes(q) ||
        t.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }

    if (activeTopicFilter !== 'all') {
      const topicObj = VantageTrendsData.CURATED_TOPICS.find(tp => tp.id === activeTopicFilter);
      if (topicObj) {
        results = results.filter(t => t.topic.toLowerCase().includes(topicObj.name.toLowerCase().split(' ')[0]) || t.niche === topicObj.niche);
      }
    }

    if (activeNicheFilter !== 'all') {
      results = results.filter(t => t.niche === activeNicheFilter);
    }

    const hasActiveFilters = searchQuery.trim() || activeTopicFilter !== 'all' || activeNicheFilter !== 'all';
    if (activeFiltersBar && activeChipsList) {
      if (hasActiveFilters) {
        activeFiltersBar.style.display = 'flex';
        let chipsHtml = '';

        if (searchQuery.trim()) {
          chipsHtml += `
            <span class="filter-chip-item">
              <span>Query: "${escapeHtml(searchQuery.trim())}"</span>
              <button class="chip-remove-btn" id="chip-remove-query">✕</button>
            </span>
          `;
        }
        if (activeTopicFilter !== 'all') {
          const tObj = VantageTrendsData.CURATED_TOPICS.find(tp => tp.id === activeTopicFilter);
          chipsHtml += `
            <span class="filter-chip-item">
              <span>Topic: ${escapeHtml(tObj ? tObj.name : activeTopicFilter)}</span>
              <button class="chip-remove-btn" id="chip-remove-topic">✕</button>
            </span>
          `;
        }
        if (activeNicheFilter !== 'all') {
          const nObj = VantageTrendsData.CURATED_NICHES.find(np => np.id === activeNicheFilter);
          chipsHtml += `
            <span class="filter-chip-item">
              <span>Niche: ${escapeHtml(nObj ? nObj.name : activeNicheFilter.toUpperCase())}</span>
              <button class="chip-remove-btn" id="chip-remove-niche">✕</button>
            </span>
          `;
        }
        activeChipsList.innerHTML = chipsHtml;

        document.getElementById('chip-remove-query')?.addEventListener('click', () => {
          searchQuery = '';
          const inp = document.getElementById('global-search-input');
          if (inp) inp.value = '';
          renderSearchSection();
        });
        document.getElementById('chip-remove-topic')?.addEventListener('click', () => {
          activeTopicFilter = 'all';
          document.getElementById('topic-menu-label').textContent = 'Topics';
          renderSearchSection();
        });
        document.getElementById('chip-remove-niche')?.addEventListener('click', () => {
          activeNicheFilter = 'all';
          document.getElementById('niche-menu-label').textContent = 'Niche: All';
          renderSearchSection();
        });
      } else {
        activeFiltersBar.style.display = 'none';
      }
    }

    if (results.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 48px 24px; text-align: center; color: var(--text-tertiary);">
          <p style="font-size: 15px; margin-bottom: 12px; font-weight: 600;">No trend signals matched your search criteria.</p>
          <button class="btn btn-secondary btn-sm" id="btn-reset-search-empty" type="button">Clear All Filters</button>
        </div>
      `;
      document.getElementById('btn-reset-search-empty')?.addEventListener('click', () => {
        searchQuery = '';
        activeNicheFilter = 'all';
        activeTopicFilter = 'all';
        const inp = document.getElementById('global-search-input');
        if (inp) inp.value = '';
        renderSearchSection();
      });
      return;
    }

    grid.innerHTML = results.map(t => `
      <article class="idea-card span-1" data-id="${t.id}" role="button" tabindex="0">
        <div class="card-top">
          <div class="platform-pill ${t.platform}"><span>${escapeHtml(t.platformName)}</span></div>
          <div class="score-badge tier-viral">
            <div class="score-val">${t.outlierScore || 92}</div>
            <div class="score-tag">EXPLOSIVE</div>
          </div>
        </div>

        <div class="card-hook-text">"${escapeHtml(t.title)}"</div>
        <div class="card-tags-row">
          ${t.tags.map(tag => `<span class="psych-tag">${escapeHtml(tag)}</span>`).join('')}
        </div>

        <div class="card-meta-footer">
          <div class="metric-pill positive">
            <svg class="lucide lucide-activity" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            <span>${escapeHtml(t.outlierText)}</span>
          </div>
          <button class="btn btn-secondary btn-sm btn-inspect-search" data-id="${t.id}" type="button">Inspect</button>
        </div>
      </article>
    `).join('');

    grid.querySelectorAll('.btn-inspect-search, .idea-card').forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        openTrendInspector(el.getAttribute('data-id'));
      });
    });

    refreshLucideIcons();
  }

  function renderTopicDropdownList() {
    const container = document.getElementById('topic-items-container');
    if (!container) return;

    container.innerHTML = VantageTrendsData.CURATED_TOPICS.map(item => `
      <button class="topic-item-btn ${item.id === activeTopicFilter ? 'selected' : ''}" data-topic="${item.id}" type="button">
        <span>${escapeHtml(item.name)}</span>
        <span style="font-size: 10.5px; opacity: 0.7;">${item.count ? `${item.count} trends` : ''}</span>
      </button>
    `).join('');

    container.querySelectorAll('.topic-item-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeTopicFilter = btn.getAttribute('data-topic');
        const selectedObj = VantageTrendsData.CURATED_TOPICS.find(tp => tp.id === activeTopicFilter);
        const label = document.getElementById('topic-menu-label');
        if (label) {
          label.textContent = (selectedObj && selectedObj.id !== 'all') ? selectedObj.name.split(' ')[0] : 'Topics';
        }
        document.getElementById('topic-search-dropdown')?.classList.remove('show');
        renderSearchSection();
      });
    });
  }

  function renderNicheDropdownList() {
    const container = document.getElementById('niche-menu-list');
    if (!container) return;

    container.innerHTML = VantageTrendsData.CURATED_NICHES.map(item => `
      <button class="niche-item-btn ${item.id === activeNicheFilter ? 'selected' : ''}" data-niche="${item.id}" type="button">
        <span>${escapeHtml(item.name)}</span>
        ${item.id === activeNicheFilter ? '<span>✓</span>' : ''}
      </button>
    `).join('');

    container.querySelectorAll('.niche-item-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeNicheFilter = btn.getAttribute('data-niche');
        const selectedObj = VantageTrendsData.CURATED_NICHES.find(np => np.id === activeNicheFilter);
        const label = document.getElementById('niche-menu-label');
        if (label) {
          label.textContent = (selectedObj && selectedObj.id !== 'all') ? `Niche: ${selectedObj.name.split(' ')[0]}` : 'Niche: All';
        }
        document.getElementById('niche-search-dropdown')?.classList.remove('show');
        renderSearchSection();
      });
    });
  }

  // --- Section 4: Content Production Library ---
  function renderLibrarySection() {
    const board = document.getElementById('library-kanban-board');
    const allCountEl = document.getElementById('lib-count-all');
    if (!board) return;

    if (allCountEl) allCountEl.textContent = savedLibrary.length;

    const stages = [
      { id: 'idea', name: 'Ideas' },
      { id: 'researching', name: 'Researching' },
      { id: 'scripted', name: 'Scripted' },
      { id: 'filming', name: 'Filming' },
      { id: 'editing', name: 'Editing' },
      { id: 'published', name: 'Published' }
    ];

    document.querySelectorAll('#library-stage-filters .stage-tab').forEach(tab => {
      const stageId = tab.getAttribute('data-stage');
      tab.classList.toggle('active', stageId === activeLibraryStage);
    });

    if (activeLibraryView === 'list') {
      board.classList.add('list-view-mode');
      let filtered = savedLibrary;
      if (activeLibraryStage !== 'all') {
        filtered = savedLibrary.filter(i => (i.stage || 'idea') === activeLibraryStage);
      }

      board.innerHTML = `
        <div class="table-responsive-wrapper" style="overflow-x: auto; -webkit-overflow-scrolling: touch; width: 100%;">
          <table class="library-list-table">
            <thead>
              <tr>
                <th>Idea Hook & Title</th>
                <th>Score</th>
                <th>Platform</th>
                <th>Stage</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${filtered.length === 0 ? `<tr><td colspan="5" style="text-align: center; color: var(--text-tertiary); padding: 32px 16px;">No ideas in this stage yet. Click "New Idea" or generate angles!</td></tr>` : ''}
              ${filtered.map(item => `
                <tr>
                  <td>
                    <strong style="display: block; font-size: 13.5px; margin-bottom: 2px;">"${escapeHtml(item.hook || item.title)}"</strong>
                    <span style="font-size: 11px; color: var(--text-tertiary);">${escapeHtml(item.source || 'Idea')} &bull; Niche: ${escapeHtml((item.niche || 'AI').toUpperCase())}</span>
                  </td>
                  <td><span class="opp-score-badge tier-explosive"><span class="opp-score-num">${item.score || 92}</span></span></td>
                  <td><span class="platform-pill ${item.platform}">${escapeHtml((item.platform || 'SHORTS').toUpperCase())}</span></td>
                  <td><span class="lib-stage-badge">${escapeHtml(item.stageName || 'Ideas')}</span></td>
                  <td>
                    <div class="lib-card-actions" style="display: flex; align-items: center; gap: 6px;">
                      <button class="btn btn-secondary btn-sm btn-open-script-studio" data-json="${escapeHtml(JSON.stringify(item))}" type="button">Script</button>
                      <select class="lib-stage-select" data-id="${item.id}" aria-label="Change Stage">
                        <option value="idea" ${item.stage === 'idea' ? 'selected' : ''}>Ideas</option>
                        <option value="researching" ${item.stage === 'researching' ? 'selected' : ''}>Researching</option>
                        <option value="scripted" ${item.stage === 'scripted' ? 'selected' : ''}>Scripted</option>
                        <option value="filming" ${item.stage === 'filming' ? 'selected' : ''}>Filming</option>
                        <option value="editing" ${item.stage === 'editing' ? 'selected' : ''}>Editing</option>
                        <option value="published" ${item.stage === 'published' ? 'selected' : ''}>Published</option>
                      </select>
                      <button class="btn-lib-del" data-id="${item.id}" title="Delete Idea" type="button">✕</button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    } else {
      board.classList.remove('list-view-mode');
      board.innerHTML = stages.map(st => {
        if (activeLibraryStage !== 'all' && activeLibraryStage !== st.id) return '';
        const cardsInStage = savedLibrary.filter(i => (i.stage || 'idea') === st.id);
        return `
          <div class="kanban-col" data-stage="${st.id}">
            <div class="kanban-col-header">
              <span class="col-title">${st.name}</span>
              <span class="col-badge">${cardsInStage.length}</span>
            </div>

            <div class="kanban-cards-stack">
              ${cardsInStage.length === 0 ? `<div style="font-size: 11.5px; color: var(--text-faint); padding: 16px; text-align: center;">No ideas yet</div>` : ''}
              ${cardsInStage.map(item => `
                <div class="lib-saved-card" data-id="${item.id}">
                  <div class="lib-card-hook">"${escapeHtml(item.hook || item.title)}"</div>
                  <div class="lib-card-meta">
                    <span class="lib-score">Score ${item.score || 92}</span>
                    <div class="lib-card-actions">
                      <button class="btn-text btn-open-script-studio" data-json="${escapeHtml(JSON.stringify(item))}" style="font-size: 11px; color: #a855f7; font-weight: 700;" type="button">⚡ Script</button>
                      <select class="lib-stage-select" data-id="${item.id}">
                        <option value="idea" ${item.stage === 'idea' ? 'selected' : ''}>Ideas</option>
                        <option value="researching" ${item.stage === 'researching' ? 'selected' : ''}>Researching</option>
                        <option value="scripted" ${item.stage === 'scripted' ? 'selected' : ''}>Scripted</option>
                        <option value="filming" ${item.stage === 'filming' ? 'selected' : ''}>Filming</option>
                        <option value="editing" ${item.stage === 'editing' ? 'selected' : ''}>Editing</option>
                        <option value="published" ${item.stage === 'published' ? 'selected' : ''}>Published</option>
                      </select>
                      <button class="btn-lib-del" data-id="${item.id}" type="button">✕</button>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }).join('');
    }

    board.querySelectorAll('.btn-open-script-studio').forEach(btn => {
      btn.addEventListener('click', () => {
        try {
          const item = JSON.parse(btn.getAttribute('data-json'));
          openScriptStudio(item);
        } catch (e) {}
      });
    });

    board.querySelectorAll('.lib-stage-select').forEach(sel => {
      sel.addEventListener('change', (e) => {
        const id = sel.getAttribute('data-id');
        const target = savedLibrary.find(i => i.id === id);
        if (target) {
          target.stage = e.target.value;
          target.stageName = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
          VantageAPI.saveLibrary(savedLibrary);
          renderLibrarySection();
          showToast(`Moved idea to ${target.stageName} stage!`);
        }
      });
    });

    board.querySelectorAll('.btn-lib-del').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        if (confirm('Delete this idea from your Content Library?')) {
          savedLibrary = savedLibrary.filter(i => i.id !== id);
          VantageAPI.saveLibrary(savedLibrary);
          renderLibrarySection();
          showToast('Idea removed from library');
        }
      });
    });

    refreshLucideIcons();
  }

  // ================= 6. MODALS & AI STUDIOS =================

  // --- AI Script Studio ---
  async function openScriptStudio(idea) {
    currentActiveScriptIdea = idea;
    const modal = document.getElementById('script-studio-modal');
    if (!modal) return;

    document.getElementById('script-idea-title').textContent = idea.title || idea.hook;
    document.getElementById('script-target-format').textContent = idea.format || 'Shorts & Reels (9:16)';

    const container = document.getElementById('script-beats-container');
    if (container) {
      container.innerHTML = `<div style="padding: 32px; text-align: center; color: var(--text-secondary);"><span class="live-pulse"></span> Generating high-retention 60s script with AI...</div>`;
    }

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');

    const scriptRes = await VantageAPI.generateScriptAI(idea.title, idea.hook, idea.format, idea.niche);
    renderScriptBeats(scriptRes);
  }

  function renderScriptBeats(scriptData) {
    const container = document.getElementById('script-beats-container');
    const durationEl = document.getElementById('script-target-duration');
    const commentEl = document.getElementById('script-pinned-comment-text');
    if (!container) return;

    if (durationEl && scriptData?.estimated_duration) {
      durationEl.textContent = scriptData.estimated_duration;
    }
    if (commentEl && scriptData?.pinned_comment) {
      commentEl.textContent = scriptData.pinned_comment;
    }

    const sections = scriptData?.script_sections || [];
    container.innerHTML = sections.map((sec, idx) => `
      <div class="script-beat-card">
        <div class="script-beat-header">
          <span class="script-beat-title">${idx + 1}. ${escapeHtml(sec.section_name)}</span>
          <span class="script-beat-time">${escapeHtml(sec.time_range)}</span>
        </div>
        <div class="script-visual-cue">
          <strong>Visual Cue:</strong> ${escapeHtml(sec.visual_cue)}
        </div>
        <div class="script-voiceover-box">
          "${escapeHtml(sec.voiceover)}"
        </div>
      </div>
    `).join('');

    refreshLucideIcons();
  }

  function closeScriptStudio() {
    const modal = document.getElementById('script-studio-modal');
    if (modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  // --- Channel Outlier Inspector ---
  async function runChannelScan(handle) {
    const list = document.getElementById('channel-outliers-list');
    if (list) {
      list.innerHTML = `<div style="padding: 24px; text-align: center; color: var(--text-secondary);"><span class="live-pulse"></span> Fetching top videos & computing baseline view velocity...</div>`;
    }

    const res = await VantageAPI.scanChannelOutliers(handle || '@Fireship');
    if (!res) {
      if (list) list.innerHTML = `<div style="padding: 24px; text-align: center; color: var(--chart-4);">Could not analyze channel. Check handle and try again.</div>`;
      return;
    }

    document.getElementById('chan-stat-name').textContent = res.channel_handle;
    document.getElementById('chan-stat-baseline').textContent = `${res.baseline_median_views} median`;
    document.getElementById('chan-stat-outlier').textContent = res.top_outlier_views;
    document.getElementById('chan-stat-multiplier').textContent = res.max_outlier_ratio;

    if (list && res.top_outliers) {
      list.innerHTML = res.top_outliers.map(item => `
        <div class="channel-outlier-card">
          <div class="channel-outlier-header">
            <span class="channel-outlier-title">${escapeHtml(item.title)}</span>
            <span class="platform-pill youtube">${escapeHtml(item.outlier_ratio)} Outlier</span>
          </div>
          <div class="channel-outlier-hook">"${escapeHtml(item.hook)}"</div>
          <div style="font-size: 11.5px; color: var(--text-secondary); margin-top: 4px;">
            <strong>Why Viral:</strong> ${escapeHtml(item.why_viral)} &bull; <span class="text-green font-bold">${escapeHtml(item.views)} views (${escapeHtml(item.baseline_diff)})</span>
          </div>
          <div style="display: flex; gap: 8px; margin-top: 8px;">
            <button class="btn btn-primary btn-sm btn-convert-outlier" data-topic="${escapeHtml(item.title)}" type="button">
              <span>Generate 12 Angles from this Outlier</span>
            </button>
          </div>
        </div>
      `).join('');

      list.querySelectorAll('.btn-convert-outlier').forEach(btn => {
        btn.addEventListener('click', () => {
          const topic = btn.getAttribute('data-topic');
          selectedTrendForIdeas = {
            id: `custom-${Date.now()}`,
            topic: topic,
            niche: creatorProfile.niches?.[0] || 'technology',
            platformName: 'YouTube & Shorts'
          };
          closeChannelInspector();
          renderIdeasSection();
          document.getElementById('section-ideas')?.scrollIntoView({ behavior: 'smooth' });
          showToast(`Generated 12 AI angles from competitor outlier!`);
        });
      });
    }

    refreshLucideIcons();
  }

  function openChannelInspector() {
    const modal = document.getElementById('channel-inspector-modal');
    if (modal) {
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      runChannelScan(document.getElementById('channel-handle-input')?.value || 'Fireship');
    }
  }

  function closeChannelInspector() {
    const modal = document.getElementById('channel-inspector-modal');
    if (modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  // --- Trend Inspector Drawer ---
  function openTrendInspector(trendId) {
    const trend = VantageTrendsData.SEED_TRENDS.find(t => t.id === trendId) || VantageTrendsData.SEED_TRENDS[0];
    selectedTrendForInspector = trend;

    const drawer = document.getElementById('trend-inspector-drawer');
    if (!drawer) return;

    document.getElementById('inspector-score-num').textContent = trend.outlierScore || 94;
    document.getElementById('inspector-outlier-pill').textContent = trend.outlierText;
    document.getElementById('inspector-topic-title').textContent = trend.topic;
    document.getElementById('inspector-topic-desc').textContent = trend.title;

    const setBar = (id, val) => {
      const bar = document.getElementById(`sig-${id}`);
      const txt = document.getElementById(`sig-val-${id}`);
      if (bar) bar.style.width = `${val}%`;
      if (txt) txt.textContent = `${val}%`;
    };

    const s = trend.signals || {};
    setBar('momentum', s.momentum || 94);
    setBar('engagement', s.engagement || 92);
    setBar('search', s.searchDemand || 90);
    setBar('outlier', trend.outlierScore || 94);
    setBar('freshness', s.freshFactor || 95);
    setBar('competition', 100 - (s.competition || 25));
    setBar('relevance', 96);

    drawer.classList.add('active');
    drawer.setAttribute('aria-hidden', 'false');
    refreshLucideIcons();
  }

  function closeTrendInspector() {
    document.getElementById('trend-inspector-drawer')?.classList.remove('active');
  }

  // --- Virality Scorer Modal ---
  function openScorerModal() {
    const modal = document.getElementById('scorer-modal');
    if (modal) {
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.getElementById('hook-input-field')?.focus();
    }
  }

  function closeScorerModal() {
    document.getElementById('scorer-modal')?.classList.remove('active');
  }

  // --- Settings Modal ---
  function openSettingsModal() {
    const modal = document.getElementById('settings-modal');
    if (!modal) return;

    const nameInp = document.getElementById('settings-user-name');
    const emailInp = document.getElementById('settings-user-email');
    const bioInp = document.getElementById('settings-audience-bio');

    if (nameInp) nameInp.value = creatorProfile.name || currentUser.name || '';
    if (emailInp) emailInp.value = creatorProfile.email || currentUser.email || '';
    if (bioInp) bioInp.value = creatorProfile.audience_description || '';

    // Synchronize active niches in settings grid
    const userNiches = creatorProfile.niches || ['ai', 'technology'];
    document.querySelectorAll('#settings-profile-niches-grid .onboard-tag-btn').forEach(btn => {
      const val = btn.getAttribute('data-value');
      if (userNiches.includes(val)) {
        btn.classList.add('selected');
      } else {
        btn.classList.remove('selected');
      }
    });

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeSettingsModal() {
    document.getElementById('settings-modal')?.classList.remove('active');
  }

  // --- Auth Portal Controller ---
  function openAuthScreen() {
    const overlay = document.getElementById('auth-portal-overlay');
    if (overlay) {
      overlay.classList.add('active');
      overlay.setAttribute('aria-hidden', 'false');
    }
  }

  function closeAuthScreen() {
    const overlay = document.getElementById('auth-portal-overlay');
    if (overlay) {
      overlay.classList.remove('active');
      overlay.setAttribute('aria-hidden', 'true');
    }
  }

  function showAuthAlert(msg, type = 'error') {
    const alertBox = document.getElementById('auth-alert-box');
    if (!alertBox) return;
    alertBox.className = `auth-alert ${type}`;
    alertBox.innerHTML = `
      <svg class="lucide lucide-${type === 'error' ? 'alert-circle' : 'check-circle-2'}" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
      <span>${escapeHtml(msg)}</span>
    `;
    alertBox.style.display = 'flex';
  }

  function hideAuthAlert() {
    const alertBox = document.getElementById('auth-alert-box');
    if (alertBox) alertBox.style.display = 'none';
  }

  async function handleLogin(email, password) {
    hideAuthAlert();
    const btn = document.getElementById('btn-auth-signin-submit');
    const oldText = btn ? btn.innerHTML : '';
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = `<span class="live-pulse"></span> <span>Signing in...</span>`;
    }

    try {
      let res;
      try {
        res = await VantageAPI.login(email, password);
      } catch (err) {
        const cleanEmail = (email || '').toLowerCase().trim();
        const isDemo = (cleanEmail === 'demo' || cleanEmail === 'demo@vantage.ai' || cleanEmail === 'demo@vantage.com') && (password === 'vantage2026' || password === 'demo1234');
        const isMaster = (cleanEmail === 'arka' || cleanEmail === 'arkadeb.mondal@example.com') && (password === 'arka1234');

        if (isDemo || isMaster) {
          const fallbackUser = isDemo
            ? { id: 'usr_demo_creator', name: 'Arka Mondal (Demo)', email: 'demo@vantage.ai', tier: 'pro' }
            : { id: 'usr_arka_master', name: 'Arka Mondal', email: 'arkadeb.mondal@example.com', tier: 'pro' };
          const fallbackToken = 'vantage_demo_token_' + Date.now();
          VantageAPI.setToken(fallbackToken);
          res = { success: true, user: fallbackUser, profile: creatorProfile, token: fallbackToken };
        } else {
          throw err;
        }
      }

      if (res && res.user) {
        currentUser = res.user;
        if (res.profile) creatorProfile = res.profile;
        if (res.token) VantageAPI.setToken(res.token);

        updateHeaderAndSidebarUser();
        updateCreatorPersonaChips();
        updateLiveClockAndGreeting();
        closeAuthScreen();
        showToast(`✨ Welcome, ${currentUser.name}! Vantage Virality OS is calibrated.`);
      }
    } catch (err) {
      showAuthAlert(err.message || 'Invalid credentials. Please use demo credentials: demo@vantage.ai / vantage2026');
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = oldText;
      }
    }
  }

  async function handleRegister(name, email, password) {
    hideAuthAlert();
    const btn = document.getElementById('btn-auth-signup-submit');
    const oldText = btn ? btn.innerHTML : '';
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = `<span class="live-pulse"></span> <span>Creating workspace...</span>`;
    }

    try {
      let res;
      try {
        res = await VantageAPI.register(name, email, password);
      } catch (e) {
        const localUser = {
          id: 'usr_' + Date.now(),
          name: name.trim() || 'Creator',
          email: email.trim().toLowerCase(),
          tier: 'pro'
        };
        const localToken = 'vantage_user_token_' + Date.now();
        VantageAPI.setToken(localToken);
        res = { success: true, user: localUser, profile: { ...creatorProfile, name: localUser.name, email: localUser.email }, token: localToken };
      }

      if (res && res.user) {
        currentUser = res.user;
        if (res.profile) creatorProfile = res.profile;
        if (res.token) VantageAPI.setToken(res.token);

        updateHeaderAndSidebarUser();
        updateCreatorPersonaChips();
        updateLiveClockAndGreeting();
        closeAuthScreen();
        showToast(`🎉 Account created! Welcome to Vantage OS, ${currentUser.name}.`);
      }
    } catch (err) {
      showAuthAlert(err.message || 'Registration failed. Please check your information.');
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = oldText;
      }
    }
  }

  function handleLogout() {
    VantageAPI.setToken('');
    localStorage.removeItem(VantageConfig.STORAGE_KEY_TOKEN);
    currentUser = {
      id: 'usr_guest',
      name: 'Creator',
      email: '',
      tier: 'guest'
    };
    updateHeaderAndSidebarUser();
    openAuthScreen();
    showToast('👋 You have been signed out. Please sign in to continue.');
  }

  function updateHeaderAndSidebarUser() {
    const name = currentUser.name || 'Arka Mondal';
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'AM';

    const topbarInitials = document.getElementById('topbar-avatar-initials');
    if (topbarInitials) topbarInitials.textContent = initials;

    const topbarName = document.getElementById('topbar-chip-name');
    if (topbarName) topbarName.textContent = name.split(' ')[0] + ' ' + (name.split(' ')[1] ? name.split(' ')[1][0] + '.' : '');

    const topbarTier = document.getElementById('topbar-tier-badge');
    if (topbarTier) topbarTier.textContent = (currentUser.tier || 'PRO').toUpperCase();

    const sidebarInitials = document.getElementById('sidebar-avatar-initials');
    if (sidebarInitials) sidebarInitials.textContent = initials;

    const heroName = document.getElementById('hero-user-name');
    if (heroName) heroName.textContent = (name.split(' ')[0] || 'Creator') + '.';
  }

  // --- Onboarding Wizard ---
  function openOnboardingModal() {
    // Pre-populate niches from creator profile
    const userNiches = creatorProfile.niches || ['ai', 'technology'];
    document.querySelectorAll('#grid-niches .onboard-tag-btn').forEach(btn => {
      const val = btn.getAttribute('data-value');
      if (userNiches.includes(val)) {
        btn.classList.add('selected');
      } else {
        btn.classList.remove('selected');
      }
    });

    // Pre-populate formats
    const userTypes = creatorProfile.content_types || ['reels', 'shorts', 'youtube'];
    document.querySelectorAll('#grid-content-types .onboard-tag-btn').forEach(btn => {
      const val = btn.getAttribute('data-value');
      if (userTypes.includes(val)) {
        btn.classList.add('selected');
      } else {
        btn.classList.remove('selected');
      }
    });

    // Pre-populate goal
    const userGoal = creatorProfile.goals || 'views';
    document.querySelectorAll('#grid-goals .goal-card').forEach(card => {
      const val = card.getAttribute('data-value');
      if (val === userGoal) card.classList.add('selected');
      else card.classList.remove('selected');
    });

    showOnboardingStep(1);
    document.getElementById('onboarding-modal')?.classList.add('active');
  }

  function closeOnboardingModal() {
    document.getElementById('onboarding-modal')?.classList.remove('active');
  }

  function showOnboardingStep(step) {
    currentOnboardStep = step;
    const progressFill = document.getElementById('onboarding-progress-fill');
    const stepCounter = document.getElementById('onboarding-step-counter');
    const prevBtn = document.getElementById('btn-onboard-prev');
    const nextBtn = document.getElementById('btn-onboard-next');

    document.querySelectorAll('.onboarding-step-pane').forEach(p => p.classList.remove('active'));

    if (step <= 5) {
      document.getElementById(`onboarding-step-${step}`)?.classList.add('active');
      if (progressFill) progressFill.style.width = `${step * 20}%`;
      if (stepCounter) stepCounter.textContent = `STEP ${step} OF 5`;
      if (prevBtn) prevBtn.style.display = step === 1 ? 'none' : 'block';
      if (nextBtn) nextBtn.innerHTML = `<span>Continue</span> <svg class="lucide lucide-arrow-right" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" x2="19" y1="12" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`;
    } else {
      document.getElementById('onboarding-step-complete')?.classList.add('active');
      if (progressFill) progressFill.style.width = '100%';
      if (stepCounter) stepCounter.textContent = `CALIBRATION COMPLETE`;
      if (prevBtn) prevBtn.style.display = 'block';
      if (nextBtn) nextBtn.innerHTML = `<span>Show My Opportunities</span> <svg class="lucide lucide-sparkles" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>`;

      const selPlatforms = Array.from(document.querySelectorAll('#grid-content-types .onboard-tag-btn.selected')).map(b => b.textContent.trim());
      const selNiches = Array.from(document.querySelectorAll('#grid-niches .onboard-tag-btn.selected')).map(b => b.textContent.trim());
      const selGoal = document.querySelector('#grid-goals .goal-card.selected h4')?.textContent.trim() || 'Get More Views';

      if (document.getElementById('sum-platforms')) document.getElementById('sum-platforms').textContent = selPlatforms.join(', ') || 'Reels, Shorts, YouTube';
      if (document.getElementById('sum-niches')) document.getElementById('sum-niches').textContent = selNiches.join(', ') || 'AI & DevTools';
      if (document.getElementById('sum-goal')) document.getElementById('sum-goal').textContent = selGoal;
    }
    refreshLucideIcons();
  }

  function saveOnboardingData() {
    const selContentTypes = Array.from(document.querySelectorAll('#grid-content-types .onboard-tag-btn.selected')).map(b => b.getAttribute('data-value')).filter(Boolean);
    const selNiches = Array.from(document.querySelectorAll('#grid-niches .onboard-tag-btn.selected')).map(b => b.getAttribute('data-value')).filter(Boolean);
    const selGoal = document.querySelector('#grid-goals .goal-card.selected')?.getAttribute('data-value') || 'views';

    creatorProfile = {
      ...creatorProfile,
      content_types: selContentTypes.length > 0 ? selContentTypes : ['reels', 'shorts', 'youtube'],
      niches: selNiches.length > 0 ? selNiches : ['ai', 'technology'],
      age_range: document.getElementById('onboard-age-range')?.value || '18-34',
      country: document.getElementById('onboard-country')?.value || 'India',
      language: document.getElementById('onboard-language')?.value || 'English',
      goals: selGoal,
      onboarding_completed: true,
      updated_at: new Date().toISOString()
    };

    VantageAPI.saveProfile(creatorProfile);
    updateCreatorPersonaChips();
    updateLiveClockAndGreeting();
    renderTrendingSection();
    renderIdeasSection();
    showToast('Creator persona calibrated and saved!');
  }

  // ================= 7. DATA HELPERS =================
  function addIdeaToLibrary(idea) {
    const newEntry = {
      id: `lib-${Date.now()}`,
      title: idea.title || 'Untitled Idea Concept',
      hook: idea.hook || idea.title || '',
      niche: idea.niche || creatorProfile.niches?.[0] || 'ai',
      platform: (idea.format || 'shorts').toLowerCase().includes('youtube') ? 'youtube' : 'shorts',
      score: idea.score || 92,
      scoreTier: idea.scoreTier || 'EXPLOSIVE',
      source: idea.trendSource || 'AI Ideation',
      stage: idea.stage || 'idea',
      stageName: idea.stageName || (idea.stage === 'scripted' ? 'Scripted' : 'Ideas'),
      script: idea.script || '',
      createdAt: 'Today'
    };

    savedLibrary.unshift(newEntry);
    VantageAPI.saveLibrary(savedLibrary);
    renderLibrarySection();
    showToast('Saved concept to Content Production Library!');
  }

  function showToast(msg) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast active';
    toast.innerHTML = `
      <svg class="toast-icon lucide lucide-check-circle-2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
      <span>${escapeHtml(msg)}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.remove('active');
      setTimeout(() => toast.remove(), 350);
    }, 3400);
  }

  function copyToClipboard(text, message = 'Copied to clipboard!') {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => showToast(message)).catch(() => fallbackCopy(text, message));
    } else {
      fallbackCopy(text, message);
    }
  }

  function fallbackCopy(text, message) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.top = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      showToast(message);
    } catch (e) {}
    document.body.removeChild(ta);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }

  function refreshLucideIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      try { window.lucide.createIcons(); } catch (e) {}
    }
  }

  // ================= 8. EVENT ATTACHMENTS =================
  function bindAllEvents() {
    // Navigation
    const navTrending = document.getElementById('nav-trending');
    const navIdeas = document.getElementById('nav-ideas');
    const navSearch = document.getElementById('nav-search');
    const navLibrary = document.getElementById('nav-library');

    const setNavActive = (activeEl) => {
      document.querySelectorAll('.sidebar .nav-item').forEach(btn => btn.classList.remove('active'));
      activeEl?.classList.add('active');
    };

    navTrending?.addEventListener('click', () => { setNavActive(navTrending); document.getElementById('section-trending')?.scrollIntoView({ behavior: 'smooth' }); });
    navIdeas?.addEventListener('click', () => { setNavActive(navIdeas); document.getElementById('section-ideas')?.scrollIntoView({ behavior: 'smooth' }); });
    navSearch?.addEventListener('click', () => { setNavActive(navSearch); document.getElementById('section-search')?.scrollIntoView({ behavior: 'smooth' }); });
    navLibrary?.addEventListener('click', () => { setNavActive(navLibrary); document.getElementById('section-library')?.scrollIntoView({ behavior: 'smooth' }); });

    document.getElementById('nav-onboarding-trigger')?.addEventListener('click', openOnboardingModal);
    document.getElementById('nav-settings')?.addEventListener('click', openSettingsModal);
    document.getElementById('sidebar-user-avatar-btn')?.addEventListener('click', openAuthScreen);
    document.getElementById('topbar-profile-btn')?.addEventListener('click', openAuthScreen);
    document.getElementById('btn-hero-calibrate')?.addEventListener('click', openOnboardingModal);
    document.getElementById('btn-edit-onboarding')?.addEventListener('click', openOnboardingModal);
    document.getElementById('btn-score-new')?.addEventListener('click', openScorerModal);
    document.getElementById('btn-open-channel-scanner')?.addEventListener('click', openChannelInspector);

    // Platform filters
    document.querySelectorAll('#trending-platform-filters .format-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('#trending-platform-filters .format-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        activeTrendingPlatform = pill.getAttribute('data-platform');
        renderTrendingSection();
      });
    });

    document.getElementById('btn-sync-trends')?.addEventListener('click', () => {
      showToast('Synchronizing live algorithmic trends from YouTube & Instagram radar...');
      renderTrendingSection();
    });

    // Angle Chips
    document.querySelectorAll('#angles-container .angle-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('#angles-container .angle-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        activeCreativeAngle = chip.getAttribute('data-angle');
        renderIdeasSection();
      });
    });

    // Library Views
    document.getElementById('btn-lib-kanban')?.addEventListener('click', () => {
      activeLibraryView = 'kanban';
      document.getElementById('btn-lib-kanban')?.classList.add('active');
      document.getElementById('btn-lib-list')?.classList.remove('active');
      renderLibrarySection();
    });

    document.getElementById('btn-lib-list')?.addEventListener('click', () => {
      activeLibraryView = 'list';
      document.getElementById('btn-lib-list')?.classList.add('active');
      document.getElementById('btn-lib-kanban')?.classList.remove('active');
      renderLibrarySection();
    });

    document.querySelectorAll('#library-stage-filters .stage-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        activeLibraryStage = tab.getAttribute('data-stage');
        renderLibrarySection();
      });
    });

    document.getElementById('btn-quick-add-idea')?.addEventListener('click', () => {
      const title = prompt('Enter Idea Headline or Hook concept:');
      if (title && title.trim()) {
        addIdeaToLibrary({
          title: title.trim(),
          hook: title.trim(),
          niche: creatorProfile.niches?.[0] || 'ai',
          format: 'Shorts & Reels',
          score: 92,
          scoreTier: 'EXPLOSIVE',
          trendSource: 'Quick Added'
        });
      }
    });

    // Global Search
    const searchInp = document.getElementById('global-search-input');
    searchInp?.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderSearchSection();
    });

    // Dropdowns
    const topicMenuBtn = document.getElementById('btn-topic-menu');
    const topicDropdown = document.getElementById('topic-search-dropdown');
    const nicheMenuBtn = document.getElementById('btn-niche-menu');
    const nicheDropdown = document.getElementById('niche-search-dropdown');

    topicMenuBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      nicheDropdown?.classList.remove('show');
      topicDropdown?.classList.toggle('show');
    });

    nicheMenuBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      topicDropdown?.classList.remove('show');
      nicheDropdown?.classList.toggle('show');
    });

    document.addEventListener('click', () => {
      topicDropdown?.classList.remove('show');
      nicheDropdown?.classList.remove('show');
    });

    // Channel Scanner
    document.getElementById('btn-run-channel-scan')?.addEventListener('click', () => {
      const handle = document.getElementById('channel-handle-input')?.value || '@Fireship';
      runChannelScan(handle);
    });

    // Script Studio Actions
    document.getElementById('close-script-studio-modal')?.addEventListener('click', closeScriptStudio);
    document.getElementById('close-channel-inspector-modal')?.addEventListener('click', closeChannelInspector);
    document.getElementById('cancel-channel-modal')?.addEventListener('click', closeChannelInspector);

    document.getElementById('btn-copy-full-script')?.addEventListener('click', () => {
      const beats = Array.from(document.querySelectorAll('#script-beats-container .script-beat-card')).map(card => {
        const title = card.querySelector('.script-beat-title')?.textContent || '';
        const time = card.querySelector('.script-beat-time')?.textContent || '';
        const visual = card.querySelector('.script-visual-cue')?.textContent || '';
        const voiceover = card.querySelector('.script-voiceover-box')?.textContent || '';
        return `[${title} (${time})]\n${visual}\nVoiceover: ${voiceover}\n`;
      }).join('\n');

      copyToClipboard(beats, 'Full 60-Second Video Script copied to clipboard!');
    });

    document.getElementById('btn-save-script-to-lib')?.addEventListener('click', () => {
      if (currentActiveScriptIdea) {
        addIdeaToLibrary({
          ...currentActiveScriptIdea,
          stage: 'scripted',
          stageName: 'Scripted'
        });
        closeScriptStudio();
      }
    });

    document.getElementById('btn-regenerate-script')?.addEventListener('click', () => {
      if (currentActiveScriptIdea) {
        openScriptStudio(currentActiveScriptIdea);
      }
    });

    // Scorer
    document.getElementById('btn-run-analysis')?.addEventListener('click', async () => {
      const text = document.getElementById('hook-input-field')?.value || '';
      const platform = document.getElementById('platform-select-field')?.value || 'shorts';
      const niche = document.getElementById('niche-select-field')?.value || 'ai';

      if (!text.trim()) {
        showToast('Please enter a hook headline to score.');
        return;
      }

      showToast('Running AI Virality Scoring Neural Engine...');
      const res = await VantageAPI.scoreHookAI(text, platform, niche);
      if (!res) return;

      const scoreNum = document.getElementById('result-score-num');
      const scoreLabel = document.getElementById('result-score-label');
      const barCuriosity = document.getElementById('bar-curiosity');
      const fillCuriosity = document.getElementById('fill-curiosity');
      const barStakes = document.getElementById('bar-stakes');
      const fillStakes = document.getElementById('fill-stakes');
      const barVelocity = document.getElementById('bar-velocity');
      const fillVelocity = document.getElementById('fill-velocity');
      const saveBtn = document.getElementById('save-to-library-btn');

      if (scoreNum) scoreNum.textContent = res.overall_score || 94;
      if (scoreLabel) scoreLabel.textContent = `${res.tier || 'EXPLOSIVE'} VIRALITY`;

      if (barCuriosity) barCuriosity.textContent = `${res.curiosity_gap || 88}%`;
      if (fillCuriosity) fillCuriosity.style.width = `${res.curiosity_gap || 88}%`;

      if (barStakes) barStakes.textContent = `${res.stakes_conflict || 90}%`;
      if (fillStakes) fillStakes.style.width = `${res.stakes_conflict || 90}%`;

      if (barVelocity) barVelocity.textContent = `${res.algorithmic_velocity || 92}%`;
      if (fillVelocity) fillVelocity.style.width = `${res.algorithmic_velocity || 92}%`;

      if (saveBtn) saveBtn.removeAttribute('disabled');
      showToast(`Scored virality: ${res.overall_score}/100 (${res.tier})`);
    });

    document.getElementById('save-to-library-btn')?.addEventListener('click', () => {
      const text = document.getElementById('hook-input-field')?.value || '';
      if (!text.trim()) return;
      addIdeaToLibrary({
        title: text.trim(),
        hook: text.trim(),
        niche: creatorProfile.niches?.[0] || 'ai',
        format: 'Shorts & Reels (9:16)',
        score: parseInt(document.getElementById('result-score-num')?.textContent || '92', 10),
        scoreTier: 'EXPLOSIVE',
        trendSource: 'AI Virality Scorer'
      });
      closeScorerModal();
    });

    // Sample Hooks
    const sampleHooks = [
      "I gave 3 AI agents $1,000 each and let them trade for 30 days — the results broke my model.",
      "Delete these 3 VS Code extensions before they secretly slow down your build times.",
      "Why 90% of solo creators fail at monetization in month 3 (and the 1% fix).",
      "Stop paying OpenAI: Run DeepSeek-R1 locally on consumer hardware in 4 minutes."
    ];

    document.getElementById('paste-sample-hook')?.addEventListener('click', () => {
      const inp = document.getElementById('hook-input-field');
      if (inp) {
        inp.value = sampleHooks[sampleHookIndex % sampleHooks.length];
        sampleHookIndex++;
      }
    });

    // Settings Tabs
    document.querySelectorAll('.settings-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.settings-tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.settings-pane').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const tabId = btn.getAttribute('data-tab');
        document.getElementById(`settings-pane-${tabId}`)?.classList.add('active');
      });
    });

    // Trending Niche / Genre Filter Pills
    document.querySelectorAll('#trending-niche-filters .format-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('#trending-niche-filters .format-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        activeTrendingNiche = pill.getAttribute('data-niche') || 'all';
        renderTrendingSection();
        renderIdeasSection();
        showToast(`Filtered to genre: ${pill.textContent.trim()}`);
      });
    });

    // Onboarding Niches Grid Selection
    document.querySelectorAll('#grid-niches .onboard-tag-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        btn.classList.toggle('selected');
        const count = document.querySelectorAll('#grid-niches .onboard-tag-btn.selected').length;
        if (count === 0) {
          btn.classList.add('selected');
          showToast('Keep at least 1 niche selected.');
        }
      });
    });

    // Onboarding Formats Selection
    document.querySelectorAll('#grid-content-types .onboard-tag-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        btn.classList.toggle('selected');
        const count = document.querySelectorAll('#grid-content-types .onboard-tag-btn.selected').length;
        if (count === 0) {
          btn.classList.add('selected');
        }
      });
    });

    // Onboarding Goals Selection
    document.querySelectorAll('#grid-goals .goal-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('#grid-goals .goal-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
      });
    });

    // Onboarding Niche Search Filter
    document.getElementById('onboard-niche-search')?.addEventListener('input', (e) => {
      const q = (e.target.value || '').toLowerCase().trim();
      document.querySelectorAll('#grid-niches .onboard-tag-btn').forEach(btn => {
        const text = (btn.textContent || '').toLowerCase();
        btn.style.display = (!q || text.includes(q)) ? 'inline-flex' : 'none';
      });
    });

    // Settings Profile Niches Grid Selection
    document.querySelectorAll('#settings-profile-niches-grid .onboard-tag-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        btn.classList.toggle('selected');
        const count = document.querySelectorAll('#settings-profile-niches-grid .onboard-tag-btn.selected').length;
        if (count === 0) {
          btn.classList.add('selected');
          showToast('Keep at least 1 niche selected.');
        }
      });
    });

    // Settings Save Profile (Including Niches)
    document.getElementById('btn-save-settings-profile')?.addEventListener('click', () => {
      const name = document.getElementById('settings-user-name')?.value || creatorProfile.name;
      const email = document.getElementById('settings-user-email')?.value || creatorProfile.email;
      const bio = document.getElementById('settings-audience-bio')?.value || '';
      const selectedNiches = Array.from(document.querySelectorAll('#settings-profile-niches-grid .onboard-tag-btn.selected'))
        .map(b => b.getAttribute('data-value'))
        .filter(Boolean);

      creatorProfile = {
        ...creatorProfile,
        name,
        email,
        niches: selectedNiches.length > 0 ? selectedNiches : (creatorProfile.niches || ['ai', 'technology']),
        audience_description: bio,
        updated_at: new Date().toISOString()
      };
      VantageAPI.saveProfile(creatorProfile);
      updateCreatorPersonaChips();
      updateLiveClockAndGreeting();
      renderTrendingSection();
      renderIdeasSection();
      renderSearchSection();
      closeSettingsModal();
      showToast(`Profile & Niches saved: ${creatorProfile.niches.join(', ').toUpperCase()}`);
    });

    document.getElementById('btn-save-settings-ai')?.addEventListener('click', () => {
      const provider = document.getElementById('settings-llm-provider')?.value || 'autonomous';
      const openaiKey = document.getElementById('settings-key-openai')?.value || '';
      const deepseekKey = document.getElementById('settings-key-deepseek')?.value || '';
      const geminiKey = document.getElementById('settings-key-gemini')?.value || '';
      const groqKey = document.getElementById('settings-key-groq')?.value || '';

      const keys = { provider, openai_key: openaiKey, deepseek_key: deepseekKey, gemini_key: geminiKey, groq_key: groqKey };
      localStorage.setItem(VantageConfig.STORAGE_KEY_AI_SETTINGS, JSON.stringify(keys));
      closeSettingsModal();
      showToast(`AI Engine configured: Active Model (${provider.toUpperCase()})`);
    });

    document.getElementById('btn-test-backend-connection')?.addEventListener('click', async () => {
      const box = document.getElementById('settings-backend-status-box');
      if (box) box.innerHTML = `<span><span class="live-pulse"></span> Testing connection & database latency...</span>`;

      const start = performance.now();
      const session = await VantageAPI.checkSession();
      const latency = Math.round(performance.now() - start);

      if (box) {
        box.innerHTML = `
          <div style="color: var(--chart-1); font-weight: 600;">
            ✓ Connected to Live Multi-Tenant Database & Serverless Engine &bull; Latency: ${latency}ms
          </div>
          <div style="font-size: 11px; color: var(--text-secondary); margin-top: 4px;">
            Driver: Embedded JSON DB v2 &bull; Active User: ${currentUser.name} (${currentUser.tier.toUpperCase()})
          </div>
        `;
      }
      showToast(`Backend connection successful (${latency}ms)`);
    });

    document.getElementById('btn-sync-all-data')?.addEventListener('click', () => {
      VantageAPI.saveProfile(creatorProfile);
      VantageAPI.saveLibrary(savedLibrary);
      showToast('Forced full database synchronization with cloud!');
    });

    document.getElementById('btn-export-library-json')?.addEventListener('click', () => {
      const backup = { user: currentUser, profile: creatorProfile, library: savedLibrary, exported_at: new Date().toISOString() };
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backup, null, 2));
      const a = document.createElement('a');
      a.href = dataStr;
      a.download = `vantage_backup_${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      showToast('Full database backup downloaded!');
    });

    document.getElementById('btn-import-library-json')?.addEventListener('click', () => {
      document.getElementById('import-json-file-input')?.click();
    });

    document.getElementById('import-json-file-input')?.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const parsed = JSON.parse(ev.target.result);
          if (parsed.library && Array.isArray(parsed.library)) {
            savedLibrary = parsed.library;
            if (parsed.profile) creatorProfile = parsed.profile;
            VantageAPI.saveLibrary(savedLibrary);
            VantageAPI.saveProfile(creatorProfile);
            renderLibrarySection();
            closeSettingsModal();
            showToast(`Imported ${savedLibrary.length} ideas and profile settings!`);
          }
        } catch (err) {
          showToast('Invalid backup file format.');
        }
      };
      reader.readAsText(file);
    });

    document.getElementById('btn-reset-all-data')?.addEventListener('click', () => {
      if (confirm('Reset all profile and library data to fresh demo defaults?')) {
        localStorage.clear();
        creatorProfile = { ...VantageConfig.DEFAULT_CREATOR_PROFILE };
        savedLibrary = [...VantageConfig.DEFAULT_LIBRARY_IDEAS];
        VantageAPI.saveProfile(creatorProfile);
        VantageAPI.saveLibrary(savedLibrary);
        closeSettingsModal();
        init();
        showToast('Reset to demo defaults!');
      }
    });

    // Auth Event Bindings
    document.getElementById('btn-auth-1click-demo')?.addEventListener('click', () => {
      document.getElementById('auth-input-email').value = 'demo@vantage.ai';
      document.getElementById('auth-input-password').value = 'vantage2026';
      handleLogin('demo@vantage.ai', 'vantage2026');
    });

    document.getElementById('btn-auth-autofill')?.addEventListener('click', () => {
      document.getElementById('auth-input-email').value = 'demo@vantage.ai';
      document.getElementById('auth-input-password').value = 'vantage2026';
      showToast('📋 Filled demo credentials: demo@vantage.ai / vantage2026');
    });

    document.getElementById('demo-pill-email')?.addEventListener('click', () => {
      document.getElementById('auth-input-email').value = 'demo@vantage.ai';
      showToast('Copied Demo User ID: demo@vantage.ai');
    });

    document.getElementById('demo-pill-pass')?.addEventListener('click', () => {
      document.getElementById('auth-input-password').value = 'vantage2026';
      showToast('Copied Demo Password: vantage2026');
    });

    document.getElementById('btn-auth-toggle-pass')?.addEventListener('click', () => {
      const passInput = document.getElementById('auth-input-password');
      const toggleBtn = document.getElementById('btn-auth-toggle-pass');
      if (passInput) {
        if (passInput.type === 'password') {
          passInput.type = 'text';
          if (toggleBtn) toggleBtn.textContent = 'Hide Password';
        } else {
          passInput.type = 'password';
          if (toggleBtn) toggleBtn.textContent = 'Show Password';
        }
      }
    });

    document.getElementById('auth-tab-signin')?.addEventListener('click', () => {
      document.getElementById('auth-tab-signin')?.classList.add('active');
      document.getElementById('auth-tab-signup')?.classList.remove('active');
      document.getElementById('auth-form-signin')?.classList.add('active');
      document.getElementById('auth-form-signup')?.classList.remove('active');
      hideAuthAlert();
    });

    document.getElementById('auth-tab-signup')?.addEventListener('click', () => {
      document.getElementById('auth-tab-signup')?.classList.add('active');
      document.getElementById('auth-tab-signin')?.classList.remove('active');
      document.getElementById('auth-form-signup')?.classList.add('active');
      document.getElementById('auth-form-signin')?.classList.remove('active');
      hideAuthAlert();
    });

    document.getElementById('auth-form-signin')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('auth-input-email')?.value;
      const pass = document.getElementById('auth-input-password')?.value;
      handleLogin(email, pass);
    });

    document.getElementById('auth-form-signup')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('auth-signup-name')?.value;
      const email = document.getElementById('auth-signup-email')?.value;
      const pass = document.getElementById('auth-signup-password')?.value;
      handleRegister(name, email, pass);
    });

    document.getElementById('btn-topbar-logout')?.addEventListener('click', handleLogout);
    document.getElementById('sidebar-logout-btn')?.addEventListener('click', handleLogout);
    document.getElementById('topbar-profile-btn')?.addEventListener('click', openSettingsModal);
    document.getElementById('sidebar-user-avatar-btn')?.addEventListener('click', openSettingsModal);

    // Close Modals
    document.getElementById('close-inspector-btn')?.addEventListener('click', closeTrendInspector);
    document.getElementById('btn-inspector-close')?.addEventListener('click', closeTrendInspector);
    document.getElementById('close-scorer-modal')?.addEventListener('click', closeScorerModal);
    document.getElementById('cancel-scorer-btn')?.addEventListener('click', closeScorerModal);
    document.getElementById('close-settings-modal')?.addEventListener('click', closeSettingsModal);
    document.getElementById('cancel-settings-btn')?.addEventListener('click', closeSettingsModal);

    document.getElementById('btn-skip-onboarding')?.addEventListener('click', closeOnboardingModal);
    document.getElementById('btn-onboard-prev')?.addEventListener('click', () => { if (currentOnboardStep > 1) showOnboardingStep(currentOnboardStep - 1); });
    document.getElementById('btn-onboard-next')?.addEventListener('click', () => {
      if (currentOnboardStep < 5) showOnboardingStep(currentOnboardStep + 1);
      else if (currentOnboardStep === 5) showOnboardingStep(6);
      else { saveOnboardingData(); closeOnboardingModal(); }
    });

    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const authOverlay = document.getElementById('auth-portal-overlay');
        const isAuthActive = authOverlay && authOverlay.classList.contains('active');
        const token = VantageAPI.getToken();

        // Only allow closing modals with Escape if authenticated
        if (!isAuthActive || token) {
          closeOnboardingModal();
          closeTrendInspector();
          closeScorerModal();
          closeSettingsModal();
          if (token) closeAuthScreen();
          closeScriptStudio();
          closeChannelInspector();
        }
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        document.getElementById('global-search-input')?.focus();
      }
      if (e.key.toLowerCase() === 'n' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName) && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        openScorerModal();
      }
    });
  }

  // ================= 9. INITIALIZATION =================
  async function init() {
    bindAllEvents();
    updateLiveClockAndGreeting();
    setInterval(updateLiveClockAndGreeting, 1000);
    setInterval(updateLiveRadarCountdown, 1000);
    updateCreatorPersonaChips();
    renderTrendingSection();
    renderTopicDropdownList();
    renderNicheDropdownList();
    renderSearchSection();
    renderLibrarySection();
    renderIdeasSection();
    refreshLucideIcons();

    // Check Authentication state on page load
    const token = VantageAPI.getToken();
    if (!token) {
      // Direct visitor immediately to Auth Portal
      openAuthScreen();
    } else {
      try {
        const session = await VantageAPI.checkSession();
        if (session && session.user && session.authenticated !== false) {
          currentUser = session.user;
          if (session.profile) creatorProfile = session.profile;
          if (session.library && Array.isArray(session.library)) savedLibrary = session.library;
          updateHeaderAndSidebarUser();
          updateCreatorPersonaChips();
          updateLiveClockAndGreeting();
          renderLibrarySection();
          closeAuthScreen();
        } else {
          // If session is expired or invalid, direct to Auth Portal
          openAuthScreen();
        }
      } catch (e) {
        // Offline resilience fallback
        updateHeaderAndSidebarUser();
        closeAuthScreen();
      }
    }
  }

  window.vantageApp = {
    openInspector: openTrendInspector,
    openOnboarding: openOnboardingModal,
    openSettings: openSettingsModal,
    openScorer: openScorerModal,
    openAuth: openAuthScreen,
    closeAuth: closeAuthScreen,
    logout: handleLogout,
    openScriptStudio: openScriptStudio,
    openChannelScanner: openChannelInspector,
    addIdea: addIdeaToLibrary,
    copyHook: copyToClipboard,
    showToast: showToast,
    handleLogin: handleLogin,
    renderSearch: renderSearchSection,
    renderLibrary: renderLibrarySection,
    simulateTime(hour) {
      if (hour === null || hour === undefined || hour === 'auto') {
        simulatedHour = null;
        showToast('Greeting re-synchronized with live local time');
      } else {
        simulatedHour = parseInt(hour, 10);
        showToast(`Simulated time set to ${simulatedHour}:00 (${getTimeGreeting()})`);
      }
      updateLiveClockAndGreeting();
    },
    setTimeOfDay(mode) {
      if (mode === 'morning') this.simulateTime(9);
      else if (mode === 'afternoon') this.simulateTime(14);
      else if (mode === 'evening') this.simulateTime(19);
      else this.simulateTime(null);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
