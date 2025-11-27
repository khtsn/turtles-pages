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
      titleTemplate: '%s - Turtle On Cronos',
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
      nftApiUrl: process.env.NFT_API_URL || 'http://localhost:3000',
      vaultAddress: process.env.VITE_VAULT_ADDRESS || '0x03D90756cf107898bB86049aCd426a6E980b79B7',
      nftAddress: process.env.VITE_NFT_ADDRESS || '0x5848335bbd8e10725f5a35d97a8e252efda9be1a',
      tokenAddress: process.env.VITE_TOKEN_ADDRESS || '0x2baa455e573df4019b11859231dd9e425d885293',
      chainId: process.env.VITE_CHAIN_ID || '338',
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
