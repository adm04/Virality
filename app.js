/**
 * VANTAGE VIRALITY OS — INTERACTIVE CLIENT APPLICATION
 * Ultra-Modern SaaS Dashboard Logic & Virality Simulation Engine
 */

(function () {
  'use strict';

  // ================= 1. CORE DATASET (CURATED VIRAL HOOKS) =================
  const INITIAL_IDEAS = [
    {
      id: 'idea-1',
      platform: 'youtube',
      platformName: 'YouTube Long-form',
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
      psychTriggers: [
        { name: 'Curiosity Gap', score: '99%' },
        { name: 'High Stakes / Capital', score: '95%' },
        { name: 'Contrast / Conflict', score: '92%' },
        { name: 'Novelty Bias', score: '98%' }
      ],
      thumbnailConcept: 'Split screen: Left side showing red trading model crash graph; right side showing 3 AI terminals with green profit surge.',
      retentionPoints: 'M0,12 Q100,16 200,28 T400,38',
      explanation: 'Unpredictable financial experiment combined with autonomous AI creates intense curiosity and tension in the first 5 seconds.'
    },
    {
      id: 'idea-2',
      platform: 'shorts',
      platformName: 'Instagram Reels',
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
      psychTriggers: [
        { name: 'Information Asymmetry', score: '94%' },
        { name: 'Fear of Regret', score: '89%' },
        { name: 'Specific Number anchor', score: '91%' }
      ],
      thumbnailConcept: 'Close-up grimacing reaction with a redacted Slack contract screenshot glowing in background.',
      retentionPoints: 'M0,15 Q100,22 200,35 T400,48',
      explanation: 'Gatekept knowledge framing triggers immediate FOMO and self-preservation instincts.'
    },
    {
      id: 'idea-3',
      platform: 'shorts',
      platformName: 'TikTok',
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
      psychTriggers: [
        { name: 'Relatability / Catharsis', score: '88%' },
        { name: 'Community In-Joke', score: '84%' }
      ],
      thumbnailConcept: 'Satisfying 4k screen recording zooming into aligned Figma design components with smooth sound design.',
      retentionPoints: 'M0,20 Q100,32 200,48 T400,62',
      explanation: 'Relatable developer/designer suffering paired with a satisfying payoff drives massive share velocity.'
    },
    {
      id: 'idea-4',
      platform: 'social',
      platformName: 'LinkedIn / X',
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
      psychTriggers: [
        { name: 'High Sample Size', score: '93%' },
        { name: 'Predictive Certainty', score: '90%' }
      ],
      thumbnailConcept: 'Carousel graphic comparing red rejected portfolio snippet vs glowing green callback layout.',
      retentionPoints: 'M0,16 Q100,24 200,34 T400,44',
      explanation: 'Credibility established in the first 4 words, followed by an actionable cheat code payoff.'
    },
    {
      id: 'idea-5',
      platform: 'youtube',
      platformName: 'YouTube Long-form',
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
      psychTriggers: [
        { name: 'Contrarian Stance', score: '96%' },
        { name: 'Celebrity/Status Anchor', score: '92%' },
        { name: 'Pattern Interrupt', score: '97%' }
      ],
      thumbnailConcept: 'Split screen: Elon/Jobs routine checklist with massive red X stamps over morning routines.',
      retentionPoints: 'M0,14 Q100,18 200,30 T400,40',
      explanation: 'Attacks widely accepted internet gospel with empirical testing. High controversy drive.'
    },
    {
      id: 'idea-6',
      platform: 'shorts',
      platformName: 'Shorts & Reels',
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
      psychTriggers: [
        { name: 'Economic Arbitrage', score: '91%' },
        { name: 'Low Effort / High Reward', score: '88%' }
      ],
      thumbnailConcept: 'Split macro view: simple keystroke shortcut generating full dynamic auto-layout grid instantly.',
      retentionPoints: 'M0,18 Q100,28 200,42 T400,52',
      explanation: 'Juxtaposing low time investment (10 min) with high economic value ($150/hr).'
    },
    {
      id: 'idea-7',
      platform: 'shorts',
      platformName: 'Instagram Reels',
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
      psychTriggers: [
        { name: 'Conflict / Gossip', score: '95%' },
        { name: 'Ego Validation', score: '91%' }
      ],
      thumbnailConcept: 'Facial expression of subtle disbelief while holding a muted iPhone on speaker.',
      retentionPoints: 'M0,14 Q100,20 200,31 T400,42',
      explanation: 'Validates painful shared creator/freelancer experiences, inspiring immediate debate in comments.'
    },
    {
      id: 'idea-8',
      platform: 'social',
      platformName: 'X Thread / Substack',
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
      psychTriggers: [
        { name: 'Simplicity Bias', score: '89%' },
        { name: 'Quantifiable Proof', score: '86%' }
      ],
      thumbnailConcept: 'Before (14 cluttered fields) vs After (clean 4-step modal) flow chart with neon metrics.',
      retentionPoints: 'M0,19 Q100,30 200,44 T400,56',
      explanation: 'Clear contrast between complex convention and minimalist execution with verified metrics.'
    },
    {
      id: 'idea-9',
      platform: 'youtube',
      platformName: 'YouTube Long-form',
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
      psychTriggers: [
        { name: 'Vulnerability / Trust', score: '82%' },
        { name: 'Voyeurism', score: '78%' }
      ],
      thumbnailConcept: 'Clean Stripe dashboard screenshot with blurred tax deductions and authentic ambient desk shot.',
      retentionPoints: 'M0,25 Q100,40 200,58 T400,75',
      explanation: 'Builds deep trust and high session duration with hardcore fans, though lower broad algorithm breakout.'
    },
    {
      id: 'idea-10',
      platform: 'shorts',
      platformName: 'TikTok / Shorts',
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
      psychTriggers: [
        { name: 'Urgency / Immediate Loss', score: '94%' },
        { name: 'Curiosity on Identity', score: '88%' }
      ],
      thumbnailConcept: 'Warning icon overlaying popular VS code marketplace logo badges with flame graphics.',
      retentionPoints: 'M0,17 Q100,26 200,38 T400,49',
      explanation: 'Loss aversion is twice as powerful as gain; developers immediately want to audit their machine.'
    }
  ];

  // State Management
  let ideasState = [...INITIAL_IDEAS];
  let activeFilter = 'all';
  let searchQuery = '';
  let activeSort = 'score-desc';
  let activeView = 'bento';
  let selectedIdeaForDrawer = null;

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

  // Pill Count Elements
  const countAllEl = document.getElementById('count-all');
  const countViralEl = document.getElementById('count-viral');
  const countYoutubeEl = document.getElementById('count-youtube');
  const countShortsEl = document.getElementById('count-shorts');
  const countSocialEl = document.getElementById('count-social');
  const countSavedEl = document.getElementById('count-saved');

  // Modals & Drawers
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
  const drawerRetArea = document.getElementById('drawer-retention-area');
  const drawerRetPath = document.getElementById('drawer-retention-path');
  const drawerPsychTags = document.getElementById('drawer-psych-tags');
  const drawerThumbConcept = document.getElementById('drawer-thumb-concept');
  const drawerBookmarkBtn = document.getElementById('drawer-bookmark-btn');
  const drawerCopyBtn = document.getElementById('drawer-copy-btn');
  const drawerCopyBtn2 = document.getElementById('drawer-copy-btn-2');
  const drawerExportBtn = document.getElementById('drawer-export-btn');

  // ================= 2. INITIALIZATION =================
  function init() {
    bindEventListeners();
    updatePillCounts();
    renderGrid();
  }

  // ================= 3. RENDERING & FILTERING =================
  function getFilteredAndSortedIdeas() {
    let list = ideasState.filter(item => {
      // Search Matching
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inHook = item.hook.toLowerCase().includes(q);
        const inPlatform = item.platformName.toLowerCase().includes(q);
        const inTags = item.tags.some(t => t.toLowerCase().includes(q));
        const inExplanation = item.explanation && item.explanation.toLowerCase().includes(q);
        if (!inHook && !inPlatform && !inTags && !inExplanation) return false;
      }

      // Filter Pill Matching
      if (activeFilter === 'all') return true;
      if (activeFilter === 'viral') return item.score >= 90;
      if (activeFilter === 'youtube') return item.platform === 'youtube';
      if (activeFilter === 'shorts') return item.platform === 'shorts';
      if (activeFilter === 'social') return item.platform === 'social';
      if (activeFilter === 'saved') return item.saved === true;
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

    if (list.length === 0) {
      ideasGridEl.innerHTML = '';
      ideasGridEl.style.display = 'none';
      emptyStateEl.style.display = 'block';
      return;
    }

    emptyStateEl.style.display = 'none';
    ideasGridEl.style.display = 'grid';

    // Build Cards HTML
    const cardsHtml = list.map((idea, index) => {
      const isSpan2 = (activeView === 'bento' && (idea.isHero || (index === 0 && list.length > 2)));
      const isRow2 = (activeView === 'bento' && idea.isHero);

      const spanClasses = `${isSpan2 ? 'span-2' : ''} ${isRow2 ? 'row-2' : ''}`.trim();
      const scoreTierClass = idea.tier;

      // Platform Icon helper
      const platformIconHtml = getPlatformIcon(idea.platform);

      // Hero wave graphic if applicable
      const heroVisualHtml = (isSpan2 && idea.isHero) ? `
        <div class="hero-visual-graphic">
          <div class="hero-visual-grid"></div>
          <svg class="hero-retention-wave" viewBox="0 0 400 80" preserveAspectRatio="none">
            <path d="M0,15 Q100,18 200,32 T400,42 L400,80 L0,80 Z" fill="rgba(0, 245, 155, 0.12)" />
            <path d="M0,15 Q100,18 200,32 T400,42" fill="none" stroke="#00F59B" stroke-width="2.2" stroke-linecap="round"/>
          </svg>
          <div class="hero-spark-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"/></svg>
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
            <div class="score-badge ${scoreTierClass}">
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
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                <span>${idea.velocity}</span>
              </div>
            </div>

            <div class="card-action-icons" onclick="event.stopPropagation()">
              <button class="action-btn-sm copy-btn" data-hook="${escapeHtml(idea.hook)}" title="Copy Hook to Clipboard">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              </button>
              <button class="action-btn-sm save-btn ${idea.saved ? 'saved' : ''}" data-id="${idea.id}" title="${idea.saved ? 'Remove Bookmark' : 'Bookmark Idea'}">
                <svg viewBox="0 0 24 24" fill="${idea.saved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    ideasGridEl.innerHTML = cardsHtml;

    // Attach card click handlers
    document.querySelectorAll('.idea-card').forEach(cardEl => {
      cardEl.addEventListener('click', () => {
        const id = cardEl.getAttribute('data-id');
        openDetailDrawer(id);
      });
    });

    // Attach copy & bookmark handlers
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

  // ================= 4. VIRALITY SCORING ALGORITHM SIMULATOR =================
  function calculateViralityScore(hookText, platform, niche) {
    if (!hookText || hookText.trim().length === 0) {
      return { score: 0, curiosity: 0, stakes: 0, velocity: 0, tier: 'tier-draft', variations: [] };
    }

    let rawScore = 60;
    const textLower = hookText.toLowerCase();

    // Length analysis (sweet spot: 45 - 95 chars)
    const len = hookText.trim().length;
    if (len >= 45 && len <= 100) rawScore += 12;
    else if (len < 30) rawScore -= 8;

    // Power Trigger Words
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

    // Numbers present in hook?
    if (/\d+/.test(hookText)) {
      rawScore += 6;
      curiosityScore += 5;
      velocityScore += 6;
    }

    // Platform bonus adjustments
    if (platform === 'youtube' && len > 50) rawScore += 4;
    if (platform === 'shorts' && (textLower.includes('pov') || textLower.includes('this') || textLower.includes('you'))) rawScore += 6;

    // Clamp scores
    const finalScore = Math.min(99, Math.max(38, rawScore));
    curiosityScore = Math.min(99, Math.max(40, curiosityScore));
    stakesScore = Math.min(99, Math.max(35, stakesScore));
    velocityScore = Math.min(99, Math.max(45, velocityScore));

    let tier = 'tier-draft';
    if (finalScore >= 90) tier = 'tier-viral';
    else if (finalScore >= 70) tier = 'tier-high';
    else if (finalScore >= 50) tier = 'tier-mid';

    // Generate 3 High-Scoring Variations
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

    // Button loading state
    btnRunAnalysis.innerHTML = `
      <svg class="live-pulse" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>
      <span>Analyzing Neural Virality Signals…</span>
    `;
    btnRunAnalysis.disabled = true;

    setTimeout(() => {
      const result = calculateViralityScore(text, platform, niche);

      // Render Results
      resultScoreNum.textContent = result.score;
      resultScoreLabel.textContent = result.score >= 90 ? '🔥 VIRAL HIT' : (result.score >= 70 ? '⚡ HIGH REACH' : 'CALIBRATED');
      
      // Ring glow colors
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

      // Progress bars
      fillCuriosity.style.width = `${result.curiosity}%`;
      barCuriosity.textContent = `${result.curiosity}%`;
      fillStakes.style.width = `${result.stakes}%`;
      barStakes.textContent = `${result.stakes}%`;
      fillVelocity.style.width = `${result.velocity}%`;
      barVelocity.textContent = `${result.velocity}%`;

      // Render AI Variations
      variationsList.innerHTML = result.variations.map(v => `
        <div class="variation-item" data-text="${escapeHtml(v.text)}" title="Click to apply variation">
          <div class="variation-text">"${v.text}"</div>
          <div class="variation-score-tag">Score ${v.score}</div>
        </div>
      `).join('');
      aiVariationsBox.style.display = 'block';

      // Attach variation click
      document.querySelectorAll('.variation-item').forEach(item => {
        item.addEventListener('click', () => {
          const newText = item.getAttribute('data-text');
          hookInputField.value = newText;
          updateCharCount();
          runViralityDiagnostic();
          showToast('Applied AI variation! Score recalibrated.');
        });
      });

      // Enable Save
      saveToLibraryBtn.disabled = false;
      btnRunAnalysis.innerHTML = `
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/></svg>
        <span>Recalibrate Diagnostics</span>
      `;
      btnRunAnalysis.disabled = false;
    }, 450);
  }

  function saveCurrentScoredIdea() {
    const text = hookInputField.value.trim();
    const platform = platformSelectField.value;
    const platformNameMap = {
      'youtube': 'YouTube Long-form',
      'shorts': 'YouTube Shorts / Reels',
      'reels': 'Instagram Reels',
      'x': 'X Thread',
      'linkedin': 'LinkedIn Post'
    };

    const result = calculateViralityScore(text, platform);

    const newIdea = {
      id: 'idea-' + Date.now(),
      platform: (platform === 'reels' || platform === 'shorts') ? 'shorts' : (platform === 'x' || platform === 'linkedin' ? 'social' : 'youtube'),
      platformName: platformNameMap[platform] || 'YouTube Long-form',
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
      psychTriggers: [
        { name: 'Curiosity Gap', score: `${result.curiosity}%` },
        { name: 'Stakes Index', score: `${result.stakes}%` },
        { name: 'Velocity Index', score: `${result.velocity}%` }
      ],
      thumbnailConcept: 'High-contrast typography preview with neon alert badges & creator facial expression.',
      retentionPoints: 'M0,15 Q100,22 200,34 T400,45',
      explanation: 'Newly calibrated hook with high audience retention and curiosity triggers.'
    };

    // Prepend to state
    ideasState.unshift(newIdea);
    updatePillCounts();
    renderGrid();
    closeModal(scorerModal);
    showToast(`"${text.slice(0, 32)}…" saved to Idea Library! 🔥`);
  }

  // ================= 5. DETAIL DRAWER =================
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
    drawerRetPath.setAttribute('d', idea.retentionPoints || 'M0,15 Q100,20 200,32 T400,45');
    drawerRetArea.setAttribute('d', `${idea.retentionPoints || 'M0,15 Q100,20 200,32 T400,45'} L400,120 L0,120 Z`);

    // Render Psych Triggers
    drawerPsychTags.innerHTML = idea.psychTriggers.map(p => `
      <div class="psych-card-tag">
        <span>${p.name}:</span>
        <strong>${p.score}</strong>
      </div>
    `).join('');

    drawerThumbConcept.textContent = idea.thumbnailConcept;

    // Set bookmark button state
    if (idea.saved) {
      drawerBookmarkBtn.classList.add('saved');
      drawerBookmarkBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>';
    } else {
      drawerBookmarkBtn.classList.remove('saved');
      drawerBookmarkBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>';
    }

    detailDrawer.classList.add('active');
    detailDrawer.setAttribute('aria-hidden', 'false');
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
      showToast(item.saved ? 'Added to Saved Swipe Files ★' : 'Removed from Saved Swipe Files');
    }
  }

  // ================= 6. EVENT LISTENERS =================
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

    // Filter pills
    filterPillsContainer.querySelectorAll('.pill').forEach(pill => {
      pill.addEventListener('click', () => {
        filterPillsContainer.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        activeFilter = pill.getAttribute('data-filter');
        renderGrid();
      });
    });

    // Reset filters button in empty state
    resetFiltersBtn.addEventListener('click', () => {
      searchInputEl.value = '';
      searchQuery = '';
      clearSearchBtnEl.style.display = 'none';
      activeFilter = 'all';
      filterPillsContainer.querySelectorAll('.pill').forEach(p => {
        if (p.getAttribute('data-filter') === 'all') p.classList.add('active');
        else p.classList.remove('active');
      });
      renderGrid();
    });

    // Sort select
    sortSelectEl.addEventListener('change', (e) => {
      activeSort = e.target.value;
      renderGrid();
    });

    // View toggle (Bento vs Compact)
    viewBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        viewBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
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
    document.getElementById('nav-settings').addEventListener('click', () => {
      showToast('Creator Engine Settings: High Precision AI Model Calibrated');
    });

    // Modal Closures
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
          psychTriggers: [
            { name: 'Curiosity Gap', score: `${scoreObj.curiosity}%` },
            { name: 'Velocity', score: `${scoreObj.velocity}%` }
          ],
          thumbnailConcept: 'High-contrast split visual with competitor comparative analysis.',
          retentionPoints: 'M0,16 Q100,24 200,36 T400,48',
          explanation: 'Imported and calibrated via batch link analyzer.'
        });
      });

      updatePillCounts();
      renderGrid();
      closeModal(batchModal);
      batchInputField.value = '';
      showToast(`Successfully processed & scored ${lines.length} ideas! 🚀`);
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
        showToast('🚀 Exported to Script Studio workspace!');
      }
    });

    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
      // ⌘K or Ctrl+K -> Focus Search
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputEl.focus();
        searchInputEl.select();
      }

      // 'N' -> Open Scorer Modal (when not typing in an input)
      if (e.key.toLowerCase() === 'n' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        openModal(scorerModal);
      }

      // Escape -> Close all modals/drawers
      if (e.key === 'Escape') {
        closeModal(scorerModal);
        closeModal(batchModal);
        closeDetailDrawer();
      }
    });
  }

  // ================= 7. HELPERS =================
  function setActiveFilterPill(filterKey) {
    activeFilter = filterKey;
    filterPillsContainer.querySelectorAll('.pill').forEach(p => {
      if (p.getAttribute('data-filter') === filterKey) p.classList.add('active');
      else p.classList.remove('active');
    });
    renderGrid();
  }

  function updateCharCount() {
    const len = hookInputField.value.length;
    hookCharCount.textContent = `${len} characters • Optimal length: 55-90 chars`;
  }

  function openModal(modalEl) {
    modalEl.classList.add('active');
    modalEl.setAttribute('aria-hidden', 'false');
    if (modalEl === scorerModal) {
      setTimeout(() => hookInputField.focus(), 100);
    }
  }

  function closeModal(modalEl) {
    modalEl.classList.remove('active');
    modalEl.setAttribute('aria-hidden', 'true');
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
      <svg class="toast-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
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
      return '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.6 7.2s-.2-1.5-.8-2.1c-.8-.8-1.7-.8-2.1-.9C15.9 4 12 4 12 4h0s-3.9 0-6.7.2c-.4 0-1.3.1-2.1.9-.6.6-.8 2.1-.8 2.1S2.2 9 2.2 10.7v1.6C2.2 14 2.4 15.8 2.4 15.8s.2 1.5.8 2.1c.8.8 1.9.8 2.3.9 1.7.2 7.2.2 7.2.2s3.9 0 6.7-.2c.4 0 1.3-.1 2.1-.9.6-.6.8-2.1.8-2.1s.2-1.8.2-3.5v-1.6c0-1.7-.2-3.5-.2-3.5zM9.9 14.6V8.9l5.4 2.9-5.4 2.8z"/></svg>';
    } else if (platform === 'shorts') {
      return '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c2.7 0 3 0 4.1.06 1.1.05 1.8.22 2.4.46.7.27 1.2.6 1.7 1.1.5.5.86 1 1.1 1.7.24.66.4 1.4.46 2.5.05 1.1.06 1.4.06 4.1s0 3-.06 4.1c-.05 1.1-.22 1.8-.46 2.5-.27.7-.6 1.2-1.1 1.7-.5.5-1 .86-1.7 1.1-.66.24-1.4.4-2.5.46-1.1.05-1.4.06-4.1.06s-3 0-4.1-.06c-1.1-.05-1.8-.22-2.5-.46a4.6 4.6 0 0 1-1.1-1.7 4.6 4.6 0 0 1-1.1-1.7c-.24-.66-.4-1.4-.46-2.5C2 15 2 14.7 2 12s0-3 .06-4.1c.05-1.1.22-1.8.46-2.5.27-.7.6-1.2 1.1-1.7.5-.5 1-.86 1.7-1.1.66-.24 1.4-.4 2.5-.46C9 2 9.3 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zm5.4-8.4a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z"/></svg>';
    } else {
      return '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2m1.4 9.74V9.93H5.06v8.57z"/></svg>';
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

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
