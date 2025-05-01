<template>
  <div class="mt-16 mb-16">
    <v-container class="content-container">
      <v-row>
        <v-col
          cols="12"
          md="6"
          order="2"
          order-md="1"
        >
          <p class="headline-text text-uppercase">
            turtle on
          </p>
          <p class="headline-text text-uppercase mt-n4">
            chronos
          </p>
          <p class="mt-2">
            Welcome to Turtle on Cronos, the ultimate destination for $TURTLE enthusiasts! You will find all resources and links related to the community driven memecoin on this website.
          </p>
          <v-btn
            flat
            size="large"
            class="custom-button mt-4"
            @click="openNewTab('https://x.com/TurtleonCro?t=kF5epkj0Dk6L2WOu3vg_0Q&s=09')"
          >
            Explore the $TURTLE pond
          </v-btn>
        </v-col>
        <v-col
          cols="12"
          md="6"
          order="1"
          order-md="2"
          class="d-flex justify-center align-center"
        >
          <img
            src="/logo.jpg"
            alt="logo"
            class="logo"
          >
        </v-col>
      </v-row>

      <p class="header-text text-uppercase mt-16">
        core values
      </p>
      <v-row class="mt-4">
        <v-col
          cols="12"
          md="4"
        >
          <v-card
            variant="outlined"
            class="value-card"
          >
            <v-card-title>
              <p class="header-text text-center text-primary">
                1
              </p>
              <p class="subheader-text text-center">
                Community-Driven
              </p>
            </v-card-title>
            <v-card-text>
              <p>
                We are a community-driven project, focused on organic growth, good vibes,  and raising awareness about the Cronos blockchain.
              </p>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-card
            variant="outlined"
            class="value-card"
          >
            <v-card-title>
              <p class="header-text text-center text-primary">
                2
              </p>
              <p class="subheader-text text-center">
                Safe trading
              </p>
            </v-card-title>
            <v-card-text>
              <p>
                The first liquidity pool was vaulted and the keys burned. The community now has 22 active LPs, and is trading on 4 decentralized exchanges. Adding your own liquidity is encouraged and helps decentralization, stability, and longterm growth.
              </p>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-card
            variant="outlined"
            class="value-card"
          >
            <v-card-title>
              <p class="header-text text-center text-primary">
                3
              </p>
              <p class="subheader-text text-center">
                No BS
              </p>
            </v-card-title>
            <v-card-text>
              <p>
                All of the supply was circulating from day one. No presales. No marketing. No utility. Started from scratch. We get what we put in. Slow and steady organic growth, turtle speed.
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <p class="header-text text-uppercase mt-16">
        turtle stuff
      </p>
      <v-row class="mt-4">
        <v-col
          cols="12"
          md="3"
        >
          <img
            src="/stuff-1.jpg"
            alt="thumbnail"
            class="thumbnail"
          >
        </v-col>
        <v-col
          cols="12"
          md="9"
        >
          <p class="subheader-text text-primary">
            Where to buy?
          </p>
          <p>Currently trading on VVS.Finance, MMFINANCE, Ebisus Bay, and CronaSwap decentralized exchanges. Download CryptoCom defi wallet from any app stores, or switch networks on your existing wallet.</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="3"
        >
          <img
            src="/stuff-2.jpg"
            alt="thumbnail"
            class="thumbnail"
          >
        </v-col>
        <v-col
          cols="12"
          md="9"
        >
          <p class="subheader-text text-primary">
            Investment
          </p>
          <p>Investing in cryptocurrencies is risky. Only invest what you're willing to lose. Even the best tokens have dropped 95+%.</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="3"
        >
          <img
            src="/stuff-3.jpg"
            alt="thumbnail"
            class="thumbnail"
          >
        </v-col>
        <v-col
          cols="12"
          md="9"
        >
          <p class="subheader-text text-primary">
            Community
          </p>
          <p>Our biggest strength is community. Find us on X at @turtleoncro. Tag us, meme us, support each other, this is how we continue to expand.</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="3"
        >
          <img
            src="/stuff-4.jpg"
            alt="thumbnail"
            class="thumbnail"
          >
        </v-col>
        <v-col
          cols="12"
          md="9"
        >
          <p class="subheader-text text-primary">
            Awareness
          </p>
          <p>Stay updated with the latest news, events, and developments in the Cronos blockchain through our website and social media.</p>
        </v-col>
      </v-row>

      <v-row class="mt-16">
        <v-col
          cols="12"
          md="6"
          order="2"
          order-md="1"
        >
          <p class="header-text text-uppercase">
            Join the Crypto Craze,
          </p>
          <p class="header-text text-uppercase mt-n4">
            join turtle on cronos
          </p>
          <p class="mt-2">
            Turtle is programmed to move with the best cryptocurrencies longterm. Get started by downloading the Cryptocom Defi wallet.
          </p>
          <v-btn
            flat
            size="large"
            class="custom-button mt-4"
            @click="isApple ? openNewTab('https://apps.apple.com/us/app/crypto-com-onchain-wallet/id1512048310') : openNewTab('https://play.google.com/store/apps/details?id=com.defi.wallet')"
          >
            Cryptocom Defi Wallet
          </v-btn>
        </v-col>
        <v-col
          cols="12"
          md="6"
          order="1"
          order-md="2"
          class="d-flex justify-center align-center"
        >
          <img
            src="/wallet.jpg"
            alt="logo"
            class="thumbnail-center"
          >
        </v-col>
      </v-row>

      <p class="header-text text-uppercase mt-16">
        our resources
      </p>
      <v-row class="mt-4">
        <v-col
          cols="12"
          md="8"
          offset-md="2"
        >
          <div class="text-center">
            <img
              src="/resource.jpg"
              alt="thumbnail"
              class="thumbnail-center"
            >
            <p class="subheader-text mt-2">
              Track LIQUIDITY pools
            </p>
            <p>
              At this moment turtle is paired with wcro, wbtc, weth, usdc, caw, Mery, vvs, crofomo, PEPE, moon, croid, crona, FILLL, BGBK, CORGIAI, ARY, Stab, xrp, Croginal.
              <NuxtLink
                to="/dexscreener"
                class="text-primary font-weight-bold"
              >
                View links
              </NuxtLink>
            </p>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-card
            variant="outlined"
            class="resource-card"
            @click="openNewTab('https://www.dextools.io/app/en/cronos/pair-explorer/0xea8f22344dd9269b030381f676432270a22a5837?t=1746073344717')"
          >
            <v-card-text>
              <div class="text-center">
                <img
                  src="/dextools.png"
                  alt="logo"
                  class="source-logo"
                >
                <p class="subheader-text mt-4">
                  MAIN Dextools pair link
                </p>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-card
            variant="outlined"
            class="resource-card"
            @click="openNewTab('https://www.geckoterminal.com/cro/pools/0xea8f22344dd9269b030381f676432270a22a5837')"
          >
            <v-card-text>
              <div class="text-center">
                <img
                  src="/geckoterminal.png"
                  alt="logo"
                  class="source-logo"
                >
                <p class="subheader-text mt-4">
                  GeckoTerminal
                </p>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <p class="header-text text-uppercase text-center mt-16">
        How to buy $tURTLE
      </p>
      <div class="text-center mt-4">
        <v-btn
          flat
          size="large"
          class="custom-button"
          @click="pushTo('/buy-turtle')"
        >
          View Instructions
        </v-btn>
      </div>

      <p class="header-text text-uppercase text-center mt-16">
        Memesoncronos
      </p>
      <v-row class="mt-4">
        <v-col>
          <div class="text-center">
            <img
              src="/vote.jpg"
              alt="thumbnail"
              class="thumbnail-center"
            >
          </div>
          <div class="text-center mt-4">
            <v-btn
              flat
              size="large"
              class="custom-button"
              @click="openNewTab('https://www.memesoncronos.com/tokens/turtle')"
            >
              Get your daily Vote
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
const { isApple } = useCommon()
const { openNewTab, pushTo } = useNavigation()
</script>

<style scoped>
.logo {
  height: 250px;
  border-top-left-radius: 25px;
  border-bottom-right-radius: 25px;
}

.value-card {
  height: 245px;
}

.thumbnail {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.thumbnail-center {
  height: 200px;
  border-radius: 8px;
}

.source-logo {
  height: 50px;
}

.resource-card {
  cursor: pointer;
}

@media (max-width: 450px) {
  .thumbnail-center {
    width: 100%;
    height: auto;
  }
}
</style>
