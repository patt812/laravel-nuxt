import path from 'path'
import fs from 'fs'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/auth-next",
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  // Use SSL connection
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'cert/localhost-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'cert/localhost.pem'))
    }
  },

  router: {
    middleware: ['auth']
  },

  publicRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL,
      credentials: true
    },
  },

  // auth: {
  //   strategies: {
  //     'laravelSanctum': {
  //       provider: 'laravel/sanctum',
  //       url: process.env.BASE_URL
  //     },
  //   },
  // },

  auth: {
    redirect: {
      login: '/login',
      logout: '/',
      callback: false,
      home: '/play'
    },
    localStorage: false,


    strategies: {
      local: {
        provider: 'laravel/sanctum',
        url: process.env.BASE_URL,
        token: {
          // type: 'Bearer',
          // property: 'token',
          // global: true,
          // property: 'token',
          // required: true,
          // type: 'Bearer'
          property: 'token',
        },
        user: {
          property: "user",
          // property: false, // here should be `false`, as you defined in user endpoint `propertyName`
          autoFetch: true
        },

        endpoints: {
          login: {
            url: '/api/login',
            method: 'post',
          },
          logout: {
            url: '/api/logout',
            method: 'post',
          },
          user: {
            url: '/api/user',
            method: 'get',
            propertyName: false,
          }
        }
      },
    },
  },
}
