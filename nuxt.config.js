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
    title: `Portfolio - Haiyi Ma`,
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
  // Configure polyfills:
  polyfill: {
    features: [
      /* Feature without detect: This is not recommended for most polyfills
         because the polyfill will always be loaded, parsed and executed. */
      {
        require: 'url-polyfill' // NPM package or require path of file
      },
      /* Feature with detect: Detection is better because the polyfill will not be
         loaded, parsed and executed if it's not necessary.*/
      {
        require: 'intersection-observer',
        detect: () => 'IntersectionObserver' in window,
      },
      /* Feature with detect & install: Some polyfills require a installation step
         Hence you could supply a install function which accepts the require result */
      {
        require: 'smoothscroll-polyfill',
        // Detection found in source: https://github.com/iamdustan/smoothscroll/blob/master/src/smoothscroll.js
        detect: () => 'scrollBehavior' in document.documentElement.style && window.__forceSmoothScrollPolyfill__ !== true,
        // Optional install function called client side after the package is required:
        install: (smoothscroll) => smoothscroll.polyfill()
      }
    ]
  },
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [],
  /*
  ** Nuxt.js modules
  */
  modules: [
    'bootstrap-vue/nuxt',
    // Add it to the modules section:
    'nuxt-polyfill',
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
