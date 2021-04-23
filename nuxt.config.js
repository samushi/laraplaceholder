require('dotenv').config();

export default {
  mode: 'universal',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'LaraPlaceholder',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/assets/images/favicon/favicon.ico' },
      {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Nunito:400,700|Lato:400,700,700italic&display=swap'},
      {rel: 'stylesheet', href: '/fonts/cobin-web/stylesheet.css'}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/main.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/composition-api',
    '@/plugins/placeholder-api.ts'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // 'nuxt-vite',
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/composition-api',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/dotenv'
  ],
  axios: {
    // proxy: true
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    publicPath: '/storage/'
  },

  compilerOptions: {
    types: [
      "@nuxt/types",
      "@nuxtjs/axios"
    ]
  },
  
  generate: {
    // choose to suit your project
    interval: 2000,
  }
}
