/**
 * VANTAGE VIRALITY OS — Configuration & State Models
 */

const VantageConfig = {
  STORAGE_KEY_PROFILE: 'vantage_creator_profile',
  STORAGE_KEY_LIBRARY: 'vantage_saved_library',
  API_BASE: 'http://localhost:3000/api',

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
    }
  ],

  SAMPLE_HOOKS: [
    "I gave 3 AI agents $1,000 each and let them trade for 30 days — the results broke my model.",
    "Delete these 3 VS Code extensions before they secretly slow down your build times.",
    "Why 90% of creators fail at short-form video in 2026 (and the 3-second fix).",
    "I tested every AI video editor so you don't have to — here is the brutal truth.",
    "How one solopreneur scaled a micro-SaaS to $45k/mo with zero employees.",
    "Stop drinking coffee first thing in the morning (here is the 90-minute cortisol rule).",
    "The single camera setting that makes your $600 lens look like a $4,000 cinema rig."
  ]
};

window.VantageConfig = VantageConfig;
