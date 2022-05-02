const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        prependData: `
        @import "@src/components/scss/functions.scss";
        @import "@src/components/scss/mixins.scss";
        @import "@src/components/scss/variables.scss";
        `
      }
    }
  }
})
