<template>
  <div class="mt-16 mb-16">
    <v-container class="content-container">
      <p class="header-text text-uppercase">
        How to Buy $TURTLE &amp; $wTURTLE
      </p>

      <p class="page-intro mt-4">
        Buy on Cronos, bridge 1:1 to Ethereum, or grab $wTURTLE directly on ETH.
        Slow and steady wins the race.
      </p>

      <v-row class="mt-6">
        <v-col
          v-for="contract in contracts"
          :key="contract.name"
          cols="12"
          md="6"
        >
          <v-card
            variant="outlined"
            class="info-card h-100"
          >
            <v-card-text class="pa-6">
              <p class="eyebrow text-uppercase mb-2">
                Contract Address
              </p>
              <h2 class="section-title mb-2">
                {{ contract.name }}
              </h2>
              <p class="card-copy mb-0">
                <code>{{ contract.address }}</code>
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <section class="mt-10">
        <h2 class="subheader-text">
          Step-by-Step Guide (Cronos Chain - $TURTLE)
        </h2>
        <v-row class="mt-2">
          <v-col
            v-for="step in cronosSteps"
            :key="step.title"
            cols="12"
            md="6"
          >
            <v-card
              variant="outlined"
              class="info-card h-100"
            >
              <v-card-text class="pa-6">
                <p class="step-number mb-2">
                  {{ step.number }}
                </p>
                <h3 class="card-title mb-3">
                  {{ step.title }}
                </h3>
                <p class="card-copy mb-0">
                  <template
                    v-for="(part, index) in step.content"
                    :key="`${step.number}-${index}`"
                  >
                    <span v-if="part.type === 'text'">{{ part.text }}</span>
                    <span
                      v-else
                      class="custom-link"
                      @click="openNewTab(part.href)"
                    >{{ part.text }}</span>
                  </template>
                </p>

                <ul
                  v-if="step.links?.length"
                  class="resource-list mt-4"
                >
                  <li
                    v-for="link in step.links"
                    :key="link.label"
                  >
                    <span
                      class="custom-link"
                      @click="openNewTab(link.href)"
                    >{{ link.label }}</span>
                  </li>
                </ul>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </section>

      <section class="mt-10">
        <h2 class="subheader-text">
          Buying $wTURTLE on Ethereum (1:1 Bridge)
        </h2>
        <v-row class="mt-2">
          <v-col
            v-for="option in ethereumOptions"
            :key="option.title"
            cols="12"
            md="6"
          >
            <v-card
              variant="outlined"
              class="info-card h-100"
            >
              <v-card-text class="pa-6">
                <p class="eyebrow text-uppercase mb-2">
                  {{ option.label }}
                </p>
                <h3 class="card-title mb-3">
                  {{ option.title }}
                </h3>
                <p class="card-copy mb-0">
                  {{ option.description }}
                </p>

                <ol
                  v-if="option.steps?.length"
                  class="bridge-steps mt-4"
                >
                  <li
                    v-for="step in option.steps"
                    :key="step"
                    class="mb-2"
                  >
                    {{ step }}
                  </li>
                </ol>

                <div
                  v-if="option.links?.length"
                  class="d-flex flex-wrap ga-3 mt-4"
                >
                  <v-btn
                    v-for="link in option.links"
                    :key="link.label"
                    flat
                    class="custom-button"
                    @click="openNewTab(link.href)"
                  >
                    {{ link.label }}
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </section>

      <section class="mt-10">
        <h2 class="subheader-text">
          Quick Links
        </h2>
        <v-row class="mt-2">
          <v-col
            v-for="group in quickLinkGroups"
            :key="group.title"
            cols="12"
            md="4"
          >
            <v-card
              variant="outlined"
              class="info-card h-100"
            >
              <v-card-text class="pa-6">
                <h3 class="card-title mb-4">
                  {{ group.title }}
                </h3>
                <div class="d-flex flex-column ga-3">
                  <span
                    v-for="link in group.links"
                    :key="link.label"
                    class="custom-link"
                    @click="openNewTab(link.href)"
                  >{{ link.label }}</span>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </section>

      <section class="mt-10">
        <v-card class="info-card">
          <v-card-text class="pa-6 pa-md-8">
            <p class="eyebrow text-uppercase mb-2">
              Pro Tip
            </p>
            <p class="highlight-copy mb-4">
              After you buy, head to X
              <span
                class="custom-link"
                @click="openNewTab('https://x.com/turtleoncro')"
              >@turtleoncro</span>,
              tag us, meme us, and post your entry. Community is how we thrive.
              Slow and steady wins the race.
            </p>
            <p class="risk-note mb-0">
              Investing in crypto is risky. Only use money you can afford to lose.
            </p>
          </v-card-text>
        </v-card>
      </section>
    </v-container>
  </div>
