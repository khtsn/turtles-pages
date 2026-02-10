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

    <v-container
      class="content-container"
      style="max-width: 600px;"
    >
      <p class="header-text text-uppercase text-center">
        Bridge Turtle Tokens
      </p>
      <v-alert
        type="warning"
        prominent
      >
        <v-icon
          size="small"
          class="mr-2"
        >
          mdi-information
        </v-icon>
        Bridge TURTLE tokens only. Native tokens (CRO/ETH) cannot be bridged.
      </v-alert>

      <v-card
        class="mt-6 bridge-card"
        elevation="2"
      >
        <v-card-text class="pa-6">
          <!-- From Chain -->
          <div class="chain-selector mb-4">
            <div class="d-flex align-center justify-space-between pa-4 chain-box">
              <div class="d-flex align-center">
                <v-avatar
                  size="32"
                  class="mr-3"
                >
                  <v-icon>{{ fromChain.icon }}</v-icon>
                </v-avatar>
                <div>
                  <div class="text-caption text-grey">
                    From
                  </div>
                  <div class="text-h6">
                    {{ fromChain.name }}
                  </div>
                </div>
              </div>
              <div class="text-right">
                <div class="text-caption text-grey">
                  Balance
                </div>
                <div class="font-weight-bold">
                  {{ balance || '0' }}
                </div>
              </div>
            </div>
          </div>

          <!-- Swap Button -->
          <div class="text-center my-2">
            <v-icon>mdi-arrow-down</v-icon>
          </div>

          <!-- To Chain -->
          <div class="chain-selector mb-4">
            <div class="d-flex align-center justify-space-between pa-4 chain-box">
              <div class="d-flex align-center">
                <v-avatar
                  size="32"
                  class="mr-3"
                >
                  <v-icon>{{ toChain.icon }}</v-icon>
                </v-avatar>
                <div>
                  <div class="text-caption text-grey">
                    To
                  </div>
                  <div class="text-h6">
                    {{ toChain.name }}
                  </div>
                </div>
              </div>
              <div class="text-right">
                <div class="text-caption text-grey">
                  You'll receive
                </div>
                <div class="font-weight-bold">
                  {{ amount || '0' }}
                </div>
              </div>
            </div>
          </div>

          <!-- Amount Input -->
          <div class="mb-4">
            <div class="d-flex justify-space-between mb-2">
              <span class="text-caption text-grey">Amount</span>
              <span class="text-caption text-grey">Balance: {{ balance || '0' }} TURTLE</span>
            </div>
            <v-text-field
              v-model="amount"
              variant="outlined"
              density="comfortable"
              type="number"
              min="0.01"
              placeholder="0.0"
              hide-details
            >
              <template #append-inner>
                <v-chip
                  size="small"
                  @click="setMaxAmount"
                >
                  MAX
                </v-chip>
              </template>
            </v-text-field>
          </div>

          <!-- Bridge Info -->
          <v-card
            variant="tonal"
            class="mb-4"
          >
            <v-card-text class="pa-3">
              <div class="d-flex justify-space-between mb-2">
                <span class="text-caption">Bridge Fee</span>
                <span class="text-caption font-weight-bold">{{ estimatedFee || '~' }} {{ fromChain.nativeToken }}</span>
              </div>
              <div class="d-flex justify-space-between mb-2">
                <span class="text-caption">Estimated Time</span>
                <span class="text-caption font-weight-bold">~2-5 minutes</span>
              </div>
              <div class="d-flex justify-space-between">
                <span class="text-caption">Recipient</span>
                <span class="text-caption font-weight-bold">{{ formatAddress(eip155Account.address) }}</span>
              </div>
            </v-card-text>
          </v-card>

          <!-- Process Info -->
          <v-alert
            v-if="eip155Account.isConnected && fromChain.tokenContract"
            variant="tonal"
            color="info"
            density="compact"
            class="mb-4 text-caption"
          >
            <div class="d-flex align-center">
              <v-icon
                size="16"
                class="mr-2"
              >
                mdi-information
              </v-icon>
              <span>Requires up to 2 transactions: approval (if needed) + bridge</span>
            </div>
          </v-alert>

          <v-btn
            v-if="eip155Account.isConnected"
            flat
            class="custom-button"
            block
            size="large"
            :disabled="!amount || parseFloat(amount) <= 0"
            @click="bridge"
          >
            Bridge to {{ toChain.name }}
          </v-btn>
          <v-btn
            v-else
            flat
            class="custom-button"
            block
            size="large"
            @click="open"
          >
            Connect Wallet
          </v-btn>
        </v-card-text>
      </v-card>

      <!-- Transaction Success -->
      <v-card
        v-if="txHash"
        class="mt-4"
        elevation="2"
      >
        <v-card-text class="pa-6">
          <div class="d-flex align-center mb-4">
            <v-icon
              size="40"
              color="success"
              class="mr-3"
            >
              mdi-check-circle
            </v-icon>
            <div>
              <div class="text-h6 font-weight-bold">
                Transaction Submitted
              </div>
              <div class="text-caption text-grey">
                Bridging to {{ toChain.name }}
              </div>
            </div>
          </div>
          <div class="d-flex flex-column ga-2">
            <v-btn
              variant="tonal"
              :href="`${fromChain.explorer}/tx/${txHash}`"
              target="_blank"
              append-icon="mdi-open-in-new"
              block
            >
              View on {{ fromChain.explorerName }}
            </v-btn>
            <v-btn
              variant="tonal"
              :href="`https://layerzeroscan.com/tx/${txHash}`"
              target="_blank"
              append-icon="mdi-open-in-new"
              block
            >
              Track on LayerZero
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script setup>
import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/vue'
import { BrowserProvider, Contract, parseEther, formatEther, zeroPadValue } from 'ethers'

