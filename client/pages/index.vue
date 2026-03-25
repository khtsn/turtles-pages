<template>
  <v-container class="content-container">
    <section class="hero-section">
      <v-row align="center">
        <v-col
          cols="12"
          md="7"
          order="2"
          order-md="1"
        >
          <h1 class="hero-title">
            Turtle on Cronos
          </h1>
          <p class="hero-token-line">
            $TURTLE • $wTURTLE • Turtles NFTs
          </p>
          <p class="hero-copy mt-4">
            Welcome to Turtle on Cronos, the ultimate destination for $TURTLE enthusiasts!
            You will find <strong>all resources and links</strong> related to our multi-chain,
            community-driven memecoin right here.
          </p>
          <div class="d-flex flex-wrap ga-4 mt-6">
            <v-btn
              flat
              size="large"
              class="custom-button"
              @click="openNewTab('https://crypto.com/onchain')"
            >
              Get Started
            </v-btn>
            <v-btn
              variant="outlined"
              size="large"
              class="secondary-button"
              @click="openNewTab('https://turtleoncro.com/bridge')"
            >
              Bridge Now
            </v-btn>
          </div>
        </v-col>
        <v-col
          cols="12"
          md="5"
          order="1"
          order-md="2"
          class="d-flex justify-center"
        >
          <div class="hero-art">
            <img
              src="/logo.jpg"
              alt="Turtle on Cronos logo"
              class="hero-logo"
            >
          </div>
        </v-col>
      </v-row>
    </section>

    <section class="section-block">
      <p class="section-label text-uppercase">
        Core Values
      </p>
      <v-row class="mt-2">
        <v-col
          v-for="value in coreValues"
          :key="value.title"
          cols="12"
          md="4"
        >
          <v-card
            variant="outlined"
            class="panel-card h-100"
          >
            <v-card-text class="pa-6">
              <p class="value-number mb-2">
                {{ value.number }}
              </p>
              <h2 class="card-title">
                {{ value.title }}
              </h2>
              <p class="card-copy mt-3">
                {{ value.copy }}
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </section>

    <section class="section-block">
      <p class="section-label text-uppercase">
        Turtle Stuff
      </p>
      <v-row class="mt-2">
        <v-col
          cols="12"
          md="6"
        >
          <v-card
            variant="outlined"
            class="panel-card h-100"
          >
            <v-card-text class="pa-6">
              <img
                src="/stuff-1.jpg"
                alt="Where to buy Turtle"
                class="section-image mb-4"
              >
              <h2 class="card-title">
                Where to Buy
              </h2>
              <p class="card-copy mt-3 mb-4">
                <strong>On Cronos ($TURTLE):</strong> Trading live on
                <strong> VVS.Finance, MMFINANCE, Ebisus Bay, Obsidian Finance, and CronaSwap.</strong>
              </p>
              <p class="card-copy mb-4">
                Download the
                <a
                  href="https://crypto.com/onchain"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-link"
                >
                  Crypto.com Onchain wallet
                </a>
                from any app store, or switch networks in your existing wallet.
              </p>
              <p class="card-copy">
                <strong>On Ethereum ($wTURTLE):</strong> Now trading on
                <strong> Uniswap</strong> and all major Ethereum aggregators.
              </p>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-card
            variant="outlined"
            class="panel-card h-100"
          >
            <v-card-text class="pa-6">
              <img
                src="/stuff-2.jpg"
                alt="Turtle bridge"
                class="section-image mb-4"
              >
              <h2 class="card-title">
                ETH Bridge - $TURTLE ↔ $wTURTLE (1:1)
              </h2>
              <p class="card-copy mt-3 mb-4">
                Bridge your tokens instantly between Cronos and Ethereum using our
                official <strong>LayerZero</strong> powered bridge.
              </p>
              <v-btn
                flat
                class="custom-button"
                @click="openNewTab('https://turtleoncro.com/bridge')"
              >
                Bridge Now
              </v-btn>
              <p class="card-copy mt-4">
                This expands liquidity, opens arbitrage opportunities, and gives $TURTLE
                full access to the Ethereum ecosystem.
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
            class="panel-card h-100"
          >
            <v-card-text class="pa-6">
              <img
                src="/stuff-2.jpg"
                alt="Investment warning"
                class="section-image mb-4"
              >
              <h2 class="card-title">
                Investment Warning
              </h2>
              <p class="card-copy mt-3">
                Investing in cryptocurrencies is risky. Only invest what you are willing to
                lose. Even the best tokens have dropped 95%+ at times.
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
            class="panel-card h-100"
          >
            <v-card-text class="pa-6">
              <img
                src="/stuff-3.jpg"
                alt="Turtle community"
                class="section-image mb-4"
              >
              <h2 class="card-title">
                Community
              </h2>
              <p class="card-copy mt-3">
                Our biggest strength is our community. Find us on X at
                <a
                  href="https://x.com/turtleoncro"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-link"
                >
                  turtleoncro
                </a>.
                Tag us, meme us, support each other - this is how we grow.
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
            class="panel-card h-100"
          >
            <v-card-text class="pa-6">
              <img
                src="/stuff-4.jpg"
                alt="Cronos awareness"
                class="section-image mb-4"
              >
              <h2 class="card-title">
                Awareness
              </h2>
              <p class="card-copy mt-3">
                Stay updated with the latest news, events, and Cronos blockchain
                developments through our website and social media.
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </section>

    <section class="section-block">
      <v-row align="center">
        <v-col
          cols="12"
          md="7"
        >
          <p class="section-label text-uppercase">
            Get Started
          </p>
          <h2 class="feature-title">
            Join the craze
          </h2>
          <p class="hero-copy mt-4">
            Turtle is programmed to move with the best cryptocurrencies long-term.
            <strong>Join the craze</strong> - download the Crypto.com Onchain wallet and
            dive in.
          </p>
          <div class="d-flex flex-wrap ga-4 mt-6">
            <v-btn
              flat
              size="large"
              class="custom-button"
              @click="openNewTab('https://crypto.com/onchain')"
            >
              Crypto.com Onchain Wallet
            </v-btn>
            <v-btn
              variant="outlined"
              size="large"
              class="secondary-button"
              @click="pushTo('/buy-turtle')"
            >
              How to Buy $TURTLE
            </v-btn>
          </div>
        </v-col>
        <v-col
          cols="12"
          md="5"
          class="d-flex justify-center"
        >
          <img
            src="/wallet.jpg"
            alt="Crypto.com Onchain Wallet"
            class="feature-image"
          >
        </v-col>
      </v-row>
    </section>

    <section class="section-block">
      <p class="section-label text-uppercase">
        Our Resources
      </p>
      <v-row class="mt-2">
        <v-col cols="12">
          <v-card
            variant="outlined"
            class="panel-card"
          >
            <v-card-text class="pa-6">
              <img
                src="/resource.jpg"
                alt="Turtle resources"
                class="section-image mb-4"
              >
              <h2 class="card-title">
                Track Liquidity Pools
              </h2>
              <p class="card-copy mt-3">
                Currently paired with: WCRO, WBTC, WETH, USDC, CAW, MERY, VVS, CROFOMO,
                PEPE, MOON, CROID, CRONA, FILLL, BGBK, CORGIAI, ARY, STAB, XRP, CROGINAL,
                ROBIN, ETC, NEURO, MTD.
              </p>
              <div class="mt-4">
                <v-btn
                  flat
                  class="custom-button"
                  @click="openNewTab('https://turtleoncro.com/#pools')"
                >
                  View All Pool Links
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col
          v-for="resource in featuredResources"
          :key="resource.title"
          cols="12"
          md="4"
        >
          <v-card
            variant="outlined"
            class="panel-card resource-card h-100"
            @click="openNewTab(resource.href)"
          >
            <v-card-text class="pa-6">
              <img
                :src="resource.image"
                :alt="resource.title"
                class="resource-logo mb-4"
              >
              <h2 class="card-title">
                {{ resource.title }}
              </h2>
              <p class="card-copy mt-3">
                {{ resource.copy }}
              </p>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card
            variant="outlined"
            class="panel-card"
          >
            <v-card-text class="pa-6">
              <h2 class="card-title">
                Tracked On
              </h2>
              <v-row
                class="mt-3"
                dense
              >
                <v-col
                  v-for="platform in trackedPlatforms"
                  :key="platform.title"
                  cols="12"
                  md="4"
                >
                  <div class="tracked-platform">
                    <img
                      :src="platform.image"
                      :alt="platform.title"
                      class="tracked-platform-logo"
                    >
                    <p class="card-copy mt-3 mb-0">
                      {{ platform.title }}
                    </p>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col
          v-for="link in actionLinks"
          :key="link.title"
          cols="12"
          md="4"
        >
          <v-card
            variant="outlined"
            class="panel-card resource-card h-100"
            @click="link.internal ? pushTo(link.href) : openNewTab(link.href)"
          >
            <v-card-text class="pa-6">
              <img
                v-if="link.image"
                :src="link.image"
                :alt="link.title"
                class="section-image mb-4"
              >
              <h2 class="card-title">
                {{ link.title }}
              </h2>
              <p class="card-copy mt-3">
                {{ link.copy }}
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </section>

    <section class="section-block">
      <v-card
        variant="outlined"
        class="contact-card"
      >
        <v-card-text class="pa-6 pa-md-8">
          <p class="section-label text-uppercase mb-4">
            Contact Us
          </p>
          <p class="card-copy mb-2">
            Email:
            <a
              href="mailto:Turtlecronos@hotmail.com"
              class="inline-link"
            >
              Turtlecronos@hotmail.com
            </a>
          </p>
          <p class="card-copy mb-0">
            Social:
            <a
              href="https://x.com/turtleoncro"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-link"
            >
              X / Twitter
            </a>
          </p>
        </v-card-text>
      </v-card>
    </section>
  </v-container>
