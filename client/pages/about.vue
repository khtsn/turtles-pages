<template>
  <div class="mt-16 mb-16">
    <v-container class="content-container">
      <p class="header-text text-uppercase">
        About Us
      </p>

      <p class="mt-4">
        This is a community takeover for TURTLE. The original account was @Turtle_CRO on X. They have been silent since May 8, 2024.
      </p>
      <p class="mt-2">
        <span
          class="custom-link"
          @click="openNewTab('https://x.com/Cryptodaave?t=X5Wrdyea_gVaM0iSySU_vw&s=09')"
        >@Cryptodaave</span> on X is leading this takeover and is also a community voice for CamelsNFT. Transparency, good vibes, and consistency are all of his key concerns.
      </p>
      <p class="mt-2">
        We are doing our best to update all the socials and token details, but some take time. The original dev did update some token listings, and we are working on having them transferred.
      </p>
      <p class="mt-2">
        Before they went silent, they renounced the contract and burned keys to the original MMF liquidity pool that was vaulted.
      </p>
      <p class="mt-2">
        Since we started the takeover, we have updated the dexscreener, made this website that is an ongoing work in progress, verified a new X account, and created a new tg.
      </p>
      <p class="mt-2">
        Thank you to everyone who has continued the support.
      </p>
      <p class="mt-2">
        TURTLE GMI #crofam 🐢
      </p>
      <div class="text-center mt-2">
        <img
          src="/about.gif"
          alt="thumbnail"
          class="thumbnail-img"
        >
      </div>
    </v-container>
  </div>
</template>

<script setup>
useHead({
  title: 'About Us',
  meta: [
    { name: 'description', content: 'About Us Page' },
    {
      hid: 'og:title',
      property: 'og:title',
      content: 'About Us - Turtle On Cronos',
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content: 'About Us Page',
    },
  ],
})

const { openNewTab } = useNavigation()
</script>

<style scoped>
.thumbnail-img {
  width: 100%;
  max-width: 300px;
  border-radius: 8px;
}
</style>
