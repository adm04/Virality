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
        platform: 'shorts',
        platformName: 'Shorts & Reels',
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
      },
      {
        id: 'trend-pod-06',
        topic: 'The 2026 AI Agent Economic Shift',
        niche: 'technology',
        platform: 'podcast',
        platformName: 'Podcast Deep Dive',
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
        tags: ['#Podcast', '#TechTrends', '#AIRevolution', '#SaaS', '#Economy']
      },
      {
        id: 'trend-fit-07',
        topic: 'Cortisol & Workout Timing Science',
        niche: 'fitness',
        platform: 'shorts',
        platformName: 'YouTube Shorts',
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
        id: 'trend-mkt-08',
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
      }
    ],

    CURATED_TOPICS: [
      { id: 'all', name: 'All Topics', count: 8 },
      { id: 'ai-agents', name: 'AI Autonomous Agents', count: 3, niche: 'ai' },
      { id: 'vscode', name: 'VS Code & Tooling Optimization', count: 2, niche: 'technology' },
      { id: 'indie-saas', name: 'Solopreneur Micro-SaaS', count: 2, niche: 'business' },
      { id: 'local-llm', name: 'Local LLMs & DeepSeek R1', count: 3, niche: 'ai' },
      { id: 'investing', name: 'Automated Investing & Wealth', count: 2, niche: 'finance' },
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
      { id: 'education', name: 'Education & Science' },
      { id: 'lifestyle', name: 'Lifestyle & Vlogs' }
    ],

    generateIdeasForTrend(trend, angleId = 'all', profile = {}) {
      const topic = trend.topic || 'AI & Tech Trends';
      const niche = (trend.niche || 'Technology').toUpperCase();
      const platform = trend.platformName || 'Shorts & YouTube';
      const audTarget = `${profile.country || 'Global'} (${profile.age_range || '18-34'})`;

      const allTemplates = [
        {
          angleId: 'educational',
          angleName: 'Educational Breakdown',
          title: `The 5-Minute Architecture Behind ${topic}`,
          hook: `I spent 40 hours tearing apart the architecture of ${topic} so you can understand it in 60 seconds.`,
          format: platform,
          audience: `${audTarget} Developers & Builders`,
          whyWorks: 'Time compression ("40 hours in 60 seconds") offers disproportionate perceived value and high save rates.',
          structure: '1. The Complexity Myth -> 2. Core Component 1 -> 3. Component 2 -> 4. Final Assembled Flow',
          cta: 'Subscribe for weekly 60-second deep dives into emerging tech stacks.',
          score: 95
        },
        {
          angleId: 'controversial',
          angleName: 'Controversial Debate',
          title: `Why Most Creators Are Completely Wrong About ${topic}`,
          hook: `Everyone is telling you to adopt ${topic} in 2026. Here is why doing that might actually break your workflow.`,
          format: platform,
          audience: `${audTarget} Practitioners & Opinion Leaders`,
          whyWorks: 'Challenges common dogma, triggering immediate curiosity and high debate in the comment section.',
          structure: '1. Shocking Contrarian Statement -> 2. The Hidden Flaw -> 3. Empirical Test -> 4. The Real Solution',
          cta: 'Comment your take below: Do you agree or are you sticking with the mainstream way?',
          score: 96
        },
        {
          angleId: 'storytelling',
          angleName: 'Narrative Storytelling',
          title: `The Day ${topic} Changed Everything for My Workflow`,
          hook: `Three weeks ago, I almost gave up on my setup — until a late-night breakthrough with ${topic} changed everything.`,
          format: platform,
          audience: `${audTarget} Aspirational Creators`,
          whyWorks: 'Hero journey narrative hooks emotional empathy and drives viewer watch-time to the final payoff.',
          structure: '1. The Frustrating Obstacle -> 2. The Turning Point -> 3. The Climax -> 4. The Lasting Lesson',
          cta: 'Drop a like if you have ever hit a wall right before a breakthrough!',
          score: 92
        },
        {
          angleId: 'beginner',
          angleName: 'Beginner Friendly',
          title: `${topic} Explained in Plain English (No Jargon)`,
          hook: `Think ${topic} is too complicated? Imagine your brain is a kitchen and this system is your personal master chef.`,
          format: platform,
          audience: `${audTarget} Beginners & Explorers`,
          whyWorks: 'Removes cognitive friction, allowing casual viewers to grasp advanced topics instantly.',
          structure: '1. The Everyday Analogy -> 2. Mapping to Reality -> 3. Quick Real Example -> 4. Simple Summary',
          cta: 'Follow for tech and creator concepts explained without the gatekeeping jargon.',
          score: 91
        },
        {
          angleId: 'expert',
          angleName: 'Expert Deep Dive',
          title: `Production Benchmark: Stress-Testing ${topic}`,
          hook: `We ran 1,000 automated stress tests on ${topic} in production. The performance telemetry shocked our team.`,
          format: platform,
          audience: `${audTarget} Senior Engineers & Power Users`,
          whyWorks: 'Objective empirical numbers build unquestioned technical authority and heavy bookmarking.',
          structure: '1. Test Parameters -> 2. Latency & Cost Breakdown -> 3. Bottleneck Analysis -> 4. Winner',
          cta: 'Check the description for the raw benchmark dataset and reproduction scripts.',
          score: 97
        },
        {
          angleId: 'myth-busting',
          angleName: 'Myth-Busting',
          title: `3 Costly Lies You Were Told About ${topic}`,
          hook: `If you are using ${topic}, check your settings right now. These 3 common myths could be costing you hours.`,
          format: platform,
          audience: `${audTarget} Active Users`,
          whyWorks: 'Loss aversion ("costing you hours") creates an immediate impulse to audit personal setups.',
          structure: '1. Myth #1 (Most Common) -> 2. Myth #2 (Most Expensive) -> 3. Myth #3 -> 4. The 30-Second Fix',
          cta: 'Save this video to audit your setup before your next project.',
          score: 94
        },
        {
          angleId: 'listicle',
          angleName: 'Ranked Top Listicles',
          title: `Top 5 Game-Changing Tools for ${topic} in 2026`,
          hook: `I tested 24 tools for ${topic} so you don't have to. Here are the ONLY 5 worth your time this year.`,
          format: platform,
          audience: `${audTarget} Productivity Seekers`,
          whyWorks: 'Curated ranking creates high retention as viewers stay to see which tool claimed the #1 spot.',
          structure: '1. Rapid Fire 5 to 3 -> 2. Runner Up (#2) -> 3. The Uncontested Winner (#1) -> 4. Summary',
          cta: 'Which of these 5 are in your daily stack? Vote in the comments.',
          score: 93
        },
        {
          angleId: 'case-study',
          angleName: 'Case Study Blueprint',
          title: `How a Solo Creator Scaled With ${topic}`,
          hook: `How this unknown solo builder leveraged ${topic} to scale to $10,000/month with zero outside funding.`,
          format: platform,
          audience: `${audTarget} Founders & Indie Hackers`,
          whyWorks: 'Specific revenue milestones and social proof trigger massive bookmarking and shareability.',
          structure: '1. The Staggering Result -> 2. The Humble Start -> 3. The 3-Step Framework -> 4. Replicable Rules',
          cta: 'Bookmark this blueprint to reference when planning your next content monetization push.',
          score: 98
        },
        {
          angleId: 'personal-story',
          angleName: 'Personal Story',
          title: `I Tested ${topic} for 30 Days: Here Is What Happened`,
          hook: `I replaced my entire standard routine with ${topic} for 30 consecutive days. Here is the unfiltered truth.`,
          format: platform,
          audience: `${audTarget} Curious General Audience`,
          whyWorks: 'Personal stakes and empirical experience create a natural bingeable narrative arc.',
          structure: '1. Day 1 Friction -> 2. Day 10 Breakthrough -> 3. Day 20 Pitfall -> 4. Final Verdict',
          cta: 'Would you try this 30-day experiment? Let me know in the comments.',
          score: 90
        },
        {
          angleId: 'hot-take',
          angleName: 'Contrarian Hot Take',
          title: `Why ${topic} Will Be Unrecognizable in 18 Months`,
          hook: `Stop building for today: by late 2027, ${topic} will look completely obsolete. Here is what is replacing it.`,
          format: platform,
          audience: `${audTarget} Forward-Thinking Strategists`,
          whyWorks: 'Foresight and boldness generate high conversation velocity among industry decision-makers.',
          structure: '1. The Dying Paradigm -> 2. The 2 Emerging Signals -> 3. How the 1% Prepare -> 4. Action Plan',
          cta: 'Save this prediction and check back in 18 months to see if I was right!',
          score: 94
        },
        {
          angleId: 'tutorial',
          angleName: 'Actionable Step-by-Step',
          title: `Build Your First ${topic} System in 4 Steps`,
          hook: `Do NOT overcomplicate it: here is the exact 4-step tutorial to configure ${topic} right now from scratch.`,
          format: platform,
          audience: `${audTarget} Hands-on Makers`,
          whyWorks: 'Friction-free clarity removes hesitation and drives massive completions and replays.',
          structure: '1. Prerequisites -> 2. Initial Setup -> 3. Core Engine Logic -> 4. Live Verification',
          cta: 'Double-tap if this saved you time, and save the post for your next build.',
          score: 92
        },
        {
          angleId: 'news-reaction',
          angleName: 'Industry News Reaction',
          title: `My Honest Reaction to the Latest ${topic} Breakthrough`,
          hook: `The latest breakthrough in ${topic} just changed the entire roadmap. Here is what the headlines missed.`,
          format: platform,
          audience: `${audTarget} News Junkies & Industry Watchers`,
          whyWorks: 'Timely analysis of trending developments captures high search momentum and algorithm surges.',
          structure: '1. The Big Headline -> 2. What It Really Means -> 3. Winners vs Losers -> 4. What You Should Do',
          cta: 'What is your reaction to this announcement? Drop your thoughts below.',
          score: 93
        }
      ];

      if (angleId === 'all') return allTemplates;
      const matched = allTemplates.filter(a => a.angleId === angleId);
      return matched.length > 0 ? matched : allTemplates;
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

      const momentumWeight = (s.momentum || 85) * 0.25;
      const engagementWeight = (s.engagement || 88) * 0.20;
      const searchWeight = (s.searchDemand || 80) * 0.15;
      const saturationWeight = (100 - (s.saturation || 30)) * 0.15;
      const freshWeight = (s.freshFactor || 90) * 0.15;
      const monetWeight = (s.monetization || 85) * 0.10;

      let score = Math.round(momentumWeight + engagementWeight + searchWeight + saturationWeight + freshWeight + monetWeight);

      if (profile.niches && profile.niches.includes(trend.niche)) score += 3;
      if (profile.content_types && profile.content_types.includes(trend.platform)) score += 2;
      score = Math.min(99, Math.max(50, score));

      let tier = 'EXPLOSIVE';
      if (score < 80) tier = 'CALIBRATED';
      else if (score < 90) tier = 'STRONG';

      return { score, tier, signals: s };
    },

    evaluateLiveHook(hookText, platform = 'shorts', niche = 'ai') {
      const text = (hookText || '').trim();
      if (!text) return null;

      const hasNumber = /\d+/.test(text);
      const hasQuestion = text.includes('?');
      const hasLossAversion = /delete|stop|never|worst|mistake|regret|fail|lies|disaster|broken|ruin|costly|danger/i.test(text);
      const hasPowerWord = /secret|tested|truth|insane|brutal|proof|architecture|scaled|formula|blueprint|unknown|revealed|cheat|hacks/i.test(text);
      const len = text.length;

      let curiosity = 76 + (hasQuestion ? 8 : 0) + (hasPowerWord ? 9 : 0) + (len > 35 ? 5 : 0);
      let stakes = 74 + (hasLossAversion ? 14 : 0) + (hasNumber ? 6 : 0);
      let velocity = 78 + (len >= 45 && len <= 95 ? 13 : 4) + (hasNumber ? 5 : 0);

      curiosity = Math.min(99, curiosity);
      stakes = Math.min(99, stakes);
      velocity = Math.min(99, velocity);

      const overall = Math.round((curiosity * 0.35) + (stakes * 0.35) + (velocity * 0.30));

      return {
        score: overall,
        tier: overall >= 90 ? 'EXPLOSIVE' : (overall >= 78 ? 'STRONG' : 'CALIBRATED'),
        curiosity,
        stakes,
        velocity,
        diagnostics: {
          hasNumber,
          hasQuestion,
          hasLossAversion,
          hasPowerWord,
          length: len,
          platform,
          niche
        }
      };
    }
  };

  // ================= 4. DATA PERSISTENCE & API CLIENT =================
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
  let searchQuery = '';
  let activeTopicFilter = 'all';
  let activeNicheFilter = 'all';
  let currentOnboardStep = 1;
  let sampleHookIndex = 0;
  let radarSecondsRemaining = 6480; // 1h 48m countdown

  // ================= 6. UI RENDERERS =================

  // --- Clock, Dynamic Greeting & Radar Countdown ---
  let simulatedHour = null;

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
    const greetingEl = document.getElementById('hero-greeting') || document.getElementById('hero-greeting-text');
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

    if (greetingEl) {
      greetingEl.textContent = greeting;
    }

    if (userNameEl) {
      const rawName = (creatorProfile && creatorProfile.name) ? creatorProfile.name.trim() : 'Arka';
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
    const list = document.getElementById('creator-persona-chips') || document.getElementById('hero-persona-chips');
    const sidebarInitials = document.getElementById('sidebar-avatar-initials');
    const topbarInitials = document.getElementById('topbar-avatar-initials');
    const topbarChipName = document.getElementById('topbar-chip-name');

    const name = (creatorProfile && creatorProfile.name) ? creatorProfile.name : 'Arka Mondal';
    const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'AM';

    if (sidebarInitials) sidebarInitials.textContent = initials;
    if (topbarInitials) topbarInitials.textContent = initials;
    if (topbarChipName) {
      const parts = name.split(' ');
      topbarChipName.textContent = parts.length > 1 ? `${parts[0]} ${parts[1][0]}.` : parts[0];
    }

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
      if (activeTrendingPlatform === 'shorts') {
        trends = trends.filter(t => t.platform === 'shorts' || t.platform === 'reels' || t.platform === 'tiktok');
      } else {
        trends = trends.filter(t => t.platform === activeTrendingPlatform);
      }
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

  // --- Section 2: Ideas For You (12 Creative Angles) ---
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

    // Render Active Filters Bar
    const hasActiveFilters = searchQuery.trim() || activeTopicFilter !== 'all' || activeNicheFilter !== 'all';
    if (activeFiltersBar && activeChipsList) {
      if (hasActiveFilters) {
        activeFiltersBar.style.display = 'flex';
        let chipsHtml = '';

        if (searchQuery.trim()) {
          chipsHtml += `
            <span class="filter-chip-item">
              <span>Query: "${escapeHtml(searchQuery.trim())}"</span>
              <button class="chip-remove-btn" id="chip-remove-query" aria-label="Remove search query filter">✕</button>
            </span>
          `;
        }

        if (activeTopicFilter !== 'all') {
          const tObj = VantageTrendsData.CURATED_TOPICS.find(tp => tp.id === activeTopicFilter);
          chipsHtml += `
            <span class="filter-chip-item">
              <span>Topic: ${escapeHtml(tObj ? tObj.name : activeTopicFilter)}</span>
              <button class="chip-remove-btn" id="chip-remove-topic" aria-label="Remove topic filter">✕</button>
            </span>
          `;
        }

        if (activeNicheFilter !== 'all') {
          const nObj = VantageTrendsData.CURATED_NICHES.find(np => np.id === activeNicheFilter);
          chipsHtml += `
            <span class="filter-chip-item">
              <span>Niche: ${escapeHtml(nObj ? nObj.name : activeNicheFilter.toUpperCase())}</span>
              <button class="chip-remove-btn" id="chip-remove-niche" aria-label="Remove niche filter">✕</button>
            </span>
          `;
        }

        activeChipsList.innerHTML = chipsHtml;

        document.getElementById('chip-remove-query')?.addEventListener('click', () => {
          searchQuery = '';
          const inp = document.getElementById('global-search-input');
          if (inp) inp.value = '';
          const clrBtn = document.getElementById('clear-search-btn');
          if (clrBtn) clrBtn.style.display = 'none';
          renderSearchSection();
        });

        document.getElementById('chip-remove-topic')?.addEventListener('click', () => {
          activeTopicFilter = 'all';
          const lbl = document.getElementById('topic-menu-label');
          if (lbl) lbl.textContent = 'Topics';
          renderTopicDropdownList();
          renderSearchSection();
        });

        document.getElementById('chip-remove-niche')?.addEventListener('click', () => {
          activeNicheFilter = 'all';
          const lbl = document.getElementById('niche-menu-label');
          if (lbl) lbl.textContent = 'Niche: All';
          renderNicheDropdownList();
          renderSearchSection();
        });

      } else {
        activeFiltersBar.style.display = 'none';
        activeChipsList.innerHTML = '';
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
        const clrBtn = document.getElementById('clear-search-btn');
        if (clrBtn) clrBtn.style.display = 'none';
        document.getElementById('topic-menu-label').textContent = 'Topics';
        document.getElementById('niche-menu-label').textContent = 'Niche: All';
        renderTopicDropdownList();
        renderNicheDropdownList();
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

  function renderTopicDropdownList(filterQuery = '') {
    const container = document.getElementById('topic-items-container');
    if (!container) return;

    let list = VantageTrendsData.CURATED_TOPICS;
    if (filterQuery.trim()) {
      const q = filterQuery.toLowerCase().trim();
      list = list.filter(item => item.name.toLowerCase().includes(q));
    }

    container.innerHTML = list.map(item => `
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
        document.getElementById('btn-topic-menu')?.classList.remove('active');
        renderTopicDropdownList();
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
        document.getElementById('btn-niche-menu')?.classList.remove('active');
        renderNicheDropdownList();
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
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        if (confirm('Delete this concept from your Content Library?')) {
          savedLibrary = savedLibrary.filter(i => i.id !== id);
          VantageAPI.saveLibrary(savedLibrary);
          renderLibrarySection();
          showToast('Idea removed from library');
        }
      });
    });

    refreshLucideIcons();
  }

  // ================= 7. MODALS & DRAWERS CONTROLLERS =================

  // --- Trend Inspector Drawer ---
  function openTrendInspector(trendId) {
    const trend = VantageTrendsData.SEED_TRENDS.find(t => t.id === trendId) || VantageTrendsData.SEED_TRENDS[0];
    selectedTrendForInspector = trend;

    const opp = VantageScorer.calculateOpportunityScore(trend, creatorProfile);
    const drawer = document.getElementById('trend-inspector-drawer');
    if (!drawer) return;

    const tagEl = document.getElementById('inspector-platform-tag');
    if (tagEl) {
      tagEl.innerHTML = `<span class="platform-pill ${trend.platform}">${escapeHtml(trend.platformName)}</span>`;
    }

    document.getElementById('inspector-score-num').textContent = opp.score;
    document.getElementById('inspector-score-sub').textContent = opp.tier;
    document.getElementById('inspector-outlier-pill').textContent = trend.outlierText;
    document.getElementById('inspector-topic-title').textContent = trend.topic;
    document.getElementById('inspector-topic-desc').textContent = trend.title;

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
    setBar('outlier', Math.min(99, Math.round((trend.outlierScore || 90))));
    setBar('freshness', sigs.freshFactor || 94);
    setBar('competition', 100 - (sigs.competition || 30));
    setBar('relevance', Math.min(99, 85 + (creatorProfile.niches?.includes(trend.niche) ? 12 : 2)));

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
    if (!modal) return;

    // Populate current profile into fields
    const nameInp = document.getElementById('settings-user-name');
    const emailInp = document.getElementById('settings-user-email');
    const bioInp = document.getElementById('settings-audience-bio');

    if (nameInp) nameInp.value = creatorProfile.name || 'Arka Mondal';
    if (emailInp) emailInp.value = creatorProfile.email || 'arkadeb.mondal@example.com';
    if (bioInp) bioInp.value = creatorProfile.audience_description || '';

    // Set first tab active
    document.querySelectorAll('.settings-tab-btn').forEach((b, idx) => b.classList.toggle('active', idx === 0));
    document.querySelectorAll('.settings-pane').forEach((p, idx) => p.classList.toggle('active', idx === 0));

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
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

  function handleLoginSubmit() {
    const emailInp = document.getElementById('auth-email-input');
    const email = (emailInp?.value || 'arka@vantage.ai').trim();

    let name = 'Arka Mondal';
    if (email.toLowerCase().includes('arka')) {
      name = 'Arka Mondal';
    } else {
      const userPart = email.split('@')[0];
      name = userPart.charAt(0).toUpperCase() + userPart.slice(1);
    }

    creatorProfile = {
      ...creatorProfile,
      name: name,
      email: email,
      updated_at: new Date().toISOString()
    };

    VantageAPI.saveProfile(creatorProfile);
    updateCreatorPersonaChips();
    updateLiveClockAndGreeting();
    closeAuthScreen();
    showToast(`Logged in as ${name} (Pro Creator Access)`);

    setTimeout(() => {
      openOnboardingModal();
    }, 350);
  }

  // --- 5-Step Onboarding Wizard ---
  function openOnboardingModal() {
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
      const selGoal = document.querySelector('#grid-goals .goal-card.selected h4')?.textContent.trim() || 'Get More Views';
      const selStyles = Array.from(document.querySelectorAll('#grid-idea-types .onboard-tag-btn.selected')).map(b => b.textContent.trim());

      const age = document.getElementById('onboard-age-range')?.value || '18-34';
      const country = document.getElementById('onboard-country')?.value || 'India';
      const lang = document.getElementById('onboard-language')?.value || 'English';

      if (document.getElementById('sum-platforms')) document.getElementById('sum-platforms').textContent = selPlatforms.join(', ') || 'Instagram Reels, Shorts, YouTube';
      if (document.getElementById('sum-niches')) document.getElementById('sum-niches').textContent = selNiches.join(', ') || 'AI, Technology & DevTools';
      if (document.getElementById('sum-audience')) document.getElementById('sum-audience').textContent = `${age} • ${country} • ${lang}`;
      if (document.getElementById('sum-goal')) document.getElementById('sum-goal').textContent = selGoal;
      if (document.getElementById('sum-styles')) document.getElementById('sum-styles').textContent = selStyles.slice(0, 4).join(', ') || 'Trending, Storytelling, Case Studies';
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
      audience_description: document.getElementById('onboard-audience-desc')?.value || '',
      goals: selGoal,
      onboarding_completed: true,
      updated_at: new Date().toISOString()
    };

    VantageAPI.saveProfile(creatorProfile);
    updateCreatorPersonaChips();
    updateLiveClockAndGreeting();
    renderTrendingSection();
    renderIdeasSection();
    renderSearchSection();
    showToast('Creator persona successfully calibrated!');
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
    toast.className = 'toast-bubble';
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
    const navTrending = document.getElementById('nav-trending');
    const navIdeas = document.getElementById('nav-ideas');
    const navSearch = document.getElementById('nav-search');
    const navLibrary = document.getElementById('nav-library');

    const setNavActive = (activeEl) => {
      document.querySelectorAll('.sidebar .nav-item').forEach(btn => btn.classList.remove('active'));
      activeEl?.classList.add('active');
    };

    navTrending?.addEventListener('click', () => {
      setNavActive(navTrending);
      document.getElementById('section-trending')?.scrollIntoView({ behavior: 'smooth' });
    });
    navIdeas?.addEventListener('click', () => {
      setNavActive(navIdeas);
      document.getElementById('section-ideas')?.scrollIntoView({ behavior: 'smooth' });
    });
    navSearch?.addEventListener('click', () => {
      setNavActive(navSearch);
      document.getElementById('section-search')?.scrollIntoView({ behavior: 'smooth' });
    });
    navLibrary?.addEventListener('click', () => {
      setNavActive(navLibrary);
      document.getElementById('section-library')?.scrollIntoView({ behavior: 'smooth' });
    });

    document.getElementById('nav-onboarding-trigger')?.addEventListener('click', openOnboardingModal);
    document.getElementById('nav-settings')?.addEventListener('click', openSettingsModal);
    document.getElementById('sidebar-user-avatar-btn')?.addEventListener('click', openAuthScreen);
    document.getElementById('topbar-profile-btn')?.addEventListener('click', openAuthScreen);
    document.getElementById('btn-hero-calibrate')?.addEventListener('click', openOnboardingModal);
    document.getElementById('btn-edit-onboarding')?.addEventListener('click', openOnboardingModal);
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
      // Simulate live jitter updates on signals
      VantageTrendsData.SEED_TRENDS.forEach(t => {
        if (t.signals) {
          t.signals.momentum = Math.min(99, Math.max(80, t.signals.momentum + (Math.random() > 0.5 ? 1 : -1)));
          t.signals.engagement = Math.min(99, Math.max(80, t.signals.engagement + (Math.random() > 0.5 ? 1 : -1)));
        }
      });
      renderTrendingSection();
      renderSearchSection();
      showToast('Synchronized live algorithmic signals across YouTube, Shorts, Reels & TikTok.');
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

    // 5. Global Search Input & Dropdowns
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

    // Search Topic Dropdown
    const topicMenuBtn = document.getElementById('btn-topic-menu');
    const topicDropdown = document.getElementById('topic-search-dropdown');
    const nicheMenuBtn = document.getElementById('btn-niche-menu');
    const nicheDropdown = document.getElementById('niche-search-dropdown');

    topicMenuBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      nicheDropdown?.classList.remove('show');
      nicheMenuBtn?.classList.remove('active');
      
      const isShowing = topicDropdown?.classList.toggle('show');
      topicMenuBtn?.classList.toggle('active', isShowing);
      if (isShowing) {
        document.getElementById('topic-filter-input')?.focus();
      }
    });

    nicheMenuBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      topicDropdown?.classList.remove('show');
      topicMenuBtn?.classList.remove('active');
      
      const isShowing = nicheDropdown?.classList.toggle('show');
      nicheMenuBtn?.classList.toggle('active', isShowing);
    });

    document.getElementById('topic-filter-input')?.addEventListener('input', (e) => {
      renderTopicDropdownList(e.target.value);
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('#topic-dropdown-anchor')) {
        topicDropdown?.classList.remove('show');
        topicMenuBtn?.classList.remove('active');
      }
      if (!e.target.closest('#niche-dropdown-anchor')) {
        nicheDropdown?.classList.remove('show');
        nicheMenuBtn?.classList.remove('active');
      }
    });

    document.getElementById('btn-clear-all-filters')?.addEventListener('click', () => {
      searchQuery = '';
      activeTopicFilter = 'all';
      activeNicheFilter = 'all';
      if (searchInp) searchInp.value = '';
      if (clearSearchBtn) clearSearchBtn.style.display = 'none';
      
      const topicLbl = document.getElementById('topic-menu-label');
      if (topicLbl) topicLbl.textContent = 'Topics';
      const nicheLbl = document.getElementById('niche-menu-label');
      if (nicheLbl) nicheLbl.textContent = 'Niche: All';

      renderTopicDropdownList();
      renderNicheDropdownList();
      renderSearchSection();
      showToast('Cleared all search and category filters');
    });

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

    // Search niches in Step 2
    document.getElementById('onboard-niche-search')?.addEventListener('input', (e) => {
      const q = (e.target.value || '').toLowerCase().trim();
      document.querySelectorAll('#grid-niches .onboard-tag-btn').forEach(btn => {
        const text = btn.textContent.toLowerCase();
        btn.style.display = (!q || text.includes(q)) ? 'inline-flex' : 'none';
      });
    });

    // Add custom niche in Step 2
    document.getElementById('btn-add-custom-niche')?.addEventListener('click', () => {
      const input = document.getElementById('onboard-custom-niche');
      const val = (input?.value || '').trim();
      if (!val) return;

      const slug = val.toLowerCase().replace(/[^a-z0-9]/g, '-');
      const grid = document.getElementById('grid-niches');
      if (grid) {
        const newBtn = document.createElement('button');
        newBtn.className = 'onboard-tag-btn selected';
        newBtn.setAttribute('data-value', slug);
        newBtn.textContent = val;
        newBtn.addEventListener('click', () => newBtn.classList.toggle('selected'));
        grid.appendChild(newBtn);
      }
      if (input) input.value = '';
      showToast(`Added custom niche "${val}"`);
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

    // Inspector Action Buttons
    document.getElementById('inspector-bookmark-btn')?.addEventListener('click', () => {
      if (selectedTrendForInspector) {
        addIdeaToLibrary({
          title: selectedTrendForInspector.title,
          hook: selectedTrendForInspector.title,
          niche: selectedTrendForInspector.niche,
          format: selectedTrendForInspector.platformName,
          score: selectedTrendForInspector.outlierScore || 94,
          scoreTier: 'EXPLOSIVE',
          trendSource: selectedTrendForInspector.topic
        });
      }
    });

    document.getElementById('btn-inspector-generate-ideas')?.addEventListener('click', () => {
      if (selectedTrendForInspector) {
        selectedTrendForIdeas = selectedTrendForInspector;
        renderIdeasSection();
        closeTrendInspector();
        document.getElementById('section-ideas')?.scrollIntoView({ behavior: 'smooth' });
        showToast(`Generated 12 creative angles for "${selectedTrendForInspector.topic}"`);
      }
    });

    document.getElementById('close-scorer-modal')?.addEventListener('click', closeScorerModal);
    document.getElementById('cancel-scorer-btn')?.addEventListener('click', closeScorerModal);
    document.getElementById('close-settings-modal')?.addEventListener('click', closeSettingsModal);
    document.getElementById('cancel-settings-btn')?.addEventListener('click', closeSettingsModal);
    document.getElementById('btn-close-auth-gateway')?.addEventListener('click', closeAuthScreen);
    document.getElementById('btn-gateway-explore-guest')?.addEventListener('click', closeAuthScreen);
    document.getElementById('btn-instant-demo-login')?.addEventListener('click', () => {
      handleLoginSubmit();
    });

    // 8. Virality Scorer Analysis
    const sampleHooks = [
      "I gave 3 AI agents $1,000 each and let them trade for 30 days — the results broke my model.",
      "Delete these 3 VS Code extensions before they secretly slow down your build times.",
      "Why 90% of solo creators fail at monetization in month 3 (and the 1% fix).",
      "Stop paying OpenAI: Run DeepSeek-R1 locally on consumer hardware in 4 minutes.",
      "Why working out at 6 AM might secretly stall your fat loss (the cortisol window)."
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
      if (charEl) charEl.textContent = `${e.target.value.length} characters • Optimal length: 55-90 chars`;
    });

    document.getElementById('btn-run-analysis')?.addEventListener('click', () => {
      const text = document.getElementById('hook-input-field')?.value || '';
      const platform = document.getElementById('platform-select-field')?.value || 'shorts';
      const niche = document.getElementById('niche-select-field')?.value || 'ai';
      
      const result = VantageScorer.evaluateLiveHook(text, platform, niche);
      if (!result) {
        showToast('Please enter a hook headline to analyze.');
        return;
      }

      const scoreNum = document.getElementById('result-score-num');
      const scoreLabel = document.getElementById('result-score-label');
      const barCuriosity = document.getElementById('bar-curiosity');
      const fillCuriosity = document.getElementById('fill-curiosity');
      const barStakes = document.getElementById('bar-stakes');
      const fillStakes = document.getElementById('fill-stakes');
      const barVelocity = document.getElementById('bar-velocity');
      const fillVelocity = document.getElementById('fill-velocity');
      const saveBtn = document.getElementById('save-to-library-btn');
      const scoreRing = document.getElementById('result-score-ring');

      if (scoreNum) scoreNum.textContent = result.score;
      if (scoreLabel) scoreLabel.textContent = `${result.tier} VIRALITY`;
      
      if (barCuriosity) barCuriosity.textContent = `${result.curiosity}%`;
      if (fillCuriosity) fillCuriosity.style.width = `${result.curiosity}%`;
      
      if (barStakes) barStakes.textContent = `${result.stakes}%`;
      if (fillStakes) fillStakes.style.width = `${result.stakes}%`;
      
      if (barVelocity) barVelocity.textContent = `${result.velocity}%`;
      if (fillVelocity) fillVelocity.style.width = `${result.velocity}%`;

      if (scoreRing) {
        scoreRing.classList.remove('tier-explosive', 'tier-strong', 'tier-calibrated');
        if (result.score >= 90) scoreRing.classList.add('tier-explosive');
        else if (result.score >= 78) scoreRing.classList.add('tier-strong');
        else scoreRing.classList.add('tier-calibrated');
      }

      if (saveBtn) {
        saveBtn.removeAttribute('disabled');
      }

      showToast(`Analyzed hook virality: Score ${result.score}/100 (${result.tier})`);
    });

    document.getElementById('save-to-library-btn')?.addEventListener('click', () => {
      const text = document.getElementById('hook-input-field')?.value || '';
      const platform = document.getElementById('platform-select-field')?.value || 'shorts';
      const niche = document.getElementById('niche-select-field')?.value || creatorProfile.niches?.[0] || 'ai';
      const result = VantageScorer.evaluateLiveHook(text, platform, niche);
      if (!text.trim()) {
        showToast('Enter a hook before saving.');
        return;
      }
      addIdeaToLibrary({
        title: text.trim(),
        hook: text.trim(),
        niche: niche,
        format: platform.toLowerCase().includes('youtube') ? 'YouTube (16:9)' : 'Shorts & Reels (9:16)',
        score: result ? result.score : 90,
        scoreTier: result ? result.tier : 'EXPLOSIVE',
        trendSource: 'AI Virality Scorer'
      });
      closeScorerModal();
    });

    // 9. Settings Modal Tabs & Actions
    document.querySelectorAll('.settings-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.settings-tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.settings-pane').forEach(p => p.classList.remove('active'));
        
        btn.classList.add('active');
        const tabId = btn.getAttribute('data-tab');
        const targetPane = document.getElementById(`settings-pane-${tabId}`);
        if (targetPane) targetPane.classList.add('active');
      });
    });

    document.getElementById('btn-save-settings-profile')?.addEventListener('click', () => {
      const nameInp = document.getElementById('settings-user-name');
      const emailInp = document.getElementById('settings-user-email');
      const bioInp = document.getElementById('settings-audience-bio');

      const name = (nameInp?.value || creatorProfile.name || 'Arka Mondal').trim();
      const email = (emailInp?.value || creatorProfile.email || 'arka@vantage.ai').trim();
      const bio = (bioInp?.value || creatorProfile.audience_description || '').trim();

      creatorProfile = {
        ...creatorProfile,
        name: name,
        email: email,
        audience_description: bio,
        updated_at: new Date().toISOString()
      };

      VantageAPI.saveProfile(creatorProfile);
      updateCreatorPersonaChips();
      updateLiveClockAndGreeting();
      closeSettingsModal();
      showToast('Profile settings updated and saved!');
    });

    document.getElementById('btn-test-backend-connection')?.addEventListener('click', async () => {
      const statusBox = document.getElementById('settings-backend-status-box');
      if (statusBox) statusBox.innerHTML = `<span><span class="live-pulse"></span> Testing connection to server...</span>`;
      
      const startTime = performance.now();
      const health = await VantageAPI.checkHealth();
      const latency = Math.round(performance.now() - startTime);

      if (health) {
        if (statusBox) {
          statusBox.innerHTML = `
            <div style="color: var(--chart-1); font-weight: 600;">
              ✓ Connected to Live Backend (${health.status || 'OK'}) &bull; Latency: ${latency}ms
            </div>
            <div style="font-size: 11px; color: var(--text-secondary); margin-top: 4px;">
              Server: ${VantageConfig.API_BASE} &bull; Timestamp: ${new Date().toLocaleTimeString()}
            </div>
          `;
        }
        showToast(`Backend connection successful (${latency}ms)`);
      } else {
        if (statusBox) {
          statusBox.innerHTML = `
            <div style="color: var(--chart-1); font-weight: 600;">
              ⚡ Autonomous Client Engine Active (Local Persistence)
            </div>
            <div style="font-size: 11px; color: var(--text-secondary); margin-top: 4px;">
              100% full offline parity enabled. (Optional backend: run 'server.ps1' or 'node server/server.js' for REST sync)
            </div>
          `;
        }
        showToast('Autonomous Client Engine active with local persistence');
      }
    });

    document.getElementById('btn-sync-all-data')?.addEventListener('click', () => {
      VantageAPI.saveProfile(creatorProfile);
      VantageAPI.saveLibrary(savedLibrary);
      showToast('Pushed all profile settings and library concepts to backend storage!');
    });

    document.getElementById('btn-export-library-json')?.addEventListener('click', () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(savedLibrary, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `vantage_library_${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast('Content Library exported as JSON backup!');
    });

    document.getElementById('btn-import-library-json')?.addEventListener('click', () => {
      document.getElementById('import-json-file-input')?.click();
    });

    document.getElementById('import-json-file-input')?.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target.result);
          if (Array.isArray(imported)) {
            savedLibrary = imported;
            VantageAPI.saveLibrary(savedLibrary);
            renderLibrarySection();
            closeSettingsModal();
            showToast(`Imported ${imported.length} ideas into your Content Library!`);
          } else {
            showToast('Invalid JSON file format (expected an array of ideas).');
          }
        } catch (err) {
          showToast('Error parsing JSON file. Please check file structure.');
        }
      };
      reader.readAsText(file);
      e.target.value = '';
    });

    document.getElementById('btn-reset-all-data')?.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset all profile settings and library back to original demo defaults?')) {
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

    // 10. Global Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeOnboardingModal();
        closeTrendInspector();
        closeScorerModal();
        closeSettingsModal();
        closeAuthScreen();
        topicDropdown?.classList.remove('show');
        topicMenuBtn?.classList.remove('active');
        nicheDropdown?.classList.remove('show');
        nicheMenuBtn?.classList.remove('active');
      }

      // Cmd+K or Ctrl+K for Search
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('global-search-input');
        if (searchInput) {
          searchInput.focus();
          document.getElementById('section-search')?.scrollIntoView({ behavior: 'smooth' });
        }
      }

      // 'N' hotkey for Scorer (if not typing in input)
      if (e.key.toLowerCase() === 'n' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName) && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        openScorerModal();
      }

      // Cmd+1/2/3/4 navigation
      if ((e.metaKey || e.ctrlKey) && e.key === '1') {
        e.preventDefault();
        navTrending?.click();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === '2') {
        e.preventDefault();
        navIdeas?.click();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === '3') {
        e.preventDefault();
        navSearch?.click();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === '4') {
        e.preventDefault();
        navLibrary?.click();
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'o') {
        e.preventDefault();
        openOnboardingModal();
      }
    });
  }

  // ================= 10. INITIALIZATION =================
  function init() {
    bindAllEvents();
    updateLiveClockAndGreeting();
    setInterval(updateLiveClockAndGreeting, 1000);
    setInterval(updateLiveRadarCountdown, 1000);
    updateCreatorPersonaChips();
    renderTrendingSection();
    renderIdeasSection();
    renderTopicDropdownList();
    renderNicheDropdownList();
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
    openAuth: openAuthScreen,
    addIdea: addIdeaToLibrary,
    copyHook: copyToClipboard,
    showToast: showToast,
    handleLoginSubmit: handleLoginSubmit,
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
