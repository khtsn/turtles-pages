<template>
  <div class="mt-16 mb-16">
    <v-container class="content-container">
      <p class="header-text text-uppercase">
        About Us
      </p>

      <p class="mt-4">
        This is a community takeover for the memecoin TURTLE on Cronos. The original account was @Turtle_CRO on X. They have been silent since May 8, 2024.
      </p>
      <p class="mt-2">
        <span
          class="custom-link"
          @click="openNewTab('https://x.com/Cryptodaave')"
        >@Cryptodaave</span> on X is leading this takeover and is also a community voice for CamelsNFT. Transparency, good vibes, and consistency are all of his key concerns.
      </p>
      <p class="mt-2">
        We are doing our best to update all the socials and token details, but some take time. The original dev did update some token listings, and we are working on having them transferred.
      </p>
      <p class="mt-2">
        Before they went silent, they renounced the contract and burned keys to the original MMF liquidity pool that was vaulted.
      </p>
      <p class="mt-2">
        Since we started the takeover, we have updated dexscreener, made this website that is an ongoing work in progress, verified a new X account, created a sales tracker, launched NFTs, earning contract, overlays, discord, and created a new tg. The building wont stop!
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

      <div class="mt-8">
        <h2 class="text-h5 mb-4">
          Meet the Team
        </h2>
        <v-row>
          <v-col
            v-for="profile in profiles"
            :key="profile.name"
            cols="12"
            md="6"
            lg="3"
          >
            <v-card class="profile-card h-100">
              <div class="text-center pt-4">
                <v-avatar size="80">
                  <v-img
                    :src="profile.avatar"
                    :alt="profile.name"
                  />
                </v-avatar>
              </div>
              <v-card-title class="text-h6 text-center">
                {{ profile.name }}
              </v-card-title>
              <v-card-subtitle class="text-center">
                <span
                  class="custom-link"
                  @click="openNewTab(profile.xLink)"
                >{{ profile.xHandle }}</span>
              </v-card-subtitle>
              <v-card-text>
                <p class="profile-description">
                  {{ profile.description }}
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
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

const profiles = [
  {
    name: 'Dave',
    avatar: 'about/1.png',
    xHandle: '@CryptoDaave',
    xLink: 'https://x.com/CryptoDaave',
    description: 'Active since August 2022, is a dedicated NFT collector and crypto investor who leads $TURTLE with transparency, good vibes, and consistency as CTO. Fully invested in CamelsNFT since its launch, he acquired the brand in late 2024 and spearheaded the launch of Turtles NFTs on Cronos. As the owner of CamelsNFT, he drives this takeover with passion, avoiding paid promotions to enhance the crypto space, spread safety awareness, and onboard newcomers.',
  },
  {
    name: 'Lexi',
    avatar: 'about/2.jpg',
    xHandle: '@darkmindofl',
    xLink: 'https://x.com/darkmindofl',
    description: 'The artistic force behind Turtles NFTs on Cronos and DeepFink! Since joining the crypto scene in December 2022, this UK-based creator crafts quirky, one-of-a-kind turtle designs and innovative DeepFink art, breathing life into the TurtleVerse. Passionate about @CamelsNFT, she champions safety, welcomes newcomers, and leads with heart. Dive into her bold, creative world!',
  },
  {
    name: 'Lone Deranger',
    avatar: 'about/3.jpg',
    xHandle: '@_lonederanger',
    xLink: 'https://x.com/_lonederanger',
    description: 'A crypto trailblazer from the class of \'21, thriving in DeFi and NFTs. A Day 1 supporter of Cronos chain and Loaded Lions, he’s been a VVS Finance Ambassador since \'22 and serves as our savvy Turtle Treasury Advisor. With an eye for sustainable treasury strategies and growth, he masterminds financial moves in the TurtleVerse. Passionate about projects like CamelsNFT, he’s dedicated to community safety, guiding newcomers, and sharing expertise in DeFi strategies—never swayed by paid promotions. Connect with him on X or Discord (lonederanger).',
  },
  {
    name: 'Khanh',
    avatar: 'about/4.png',
    xHandle: '@khanhtsn',
    xLink: 'https://x.com/khanhtsn',
    description: 'Is our shadowy code wizard, silently forging the backbone of Turtles NFTs on Cronos. As our in-house dev, he crafts bulletproof blockchain tech with ninja-like focus, keeping the TurtleVerse running smoothly. A quiet force, he’s all-in on our turtle tribe, letting his code roar louder than words!',
  },
]
</script>

<style scoped>
.thumbnail-img {
  width: 100%;
  max-width: 300px;
  border-radius: 8px;
}

.profile-card {
  transition: transform 0.2s;
}

.profile-card:hover {
  transform: translateY(-2px);
}

.profile-description {
  font-size: 0.875rem;
  line-height: 1.5;
}
</style>
