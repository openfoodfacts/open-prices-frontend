import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    specPattern: '**/*.cy.js',
    fixturesFolder: 'tests/fixtures',
    screenshotsFolder: 'tests/screenshots',
    videosFolder: 'tests/videos',
    downloadsFolder: 'tests/downloads',
    supportFile: 'tests/support/e2e.js',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:5173',
  },
})
