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
        Mint turtle
      </p>

      <v-row class="mt-4">
        <v-col v-if="isConnected">
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
                @click="submitMint"
              >
                Mint ERC20
              </v-btn>
              <v-btn
                flat
                class="custom-button mint-button"
                @click="submitMintNative"
              >
                Mint Native
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col v-else>
          <v-btn
            flat
            size="large"
            class="custom-button"
            @click="open()"
          >
            Connect wallet
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { useWeb3Modal, useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers5/vue'

useHead({
  title: 'Mint Turtle',
  meta: [
    { name: 'description', content: 'Mint Turtle Page' },
    {
      hid: 'og:title',
      property: 'og:title',
      content: 'Mint Turtle - Turtle On Cronos',
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content: 'Mint Turtle Page',
    },
  ],
})

const { notifySuccess, notifyError } = useSnackbar()
const { isConnected, getSigner } = useProvider()
const { approveMint, mint, mintNative } = useContract()
const { open } = useWeb3Modal()
const { walletProvider } = useWeb3ModalProvider()
const { chainId } = useWeb3ModalAccount()

const amount = ref(1)
const processing = ref(false)

const submitMint = async () => {
  const provider = walletProvider
  if (!provider.value) {
    notifyError('User disconnected')
    return
  }

  if (chainId.value != 25) {
    open({ view: 'Networks' })
    return
  }

  try {
    const signer = getSigner(provider.value)
    const approval = await approveMint(signer, amount.value)
    processing.value = true
    await approval.wait()
    const result = await mint(signer, amount.value)
    await result.wait()
    processing.value = false
    notifySuccess('Request mint successfully')
  }
  catch (err) {
    console.error(err)
    processing.value = false
    notifyError('Unable to mint item. Please make sure you have enough token to mint the item.')
  }
}
const submitMintNative = async () => {
  const provider = walletProvider
  if (!provider.value) {
    notifyError('User disconnected')
    return
  }

  if (chainId.value != 25) {
    open({ view: 'Networks' })
    return
  }

  try {
    const signer = getSigner(provider.value)
    const result = await mintNative(signer, amount.value)
    processing.value = true
    await result.wait()
    processing.value = false
    notifySuccess('Request mint successfully')
  }
  catch (err) {
    console.error(err)
    processing.value = false
    notifyError('Unable to mint item. Please make sure you have enough token to mint the item.')
  }
}
</script>

<style scoped>
.mint-button {
  height: 40px !important;
}

@media screen and (max-width: 450px) {
  .mint-action {
    text-align: center;
  }
}
</style>
