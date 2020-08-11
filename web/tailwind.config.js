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
      progress: '#FFF500',
    }),
  },

  variants: {},
  plugins: [],
}
