module.exports = {
    ci: {
      collect: {
        staticDistDir: './dist/apps/frontend/browser',
      },
      assert: {
        preset: 'lighthouse:no-pwa',
        assertions: {
          'categories:performance': ['error', { minScore: 0.9, aggregationMethod: 'median' }],
          'categories:accessibility': ['error', { minScore: 0.95, aggregationMethod: 'median'}],
          'categories:best-practices': ['error', { minScore: 0.96, aggregationMethod: 'median'}],
          'categories:seo': ['error', { minScore: 1, aggregationMethod: 'median'}],
        },
      },
      upload: {
        target: "temporary-public-storage",
      },
    },
};