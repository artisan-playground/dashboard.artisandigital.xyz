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
              '@select-item-selected-bg': '#e9f0ff',
              '@picker-basic-cell-active-with-range-color': '#e9f0ff',
              '@calendar-item-active-bg': '#e9f0ff',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
}