</template>

<script setup>
useHead({
  title: 'How to Buy Turtle',
  meta: [
    { name: 'description', content: 'How to buy $TURTLE on Cronos and $wTURTLE on Ethereum.' },
    {
      hid: 'og:title',
      property: 'og:title',
      content: 'How to Buy Turtle - Turtle On Cronos',
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content: 'Step-by-step guide for buying $TURTLE and $wTURTLE, plus bridge and marketplace links.',
    },
  ],
})

const { openNewTab } = useNavigation()

const contracts = [
  {
    name: '$TURTLE (Cronos)',
    address: '0x8C9E2bEf2962CE302ef578113eebEc62920B7e57',
  },
  {
    name: '$wTURTLE (Ethereum)',
    address: '0x911eb8e70D2bFf89c16Df04aF557c4De546838dF',
  },
]

const cronosSteps = [
  {
    number: '01',
    title: 'Set up your wallet',
    content: [
      { type: 'text', text: 'Download the ' },
      { type: 'link', text: 'Crypto.com Onchain Wallet', href: 'https://crypto.com/onchain' },
      { type: 'text', text: ' (iOS/Android) or switch your existing wallet like MetaMask to the Cronos network.' },
    ],
  },
  {
    number: '02',
    title: 'Get CRO for gas and swaps',
    content: [
      { type: 'text', text: 'Buy native CRO directly in the Crypto.com Onchain Wallet or bridge from another chain using a trusted service. Always check recent user reviews.' },
    ],
    links: [
      { label: 'ChangeNOW.io', href: 'https://changenow.io' },
      { label: 'Synapse Protocol', href: 'https://synapseprotocol.com' },
    ],
  },
  {
    number: '03',
    title: '$CRO appears automatically',
    content: [
      { type: 'text', text: 'Once you have CRO, no manual import or token whitelisting is needed. The token should show up in your wallet automatically.' },
    ],
  },
  {
    number: '04',
    title: 'Swap for $TURTLE',
    content: [
      { type: 'text', text: 'Use any Cronos DEX or the built-in aggregator in the Onchain Wallet to swap into $TURTLE.' },
    ],
  },
]

const ethereumOptions = [
  {
    label: 'Option A',
    title: 'Buy directly on Ethereum',
    description: 'Trade for $wTURTLE directly on Ethereum using Uniswap or an aggregator like 1inch or CowSwap.',
    links: [
      { label: 'Open Uniswap', href: 'https://app.uniswap.org/swap?outputCurrency=0x911eb8e70D2bFf89c16Df04aF557c4De546838dF&chain=ethereum' },
    ],
  },
  {
    label: 'Option B',
    title: 'Bridge from Cronos',
    description: 'Use the official Turtle Bridge powered by LayerZero to move between $TURTLE and $wTURTLE instantly at a 1:1 ratio.',
    steps: [
      'Go to the official Turtle Bridge.',
      'Connect your wallet.',
      'Swap $TURTLE and $wTURTLE 1:1.',
    ],
    links: [
      { label: 'Open Turtle Bridge', href: 'https://turtleoncro.com/bridge' },
    ],
  },
]

