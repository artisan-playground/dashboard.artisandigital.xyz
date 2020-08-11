module.exports = {
  purge: false,
  theme: {
    backgroundColor: (theme) => ({
      ...theme('colors'),
      primary: '#105EFC',
      primaryopacity: 'rgba(16,94,252,0.5)',
      secondary: '#fff',
      danger: '#e3342f',
      success: '#1BED09',
      successop: 'rgba(27,237,9,0.5)',
      progress: '#FFF500',
      progressop: 'rgba(255,245,0,0.5)',
    }),
  },

  variants: {},
  plugins: [],
}
