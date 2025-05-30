import vuetify from 'vite-plugin-vuetify'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@vite-pwa/nuxt',
    '@vueuse/nuxt',
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'acceptHMRUpdate'],
      },
    ],
    async (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
  ssr: false,
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Home',
      titleTemplate: '%s',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
    pageTransition: { name: 'slide', mode: 'out-in' },
  },
  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
    '~/assets/css/global.css',
  ],
  runtimeConfig: {
    public: {
      appUrl: '',
      walletConnectId: 'd597fb2c81b43b56bb52a248de3cbca2',
    },
  },
  build: {
    transpile: ['vuetify'],
  },
  experimental: {
    appManifest: false,
  },
  compatibilityDate: '2024-11-01',
  vite: {
    plugins: [
      nodePolyfills(),
    ],
    vue: {
      template: {
        compilerOptions: {
          isCustomElement: tag => tag.startsWith('quilleditor'),
        },
      },
    },
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
})
