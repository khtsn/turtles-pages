<template>
  <div class="mt-16 mb-16">
    <v-container class="content-container">
      <p class="header-text text-uppercase">
        Partners
      </p>

      <p class="subheader-text mt-4">
        Crofomo
      </p>
      <p class="mt-2">
        The Turtle community teamed up with CroFomo, another memecoin on Cronos. We each donated equal amounts to the liquidity pool and then burned it for life. <span
          class="custom-link"
          @click="openNewTab('https://x.com/CROFOMO1')"
        >Visit X Profile</span>
      </p>
      <div class="text-center mt-2">
        <a href="https://x.com/CROFOMO1">
          <img
            src="/crofomo.gif"
            alt="thumbnail"
            class="thumbnail-img"
          >
        </a>
      </div>

      <p class="subheader-text mt-4">
        3look.io
      </p>
      <p class="mt-2">
        We are happy to announce we integrated with 3look, a web3 platform where all TURTLE fam can create custom gifs and memes with just a couple of clicks! <span
          class="custom-link"
          @click="openNewTab('https://3look.io/tools/creative-studio')"
        >Visit Site</span>
      </p>
      <div class="text-center mt-2">
        <a href="https://3look.io/tools/creative-studio">
          <img
            src="/3look.webp"
            alt="thumbnail"
            class="thumbnail-img"
          >
        </a>
      </div>

      <p class="subheader-text mt-4">
        ARYOSHIN
      </p>
      <p class="mt-2">
        We teamed up with Aryoshin $ARY, a memecoin on Cronos. We each added some liquidity to be burned, keeping our partnership for life. <span
          class="custom-link"
          @click="openNewTab('https://x.com/CronosAry')"
        >Visit X Profile</span>
      </p>
      <p class="mt-2">
        They've recently launched #ARYHOME, and integrated us. Swap, battle, or stake all their paired tokens. Follow their page for more details. Use only official links.
      </p>
      <a
        href="https://www.aryhome.xyz/swap"
        class="text-primary mt-2"
      >
        https://www.aryhome.xyz/swap
      </a>
      <div class="text-center mt-2">
        <a href="https://www.aryhome.xyz/swap">
          <img
            src="/aryoshin.gif"
            alt="thumbnail"
            class="thumbnail-img"
          >
        </a>
      </div>

      <p class="subheader-text mt-4">
        CROGINAL cats
      </p>
      <p class="mt-2">
        We have partnered with Croginal Cats on their new DEX. We will be providing a liquidity pair on launch and the community will have opportunities to stake LPs into a vault at times. <span
          class="custom-link"
          @click="openNewTab('https://x.com/Croginal')"
        >Visit X Profile</span>
      </p>
      <div class="text-center mt-2">
        <a href="https://x.com/Croginal">
          <img
            src="/croginal-cats.gif"
            alt="thumbnail"
            class="thumbnail-img"
          >
        </a>
      </div>

      <p class="subheader-text mt-4">
        Memes on cronos
      </p>
      <p class="mt-2">
        Not an official partner, but MemesOnCronos is a staple to MemeCoins on Cronos. A platform where everyone can vote for their favorite memecoins daily, track pools, volume, and other valuable data. <span
          class="custom-link"
          @click="openNewTab('https://x.com/memesoncronos')"
        >Visit X Profile</span>
      </p>
      <p class="mt-2">
        Go to their site and give us, and your favorite memecoins a daily vote. The highest voted community each month gets a free banner displayed for a week on their site. Landing a top 3 vote for the month gives us an extra point towards their verification process. Every vote matters #crofam! URL to site below.
      </p>
      <a
        href="https://www.memesoncronos.com/"
        class="text-primary mt-2"
      >
        https://www.memesoncronos.com/
      </a>
      <div class="text-center mt-2">
        <a href="https://www.memesoncronos.com/">
          <img
            src="/vote.jpg"
            alt="thumbnail"
            class="thumbnail-img"
          >
        </a>
      </div>

      <p class="subheader-text mt-4">
        Obsidian Finance
      </p>
      <p class="mt-2">
        Obsidian Finance is a new Dex aggregator on Cronoschain built by Robin Cronos. <span
          class="custom-link"
          @click="openNewTab('https://x.com/ObsidianSwap')"
        >Visit X Profile</span>
      </p>
      <p class="mt-2">
        They are the first live dex to give $TURTLE a whitelist! Have weekly trading battles and swap $TURTLE!
      </p>
      <a
        href="https://obsidian.finance"
        class="text-primary mt-2"
      >
        https://obsidian.finance
      </a>
      <div class="text-center mt-2">
        <a
          href="https://obsidian.finance"
          https:
          obsidian.finance
        >
          <img
            src="/obs.webp"
            alt="thumbnail"
            class="thumbnail-img"
          >
        </a>
      </div>

      <p class="subheader-text mt-4">
        Big back
      </p>
      <p class="mt-2">
        Big Back was the first memecoin community to buy $TURTLE and burn liquidity with us! Since then we have been growing the pool. <span
          class="custom-link"
          @click="openNewTab('https://x.com/BgBk_Official')"
        >Visit X Profile</span>
      </p>
      <div class="text-center mt-2">
        <a href="https://x.com/BgBk_Official">
          <img
            src="/big-back.gif"
            alt="thumbnail"
            class="thumbnail-img"
          >
        </a>
      </div>

      <p class="subheader-text mt-4">
        FILLL
      </p>
      <p class="mt-2">
        FILLL memecoin started their own liquidity pool and burned liquidity with us! Strengthening our connections with Crofam! <span
          class="custom-link"
          @click="openNewTab('https://x.com/Filipez10')"
        >Visit X Profile</span>
      </p>
      <div class="text-center mt-2">
        <a href="https://x.com/Filipez10">
          <img
            src="/filll.gif"
            alt="thumbnail"
            class="thumbnail-img"
          >
        </a>
      </div>
    </v-container>
  </div>
</template>

<script setup>
useHead({
  title: 'Partners',
  meta: [
    { name: 'description', content: 'Partners Page' },
    {
      hid: 'og:title',
      property: 'og:title',
      content: 'Partners - Turtle On Cronos',
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content: 'Partners Page',
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
