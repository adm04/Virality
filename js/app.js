/**
 * VANTAGE VIRALITY OS V2 — Main Application Controller
 * High-Performance Creator Onboarding, Continuous Trend Radar & 6-Stage Kanban Library.
 */

(function () {
  'use strict';

  // Application State
  let creatorProfile = window.VantageAPI ? window.VantageAPI.loadProfile() : { ...window.VantageConfig.DEFAULT_CREATOR_PROFILE };
  let savedLibrary = window.VantageAPI ? window.VantageAPI.loadLibrary() : [...window.VantageConfig.DEFAULT_LIBRARY_IDEAS];
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

  // ================= 1. INITIALIZATION & CLOCK =================
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

    // Check backend connection in background
    if (window.VantageAPI) {
      window.VantageAPI.checkHealth().then(data => {
        updateBackendStatusUI(!!data, data ? `Connected to ${data.service || 'Backend'} (Port 3000)` : 'Client-Side Offline Mode (LocalStorage Active)');
      });
    }
  }

  function refreshLucideIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      try {
        window.lucide.createIcons();
      } catch (e) {
        console.debug('Lucide icon refresh:', e);
      }
    }
  }

  function getTimeGreeting(now = new Date()) {
    const hour = now.getHours();
    if (hour >= 5 && hour < 12) return 'Good morning';
    if (hour >= 12 && hour < 17) return 'Good afternoon';
    if (hour >= 17 && hour < 22) return 'Good evening';
    return 'Good night';
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

  function updateBackendStatusUI(online, message) {
    const box = document.getElementById('settings-backend-status-box');
    if (box) {
      box.innerHTML = online
        ? `<span style="color: var(--chart-1); font-weight: 700;">● ONLINE</span> — <span>${escapeHtml(message)}</span>`
        : `<span style="color: var(--chart-4); font-weight: 700;">○ OFFLINE</span> — <span>${escapeHtml(message)}</span>`;
    }
  }

  // ================= 2. PERSONA CHIPS =================
  function updateCreatorPersonaChips() {
    const chipsEl = document.getElementById('creator-persona-chips');
    const heroNameEl = document.getElementById('hero-user-name');
    const heroGreetingEl = document.getElementById('hero-greeting');
    const topbarNameEl = document.getElementById('topbar-chip-name');
    const topbarInitialsEl = document.getElementById('topbar-avatar-initials');
    const sidebarInitialsEl = document.getElementById('sidebar-avatar-initials');

    if (heroGreetingEl) heroGreetingEl.textContent = getTimeGreeting();

    const firstName = creatorProfile.name ? creatorProfile.name.split(' ')[0] : 'Arka';
    if (heroNameEl) heroNameEl.textContent = `${firstName}.`;
    if (topbarNameEl) {
      const lastName = creatorProfile.name ? creatorProfile.name.split(' ')[1] : 'Mondal';
      topbarNameEl.textContent = `${firstName} ${lastName ? lastName.charAt(0) + '.' : ''}`;
    }

    const initials = creatorProfile.name
      ? creatorProfile.name.split(' ').map(n => n.charAt(0).toUpperCase()).join('').slice(0, 2)
      : 'AM';
    if (topbarInitialsEl) topbarInitialsEl.textContent = initials;
    if (sidebarInitialsEl) sidebarInitialsEl.textContent = initials;

    const nicheLabels = {
      'ai': 'AI & Tech',
      'technology': 'DevTools',
      'fitness': 'Fitness',
      'finance': 'Finance',
      'business': 'Business',
      'marketing': 'Marketing',
      'design': 'Design & UX',
      'photography': 'Photo & Video',
      'travel': 'Travel & Nomad',
      'food': 'Food & Cooking',
      'fashion': 'Fashion',
      'beauty': 'Beauty',
      'gaming': 'Gaming',
      'education': 'Education',
      'motivation': 'Motivation',
      'relationships': 'Relationships',
      'lifestyle': 'Lifestyle',
      'news': 'News'
    };

    const niches = (creatorProfile.niches && creatorProfile.niches.length > 0)
      ? creatorProfile.niches
      : ['ai', 'technology'];

    const nichesHtml = niches
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

  // ================= 3. SECTION 1: TRENDING FOR YOU =================
  function renderTrendingSection() {
    const container = document.getElementById('trending-cards-container');
    if (!container) return;

    const userNiches = creatorProfile.niches || ['ai', 'technology'];
    const allTrends = window.VantageTrendsData.SEED_TRENDS;

    let trends = allTrends.filter(t => {
      if (activeTrendingPlatform !== 'all' && t.platform !== activeTrendingPlatform) return false;
      if (userNiches.length > 0) return userNiches.includes(t.niche);
      return true;
    });

    if (trends.length === 0) {
      trends = allTrends.filter(t => {
        if (activeTrendingPlatform !== 'all') return t.platform === activeTrendingPlatform;
        return true;
      });
    }

    if (trends.length === 0) trends = allTrends;

    if (!selectedTrendForIdeas && trends.length > 0) {
      selectedTrendForIdeas = trends[0];
    }

    container.innerHTML = trends.map(t => {
      const opp = window.VantageScorer.calculateOpportunityScore(t, creatorProfile);
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
              <svg class="lucide lucide-info" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
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
        openTrendInspector(btn.getAttribute('data-id'));
      });
    });

    container.querySelectorAll('.btn-generate-ideas').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const trend = allTrends.find(t => t.id === btn.getAttribute('data-id'));
        if (trend) {
          selectedTrendForIdeas = trend;
          renderIdeasSection();
          document.getElementById('section-ideas')?.scrollIntoView({ behavior: 'smooth' });
          showToast(`Generated 12 creative angles for "${trend.topic}"`);
        }
      });
    });

    refreshLucideIcons();
  }

  // ================= 4. SECTION 2: IDEAS FOR YOU (12-ANGLE STUDIO) =================
  function renderIdeasSection() {
    const container = document.getElementById('ideas-cards-container');
    const sourceBadgeName = document.getElementById('active-idea-source-name');
    if (!container) return;

    const currentTrend = selectedTrendForIdeas || window.VantageTrendsData.SEED_TRENDS[0];
    if (sourceBadgeName) sourceBadgeName.textContent = currentTrend.topic;

    const ideas = window.VantageTrendsData.generateIdeasForTrend(currentTrend, activeCreativeAngle, creatorProfile);

    if (ideas.length === 0) {
      container.innerHTML = `<div style="grid-column: 1 / -1; padding: 40px 20px; text-align: center; color: var(--text-tertiary);">No ideas found for this angle. Click "All Angles" to view concepts.</div>`;
      return;
    }

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
        copyToClipboard(btn.getAttribute('data-hook'), "Idea Hook copied to clipboard!");
      });
    });

    container.querySelectorAll('.save-to-lib-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        try {
          addIdeaToLibrary(JSON.parse(btn.getAttribute('data-json')));
        } catch (e) {
          console.error('Error saving idea:', e);
        }
      });
    });

    refreshLucideIcons();
  }

  function addIdeaToLibrary(idea) {
    const hookText = idea.hook || idea.title;
    const exists = savedLibrary.some(i => i.hook === hookText || i.title === idea.title);
    if (exists) {
      showToast('This concept is already saved in your Content Library!');
      return;
    }

    const newSaved = {
      id: 'lib-' + Date.now(),
      title: idea.title || hookText.slice(0, 50),
      hook: hookText,
      niche: idea.niche || 'ai',
      platform: idea.format && idea.format.includes('YouTube') && !idea.format.includes('Shorts') ? 'youtube' : 'shorts',
      score: idea.score || 92,
      scoreTier: idea.scoreTier || (idea.score >= 90 ? 'EXPLOSIVE' : 'STRONG'),
      source: idea.trendSource || 'Trend Intelligence',
      stage: idea.stage || 'idea',
      stageName: idea.stageName || 'Ideas',
      createdAt: new Date().toISOString().split('T')[0]
    };

    savedLibrary.unshift(newSaved);
    window.VantageAPI.saveLibrary(savedLibrary);
    renderLibrarySection();
    showToast(`Saved "${newSaved.title.slice(0, 32)}…" to Content Library!`);
  }

  // ================= 5. SECTION 3: SEARCH CONTENT INTELLIGENCE =================
  function renderSearchSection() {
    const grid = document.getElementById('search-results-grid');
    const topicContainer = document.getElementById('topic-items-container');
    const nicheList = document.getElementById('niche-menu-list');
    const activeFiltersBar = document.getElementById('active-filters-bar');
    const activeFiltersList = document.getElementById('active-chips-list') || document.getElementById('active-filters-chips');
    if (!grid) return;

    const allTrends = window.VantageTrendsData.SEED_TRENDS;

    // Populate Dynamic Topic Dropdown Items
    if (topicContainer) {
      const topicSubquery = (document.getElementById('topic-filter-input')?.value || '').toLowerCase().trim();
      const topicOptions = [
        { key: 'all', name: 'All Topics', count: 214 },
        { key: 'AI Autonomous Trading Agents', name: 'AI Autonomous Agents', count: 48 },
        { key: 'Local LLMs on Apple Silicon', name: 'Local LLMs & Hardware', count: 36 },
        { key: 'VS Code Extensions Optimization', name: 'VS Code & DevTools', count: 28 },
        { key: 'Rust vs TypeScript Backend', name: 'Rust vs TypeScript', count: 24 },
        { key: 'Zone 2 Cardio Mythbusting', name: 'Zone 2 Cardio & Health', count: 29 },
        { key: 'High-Yield Cash Arbitrage', name: 'High-Yield Arbitrage', count: 35 },
        { key: 'Solopreneur Micro-SaaS Playbook', name: 'Solopreneur Micro-SaaS', count: 32 },
        { key: 'Lens Compression Tricks', name: 'Photography & Lighting', count: 22 },
        { key: 'Short-Form Retention Hijacking', name: 'Viral Hook Retention', count: 41 },
        { key: 'Neo-Glassmorphism UI Systems', name: 'UI & Design Systems', count: 19 },
        { key: 'Digital Nomad Tax Havens 2026', name: 'Digital Nomad Mobility', count: 27 }
      ];

      const filteredTopics = topicOptions.filter(t => !topicSubquery || t.name.toLowerCase().includes(topicSubquery));

      topicContainer.innerHTML = filteredTopics.map(item => `
        <button class="topic-menu-item ${activeTopicFilter === item.key ? 'active' : ''}" data-topic="${item.key}">
          <span class="topic-item-name">${item.name}</span>
          <span class="topic-count">${item.count}</span>
        </button>
      `).join('');

      topicContainer.querySelectorAll('.topic-menu-item').forEach(item => {
        item.addEventListener('click', () => {
          activeTopicFilter = item.getAttribute('data-topic');
          const lbl = item.querySelector('.topic-item-name').textContent;
          document.getElementById('topic-menu-label').textContent = activeTopicFilter === 'all' ? 'Topics' : lbl;
          document.getElementById('topic-search-dropdown')?.classList.remove('show');
          renderSearchSection();
        });
      });
    }

    // Populate Dynamic Niche Dropdown Items
    if (nicheList) {
      const nicheItems = [
        { key: 'all', name: 'All Niches', meta: 'Broad audience cross-pollination', badge: 'Global' },
        { key: 'ai', name: 'AI & Autonomous Agents', meta: '82% Median 30s Retention', badge: 'AI' },
        { key: 'technology', name: 'Tech & DevTools', meta: '74% Median 30s Retention', badge: 'Tech' },
        { key: 'fitness', name: 'Fitness & Health', meta: '84% Median 30s Retention', badge: 'Fitness' },
        { key: 'finance', name: 'Finance & Crypto', meta: '88% Median 30s Retention', badge: 'Finance' },
        { key: 'business', name: 'Business & Startups', meta: '81% Median 30s Retention', badge: 'Business' },
        { key: 'marketing', name: 'Marketing & Growth', meta: '85% Median 30s Retention', badge: 'Growth' },
        { key: 'design', name: 'Design & UI/UX', meta: '78% Median 30s Retention', badge: 'Design' },
        { key: 'photography', name: 'Photography & Video', meta: '76% Median 30s Retention', badge: 'Photo' },
        { key: 'travel', name: 'Travel & Nomad', meta: '80% Median 30s Retention', badge: 'Travel' }
      ];

      nicheList.innerHTML = nicheItems.map(item => `
        <button class="niche-menu-item ${activeNicheFilter === item.key ? 'active' : ''}" data-niche="${item.key}">
          <div class="niche-item-info">
            <span class="niche-name">${item.name}</span>
            <span class="niche-meta">${item.meta}</span>
          </div>
          <span class="niche-badge-pill">${item.badge}</span>
        </button>
      `).join('');

      nicheList.querySelectorAll('.niche-menu-item').forEach(item => {
        item.addEventListener('click', () => {
          activeNicheFilter = item.getAttribute('data-niche');
          document.getElementById('niche-menu-label').textContent = activeNicheFilter === 'all' ? 'Niche: All' : `Niche: ${activeNicheFilter.toUpperCase()}`;
          document.getElementById('niche-search-dropdown')?.classList.remove('show');
          renderSearchSection();
        });
      });
    }

    // Update Active Filters Chips Bar
    const hasActiveFilters = searchQuery.trim() || activeTopicFilter !== 'all' || activeNicheFilter !== 'all';
    if (activeFiltersBar) {
      activeFiltersBar.style.display = hasActiveFilters ? 'flex' : 'none';
    }

    if (activeFiltersList) {
      let chipsHtml = '';
      if (searchQuery.trim()) {
        chipsHtml += `<span class="active-chip-pill">Query: "${escapeHtml(searchQuery)}" <button type="button" class="btn-text remove-filter-chip" data-type="query">&times;</button></span>`;
      }
      if (activeTopicFilter !== 'all') {
        chipsHtml += `<span class="active-chip-pill">Topic: ${escapeHtml(activeTopicFilter)} <button type="button" class="btn-text remove-filter-chip" data-type="topic">&times;</button></span>`;
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
            const inp = document.getElementById('global-search-input');
            if (inp) inp.value = '';
            const clr = document.getElementById('clear-search-btn');
            if (clr) clr.style.display = 'none';
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

    let results = allTrends.filter(item => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inTopic = item.topic.toLowerCase().includes(q);
        const inTitle = item.title.toLowerCase().includes(q);
        const inTags = item.tags.some(t => t.toLowerCase().includes(q));
        if (!inTopic && !inTitle && !inTags) return false;
      }
      if (activeTopicFilter !== 'all' && item.topic !== activeTopicFilter) return false;
      if (activeNicheFilter !== 'all' && item.niche !== activeNicheFilter) return false;
      return true;
    });

    if (results.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 48px 24px; text-align: center; background: #FFFFFF; border: var(--border-ultra-thin); border-radius: var(--radius-xl);">
          <div style="font-size: 16px; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">No trends match current filters</div>
          <p style="font-size: 12.5px; color: var(--text-tertiary); margin-bottom: 16px;">Try adjusting your query or resetting topic & niche filters.</p>
          <button class="btn btn-secondary btn-sm" id="btn-empty-reset-filters" type="button">Reset All Filters</button>
        </div>
      `;
      document.getElementById('btn-empty-reset-filters')?.addEventListener('click', () => {
        searchQuery = '';
        activeTopicFilter = 'all';
        activeNicheFilter = 'all';
        const inp = document.getElementById('global-search-input');
        if (inp) inp.value = '';
        const clr = document.getElementById('clear-search-btn');
        if (clr) clr.style.display = 'none';
        document.getElementById('topic-menu-label').textContent = 'Topics';
        document.getElementById('niche-menu-label').textContent = 'Niche: All';
        renderSearchSection();
      });
      return;
    }

    grid.innerHTML = results.map(t => {
      const opp = window.VantageScorer.calculateOpportunityScore(t, creatorProfile);
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

  // ================= 6. SECTION 4: PRODUCTION KANBAN & LIST SYSTEM =================
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
            ${filteredItems.length === 0 ? `<tr><td colspan="6" style="text-align: center; color: var(--text-tertiary); padding: 32px 16px;">No ideas in this stage yet. Click "New Idea" or "Score New Hook" to add!</td></tr>` : ''}
            ${filteredItems.map(item => `
              <tr>
                <td>
                  <strong style="display: block; font-size: 13.5px; margin-bottom: 2px;">"${escapeHtml(item.hook || item.title)}"</strong>
                  <span style="font-size: 11px; color: var(--text-tertiary);">${escapeHtml(item.source || 'Idea')} &bull; Niche: ${item.niche ? item.niche.toUpperCase() : 'AI'}</span>
                </td>
                <td><span class="opp-score-badge tier-explosive" style="width: 38px; height: 38px;"><span class="opp-score-num" style="font-size: 15px;">${item.score || 90}</span></span></td>
                <td><span class="platform-pill ${item.platform}">${item.platform ? item.platform.toUpperCase() : 'SHORTS'}</span></td>
                <td><span class="lib-stage-badge">${item.stageName || (item.stage ? item.stage.charAt(0).toUpperCase() + item.stage.slice(1) : 'Ideas')}</span></td>
                <td><span style="font-family: var(--font-mono); font-size: 11px; color: var(--text-tertiary);">${item.createdAt || 'Today'}</span></td>
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
                    <button class="btn-lib-del" data-id="${item.id}" title="Delete Idea" aria-label="Delete Idea">
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
                      <button class="btn-lib-del" data-id="${item.id}" title="Delete Idea" aria-label="Delete Idea">
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
          window.VantageAPI.saveLibrary(savedLibrary);
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
        window.VantageAPI.saveLibrary(savedLibrary);
        renderLibrarySection();
        showToast('Idea removed from Content Library.');
      });
    });

    refreshLucideIcons();
  }

  // ================= 7. ONBOARDING WIZARD CONTROLLER =================
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
    document.querySelectorAll('#grid-content-types .onboard-tag-btn').forEach(b => {
      const val = b.getAttribute('data-value');
      b.classList.toggle('selected', (creatorProfile.content_types || []).includes(val));
    });

    document.querySelectorAll('#grid-niches .onboard-tag-btn').forEach(b => {
      const val = b.getAttribute('data-value');
      b.classList.toggle('selected', (creatorProfile.niches || []).includes(val));
    });

    if (document.getElementById('onboard-age-range')) document.getElementById('onboard-age-range').value = creatorProfile.age_range || '18-34';
    if (document.getElementById('onboard-country')) document.getElementById('onboard-country').value = creatorProfile.country || 'India';
    if (document.getElementById('onboard-language')) document.getElementById('onboard-language').value = creatorProfile.language || 'English';
    if (document.getElementById('onboard-audience-desc')) document.getElementById('onboard-audience-desc').value = creatorProfile.audience_description || '';

    document.querySelectorAll('#grid-goals .goal-card').forEach(c => {
      const val = c.getAttribute('data-value');
      c.classList.toggle('selected', (creatorProfile.goals || 'views') === val);
    });

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
    if (sumStyles) sumStyles.textContent = selStyles.slice(0, 4).join(', ') || 'Trending & Storytelling';
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

    window.VantageAPI.saveProfile(creatorProfile);
    updateCreatorPersonaChips();
    renderTrendingSection();
    renderIdeasSection();
    renderSearchSection();
    closeOnboardingModal();
    showToast('Creator intelligence calibrated! Displaying personalized opportunities.');
  }

  // ================= 8. TREND INSPECTOR DRAWER =================
  function openTrendInspector(trendId) {
    const trend = window.VantageTrendsData.SEED_TRENDS.find(t => t.id === trendId);
    if (!trend) return;

    selectedTrendForInspector = trend;
    const opp = window.VantageScorer.calculateOpportunityScore(trend, creatorProfile);

    document.getElementById('inspector-score-num').textContent = opp.score;
    document.getElementById('inspector-score-sub').textContent = opp.tier;
    document.getElementById('inspector-outlier-pill').textContent = trend.outlierText;
    document.getElementById('inspector-topic-title').textContent = trend.topic;
    document.getElementById('inspector-topic-desc').textContent = `High-velocity breakout trend in ${trend.nicheName} with ${trend.views} views and ${trend.engagementRate} engagement rate.`;

    const platformTag = document.getElementById('inspector-platform-tag');
    if (platformTag) {
      platformTag.innerHTML = `<span class="platform-pill ${trend.platform}">${trend.platformName}</span>`;
    }

    // Update 7 Signals
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

  // ================= 9. SETTINGS MODAL =================
  function openSettingsModal() {
    const modal = document.getElementById('settings-modal');
    if (!modal) return;

    if (document.getElementById('settings-user-name')) document.getElementById('settings-user-name').value = creatorProfile.name || '';
    if (document.getElementById('settings-user-email')) document.getElementById('settings-user-email').value = creatorProfile.email || '';
    if (document.getElementById('settings-audience-bio')) document.getElementById('settings-audience-bio').value = creatorProfile.audience_description || '';

    if (window.VantageAPI) {
      window.VantageAPI.checkHealth().then(data => {
        updateBackendStatusUI(!!data, data ? `Connected to ${data.service || 'Backend'} (Port 3000)` : 'Client-Side Offline Mode (LocalStorage Active)');
      });
    }

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

  // ================= 10. EVENT LISTENERS =================
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
        activeCreativeAngle = chip.getAttribute('data-angle') || 'all';
        renderIdeasSection();
      });
    });

    // Library Stage Filter Tabs
    document.querySelectorAll('#library-stage-filters .stage-tab, #library-stage-tabs .stage-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        activeLibraryStage = tab.getAttribute('data-stage') || 'all';
        renderLibrarySection();
      });
    });

    // Library View Switcher (Kanban vs List)
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

    // Quick Add Idea Button in Library
    const quickAddBtn = document.getElementById('btn-quick-add-idea');
    if (quickAddBtn) {
      quickAddBtn.addEventListener('click', () => {
        const title = prompt('Enter your new content idea or title:');
        if (title && title.trim()) {
          addIdeaToLibrary({
            title: title.trim(),
            hook: title.trim(),
            niche: (creatorProfile.niches && creatorProfile.niches[0]) || 'ai',
            format: 'YouTube Shorts (9:16)',
            score: 91,
            scoreTier: 'EXPLOSIVE',
            trendSource: 'Manual Custom Entry'
          });
        }
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
        window.VantageAPI.saveProfile(creatorProfile);
        closeOnboardingModal();
        showToast('Onboarding skipped. You can calibrate anytime from Profile.');
      });
    }

    // Edit Preferences trigger
    const editPrefBtn = document.getElementById('btn-edit-onboarding');
    if (editPrefBtn) editPrefBtn.addEventListener('click', openOnboardingModal);

    const navOnboardingBtn = document.getElementById('nav-onboarding-trigger');
    if (navOnboardingBtn) navOnboardingBtn.addEventListener('click', openOnboardingModal);

    // Settings Modal Triggers
    const navSettingsBtn = document.getElementById('nav-settings');
    if (navSettingsBtn) navSettingsBtn.addEventListener('click', openSettingsModal);

    const closeSettingsBtn = document.getElementById('close-settings-modal');
    const cancelSettingsBtn = document.getElementById('cancel-settings-btn');
    if (closeSettingsBtn) closeSettingsBtn.addEventListener('click', closeSettingsModal);
    if (cancelSettingsBtn) cancelSettingsBtn.addEventListener('click', closeSettingsModal);

    // Settings Tabs
    document.querySelectorAll('.settings-tab-btn').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.settings-tab-btn').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.settings-pane').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        const paneId = `settings-pane-${tab.getAttribute('data-tab')}`;
        document.getElementById(paneId)?.classList.add('active');
      });
    });

    // Save Settings Profile
    const saveSettingsProfileBtn = document.getElementById('btn-save-settings-profile');
    if (saveSettingsProfileBtn) {
      saveSettingsProfileBtn.addEventListener('click', () => {
        const nameVal = document.getElementById('settings-user-name')?.value.trim();
        const emailVal = document.getElementById('settings-user-email')?.value.trim();
        const bioVal = document.getElementById('settings-audience-bio')?.value.trim();
        if (nameVal) creatorProfile.name = nameVal;
        if (emailVal) creatorProfile.email = emailVal;
        if (bioVal) creatorProfile.audience_description = bioVal;
        window.VantageAPI.saveProfile(creatorProfile);
        updateCreatorPersonaChips();
        closeSettingsModal();
        showToast('Creator profile updated successfully!');
      });
    }

    // Test Backend Button
    const testBackendBtn = document.getElementById('btn-test-backend-connection');
    if (testBackendBtn) {
      testBackendBtn.addEventListener('click', async () => {
        testBackendBtn.setAttribute('aria-busy', 'true');
        const data = await window.VantageAPI.checkHealth();
        testBackendBtn.removeAttribute('aria-busy');
        updateBackendStatusUI(!!data, data ? `Connected to ${data.service || 'Backend'} (Port 3000)` : 'Local server offline. Using client-side storage.');
        showToast(data ? 'Connected to local server on port 3000!' : 'Local server offline. Using client-side storage.');
      });
    }

    // Sync All Data to Backend
    const syncAllBtn = document.getElementById('btn-sync-all-data');
    if (syncAllBtn) {
      syncAllBtn.addEventListener('click', async () => {
        await window.VantageAPI.saveProfile(creatorProfile);
        await window.VantageAPI.saveLibrary(savedLibrary);
        showToast('All creator data synced with backend server!');
      });
    }

    // Export Library JSON
    const exportJsonBtn = document.getElementById('btn-export-library-json');
    if (exportJsonBtn) {
      exportJsonBtn.addEventListener('click', () => {
        const payload = {
          version: '2.0.0',
          exported_at: new Date().toISOString(),
          profile: creatorProfile,
          library: savedLibrary
        };
        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `vantage_content_backup_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        showToast('Exported Vantage workspace JSON file!');
      });
    }

    // Import Library JSON
    const importJsonBtn = document.getElementById('btn-import-library-json');
    const importFileInput = document.getElementById('import-json-file-input');
    if (importJsonBtn && importFileInput) {
      importJsonBtn.addEventListener('click', () => importFileInput.click());
      importFileInput.addEventListener('change', (e) => {
        const file = e.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (ev) => {
            try {
              const data = JSON.parse(ev.target.result);
              if (data.library && Array.isArray(data.library)) {
                savedLibrary = data.library;
                window.VantageAPI.saveLibrary(savedLibrary);
                renderLibrarySection();
              }
              if (data.profile) {
                creatorProfile = { ...creatorProfile, ...data.profile };
                window.VantageAPI.saveProfile(creatorProfile);
                updateCreatorPersonaChips();
                renderTrendingSection();
                renderIdeasSection();
                renderSearchSection();
              }
              closeSettingsModal();
              showToast('Successfully imported workspace backup!');
            } catch (err) {
              showToast('Error: Invalid JSON backup file.');
            }
          };
          reader.readAsText(file);
        }
      });
    }

    // Reset Data
    const resetAllBtn = document.getElementById('btn-reset-all-data');
    if (resetAllBtn) {
      resetAllBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset all data back to original defaults?')) {
          localStorage.removeItem(window.VantageConfig.STORAGE_KEY_PROFILE);
          localStorage.removeItem(window.VantageConfig.STORAGE_KEY_LIBRARY);
          creatorProfile = { ...window.VantageConfig.DEFAULT_CREATOR_PROFILE };
          savedLibrary = [...window.VantageConfig.DEFAULT_LIBRARY_IDEAS];
          window.VantageAPI.saveProfile(creatorProfile);
          window.VantageAPI.saveLibrary(savedLibrary);
          updateCreatorPersonaChips();
          renderTrendingSection();
          renderIdeasSection();
          renderSearchSection();
          renderLibrarySection();
          closeSettingsModal();
          showToast('Workspace reset to original demo defaults.');
        }
      });
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
          window.VantageTrendsData.SEED_TRENDS.forEach(t => {
            t.momentum = Math.min(99, Math.max(70, t.momentum + Math.floor(Math.random() * 5) - 2));
          });
          renderTrendingSection();
          renderIdeasSection();
          showToast('24/7 Trend Radar refreshed! 8 signals synchronized with live telemetry.');
          refreshLucideIcons();
        }, 500);
      });
    }

    // Inspector Drawer closures & bookmarking
    const closeInspBtn = document.getElementById('close-inspector-btn');
    const closeInspBtn2 = document.getElementById('btn-inspector-close');
    const inspOverlay = document.getElementById('trend-drawer-overlay');
    if (closeInspBtn) closeInspBtn.addEventListener('click', closeTrendInspector);
    if (closeInspBtn2) closeInspBtn2.addEventListener('click', closeTrendInspector);
    if (inspOverlay) inspOverlay.addEventListener('click', closeTrendInspector);

    const inspBookmarkBtn = document.getElementById('inspector-bookmark-btn');
    if (inspBookmarkBtn) {
      inspBookmarkBtn.addEventListener('click', () => {
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
    }

    const inspGenBtn = document.getElementById('btn-inspector-generate-ideas');
    if (inspGenBtn) {
      inspGenBtn.addEventListener('click', () => {
        closeTrendInspector();
        if (selectedTrendForInspector) {
          selectedTrendForIdeas = selectedTrendForInspector;
          renderIdeasSection();
          document.getElementById('section-ideas')?.scrollIntoView({ behavior: 'smooth' });
          showToast(`Generated 12 creative angles for "${selectedTrendForInspector.topic}"`);
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
        if (searchInput) searchInput.value = '';
        searchQuery = '';
        clearSearchBtn.style.display = 'none';
        renderSearchSection();
      });
    }

    // Subsearch in Topic Popover
    const topicSubsearchInput = document.getElementById('topic-filter-input');
    if (topicSubsearchInput) {
      topicSubsearchInput.addEventListener('input', () => {
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

    if (navTrending) navTrending.addEventListener('click', () => document.getElementById('section-trending')?.scrollIntoView({ behavior: 'smooth' }));
    if (navIdeas) navIdeas.addEventListener('click', () => document.getElementById('section-ideas')?.scrollIntoView({ behavior: 'smooth' }));
    if (navSearch) navSearch.addEventListener('click', () => document.getElementById('section-search')?.scrollIntoView({ behavior: 'smooth' }));
    if (navLibrary) navLibrary.addEventListener('click', () => document.getElementById('section-library')?.scrollIntoView({ behavior: 'smooth' }));

    // Dropdown triggers
    const btnTopicMenu = document.getElementById('btn-topic-menu');
    const topicDropdown = document.getElementById('topic-search-dropdown');
    if (btnTopicMenu && topicDropdown) {
      btnTopicMenu.addEventListener('click', (e) => {
        e.stopPropagation();
        topicDropdown.classList.toggle('show');
        document.getElementById('niche-search-dropdown')?.classList.remove('show');
      });
    }

    const btnNicheMenu = document.getElementById('btn-niche-menu');
    const nicheDropdown = document.getElementById('niche-search-dropdown');
    if (btnNicheMenu && nicheDropdown) {
      btnNicheMenu.addEventListener('click', (e) => {
        e.stopPropagation();
        nicheDropdown.classList.toggle('show');
        document.getElementById('topic-search-dropdown')?.classList.remove('show');
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

    // Backdrop click dismiss for all modals
    const onboardingModal = document.getElementById('onboarding-modal');
    if (onboardingModal) {
      onboardingModal.addEventListener('click', (e) => {
        if (e.target === onboardingModal) closeOnboardingModal();
      });
    }

    const settingsModal = document.getElementById('settings-modal');
    if (settingsModal) {
      settingsModal.addEventListener('click', (e) => {
        if (e.target === settingsModal) closeSettingsModal();
      });
    }

    if (authScreen) {
      authScreen.addEventListener('click', (e) => {
        if (e.target === authScreen) closeAuth();
      });
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

    if (scorerModal) {
      scorerModal.addEventListener('click', (e) => {
        if (e.target === scorerModal) closeScorer();
      });
    }
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
        hookInputField.value = window.VantageConfig.SAMPLE_HOOKS[sampleHookIndex % window.VantageConfig.SAMPLE_HOOKS.length];
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

        const evaluation = window.VantageScorer.evaluateHookText(text);

        const resultNumEl = document.getElementById('result-score-num');
        const resultLabelEl = document.getElementById('result-score-label');
        if (resultNumEl) resultNumEl.textContent = evaluation.score;
        if (resultLabelEl) resultLabelEl.textContent = evaluation.tier;

        if (document.getElementById('bar-curiosity')) document.getElementById('bar-curiosity').textContent = `${evaluation.curiosity}%`;
        if (document.getElementById('fill-curiosity')) document.getElementById('fill-curiosity').style.width = `${evaluation.curiosity}%`;

        if (document.getElementById('bar-stakes')) document.getElementById('bar-stakes').textContent = `${evaluation.stakes}%`;
        if (document.getElementById('fill-stakes')) document.getElementById('fill-stakes').style.width = `${evaluation.stakes}%`;

        if (document.getElementById('bar-velocity')) document.getElementById('bar-velocity').textContent = `${evaluation.velocity}%`;
        if (document.getElementById('fill-velocity')) document.getElementById('fill-velocity').style.width = `${evaluation.velocity}%`;

        if (saveToLibScorerBtn) {
          saveToLibScorerBtn.removeAttribute('disabled');
          saveToLibScorerBtn.onclick = () => {
            const nicheField = document.getElementById('niche-select-field');
            const platformField = document.getElementById('platform-select-field');
            addIdeaToLibrary({
              title: text.slice(0, 55),
              hook: text,
              niche: nicheField ? nicheField.value : 'ai',
              format: platformField ? platformField.options[platformField.selectedIndex].text : 'YouTube Shorts',
              score: evaluation.score,
              scoreTier: evaluation.tier,
              trendSource: 'AI Virality Scorer Diagnostic'
            });
            closeScorer();
            document.getElementById('section-library')?.scrollIntoView({ behavior: 'smooth' });
          };
        }

        showToast(`Diagnostic Complete: Score ${evaluation.score}/100!`);
      });
    }

    // Global Keybindings
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeAuth();
        closeScorer();
        closeTrendInspector();
        closeOnboardingModal();
        closeSettingsModal();
      } else if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('section-search')?.scrollIntoView({ behavior: 'smooth' });
        if (searchInput) searchInput.focus();
      } else if (!['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
        if (e.key === 'n' || e.key === 'N') {
          e.preventDefault();
          openScorer();
        } else if (e.key === 's' || e.key === 'S') {
          e.preventDefault();
          syncBtn?.click();
        } else if (e.key === '/') {
          e.preventDefault();
          document.getElementById('section-search')?.scrollIntoView({ behavior: 'smooth' });
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

  // ================= 11. UTILITIES =================
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

  // Global helper object for inline HTML event handlers
  window.vantageApp = {
    openInspector: openTrendInspector,
    openOnboarding: openOnboardingModal,
    openSettings: openSettingsModal,
    addIdea: addIdeaToLibrary,
    copyHook: copyToClipboard
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
