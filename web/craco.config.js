const CracoLessPlugin = require('craco-less')

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#134F83',
              '@menu-item-active-bg': '#e9f0ff',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
}
