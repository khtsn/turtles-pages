<template>
  <div class="mt-16 mb-16">
    <v-container class="content-container">
      <p class="header-text text-uppercase">
        Links
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
                {{ item.name }}<br>
                {{ item.platform }}
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
  title: 'Links',
  meta: [
    { name: 'description', content: 'Links Page' },
    {
      hid: 'og:title',
      property: 'og:title',
      content: 'Links - Turtle On Cronos',
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content: 'Links Page',
    },
  ],
})

const { openNewTab } = useNavigation()

const links = [
  {
    name: 'TURTLE/CROGINAL',
    platform: 'EBISUS BAY',
    url: 'https://dexscreener.com/cronos/0xada4238be548b82125f71d67083b12ce1f01d3df',
  },
  {
    name: 'TURTLE/XRP',
    platform: 'VVS FINANCE',
    url: 'https://dexscreener.com/cronos/0x6da125da08484b4c5cd755142205531ceb2d9a95',
  },
  {
    name: 'TURTLE/STAB',
    platform: 'VVS FINANCE',
    url: 'https://dexscreener.com/cronos/0xc2e09f89744aefcd01eb6c98cabbc1a0094af835',
  },
  {
    name: 'TURTLE/WCRO',
    platform: 'EBISUS BAY',
    url: 'https://dexscreener.com/cronos/0x2fdd58b14b6c6a02623fe01aded951f5bd6cbc0e',
  },
  {
    name: 'TURTLE/MOON',
    platform: 'EBISUS BAY',
    url: 'https://dexscreener.com/cronos/0xf6fe1a9062fe9a57b706ab42f825222acee85bef',
  },
  {
    name: 'TURTLE/ARY',
    platform: 'VVS FINANCE',
    url: 'https://dexscreener.com/cronos/0xfd92a8b017213aae690e9ddac03cc1a5cb00dad7',
  },
  {
    name: 'TURTLE/CORGIAI',
    platform: 'VVS FINANCE',
    url: 'https://dexscreener.com/cronos/0xf98605edddff99b5ced59753e28489f601486852',
  },
  {
    name: 'TURTLE/BGBK',
    platform: 'VVS FINANCE',
    url: 'https://dexscreener.com/cronos/0x0cab2451c0929af3631e2b745dc331486f8f16fa',
  },
  {
    name: 'TURTLE/FILLL',
    platform: 'VVS FINANCE',
    url: 'https://dexscreener.com/cronos/0xa3d39a6295467bb6fadaea649ca6d07204a53f99',
  },
  {
    name: 'TURTLE/CROID',
    platform: 'VVS FINANCE',
    url: 'https://dexscreener.com/cronos/0xd8ede3f4c3118d8d7998e6b698952a897edbb552',
  },
  {
    name: 'TURTLE/CROFOMO',
    platform: 'VVS FINANCE',
    url: 'https://dexscreener.com/cronos/0x890fc1a70111ef1539d1d3223f44a2d2b561c439',
  },
  {
    name: 'TURTLE/CRONA',
    platform: 'CRONA',
    url: 'https://dexscreener.com/cronos/0xc1233acbd36f4ef022ef7e6292031283877c3305',
  },
  {
    name: 'TURTLE/WCRO',
    platform: 'MMF',
    url: 'https://dexscreener.com/cronos/0xf5d8f38541abdd4e5e9a50af11ebae9b7780f6fb',
  },
  {
    name: 'TURTLE/WBTC',
    platform: 'VVS FINANCE',
    url: 'https://dexscreener.com/cronos/0x39605f9141f4fd2c66bc0bbf2ea350dab205fa2f',
  },
  {
    name: 'TURTLE/MERY',
    platform: 'VVS FINANCE',
    url: 'https://dexscreener.com/cronos/0xe1e46f2f4fb12b35c466b468650b2b7f61bbcbfc',
  },
  {
    name: 'TURTLE/CAW',
    platform: 'VVS FINANCE',
    url: 'https://dexscreener.com/cronos/0xf767aee1995ba5c4e71a4da6a5eaaff3db1ded94',
  },
  {
    name: 'TURTLE/VVS',
    platform: 'VVS FINANCE',
    url: 'https://dexscreener.com/cronos/0xe93cf1891f72a9824bf12e5e5061df59a430f019',
  },
  {
    name: 'TURTLE/WETH',
    platform: 'VVS FINANCE',
    url: 'https://dexscreener.com/cronos/0x4b6d58436e37a941d065ba337c01b49821aad902',
  },
  {
    name: 'TURTLE/USDC',
    platform: 'VVS FINANCE',
    url: 'https://dexscreener.com/cronos/0xc8fcfc922338d94d601758acf05e0372155c39f1',
  },
  {
    name: 'TURTLE/WCRO',
    platform: 'VVS FINANCE',
    url: 'https://dexscreener.com/cronos/0xea8f22344dd9269b030381f676432270a22a5837',
  },
  {
    name: 'TURTLE/PEPE',
    platform: 'VVS FINANCE',
    url: 'https://dexscreener.com/cronos/0x9642b3000b3a75a0037a0cb2293ab9f92049c999',
  },
  {
    name: 'TURTLE/ROBIN',
    platform: 'OBSIDIAN FINANCE',
    url: 'https://dexscreener.com/cronos/0x390558a5527a481b928e3daeebfb0ce9fc5168ae',
  },
  {
    name: 'TURTLE/ETC',
    platform: 'VVS FINANCE',
    url: 'https://dexscreener.com/cronos/0xbf8bb592bbc08fefec88a4a009857a035e5dbfb3',
  },
  {
    name: 'TURTLE/NEURO',
    platform: 'VVS FINANCE',
    url: 'https://dexscreener.com/cronos/0xafc84b923a6cedf3a65735df8bb2a81def2dec39',
  },
  {
    name: 'TURTLE/MTD',
    platform: 'VVS FINANCE',
    url: 'https://dexscreener.com/cronos/0xde6acecaf25b25a4037b26b4a9d5f6b4f4a313ec',
  },
  {
    name: 'TURTLE/SOL',
    platform: 'VVS FINANCE',
    url: 'https://dexscreener.com/cronos/0x75e433a3c77206d7f7e0ad8ab60d0521ed7018ea',
  },
  {
    name: 'TURTLE/WTS',
    platform: 'VVS FINANCE',
    url: 'https://dexscreener.com/cronos/0x4a03cf442ce4aca39b8e22ad610d8ecf759f491b',
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
