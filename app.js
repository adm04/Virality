/**
 * VANTAGE VIRALITY OS — INTERACTIVE CLIENT APPLICATION (TOPIC & NICHE SEARCH & AUTH EDITION)
 * Ultra-Modern SaaS Dashboard Logic, Topic Search Engine, Multi-Niche Filtering,
 * shadcn/ui Canvas Visualizations, and Zero-Backend Client Authentication System
 */

(function () {
  'use strict';

  // ================= 1. AUTHENTICATION & USER STATE =================
  const STORAGE_KEY_SESSION = 'vantage_user_session';

  const DEFAULT_USER = {
    id: 'user-arka-01',
    name: 'Arka Mondal',
    email: 'arkadeb.mondal@example.com',
    initials: 'AM',
    tier: 'PRO CREATOR TIER',
    tierShort: 'PRO',
    niche: 'tech-ai',
    calibrationsCount: 84,
    savedCount: 12,
    isLoggedIn: true
  };

  let currentUser = loadUserSession();
  let lastFocusedElement = null;

  // Chart.js Instances
  let velocityAreaChart = null;
  let platformDonutChart = null;
  let drawerRetentionChart = null;
  let drawerRadarChart = null;

  function loadUserSession() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SESSION);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
    return { ...DEFAULT_USER };
  }

  function saveUserSession(user) {
    currentUser = user;
    try {
      localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(user));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
    updateUIForAuth();
  }

  // ================= 2. CORE DATASET (WITH TOPIC & NICHE METADATA) =================
  const INITIAL_IDEAS = [
    {
      id: 'idea-1',
      platform: 'youtube',
      platformName: 'YouTube Long-form',
      niche: 'tech-ai',
      nicheName: 'Tech & AI',
      topic: 'ai-agents',
      topicName: 'AI & Autonomous Agents',
      score: 98,
      tier: 'tier-viral',
      hook: "I gave 3 AI agents $1,000 each and let them trade for 30 days — the results broke my model.",
      tags: ['#AIAgents', '#HighStakes', '#Experiment', '#Finance'],
      retentionLift: '+340% 30s lift',
      retentionNum: 340,
      velocity: 'Top 0.5% Velocity',
      isHero: true,
      saved: true,
      createdDaysAgo: 1,
      psychValues: [99, 95, 92, 98, 96],
      psychTriggers: [
        { name: 'Curiosity Gap', score: '99%' },
        { name: 'High Stakes / Capital', score: '95%' },
        { name: 'Contrast / Conflict', score: '92%' },
        { name: 'Novelty Bias', score: '98%' }
      ],
      thumbnailConcept: 'Split screen: Left side showing red trading model crash graph; right side showing 3 AI terminals with green profit surge.',
      retentionCurve: [96, 92, 88, 85, 81, 78, 75],
      explanation: 'Unpredictable financial experiment combined with autonomous AI creates intense curiosity and tension in the first 5 seconds.'
    },
    {
      id: 'idea-2',
      platform: 'shorts',
      platformName: 'Instagram Reels',
      niche: 'business-money',
      nicheName: 'Finance & Business',
      topic: 'freelance-career',
      topicName: 'Freelance & Career',
      score: 91,
      tier: 'tier-viral',
      hook: "Nobody tells you this before your first $10k client project.",
      tags: ['#Career', '#Contrarian', '#Freelance'],
      retentionLift: '+215% CTR',
      retentionNum: 215,
      velocity: 'Breakout Tier',
      isHero: false,
      saved: false,
      createdDaysAgo: 2,
      psychValues: [94, 89, 91, 84, 90],
      psychTriggers: [
        { name: 'Information Asymmetry', score: '94%' },
        { name: 'Fear of Regret', score: '89%' },
        { name: 'Specific Number anchor', score: '91%' }
      ],
      thumbnailConcept: 'Close-up grimacing reaction with a redacted Slack contract screenshot glowing in background.',
      retentionCurve: [95, 89, 83, 79, 74, 71, 68],
      explanation: 'Gatekept knowledge framing triggers immediate FOMO and self-preservation instincts.'
    },
    {
      id: 'idea-3',
      platform: 'shorts',
      platformName: 'TikTok',
      niche: 'design-ux',
      nicheName: 'Design & SaaS',
      topic: 'design-figma',
      topicName: 'Figma & Design Systems',
      score: 74,
      tier: 'tier-high',
      hook: "POV: your design system finally has zero inconsistencies after 6 months of hell.",
      tags: ['#DesignSystems', '#Relatability', '#SaaS'],
      retentionLift: '+142% shares',
      retentionNum: 142,
      velocity: 'High Engagement',
      isHero: false,
      saved: true,
      createdDaysAgo: 3,
      psychValues: [82, 70, 95, 78, 85],
      psychTriggers: [
        { name: 'Relatability / Catharsis', score: '88%' },
        { name: 'Community In-Joke', score: '84%' }
      ],
      thumbnailConcept: 'Satisfying 4k screen recording zooming into aligned Figma design components with smooth sound design.',
      retentionCurve: [92, 82, 74, 68, 62, 59, 55],
      explanation: 'Relatable developer/designer suffering paired with a satisfying payoff drives massive share velocity.'
    },
    {
      id: 'idea-4',
      platform: 'social',
      platformName: 'LinkedIn / X',
      niche: 'design-ux',
      nicheName: 'Design & SaaS',
      topic: 'freelance-career',
      topicName: 'Freelance & Career',
      score: 88,
      tier: 'tier-high',
      hook: "I audited 50 designer portfolios last month. Here is the single section that predicts callbacks with 90% accuracy.",
      tags: ['#Hiring', '#Portfolio', '#DataBacked'],
      retentionLift: '+190% saves',
      retentionNum: 190,
      velocity: 'Viral Bookmark Rate',
      isHero: false,
      saved: false,
      createdDaysAgo: 1,
      psychValues: [93, 85, 88, 90, 89],
      psychTriggers: [
        { name: 'High Sample Size', score: '93%' },
        { name: 'Predictive Certainty', score: '90%' }
      ],
      thumbnailConcept: 'Carousel graphic comparing red rejected portfolio snippet vs glowing green callback layout.',
      retentionCurve: [94, 88, 82, 78, 73, 69, 66],
      explanation: 'Credibility established in the first 4 words, followed by an actionable cheat code payoff.'
    },
    {
      id: 'idea-5',
      platform: 'youtube',
      platformName: 'YouTube Long-form',
      niche: 'productivity',
      nicheName: 'Productivity & Systems',
      topic: 'productivity-ceos',
      topicName: 'Productivity & Mythbusting',
      score: 95,
      tier: 'tier-viral',
      hook: "I tested the 7 'unbreakable' productivity rules of billion-dollar CEOs — 5 of them are completely fake.",
      tags: ['#Productivity', '#Mythbusting', '#CEOs'],
      retentionLift: '+310% 30s lift',
      retentionNum: 310,
      velocity: 'Outlier Momentum',
      isHero: false,
      saved: true,
      createdDaysAgo: 4,
      psychValues: [97, 92, 86, 96, 94],
      psychTriggers: [
        { name: 'Contrarian Stance', score: '96%' },
        { name: 'Celebrity/Status Anchor', score: '92%' },
        { name: 'Pattern Interrupt', score: '97%' }
      ],
      thumbnailConcept: 'Split screen: Elon/Jobs routine checklist with massive red X stamps over morning routines.',
      retentionCurve: [97, 93, 89, 84, 80, 77, 74],
      explanation: 'Attacks widely accepted internet gospel with empirical testing. High controversy drive.'
    },
    {
      id: 'idea-6',
      platform: 'shorts',
      platformName: 'Shorts & Reels',
      niche: 'design-ux',
      nicheName: 'Design & SaaS',
      topic: 'design-figma',
      topicName: 'Figma & Design Systems',
      score: 84,
      tier: 'tier-high',
      hook: "The 10-minute Figma trick that senior designers charge $150/hr for.",
      tags: ['#Figma', '#Tutorial', '#Income'],
      retentionLift: '+175% replays',
      retentionNum: 175,
      velocity: 'Strong Velocity',
      isHero: false,
      saved: false,
      createdDaysAgo: 2,
      psychValues: [91, 88, 85, 87, 82],
      psychTriggers: [
        { name: 'Economic Arbitrage', score: '91%' },
        { name: 'Low Effort / High Reward', score: '88%' }
      ],
      thumbnailConcept: 'Split macro view: simple keystroke shortcut generating full dynamic auto-layout grid instantly.',
      retentionCurve: [93, 86, 80, 75, 70, 66, 62],
      explanation: 'Juxtaposing low time investment (10 min) with high economic value ($150/hr).'
    },
    {
      id: 'idea-7',
      platform: 'shorts',
      platformName: 'Instagram Reels',
      niche: 'business-money',
      nicheName: 'Finance & Business',
      topic: 'freelance-career',
      topicName: 'Freelance & Client Red Flags',
      score: 93,
      tier: 'tier-viral',
      hook: "Rating client red flags before the discovery call even ends.",
      tags: ['#Freelance', '#Drama', '#AgencyLife'],
      retentionLift: '+280% comments',
      retentionNum: 280,
      velocity: 'High Debate Quotient',
      isHero: false,
      saved: false,
      createdDaysAgo: 3,
      psychValues: [95, 91, 96, 89, 93],
      psychTriggers: [
        { name: 'Conflict / Gossip', score: '95%' },
        { name: 'Ego Validation', score: '91%' }
      ],
      thumbnailConcept: 'Facial expression of subtle disbelief while holding a muted iPhone on speaker.',
      retentionCurve: [96, 91, 86, 81, 76, 73, 70],
      explanation: 'Validates painful shared creator/freelancer experiences, inspiring immediate debate in comments.'
    },
    {
      id: 'idea-8',
      platform: 'social',
      platformName: 'X Thread / Substack',
      niche: 'design-ux',
      nicheName: 'Design & SaaS',
      topic: 'saas-growth',
      topicName: 'SaaS Growth & UX Audits',
      score: 79,
      tier: 'tier-high',
      hook: "I replaced my SaaS onboarding flow with 4 minimalist screens. Conversions jumped 312%.",
      tags: ['#SaaSGrowth', '#UX', '#CaseStudy'],
      retentionLift: '+160% clicks',
      retentionNum: 160,
      velocity: 'Viral Growth Loop',
      isHero: false,
      saved: true,
      createdDaysAgo: 5,
      psychValues: [89, 86, 82, 84, 80],
      psychTriggers: [
        { name: 'Simplicity Bias', score: '89%' },
        { name: 'Quantifiable Proof', score: '86%' }
      ],
      thumbnailConcept: 'Before (14 cluttered fields) vs After (clean 4-step modal) flow chart with neon metrics.',
      retentionCurve: [93, 85, 78, 72, 67, 63, 59],
      explanation: 'Clear contrast between complex convention and minimalist execution with verified metrics.'
    },
    {
      id: 'idea-9',
      platform: 'youtube',
      platformName: 'YouTube Long-form',
      niche: 'lifestyle',
      nicheName: 'Storytelling & Documentary',
      topic: 'finance-wealth',
      topicName: 'Finance & High Stakes',
      score: 62,
      tier: 'tier-mid',
      hook: "A slow, transparent breakdown of my Q3 creator revenue — with zero sponsor fluff.",
      tags: ['#Transparency', '#CreatorEconomy', '#IncomeReport'],
      retentionLift: '+85% watch time',
      retentionNum: 85,
      velocity: 'Steady Baseline',
      isHero: false,
      saved: false,
      createdDaysAgo: 6,
      psychValues: [82, 78, 85, 70, 68],
      psychTriggers: [
        { name: 'Vulnerability / Trust', score: '82%' },
        { name: 'Voyeurism', score: '78%' }
      ],
      thumbnailConcept: 'Clean Stripe dashboard screenshot with blurred tax deductions and authentic ambient desk shot.',
      retentionCurve: [88, 78, 69, 61, 55, 49, 44],
      explanation: 'Builds deep trust and high session duration with hardcore fans, though lower broad algorithm breakout.'
    },
    {
      id: 'idea-10',
      platform: 'shorts',
      platformName: 'TikTok / Shorts',
      niche: 'tech-ai',
      nicheName: 'Tech & AI',
      topic: 'devtools-coding',
      topicName: 'DevTools, VS Code & Coding',
      score: 87,
      tier: 'tier-high',
      hook: "Delete these 3 VS Code extensions before they secretly slow down your build times.",
      tags: ['#DevTools', '#Warning', '#Coding'],
      retentionLift: '+220% shares',
      retentionNum: 220,
      velocity: 'Urgent Action Trigger',
      isHero: false,
      saved: false,
      createdDaysAgo: 4,
      psychValues: [94, 88, 85, 91, 92],
      psychTriggers: [
        { name: 'Urgency / Immediate Loss', score: '94%' },
        { name: 'Curiosity on Identity', score: '88%' }
      ],
      thumbnailConcept: 'Warning icon overlaying popular VS code marketplace logo badges with flame graphics.',
      retentionCurve: [95, 88, 81, 76, 71, 67, 63],
      explanation: 'Loss aversion is twice as powerful as gain; developers immediately want to audit their machine.'
    }
  ];

  // State Management
  let ideasState = [...INITIAL_IDEAS];
  let activeFilter = 'all';
  let activeTopic = 'all';
  let activeNiche = 'all';
  let searchQuery = '';
  let activeSort = 'score-desc';
  let activeView = 'bento';
  let selectedIdeaForDrawer = null;
  let authMode = 'signin';
  let currentChartRange = '30d';

  // DOM Elements Cache
  const ideasGridEl = document.getElementById('ideas-grid');
  const emptyStateEl = document.getElementById('empty-state');
  const searchInputEl = document.getElementById('global-search-input');
  const clearSearchBtnEl = document.getElementById('clear-search-btn');
  const filterPillsContainer = document.getElementById('filter-pills-container');
  const sortSelectEl = document.getElementById('sort-select');
  const viewBtns = document.querySelectorAll('.view-btn');
  const resetFiltersBtn = document.getElementById('reset-filters-btn');
  const headerTotalCountEl = document.getElementById('header-total-count');
  const resultsCountBadgeEl = document.getElementById('results-count-badge');

  // Topic & Niche Menu Elements
  const btnTopicMenu = document.getElementById('btn-topic-menu');
  const topicSearchDropdown = document.getElementById('topic-search-dropdown');
  const topicMenuLabel = document.getElementById('topic-menu-label');
  const topicFilterInput = document.getElementById('topic-filter-input');
  const topicItemsContainer = document.getElementById('topic-items-container');

  const btnNicheMenu = document.getElementById('btn-niche-menu');
  const nicheSearchDropdown = document.getElementById('niche-search-dropdown');
  const nicheMenuLabel = document.getElementById('niche-menu-label');

  const activeFiltersBar = document.getElementById('active-filters-bar');
  const activeChipsList = document.getElementById('active-chips-list');
  const btnClearAllFilters = document.getElementById('btn-clear-all-filters');

  // Pill Count Elements
  const countAllEl = document.getElementById('count-all');
  const countViralEl = document.getElementById('count-viral');
  const countYoutubeEl = document.getElementById('count-youtube');
  const countShortsEl = document.getElementById('count-shorts');
  const countSocialEl = document.getElementById('count-social');
  const countSavedEl = document.getElementById('count-saved');

  // Auth & Profile Elements
  const heroUserNameEl = document.getElementById('hero-user-name');
  const sidebarAvatarInitials = document.getElementById('sidebar-avatar-initials');
  const sidebarUserAvatarBtn = document.getElementById('sidebar-user-avatar-btn');
  const topbarAuthContainer = document.getElementById('topbar-auth-container');
  const btnHeaderLoginTrigger = document.getElementById('btn-header-login-trigger');
  const navLoginBtn = document.getElementById('nav-login');

  // Full-Screen Auth Gateway Elements
  const fullAuthScreen = document.getElementById('full-auth-screen');
  const btnCloseAuthGateway = document.getElementById('btn-close-auth-gateway');
  const gatewayTitleText = document.getElementById('gateway-title-text');
  const gatewaySubtitleText = document.getElementById('gateway-subtitle-text');
  const btnInstantDemoLogin = document.getElementById('btn-instant-demo-login');
  const gatewayTabSignin = document.getElementById('gateway-tab-signin');
  const gatewayTabSignup = document.getElementById('gateway-tab-signup');
  const btnGatewayGoogle = document.getElementById('btn-gateway-google');
  const btnGatewayGithub = document.getElementById('btn-gateway-github');
  const gatewayAuthForm = document.getElementById('gateway-auth-form');
  const gatewayGroupName = document.getElementById('gateway-group-name');
  const gatewayInputName = document.getElementById('gateway-input-name');
  const gatewayInputEmail = document.getElementById('gateway-input-email');
  const gatewayInputPassword = document.getElementById('gateway-input-password');
  const gatewayTogglePass = document.getElementById('gateway-toggle-pass');
  const gatewayForgotBtn = document.getElementById('gateway-forgot-btn');
  const btnGatewaySubmit = document.getElementById('btn-gateway-submit');
  const gatewaySubmitLabel = document.getElementById('gateway-submit-label');
  const btnGatewayExploreGuest = document.getElementById('btn-gateway-explore-guest');

  // Profile Modal Elements
  const profileModal = document.getElementById('profile-modal');
  const closeProfileModalBtn = document.getElementById('close-profile-modal');
  const modalProfileAvatar = document.getElementById('modal-profile-avatar');
  const modalProfileName = document.getElementById('modal-profile-name');
  const modalProfileEmail = document.getElementById('modal-profile-email');
  const modalProfileTier = document.getElementById('modal-profile-tier');
  const pStatCalibrations = document.getElementById('p-stat-calibrations');
  const pStatSaved = document.getElementById('p-stat-saved');
  const editProfileName = document.getElementById('edit-profile-name');
  const editProfileNiche = document.getElementById('edit-profile-niche');
  const btnSaveProfile = document.getElementById('btn-save-profile');
  const btnSignOut = document.getElementById('btn-sign-out');

  // Scorer Modal & Batch Modal
  const scorerModal = document.getElementById('scorer-modal');
  const batchModal = document.getElementById('batch-modal');
  const detailDrawer = document.getElementById('detail-drawer');
  const drawerOverlay = document.getElementById('drawer-overlay');
  const toastContainer = document.getElementById('toast-container');

  // Modal Buttons & Triggers
  const btnScoreNew = document.getElementById('btn-score-new');
  const btnBatchImport = document.getElementById('btn-batch-import');
  const closeScorerModalBtn = document.getElementById('close-scorer-modal');
  const cancelScorerBtn = document.getElementById('cancel-scorer-btn');
  const closeBatchModalBtn = document.getElementById('close-batch-modal');
  const cancelBatchBtn = document.getElementById('cancel-batch-btn');
  const confirmBatchBtn = document.getElementById('confirm-batch-btn');
  const closeDrawerBtn = document.getElementById('close-drawer-btn');

  // Scorer Inputs & Results
  const hookInputField = document.getElementById('hook-input-field');
  const hookCharCount = document.getElementById('hook-char-count');
  const pasteSampleHookBtn = document.getElementById('paste-sample-hook');
  const platformSelectField = document.getElementById('platform-select-field');
  const nicheSelectField = document.getElementById('niche-select-field');
  const btnRunAnalysis = document.getElementById('btn-run-analysis');
  const saveToLibraryBtn = document.getElementById('save-to-library-btn');
  const resultScoreRing = document.getElementById('result-score-ring');
  const resultScoreNum = document.getElementById('result-score-num');
  const resultScoreLabel = document.getElementById('result-score-label');
  const fillCuriosity = document.getElementById('fill-curiosity');
  const barCuriosity = document.getElementById('bar-curiosity');
  const fillStakes = document.getElementById('fill-stakes');
  const barStakes = document.getElementById('bar-stakes');
  const fillVelocity = document.getElementById('fill-velocity');
  const barVelocity = document.getElementById('bar-velocity');
  const aiVariationsBox = document.getElementById('ai-variations-box');
  const variationsList = document.getElementById('variations-list');
  const batchInputField = document.getElementById('batch-input-field');

  // Detail Drawer Elements
  const drawerPlatformTag = document.getElementById('drawer-platform-tag');
  const drawerScoreNum = document.getElementById('drawer-score-num');
  const drawerScoreBadge = document.getElementById('drawer-score-badge');
  const drawerRatingHeadline = document.getElementById('drawer-rating-headline');
  const drawerRatingDesc = document.getElementById('drawer-rating-desc');
  const drawerHookText = document.getElementById('drawer-hook-text');
  const drawerRetStat = document.getElementById('drawer-retention-stat');
  const drawerThumbConcept = document.getElementById('drawer-thumb-concept');
  const drawerBookmarkBtn = document.getElementById('drawer-bookmark-btn');
  const drawerCopyBtn = document.getElementById('drawer-copy-btn');
  const drawerCopyBtn2 = document.getElementById('drawer-copy-btn-2');
  const drawerExportBtn = document.getElementById('drawer-export-btn');

  // Chart Range Elements
  const chartTabBtns = document.querySelectorAll('.shadcn-tab-btn');
  const legendReachVal = document.getElementById('legend-reach-val');
  const legendRetVal = document.getElementById('legend-ret-val');

  // Lucide Icons Render Trigger
  function refreshIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  // ================= 3. INITIALIZATION =================
  function init() {
    bindEventListeners();
    updateUIForAuth();
    updatePillCounts();
    renderGrid();
    initShadcnCharts();
    checkHashRoute();
    refreshIcons();
  }

  // Check URL Hash for #login
  function checkHashRoute() {
    if (window.location.hash === '#login') {
      openAuthGateway('signin');
    }
  }

  // ================= 4. SHADCN/UI CHART SUITE =================
  function initShadcnCharts() {
    initVelocityAreaChart('30d');
    initPlatformDonutChart();
  }

  function initVelocityAreaChart(range = '30d') {
    const ctx = document.getElementById('shadcn-velocity-area-chart');
    if (!ctx) return;

    if (velocityAreaChart) velocityAreaChart.destroy();

    let labels, dataReach, dataRetention;

    if (range === '30d') {
      labels = ['Apr 1', 'Apr 5', 'Apr 10', 'Apr 15', 'Apr 20', 'Apr 25', 'Apr 30', 'May 5', 'May 10', 'May 15', 'May 20', 'May 25', 'May 30'];
      dataReach = [180, 220, 310, 290, 380, 420, 390, 480, 440, 520, 490, 580, 640];
      dataRetention = [68, 71, 74, 72, 79, 81, 77, 84, 82, 86, 85, 89, 92];
      legendReachVal.textContent = '+340%';
      legendRetVal.textContent = '74.2%';
    } else if (range === '7d') {
      labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      dataReach = [410, 460, 520, 480, 560, 610, 640];
      dataRetention = [76, 79, 83, 81, 87, 89, 92];
      legendReachVal.textContent = '+412%';
      legendRetVal.textContent = '86.5%';
    } else {
      labels = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', 'Now'];
      dataReach = [120, 190, 340, 510, 620, 580, 640];
      dataRetention = [70, 74, 80, 88, 91, 89, 92];
      legendReachVal.textContent = '+520%';
      legendRetVal.textContent = '91.8%';
    }

    const gradient1 = ctx.getContext('2d').createLinearGradient(0, 0, 0, 220);
    gradient1.addColorStop(0, 'rgba(0, 245, 155, 0.35)');
    gradient1.addColorStop(1, 'rgba(0, 245, 155, 0.00)');

    const gradient2 = ctx.getContext('2d').createLinearGradient(0, 0, 0, 220);
    gradient2.addColorStop(0, 'rgba(0, 242, 254, 0.25)');
    gradient2.addColorStop(1, 'rgba(0, 242, 254, 0.00)');

    velocityAreaChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Organic Reach Lift (%)',
            data: dataReach,
            borderColor: '#00F59B',
            backgroundColor: gradient1,
            fill: true,
            tension: 0.38,
            borderWidth: 2.2,
            pointBackgroundColor: '#00F59B',
            pointRadius: 0,
            pointHoverRadius: 5,
            pointHoverBorderColor: '#FFFFFF',
            pointHoverBorderWidth: 2
          },
          {
            label: '30s Retention Lift (%)',
            data: dataRetention,
            borderColor: '#00F2FE',
            backgroundColor: gradient2,
            fill: true,
            tension: 0.38,
            borderWidth: 2,
            pointBackgroundColor: '#00F2FE',
            pointRadius: 0,
            pointHoverRadius: 5,
            pointHoverBorderColor: '#FFFFFF',
            pointHoverBorderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#121218',
            titleColor: '#FFFFFF',
            bodyColor: 'rgba(255, 255, 255, 0.8)',
            borderColor: 'rgba(255, 255, 255, 0.15)',
            borderWidth: 1,
            padding: 12,
            cornerRadius: 10,
            titleFont: { family: 'Plus Jakarta Sans', size: 12, weight: '700' },
            bodyFont: { family: 'JetBrains Mono', size: 11.5 },
            displayColors: true,
            boxWidth: 8,
            boxHeight: 8,
            usePointStyle: true
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(255, 255, 255, 0.04)', drawBorder: false },
            ticks: { color: 'rgba(255, 255, 255, 0.45)', font: { family: 'JetBrains Mono', size: 10.5 } }
          },
          y: {
            grid: { color: 'rgba(255, 255, 255, 0.04)', drawBorder: false },
            ticks: { color: 'rgba(255, 255, 255, 0.45)', font: { family: 'JetBrains Mono', size: 10.5 } }
          }
        }
      }
    });
  }

  function initPlatformDonutChart() {
    const ctx = document.getElementById('shadcn-platform-donut-chart');
    if (!ctx) return;

    if (platformDonutChart) platformDonutChart.destroy();

    platformDonutChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['YouTube Long-form', 'Shorts / TikTok / Reels', 'X & LinkedIn'],
        datasets: [{
          data: [86, 94, 34],
          backgroundColor: ['#FF3B30', '#F43F5E', '#38BDF8'],
          borderColor: '#0E0E14',
          borderWidth: 3,
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '74%',
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#121218',
            titleColor: '#FFFFFF',
            bodyColor: 'rgba(255, 255, 255, 0.85)',
            borderColor: 'rgba(255, 255, 255, 0.15)',
            borderWidth: 1,
            padding: 10,
            cornerRadius: 8,
            titleFont: { family: 'Plus Jakarta Sans', size: 11.5, weight: '700' },
            bodyFont: { family: 'JetBrains Mono', size: 11 }
          }
        }
      }
    });
  }

  function updateDrawerCharts(idea) {
    const retCtx = document.getElementById('shadcn-drawer-retention-chart');
    if (retCtx) {
      if (drawerRetentionChart) drawerRetentionChart.destroy();

      const grad = retCtx.getContext('2d').createLinearGradient(0, 0, 0, 160);
      grad.addColorStop(0, 'rgba(0, 245, 155, 0.38)');
      grad.addColorStop(1, 'rgba(0, 245, 155, 0.00)');

      const curve = idea.retentionCurve || [96, 92, 87, 82, 78, 74, 71];

      drawerRetentionChart = new Chart(retCtx, {
        type: 'line',
        data: {
          labels: ['0s (Hook)', '10s', '20s', '30s (Payoff)', '40s', '50s', '60s'],
          datasets: [
            {
              label: 'Predicted Retention (%)',
              data: curve,
              borderColor: '#00F59B',
              backgroundColor: grad,
              fill: true,
              tension: 0.35,
              borderWidth: 2.2,
              pointBackgroundColor: '#00F59B',
              pointRadius: 3,
              pointHoverRadius: 6
            },
            {
              label: 'Niche Median Baseline',
              data: [85, 72, 60, 52, 45, 40, 36],
              borderColor: 'rgba(255, 255, 255, 0.25)',
              borderDash: [4, 4],
              borderWidth: 1.5,
              pointRadius: 0,
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: '#121218',
              borderColor: 'rgba(0, 245, 155, 0.4)',
              borderWidth: 1,
              cornerRadius: 8,
              padding: 10
            }
          },
          scales: {
            x: {
              grid: { color: 'rgba(255, 255, 255, 0.04)', drawBorder: false },
              ticks: { color: 'rgba(255, 255, 255, 0.45)', font: { family: 'JetBrains Mono', size: 10 } }
            },
            y: {
              grid: { color: 'rgba(255, 255, 255, 0.04)', drawBorder: false },
              ticks: { color: 'rgba(255, 255, 255, 0.45)', font: { family: 'JetBrains Mono', size: 10 } },
              min: 30,
              max: 100
            }
          }
        }
      });
    }

    const radarCtx = document.getElementById('shadcn-drawer-radar-chart');
    if (radarCtx) {
      if (drawerRadarChart) drawerRadarChart.destroy();

      const psychData = idea.psychValues || [95, 90, 88, 92, 94];

      drawerRadarChart = new Chart(radarCtx, {
        type: 'radar',
        data: {
          labels: ['Curiosity Gap', 'High Stakes', 'Relatability', 'Novelty Bias', 'Urgency Index'],
          datasets: [
            {
              label: 'This Hook',
              data: psychData,
              backgroundColor: 'rgba(139, 124, 246, 0.28)',
              borderColor: '#8B7CF6',
              pointBackgroundColor: '#8B7CF6',
              pointBorderColor: '#FFFFFF',
              pointHoverRadius: 5,
              borderWidth: 2
            },
            {
              label: 'Top 1% Benchmark',
              data: [90, 85, 80, 88, 85],
              backgroundColor: 'rgba(0, 245, 155, 0.1)',
              borderColor: 'rgba(0, 245, 155, 0.4)',
              borderWidth: 1.5,
              pointRadius: 0
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: '#121218',
              borderColor: 'rgba(139, 124, 246, 0.4)',
              borderWidth: 1,
              cornerRadius: 8,
              padding: 10
            }
          },
          scales: {
            r: {
              angleLines: { color: 'rgba(255, 255, 255, 0.08)' },
              grid: { color: 'rgba(255, 255, 255, 0.08)' },
              pointLabels: {
                color: 'rgba(255, 255, 255, 0.65)',
                font: { family: 'Plus Jakarta Sans', size: 10, weight: '600' }
              },
              ticks: { display: false, min: 40, max: 100 }
            }
          }
        }
      });
    }
  }

  // ================= 5. AUTH UI ADAPTATION =================
  function updateUIForAuth() {
    const firstName = currentUser.name ? currentUser.name.split(' ')[0] : 'Creator';
    const initials = getInitials(currentUser.name);

    if (currentUser.isLoggedIn) {
      heroUserNameEl.textContent = `${firstName}.`;
      sidebarAvatarInitials.textContent = initials;
      
      topbarAuthContainer.innerHTML = `
        <button class="btn-user-chip" id="topbar-profile-btn" title="View Account Profile" aria-label="View Account Profile">
          <div class="chip-avatar">${initials}</div>
          <span class="chip-name">${currentUser.name}</span>
          <span class="chip-badge">${currentUser.tierShort || 'PRO'}</span>
        </button>
      `;

      const newTopbarProfileBtn = document.getElementById('topbar-profile-btn');
      if (newTopbarProfileBtn) {
        newTopbarProfileBtn.addEventListener('click', openProfileModal);
      }
    } else {
      heroUserNameEl.textContent = 'Guest.';
      sidebarAvatarInitials.textContent = '?';
      
      topbarAuthContainer.innerHTML = `
        <button class="btn btn-primary" id="topbar-login-btn" aria-label="Sign In / Join Pro">
          <svg class="lucide lucide-log-in" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
          <span>Log In / Pro</span>
        </button>
      `;

      const topbarLoginBtn = document.getElementById('topbar-login-btn');
      if (topbarLoginBtn) {
        topbarLoginBtn.addEventListener('click', () => openAuthGateway('signin'));
      }
    }
    refreshIcons();
  }

  function getInitials(name) {
    if (!name) return 'CR';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }

  // ================= 6. RENDERING & FILTERING (MULTI-DIMENSIONAL) =================
  function getFilteredAndSortedIdeas() {
    let list = ideasState.filter(item => {
      // 1. Text Search Matching
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inHook = item.hook.toLowerCase().includes(q);
        const inPlatform = item.platformName.toLowerCase().includes(q);
        const inNiche = item.nicheName && item.nicheName.toLowerCase().includes(q);
        const inTopic = item.topicName && item.topicName.toLowerCase().includes(q);
        const inTags = item.tags.some(t => t.toLowerCase().includes(q));
        const inExplanation = item.explanation && item.explanation.toLowerCase().includes(q);
        if (!inHook && !inPlatform && !inNiche && !inTopic && !inTags && !inExplanation) return false;
      }

      // 2. Format Pill Matching
      if (activeFilter === 'viral' && item.score < 90) return false;
      if (activeFilter === 'youtube' && item.platform !== 'youtube') return false;
      if (activeFilter === 'shorts' && item.platform !== 'shorts') return false;
      if (activeFilter === 'social' && item.platform !== 'social') return false;
      if (activeFilter === 'saved' && !item.saved) return false;

      // 3. Topic Matching
      if (activeTopic !== 'all' && item.topic !== activeTopic) return false;

      // 4. Niche Matching
      if (activeNiche !== 'all' && item.niche !== activeNiche) return false;

      return true;
    });

    // Sorting
    list.sort((a, b) => {
      if (activeSort === 'score-desc') return b.score - a.score;
      if (activeSort === 'retention-desc') return b.retentionNum - a.retentionNum;
      if (activeSort === 'newest') return a.createdDaysAgo - b.createdDaysAgo;
      if (activeSort === 'alphabetical') return a.hook.localeCompare(b.hook);
      return 0;
    });

    return list;
  }

  function renderGrid() {
    const list = getFilteredAndSortedIdeas();
    resultsCountBadgeEl.textContent = `Showing ${list.length} of ${ideasState.length} calibrated ideas`;

    renderActiveFilterChips();

    if (list.length === 0) {
      ideasGridEl.innerHTML = '';
      ideasGridEl.style.display = 'none';
      emptyStateEl.style.display = 'block';
      return;
    }

    emptyStateEl.style.display = 'none';
    ideasGridEl.style.display = 'grid';

    const cardsHtml = list.map((idea, index) => {
      const isSpan2 = (activeView === 'bento' && (idea.isHero || (index === 0 && list.length > 2)));
      const isRow2 = (activeView === 'bento' && idea.isHero);

      const spanClasses = `${isSpan2 ? 'span-2' : ''} ${isRow2 ? 'row-2' : ''}`.trim();
      const scoreTierClass = idea.tier;
      const platformIconHtml = getPlatformIcon(idea.platform);

      const heroVisualHtml = (isSpan2 && idea.isHero) ? `
        <div class="hero-visual-graphic" aria-hidden="true">
          <div class="hero-visual-grid"></div>
          <svg class="hero-retention-wave" viewBox="0 0 400 80" preserveAspectRatio="none">
            <path d="M0,15 Q100,18 200,32 T400,42 L400,80 L0,80 Z" fill="rgba(0, 245, 155, 0.12)" />
            <path d="M0,15 Q100,18 200,32 T400,42" fill="none" stroke="#00F59B" stroke-width="2.2" stroke-linecap="round"/>
          </svg>
          <div class="hero-spark-badge">
            <svg class="lucide lucide-trending-up" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
            ${idea.retentionLift}
          </div>
        </div>
      ` : '';

      return `
        <article class="idea-card ${spanClasses}" data-id="${idea.id}" role="button" tabindex="0" aria-label="Inspect ${idea.hook}">
          <div class="card-top">
            <div class="platform-pill ${idea.platform}">
              ${platformIconHtml}
              <span>${idea.platformName}</span>
            </div>
            <div class="score-badge ${scoreTierClass}" aria-label="Virality score ${idea.score} out of 100">
              <div class="score-val">${idea.score}</div>
              <div class="score-tag">${idea.score >= 90 ? 'VIRAL' : (idea.score >= 70 ? 'HIGH' : 'MID')}</div>
            </div>
          </div>

          ${heroVisualHtml}

          <div class="card-hook-text">${highlightSearchText(idea.hook, searchQuery)}</div>

          <div class="card-tags-row">
            ${idea.tags.map(t => `<span class="psych-tag ${t.includes('HighStakes') || t.includes('AIAgents') ? 'highlight' : ''}">${t}</span>`).join('')}
          </div>

          <div class="card-meta-footer">
            <div class="card-metrics-group">
              <div class="metric-pill positive">
                <svg class="lucide lucide-activity" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.48 12H2"/></svg>
                <span>${idea.velocity}</span>
              </div>
            </div>

            <div class="card-action-icons" onclick="event.stopPropagation()">
              <button class="action-btn-sm copy-btn" data-hook="${escapeHtml(idea.hook)}" title="Copy Hook to Clipboard" aria-label="Copy Hook">
                <svg class="lucide lucide-copy" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
              </button>
              <button class="action-btn-sm save-btn ${idea.saved ? 'saved' : ''}" data-id="${idea.id}" title="${idea.saved ? 'Remove Bookmark' : 'Bookmark Idea'}" aria-label="${idea.saved ? 'Remove Bookmark' : 'Bookmark Idea'}">
                <svg class="lucide lucide-bookmark" viewBox="0 0 24 24" fill="${idea.saved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    ideasGridEl.innerHTML = cardsHtml;

    document.querySelectorAll('.idea-card').forEach(cardEl => {
      const id = cardEl.getAttribute('data-id');
      cardEl.addEventListener('click', () => openDetailDrawer(id));
      cardEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openDetailDrawer(id);
        }
      });
    });

    document.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const hook = btn.getAttribute('data-hook');
        copyToClipboard(hook, "Hook copied to clipboard!");
      });
    });

    document.querySelectorAll('.save-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        toggleSaveIdea(id);
      });
    });

    refreshIcons();
  }

  // Render Active Multi-Filter Chips Bar
  function renderActiveFilterChips() {
    const chips = [];

    if (activeTopic !== 'all') {
      const activeTopicItem = document.querySelector(`.topic-menu-item[data-topic="${activeTopic}"] .topic-item-name`);
      const label = activeTopicItem ? activeTopicItem.textContent : activeTopic;
      chips.push(`
        <span class="active-chip-pill topic-chip">
          <span>Topic: ${label}</span>
          <button class="chip-remove-btn" data-remove="topic" title="Remove Topic Filter" aria-label="Remove Topic Filter">×</button>
        </span>
      `);
    }

    if (activeNiche !== 'all') {
      const activeNicheItem = document.querySelector(`.niche-menu-item[data-niche="${activeNiche}"] .niche-name`);
      const label = activeNicheItem ? activeNicheItem.textContent : activeNiche;
      chips.push(`
        <span class="active-chip-pill">
          <span>Niche: ${label}</span>
          <button class="chip-remove-btn" data-remove="niche" title="Remove Niche Filter" aria-label="Remove Niche Filter">×</button>
        </span>
      `);
    }

    if (activeFilter !== 'all') {
      const activePill = document.querySelector(`.filter-pills-row .pill[data-filter="${activeFilter}"] .pill-label`);
      const label = activePill ? activePill.textContent : activeFilter;
      chips.push(`
        <span class="active-chip-pill">
          <span>Format: ${label}</span>
          <button class="chip-remove-btn" data-remove="filter" title="Remove Format Filter" aria-label="Remove Format Filter">×</button>
        </span>
      `);
    }

    if (chips.length > 0) {
      activeChipsList.innerHTML = chips.join('');
      activeFiltersBar.style.display = 'flex';

      activeChipsList.querySelectorAll('.chip-remove-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const type = btn.getAttribute('data-remove');
          if (type === 'topic') selectTopic('all');
          if (type === 'niche') selectNiche('all');
          if (type === 'filter') setActiveFilterPill('all');
        });
      });
    } else {
      activeFiltersBar.style.display = 'none';
      activeChipsList.innerHTML = '';
    }
  }

  function updatePillCounts() {
    const total = ideasState.length;
    const viral = ideasState.filter(i => i.score >= 90).length;
    const youtube = ideasState.filter(i => i.platform === 'youtube').length;
    const shorts = ideasState.filter(i => i.platform === 'shorts').length;
    const social = ideasState.filter(i => i.platform === 'social').length;
    const saved = ideasState.filter(i => i.saved).length;

    headerTotalCountEl.textContent = total;
    countAllEl.textContent = total;
    countViralEl.textContent = viral;
    countYoutubeEl.textContent = youtube;
    countShortsEl.textContent = shorts;
    countSocialEl.textContent = social;
    countSavedEl.textContent = saved;
  }

  // ================= 7. TOPIC & NICHE SELECTOR LOGIC =================
  function selectTopic(topicKey) {
    activeTopic = topicKey;
    document.querySelectorAll('.topic-menu-item').forEach(item => {
      if (item.getAttribute('data-topic') === topicKey) {
        item.classList.add('active');
        topicMenuLabel.textContent = topicKey === 'all' ? 'Topics' : item.querySelector('.topic-item-name').textContent.split(' ')[1] || 'Topic';
      } else {
        item.classList.remove('active');
      }
    });

    closeTopicDropdown();
    renderGrid();
    if (topicKey !== 'all') showToast(`Filtered by Topic: ${topicMenuLabel.textContent}`);
  }

  function selectNiche(nicheKey) {
    activeNiche = nicheKey;
    document.querySelectorAll('.niche-menu-item').forEach(item => {
      if (item.getAttribute('data-niche') === nicheKey) {
        item.classList.add('active');
        const name = item.querySelector('.niche-name').textContent.replace(/^[^\w\s]+/, '').trim();
        nicheMenuLabel.textContent = nicheKey === 'all' ? 'Niche: All' : `Niche: ${name.split(' ')[0]}`;
      } else {
        item.classList.remove('active');
      }
    });

    closeNicheDropdown();
    renderGrid();
    if (nicheKey !== 'all') showToast(`Calibrated to ${nicheMenuLabel.textContent}`);
  }

  function toggleTopicDropdown() {
    closeNicheDropdown();
    const isShown = topicSearchDropdown.classList.contains('show');
    if (isShown) closeTopicDropdown();
    else {
      topicSearchDropdown.classList.add('show');
      btnTopicMenu.setAttribute('aria-expanded', 'true');
      btnTopicMenu.classList.add('active');
      setTimeout(() => topicFilterInput.focus(), 50);
    }
  }

  function closeTopicDropdown() {
    topicSearchDropdown.classList.remove('show');
    btnTopicMenu.setAttribute('aria-expanded', 'false');
    btnTopicMenu.classList.remove('active');
  }

  function toggleNicheDropdown() {
    closeTopicDropdown();
    const isShown = nicheSearchDropdown.classList.contains('show');
    if (isShown) closeNicheDropdown();
    else {
      nicheSearchDropdown.classList.add('show');
      btnNicheMenu.setAttribute('aria-expanded', 'true');
      btnNicheMenu.classList.add('active');
    }
  }

  function closeNicheDropdown() {
    nicheSearchDropdown.classList.remove('show');
    btnNicheMenu.setAttribute('aria-expanded', 'false');
    btnNicheMenu.classList.remove('active');
  }

  // ================= 8. VIRALITY SCORING DIAGNOSTIC =================
  function calculateViralityScore(hookText, platform, niche) {
    if (!hookText || hookText.trim().length === 0) {
      return { score: 0, curiosity: 0, stakes: 0, velocity: 0, tier: 'tier-draft', variations: [] };
    }

    let rawScore = 60;
    const textLower = hookText.toLowerCase();

    const len = hookText.trim().length;
    if (len >= 45 && len <= 100) rawScore += 12;
    else if (len < 30) rawScore -= 8;

    const curiosityKeywords = ['how i', 'gave 3', 'broke my', 'nobody tells you', 'secret', 'predicted', 'tested 7', 'warning', 'delete these', 'single reason', 'why 99%', 'the truth about'];
    const stakesKeywords = ['$1,000', '$10k', '$250k', 'million', 'billion', 'hell', 'fired', 'zero to', 'quit', 'failed', 'crashed'];
    const contrastKeywords = ['vs', 'fake', 'before and after', 'replaced', 'jumped', 'instead of', 'predicts'];

    let curiosityScore = 65;
    let stakesScore = 60;
    let velocityScore = 70;

    curiosityKeywords.forEach(word => {
      if (textLower.includes(word)) {
        rawScore += 6;
        curiosityScore += 8;
      }
    });

    stakesKeywords.forEach(word => {
      if (textLower.includes(word)) {
        rawScore += 7;
        stakesScore += 10;
      }
    });

    contrastKeywords.forEach(word => {
      if (textLower.includes(word)) {
        rawScore += 5;
        velocityScore += 7;
      }
    });

    if (/\d+/.test(hookText)) {
      rawScore += 6;
      curiosityScore += 5;
      velocityScore += 6;
    }

    if (platform === 'youtube' && len > 50) rawScore += 4;
    if (platform === 'shorts' && (textLower.includes('pov') || textLower.includes('this') || textLower.includes('you'))) rawScore += 6;

    const finalScore = Math.min(99, Math.max(38, rawScore));
    curiosityScore = Math.min(99, Math.max(40, curiosityScore));
    stakesScore = Math.min(99, Math.max(35, stakesScore));
    velocityScore = Math.min(99, Math.max(45, velocityScore));

    let tier = 'tier-draft';
    if (finalScore >= 90) tier = 'tier-viral';
    else if (finalScore >= 70) tier = 'tier-high';
    else if (finalScore >= 50) tier = 'tier-mid';

    const variations = [
      {
        text: `I tested ${hookText.replace(/^[I\s]+/, '').replace(/[\.\?!]+$/, '')} for 30 days — here is what nobody warns you about.`,
        score: Math.min(98, finalScore + 14)
      },
      {
        text: `Why 99% of creators get this wrong: "${hookText.replace(/[\.\?!]+$/, '')}"`,
        score: Math.min(96, finalScore + 11)
      },
      {
        text: `How I turned a $1,000 experiment into this: ${hookText.replace(/[\.\?!]+$/, '')}`,
        score: Math.min(94, finalScore + 9)
      }
    ];

    return {
      score: finalScore,
      curiosity: curiosityScore,
      stakes: stakesScore,
      velocity: velocityScore,
      tier,
      variations
    };
  }

  function runViralityDiagnostic() {
    const text = hookInputField.value.trim();
    const platform = platformSelectField.value;
    const niche = nicheSelectField.value;

    if (!text) {
      showToast('Please enter a hook or click "Try Sample Hook".');
      hookInputField.focus();
      return;
    }

    btnRunAnalysis.setAttribute('aria-busy', 'true');
    btnRunAnalysis.innerHTML = `
      <svg class="live-pulse" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>
      <span>Analyzing Neural Virality Signals…</span>
    `;
    btnRunAnalysis.disabled = true;

    setTimeout(() => {
      const result = calculateViralityScore(text, platform, niche);

      resultScoreNum.textContent = result.score;
      resultScoreLabel.textContent = result.score >= 90 ? 'VIRAL HIT' : (result.score >= 70 ? 'HIGH REACH' : 'CALIBRATED');
      
      if (result.score >= 90) {
        resultScoreRing.style.borderColor = 'rgba(0, 245, 155, 0.6)';
        resultScoreRing.style.boxShadow = '0 0 32px rgba(0, 245, 155, 0.4)';
        resultScoreNum.style.color = '#00F59B';
      } else if (result.score >= 70) {
        resultScoreRing.style.borderColor = 'rgba(255, 180, 84, 0.6)';
        resultScoreRing.style.boxShadow = '0 0 32px rgba(255, 180, 84, 0.35)';
        resultScoreNum.style.color = '#FFB454';
      } else {
        resultScoreRing.style.borderColor = 'rgba(139, 124, 246, 0.5)';
        resultScoreRing.style.boxShadow = '0 0 24px rgba(139, 124, 246, 0.3)';
        resultScoreNum.style.color = '#8B7CF6';
      }

      fillCuriosity.style.width = `${result.curiosity}%`;
      barCuriosity.textContent = `${result.curiosity}%`;
      fillStakes.style.width = `${result.stakes}%`;
      barStakes.textContent = `${result.stakes}%`;
      fillVelocity.style.width = `${result.velocity}%`;
      barVelocity.textContent = `${result.velocity}%`;

      variationsList.innerHTML = result.variations.map(v => `
        <div class="variation-item" data-text="${escapeHtml(v.text)}" role="button" tabindex="0" title="Click to apply variation">
          <div class="variation-text">"${v.text}"</div>
          <div class="variation-score-tag">Score ${v.score}</div>
        </div>
      `).join('');
      aiVariationsBox.style.display = 'block';

      currentUser.calibrationsCount = (currentUser.calibrationsCount || 0) + 1;
      saveUserSession(currentUser);

      document.querySelectorAll('.variation-item').forEach(item => {
        const applyVariation = () => {
          const newText = item.getAttribute('data-text');
          hookInputField.value = newText;
          updateCharCount();
          runViralityDiagnostic();
          showToast('Applied AI variation! Score recalibrated.');
        };
        item.addEventListener('click', applyVariation);
        item.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            applyVariation();
          }
        });
      });

      saveToLibraryBtn.disabled = false;
      btnRunAnalysis.removeAttribute('aria-busy');
      btnRunAnalysis.innerHTML = `
        <svg class="lucide lucide-sparkles" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
        <span>Recalibrate Diagnostics</span>
      `;
      btnRunAnalysis.disabled = false;
      refreshIcons();
    }, 450);
  }

  function saveCurrentScoredIdea() {
    const text = hookInputField.value.trim();
    const platform = platformSelectField.value;
    const niche = nicheSelectField.value;
    const platformNameMap = {
      'youtube': 'YouTube Long-form',
      'shorts': 'YouTube Shorts / Reels',
      'reels': 'Instagram Reels',
      'x': 'X Thread',
      'linkedin': 'LinkedIn Post'
    };

    const result = calculateViralityScore(text, platform, niche);

    const newIdea = {
      id: 'idea-' + Date.now(),
      platform: (platform === 'reels' || platform === 'shorts') ? 'shorts' : (platform === 'x' || platform === 'linkedin' ? 'social' : 'youtube'),
      platformName: platformNameMap[platform] || 'YouTube Long-form',
      niche: niche || 'tech-ai',
      nicheName: niche === 'business-money' ? 'Finance & Business' : (niche === 'design-ux' ? 'Design & SaaS' : 'Tech & AI'),
      topic: 'ai-agents',
      topicName: 'AI & Autonomous Agents',
      score: result.score,
      tier: result.tier,
      hook: text,
      tags: ['#Calibrated', '#AIGenerated', '#HighConv'],
      retentionLift: `+${result.curiosity * 3}% retention`,
      retentionNum: result.curiosity * 3,
      velocity: result.score >= 90 ? 'Breakout Tier' : 'High Velocity',
      isHero: false,
      saved: true,
      createdDaysAgo: 0,
      psychValues: [result.curiosity, result.stakes, 85, result.velocity, 90],
      psychTriggers: [
        { name: 'Curiosity Gap', score: `${result.curiosity}%` },
        { name: 'Stakes Index', score: `${result.stakes}%` },
        { name: 'Velocity Index', score: `${result.velocity}%` }
      ],
      thumbnailConcept: 'High-contrast typography preview with neon alert badges & creator facial expression.',
      retentionCurve: [95, 90, 85, 80, 75, 71, 68],
      explanation: 'Newly calibrated hook with high audience retention and curiosity triggers.'
    };

    ideasState.unshift(newIdea);
    updatePillCounts();
    renderGrid();
    closeModal(scorerModal);
    showToast(`"${text.slice(0, 32)}…" saved to Idea Library!`);
  }

  // ================= 9. DETAIL DRAWER =================
  function openDetailDrawer(ideaId) {
    const idea = ideasState.find(i => i.id === ideaId);
    if (!idea) return;

    selectedIdeaForDrawer = idea;

    drawerPlatformTag.innerHTML = `
      <div class="platform-pill ${idea.platform}">
        ${getPlatformIcon(idea.platform)}
        <span>${idea.platformName}</span>
      </div>
    `;

    drawerScoreNum.textContent = idea.score;
    if (idea.score >= 90) {
      drawerScoreBadge.className = 'score-badge-large tier-viral';
      drawerRatingHeadline.textContent = 'Algorithmic Outlier Potential';
      drawerRatingDesc.textContent = 'Extremely high Curiosity Gap + High Stakes narrative creates immediate viewer buy-in during the first 5 seconds.';
    } else if (idea.score >= 70) {
      drawerScoreBadge.className = 'score-badge-large tier-high';
      drawerRatingHeadline.textContent = 'Strong Viral Potential';
      drawerRatingDesc.textContent = 'Well-structured tension and relatable pain points predict above-average watch time and shares.';
    } else {
      drawerScoreBadge.className = 'score-badge-large tier-mid';
      drawerRatingHeadline.textContent = 'Solid Baseline Engagement';
      drawerRatingDesc.textContent = 'Great for core community nurturing and transparent authority building.';
    }

    drawerHookText.textContent = `"${idea.hook}"`;
    drawerRetStat.textContent = idea.retentionLift;
    drawerThumbConcept.textContent = idea.thumbnailConcept;

    if (idea.saved) {
      drawerBookmarkBtn.classList.add('saved');
      drawerBookmarkBtn.innerHTML = '<svg class="lucide lucide-bookmark" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>';
    } else {
      drawerBookmarkBtn.classList.remove('saved');
      drawerBookmarkBtn.innerHTML = '<svg class="lucide lucide-bookmark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>';
    }

    detailDrawer.classList.add('active');
    detailDrawer.setAttribute('aria-hidden', 'false');

    setTimeout(() => {
      updateDrawerCharts(idea);
    }, 150);

    refreshIcons();
  }

  function closeDetailDrawer() {
    detailDrawer.classList.remove('active');
    detailDrawer.setAttribute('aria-hidden', 'true');
    selectedIdeaForDrawer = null;
  }

  function toggleSaveIdea(id) {
    const item = ideasState.find(i => i.id === id);
    if (item) {
      item.saved = !item.saved;
      updatePillCounts();
      renderGrid();
      showToast(item.saved ? 'Added to Saved Swipe Files' : 'Removed from Saved Swipe Files');
    }
  }

  // ================= 10. AUTH & PROFILE HANDLERS =================
  function openAuthGateway(mode = 'signin') {
    authMode = mode;
    if (mode === 'signin') {
      gatewayTabSignin.classList.add('active');
      gatewayTabSignin.setAttribute('aria-selected', 'true');
      gatewayTabSignup.classList.remove('active');
      gatewayTabSignup.setAttribute('aria-selected', 'false');
      gatewayTitleText.textContent = 'Welcome back';
      gatewaySubtitleText.textContent = 'Enter your credentials to access your viral workspace.';
      gatewayGroupName.style.display = 'none';
      gatewaySubmitLabel.textContent = 'Sign In to Dashboard';
    } else {
      gatewayTabSignup.classList.add('active');
      gatewayTabSignup.setAttribute('aria-selected', 'true');
      gatewayTabSignin.classList.remove('active');
      gatewayTabSignin.setAttribute('aria-selected', 'false');
      gatewayTitleText.textContent = 'Create Vantage Account';
      gatewaySubtitleText.textContent = 'Unlock unlimited virality calibration & retention models.';
      gatewayGroupName.style.display = 'flex';
      gatewaySubmitLabel.textContent = 'Create Pro Account';
    }

    fullAuthScreen.classList.add('active');
    fullAuthScreen.setAttribute('aria-hidden', 'false');
    window.location.hash = 'login';
    refreshIcons();

    setTimeout(() => {
      if (mode === 'signup') gatewayInputName.focus();
      else gatewayInputEmail.focus();
    }, 100);
  }

  function closeAuthGateway() {
    fullAuthScreen.classList.remove('active');
    fullAuthScreen.setAttribute('aria-hidden', 'true');
    if (window.location.hash === '#login') {
      history.replaceState(null, null, ' ');
    }
  }

  function handleGatewaySubmit(e) {
    if (e) e.preventDefault();
    const email = gatewayInputEmail.value.trim();
    const password = gatewayInputPassword.value.trim();
    const name = (authMode === 'signup' && gatewayInputName.value.trim()) ? gatewayInputName.value.trim() : (email.split('@')[0] || 'Arka Mondal');

    if (!email || !password) {
      showToast('Please provide both email and password.');
      return;
    }

    btnGatewaySubmit.setAttribute('aria-busy', 'true');
    btnGatewaySubmit.innerHTML = `
      <svg class="live-pulse" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>
      <span>Authenticating Secure Session…</span>
    `;
    btnGatewaySubmit.disabled = true;

    setTimeout(() => {
      saveUserSession({
        id: 'user-' + Date.now(),
        name: name,
        email: email,
        initials: getInitials(name),
        tier: 'PRO CREATOR TIER',
        tierShort: 'PRO',
        niche: 'tech-ai',
        calibrationsCount: 84,
        savedCount: 12,
        isLoggedIn: true
      });

      closeAuthGateway();
      btnGatewaySubmit.removeAttribute('aria-busy');
      btnGatewaySubmit.innerHTML = `<span id="gateway-submit-label">${authMode === 'signup' ? 'Create Pro Account' : 'Sign In to Dashboard'}</span>`;
      btnGatewaySubmit.disabled = false;
      showToast(`Welcome back, ${name}! Logged in successfully.`);
    }, 500);
  }

  function handleInstantDemoLogin() {
    showToast('⚡ Instant Demo Login Triggered…');
    setTimeout(() => {
      saveUserSession({ ...DEFAULT_USER });
      closeAuthGateway();
      showToast('Welcome, Arka Mondal! Authenticated with PRO Creator privileges.');
    }, 350);
  }

  function openProfileModal() {
    modalProfileName.textContent = currentUser.name;
    modalProfileEmail.textContent = currentUser.email;
    modalProfileAvatar.textContent = getInitials(currentUser.name);
    modalProfileTier.textContent = `${currentUser.tier || 'PRO CREATOR TIER'} • ACTIVE`;
    pStatCalibrations.textContent = currentUser.calibrationsCount || 84;
    pStatSaved.textContent = ideasState.filter(i => i.saved).length;
    editProfileName.value = currentUser.name;
    editProfileNiche.value = currentUser.niche || 'tech-ai';
    openModal(profileModal);
  }

  function handleSaveProfile() {
    const newName = editProfileName.value.trim();
    const newNiche = editProfileNiche.value;
    if (!newName) {
      showToast('Please enter a display name.');
      return;
    }

    currentUser.name = newName;
    currentUser.niche = newNiche;
    currentUser.initials = getInitials(newName);
    saveUserSession(currentUser);
    closeModal(profileModal);
    showToast('Creator profile updated successfully!');
  }

  function handleSignOut() {
    saveUserSession({
      id: 'guest',
      name: 'Guest',
      email: '',
      initials: '?',
      tier: 'FREE TIER',
      tierShort: 'FREE',
      isLoggedIn: false
    });
    closeModal(profileModal);
    showToast('Signed out of Vantage session.');
    openAuthGateway('signin');
  }

  // ================= 11. EVENT LISTENERS =================
  function bindEventListeners() {
    // Search input
    searchInputEl.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      clearSearchBtnEl.style.display = searchQuery ? 'flex' : 'none';
      renderGrid();
    });

    clearSearchBtnEl.addEventListener('click', () => {
      searchInputEl.value = '';
      searchQuery = '';
      clearSearchBtnEl.style.display = 'none';
      searchInputEl.focus();
      renderGrid();
    });

    // Topic Menu toggle & filter
    btnTopicMenu.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleTopicDropdown();
    });

    topicFilterInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      document.querySelectorAll('.topic-menu-item').forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(q) ? 'flex' : 'none';
      });
    });

    document.querySelectorAll('.topic-menu-item').forEach(item => {
      item.addEventListener('click', () => {
        const topic = item.getAttribute('data-topic');
        selectTopic(topic);
      });
    });

    // Niche Menu toggle & filter
    btnNicheMenu.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleNicheDropdown();
    });

    document.querySelectorAll('.niche-menu-item').forEach(item => {
      item.addEventListener('click', () => {
        const niche = item.getAttribute('data-niche');
        selectNiche(niche);
      });
    });

    // Click outside to close dropdowns
    document.addEventListener('click', (e) => {
      if (!e.target.closest('#topic-dropdown-anchor')) closeTopicDropdown();
      if (!e.target.closest('#niche-dropdown-anchor')) closeNicheDropdown();
    });

    // Clear all filters button
    btnClearAllFilters.addEventListener('click', () => {
      activeTopic = 'all';
      activeNiche = 'all';
      activeFilter = 'all';
      searchQuery = '';
      searchInputEl.value = '';
      clearSearchBtnEl.style.display = 'none';
      topicMenuLabel.textContent = 'Topics';
      nicheMenuLabel.textContent = 'Niche: All';

      document.querySelectorAll('.topic-menu-item').forEach(i => {
        if (i.getAttribute('data-topic') === 'all') i.classList.add('active');
        else i.classList.remove('active');
      });

      document.querySelectorAll('.niche-menu-item').forEach(i => {
        if (i.getAttribute('data-niche') === 'all') i.classList.add('active');
        else i.classList.remove('active');
      });

      setActiveFilterPill('all');
      showToast('All filters cleared.');
    });

    // Time-range tabs for Area Chart
    chartTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        chartTabBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        currentChartRange = btn.getAttribute('data-range');
        initVelocityAreaChart(currentChartRange);
      });
    });

    // Filter pills
    filterPillsContainer.querySelectorAll('.pill').forEach(pill => {
      pill.addEventListener('click', () => {
        filterPillsContainer.querySelectorAll('.pill').forEach(p => {
          p.classList.remove('active');
          p.setAttribute('aria-selected', 'false');
        });
        pill.classList.add('active');
        pill.setAttribute('aria-selected', 'true');
        activeFilter = pill.getAttribute('data-filter');
        renderGrid();
      });
    });

    // Reset filters button in empty state
    resetFiltersBtn.addEventListener('click', () => {
      btnClearAllFilters.click();
    });

    // Sort select
    sortSelectEl.addEventListener('change', (e) => {
      activeSort = e.target.value;
      renderGrid();
    });

    // View toggle (Bento vs Compact)
    viewBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        viewBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        activeView = btn.getAttribute('data-view');
        if (activeView === 'compact') {
          ideasGridEl.classList.add('compact-view');
        } else {
          ideasGridEl.classList.remove('compact-view');
        }
        renderGrid();
      });
    });

    // Modal Opening
    btnScoreNew.addEventListener('click', () => openModal(scorerModal));
    btnBatchImport.addEventListener('click', () => openModal(batchModal));

    // Nav Item Shortcuts
    document.getElementById('nav-library').addEventListener('click', () => {
      setActiveFilterPill('all');
      showToast('Switched to Idea Library');
    });
    document.getElementById('nav-scorer').addEventListener('click', () => openModal(scorerModal));
    document.getElementById('nav-retention').addEventListener('click', () => {
      setActiveFilterPill('viral');
      showToast('Filtering for Top Retention Outliers');
    });
    document.getElementById('nav-bookmarks').addEventListener('click', () => {
      setActiveFilterPill('saved');
      showToast('Showing Saved Swipe Files');
    });
    document.getElementById('nav-competitor').addEventListener('click', () => openModal(batchModal));
    document.getElementById('nav-settings').addEventListener('click', openProfileModal);

    // Direct Login Triggers
    if (btnHeaderLoginTrigger) {
      btnHeaderLoginTrigger.addEventListener('click', () => openAuthGateway('signin'));
    }
    if (navLoginBtn) {
      navLoginBtn.addEventListener('click', () => openAuthGateway('signin'));
    }

    // Profile & Auth Triggers
    sidebarUserAvatarBtn.addEventListener('click', () => {
      if (currentUser.isLoggedIn) openProfileModal();
      else openAuthGateway('signin');
    });

    // Full Auth Gateway Handlers
    if (btnCloseAuthGateway) btnCloseAuthGateway.addEventListener('click', closeAuthGateway);
    if (btnInstantDemoLogin) btnInstantDemoLogin.addEventListener('click', handleInstantDemoLogin);
    if (btnGatewayExploreGuest) btnGatewayExploreGuest.addEventListener('click', closeAuthGateway);

    if (gatewayTabSignin) gatewayTabSignin.addEventListener('click', () => openAuthGateway('signin'));
    if (gatewayTabSignup) gatewayTabSignup.addEventListener('click', () => openAuthGateway('signup'));

    if (gatewayAuthForm) gatewayAuthForm.addEventListener('submit', handleGatewaySubmit);

    // Social OAuth 1-Click Handlers
    if (btnGatewayGoogle) {
      btnGatewayGoogle.addEventListener('click', () => {
        showToast('Connecting via Google OAuth…');
        setTimeout(() => {
          saveUserSession({
            id: 'user-google-' + Date.now(),
            name: 'Arka Mondal',
            email: 'arka.creator@gmail.com',
            initials: 'AM',
            tier: 'PRO CREATOR TIER',
            tierShort: 'PRO',
            niche: 'tech-ai',
            calibrationsCount: 84,
            savedCount: 12,
            isLoggedIn: true
          });
          closeAuthGateway();
          showToast('Signed in via Google successfully!');
        }, 400);
      });
    }

    if (btnGatewayGithub) {
      btnGatewayGithub.addEventListener('click', () => {
        showToast('Connecting via GitHub OAuth…');
        setTimeout(() => {
          saveUserSession({
            id: 'user-gh-' + Date.now(),
            name: 'Arka Mondal',
            email: 'arkadeb.mondal@example.com',
            initials: 'AM',
            tier: 'PRO CREATOR TIER',
            tierShort: 'PRO',
            niche: 'tech-ai',
            calibrationsCount: 84,
            savedCount: 12,
            isLoggedIn: true
          });
          closeAuthGateway();
          showToast('Signed in via GitHub successfully!');
        }, 400);
      });
    }

    if (gatewayTogglePass) {
      gatewayTogglePass.addEventListener('click', () => {
        const type = gatewayInputPassword.getAttribute('type') === 'password' ? 'text' : 'password';
        gatewayInputPassword.setAttribute('type', type);
      });
    }

    if (gatewayForgotBtn) {
      gatewayForgotBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showToast('Password reset instructions dispatched.');
      });
    }

    // Profile Modal handlers
    closeProfileModalBtn.addEventListener('click', () => closeModal(profileModal));
    btnSaveProfile.addEventListener('click', handleSaveProfile);
    btnSignOut.addEventListener('click', handleSignOut);

    // Scorer & Batch Closures
    closeScorerModalBtn.addEventListener('click', () => closeModal(scorerModal));
    cancelScorerBtn.addEventListener('click', () => closeModal(scorerModal));
    closeBatchModalBtn.addEventListener('click', () => closeModal(batchModal));
    cancelBatchBtn.addEventListener('click', () => closeModal(batchModal));

    // Drawer Closures
    closeDrawerBtn.addEventListener('click', closeDetailDrawer);
    drawerOverlay.addEventListener('click', closeDetailDrawer);

    // Scorer Form Actions
    hookInputField.addEventListener('input', updateCharCount);
    pasteSampleHookBtn.addEventListener('click', () => {
      const samples = [
        "I gave 3 AI agents $1,000 each and let them trade for 30 days — the results broke my model.",
        "Why 99% of creators fail before reaching 10,000 subscribers (and how to fix it in 7 days).",
        "I spent 100 hours auditing MrBeast's first 5 seconds of retention.",
        "The single UX flaw that is killing 80% of your checkout conversions."
      ];
      const random = samples[Math.floor(Math.random() * samples.length)];
      hookInputField.value = random;
      updateCharCount();
      runViralityDiagnostic();
    });

    btnRunAnalysis.addEventListener('click', runViralityDiagnostic);
    saveToLibraryBtn.addEventListener('click', saveCurrentScoredIdea);

    // Batch Import Action
    confirmBatchBtn.addEventListener('click', () => {
      const text = batchInputField.value.trim();
      if (!text) {
        showToast('Please paste at least one hook or competitor link.');
        return;
      }

      const lines = text.split('\n').filter(l => l.trim().length > 0);
      lines.forEach((line, idx) => {
        const cleaned = line.trim().replace(/^https?:\/\/\S+/, 'Reverse engineered competitor viral breakdown');
        const scoreObj = calculateViralityScore(cleaned, 'youtube');
        ideasState.unshift({
          id: 'batch-' + Date.now() + '-' + idx,
          platform: idx % 2 === 0 ? 'youtube' : 'shorts',
          platformName: idx % 2 === 0 ? 'YouTube Long-form' : 'TikTok / Reels',
          niche: 'tech-ai',
          nicheName: 'Tech & AI',
          topic: 'ai-agents',
          topicName: 'AI & Autonomous Agents',
          score: scoreObj.score,
          tier: scoreObj.tier,
          hook: cleaned,
          tags: ['#BatchImported', '#CompetitorSpy'],
          retentionLift: `+${scoreObj.curiosity * 2}% reach`,
          retentionNum: scoreObj.curiosity * 2,
          velocity: 'Batch Calibrated',
          isHero: false,
          saved: false,
          createdDaysAgo: 0,
          psychValues: [scoreObj.curiosity, scoreObj.stakes, 80, scoreObj.velocity, 85],
          psychTriggers: [
            { name: 'Curiosity Gap', score: `${scoreObj.curiosity}%` },
            { name: 'Velocity', score: `${scoreObj.velocity}%` }
          ],
          thumbnailConcept: 'High-contrast split visual with competitor comparative analysis.',
          retentionCurve: [94, 88, 80, 74, 69, 64, 60],
          explanation: 'Imported and calibrated via batch link analyzer.'
        });
      });

      updatePillCounts();
      renderGrid();
      closeModal(batchModal);
      batchInputField.value = '';
      showToast(`Successfully processed & scored ${lines.length} ideas!`);
    });

    // Drawer Actions
    drawerBookmarkBtn.addEventListener('click', () => {
      if (selectedIdeaForDrawer) {
        toggleSaveIdea(selectedIdeaForDrawer.id);
        openDetailDrawer(selectedIdeaForDrawer.id);
      }
    });

    drawerCopyBtn.addEventListener('click', () => {
      if (selectedIdeaForDrawer) copyToClipboard(selectedIdeaForDrawer.hook, "Hook copied to clipboard!");
    });
    drawerCopyBtn2.addEventListener('click', () => {
      if (selectedIdeaForDrawer) copyToClipboard(selectedIdeaForDrawer.hook, "Hook copied to clipboard!");
    });
    drawerExportBtn.addEventListener('click', () => {
      if (selectedIdeaForDrawer) {
        copyToClipboard(selectedIdeaForDrawer.hook);
        showToast('Exported to Script Studio workspace!');
      }
    });

    // Hashchange listener for #login
    window.addEventListener('hashchange', checkHashRoute);

    // Keyboard Shortcuts (⌘K, ⌘L, N, Esc, 1-5)
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputEl.focus();
        searchInputEl.select();
      }

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        openAuthGateway('signin');
      }

      if (e.key.toLowerCase() === 'n' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        openModal(scorerModal);
      }

      if (['1', '2', '3', '4', '5'].includes(e.key) && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        const map = { '1': 'all', '2': 'viral', '3': 'youtube', '4': 'shorts', '5': 'saved' };
        if (map[e.key]) setActiveFilterPill(map[e.key]);
      }

      if (e.key === 'Escape') {
        closeModal(scorerModal);
        closeModal(batchModal);
        closeModal(profileModal);
        closeDetailDrawer();
        closeAuthGateway();
        closeTopicDropdown();
        closeNicheDropdown();
      }
    });
  }

  // ================= 12. HELPERS & ACCESSIBILITY =================
  function setActiveFilterPill(filterKey) {
    activeFilter = filterKey;
    filterPillsContainer.querySelectorAll('.pill').forEach(p => {
      if (p.getAttribute('data-filter') === filterKey) {
        p.classList.add('active');
        p.setAttribute('aria-selected', 'true');
      } else {
        p.classList.remove('active');
        p.setAttribute('aria-selected', 'false');
      }
    });
    renderGrid();
  }

  function updateCharCount() {
    const len = hookInputField.value.length;
    hookCharCount.textContent = `${len} characters • Optimal length: 55-90 chars`;
  }

  function openModal(modalEl) {
    lastFocusedElement = document.activeElement;
    modalEl.classList.add('active');
    modalEl.setAttribute('aria-hidden', 'false');
    if (modalEl === scorerModal) {
      setTimeout(() => hookInputField.focus(), 100);
    }
    refreshIcons();
  }

  function closeModal(modalEl) {
    modalEl.classList.remove('active');
    modalEl.setAttribute('aria-hidden', 'true');
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
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

  function showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg class="toast-icon lucide lucide-check-circle-2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
      <span>${escapeHtml(msg)}</span>
    `;
    toastContainer.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('active');
    });

    setTimeout(() => {
      toast.classList.remove('active');
      setTimeout(() => toast.remove(), 350);
    }, 3200);
  }

  function highlightSearchText(text, query) {
    if (!query || !query.trim()) return escapeHtml(text);
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedQuery})`, 'gi');
    return escapeHtml(text).replace(regex, '<span style="color: #00F59B; text-decoration: underline; background: rgba(0,245,155,0.12); padding: 1px 3px; border-radius: 4px;">$1</span>');
  }

  function getPlatformIcon(platform) {
    if (platform === 'youtube') {
      return '<svg class="lucide" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.6 7.2s-.2-1.5-.8-2.1c-.8-.8-1.7-.8-2.1-.9C15.9 4 12 4 12 4h0s-3.9 0-6.7.2c-.4 0-1.3.1-2.1.9-.6.6-.8 2.1-.8 2.1S2.2 9 2.2 10.7v1.6C2.2 14 2.4 15.8 2.4 15.8s.2 1.5.8 2.1c.8.8 1.9.8 2.3.9 1.7.2 7.2.2 7.2.2s3.9 0 6.7-.2c.4 0 1.3-.1 2.1-.9.6-.6.8-2.1.8-2.1s.2-1.8.2-3.5v-1.6c0-1.7-.2-3.5-.2-3.5zM9.9 14.6V8.9l5.4 2.9-5.4 2.8z"/></svg>';
    } else if (platform === 'shorts') {
      return '<svg class="lucide" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2c2.7 0 3 0 4.1.06 1.1.05 1.8.22 2.4.46.7.27 1.2.6 1.7 1.1.5.5.86 1 1.1 1.7.24.66.4 1.4.46 2.5.05 1.1.06 1.4.06 4.1s0 3-.06 4.1c-.05 1.1-.22 1.8-.46 2.5-.27.7-.6 1.2-1.1 1.7-.5.5-1 .86-1.7 1.1-.66.24-1.4.4-2.5.46-1.1.05-1.4.06-4.1.06s-3 0-4.1-.06c-1.1-.05-1.8-.22-2.5-.46a4.6 4.6 0 0 1-1.7-1.1 4.6 4.6 0 0 1-1.1-1.7c-.24-.66-.4-1.4-.46-2.5C2 15 2 14.7 2 12s0-3 .06-4.1c.05-1.1.22-1.8.46-2.5.27-.7.6-1.2 1.1-1.7.5-.5 1-.86 1.7-1.1.66-.24 1.4-.4 2.5-.46C9 2 9.3 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zm5.4-8.4a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z"/></svg>';
    } else {
      return '<svg class="lucide" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2m1.4 9.74V9.93H5.06v8.57z"/></svg>';
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
