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
        >Crypto Onchain Wallet</span> or switch networks on your existing wallet to Cronos.
      </p>
      <p class="mt-2">
        2) Buy Cronos native token for swaps and gas fees using their built-in services or bridge using a well-known bridge like changenow.io or synapseprotocol.com. There are many available. Check user reviews.
      </p>
      <p class="mt-2">
        3) With TURTLE token now loaded in the Crypto Onchain Wallet, no manual import or whitelistings are required to view it.
      </p>
      <p class="mt-2">
        4) You can now swap assets for Turtle using any Cronos dex or the built-in aggregator in the Onchain Wallet, and see the assets in your wallet.
      </p>
      <p class="mt-2">
        5) VVS.FINANCE is the preferred dex for trading with the most liquidity. Use it to swap TURTLE. Also consider trading on ebisusbay.com, obsidian.finance, cronaswap.org, swap.doonft.com, or wolfswap.app.
      </p>
      <p class="mt-2">
        6) Now, go to X. Tag us, meme us, and post us! This is how we thrive!
      </p>
      <p class="mt-2">
        <b>Direct Exchange links:</b><br>
        <a href="https://vvs.finance/swap?inputCurrency=CRO&outputCurrency=0x8C9E2bEf2962CE302ef578113eebEc62920B7e57">VVS Finance</a><br>
        <a href="https://app.ebisusbay.com/dex/swap?outputCurrency=0x8C9E2bEf2962CE302ef578113eebEc62920B7e57">Ebisus Bay</a><br>
        <a href="https://obsidian.finance/?outputCurrency=0x8C9E2bEf2962CE302ef578113eebEc62920B7e57">Obsidian Finance</a><br>
        <a href="https://swap.doonft.com/?output=0x8c9e2bef2962ce302ef578113eebec62920b7e57&chain=25">DooSwap</a><br>
        <a href="https://wolfswap.app/swap?chainId=25&sellToken=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE&buyToken=0x8c9e2bef2962ce302ef578113eebec62920b7e57">WolfSwap</a><br>
      </p>
      <p class="mt-2">
        <b>Turtles NFT Secondary:</b><br>
        <a href="https://minted.network/collections/cronos/0x2baa455e573df4019b11859231dd9e425d885293">Minted Network</a><br>
        <a href="https://app.ebisusbay.com/collection/cronos/turtles-nft">Ebisus Bay</a><br>
        <a href="https://corgistudio.io/collection/6896bcedb6297e2149b07b5c?tab=ONSALE">Corgi Studio</a><br>
      </p>
    </v-container>
  </div>
</template>

<script setup>
const { isApple } = useCommon()
const { openNewTab } = useNavigation()
</script>
