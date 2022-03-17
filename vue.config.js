const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  filenameHashing: false,
  outputDir: './build',
  //publicPath: 'https://cdn.jsdelivr.net/gh/Azuriom/AzuriomInstaller@1.0.0/dist/',
})
