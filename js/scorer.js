/**
 * VANTAGE VIRALITY OS — 7-Signal Opportunity & Virality Diagnostic Engine
 */

const VantageScorer = {
  // 7-Signal Opportunity Formula
  calculateOpportunityScore(trend, profile) {
    const m = trend.momentum || 80;
    const e = parseFloat(trend.engagementRate) * 7.5 || 80;
    const s = trend.searchDemand || 75;
    const o = trend.outlierScore || 85;
    const f = trend.freshness || 80;
    const c = trend.competition || 70;

    const userNiches = (profile && profile.niches) ? profile.niches : ['ai', 'technology'];
    const isNicheMatch = userNiches.includes(trend.niche);
    const r = isNicheMatch ? 98 : 72;

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
  },

  // Live Hook Virality Diagnostic Engine
  evaluateHookText(text) {
    if (!text || !text.trim()) {
      return {
        score: 0,
        tier: 'AWAITING INPUT',
        curiosity: 0,
        stakes: 0,
        velocity: 0,
        diagnostics: {}
      };
    }

    const trimmed = text.trim();
    const hasNumber = /\d+/.test(trimmed);
    const hasQuestion = trimmed.includes('?');
    const hasLossAversion = /delete|stop|never|worst|mistake|regret|fail|lies|disaster|broken/i.test(trimmed);
    const hasPowerWord = /secret|tested|truth|insane|brutal|proof|architecture|scaled|formula|hacks/i.test(trimmed);
    const len = trimmed.length;

    let curiosity = 78 + (hasQuestion ? 8 : 0) + (hasPowerWord ? 8 : 0) + (len > 30 ? 4 : 0);
    let stakes = 75 + (hasLossAversion ? 14 : 0) + (hasNumber ? 6 : 0);
    let velocity = 80 + (len >= 45 && len <= 95 ? 12 : 4) + (hasNumber ? 5 : 0);

    curiosity = Math.min(99, curiosity);
    stakes = Math.min(99, stakes);
    velocity = Math.min(99, velocity);

    const overallScore = Math.round((curiosity * 0.35) + (stakes * 0.35) + (velocity * 0.30));

    return {
      score: overallScore,
      tier: overallScore >= 90 ? 'EXPLOSIVE' : (overallScore >= 75 ? 'STRONG' : 'CALIBRATED'),
      curiosity,
      stakes,
      velocity,
      diagnostics: {
        len,
        hasNumber,
        hasQuestion,
        hasLossAversion,
        hasPowerWord
      }
    };
  }
};

window.VantageScorer = VantageScorer;
