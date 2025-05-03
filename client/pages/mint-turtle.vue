<template>
  <div class="mt-16 mb-16">
    <v-overlay
      v-model="processing"
      absolute
      persistent
      scrim="shadow"
      class="align-center justify-center"
    >
      <v-progress-circular
        color="primary"
        indeterminate
        size="64"
      />
    </v-overlay>

    <v-container class="content-container">
      <p class="header-text text-uppercase">
        Mint Turtles NFTs
      </p>
      <v-row>
        <v-col>
          <img
            src="/mint-banner.jpg"
            class="thumbnail"
          >
        </v-col>
      </v-row>
      <p>
        <b>Max supply:</b> 10,625<br>
        <b>CA:</b> 0x2baa455e573df4019b11859231dd9e425d885293<br>
        <b>Max 20 mints per transaction</b><br>
        <b>Mint fee with TURTLES:</b> {{ tokenFee }} TURTLES per NFT<br>
        <b>Mint fee with CRO:</b> {{ nativeFee }} CRO per NFT<br>
        <b v-if="eip155Account.isConnected">Connected wallet address:</b> {{ eip155Account.address }}
        <a
          v-if="eip155Account.isConnected"
          href="#"
          @click="disconnect()"
        >[Disconnect wallet]</a>
      </p>

      <v-row class="mt-4">
        <v-col v-if="eip155Account.isConnected">
          <v-row>
            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="amount"
                :rules="[v => !!v || 'Value is required', v => v > 0 || 'Value must be greater than 0', v => v <= 20 || 'Value must be less than or equal to 20']"
                label="Amount"
                variant="outlined"
                density="compact"
                type="number"
                min="1"
                max="20"
              />
            </v-col>
            <v-col
              cols="12"
              md="4"
              class="mint-action"
            >
              <v-btn
                flat
                class="custom-button mint-button mr-2"
                @click="submitMintERC20"
              >
                Mint with TURTLES
              </v-btn>
              <v-btn
                flat
                class="custom-button mint-button"
                @click="submitMintNative"
              >
                Mint with CRO
              </v-btn>
            </v-col>
          </v-row>
          <v-row v-if="transactionHash">
            <p>
              Minted successfully!<br>
              Transaction Hash: <a :href="prepareExplorerURL(transactionHash)">{{ transactionHash }}</a>
            </p>
          </v-row>
        </v-col>
        <v-col v-else>
          <v-btn
            flat
            size="large"
            class="custom-button"
            @click="open"
          >
            Connect wallet
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/vue'
import { ethers, BrowserProvider } from 'ethers'

useHead({
  title: 'Mint Turtles NFTs',
  meta: [
    { name: 'description', content: 'Mint Turtle Page' },
    {
      hid: 'og:title',
      property: 'og:title',
      content: 'Mint Turtles NFTs - Turtle On Cronos',
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content: 'Mint Turtles NFTs Page',
    },
  ],
})

const { notifySuccess, notifyError } = useSnackbar()
const { approveERC20Token, mintWithERC20Token, mintWithNativeToken,
  getERC20TokenFee, getNativeTokenFee, open,
  disconnect } = useContract()
const amount = ref(1)
const processing = ref(false)
const eip155Account = useAppKitAccount({ namespace: 'eip155' })
const transactionHash = ref(false)
const nativeFee = ref(0)
const tokenFee = ref(0)

watch(eip155Account.value, async (account) => {
  if (account.isConnected) {
    const { walletProvider } = useAppKitProvider('eip155')
    const provider = new BrowserProvider(walletProvider)
    nativeFee.value = ethers.formatEther(await getNativeTokenFee(provider))
    tokenFee.value = ethers.formatEther(await getERC20TokenFee(provider))
  }
})

const submitMintERC20 = async () => {
  try {
    processing.value = true

    const { walletProvider } = useAppKitProvider('eip155')
    const provider = new BrowserProvider(walletProvider)
    const signer = await provider.getSigner()
    const fee = await getERC20TokenFee(provider)
    const tx1 = await approveERC20Token(signer, fee * BigInt(amount.value))
    await tx1.wait()
    const tx2 = await mintWithERC20Token(signer, amount.value)
    const receipt = await tx2.wait()
    transactionHash.value = receipt.hash

    processing.value = false
    notifySuccess('Minted successfully!')
  }
  catch (err) {
    console.error(err)
    processing.value = false
    notifyError('Unable to mint item. Please make sure you have enough token to mint the item.')
  }
}
const submitMintNative = async () => {
  try {
    processing.value = true

    const { walletProvider } = useAppKitProvider('eip155')
    const provider = new BrowserProvider(walletProvider)
    const signer = await provider.getSigner()

    const fee = await getNativeTokenFee(provider)
    const tx = await mintWithNativeToken(signer, fee, amount.value)
    const receipt = await tx.wait()
    console.log(receipt)
    transactionHash.value = receipt.hash

    processing.value = false
    notifySuccess('Minted successfully!')
  }
  catch (err) {
    console.error(err)
    processing.value = false
    notifyError('Unable to mint item. Please make sure you have enough token to mint the item.')
  }
}

const prepareExplorerURL = (val) => {
  {
    return ('https://cronoscan.com/tx/' + val)
  }
}
</script>

<style scoped>
.mint-button {
  height: 40px !important;
}

.thumbnail {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

@media screen and (max-width: 450px) {
  .mint-action {
    text-align: center;
  }
}
</style>
