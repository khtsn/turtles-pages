<template>
  <v-container class="content-container">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h3 mb-4 text-center">
          Turtle Tide Tactics: Unlock $TURTLE Rewards & Stabilize Turtle NFTs
        </h1>

        <v-card class="mb-6">
          <v-card-text>
            <p class="text-h6 mb-4">
              Welcome to TurtleRedemptionVault — your live, on-chain liquidity engine for Turtle NFTs on Cronos.
            </p>
            <p class="text-center font-weight-bold">
              Deposit, swap, or buy directly. Active now.
            </p>
          </v-card-text>
        </v-card>

        <!-- How It Works Section -->
        <v-card class="mb-6">
          <v-card-title class="text-h4">
            How It Works (Live & Transparent)
          </v-card-title>
          <v-card-text>
            <!-- Deposit NFT -->
            <v-card
              class="mb-4"
            >
              <v-card-title class="text-h5">
                1. Deposit NFT → Claim $TURTLE Instantly
              </v-card-title>
              <v-card-text>
                <ul>
                  <li>Send your Turtle NFT to the vault</li>
                  <li>Auto-receive $TURTLE based on: <code>Total $TURTLE in Pool ÷ Total NFTs (10,625)</code></li>
                  <li>NFT is permanently locked — you get $TURTLE upfront</li>
                  <li>This is the only way $TURTLE exits the vault</li>
                </ul>
              </v-card-text>
            </v-card>

            <!-- Swap 1:1 -->
            <v-card
              class="mb-4"
            >
              <v-card-title class="text-h5">
                2. Swap 1:1 → Grow Rewards for All
              </v-card-title>
              <v-card-text>
                <ul>
                  <li>Pay 1 Turtle NFT + Turtle Per NFT Fee + 32,000 $TURTLE fee</li>
                  <li>Receive 1 Vault NFT instantly</li>
                  <li>Your NFT + 100% of fees locked → increases $TURTLE per NFT (e.g., 2,354 → 2,357 per deposit)</li>
                  <li>Keeps NFT count stable. Fuels growth.</li>
                </ul>
              </v-card-text>
            </v-card>

            <!-- Buy with CRO -->
            <v-card
              class="mb-4"
            >
              <v-card-title class="text-h5">
                3. Buy with CRO → Power the Ecosystem
              </v-card-title>
              <v-card-text>
                <p class="mb-3">
                  Purchase Turtle NFTs on-site using CRO:
                </p>
                <ul class="mb-3">
                  <li>Launch floor: 216 CRO (20% above CRO mint price)</li>
                  <li>Live floor: 20%+ above marketplace CRO floor (post mint, adjusted in 24 hrs)</li>
                </ul>
                <p class="font-weight-bold">
                  CRO is used to:
                </p>
                <ol>
                  <li>Buy and replace 2x $TURTLE taken for original deposit → sent to vault pool</li>
                  <li>Fund annual buybacks wallet. Once annual top-ups are completed for our earning contract, remainder gets deposited into pool.</li>
                </ol>
                <p class="mt-2">
                  • This is the only way NFTs leave the vault (besides swaps)
                </p>
              </v-card-text>
            </v-card>

            <!-- Live Dashboard -->
            <v-card>
              <v-card-title class="text-h5">
                4. Live Dashboard - Real-time stats
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col
                    cols="12"
                    md="4"
                  >
                    <v-card
                      class="text-center pa-4"
                      color="primary"
                      variant="tonal"
                    >
                      <h3>Total $TURTLE in vault</h3>
                      <p class="text-h4">
                        {{ totalTurtle.toLocaleString() }}
                      </p>
                    </v-card>
                  </v-col>
                  <v-col
                    cols="12"
                    md="4"
                  >
                    <v-card
                      class="text-center pa-4"
                      color="secondary"
                      variant="tonal"
                    >
                      <h3>NFTs in vault</h3>
                      <p class="text-h4">
                        {{ nftsInVault.toLocaleString() }}
                      </p>
                    </v-card>
                  </v-col>
                  <v-col
                    cols="12"
                    md="4"
                  >
                    <v-card
                      class="text-center pa-4"
                      color="success"
                      variant="tonal"
                    >
                      <h3>Current $TURTLE per NFT</h3>
                      <p class="text-h4">
                        {{ turtlePerNft.toLocaleString() }}
                      </p>
                    </v-card>
                  </v-col>
                </v-row>
                <p class="text-center mt-4">
                  • Contract verified on Cronos Explorer •
                </p>
              </v-card-text>
            </v-card>
          </v-card-text>
        </v-card>

        <!-- Why This Wins Section -->
        <v-card class="mb-6">
          <v-card-title class="text-h4">
            Why This Wins (Live Results)
          </v-card-title>
          <v-card-text class="ml-2">
            <v-row>
              <v-col
                cols="12"
                md="6"
              >
                <h4>Benefit</h4>
                <ul>
                  <li>Instant Payouts</li>
                  <li>Self-Growing Pool</li>
                  <li>Bot offers competition</li>
                  <li>Stable Markets</li>
                  <li>Earn While Holding</li>
                  <li>Locked Forever</li>
                </ul>
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <h4>Live Impact</h4>
                <ul>
                  <li>~2,354 $TURTLE per NFT now → grows with every action</li>
                  <li>Swaps & CRO buys add more $TURTLE per nft</li>
                  <li>Dynamic pricing + vault lock = less cheap wCRO dumps</li>
                  <li>Less sell pressure → stronger floors across all platforms</li>
                  <li>Stake 35,000 $TURTLE + 1 NFT → 10 $TURTLE daily (10.29% APY)</li>
                  <li>True commitment: assets only exit via user actions</li>
                </ul>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <!-- Stability Section -->
        <v-card class="mb-6">
          <v-card-title class="text-h4">
            $TURTLE & NFT Stability (On-Chain Proof)
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col
                cols="12"
                md="6"
              >
                <h4>$TURTLE:</h4>
                <p>Constant CRO → $TURTLE buys reduce supply, increase demand</p>
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <h4>NFTs:</h4>
                <p>Vault restocks + anti-dump pricing = rising, stable floor</p>
              </v-col>
            </v-row>
            <p class="mt-4">
              <strong>Post-Mint Boost:</strong> Extra $TURTLE injection after 10,625 NFTs (live countdown on site)
            </p>
          </v-card-text>
        </v-card>

        <!-- Action Buttons -->
        <v-card class="text-center">
          <v-card-title class="text-h4">
            Start Now — It's Live
          </v-card-title>
          <v-card-text>
            <v-row class="justify-center">
              <v-col
                cols="12"
                md="4"
              >
                <v-btn
                  size="large"
                  color="primary"
                  block
                  class="mb-2"
                >
                  Deposit
                </v-btn>
                <p>NFT in, $TURTLE out</p>
              </v-col>
              <v-col
                cols="12"
                md="4"
              >
                <v-btn
                  size="large"
                  color="secondary"
                  block
                  class="mb-2"
                >
                  Swap
                </v-btn>
                <p>1 NFT + Per NFT fee + 32K $TURTLE → 1 Vault NFT</p>
              </v-col>
              <v-col
                cols="12"
                md="4"
              >
                <v-btn
                  size="large"
                  color="success"
                  block
                  class="mb-2"
                >
                  Buy
                </v-btn>
                <p>Pay CRO → Get NFT + grow the tide</p>
              </v-col>
            </v-row>
            <p class="mt-4">
              Contract: <a
                href="https://cronos.org/explorer"
                target="_blank"
              >View on Cronos Explorer</a> (search TurtleRedemptionVault)
            </p>
            <p class="mt-2">
              Built by the community. Powered by you.
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

useHead({
  title: 'Turtle Tide Tactics',
  meta: [
    { name: 'description', content: 'Unlock $TURTLE Rewards & Stabilize Turtle NFTs with TurtleRedemptionVault' },
    {
      hid: 'og:title',
      property: 'og:title',
      content: 'Turtle Tide Tactics - Turtle On Cronos',
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content: 'Your live, on-chain liquidity engine for Turtle NFTs on Cronos',
    },
  ],
})

// Mock data - replace with real API calls
const totalTurtle = ref(2354000)
const nftsInVault = ref(1250)
const turtlePerNft = ref(2354)
</script>

<style scoped>
code {
  background-color: rgba(0, 0, 0, 0.1);
  padding: 2px 4px;
  border-radius: 4px;
  font-family: monospace;
}
</style>
