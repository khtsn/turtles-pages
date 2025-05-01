<template>
  <div class="mt-16 mb-16">
    <v-container class="content-container">
      <p class="header-text text-uppercase">
        How to buy Turtle
      </p>

      <p class="font-weight-bold mt-4">
        CA: 0x8C9E2bEf2962CE302ef578113eebEc62920B7e57
      </p>
      <p class="mt-2">
        1) Download <span
          class="custom-link"
          @click="isApple ? openNewTab('https://apps.apple.com/us/app/crypto-com-onchain-wallet/id1512048310') : openNewTab('https://play.google.com/store/apps/details?id=com.defi.wallet')"
        >Crypto Defi Wallet</span> or Switch networks on your existing wallet to Cronos.
      </p>
      <p class="mt-2">
        2) Buy Cronos native token  for swaps and gas fees using their built in services or bridge using a well known bridge like changenow.io or synapseprotocol.com. There are many available. Check users reviews.
      </p>
      <p class="mt-2">
        3) Import TURTLE token on cronos network to your wallet using our Contract Address. This is necessary until we get whitelistings to see the token in your wallet.
      </p>
      <p class="mt-2">
        4) VVS.FINANCE is the preferred dex for trading with the most liquidity. Also trading on cronosmm.finance,  ebisusbay.com, and Cronaswap.org. Import Contract Address again to swap TURTLE.
      </p>
      <p class="mt-2">
        5) You can now swap assets for Turtle and see the assets in your wallet.
      </p>
      <p class="mt-2">
        6) Now, go to X. Tag us, meme us, and post us! This is how we thrive!
      </p>
    </v-container>
  </div>
</template>

<script setup>
const { isApple } = useCommon()
const { openNewTab } = useNavigation()
</script>
