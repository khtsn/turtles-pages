<template>
  <div class="mt-16 mb-16">
    <v-container class="content-container">
      <p class="header-text text-uppercase">
        Dexscreener Links
      </p>
      <v-row class="mt-4">
        <v-col
          v-for="(item, i) in links"
          :key="i"
          cols="12"
          md="3"
        >
          <v-card
            variant="outlined"
            class="link-card"
            @click="openNewTab(item.url)"
          >
            <v-card-text>
              <p class="text-center font-weight-bold">
                {{ item.name }}
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
useHead({
  title: 'Dexscreener Links',
  meta: [
    { name: 'description', content: 'Dexscreener Links Page' },
    {
      hid: 'og:title',
      property: 'og:title',
      content: 'Dexscreener Links - Turtle On Cronos',
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content: 'Dexscreener Links Page',
    },
  ],
})

const { openNewTab } = useNavigation()

const links = [
  {
    name: 'TURTLE/CROGINAL Dexscreener EBISUS BAY',
    url: 'https://dexscreener.com/cronos/0xada4238be548b82125f71d67083b12ce1f01d3df',
  },
  {
    name: 'TURTLE/XRP Dexscreener VVS',
    url: 'https://dexscreener.com/cronos/0x6da125da08484b4c5cd755142205531ceb2d9a95',
  },
  {
    name: 'TURTLE/STAB Dexscreener VVS',
    url: 'https://dexscreener.com/cronos/0xc2e09f89744aefcd01eb6c98cabbc1a0094af835',
  },
  {
    name: 'TURTLE/WCRO Dexscreener EBISUS BAY',
    url: 'https://dexscreener.com/cronos/0x2fdd58b14b6c6a02623fe01aded951f5bd6cbc0e',
  },
  {
    name: 'TURTLE/MOON Dexscreener EBISUS BAY',
    url: 'https://dexscreener.com/cronos/0xf6fe1a9062fe9a57b706ab42f825222acee85bef',
  },
  {
    name: 'TURTLE/ARY Dexscreener VVS',
    url: 'https://dexscreener.com/cronos/0xfd92a8b017213aae690e9ddac03cc1a5cb00dad7',
  },
  {
    name: 'TURTLE/CORGIAI Dexscreener VVS',
    url: 'https://dexscreener.com/cronos/0xf98605edddff99b5ced59753e28489f601486852?__cf_chl_tk=hKIH_d8DC1tVMFjPIF7bnKlQ.5..uZXzmXL5fmyEPj8-1726795204-0.0.1.1-6249',
  },
  {
    name: 'TURTLE/BGBK Dexscreener VVS',
    url: 'https://dexscreener.com/cronos/0x0cab2451c0929af3631e2b745dc331486f8f16fa',
  },
  {
    name: 'TURTLE/FILLL Dexscreener VVS',
    url: 'https://dexscreener.com/cronos/0xa3d39a6295467bb6fadaea649ca6d07204a53f99',
  },
  {
    name: 'TURTLE/CROID Dexscreener VVS',
    url: 'https://dexscreener.com/cronos/0xd8ede3f4c3118d8d7998e6b698952a897edbb552',
  },
  {
    name: 'TURTLE/CROFOMO Dexscreener VVS',
    url: 'https://dexscreener.com/cronos/0x890fc1a70111ef1539d1d3223f44a2d2b561c439',
  },
  {
    name: 'TURTLE/CRONA Dexscreener CRONA',
    url: 'https://dexscreener.com/cronos/0xc1233acbd36f4ef022ef7e6292031283877c3305',
  },
  {
    name: 'TURTLE/WCRO Dexscreener MMF',
    url: 'https://dexscreener.com/cronos/0xf5d8f38541abdd4e5e9a50af11ebae9b7780f6fb?__cf_chl_tk=exOewWp0RDk0RLfLMRbyOj_nuzWrsT2dmzioUWj_GDo-1718533103-0.0.1.1-5354',
  },
  {
    name: 'TURTLE/WBTC Dexscreener VVS',
    url: 'https://dexscreener.com/cronos/0x39605f9141f4fd2c66bc0bbf2ea350dab205fa2f',
  },
  {
    name: 'TURTLE/MERY Dexscreener VVS',
    url: 'https://dexscreener.com/cronos/0xe1e46f2f4fb12b35c466b468650b2b7f61bbcbfc',
  },
  {
    name: 'TURTLE/CAW Dexscreener VVS',
    url: 'https://dexscreener.com/cronos/0xf767aee1995ba5c4e71a4da6a5eaaff3db1ded94',
  },
  {
    name: 'TURTLE/VVS Dexscreener VVS',
    url: 'https://dexscreener.com/cronos/0xe93cf1891f72a9824bf12e5e5061df59a430f019?__cf_chl_tk=rb5H9JqmzEJU2VoW6DvKiHADbhKR.56ZzGX1PGFf9xI-1718893254-0.0.1.1-4756',
  },
  {
    name: 'TURTLE/WETH Dexscreener VVS',
    url: 'https://dexscreener.com/cronos/0x4b6d58436e37a941d065ba337c01b49821aad902',
  },
  {
    name: 'TURTLE/USDC Dexscreener VVS',
    url: 'https://dexscreener.com/cronos/0xc8fcfc922338d94d601758acf05e0372155c39f1?__cf_chl_tk=SwcikdIgBGf17TQTjJmSd6EJ5V7hfWuMxf206eBcQO0-1717934556-0.0.1.1-5460',
  },
  {
    name: 'TURTLE/WCRO Dexscreener VVS',
    url: 'https://dexscreener.com/cronos/0xea8f22344dd9269b030381f676432270a22a5837?__cf_chl_tk=vFtnWRjF0YGqOzq.YbNAJFuBf_058aW6uDXybJqIdek-1716905021-0.0.1.1-1706',
  },
  {
    name: 'TURTLE/PEPE Dexscreener VVS',
    url: 'https://dexscreener.com/cronos/0x9642b3000b3a75a0037a0cb2293ab9f92049c999',
  },
]
</script>

<style scoped>
.link-card {
  height: 75px;
  cursor: pointer;
  transition: all .3s ease-in-out !important;
}

.link-card:hover {
  background-color: rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-background));
}
</style>