</template>

<script setup>
const { openNewTab, pushTo } = useNavigation()

const coreValues = [
  {
    number: '01',
    title: 'Community-Driven',
    copy: 'We are a community-driven project, focused on organic growth, good vibes, and raising awareness about the Cronos blockchain.',
  },
  {
    number: '02',
    title: 'Safe Trading',
    copy: 'The first liquidity pool was vaulted and the keys burned. The community now manages many active LPs. $TURTLE is trading on 6 decentralized exchanges across two chains. Adding your own liquidity is encouraged - it helps with decentralization, stability, and long-term growth.',
  },
  {
    number: '03',
    title: 'No BS',
    copy: 'All of the supply was circulating from day one. No presales. No marketing. No fake utility. Started from scratch. We get what we put in. Slow and steady organic growth - turtle speed.',
  },
]

const featuredResources = [
  {
    title: 'CoinGecko',
    copy: 'Track Turtle on CoinGecko.',
    href: 'https://www.coingecko.com/en/coins/turtle-2',
    image: '/coingecko.png',
  },
  {
    title: 'Main Dextools Pair',
    copy: 'Open the main live Cronos pair on Dextools.',
    href: 'https://www.dextools.io/app/en/cronos/pair-explorer/0xea8f22344dd9269b030381f676432270a22a5837',
    image: '/dextools.png',
  },
  {
    title: 'GeckoTerminal',
    copy: 'View the Cronos pool on GeckoTerminal.',
    href: 'https://www.geckoterminal.com/cro/pools/0xea8f22344dd9269b030381f676432270a22a5837',
    image: '/geckoterminal.png',
  },
]

