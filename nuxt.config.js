require('./config.js')

export default {
  mode: 'spa',
  server: {
    port: 8080
  },
  /*
  ** Headers of the page
  */
  head: {
    title: `Portfolio`,
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: `Haiyi's portfolio`}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#7ED321'},
  /*
  ** Global CSS
  */
  css: [],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/vee-validate.js',
    '~/plugins/axios.js',
    {src: '~/plugins/vuejs-datepicker.js', ssr: false}
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [],
  /*
  ** Nuxt.js modules
  */
  modules: [
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    ['nuxt-fontawesome', {
      imports: [{
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['fas']
      }, {
        set: '@fortawesome/free-brands-svg-icons',
        icons: ['fab']
      }]
    }]
  ],
  env: {},
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: `${process.env.NUXT_ENV_API_URL}/api/`
  },
  /*
  ** Build configuration
  */
  build: {
    filenames: {
      chunk: ({isDev}) => isDev ? '[name].js' : '[id].[contenthash].js'
    },
    transpile: ["vee-validate/dist/rules"],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
