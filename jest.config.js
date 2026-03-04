module.exports = {
  testEnvironment: 'jsdom',
  collectCoverageFrom: [
    'gtm-consent.js',
    'script.js',
  ],
  coverageThreshold: {
    './gtm-consent.js': {
      branches: 40,
      functions: 90,
      lines: 70,
      statements: 70,
    },
  },
  testMatch: [
    '**/*.test.js',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  verbose: true,
};