const actionLinks = [
  {
    title: 'How to Buy $TURTLE',
    copy: 'Step-by-step instructions for buying Turtle.',
    href: '/buy-turtle',
    internal: true,
    image: '/resource.jpg',
  },
  {
    title: 'Memes on Cronos',
    copy: 'Explore Turtle in the Memes on Cronos ecosystem.',
    href: 'https://turtleoncro.com/memes',
    internal: false,
    image: '/vote.jpg',
  },
  {
    title: 'Get Your Daily Vote',
    copy: 'Support Turtle with your daily vote.',
    href: 'https://turtleoncro.com/vote',
    internal: false,
    image: '/vote.jpg',
  },
]

const trackedPlatforms = [
  {
    title: 'DefiLlama',
    image: '/defillama-dark.webp',
  },
  {
    title: 'CoinPaprika',
    image: 'https://static.coinpaprika.com/assets/img/cp-logo.svg?rev=1',
  },
  {
    title: 'DappRadar',
    image: '/dappradar.png',
  },
]
</script>

<style scoped>
.page-shell {
  background:
    radial-gradient(circle at top right, rgba(var(--v-theme-primary), 0.14), transparent 30%),
    radial-gradient(circle at top left, rgba(var(--v-theme-primary), 0.06), transparent 28%),
    linear-gradient(180deg, #fff8f1 0%, #ffffff 22%, #fff7ed 100%);
}

.hero-section,
.section-block {
  margin-bottom: 4rem;
}

.eyebrow,
.section-label {
  font-size: 0.9rem;
  letter-spacing: 0.18em;
  color: rgb(var(--v-theme-primary));
  font-weight: 700;
}

.hero-title,
.feature-title {
  font-size: clamp(2.5rem, 6vw, 4.75rem);
  line-height: 0.98;
  text-transform: uppercase;
  font-weight: 800;
}

.hero-token-line {
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.hero-copy,
.card-copy {
  font-size: 1rem;
  line-height: 1.7;
}

.hero-art {
  width: min(100%, 420px);
  padding: 1.5rem;
  border: 1px solid rgba(var(--v-theme-primary), 0.22);
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 24px 60px rgba(141, 83, 21, 0.12);
}

.hero-logo,
.feature-image {
  width: 100%;
  max-width: 360px;
  height: auto;
  border-radius: 20px;
  display: block;
}

.panel-card {
  border: 1px solid rgba(var(--v-theme-primary), 0.18);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(255, 247, 237, 0.96));
  border-radius: 24px;
  box-shadow: 0 14px 34px rgba(141, 83, 21, 0.08);
}

.contact-card {
  border: 1px solid rgba(var(--v-theme-primary), 0.2);
  border-radius: 20px;
  color: rgba(255, 255, 255, 0.92);
  background: linear-gradient(180deg, #252525 0%, #1e1e1e 100%);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.14);
}

.card-title {
  font-size: 1.35rem;
  font-weight: 800;
  line-height: 1.2;
}

.section-image {
  width: 100%;
  height: 180px;
  object-fit: contain;
  border-radius: 18px;
  display: block;
}

.resource-logo {
  height: 48px;
  width: auto;
  display: block;
}

.tracked-platform {
  height: 100%;
  min-height: 150px;
  border: 1px solid rgba(var(--v-theme-primary), 0.12);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.72);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1.25rem;
}

.tracked-platform-logo {
  max-width: 170px;
  max-height: 44px;
  width: auto;
  height: auto;
  display: block;
}

.value-number {
  color: rgb(var(--v-theme-primary));
  font-size: 0.95rem;
  font-weight: 800;
  letter-spacing: 0.16em;
}

.resource-card {
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.resource-card:hover {
  transform: translateY(-4px);
  border-color: rgba(var(--v-theme-primary), 0.4);
  box-shadow: 0 18px 40px rgba(141, 83, 21, 0.14);
}

.inline-link {
  color: rgb(var(--v-theme-primary));
  font-weight: 700;
  text-decoration: none;
}

.inline-link:hover {
  text-decoration: underline;
}

.secondary-button {
  border-color: rgba(var(--v-theme-primary), 0.45);
}

.footer-note {
  padding-bottom: 1rem;
  opacity: 0.9;
}

@media (max-width: 960px) {
  .hero-title,
  .feature-title {
    font-size: clamp(2.1rem, 10vw, 3.4rem);
  }

  .hero-section,
  .section-block {
    margin-bottom: 3rem;
  }

  .section-image {
    height: auto;
  }
}
</style>
