const { defineConfig } = require("cypress")

module.exports = defineConfig({
    chromeWebSecurity: false,
    env: { 
        hideXHRInCommandLog: true,
        MAILOSAUR_API_KEY: "UvXyXRHW4Q9ZxjMP", 
    },
    e2e: {
    }
})