// Standard minimal ERC-20 ABI
const ERC20_ABI = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
  'function totalSupply() view returns (uint256)',
  'function balanceOf(address) view returns (uint256)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'function allowance(address owner, address spender) view returns (uint256)',
]

const OFT_ABI = [
  'function quoteSend(tuple(uint32 dstEid, bytes32 to, uint256 amountLD, uint256 minAmountLD, bytes extraOptions, bytes composeMsg, bytes oftCmd) _sendParam, bool _payInLzToken) view returns (tuple(uint256 nativeFee, uint256 lzTokenFee))',
  'function send(tuple(uint32 dstEid, bytes32 to, uint256 amountLD, uint256 minAmountLD, bytes extraOptions, bytes composeMsg, bytes oftCmd) _sendParam, tuple(uint256 nativeFee, uint256 lzTokenFee) _fee, address _refundAddress) payable returns (tuple(bytes32 guid, tuple(uint256 nativeFee, uint256 lzTokenFee) fee))',
  'function token() view returns (address)',
  'function approvalRequired() view returns (bool)',
]

useHead({
  title: 'Bridge Turtle Tokens',
  meta: [
    { name: 'description', content: 'Bridge wTURTLE tokens between Cronos and Ethereum' },
    { hid: 'og:title', property: 'og:title', content: 'Bridge Turtle Tokens - Turtle' },
  ],
})

const CHAINS = {
  cronos: {
    id: 25,
    name: 'Cronos',
    icon: 'mdi-alpha-c-circle',
    nativeToken: 'CRO',
    eid: 30359,
    tokenContract: '0x8C9E2bEf2962CE302ef578113eebEc62920B7e57',
    contract: '0xd5Fc2B122B9c085cd196d94Bf83F64972371B8Aa', //oft adapter
    explorer: 'https://explorer.cronos.org/',
    explorerName: 'Cronos Explorer',
  },
  ethereum: {
    id: 1,
    name: 'Ethereum',
    icon: 'mdi-ethereum',
    nativeToken: 'ETH',
    eid: 30101,
    contract: '0x911eb8e70D2bFf89c16Df04aF557c4De546838dF', //oft
    explorer: 'https://etherscan.io',
    explorerName: 'Etherscan',
  },
}

const { notifySuccess, notifyError } = useSnackbar()
const { open } = useContract()
const eip155Account = useAppKitAccount({ namespace: 'eip155' })

const fromChain = ref(CHAINS.cronos)
const toChain = ref(CHAINS.ethereum)
const amount = ref('')
const processing = ref(false)
const txHash = ref('')
const balance = ref('')
const estimatedFee = ref('')
const wrongNetwork = ref(false)

let refreshInterval = null

watch(() => eip155Account.value.isConnected, async (connected) => {
  if (connected) {
    checkNetwork()
    await loadStats()
    // Start auto-refresh every 10 seconds
    if (refreshInterval) clearInterval(refreshInterval)
    refreshInterval = setInterval(loadStats, 10000)
  }
  else {
    // Stop auto-refresh when disconnected
    if (refreshInterval) {
      clearInterval(refreshInterval)
      refreshInterval = null
    }
  }
}, { immediate: true })

watch(() => eip155Account.value.chainId, () => {
  if (eip155Account.value.isConnected) {
    checkNetwork()
  }
})

onUnmounted(() => {
  if (refreshInterval) clearInterval(refreshInterval)
})
watch(amount, () => {
  if (amount.value && parseFloat(amount.value) > 0) {
    estimateFee()
  }
  else {
    estimatedFee.value = ''
  }
})

