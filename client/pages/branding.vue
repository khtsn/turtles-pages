<template>
  <div class="mt-16 mb-16">
    <v-container class="content-container">
      <p class="header-text text-uppercase">
        Branding
      </p>

      <p class="subheader-text text-primary mt-4">
        Meme Heads
      </p>
      <v-row class="mt-2">
        TBD
      </v-row>

      <p class="subheader-text text-primary mt-4">
        Banner
      </p>
      <div class="text-center mt-2">
        <img
          src="/banner.jpg"
          alt="banner"
          class="banner-img"
        >
      </div>

      <p class="subheader-text text-primary mt-4">
        Logo
      </p>
      <div class="text-center mt-2">
        <img
          src="/logo.jpg"
          alt="logo"
          class="logo-img"
        >
      </div>
    </v-container>
  </div>
</template>

<script setup>
useHead({
  title: 'Branding',
  meta: [
    { name: 'description', content: 'Branding Page' },
    {
      hid: 'og:title',
      property: 'og:title',
      content: 'Branding - Turtle On Cronos',
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content: 'Branding Page',
    },
  ],
})
</script>

<style scoped>
.banner-img {
  width: 100%;
  max-width: 1200px;
}

.logo-img {
  width: 100%;
  max-width: 300px;
}
</style>
