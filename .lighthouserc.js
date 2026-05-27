// .lighthouserc.js
// Run with: npx lhci autorun
// Install: npm install -g @lhci/cli

module.exports = {
  ci: {
    collect: {
      // Start the production build locally before auditing
      startServerCommand: 'npm run start',
      startServerReadyPattern: 'ready on',
      url: ['http://localhost:3000'],
      numberOfRuns: 3,
    },
    assert: {
      // Performance budgets — fail CI if scores drop below these thresholds
      assertions: {
        'categories:performance':     ['error', { minScore: 0.85 }],
        'categories:accessibility':   ['error', { minScore: 0.90 }],
        'categories:best-practices':  ['error', { minScore: 0.90 }],
        'categories:seo':             ['error', { minScore: 0.90 }],

        // Core Web Vitals budgets
        'first-contentful-paint':     ['warn',  { maxNumericValue: 2000 }],
        'largest-contentful-paint':   ['error', { maxNumericValue: 3000 }],
        'cumulative-layout-shift':    ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time':        ['warn',  { maxNumericValue: 500 }],
        'interactive':                ['warn',  { maxNumericValue: 3500 }],
      },
    },
    upload: {
      // Save reports locally. Switch to 'lhci' for LHCI server or
      // 'temporary-public-storage' for shareable report links.
      target: 'filesystem',
      outputDir: '.lighthouseci',
    },
  },
};
