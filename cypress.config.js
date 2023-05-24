const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    browser: "chrome",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

