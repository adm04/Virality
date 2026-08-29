/**
 * VANTAGE VIRALITY OS — Trends Dataset & 12 Creative Angles Studio Generator
 */

const VantageTrendsData = {
  SEED_TRENDS: [
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
    },
    {
      id: 'trend-marketing-1',
      topic: 'Short-Form Retention Hijacking',
      title: 'The 3-second visual pattern interrupt that gave me 4.2M views',
      niche: 'marketing',
      nicheName: 'Marketing & Growth',
      platform: 'shorts',
      platformName: 'Shorts / Reels',
      status: 'exploding',
      statusLabel: 'EXPLODING',
      outlierMultiplier: '8.9×',
      outlierText: '8.9× above channel baseline',
      views: '510K',
      viewsNum: 510000,
      engagementRate: '14.2%',
      momentum: 95,
      searchDemand: 92,
      outlierScore: 96,
      freshness: 91,
      competition: 79,
      relevance: 88,
      whyTrending: [
        'High demand for actionable editing retention frameworks',
        'Direct breakdown of algorithm swipe-away metrics'
      ],
      tags: ['#Retention', '#ViralHooks', '#ShortForm', '#Growth']
    },
    {
      id: 'trend-design-1',
      topic: 'Neo-Glassmorphism UI Systems',
      title: 'Why ultra-clean border highlights make dashboards look $100k more expensive',
      niche: 'design',
      nicheName: 'Design & UI/UX',
      platform: 'youtube',
      platformName: 'YouTube Long-form',
      status: 'hot',
      statusLabel: 'HOT',
      outlierMultiplier: '5.2×',
      outlierText: '5.2× above channel baseline',
      views: '198K',
      viewsNum: 198000,
      engagementRate: '10.8%',
      momentum: 85,
      searchDemand: 80,
      outlierScore: 88,
      freshness: 86,
      competition: 62,
      relevance: 84,
      whyTrending: [
        'SaaS founders actively copying linear/shadcn aesthetic design systems',
        'High bookmark and share count among UI engineers'
      ],
      tags: ['#UIDesign', '#Figma', '#WebDesign', '#DesignSystem']
    },
    {
      id: 'trend-travel-1',
      topic: 'Digital Nomad Tax Havens 2026',
      title: 'Countries paying remote workers $2,000/mo to relocate this year',
      niche: 'travel',
      nicheName: 'Travel & Adventure',
      platform: 'shorts',
      platformName: 'Shorts / Reels',
      status: 'exploding',
      statusLabel: 'EXPLODING',
      outlierMultiplier: '7.1×',
      outlierText: '7.1× above channel baseline',
      views: '670K',
      viewsNum: 670000,
      engagementRate: '12.0%',
      momentum: 92,
      searchDemand: 93,
      outlierScore: 94,
      freshness: 87,
      competition: 71,
      relevance: 80,
      whyTrending: [
        'Massive interest in global mobility and nomad visas',
        'High share rate directly into group chats and bookmarks'
      ],
      tags: ['#DigitalNomad', '#RemoteWork', '#TravelHacks', '#Expat']
    }
  ],

  generateIdeasForTrend(trend, angleFilter, profile) {
    const audienceDesc = (profile && profile.audience_description) || 'Young professionals and creators';
    const country = (profile && profile.country) || 'Global';
    const topic = trend.topic;
    const lowerTopic = trend.topic.toLowerCase();

    const angleTemplates = [
      {
        angle: 'educational',
        angleName: 'Educational',
        title: `The Comprehensive Architecture of ${topic}`,
        hook: `Everything engineers get wrong about ${lowerTopic} explained in 4 minutes.`,
        format: 'YouTube Long-form (16:9)',
        audience: `${audienceDesc} in ${country}`,
        whyWorks: 'Deep-dive technical authority builds subscriber loyalty and high session watch time.',
        structure: '0-5s Myth Hook ➔ 5-25s Blueprint ➔ 25-60s Live Demonstration ➔ Outro CTA',
        cta: 'Download the free open-source checklist in the description.'
      },
      {
        angle: 'controversial',
        angleName: 'Controversial',
        title: `Why ${topic} Is Actually a Disaster for 90% of Creators`,
        hook: `Nobody is willing to say this out loud about ${lowerTopic}, but here is the truth.`,
        format: 'Instagram Reels / Shorts (9:16)',
        audience: `${audienceDesc}`,
        whyWorks: 'Attacking consensus triggers immediate debate in comments and algorithm amplification.',
        structure: '0-3s Pattern Interrupt ➔ 3-15s Contrarian Proof ➔ 15-30s The Hidden Trap ➔ Save Hook',
        cta: 'Comment your take below: do you agree or disagree?'
      },
      {
        angle: 'storytelling',
        angleName: 'Storytelling',
        title: `I Spent 30 Days Testing ${topic} (Here Is What Happened)`,
        hook: `I poured 100 hours into testing ${lowerTopic} — and it completely broke my assumptions.`,
        format: 'YouTube Long-form (16:9)',
        audience: `${audienceDesc}`,
        whyWorks: 'First-person experimental narrative creates irresistible tension and viewer empathy.',
        structure: '0-7s The Bet / Stakes ➔ 7-30s Early Failures ➔ 30-50s The Breakthrough ➔ Final Verdict',
        cta: 'Subscribe to follow the next 30-day experiment.'
      },
      {
        angle: 'beginner',
        angleName: 'Beginner Friendly',
        title: `${topic} for Complete Beginners in 2026`,
        hook: `If you know literally zero about ${lowerTopic}, start here.`,
        format: 'Shorts / TikTok (9:16)',
        audience: `Beginners & curious professionals in ${country}`,
        whyWorks: 'Low barrier to entry captures broad top-of-funnel discovery audiences.',
        structure: '0-3s Friendly Invite ➔ 3-18s 3-Step Simple Framework ➔ 18-30s Next Action',
        cta: 'Bookmark this reel so you do not lose the checklist.'
      },
      {
        angle: 'expert',
        angleName: 'Expert Deep Dive',
        title: `Advanced ${topic} Optimization Techniques`,
        hook: `The single section of ${lowerTopic} that senior practitioners optimize first.`,
        format: 'Podcast / Long-form',
        audience: `Advanced practitioners & leaders`,
        whyWorks: 'Exclusive insider positioning commands premium sponsorship value and high shares.',
        structure: '0-10s Credibility Anchor ➔ 10-40s Edge Case Analysis ➔ 40-60s Benchmark Comparison',
        cta: 'Join the executive private newsletter for weekly deep dives.'
      },
      {
        angle: 'myth-busting',
        angleName: 'Myth-Busting',
        title: `3 Viral Myths About ${topic} Debunked with Data`,
        hook: `Stop believing these 3 viral lies about ${lowerTopic}.`,
        format: 'Instagram Reels (9:16)',
        audience: `${audienceDesc}`,
        whyWorks: 'Exposing common misinformation sparks rapid shares among peers.',
        structure: '0-4s Lie #1 Reveal ➔ 4-15s Data Proof ➔ 15-30s Correct Method',
        cta: 'Send this to someone who still believes myth #1.'
      },
      {
        angle: 'listicle',
        angleName: 'Top Listicles',
        title: `Top 5 Tools for ${topic} Ranked from Worst to Best`,
        hook: `I tested every major tool for ${lowerTopic} — here are the top 5 ranked.`,
        format: 'Shorts / Reels (9:16)',
        audience: `${audienceDesc}`,
        whyWorks: 'Fast-paced ranked structure delivers high retention throughout all 5 items.',
        structure: '0-3s Ranked Tease ➔ 3-20s Items 5 through 2 ➔ 20-30s The #1 Winner',
        cta: 'Which one is your daily driver? Let me know.'
      },
      {
        angle: 'case-study',
        angleName: 'Case Study',
        title: `How One Creator Made $45k with ${topic}`,
        hook: `A transparent look at the exact numbers behind a $45k ${lowerTopic} launch.`,
        format: 'YouTube Long-form (16:9)',
        audience: `${audienceDesc}`,
        whyWorks: 'Transparent financials and verified metrics generate unmatched authority.',
        structure: '0-5s Proof Metric ➔ 5-25s Funnel Breakdown ➔ 25-50s Key Levers ➔ Actionable Lessons',
        cta: 'Get the exact spreadsheet template in the pinned comment.'
      },
      {
        angle: 'personal-story',
        angleName: 'Personal Story',
        title: `The Mistake with ${topic} That Cost Me $10,000`,
        hook: `I lost $10,000 so that you do not have to make the same mistake with ${lowerTopic}.`,
        format: 'Shorts / Video Essay',
        audience: `${audienceDesc}`,
        whyWorks: 'Vulnerability and loss aversion establish immediate emotional buy-in.',
        structure: '0-4s Regret Hook ➔ 4-18s The Painful Moment ➔ 18-30s The Recovery Framework',
        cta: 'Follow for raw creator lessons without the fake guru filter.'
      },
      {
        angle: 'hot-take',
        angleName: 'Hot Take',
        title: `Why ${topic} Will Be Dead by 2027`,
        hook: `Hot take: in 12 months, nobody will be using ${lowerTopic} the way they do today.`,
        format: 'X Thread / Short',
        audience: `${audienceDesc}`,
        whyWorks: 'Bold future predictions incentivize bookmarks and long debate threads.',
        structure: '0-3s The Prediction ➔ 3-18s 3 Inevitable Bottlenecks ➔ 18-30s The Winning Alternative',
        cta: 'Reposition your workflow before the shift happens.'
      },
      {
        angle: 'tutorial',
        angleName: 'Step-by-Step',
        title: `How to Build Your First ${topic} Pipeline in 10 Minutes`,
        hook: `Stop overcomplicating ${lowerTopic} — here is the exact 4-step setup you can build right now.`,
        format: 'YouTube Tutorial / Shorts',
        audience: `Hands-on builders in ${country}`,
        whyWorks: 'High completion rate due to immediate step-by-step utility and low cognitive friction.',
        structure: '0-4s End Result Teaser ➔ 4-20s Setup & Config ➔ 20-45s Live Build ➔ Verification',
        cta: 'Grab the copy-paste prompt templates in the video notes.'
      },
      {
        angle: 'news-reaction',
        angleName: 'News Reaction',
        title: `What Just Happened with ${topic} Changes Everything`,
        hook: `A massive shift in ${lowerTopic} was just announced, and almost nobody noticed.`,
        format: 'Shorts / Commentary',
        audience: `Active industry followers`,
        whyWorks: 'Urgency and breaking developments capture peak news cycle discovery algorithms.',
        structure: '0-3s Breaking Headline ➔ 3-15s What Changed ➔ 15-30s The 2 Winners & 1 Loser',
        cta: 'Share this with your team before tomorrow morning.'
      }
    ];

    let filtered = angleTemplates;
    if (angleFilter && angleFilter !== 'all') {
      filtered = angleTemplates.filter(t => t.angle === angleFilter);
      if (filtered.length === 0) filtered = angleTemplates;
    }

    const opp = window.VantageScorer ? window.VantageScorer.calculateOpportunityScore(trend, profile) : { score: 92, tier: 'EXPLOSIVE' };
    return filtered.map((item, idx) => {
      return {
        id: `idea-gen-${trend.id}-${item.angle}-${idx}`,
        ...item,
        trendSource: trend.topic,
        niche: trend.niche,
        score: Math.min(99, Math.max(70, opp.score - (idx % 3))),
        scoreTier: opp.tier
      };
    });
  }
};

window.VantageTrendsData = VantageTrendsData;