const checkNetwork = () => {
  wrongNetwork.value = eip155Account.value.chainId !== fromChain.value.id
}

const switchNetwork = async () => {
  try {
    const { walletProvider } = useAppKitProvider('eip155')
    await walletProvider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${fromChain.value.id.toString(16)}` }],
    })
  }
  catch (err) {
    notifyError('Failed to switch network')
  }
}

const swapChains = () => {
  const temp = fromChain.value
  fromChain.value = toChain.value
  toChain.value = temp
  balance.value = ''
  estimatedFee.value = ''
  if (eip155Account.value.isConnected) {
    checkNetwork()
    loadStats()
  }
}

const loadStats = async () => {
  try {
    const { walletProvider } = useAppKitProvider('eip155')
    const provider = new BrowserProvider(walletProvider)
    const contract = new Contract(fromChain.value.contract, OFT_ABI, provider)

    let bal
    if (fromChain.value.id === 25) {
      const token = new Contract(fromChain.value.tokenContract, ERC20_ABI, provider)
      bal = await token.balanceOf(eip155Account.value.address)
    }
    else {
      bal = await contract.balanceOf(eip155Account.value.address)
    }

    balance.value = formatEther(bal)
  }
  catch (err) {
    console.error(err)
  }
}

const estimateFee = async () => {
  try {
    const { walletProvider } = useAppKitProvider('eip155')
    const provider = new BrowserProvider(walletProvider)
    const contract = new Contract(fromChain.value.contract, OFT_ABI, provider)

    const amountLD = parseEther(amount.value)

    const sendParam = {
      dstEid: toChain.value.eid,
      to: zeroPadValue(eip155Account.value.address, 32),
      amountLD,
      minAmountLD: amountLD,
      extraOptions: '0x',
      composeMsg: '0x',
      oftCmd: '0x',
    }

    const [nativeFee] = await contract.quoteSend(sendParam, false)
    estimatedFee.value = formatEther(nativeFee)
  }
  catch (err) {
    console.error(err)
  }
}

const setMaxAmount = () => {
  amount.value = balance.value
}

const formatAddress = (addr) => {
  if (!addr) return ''
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`
}

const bridge = async () => {
  try {
    processing.value = true
    const { walletProvider } = useAppKitProvider('eip155')
    const provider = new BrowserProvider(walletProvider)
    const signer = await provider.getSigner()
    const contract = new Contract(fromChain.value.contract, OFT_ABI, signer)

    const amountLD = parseEther(amount.value)

    if (fromChain.value.id === 25) {
      const token = new Contract(fromChain.value.tokenContract, ERC20_ABI, signer)
      const currentAllowance = await token.allowance(eip155Account.value.address, fromChain.value.contract)

      if (currentAllowance < amountLD) {
        const approveTx = await token.approve(fromChain.value.contract, amountLD)
        await approveTx.wait()
      }
    }

    const sendParam = {
      dstEid: toChain.value.eid,
      to: zeroPadValue(eip155Account.value.address, 32),
      amountLD,
      minAmountLD: amountLD,
      extraOptions: '0x',
      composeMsg: '0x',
      oftCmd: '0x',
    }

    const [nativeFee] = await contract.quoteSend(sendParam, false)
    const fee = { nativeFee, lzTokenFee: 0n }

    const tx = await contract.send(sendParam, fee, eip155Account.value.address, { value: nativeFee })
    const receipt = await tx.wait()

    txHash.value = receipt.hash
    await loadStats()
    amount.value = ''

    processing.value = false
    notifySuccess('Bridge transaction submitted!')
  }
  catch (err) {
    console.error(err)
    processing.value = false
    notifyError('Bridge failed. Please try again.')
  }
}
</script>

<style scoped>
.custom-button {
  background-color: rgb(var(--v-theme-primary));
  color: white;
}

.bridge-card {
  border-radius: 16px;
}

.chain-box {
  border: 1px solid rgba(var(--v-theme-on-surface), 0.12);
  border-radius: 12px;
  background: rgba(var(--v-theme-surface), 0.5);
  transition: all 0.2s;
}

.chain-box:hover {
  border-color: rgb(var(--v-theme-primary));
  background: rgba(var(--v-theme-primary), 0.05);
}

.success-card {
  border-radius: 16px;
  border: 2px solid rgb(var(--v-theme-success));
  background: rgba(var(--v-theme-success), 0.05);
}

.success-icon-wrapper {
  display: inline-flex;
  padding: 16px;
  border-radius: 50%;
  background: rgba(var(--v-theme-success), 0.1);
}
</style>