const quickLinkGroups = [
  {
    title: 'Direct Cronoschain DEX Links',
    links: [
      {
        label: 'VVS Finance',
        href: 'https://vvs.finance/trade/swap?inputCurrency=cro&outputCurrency=0x8C9E2bEf2962CE302ef578113eebEc62920B7e57&exactField=input',
      },
      {
        label: 'Ebisus Bay',
        href: 'https://app.ebisusbay.com/dex/swap?outputCurrency=0x8C9E2bEf2962CE302ef578113eebEc62920B7e57',
      },
      {
        label: 'Obsidian Finance',
        href: 'https://obsidian.finance/?outputCurrency=0x8C9E2bEf2962CE302ef578113eebEc62920B7e57',
      },
      {
        label: 'WolfSwap',
        href: 'https://wolfswap.app/swap?chainId=25&sellToken=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE&buyToken=0x8c9e2bef2962ce302ef578113eebec62920b7e57',
      },
      { label: 'DooSwap', href: 'https://swap.doonft.com' },
    ],
  },
  {
    title: 'Ethereum',
    links: [
      {
        label: 'Uniswap',
        href: 'https://app.uniswap.org/swap?outputCurrency=0x911eb8e70D2bFf89c16Df04aF557c4De546838dF&chain=ethereum',
      },
      {
        label: 'Matcha',
        href: 'https://matcha.xyz/trade?sellChain=1&sellAddress=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48&buyAddress=0x911eb8e70D2bFf89c16Df04aF557c4De546838dF&buyChain=1&ref=dexscreener&swapFeeBps=40',
      },
      {
        label: 'Kyberswap',
        href: 'https://kyberswap.com/partner-swap?chainId=1&inputCurrency=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48&outputCurrency=0x911eb8e70D2bFf89c16Df04aF557c4De546838dF&clientId=dexscreener&feeReceiver=0x0DA2a82ED2c387d1751ccbAf999A80b65bdb269E&enableTip=true&chargeFeeBy=currency_out&feeAmount=30&preferredFeeTokens=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      },
    ],
  },
  {
    title: 'Turtles NFT Secondary Marketplaces',
    links: [
      { label: 'Minted Network', href: 'https://minted.network' },
      { label: 'Ebisus Bay', href: 'https://ebisusbay.com' },
      { label: 'Corgi Studio', href: 'https://corgistudio.com' },
    ],
  },
]
</script>

<style scoped>
.page-intro {
  font-size: 1.05rem;
  line-height: 1.7;
  max-width: 720px;
}

.info-card {
  border: 1px solid rgba(var(--v-theme-primary), 0.2);
  border-radius: 20px;
  color: rgba(255, 255, 255, 0.92);
  background: linear-gradient(180deg, #252525 0%, #1e1e1e 100%);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.14);
}

.eyebrow {
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: rgb(var(--v-theme-primary));
}

.section-title,
.card-title {
  font-weight: 700;
  line-height: 1.25;
  color: #fff;
}

.section-title {
  font-size: 1.35rem;
}

.card-title {
  font-size: 1.15rem;
}

.card-copy {
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.88);
}

.step-number {
  font-size: 1.75rem;
  font-weight: 800;
  line-height: 1;
  color: rgb(var(--v-theme-primary));
}

.resource-list,
.bridge-steps {
  padding-left: 1.25rem;
}

.resource-list li,
.bridge-steps li {
  margin-bottom: 0.5rem;
  color: rgba(255, 255, 255, 0.88);
}

.highlight-copy,
.risk-note {
  line-height: 1.7;
}

.highlight-copy {
  font-size: 1.05rem;
}

.risk-note {
  font-weight: 600;
}

code {
  display: inline-block;
  word-break: break-all;
  padding: 0.35rem 0.5rem;
  border-radius: 8px;
  color: #fff;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
}
</style>
