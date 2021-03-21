/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    experimental: {
      darkModeVariant: true,
    },
    purge: {
      // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
      enabled: process.env.NODE_ENV === 'production',
      content: [
        'components/**/*.vue',
        'layouts/**/*.vue',
        'pages/**/*.vue',
        'plugins/**/*.js',
        'nuxt.config.js',
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        'assets/css/*.css',
        'static/fonts/**/*.css'
      ]
    },
    dark: 'class',
    theme: {
      screens: {
        md: '768px',
        lg: '1400px',
        xl: '1920px',
      },
      extend: {
        maxHeight: {
            "header": "100px"
        },
        height: {
          "header": "100px"
        },
        fontFamily: {
          'nunito': ['nunito', 'sans-serif'],
          'lato': ['lato', 'sans-serif'],
          'cabinbold': ['cabinbold', 'sans-serif'],
        },
        colors: {
          placeholder: {
            DEFAULT: "#7139be",
            light: "#cbb8e7"
          }
        },
        backgroundImage: theme => ({
          "body-pattern": "url('~/assets/images/bg.jpg')",
          "content-pattern": "url('~/assets/images/content-bg.png')"
        })
      }
    },
    variants: {
      backgroundColor: ['responsive', 'hover', 'focus', 'dark'],
      borderColor: ['responsive', 'hover', 'focus', 'dark'],
      boxShadow: ['responsive', 'hover', 'focus', 'dark'],
      textColor: ['responsive', 'hover', 'focus', 'dark'],
      textDecoration: ['responsive', 'hover', 'focus', 'dark'],
    },
  }