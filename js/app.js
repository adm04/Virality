/**
 * ============================================================================
 * VANTAGE VIRALITY OS V2 — MASTER JAVASCRIPT BUNDLE
 * Standalone, Zero-Dependency, Pure Modern JavaScript Engine
 * ============================================================================
 */

(function () {
  'use strict';

  // ================= 1. GLOBAL CONFIGURATION & CONSTANTS =================
  const VantageConfig = {
    STORAGE_KEY_PROFILE: 'vantage_creator_profile_v2',
    STORAGE_KEY_LIBRARY: 'vantage_saved_library_v2',
    API_BASE: (typeof window !== 'undefined' && window.location && window.location.protocol === 'file:')
      ? 'http://localhost:3000/api'
      : '/api',

    DEFAULT_CREATOR_PROFILE: {
      id: 'profile-arka-01',
      user_id: 'user-arka-01',
      name: 'Arka Mondal',
      email: 'arkadeb.mondal@example.com',
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
      },
      {
        id: 'lib-4',
        title: 'Why 90% of creators fail at monetization in month 3',
        hook: "Why 90% of creators make $0 in their third month (and how top 1% fix it).",
        niche: 'business',
        platform: 'reels',
        score: 91,
        scoreTier: 'EXPLOSIVE',
        source: 'Creator Economy Monetization Trends',
        stage: 'researching',
        stageName: 'Researching',
        createdAt: '2026-08-28'
      },
      {
        id: 'lib-5',
        title: 'Local LLMs on $500 hardware benchmark test',
        hook: "We ran DeepSeek-R1 completely locally on a $500 mini PC — here is the real token speed.",
        niche: 'ai',
        platform: 'youtube',
        score: 95,
        scoreTier: 'EXPLOSIVE',
        source: 'Open-Source Local LLM Deployment',
        stage: 'editing',
        stageName: 'Editing',
        createdAt: '2026-08-25'
      }
    ]
  };

  // ================= 2. TREND DATASET & 12 CREATIVE ANGLES =================
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
        id: 'trend-fin-05',
        topic: 'Algorithmic Index Fund DCA',
        niche: 'finance',
        platform: 'tiktok',
        platformName: 'TikTok',
        outlierScore: 88,
        outlierText: '6.9× Outlier',
        title: 'The exact automated investing rule that turned $200/month into financial freedom.',
        views: '920K',
        baseline: '130K',
        growth: '+185%',
        signals: { momentum: 86, engagement: 90, searchDemand: 91, saturation: 42, competition: 45, freshFactor: 80, monetization: 95 },
        whyTrending: [
          'High shareability among Gen-Z and Millennial wealth builders looking for passive systems',
          'Math-backed visual timelines build undeniable authority within the first 3 seconds',
          'Strong comment section discussion on broker automation settings'
        ],
        tags: ['#PersonalFinance', '#InvestingTips', '#PassiveIncome', '#Wealth']
      }
    ],

    CREATIVE_ANGLES: [
      { id: 'all', name: 'All Angles (12)', icon: 'sparkles' },
      { id: 'contrarian', name: 'Contrarian / Debate', icon: 'zap' },
      { id: 'case-study', name: 'Case Study Blueprint', icon: 'book-open' },
      { id: 'breakdown', name: 'Step-by-Step Breakdown', icon: 'layers' },
      { id: 'tutorial', name: 'Actionable Tutorial', icon: 'terminal' },
      { id: 'metaphor', name: 'Analogy & Metaphor', icon: 'lightbulb' },
      { id: 'data', name: 'Data & Benchmark Test', icon: 'bar-chart-2' },
      { id: 'challenge', name: '30-Day Challenge', icon: 'flame' },
      { id: 'reaction', name: 'Industry Reaction', icon: 'message-square' },
      { id: 'behind-scenes', name: 'Behind the Scenes', icon: 'eye' },
      { id: 'future', name: 'Future Prediction', icon: 'trending-up' },
      { id: 'secret', name: 'Secret Framework', icon: 'key' },
      { id: 'mistakes', name: 'Costly Mistakes', icon: 'alert-triangle' }
    ],

    generateIdeasForTrend(trend, angleId = 'all', profile = {}) {
      const topic = trend.topic || 'AI & Tech Trends';
      const niche = trend.niche || 'Technology';
      const platform = trend.platformName || 'Shorts & YouTube';

      const angleTemplates = [
        {
          angleId: 'contrarian',
          angleName: 'Contrarian Debate',
          title: `Why most creators are wrong about ${topic}`,
          hook: `Everyone is telling you to use ${topic} in 2026. Here is why doing that might actually ruin your workflow.`,
          format: platform,
          audience: `${profile.age_range || '18-34'} Tech Creators & Builders`,
          whyWorks: 'Challenges common belief, creating instant curiosity and driving high comment engagement.',
          structure: '1. Shocking Contrarian Statement -> 2. The Hidden Flaw -> 3. Empirical Test -> 4. The Real Solution',
          cta: 'Comment your take below: Do you agree or are you sticking with the old way?',
          score: 96
        },
        {
          angleId: 'case-study',
          angleName: 'Case Study Blueprint',
          title: `How a solo builder mastered ${topic}`,
          hook: `How this unknown developer leveraged ${topic} to scale to $10,000/month with zero outside funding.`,
          format: platform,
          audience: 'Founders & Aspiring Entrepreneurs',
          whyWorks: 'Social proof combined with specific dollar figures triggers massive save/bookmark rates.',
          structure: '1. The Staggering Result -> 2. The Starting Point -> 3. The 3-Step System -> 4. Key Takeaways',
          cta: 'Bookmark this blueprint so you can reference the stack when building your own setup.',
          score: 94
        },
        {
          angleId: 'breakdown',
          angleName: 'Step-by-Step Breakdown',
          title: `The 5-Minute architecture behind ${topic}`,
          hook: `I spent 40 hours tearing apart the architecture of ${topic} so you can understand it in 60 seconds.`,
          format: platform,
          audience: 'Developers & Knowledge Workers',
          whyWorks: 'Time compression ("40 hours in 60 seconds") offers disproportionate perceived value.',
          structure: '1. The Complexity Myth -> 2. Component 1 -> 3. Component 2 -> 4. Final Assembled Flow',
          cta: 'Subscribe for weekly deep-dives into emerging tech stacks.',
          score: 93
        },
        {
          angleId: 'tutorial',
          angleName: 'Actionable Tutorial',
          title: `Build your first ${topic} system today`,
          hook: `Do NOT start with complex setups: here is the exact 4-step tutorial to configure ${topic} right now.`,
          format: platform,
          audience: 'Hands-on Makers & Students',
          whyWorks: 'Clear, friction-free guidance reduces overwhelm and drives high completion rate.',
          structure: '1. Prerequisites -> 2. Initial Setup -> 3. Core Logic -> 4. Live Verification',
          cta: 'Save this video and run through step 2 before your next build.',
          score: 91
        },
        {
          angleId: 'data',
          angleName: 'Data & Benchmark Test',
          title: `We benchmarked ${topic} against 10 alternatives`,
          hook: `We ran 1,000 automated benchmark tests on ${topic}. The numbers completely surprised our team.`,
          format: platform,
          audience: 'Analytical Buyers & Engineers',
          whyWorks: 'Objective empirical data builds unmatched authority and trust.',
          structure: '1. The Experiment Parameters -> 2. Speed Test -> 3. Cost Analysis -> 4. Clear Winner',
          cta: 'Check the link in bio for the raw benchmark spreadsheet.',
          score: 95
        },
        {
          angleId: 'challenge',
          angleName: '30-Day Challenge',
          title: `I used ${topic} every day for 30 days`,
          hook: `I replaced my entire standard routine with ${topic} for 30 consecutive days. Here is what happened.`,
          format: platform,
          audience: 'Curious General Audience',
          whyWorks: 'Narrative storytelling with anticipation keeps viewers hooked until the day-30 reveal.',
          structure: '1. Day 1 Struggles -> 2. Day 10 Breakthrough -> 3. Day 20 Unexpected Pitfall -> 4. Final Verdict',
          cta: 'Would you try this challenge for 30 days? Drop a comment.',
          score: 92
        },
        {
          angleId: 'secret',
          angleName: 'Secret Framework',
          title: `The hidden framework top 1% use for ${topic}`,
          hook: `Top 1% pros don't use ${topic} like everyone else. They use this 3-part framework to get 10x output.`,
          format: platform,
          audience: 'High-Performers & Power Users',
          whyWorks: 'Exclusivity ("top 1%") taps into aspirational status and self-improvement desire.',
          structure: '1. The Amateur Mistake -> 2. The Pro Mental Model -> 3. The 3 Levers -> 4. Implementation',
          cta: 'Share this with a fellow creator who needs to level up their stack.',
          score: 94
        },
        {
          angleId: 'mistakes',
          angleName: 'Costly Mistakes',
          title: `3 Costly mistakes people make with ${topic}`,
          hook: `If you are using ${topic}, check your settings right now. These 3 mistakes could cost you hours.`,
          format: platform,
          audience: 'Current Practitioners',
          whyWorks: 'Loss aversion urgency creates an immediate impulse to watch and audit own setup.',
          structure: '1. Mistake #1 (Most Common) -> 2. Mistake #2 (Most Expensive) -> 3. Mistake #3 -> 4. Quick Fix',
          cta: 'Double tap if you were guilty of mistake number 2!',
          score: 89
        },
        {
          angleId: 'metaphor',
          angleName: 'Analogy & Metaphor',
          title: `Explaining ${topic} like you are 5 years old`,
          hook: `Think ${topic} is too complicated? Imagine your brain is a kitchen and this tool is your master chef.`,
          format: platform,
          audience: 'Beginners & Non-Technical Explorers',
          whyWorks: 'Extreme simplification removes cognitive load, turning complex ideas into viral soundbites.',
          structure: '1. The Simple Analogy -> 2. Mapping to Tech -> 3. Practical Everyday Example -> 4. Summary',
          cta: 'Follow for tech explained without the jargon.',
          score: 90
        },
        {
          angleId: 'reaction',
          angleName: 'Industry Reaction',
          title: `My honest reaction to the latest ${topic} update`,
          hook: `The latest breakthrough in ${topic} just changed the entire roadmap. Here is what they didn't tell you.`,
          format: platform,
          audience: 'Industry Watchers & News Junkies',
          whyWorks: 'Timely news commentary captures high algorithmic search surge momentum.',
          structure: '1. The Big Announcement -> 2. What It Means -> 3. Winners vs Losers -> 4. Strategic Advice',
          cta: 'What do you think of this update? Let me know below.',
          score: 92
        },
        {
          angleId: 'behind-scenes',
          angleName: 'Behind the Scenes',
          title: `Behind the scenes: Real production with ${topic}`,
          hook: `Here is the unfiltered behind-the-scenes look at how we actually deploy ${topic} in production.`,
          format: platform,
          audience: 'Practitioners & Community Members',
          whyWorks: 'Authenticity and transparency build deep community loyalty and trust.',
          structure: '1. The Workspace -> 2. Real Raw Bug Encounter -> 3. The Debugging Fix -> 4. Production Release',
          cta: 'Join our creator discord community in the description.',
          score: 88
        },
        {
          angleId: 'future',
          angleName: 'Future Prediction',
          title: `Where ${topic} will be in 24 months`,
          hook: `By 2028, ${topic} will look completely unrecognizable. Here are 3 predictions backed by current data.`,
          format: platform,
          audience: 'Forward-Thinking Strategists',
          whyWorks: 'Thought leadership and foresight generate heavy sharing among decision-makers.',
          structure: '1. Current Trajectory -> 2. Prediction 1 -> 3. Prediction 2 -> 4. How to Prepare Today',
          cta: 'Save this to see if my predictions come true in 2 years!',
          score: 93
        }
      ];

      if (angleId === 'all') return angleTemplates;
      const matched = angleTemplates.filter(a => a.angleId === angleId);
      return matched.length > 0 ? matched : angleTemplates;
    }
  };

  // ================= 3. OPPORTUNITY SCORER & HOOK EVALUATOR =================
  const VantageScorer = {
    calculateOpportunityScore(trend, profile = {}) {
      const s = trend.signals || {
        momentum: 85,
        engagement: 88,
        searchDemand: 80,
        saturation: 30,
        competition: 30,
        freshFactor: 90,
        monetization: 85
      };

      // Formula: (Momentum*0.25) + (Engagement*0.20) + (Search*0.15) + ((100-Saturation)*0.15) + (FreshFactor*0.15) + (Monetization*0.10)
      const momentumWeight = (s.momentum || 85) * 0.25;
      const engagementWeight = (s.engagement || 88) * 0.20;
      const searchWeight = (s.searchDemand || 80) * 0.15;
      const saturationWeight = (100 - (s.saturation || 30)) * 0.15;
      const freshWeight = (s.freshFactor || 90) * 0.15;
      const monetWeight = (s.monetization || 85) * 0.10;

      let score = Math.round(momentumWeight + engagementWeight + searchWeight + saturationWeight + freshWeight + monetWeight);

      // Personalized alignment bonus
      if (profile.niches && profile.niches.includes(trend.niche)) score += 3;
      if (profile.content_types && profile.content_types.includes(trend.platform)) score += 2;
      score = Math.min(99, Math.max(50, score));

      let tier = 'EXPLOSIVE';
      if (score < 80) tier = 'CALIBRATED';
      else if (score < 90) tier = 'STRONG';

      return { score, tier, signals: s };
    },

    evaluateLiveHook(hookText) {
      const text = (hookText || '').trim();
      if (!text) return null;

      const hasNumber = /\d+/.test(text);
      const hasQuestion = text.includes('?');
      const hasLossAversion = /delete|stop|never|worst|mistake|regret|fail|lies|disaster|broken|ruin/i.test(text);
      const hasPowerWord = /secret|tested|truth|insane|brutal|proof|architecture|scaled|formula|blueprint|unknown|revealed/i.test(text);
      const len = text.length;

      let curiosity = 78 + (hasQuestion ? 8 : 0) + (hasPowerWord ? 8 : 0) + (len > 30 ? 4 : 0);
      let stakes = 75 + (hasLossAversion ? 14 : 0) + (hasNumber ? 6 : 0);
      let velocity = 80 + (len >= 45 && len <= 95 ? 12 : 4) + (hasNumber ? 5 : 0);

      curiosity = Math.min(99, curiosity);
      stakes = Math.min(99, stakes);
      velocity = Math.min(99, velocity);

      const overall = Math.round((curiosity * 0.35) + (stakes * 0.35) + (velocity * 0.30));

      return {
        score: overall,
        tier: overall >= 90 ? 'EXPLOSIVE' : (overall >= 75 ? 'STRONG' : 'CALIBRATED'),
        curiosity,
        stakes,
        velocity,
        diagnostics: {
          hasNumber,
          hasQuestion,
          hasLossAversion,
          hasPowerWord,
          length: len
        }
      };
    }
  };

  // ================= 4. API & LOCAL STORAGE SYNC CLIENT =================
  const VantageAPI = {
    loadProfile() {
      try {
        const saved = localStorage.getItem(VantageConfig.STORAGE_KEY_PROFILE);
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.warn('LocalStorage profile load error:', e);
      }
      return { ...VantageConfig.DEFAULT_CREATOR_PROFILE };
    },

    saveProfile(profile) {
      try {
        localStorage.setItem(VantageConfig.STORAGE_KEY_PROFILE, JSON.stringify(profile));
      } catch (e) {}

      // Background REST API sync
      fetch(`${VantageConfig.API_BASE}/profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      }).catch(() => {});
    },

    loadLibrary() {
      try {
        const saved = localStorage.getItem(VantageConfig.STORAGE_KEY_LIBRARY);
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.warn('LocalStorage library load error:', e);
      }
      return [...VantageConfig.DEFAULT_LIBRARY_IDEAS];
    },

    saveLibrary(items) {
      try {
        localStorage.setItem(VantageConfig.STORAGE_KEY_LIBRARY, JSON.stringify(items));
      } catch (e) {}

      // Background REST API sync
      fetch(`${VantageConfig.API_BASE}/library`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(items)
      }).catch(() => {});
    },

    async checkHealth() {
      try {
        const res = await fetch(`${VantageConfig.API_BASE}/health`);
        if (res.ok) return await res.json();
      } catch (e) {}
      return null;
    }
  };

  // ================= 5. APPLICATION STATE =================
  let creatorProfile = VantageAPI.loadProfile();
  let savedLibrary = VantageAPI.loadLibrary();
  let activeTrendingPlatform = 'all';
  let activeCreativeAngle = 'all';
  let activeLibraryStage = 'all';
  let activeLibraryView = 'kanban';
  let selectedTrendForIdeas = null;
  let selectedTrendForInspector = null;
  let activeTopicFilter = 'all';
  let activeNicheFilter = 'all';
  let searchQuery = '';
  let currentOnboardStep = 1;
  let sampleHookIndex = 0;

  // ================= 6. UI RENDERERS =================

  // --- Clock & Greeting ---
  function updateLiveClockAndGreeting() {
    const clockEl = document.getElementById('live-time-display');
    const greetingEl = document.getElementById('hero-greeting-text');
    const now = new Date();

    if (clockEl) {
      clockEl.textContent = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
    }

    if (greetingEl) {
      const hour = now.getHours();
      let greeting = 'Good morning';
      if (hour >= 12 && hour < 17) greeting = 'Good afternoon';
      else if (hour >= 17 || hour < 5) greeting = 'Good evening';
      greetingEl.textContent = `${greeting}, ${creatorProfile.name || 'Creator'}`;
    }
  }

  function updateCreatorPersonaChips() {
    const list = document.getElementById('hero-persona-chips');
    const sidebarInitials = document.getElementById('sidebar-avatar-initials');
    const topbarInitials = document.getElementById('topbar-avatar-initials');

    const name = creatorProfile.name || 'Arka Mondal';
    const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'AM';

    if (sidebarInitials) sidebarInitials.textContent = initials;
    if (topbarInitials) topbarInitials.textContent = initials;

    if (!list) return;

    const chips = [
      { label: `Niches: ${(creatorProfile.niches || ['ai', 'tech']).map(n => n.toUpperCase()).join(' • ')}` },
      { label: `Formats: ${(creatorProfile.content_types || ['reels', 'shorts', 'youtube']).join(' / ')}` },
      { label: `Goal: ${creatorProfile.goals === 'monetize' ? 'Monetize & Scale' : 'Maximize Views'}` },
      { label: `Audience: ${creatorProfile.country || 'India'} (${creatorProfile.age_range || '18-34'})` }
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
    if (activeTrendingPlatform !== 'all') {
      trends = trends.filter(t => t.platform === activeTrendingPlatform);
    }

    container.innerHTML = trends.map(t => {
      const opp = VantageScorer.calculateOpportunityScore(t, creatorProfile);
      return `
        <article class="trend-card" data-id="${t.id}">
          <div class="trend-card-header">
            <span class="platform-pill ${t.platform}">${escapeHtml(t.platformName)}</span>
            <div class="score-badge tier-viral">
              <span class="score-val">${opp.score}</span>
              <span class="score-tag">${opp.tier}</span>
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

    // Attach listeners
    container.querySelectorAll('.btn-why-trending').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openTrendInspector(btn.getAttribute('data-id'));
      });
    });

    container.querySelectorAll('.btn-generate-ideas').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const t = VantageTrendsData.SEED_TRENDS.find(x => x.id === btn.getAttribute('data-id'));
        if (t) {
          selectedTrendForIdeas = t;
          renderIdeasSection();
          document.getElementById('section-ideas')?.scrollIntoView({ behavior: 'smooth' });
          showToast(`Generated 12 creative angles for "${t.topic}"`);
        }
      });
    });

    container.querySelectorAll('.trend-card').forEach(card => {
      card.addEventListener('click', () => {
        openTrendInspector(card.getAttribute('data-id'));
      });
    });

    refreshLucideIcons();
  }

  // --- Section 2: Ideas For You ---
  function renderIdeasSection() {
    const container = document.getElementById('ideas-cards-container');
    const sourceBadgeName = document.getElementById('active-idea-source-name');
    if (!container) return;

    const currentTrend = selectedTrendForIdeas || VantageTrendsData.SEED_TRENDS[0];
    if (sourceBadgeName) sourceBadgeName.textContent = currentTrend.topic;

    const ideas = VantageTrendsData.generateIdeasForTrend(currentTrend, activeCreativeAngle, creatorProfile);

    if (ideas.length === 0) {
      container.innerHTML = `<div style="grid-column: 1 / -1; padding: 40px 20px; text-align: center; color: var(--text-tertiary);">No ideas found for this angle. Click "All Angles" to view concepts.</div>`;
      return;
    }

    container.innerHTML = ideas.map(idea => `
      <article class="idea-concept-card">
        <div class="idea-card-header">
          <span class="idea-angle-badge">${escapeHtml(idea.angleName)}</span>
          <span class="idea-opp-score">Score ${idea.score}</span>
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

    container.querySelectorAll('.copy-idea-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        copyToClipboard(btn.getAttribute('data-hook'), 'Idea Hook copied to clipboard!');
      });
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
        } catch (e) {
          console.error(e);
        }
      });
    });

    refreshLucideIcons();
  }

  // --- Section 3: Content Intelligence Search ---
  function renderSearchSection() {
    const grid = document.getElementById('search-results-grid');
    const countEl = document.getElementById('search-match-count');
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

    if (activeNicheFilter !== 'all') {
      results = results.filter(t => t.niche === activeNicheFilter);
    }

    if (countEl) countEl.textContent = `${results.length} trend signal${results.length === 1 ? '' : 's'} matching`;

    if (results.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 48px 24px; text-align: center; color: var(--text-tertiary);">
          <p style="font-size: 15px; margin-bottom: 12px; font-weight: 600;">No trend signals matched your search criteria.</p>
          <button class="btn btn-secondary btn-sm" id="btn-reset-search-empty" type="button">Clear Filters</button>
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

    grid.innerHTML = results.map(t => {
      const opp = VantageScorer.calculateOpportunityScore(t, creatorProfile);
      return `
        <article class="idea-card span-1" data-id="${t.id}" role="button" tabindex="0">
          <div class="card-top">
            <div class="platform-pill ${t.platform}">
              <span>${escapeHtml(t.platformName)}</span>
            </div>
            <div class="score-badge tier-viral">
              <div class="score-val">${opp.score}</div>
              <div class="score-tag">${opp.tier}</div>
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
      `;
    }).join('');

    grid.querySelectorAll('.btn-inspect-search, .idea-card').forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        openTrendInspector(el.getAttribute('data-id'));
      });
    });

    refreshLucideIcons();
  }

  // --- Section 4: Content Production Library ---
  function renderLibrarySection() {
    const board = document.getElementById('library-kanban-board');
    const allCountEl = document.getElementById('lib-count-all');
    if (!board) return;

    if (allCountEl) allCountEl.textContent = savedLibrary.length;

    const stages = [
      { id: 'idea', name: 'Ideas', count: 0 },
      { id: 'researching', name: 'Researching', count: 0 },
      { id: 'scripted', name: 'Scripted', count: 0 },
      { id: 'filming', name: 'Filming', count: 0 },
      { id: 'editing', name: 'Editing', count: 0 },
      { id: 'published', name: 'Published', count: 0 }
    ];

    stages.forEach(st => {
      st.count = savedLibrary.filter(i => (i.stage || 'idea') === st.id).length;
    });

    document.querySelectorAll('#library-stage-filters .stage-tab, #library-stage-tabs .stage-tab').forEach(tab => {
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
        <table class="library-list-table">
          <thead>
            <tr>
              <th>Idea Hook & Title</th>
              <th>Score</th>
              <th>Platform</th>
              <th>Stage</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${filtered.length === 0 ? `<tr><td colspan="6" style="text-align: center; color: var(--text-tertiary); padding: 32px 16px;">No ideas in this stage yet. Click "New Idea" or "Score New Hook" to add!</td></tr>` : ''}
            ${filtered.map(item => `
              <tr>
                <td>
                  <strong style="display: block; font-size: 13.5px; margin-bottom: 2px;">"${escapeHtml(item.hook || item.title)}"</strong>
                  <span style="font-size: 11px; color: var(--text-tertiary);">${escapeHtml(item.source || 'Idea')} &bull; Niche: ${escapeHtml((item.niche || 'AI').toUpperCase())}</span>
                </td>
                <td><span class="opp-score-badge tier-explosive" style="width: 38px; height: 38px;"><span class="opp-score-num" style="font-size: 15px;">${item.score || 90}</span></span></td>
                <td><span class="platform-pill ${item.platform}">${escapeHtml((item.platform || 'SHORTS').toUpperCase())}</span></td>
                <td><span class="lib-stage-badge">${escapeHtml(item.stageName || 'Ideas')}</span></td>
                <td><span style="font-family: var(--font-mono); font-size: 11px; color: var(--text-tertiary);">${escapeHtml(item.createdAt || 'Today')}</span></td>
                <td>
                  <div class="lib-card-actions" style="display: flex; align-items: center; gap: 6px;">
                    <select class="lib-stage-select" data-id="${item.id}" aria-label="Change Stage">
                      <option value="idea" ${item.stage === 'idea' ? 'selected' : ''}>Ideas</option>
                      <option value="researching" ${item.stage === 'researching' ? 'selected' : ''}>Researching</option>
                      <option value="scripted" ${item.stage === 'scripted' ? 'selected' : ''}>Scripted</option>
                      <option value="filming" ${item.stage === 'filming' ? 'selected' : ''}>Filming</option>
                      <option value="editing" ${item.stage === 'editing' ? 'selected' : ''}>Editing</option>
                      <option value="published" ${item.stage === 'published' ? 'selected' : ''}>Published</option>
                    </select>
                    <button class="btn-lib-del" data-id="${item.id}" title="Delete Idea" aria-label="Delete Idea" type="button">
                      <svg class="lucide lucide-trash-2" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                    </button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
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
                    <span class="lib-score">Score ${item.score || 90}</span>
                    <div class="lib-card-actions">
                      <select class="lib-stage-select" data-id="${item.id}" aria-label="Change Stage">
                        <option value="idea" ${item.stage === 'idea' ? 'selected' : ''}>Ideas</option>
                        <option value="researching" ${item.stage === 'researching' ? 'selected' : ''}>Researching</option>
                        <option value="scripted" ${item.stage === 'scripted' ? 'selected' : ''}>Scripted</option>
                        <option value="filming" ${item.stage === 'filming' ? 'selected' : ''}>Filming</option>
                        <option value="editing" ${item.stage === 'editing' ? 'selected' : ''}>Editing</option>
                        <option value="published" ${item.stage === 'published' ? 'selected' : ''}>Published</option>
                      </select>
                      <button class="btn-lib-del" data-id="${item.id}" title="Delete Idea" aria-label="Delete Idea" type="button">
                        <svg class="lucide lucide-trash-2" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                      </button>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }).join('');
    }

    // Attach stage select listener
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

    // Attach delete listener
    board.querySelectorAll('.btn-lib-del').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        savedLibrary = savedLibrary.filter(i => i.id !== id);
        VantageAPI.saveLibrary(savedLibrary);
        renderLibrarySection();
        showToast('Idea removed from Content Library.');
      });
    });

    refreshLucideIcons();
  }

  // ================= 7. MODALS & DRAWERS CONTROLLERS =================

  // --- Onboarding Modal ---
  function openOnboardingModal() {
    currentOnboardStep = 1;
    showOnboardingStep(1);
    const modal = document.getElementById('onboarding-modal');
    if (modal) {
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
    }
  }

  function closeOnboardingModal() {
    const modal = document.getElementById('onboarding-modal');
    if (modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    }
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
      document.getElementById('sum-platforms').textContent = selPlatforms.join(', ') || 'YouTube & Shorts';
      document.getElementById('sum-niches').textContent = selNiches.join(', ') || 'AI & Technology';
    }
    refreshLucideIcons();
  }

  function saveOnboardingData() {
    const selContentTypes = Array.from(document.querySelectorAll('#grid-content-types .onboard-tag-btn.selected')).map(b => b.getAttribute('data-value'));
    const selNiches = Array.from(document.querySelectorAll('#grid-niches .onboard-tag-btn.selected')).map(b => b.getAttribute('data-value'));
    const selGoal = document.querySelector('#grid-goals .goal-card.selected')?.getAttribute('data-value') || 'views';

    creatorProfile = {
      ...creatorProfile,
      content_types: selContentTypes.length > 0 ? selContentTypes : ['reels', 'shorts', 'youtube'],
      niches: selNiches.length > 0 ? selNiches : ['ai', 'technology'],
      age_range: document.getElementById('onboard-age-range')?.value || '18-34',
      country: document.getElementById('onboard-country')?.value || 'India',
      language: document.getElementById('onboard-language')?.value || 'English',
      audience_description: document.getElementById('onboard-audience-desc')?.value || '',
      goals: selGoal,
      onboarding_completed: true,
      updated_at: new Date().toISOString()
    };

    VantageAPI.saveProfile(creatorProfile);
    updateCreatorPersonaChips();
    renderTrendingSection();
    renderIdeasSection();
    renderSearchSection();
    showToast('Creator persona successfully calibrated!');
  }

  // --- Trend Inspector Drawer ---
  function openTrendInspector(trendId) {
    const trend = VantageTrendsData.SEED_TRENDS.find(t => t.id === trendId) || VantageTrendsData.SEED_TRENDS[0];
    selectedTrendForInspector = trend;

    const opp = VantageScorer.calculateOpportunityScore(trend, creatorProfile);
    const drawer = document.getElementById('trend-inspector-drawer');
    if (!drawer) return;

    document.getElementById('inspector-score-num').textContent = opp.score;
    document.getElementById('inspector-score-sub').textContent = opp.tier;
    document.getElementById('inspector-outlier-pill').textContent = trend.outlierText;
    document.getElementById('inspector-topic-title').textContent = trend.topic;
    document.getElementById('inspector-topic-desc').textContent = trend.title;
    document.getElementById('inspector-hook-text').textContent = `"${trend.title}"`;

    const sigs = trend.signals || {};
    const setBar = (id, val) => {
      const bar = document.getElementById(`sig-${id}`);
      const txt = document.getElementById(`sig-val-${id}`);
      if (bar) bar.style.width = `${val}%`;
      if (txt) txt.textContent = `${val}%`;
    };

    setBar('momentum', sigs.momentum || 92);
    setBar('engagement', sigs.engagement || 90);
    setBar('search', sigs.searchDemand || 88);
    setBar('saturation', 100 - (sigs.saturation || 30));
    setBar('competition', 100 - (sigs.competition || 30));
    setBar('freshness', sigs.freshFactor || 94);
    setBar('monetization', sigs.monetization || 90);

    const whyList = document.getElementById('inspector-why-list');
    if (whyList) {
      whyList.innerHTML = (trend.whyTrending || ['High view velocity on emerging keywords.']).map(r => `<li>${escapeHtml(r)}</li>`).join('');
    }

    drawer.classList.add('active');
    drawer.setAttribute('aria-hidden', 'false');
    refreshLucideIcons();
  }

  function closeTrendInspector() {
    const drawer = document.getElementById('trend-inspector-drawer');
    if (drawer) {
      drawer.classList.remove('active');
      drawer.setAttribute('aria-hidden', 'true');
    }
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
    const modal = document.getElementById('scorer-modal');
    if (modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  // --- Settings Modal ---
  function openSettingsModal() {
    const modal = document.getElementById('settings-modal');
    if (modal) {
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
    }
  }

  function closeSettingsModal() {
    const modal = document.getElementById('settings-modal');
    if (modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  // --- Auth Gateway ---
  function openAuthScreen() {
    const auth = document.getElementById('full-auth-screen');
    if (auth) {
      auth.classList.add('active');
      auth.setAttribute('aria-hidden', 'false');
    }
  }

  function closeAuthScreen() {
    const auth = document.getElementById('full-auth-screen');
    if (auth) {
      auth.classList.remove('active');
      auth.setAttribute('aria-hidden', 'true');
    }
  }

  // ================= 8. DATA ACTIONS & HELPERS =================
  function addIdeaToLibrary(idea) {
    const newEntry = {
      id: `lib-${Date.now()}`,
      title: idea.title || 'Untitled Idea Concept',
      hook: idea.hook || idea.title || '',
      niche: idea.niche || creatorProfile.niches?.[0] || 'ai',
      platform: (idea.format || 'shorts').toLowerCase().includes('youtube') ? 'youtube' : 'shorts',
      score: idea.score || 92,
      scoreTier: idea.scoreTier || 'EXPLOSIVE',
      source: idea.trendSource || 'Custom Concept',
      stage: 'idea',
      stageName: 'Ideas',
      createdAt: 'Today'
    };

    savedLibrary.unshift(newEntry);
    VantageAPI.saveLibrary(savedLibrary);
    renderLibrarySection();
    showToast('Saved concept to Content Library!');
  }

  function showToast(msg) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg class="toast-icon lucide lucide-check-circle-2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
      <span>${escapeHtml(msg)}</span>
    `;
    container.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('active'));
    setTimeout(() => {
      toast.classList.remove('active');
      setTimeout(() => toast.remove(), 350);
    }, 3200);
  }

  function copyToClipboard(text, message = 'Copied to clipboard!') {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text)
        .then(() => showToast(message))
        .catch(() => fallbackCopy(text, message));
    } else {
      fallbackCopy(text, message);
    }
  }

  function fallbackCopy(text, message) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.top = '-9999px';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try {
      document.execCommand('copy');
      showToast(message);
    } catch (e) {
      showToast('Copied hook to clipboard!');
    }
    document.body.removeChild(ta);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function refreshLucideIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      try {
        window.lucide.createIcons();
      } catch (e) {}
    }
  }

  // ================= 9. EVENT ATTACHMENTS =================
  function bindAllEvents() {
    // 1. Sidebar Nav
    document.getElementById('nav-trending')?.addEventListener('click', () => document.getElementById('section-trending')?.scrollIntoView({ behavior: 'smooth' }));
    document.getElementById('nav-ideas')?.addEventListener('click', () => document.getElementById('section-ideas')?.scrollIntoView({ behavior: 'smooth' }));
    document.getElementById('nav-search')?.addEventListener('click', () => document.getElementById('section-search')?.scrollIntoView({ behavior: 'smooth' }));
    document.getElementById('nav-library')?.addEventListener('click', () => document.getElementById('section-library')?.scrollIntoView({ behavior: 'smooth' }));
    document.getElementById('nav-onboarding-trigger')?.addEventListener('click', openOnboardingModal);
    document.getElementById('nav-settings')?.addEventListener('click', openSettingsModal);
    document.getElementById('sidebar-user-avatar-btn')?.addEventListener('click', openAuthScreen);
    document.getElementById('topbar-profile-btn')?.addEventListener('click', openAuthScreen);
    document.getElementById('btn-hero-calibrate')?.addEventListener('click', openOnboardingModal);
    document.getElementById('btn-score-new')?.addEventListener('click', openScorerModal);

    // 2. Trending format filters
    document.querySelectorAll('#trending-platform-filters .format-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('#trending-platform-filters .format-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        activeTrendingPlatform = pill.getAttribute('data-platform');
        renderTrendingSection();
      });
    });

    document.getElementById('btn-sync-trends')?.addEventListener('click', () => {
      renderTrendingSection();
      showToast('Synchronized live signals across YouTube, Shorts, Reels & TikTok.');
    });

    // 3. Creative Angles chips
    document.querySelectorAll('#angles-container .angle-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('#angles-container .angle-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        activeCreativeAngle = chip.getAttribute('data-angle');
        renderIdeasSection();
      });
    });

    // 4. Library view switcher & stage tabs
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

    document.querySelectorAll('#library-stage-filters .stage-tab, #library-stage-tabs .stage-tab').forEach(tab => {
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

    // 5. Global Search Input
    const searchInp = document.getElementById('global-search-input');
    const clearSearchBtn = document.getElementById('clear-search-btn');
    if (searchInp) {
      searchInp.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        if (clearSearchBtn) clearSearchBtn.style.display = searchQuery ? 'flex' : 'none';
        renderSearchSection();
      });
    }
    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', () => {
        if (searchInp) searchInp.value = '';
        searchQuery = '';
        clearSearchBtn.style.display = 'none';
        renderSearchSection();
      });
    }

    // 6. Onboarding Wizard
    document.querySelectorAll('#grid-content-types .onboard-tag-btn, #grid-niches .onboard-tag-btn, #grid-idea-types .onboard-tag-btn').forEach(btn => {
      btn.addEventListener('click', () => btn.classList.toggle('selected'));
    });

    document.querySelectorAll('#grid-goals .goal-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('#grid-goals .goal-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
      });
    });

    document.getElementById('btn-skip-onboarding')?.addEventListener('click', closeOnboardingModal);
    document.getElementById('btn-onboard-prev')?.addEventListener('click', () => {
      if (currentOnboardStep > 1) showOnboardingStep(currentOnboardStep - 1);
    });
    document.getElementById('btn-onboard-next')?.addEventListener('click', () => {
      if (currentOnboardStep < 5) {
        showOnboardingStep(currentOnboardStep + 1);
      } else if (currentOnboardStep === 5) {
        showOnboardingStep(6);
      } else {
        saveOnboardingData();
        closeOnboardingModal();
      }
    });

    // 7. Modals backdrop dismiss
    const bindBackdrop = (id, closeFn) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('click', (e) => {
          if (e.target === el) closeFn();
        });
      }
    };

    bindBackdrop('onboarding-modal', closeOnboardingModal);
    bindBackdrop('scorer-modal', closeScorerModal);
    bindBackdrop('settings-modal', closeSettingsModal);
    bindBackdrop('full-auth-screen', closeAuthScreen);

    document.getElementById('close-inspector-btn')?.addEventListener('click', closeTrendInspector);
    document.getElementById('btn-inspector-close')?.addEventListener('click', closeTrendInspector);
    document.getElementById('trend-drawer-overlay')?.addEventListener('click', closeTrendInspector);

    document.getElementById('close-scorer-modal')?.addEventListener('click', closeScorerModal);
    document.getElementById('cancel-scorer-btn')?.addEventListener('click', closeScorerModal);
    document.getElementById('close-settings-modal')?.addEventListener('click', closeSettingsModal);
    document.getElementById('cancel-settings-btn')?.addEventListener('click', closeSettingsModal);
    document.getElementById('btn-close-auth-gateway')?.addEventListener('click', closeAuthScreen);
    document.getElementById('btn-gateway-explore-guest')?.addEventListener('click', closeAuthScreen);
    document.getElementById('btn-instant-demo-login')?.addEventListener('click', () => {
      closeAuthScreen();
      showToast('Logged in as Arka Mondal (Pro Creator)');
    });

    // 8. Virality Scorer Analysis
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
        inp.dispatchEvent(new Event('input', { bubbles: true }));
      }
    });

    document.getElementById('hook-input-field')?.addEventListener('input', (e) => {
      const charEl = document.getElementById('hook-char-count');
      if (charEl) charEl.textContent = `${e.target.value.length}/140 chars`;
    });

    document.getElementById('btn-run-analysis')?.addEventListener('click', () => {
      const text = document.getElementById('hook-input-field')?.value || '';
      const result = VantageScorer.evaluateLiveHook(text);
      if (!result) {
        showToast('Please type or paste a hook headline first.');
        return;
      }

      document.getElementById('result-score-num').textContent = result.score;
      document.getElementById('result-score-badge').textContent = result.tier;
      document.getElementById('result-curiosity').textContent = `${result.curiosity}%`;
      document.getElementById('result-stakes').textContent = `${result.stakes}%`;
      document.getElementById('result-velocity').textContent = `${result.velocity}%`;
      showToast(`Hook virality analyzed: Score ${result.score}`);
    });

    document.getElementById('save-to-library-btn')?.addEventListener('click', () => {
      const text = document.getElementById('hook-input-field')?.value || '';
      const result = VantageScorer.evaluateLiveHook(text);
      if (!text) {
        showToast('Enter a hook before saving.');
        return;
      }
      addIdeaToLibrary({
        title: text,
        hook: text,
        niche: creatorProfile.niches?.[0] || 'ai',
        format: 'Shorts & Reels',
        score: result ? result.score : 90,
        scoreTier: result ? result.tier : 'EXPLOSIVE',
        trendSource: 'Scorer Engine'
      });
      closeScorerModal();
    });

    // 9. Settings Actions
    document.getElementById('btn-reopen-onboarding')?.addEventListener('click', () => {
      closeSettingsModal();
      openOnboardingModal();
    });

    document.getElementById('btn-export-library-json')?.addEventListener('click', () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(savedLibrary, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `vantage_library_${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast('Library exported successfully!');
    });

    document.getElementById('btn-reset-all-data')?.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset all profile settings and library back to original defaults?')) {
        localStorage.clear();
        creatorProfile = { ...VantageConfig.DEFAULT_CREATOR_PROFILE };
        savedLibrary = [...VantageConfig.DEFAULT_LIBRARY_IDEAS];
        VantageAPI.saveProfile(creatorProfile);
        VantageAPI.saveLibrary(savedLibrary);
        closeSettingsModal();
        init();
        showToast('Demo data reset to fresh defaults!');
      }
    });

    // ESC key closes all modals & drawers
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeOnboardingModal();
        closeTrendInspector();
        closeScorerModal();
        closeSettingsModal();
        closeAuthScreen();
      }
    });
  }

  // ================= 10. INITIALIZATION =================
  function init() {
    bindAllEvents();
    updateLiveClockAndGreeting();
    setInterval(updateLiveClockAndGreeting, 1000);
    updateCreatorPersonaChips();
    renderTrendingSection();
    renderIdeasSection();
    renderSearchSection();
    renderLibrarySection();
    refreshLucideIcons();
  }

  // Expose global controller
  window.vantageApp = {
    openInspector: openTrendInspector,
    openOnboarding: openOnboardingModal,
    openSettings: openSettingsModal,
    openScorer: openScorerModal,
    addIdea: addIdeaToLibrary,
    copyHook: copyToClipboard,
    showToast: showToast
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
