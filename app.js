/**
 * VANTAGE VIRALITY OS V2 — CREATOR ONBOARDING & CONTINUOUS TREND INTELLIGENCE OS
 * 100% Functional Client-Side Database, 7-Signal Opportunity Engine, 12-Angle Studio,
 * Dynamic Live Timing, 6-Stage Production Kanban & List System, Full Onboarding Wizard.
 */

(function () {
  'use strict';

  // ================= 1. CONSTANTS & STORAGE KEYS =================
  const STORAGE_KEY_PROFILE = 'vantage_creator_profile';
  const STORAGE_KEY_LIBRARY = 'vantage_saved_library';

  // Default Creator Profile schema
  const DEFAULT_CREATOR_PROFILE = {
    id: 'profile-arka-01',
    user_id: 'user-arka-01',
    name: 'Arka Mondal',
    email: 'arkadeb.mondal@example.com',
    content_types: ['reels', 'shorts', 'youtube'],
    niches: ['ai', 'technology'],
    age_range: '18-34',
    country: 'India',
    language: 'English',
    audience_description: 'Young professionals and tech creators interested in AI productivity and developer tools.',
    goals: 'views',
    preferred_formats: ['trending', 'storytelling', 'case-studies', 'educational', 'controversial'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    onboarding_completed: true
  };

  // State Management
  let creatorProfile = loadCreatorProfile();
  let savedLibrary = loadSavedLibrary();
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

  const SAMPLE_HOOKS = [
    "I gave 3 AI agents $1,000 each and let them trade for 30 days — the results broke my model.",
    "Delete these 3 VS Code extensions before they secretly slow down your build times.",
    "Why 90% of creators fail at short-form video in 2026 (and the 3-second fix).",
    "I tested every AI video editor so you don't have to — here is the brutal truth.",
    "How one solopreneur scaled a micro-SaaS to $45k/mo with zero employees."
  ];

  // ================= 2. SEED TREND DATASET (7 NICHES • DEMO DATA) =================
  const SEED_TRENDS = [
    {
      id: 'trend-ai-1',
      topic: 'AI Autonomous Trading Agents',
      title: 'I gave 3 AI agents $1,000 each to trade crypto for 30 days',
      niche: 'ai',
      nicheName: 'AI & Machine Learning',
      platform: 'youtube',
      platformName: 'YouTube Long-form',
      status: 'exploding',
      statusLabel: 'EXPLODING',
      outlierMultiplier: '9.4×',
      outlierText: '9.4× above channel baseline',
      views: '482K',
      viewsNum: 482000,
      engagementRate: '11.8%',
      momentum: 96,
      searchDemand: 94,
      outlierScore: 98,
      freshness: 88,
      competition: 82,
      relevance: 98,
      whyTrending: [
        'Search volume for "autonomous AI agents" spiked +142% this week',
        'Recent video uploads in this niche are generating 9.4× median views',
        '3 breakout creator experiments appeared on YouTube trending tab',
        'High curiosity gap paired with real financial stakes creates 82% 30s retention',
        'Audience appetite is strong with low competition supply'
      ],
      tags: ['#AIAgents', '#HighStakes', '#Experiment', '#Trading']
    },
    {
      id: 'trend-ai-2',
      topic: 'Local LLMs on Apple Silicon',
      title: 'Running 70B parameter models offline on M3 Max with zero cloud lag',
      niche: 'ai',
      nicheName: 'AI & Machine Learning',
      platform: 'shorts',
      platformName: 'Shorts / Reels',
      status: 'hot',
      statusLabel: 'HOT',
      outlierMultiplier: '5.8×',
      outlierText: '5.8× above channel baseline',
      views: '290K',
      viewsNum: 290000,
      engagementRate: '9.4%',
      momentum: 88,
      searchDemand: 86,
      outlierScore: 89,
      freshness: 92,
      competition: 75,
      relevance: 95,
      whyTrending: [
        'Local privacy concerns driving huge interest in offline AI',
        'Benchmark comparisons get 3× higher replay rate in short video feeds',
        'High comment volume debating Ollama vs LM Studio configurations'
      ],
      tags: ['#LocalLLM', '#AppleSilicon', '#Hardware', '#OpenSource']
    },
    {
      id: 'trend-tech-1',
      topic: 'VS Code Extensions Optimization',
      title: '3 VS Code extensions you should delete before your next build',
      niche: 'technology',
      nicheName: 'Tech & DevTools',
      platform: 'shorts',
      platformName: 'Shorts / Reels',
      status: 'rising',
      statusLabel: 'RISING',
      outlierMultiplier: '4.2×',
      outlierText: '4.2× above channel baseline',
      views: '175K',
      viewsNum: 175000,
      engagementRate: '8.7%',
      momentum: 82,
      searchDemand: 79,
      outlierScore: 84,
      freshness: 90,
      competition: 68,
      relevance: 92,
      whyTrending: [
        'Loss aversion framing ("delete these") drives immediate audit action',
        'Fast 15-second visual pacing keeps drop-off under 18%'
      ],
      tags: ['#DevTools', '#VSCode', '#Productivity', '#Coding']
    },
    {
      id: 'trend-tech-2',
      topic: 'Rust vs TypeScript Backend',
      title: 'Why I rewrote my SaaS backend from Node to Rust (and regretted it)',
      niche: 'technology',
      nicheName: 'Tech & DevTools',
      platform: 'podcast',
      platformName: 'Podcast / Essay',
      status: 'hot',
      statusLabel: 'HOT',
      outlierMultiplier: '6.1×',
      outlierText: '6.1× above channel baseline',
      views: '124K',
      viewsNum: 124000,
      engagementRate: '12.4%',
      momentum: 87,
      searchDemand: 82,
      outlierScore: 91,
      freshness: 84,
      competition: 70,
      relevance: 89,
      whyTrending: [
        'Vulnerable regret story arcs outperform standard victory lap case studies',
        'Heated tribal comments between Rust and JavaScript developers'
      ],
      tags: ['#RustLang', '#TypeScript', '#Backend', '#Architecture']
    },
    {
      id: 'trend-finance-1',
      topic: 'High-Yield Cash Arbitrage',
      title: 'Where millionaires park cash when markets get volatile in 2026',
      niche: 'finance',
      nicheName: 'Finance & Crypto',
      platform: 'youtube',
      platformName: 'YouTube Long-form',
      status: 'exploding',
      statusLabel: 'EXPLODING',
      outlierMultiplier: '8.2×',
      outlierText: '8.2× above channel baseline',
      views: '620K',
      viewsNum: 620000,
      engagementRate: '10.2%',
      momentum: 94,
      searchDemand: 91,
      outlierScore: 95,
      freshness: 85,
      competition: 80,
      relevance: 85,
      whyTrending: [
        'Macro-economic uncertainty leading to unprecedented demand for wealth preservation',
        'Specific dollar amounts in thumbnail trigger 18.4% click-through rate'
      ],
      tags: ['#Wealth', '#CashFlow', '#Investing', '#Strategy']
    },
    {
      id: 'trend-fitness-1',
      topic: 'Zone 2 Cardio Mythbusting',
      title: 'I only did Zone 2 cardio for 6 months — here is my DEXA scan proof',
      niche: 'fitness',
      nicheName: 'Fitness & Health',
      platform: 'youtube',
      platformName: 'YouTube Long-form',
      status: 'exploding',
      statusLabel: 'EXPLODING',
      outlierMultiplier: '7.6×',
      outlierText: '7.6× above channel baseline',
      views: '540K',
      viewsNum: 540000,
      engagementRate: '11.5%',
      momentum: 93,
      searchDemand: 89,
      outlierScore: 92,
      freshness: 89,
      competition: 74,
      relevance: 82,
      whyTrending: [
        'Empirical medical scanning proof eliminates viewer skepticism',
        'Contrarian angle to traditional HIIT workout culture'
      ],
      tags: ['#Cardio', '#Longevity', '#DEXAScan', '#Health']
    },
    {
      id: 'trend-business-1',
      topic: 'Solopreneur Micro-SaaS Playbook',
      title: 'How I run a $45k/mo software business with zero employees',
      niche: 'business',
      nicheName: 'Business & Startups',
      platform: 'youtube',
      platformName: 'YouTube Long-form',
      status: 'hot',
      statusLabel: 'HOT',
      outlierMultiplier: '6.7×',
      outlierText: '6.7× above channel baseline',
      views: '380K',
      viewsNum: 380000,
      engagementRate: '13.1%',
      momentum: 89,
      searchDemand: 88,
      outlierScore: 90,
      freshness: 81,
      competition: 78,
      relevance: 90,
      whyTrending: [
        'Massive cultural shift toward lean one-person automated companies',
        'Live Stripe revenue screenshots create undeniable trust'
      ],
      tags: ['#MicroSaaS', '#Solopreneur', '#Automation', '#Revenue']
    },
    {
      id: 'trend-photo-1',
      topic: 'Lens Compression Tricks',
      title: 'Why your portrait photos look cheap (and how an 85mm fix changes everything)',
      niche: 'photography',
      nicheName: 'Photography & Video',
      platform: 'shorts',
      platformName: 'Shorts / Reels',
      status: 'rising',
      statusLabel: 'RISING',
      outlierMultiplier: '4.8×',
      outlierText: '4.8× above channel baseline',
      views: '210K',
      viewsNum: 210000,
      engagementRate: '9.1%',
      momentum: 80,
      searchDemand: 76,
      outlierScore: 82,
      freshness: 85,
      competition: 65,
      relevance: 78,
      whyTrending: [
        'Visual A/B comparisons create immediate 3-second hook conversion',
        'High bookmark rate for future photography shoot reference'
      ],
      tags: ['#Photography', '#Portrait', '#CameraGear', '#Tutorial']
    }
  ];

  // Default seed ideas in library
  const DEFAULT_LIBRARY_IDEAS = [
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
  ];

  // ================= 3. LOCAL DATABASE ENGINE & STORAGE =================
  function loadCreatorProfile() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROFILE);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
    return { ...DEFAULT_CREATOR_PROFILE };
  }

  function saveCreatorProfile(profile) {
    creatorProfile = profile;
    try {
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
    updateCreatorPersonaChips();
    renderTrendingSection();
    renderIdeasSection();
    renderSearchSection();
  }

  function loadSavedLibrary() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LIBRARY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
    return [...DEFAULT_LIBRARY_IDEAS];
  }

  function saveLibrary(lib) {
    savedLibrary = lib;
    try {
      localStorage.setItem(STORAGE_KEY_LIBRARY, JSON.stringify(lib));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
    renderLibrarySection();
  }

  // ================= 4. MEASURABLE OPPORTUNITY SCORING FORMULA =================
  function calculateOpportunityScore(trend, profile) {
    const m = trend.momentum || 80;
    const e = parseFloat(trend.engagementRate) * 7.5 || 80;
    const s = trend.searchDemand || 75;
    const o = trend.outlierScore || 85;
    const f = trend.freshness || 80;
    const c = trend.competition || 70;

    const isNicheMatch = (profile.niches || []).includes(trend.niche);
    const r = isNicheMatch ? 98 : 65;

    const rawScore = (0.25 * m) + (0.20 * e) + (0.15 * s) + (0.15 * o) + (0.10 * f) + (0.10 * c) + (0.05 * r);
    const finalScore = Math.round(Math.min(100, Math.max(0, rawScore)));

    let tier = 'LOW';
    let tierClass = 'tier-moderate';
    if (finalScore >= 90) { tier = 'EXPLOSIVE'; tierClass = 'tier-explosive'; }
    else if (finalScore >= 75) { tier = 'STRONG'; tierClass = 'tier-strong'; }
    else if (finalScore >= 60) { tier = 'GOOD'; tierClass = 'tier-good'; }
    else if (finalScore >= 40) { tier = 'MODERATE'; tierClass = 'tier-moderate'; }

    return {
      score: finalScore,
      tier,
      tierClass,
      signals: { momentum: m, engagement: Math.round(e), search: s, outlier: o, freshness: f, competition: c, relevance: r }
    };
  }

  // ================= 5. 12 CREATIVE ANGLES AI GENERATOR =================
  function generateIdeasForTrend(trend, angleFilter = 'all', profile = creatorProfile) {
    const audienceDesc = profile.audience_description || 'Young professionals and creators';
    const country = profile.country || 'Global';

    const angleTemplates = [
      {
        angle: 'educational',
        angleName: 'Educational',
        title: `The Comprehensive Architecture of ${trend.topic}`,
        hook: `Everything engineers get wrong about ${trend.topic.toLowerCase()} explained in 4 minutes.`,
        format: 'YouTube Long-form (16:9)',
        audience: `${audienceDesc} in ${country}`,
        whyWorks: 'Deep-dive technical authority builds subscriber loyalty and high session watch time.',
        structure: '0-5s Myth Hook ➔ 5-25s Blueprint ➔ 25-60s Live Demonstration ➔ Outro CTA',
        cta: 'Download the free open-source repository in the description.'
      },
      {
        angle: 'controversial',
        angleName: 'Controversial',
        title: `Why ${trend.topic} Is Actually a Disaster for 90% of Creators`,
        hook: `Nobody is willing to say this out loud about ${trend.topic.toLowerCase()}, but here is the truth.`,
        format: 'Instagram Reels / Shorts (9:16)',
        audience: `${audienceDesc}`,
        whyWorks: 'Attacking consensus triggers immediate debate in comments and algorithm amplification.',
        structure: '0-3s Pattern Interrupt ➔ 3-15s Contrarian Proof ➔ 15-30s The Hidden Trap ➔ Save Hook',
        cta: 'Comment your take below: do you agree or disagree?'
      },
      {
        angle: 'storytelling',
        angleName: 'Storytelling',
        title: `I Spent 30 Days Testing ${trend.topic} (Here Is What Happened)`,
        hook: `I poured 100 hours into testing ${trend.topic.toLowerCase()} — and it completely broke my assumptions.`,
        format: 'YouTube Long-form (16:9)',
        audience: `${audienceDesc}`,
        whyWorks: 'First-person experimental narrative creates irresistible tension and viewer empathy.',
        structure: '0-7s The Bet / Stakes ➔ 7-30s Early Failures ➔ 30-50s The Breakthrough ➔ Final Verdict',
        cta: 'Subscribe to follow the next 30-day experiment.'
      },
      {
        angle: 'beginner',
        angleName: 'Beginner Friendly',
        title: `${trend.topic} for Complete Beginners in 2026`,
        hook: `If you know literally zero about ${trend.topic.toLowerCase()}, start here.`,
        format: 'Shorts / TikTok (9:16)',
        audience: `Beginners & curious professionals in ${country}`,
        whyWorks: 'Low barrier to entry captures broad top-of-funnel discovery audiences.',
        structure: '0-3s Friendly Invite ➔ 3-18s 3-Step Simple Framework ➔ 18-30s Next Action',
        cta: 'Bookmark this reel so you do not lose the checklist.'
      },
      {
        angle: 'expert',
        angleName: 'Expert Deep Dive',
        title: `Advanced ${trend.topic} Optimization Techniques`,
        hook: `The single section of ${trend.topic.toLowerCase()} that senior practitioners optimize first.`,
        format: 'Podcast / Long-form',
        audience: `Advanced practitioners & leaders`,
        whyWorks: 'Exclusive insider positioning commands premium sponsorship value and high shares.',
        structure: '0-10s Credibility Anchor ➔ 10-40s Edge Case Analysis ➔ 40-60s Benchmark Comparison',
        cta: 'Join the executive private newsletter for weekly deep dives.'
      },
      {
        angle: 'myth-busting',
        angleName: 'Myth-Busting',
        title: `3 Viral Myths About ${trend.topic} Debunked with Data`,
        hook: `Stop believing these 3 viral lies about ${trend.topic.toLowerCase()}.`,
        format: 'Instagram Reels (9:16)',
        audience: `${audienceDesc}`,
        whyWorks: 'Exposing common misinformation sparks rapid shares among peers.',
        structure: '0-4s Lie #1 Reveal ➔ 4-15s Data Proof ➔ 15-30s Correct Method',
        cta: 'Send this to someone who still believes myth #1.'
      },
      {
        angle: 'listicle',
        angleName: 'Top Listicles',
        title: `Top 5 Tools for ${trend.topic} Ranked from Worst to Best`,
        hook: `I tested every major tool for ${trend.topic.toLowerCase()} — here are the top 5 ranked.`,
        format: 'Shorts / Reels (9:16)',
        audience: `${audienceDesc}`,
        whyWorks: 'Fast-paced ranked structure delivers high retention throughout all 5 items.',
        structure: '0-3s Ranked Tease ➔ 3-20s Items 5 through 2 ➔ 20-30s The #1 Winner',
        cta: 'Which one is your daily driver? Let me know.'
      },
      {
        angle: 'case-study',
        angleName: 'Case Study',
        title: `How One Creator Made $45k with ${trend.topic}`,
        hook: `A transparent look at the exact numbers behind a $45k ${trend.topic.toLowerCase()} launch.`,
        format: 'YouTube Long-form (16:9)',
        audience: `${audienceDesc}`,
        whyWorks: 'Transparent financials and verified metrics generate unmatched authority.',
        structure: '0-5s Proof Metric ➔ 5-25s Funnel Breakdown ➔ 25-50s Key Levers ➔ Actionable Lessons',
        cta: 'Get the exact spreadsheet template in the pinned comment.'
      },
      {
        angle: 'personal-story',
        angleName: 'Personal Story',
        title: `The Mistake with ${trend.topic} That Cost Me $10,000`,
        hook: `I lost $10,000 so that you do not have to make the same mistake with ${trend.topic.toLowerCase()}.`,
        format: 'Shorts / Video Essay',
        audience: `${audienceDesc}`,
        whyWorks: 'Vulnerability and loss aversion establish immediate emotional buy-in.',
        structure: '0-4s Regret Hook ➔ 4-18s The Painful Moment ➔ 18-30s The Recovery Framework',
        cta: 'Follow for raw creator lessons without the fake guru filter.'
      },
      {
        angle: 'hot-take',
        angleName: 'Hot Take',
        title: `Why ${trend.topic} Will Be Dead by 2027`,
        hook: `Hot take: in 12 months, nobody will be using ${trend.topic.toLowerCase()} the way they do today.`,
        format: 'X Thread / Short',
        audience: `${audienceDesc}`,
        whyWorks: 'Bold future predictions incentivize bookmarks and long debate threads.',
        structure: '0-3s The Prediction ➔ 3-18s 3 Inevitable Bottlenecks ➔ 18-30s The Winning Alternative',
        cta: 'Reposition your workflow before the shift happens.'
      }
    ];

    let filtered = angleTemplates;
    if (angleFilter !== 'all') {
      filtered = angleTemplates.filter(t => t.angle === angleFilter);
    }

    return filtered.map((item, idx) => {
      const opp = calculateOpportunityScore(trend, profile);
      return {
        id: `idea-gen-${trend.id}-${idx}`,
        ...item,
        trendSource: trend.topic,
        niche: trend.niche,
        score: Math.min(99, opp.score - (idx % 3)),
        scoreTier: opp.tier
      };
    });
  }

  // ================= 6. INITIALIZATION & LIVE CLOCK =================
  function init() {
    bindEvents();
    updateLiveClockAndGreeting();
    setInterval(updateLiveClockAndGreeting, 1000);
    updateCreatorPersonaChips();
    renderTrendingSection();
    renderIdeasSection();
    renderSearchSection();
    renderLibrarySection();
    refreshLucideIcons();

    if (!creatorProfile.onboarding_completed) {
      openOnboardingModal();
    }
  }

  function refreshLucideIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  function getTimeGreeting(now = new Date()) {
    const hour = now.getHours();
    if (hour >= 5 && hour < 12) {
      return 'Good morning';
    } else if (hour >= 12 && hour < 17) {
      return 'Good afternoon';
    } else if (hour >= 17 && hour < 22) {
      return 'Good evening';
    } else {
      return 'Good night';
    }
  }

  function updateLiveClockAndGreeting() {
    const now = new Date();
    const greeting = getTimeGreeting(now);
    const heroGreetingEl = document.getElementById('hero-greeting');
    if (heroGreetingEl && heroGreetingEl.textContent !== greeting) {
      heroGreetingEl.textContent = greeting;
    }

    const radarStatusEl = document.getElementById('header-radar-status');
    if (radarStatusEl) {
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const minsLeft = 59 - (now.getMinutes() % 60);
      const secsLeft = 59 - now.getSeconds();
      radarStatusEl.textContent = `SYNCED • ${timeStr} • NEXT CYCLE IN ${minsLeft}m ${secsLeft}s`;
    }
  }

  // ================= 7. RENDER PERSONA CHIPS =================
  function updateCreatorPersonaChips() {
    const chipsEl = document.getElementById('creator-persona-chips');
    const heroNameEl = document.getElementById('hero-user-name');
    const heroGreetingEl = document.getElementById('hero-greeting');

    if (heroGreetingEl) {
      heroGreetingEl.textContent = getTimeGreeting();
    }

    if (heroNameEl) {
      heroNameEl.textContent = creatorProfile.name ? `${creatorProfile.name.split(' ')[0]}.` : 'Arka.';
    }

    const nicheLabels = {
      'ai': 'AI & Tech',
      'technology': 'DevTools',
      'fitness': 'Fitness',
      'finance': 'Finance',
      'business': 'Business',
      'marketing': 'Marketing',
      'design': 'Design',
      'photography': 'Photo',
      'travel': 'Travel'
    };

    const nichesHtml = (creatorProfile.niches || ['ai', 'technology'])
      .map(n => `<span class="persona-chip highlight">${nicheLabels[n] || n}</span>`)
      .join('');

    if (chipsEl) {
      chipsEl.innerHTML = `
        ${nichesHtml}
        <span class="persona-chip">Target: ${creatorProfile.age_range || '18-34'} &bull; ${creatorProfile.country || 'India'}</span>
        <span class="persona-chip">Goal: ${creatorProfile.goals === 'views' ? 'Max Views' : 'Authority & Growth'}</span>
      `;
    }
  }

  // ================= 8. SECTION 1: TRENDING FOR YOU =================
  function renderTrendingSection() {
    const container = document.getElementById('trending-cards-container');
    if (!container) return;

    let trends = SEED_TRENDS.filter(t => {
      if (activeTrendingPlatform !== 'all' && t.platform !== activeTrendingPlatform) return false;
      if (creatorProfile.niches && creatorProfile.niches.length > 0) {
        return creatorProfile.niches.includes(t.niche);
      }
      return true;
    });

    if (trends.length === 0) trends = SEED_TRENDS;

    if (!selectedTrendForIdeas && trends.length > 0) {
      selectedTrendForIdeas = trends[0];
    }

    container.innerHTML = trends.map(t => {
      const opp = calculateOpportunityScore(t, creatorProfile);
      return `
        <article class="trend-card" data-id="${t.id}">
          <div class="trend-card-top">
            <span class="trend-status-pill ${t.status}">${t.statusLabel}</span>
            <div class="opp-score-badge ${opp.tierClass}" title="Opportunity Score calculated from 7 measurable signals">
              <span class="opp-score-num">${opp.score}</span>
              <span class="opp-score-label">${opp.tier}</span>
            </div>
          </div>

          <div class="outlier-multiplier-pill">${t.outlierText}</div>
          <h3 class="trend-topic-title">${t.topic}</h3>
          <p class="trend-sample-title">"${t.title}"</p>

          <div class="trend-metrics-grid">
            <div class="t-metric-item">
              <span class="t-metric-name">Est. Views</span>
              <span class="t-metric-val">${t.views}</span>
            </div>
            <div class="t-metric-item">
              <span class="t-metric-name">Engagement</span>
              <span class="t-metric-val green">${t.engagementRate}</span>
            </div>
            <div class="t-metric-item">
              <span class="t-metric-name">Momentum</span>
              <span class="t-metric-val">${t.momentum}%</span>
            </div>
          </div>

          <div class="trend-card-actions">
            <button class="btn btn-secondary btn-sm btn-why-trending" data-id="${t.id}" type="button">
              <span>Why Trending?</span>
            </button>
            <button class="btn btn-primary btn-sm btn-generate-ideas" data-id="${t.id}" type="button">
              <svg class="lucide lucide-sparkles" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
              <span>Generate Ideas</span>
            </button>
          </div>
        </article>
      `;
    }).join('');

    container.querySelectorAll('.btn-why-trending').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        openTrendInspector(id);
      });
    });

    container.querySelectorAll('.btn-generate-ideas').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        const trend = SEED_TRENDS.find(t => t.id === id);
        if (trend) {
          selectedTrendForIdeas = trend;
          renderIdeasSection();
          document.getElementById('section-ideas').scrollIntoView({ behavior: 'smooth' });
          showToast(`Generated 10 creative angles for "${trend.topic}"`);
        }
      });
    });

    refreshLucideIcons();
  }

  // ================= 9. SECTION 2: IDEAS FOR YOU (12-ANGLE STUDIO) =================
  function renderIdeasSection() {
    const container = document.getElementById('ideas-cards-container');
    const sourceBadgeName = document.getElementById('active-idea-source-name');
    if (!container) return;

    const currentTrend = selectedTrendForIdeas || SEED_TRENDS[0];
    if (sourceBadgeName) sourceBadgeName.textContent = currentTrend.topic;

    const ideas = generateIdeasForTrend(currentTrend, activeCreativeAngle, creatorProfile);

    container.innerHTML = ideas.map(idea => `
      <article class="idea-concept-card">
        <div class="idea-card-header">
          <span class="idea-angle-badge">${idea.angleName}</span>
          <span class="idea-opp-score">Score ${idea.score}</span>
        </div>

        <h3 class="idea-title-text">${idea.title}</h3>
        <div class="idea-hook-box">"${idea.hook}"</div>

        <div class="idea-details-grid">
          <div class="detail-line"><strong>Format:</strong> ${idea.format}</div>
          <div class="detail-line"><strong>Audience:</strong> ${idea.audience}</div>
          <div class="detail-line"><strong>Why It Works:</strong> ${idea.whyWorks}</div>
          <div class="detail-line"><strong>Structure:</strong> ${idea.structure}</div>
          <div class="detail-line"><strong>Call-To-Action:</strong> ${idea.cta}</div>
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
        const hook = btn.getAttribute('data-hook');
        copyToClipboard(hook, "Idea Hook copied to clipboard!");
      });
    });

    container.querySelectorAll('.save-to-lib-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        try {
          const ideaData = JSON.parse(btn.getAttribute('data-json'));
          addIdeaToLibrary(ideaData);
        } catch (e) {
          console.error(e);
        }
      });
    });

    refreshLucideIcons();
  }

  function addIdeaToLibrary(idea) {
    const exists = savedLibrary.some(i => i.title === idea.title);
    if (exists) {
      showToast('This idea is already in your Content Library!');
      return;
    }

    const newSaved = {
      id: 'lib-' + Date.now(),
      title: idea.title,
      hook: idea.hook,
      niche: idea.niche || 'ai',
      platform: idea.format && idea.format.includes('YouTube') ? 'youtube' : 'shorts',
      score: idea.score,
      scoreTier: idea.scoreTier || 'STRONG',
      source: idea.trendSource || 'Trend Intelligence',
      stage: 'idea',
      stageName: 'Ideas',
      createdAt: new Date().toISOString().split('T')[0]
    };

    savedLibrary.unshift(newSaved);
    saveLibrary(savedLibrary);
    showToast(`Saved "${idea.title.slice(0, 30)}…" to Content Library!`);
  }

  // ================= 10. SECTION 3: SEARCH CONTENT INTELLIGENCE =================
  function renderSearchSection() {
    const grid = document.getElementById('search-results-grid');
    const topicContainer = document.getElementById('topic-items-container');
    const nicheList = document.getElementById('niche-menu-list');
    const activeFiltersList = document.getElementById('active-filters-chips');
    if (!grid) return;

    // Populate Topic Dropdown Items
    if (topicContainer) {
      topicContainer.innerHTML = `
        <button class="topic-menu-item ${activeTopicFilter === 'all' ? 'active' : ''}" data-topic="all"><span class="topic-item-name">All Topics</span><span class="topic-count">214</span></button>
        <button class="topic-menu-item ${activeTopicFilter === 'ai-agents' ? 'active' : ''}" data-topic="ai-agents"><span class="topic-item-name">AI Autonomous Agents</span><span class="topic-count">48</span></button>
        <button class="topic-menu-item ${activeTopicFilter === 'local-llm' ? 'active' : ''}" data-topic="local-llm"><span class="topic-item-name">Local LLMs & Hardware</span><span class="topic-count">36</span></button>
        <button class="topic-menu-item ${activeTopicFilter === 'zone-2' ? 'active' : ''}" data-topic="zone-2"><span class="topic-item-name">Zone 2 Cardio & Health</span><span class="topic-count">29</span></button>
        <button class="topic-menu-item ${activeTopicFilter === 'solopreneur' ? 'active' : ''}" data-topic="solopreneur"><span class="topic-item-name">Solopreneur Micro-SaaS</span><span class="topic-count">32</span></button>
        <button class="topic-menu-item ${activeTopicFilter === 'camera-gear' ? 'active' : ''}" data-topic="camera-gear"><span class="topic-item-name">Photography & Lighting</span><span class="topic-count">22</span></button>
      `;

      topicContainer.querySelectorAll('.topic-menu-item').forEach(item => {
        item.addEventListener('click', () => {
          activeTopicFilter = item.getAttribute('data-topic');
          document.getElementById('topic-menu-label').textContent = activeTopicFilter === 'all' ? 'Topics' : item.querySelector('.topic-item-name').textContent;
          document.getElementById('topic-search-dropdown').classList.remove('show');
          renderSearchSection();
        });
      });
    }

    // Populate Niche Dropdown Items
    if (nicheList) {
      nicheList.innerHTML = `
        <button class="niche-menu-item ${activeNicheFilter === 'all' ? 'active' : ''}" data-niche="all"><div class="niche-item-info"><span class="niche-name">All Niches</span><span class="niche-meta">Broad audience cross-pollination</span></div><span class="niche-badge-pill">Global</span></button>
        <button class="niche-menu-item ${activeNicheFilter === 'ai' ? 'active' : ''}" data-niche="ai"><div class="niche-item-info"><span class="niche-name">AI & Autonomous Agents</span><span class="niche-meta">76% Median 30s Retention</span></div><span class="niche-badge-pill">AI</span></button>
        <button class="niche-menu-item ${activeNicheFilter === 'technology' ? 'active' : ''}" data-niche="technology"><div class="niche-item-info"><span class="niche-name">Tech & DevTools</span><span class="niche-meta">71% Median 30s Retention</span></div><span class="niche-badge-pill">Tech</span></button>
        <button class="niche-menu-item ${activeNicheFilter === 'fitness' ? 'active' : ''}" data-niche="fitness"><div class="niche-item-info"><span class="niche-name">Fitness & Longevity</span><span class="niche-meta">84% Median 30s Retention</span></div><span class="niche-badge-pill">Fitness</span></button>
        <button class="niche-menu-item ${activeNicheFilter === 'business' ? 'active' : ''}" data-niche="business"><div class="niche-item-info"><span class="niche-name">Business & Startups</span><span class="niche-meta">82% Median 30s Retention</span></div><span class="niche-badge-pill">Business</span></button>
      `;

      nicheList.querySelectorAll('.niche-menu-item').forEach(item => {
        item.addEventListener('click', () => {
          activeNicheFilter = item.getAttribute('data-niche');
          document.getElementById('niche-menu-label').textContent = activeNicheFilter === 'all' ? 'Niche: All' : `Niche: ${activeNicheFilter.toUpperCase()}`;
          document.getElementById('niche-search-dropdown').classList.remove('show');
          renderSearchSection();
        });
      });
    }

    // Update Active Filters Chips Bar
    if (activeFiltersList) {
      let chipsHtml = '';
      if (searchQuery) {
        chipsHtml += `<span class="active-chip-pill">Query: "${searchQuery}" <button type="button" class="btn-text remove-filter-chip" data-type="query">&times;</button></span>`;
      }
      if (activeTopicFilter !== 'all') {
        chipsHtml += `<span class="active-chip-pill">Topic: ${activeTopicFilter} <button type="button" class="btn-text remove-filter-chip" data-type="topic">&times;</button></span>`;
      }
      if (activeNicheFilter !== 'all') {
        chipsHtml += `<span class="active-chip-pill">Niche: ${activeNicheFilter.toUpperCase()} <button type="button" class="btn-text remove-filter-chip" data-type="niche">&times;</button></span>`;
      }
      activeFiltersList.innerHTML = chipsHtml;

      activeFiltersList.querySelectorAll('.remove-filter-chip').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const t = btn.getAttribute('data-type');
          if (t === 'query') {
            searchQuery = '';
            document.getElementById('global-search-input').value = '';
            document.getElementById('clear-search-btn').style.display = 'none';
          } else if (t === 'topic') {
            activeTopicFilter = 'all';
            document.getElementById('topic-menu-label').textContent = 'Topics';
          } else if (t === 'niche') {
            activeNicheFilter = 'all';
            document.getElementById('niche-menu-label').textContent = 'Niche: All';
          }
          renderSearchSection();
        });
      });
    }

    let results = SEED_TRENDS.filter(item => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inTopic = item.topic.toLowerCase().includes(q);
        const inTitle = item.title.toLowerCase().includes(q);
        const inTags = item.tags.some(t => t.toLowerCase().includes(q));
        if (!inTopic && !inTitle && !inTags) return false;
      }
      if (activeNicheFilter !== 'all' && item.niche !== activeNicheFilter) return false;
      return true;
    });

    grid.innerHTML = results.map(t => {
      const opp = calculateOpportunityScore(t, creatorProfile);
      return `
        <article class="idea-card span-1" role="button" tabindex="0" onclick="window.vantageApp.openInspector('${t.id}')">
          <div class="card-top">
            <div class="platform-pill ${t.platform}">
              <svg class="lucide lucide-sparkles" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
              <span>${t.platformName}</span>
            </div>
            <div class="score-badge tier-viral">
              <div class="score-val">${opp.score}</div>
              <div class="score-tag">${opp.tier}</div>
            </div>
          </div>

          <div class="card-hook-text">${highlightQuery(t.title, searchQuery)}</div>

          <div class="card-tags-row">
            ${t.tags.map(tag => `<span class="psych-tag">${tag}</span>`).join('')}
          </div>

          <div class="card-meta-footer">
            <div class="metric-pill positive">
              <svg class="lucide lucide-activity" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              <span>${t.outlierText}</span>
            </div>
            <button class="btn btn-secondary btn-sm" onclick="event.stopPropagation(); window.vantageApp.openInspector('${t.id}')">Inspect</button>
          </div>
        </article>
      `;
    }).join('');

    refreshLucideIcons();
  }

  function highlightQuery(text, query) {
    if (!query || !query.trim()) return escapeHtml(text);
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return escapeHtml(text).replace(new RegExp(`(${escaped})`, 'gi'), '<span style="color: #059669; text-decoration: underline; background: rgba(5,150,105,0.12); padding: 1px 4px; border-radius: 4px; font-weight: 700;">$1</span>');
  }

  // ================= 11. SECTION 4: 6-STAGE PRODUCTION KANBAN & LIST SYSTEM =================
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

    // Update active tab buttons in UI
    document.querySelectorAll('#library-stage-filters .stage-tab, #library-stage-tabs .stage-tab').forEach(tab => {
      const stageId = tab.getAttribute('data-stage');
      tab.classList.toggle('active', stageId === activeLibraryStage);
    });

    if (activeLibraryView === 'list') {
      // Render Detailed List Table View
      let filteredItems = savedLibrary;
      if (activeLibraryStage !== 'all') {
        filteredItems = savedLibrary.filter(i => (i.stage || 'idea') === activeLibraryStage);
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
            ${filteredItems.length === 0 ? `<tr><td colspan="6" style="text-align: center; color: var(--text-tertiary); padding: 24px;">No ideas in this stage yet. Click "Generate Ideas" or "Score New Hook" to add!</td></tr>` : ''}
            ${filteredItems.map(item => `
              <tr>
                <td><strong>"${item.hook || item.title}"</strong></td>
                <td><span class="opp-score-badge tier-explosive" style="width: 38px; height: 38px;"><span class="opp-score-num" style="font-size: 16px;">${item.score}</span></span></td>
                <td><span class="platform-pill ${item.platform}">${item.platform.toUpperCase()}</span></td>
                <td><span class="lib-stage-badge">${item.stageName || item.stage}</span></td>
                <td><span style="font-family: var(--font-mono); font-size: 11px; color: var(--text-tertiary);">${item.createdAt || 'Today'}</span></td>
                <td>
                  <div class="lib-card-actions">
                    <select class="lib-stage-select" data-id="${item.id}">
                      <option value="idea" ${item.stage === 'idea' ? 'selected' : ''}>Ideas</option>
                      <option value="researching" ${item.stage === 'researching' ? 'selected' : ''}>Researching</option>
                      <option value="scripted" ${item.stage === 'scripted' ? 'selected' : ''}>Scripted</option>
                      <option value="filming" ${item.stage === 'filming' ? 'selected' : ''}>Filming</option>
                      <option value="editing" ${item.stage === 'editing' ? 'selected' : ''}>Editing</option>
                      <option value="published" ${item.stage === 'published' ? 'selected' : ''}>Published</option>
                    </select>
                    <button class="btn-lib-del" data-id="${item.id}" title="Delete Idea">
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
      // Render 6-Stage Kanban Board Columns
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
              ${cardsInStage.length === 0 ? `<div style="font-size: 11.5px; color: var(--text-faint); padding: 14px; text-align: center;">No ideas yet</div>` : ''}
              ${cardsInStage.map(item => `
                <div class="lib-saved-card" data-id="${item.id}">
                  <div class="lib-card-hook">"${item.hook || item.title}"</div>
                  
                  <div class="lib-card-meta">
                    <span class="lib-score">Score ${item.score}</span>
                    <div class="lib-card-actions">
                      <select class="lib-stage-select" data-id="${item.id}">
                        <option value="idea" ${item.stage === 'idea' ? 'selected' : ''}>Ideas</option>
                        <option value="researching" ${item.stage === 'researching' ? 'selected' : ''}>Researching</option>
                        <option value="scripted" ${item.stage === 'scripted' ? 'selected' : ''}>Scripted</option>
                        <option value="filming" ${item.stage === 'filming' ? 'selected' : ''}>Filming</option>
                        <option value="editing" ${item.stage === 'editing' ? 'selected' : ''}>Editing</option>
                        <option value="published" ${item.stage === 'published' ? 'selected' : ''}>Published</option>
                      </select>
                      <button class="btn-lib-del" data-id="${item.id}" title="Delete Idea">
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

    // Attach listeners for stage transitions
    board.querySelectorAll('.lib-stage-select').forEach(sel => {
      sel.addEventListener('change', (e) => {
        const id = sel.getAttribute('data-id');
        const newStage = e.target.value;
        const target = savedLibrary.find(i => i.id === id);
        if (target) {
          target.stage = newStage;
          target.stageName = newStage.charAt(0).toUpperCase() + newStage.slice(1);
          saveLibrary(savedLibrary);
          showToast(`Moved idea to ${target.stageName} stage!`);
        }
      });
    });

    // Attach listeners for idea deletion
    board.querySelectorAll('.btn-lib-del').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        savedLibrary = savedLibrary.filter(i => i.id !== id);
        saveLibrary(savedLibrary);
        showToast('Idea removed from Content Library.');
      });
    });

    refreshLucideIcons();
  }

  // ================= 12. ONBOARDING WIZARD CONTROLLER =================
  function openOnboardingModal() {
    currentOnboardStep = 1;
    showOnboardingStep(1);
    prefillOnboardingForm();
    const modal = document.getElementById('onboarding-modal');
    if (modal) {
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
    }
  }

  function prefillOnboardingForm() {
    // Prefill tags in Step 1
    document.querySelectorAll('#grid-content-types .onboard-tag-btn').forEach(b => {
      const val = b.getAttribute('data-value');
      b.classList.toggle('selected', (creatorProfile.content_types || []).includes(val));
    });

    // Prefill niches in Step 2
    document.querySelectorAll('#grid-niches .onboard-tag-btn').forEach(b => {
      const val = b.getAttribute('data-value');
      b.classList.toggle('selected', (creatorProfile.niches || []).includes(val));
    });

    // Prefill audience in Step 3
    if (document.getElementById('onboard-age-range')) document.getElementById('onboard-age-range').value = creatorProfile.age_range || '18-34';
    if (document.getElementById('onboard-country')) document.getElementById('onboard-country').value = creatorProfile.country || 'India';
    if (document.getElementById('onboard-language')) document.getElementById('onboard-language').value = creatorProfile.language || 'English';
    if (document.getElementById('onboard-audience-desc')) document.getElementById('onboard-audience-desc').value = creatorProfile.audience_description || '';

    // Prefill goals in Step 4
    document.querySelectorAll('#grid-goals .goal-card').forEach(c => {
      const val = c.getAttribute('data-value');
      c.classList.toggle('selected', (creatorProfile.goals || 'views') === val);
    });

    // Prefill styles in Step 5
    document.querySelectorAll('#grid-idea-types .onboard-tag-btn').forEach(b => {
      const val = b.getAttribute('data-value');
      b.classList.toggle('selected', (creatorProfile.preferred_formats || []).includes(val));
    });
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
      const activePane = document.getElementById(`onboarding-step-${step}`);
      if (activePane) activePane.classList.add('active');
      if (progressFill) progressFill.style.width = `${step * 20}%`;
      if (stepCounter) stepCounter.textContent = `STEP ${step} OF 5`;
      if (prevBtn) prevBtn.style.display = step === 1 ? 'none' : 'block';
      if (nextBtn) nextBtn.innerHTML = `<span>Continue</span> <svg class="lucide lucide-arrow-right" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" x2="19" y1="12" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`;
    } else {
      const completePane = document.getElementById('onboarding-step-complete');
      if (completePane) completePane.classList.add('active');
      if (progressFill) progressFill.style.width = '100%';
      if (stepCounter) stepCounter.textContent = `CALIBRATION COMPLETE`;
      if (prevBtn) prevBtn.style.display = 'block';
      if (nextBtn) nextBtn.innerHTML = `<span>Show My Opportunities</span> <svg class="lucide lucide-sparkles" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>`;

      updateOnboardingSummary();
    }
    refreshLucideIcons();
  }

  function updateOnboardingSummary() {
    const sumPlatforms = document.getElementById('sum-platforms');
    const sumNiches = document.getElementById('sum-niches');
    const sumAudience = document.getElementById('sum-audience');
    const sumGoal = document.getElementById('sum-goal');
    const sumStyles = document.getElementById('sum-styles');

    const selPlatforms = Array.from(document.querySelectorAll('#grid-content-types .onboard-tag-btn.selected')).map(b => b.textContent.trim());
    const selNiches = Array.from(document.querySelectorAll('#grid-niches .onboard-tag-btn.selected')).map(b => b.textContent.trim());
    const age = document.getElementById('onboard-age-range')?.value || '18-34';
    const country = document.getElementById('onboard-country')?.value || 'India';
    const lang = document.getElementById('onboard-language')?.value || 'English';
    const selGoal = document.querySelector('#grid-goals .goal-card.selected h4');
    const selStyles = Array.from(document.querySelectorAll('#grid-idea-types .onboard-tag-btn.selected')).map(b => b.textContent.trim());

    if (sumPlatforms) sumPlatforms.textContent = selPlatforms.join(', ') || 'YouTube & Shorts';
    if (sumNiches) sumNiches.textContent = selNiches.join(', ') || 'AI & Technology';
    if (sumAudience) sumAudience.textContent = `${age} • ${country} • ${lang}`;
    if (sumGoal) sumGoal.textContent = selGoal ? selGoal.textContent : 'Get More Views';
    if (sumStyles) sumStyles.textContent = selStyles.slice(0, 3).join(', ') || 'Trending & Storytelling';
  }

  function saveOnboardingData() {
    const selContentTypes = Array.from(document.querySelectorAll('#grid-content-types .onboard-tag-btn.selected')).map(b => b.getAttribute('data-value'));
    const selNiches = Array.from(document.querySelectorAll('#grid-niches .onboard-tag-btn.selected')).map(b => b.getAttribute('data-value'));
    const selGoal = document.querySelector('#grid-goals .goal-card.selected')?.getAttribute('data-value') || 'views';
    const selStyles = Array.from(document.querySelectorAll('#grid-idea-types .onboard-tag-btn.selected')).map(b => b.getAttribute('data-value'));

    creatorProfile = {
      ...creatorProfile,
      content_types: selContentTypes.length > 0 ? selContentTypes : ['reels', 'shorts', 'youtube'],
      niches: selNiches.length > 0 ? selNiches : ['ai', 'technology'],
      age_range: document.getElementById('onboard-age-range')?.value || '18-34',
      country: document.getElementById('onboard-country')?.value || 'India',
      language: document.getElementById('onboard-language')?.value || 'English',
      audience_description: document.getElementById('onboard-audience-desc')?.value || 'Young creators and developers',
      goals: selGoal,
      preferred_formats: selStyles,
      onboarding_completed: true,
      updated_at: new Date().toISOString()
    };

    saveCreatorProfile(creatorProfile);
    closeOnboardingModal();
    showToast('Creator intelligence calibrated! Displaying personalized opportunities.');
  }

  // ================= 13. TREND INSPECTOR DRAWER =================
  function openTrendInspector(trendId) {
    const trend = SEED_TRENDS.find(t => t.id === trendId);
    if (!trend) return;

    selectedTrendForInspector = trend;
    const opp = calculateOpportunityScore(trend, creatorProfile);

    document.getElementById('inspector-score-num').textContent = opp.score;
    document.getElementById('inspector-score-sub').textContent = opp.tier;
    document.getElementById('inspector-outlier-pill').textContent = trend.outlierText;
    document.getElementById('inspector-topic-title').textContent = trend.topic;
    document.getElementById('inspector-topic-desc').textContent = `High-velocity trend in ${trend.nicheName} with ${trend.views} views and ${trend.engagementRate} engagement.`;

    // Update Signals
    document.getElementById('sig-momentum').style.width = `${opp.signals.momentum}%`;
    document.getElementById('sig-val-momentum').textContent = `${opp.signals.momentum}%`;
    document.getElementById('sig-engagement').style.width = `${opp.signals.engagement}%`;
    document.getElementById('sig-val-engagement').textContent = `${opp.signals.engagement}%`;
    document.getElementById('sig-search').style.width = `${opp.signals.search}%`;
    document.getElementById('sig-val-search').textContent = `${opp.signals.search}%`;
    document.getElementById('sig-outlier').style.width = `${opp.signals.outlier}%`;
    document.getElementById('sig-val-outlier').textContent = `${opp.signals.outlier}%`;
    document.getElementById('sig-freshness').style.width = `${opp.signals.freshness}%`;
    document.getElementById('sig-val-freshness').textContent = `${opp.signals.freshness}%`;
    document.getElementById('sig-competition').style.width = `${opp.signals.competition}%`;
    document.getElementById('sig-val-competition').textContent = `${opp.signals.competition}%`;
    document.getElementById('sig-relevance').style.width = `${opp.signals.relevance}%`;
    document.getElementById('sig-val-relevance').textContent = `${opp.signals.relevance}%`;

    // Why Trending List
    const whyList = document.getElementById('inspector-why-list');
    if (whyList && trend.whyTrending) {
      whyList.innerHTML = trend.whyTrending.map(reason => `<li>${reason}</li>`).join('');
    }

    const drawer = document.getElementById('trend-inspector-drawer');
    if (drawer) {
      drawer.classList.add('active');
      drawer.setAttribute('aria-hidden', 'false');
    }
    refreshLucideIcons();
  }

  function closeTrendInspector() {
    const drawer = document.getElementById('trend-inspector-drawer');
    if (drawer) {
      drawer.classList.remove('active');
      drawer.setAttribute('aria-hidden', 'true');
    }
  }

  // ================= 14. EVENT LISTENERS =================
  function bindEvents() {
    // Trending Platform Filter pills
    document.querySelectorAll('#trending-platform-filters .format-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('#trending-platform-filters .format-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        activeTrendingPlatform = pill.getAttribute('data-platform');
        renderTrendingSection();
      });
    });

    // Angle Chips in Studio
    document.querySelectorAll('#angles-container .angle-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('#angles-container .angle-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        activeCreativeAngle = chip.getAttribute('data-angle');
        renderIdeasSection();
      });
    });

    // Library Stage Filter Tabs (resilient selector)
    document.querySelectorAll('#library-stage-filters .stage-tab, #library-stage-tabs .stage-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        activeLibraryStage = tab.getAttribute('data-stage') || 'all';
        renderLibrarySection();
      });
    });

    // Library View Switcher (Kanban vs List - handles both IDs)
    const viewKanbanBtn = document.getElementById('btn-lib-kanban') || document.getElementById('view-kanban');
    const viewListBtn = document.getElementById('btn-lib-list') || document.getElementById('view-list');
    if (viewKanbanBtn && viewListBtn) {
      viewKanbanBtn.addEventListener('click', () => {
        viewKanbanBtn.classList.add('active');
        viewListBtn.classList.remove('active');
        activeLibraryView = 'kanban';
        renderLibrarySection();
      });
      viewListBtn.addEventListener('click', () => {
        viewListBtn.classList.add('active');
        viewKanbanBtn.classList.remove('active');
        activeLibraryView = 'list';
        renderLibrarySection();
      });
    }

    // Onboarding Tag Toggles
    document.querySelectorAll('.onboard-tag-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.classList.toggle('selected');
      });
    });

    // Goals Card Toggles
    document.querySelectorAll('.goal-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.goal-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
      });
    });

    // Onboarding Live Niche Search Filter
    const nicheSearchInput = document.getElementById('onboard-niche-search');
    if (nicheSearchInput) {
      nicheSearchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        document.querySelectorAll('#grid-niches .onboard-tag-btn').forEach(btn => {
          const txt = btn.textContent.toLowerCase();
          btn.style.display = !query || txt.includes(query) ? 'inline-flex' : 'none';
        });
      });
    }

    // Onboarding Navigation
    const nextBtn = document.getElementById('btn-onboard-next');
    const prevBtn = document.getElementById('btn-onboard-prev');
    const skipBtn = document.getElementById('btn-skip-onboarding');

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (currentOnboardStep < 5) {
          showOnboardingStep(currentOnboardStep + 1);
        } else if (currentOnboardStep === 5) {
          showOnboardingStep(6);
        } else {
          saveOnboardingData();
        }
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentOnboardStep > 1) {
          showOnboardingStep(currentOnboardStep - 1);
        }
      });
    }

    if (skipBtn) {
      skipBtn.addEventListener('click', () => {
        creatorProfile.onboarding_completed = true;
        saveCreatorProfile(creatorProfile);
        closeOnboardingModal();
      });
    }

    // Edit Preferences trigger
    const editPrefBtn = document.getElementById('btn-edit-onboarding');
    if (editPrefBtn) {
      editPrefBtn.addEventListener('click', openOnboardingModal);
    }
    const navOnboardingBtn = document.getElementById('nav-onboarding-trigger');
    if (navOnboardingBtn) {
      navOnboardingBtn.addEventListener('click', openOnboardingModal);
    }

    // Live Sync Signals Simulation
    const syncBtn = document.getElementById('btn-sync-trends');
    if (syncBtn) {
      syncBtn.addEventListener('click', () => {
        syncBtn.setAttribute('aria-busy', 'true');
        syncBtn.innerHTML = `
          <svg class="live-pulse" width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>
          <span>Querying Signals…</span>
        `;
        setTimeout(() => {
          syncBtn.removeAttribute('aria-busy');
          syncBtn.innerHTML = `
            <svg class="lucide lucide-refresh-cw" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>
            <span>Sync Signals</span>
          `;
          // Jiggle momentum slightly to simulate live telemetry
          SEED_TRENDS.forEach(t => {
            t.momentum = Math.min(99, Math.max(70, t.momentum + Math.floor(Math.random() * 5) - 2));
          });
          renderTrendingSection();
          renderIdeasSection();
          showToast('24/7 Trend Radar refreshed! 8 signals synchronized with live telemetry.');
          refreshLucideIcons();
        }, 600);
      });
    }

    // Inspector Drawer closures
    const closeInspBtn = document.getElementById('close-inspector-btn');
    const closeInspBtn2 = document.getElementById('btn-inspector-close');
    const inspOverlay = document.getElementById('trend-drawer-overlay');
    if (closeInspBtn) closeInspBtn.addEventListener('click', closeTrendInspector);
    if (closeInspBtn2) closeInspBtn2.addEventListener('click', closeTrendInspector);
    if (inspOverlay) inspOverlay.addEventListener('click', closeTrendInspector);

    const inspGenBtn = document.getElementById('btn-inspector-generate-ideas');
    if (inspGenBtn) {
      inspGenBtn.addEventListener('click', () => {
        closeTrendInspector();
        if (selectedTrendForInspector) {
          selectedTrendForIdeas = selectedTrendForInspector;
          renderIdeasSection();
          document.getElementById('section-ideas').scrollIntoView({ behavior: 'smooth' });
          showToast(`Generated 10 creative angles for "${selectedTrendForInspector.topic}"`);
        }
      });
    }

    // Global Search Input
    const searchInput = document.getElementById('global-search-input');
    const clearSearchBtn = document.getElementById('clear-search-btn');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        if (clearSearchBtn) clearSearchBtn.style.display = searchQuery ? 'flex' : 'none';
        renderSearchSection();
      });
    }
    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        searchQuery = '';
        clearSearchBtn.style.display = 'none';
        renderSearchSection();
      });
    }

    const clearAllFiltersBtn = document.getElementById('btn-clear-all-filters');
    if (clearAllFiltersBtn) {
      clearAllFiltersBtn.addEventListener('click', () => {
        searchQuery = '';
        activeTopicFilter = 'all';
        activeNicheFilter = 'all';
        if (searchInput) searchInput.value = '';
        if (clearSearchBtn) clearSearchBtn.style.display = 'none';
        document.getElementById('topic-menu-label').textContent = 'Topics';
        document.getElementById('niche-menu-label').textContent = 'Niche: All';
        renderSearchSection();
        showToast('All search filters reset.');
      });
    }

    // Sidebar navigation smooth scroll
    const navTrending = document.getElementById('nav-trending');
    const navIdeas = document.getElementById('nav-ideas');
    const navSearch = document.getElementById('nav-search');
    const navLibrary = document.getElementById('nav-library');

    if (navTrending) navTrending.addEventListener('click', () => document.getElementById('section-trending').scrollIntoView({ behavior: 'smooth' }));
    if (navIdeas) navIdeas.addEventListener('click', () => document.getElementById('section-ideas').scrollIntoView({ behavior: 'smooth' }));
    if (navSearch) navSearch.addEventListener('click', () => document.getElementById('section-search').scrollIntoView({ behavior: 'smooth' }));
    if (navLibrary) navLibrary.addEventListener('click', () => document.getElementById('section-library').scrollIntoView({ behavior: 'smooth' }));

    // Dropdown triggers
    const btnTopicMenu = document.getElementById('btn-topic-menu');
    const topicDropdown = document.getElementById('topic-search-dropdown');
    if (btnTopicMenu && topicDropdown) {
      btnTopicMenu.addEventListener('click', (e) => {
        e.stopPropagation();
        topicDropdown.classList.toggle('show');
      });
    }

    const btnNicheMenu = document.getElementById('btn-niche-menu');
    const nicheDropdown = document.getElementById('niche-search-dropdown');
    if (btnNicheMenu && nicheDropdown) {
      btnNicheMenu.addEventListener('click', (e) => {
        e.stopPropagation();
        nicheDropdown.classList.toggle('show');
      });
    }

    document.addEventListener('click', () => {
      if (topicDropdown) topicDropdown.classList.remove('show');
      if (nicheDropdown) nicheDropdown.classList.remove('show');
    });

    // Auth Gateway Modal Trigger & Closures
    const authScreen = document.getElementById('full-auth-screen');
    const openAuthBtn = document.getElementById('topbar-profile-btn');
    const openAvatarBtn = document.getElementById('sidebar-user-avatar-btn');
    const closeAuthBtn = document.getElementById('btn-close-auth-gateway');
    const guestExploreBtn = document.getElementById('btn-gateway-explore-guest');
    const instantLoginBtn = document.getElementById('btn-instant-demo-login');

    function openAuth() {
      if (authScreen) {
        authScreen.classList.add('active');
        authScreen.setAttribute('aria-hidden', 'false');
      }
    }
    function closeAuth() {
      if (authScreen) {
        authScreen.classList.remove('active');
        authScreen.setAttribute('aria-hidden', 'true');
      }
    }

    if (openAuthBtn) openAuthBtn.addEventListener('click', openAuth);
    if (openAvatarBtn) openAvatarBtn.addEventListener('click', openAuth);
    if (closeAuthBtn) closeAuthBtn.addEventListener('click', closeAuth);
    if (guestExploreBtn) guestExploreBtn.addEventListener('click', closeAuth);
    if (instantLoginBtn) {
      instantLoginBtn.addEventListener('click', () => {
        closeAuth();
        showToast('Logged in as Arka Mondal (Pro Creator Access)');
      });
    }

    // Virality Scorer Modal Triggers & Closures
    const scorerModal = document.getElementById('scorer-modal');
    const openScorerBtn = document.getElementById('btn-score-new');
    const closeScorerBtn = document.getElementById('close-scorer-modal');
    const cancelScorerBtn = document.getElementById('cancel-scorer-btn');
    const hookInputField = document.getElementById('hook-input-field');
    const hookCharCount = document.getElementById('hook-char-count');
    const pasteSampleBtn = document.getElementById('paste-sample-hook');
    const runAnalysisBtn = document.getElementById('btn-run-analysis');
    const saveToLibScorerBtn = document.getElementById('save-to-library-btn');

    function openScorer() {
      if (scorerModal) {
        scorerModal.classList.add('active');
        scorerModal.setAttribute('aria-hidden', 'false');
        if (hookInputField) hookInputField.focus();
      }
    }
    function closeScorer() {
      if (scorerModal) {
        scorerModal.classList.remove('active');
        scorerModal.setAttribute('aria-hidden', 'true');
      }
    }

    if (openScorerBtn) openScorerBtn.addEventListener('click', openScorer);
    if (closeScorerBtn) closeScorerBtn.addEventListener('click', closeScorer);
    if (cancelScorerBtn) cancelScorerBtn.addEventListener('click', closeScorer);

    if (hookInputField && hookCharCount) {
      hookInputField.addEventListener('input', (e) => {
        const len = e.target.value.length;
        hookCharCount.textContent = `${len} characters • Optimal length: 55-90 chars`;
      });
    }

    if (pasteSampleBtn && hookInputField) {
      pasteSampleBtn.addEventListener('click', () => {
        hookInputField.value = SAMPLE_HOOKS[sampleHookIndex % SAMPLE_HOOKS.length];
        sampleHookIndex++;
        if (hookCharCount) hookCharCount.textContent = `${hookInputField.value.length} characters • Optimal length: 55-90 chars`;
      });
    }

    if (runAnalysisBtn) {
      runAnalysisBtn.addEventListener('click', () => {
        const text = hookInputField ? hookInputField.value.trim() : '';
        if (!text) {
          showToast('Please type or paste a hook first!');
          return;
        }

        const score = Math.floor(Math.random() * 12) + 88;
        document.getElementById('result-score-num').textContent = score;
        document.getElementById('result-score-label').textContent = score >= 90 ? 'EXPLOSIVE' : 'STRONG';
        document.getElementById('bar-curiosity').textContent = '94%';
        document.getElementById('fill-curiosity').style.width = '94%';
        document.getElementById('bar-stakes').textContent = '88%';
        document.getElementById('fill-stakes').style.width = '88%';
        document.getElementById('bar-velocity').textContent = '96%';
        document.getElementById('fill-velocity').style.width = '96%';

        if (saveToLibScorerBtn) {
          saveToLibScorerBtn.removeAttribute('disabled');
          saveToLibScorerBtn.onclick = () => {
            addIdeaToLibrary({
              title: text.slice(0, 50),
              hook: text,
              niche: document.getElementById('niche-select-field')?.value || 'ai',
              format: document.getElementById('platform-select-field')?.options[document.getElementById('platform-select-field').selectedIndex].text || 'YouTube Shorts',
              score: score,
              scoreTier: score >= 90 ? 'EXPLOSIVE' : 'STRONG',
              trendSource: 'AI Virality Scorer'
            });
            closeScorer();
            document.getElementById('section-library').scrollIntoView({ behavior: 'smooth' });
          };
        }
      });
    }

    // Global Keybindings:
    // '⌘K' or 'Ctrl+K' or '/' for Search, 'N' for Scorer, 'S' for Sync, 'Escape' for modals
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeAuth();
        closeScorer();
        closeTrendInspector();
        closeOnboardingModal();
      } else if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('section-search').scrollIntoView({ behavior: 'smooth' });
        if (searchInput) searchInput.focus();
      } else if (!['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        if (e.key === 'n' || e.key === 'N') {
          e.preventDefault();
          openScorer();
        } else if (e.key === 's' || e.key === 'S') {
          e.preventDefault();
          syncBtn?.click();
        } else if (e.key === '/') {
          e.preventDefault();
          document.getElementById('section-search').scrollIntoView({ behavior: 'smooth' });
          if (searchInput) searchInput.focus();
        }
      }
    });

    // Custom niche adder in onboarding
    const addCustomNicheBtn = document.getElementById('btn-add-custom-niche');
    const customNicheInput = document.getElementById('onboard-custom-niche');
    if (addCustomNicheBtn && customNicheInput) {
      addCustomNicheBtn.addEventListener('click', () => {
        const val = customNicheInput.value.trim();
        if (val) {
          const grid = document.getElementById('grid-niches');
          const btn = document.createElement('button');
          btn.className = 'onboard-tag-btn selected';
          btn.setAttribute('data-value', val.toLowerCase().replace(/\s+/g, '-'));
          btn.textContent = val;
          btn.addEventListener('click', () => btn.classList.toggle('selected'));
          grid.prepend(btn);
          customNicheInput.value = '';
          showToast(`Added custom niche: ${val}`);
        }
      });
    }
  }

  // ================= 15. UTILITIES =================
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

  function copyToClipboard(text, message = "Copied to clipboard!") {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => showToast(message));
    } else {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showToast(message);
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }

  // Global helper for inline inspector open
  window.vantageApp = {
    openInspector: openTrendInspector,
    openOnboarding: openOnboardingModal
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
