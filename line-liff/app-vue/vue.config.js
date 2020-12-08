module.exports = {
  pluginOptions: {
    vconsole: {
      enable: true,
    },
    apollo: {
      enableMocks: false,
      enableEngine: false,
      lintGQL: true,
    },
  },
  transpileDependencies: ['vuetify'],
}
