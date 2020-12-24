module.exports = {
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
  purge: {
    content: ['./src/**/*.tsx'],
  },
  theme: {
    backgroundColor: (theme) => ({
      ...theme('colors'),
      primary: '#0036C7',
      secondary: '#134F83',
      third: 'rgb(233, 240, 255)',
      primaryopacity: 'rgba(16,94,252,0.5)',
      danger: '#e3342f',
      success: '#1BED09',
      successop: 'rgba(27,237,9,0.5)',
      progress: '#FFF500',
      progressop: 'rgba(255,245,0,0.5)',
    }),
    extend: {
      spacing: {
        72: '18rem',
        84: '21rem',
        96: '24rem',
      },
    },
  },
  variants: {},
  plugins: [],
}
