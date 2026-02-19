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
      <!-- Contract Addresses -->
      <v-card
        class="mt-4"
        elevation="2"
      >
        <v-card-text class="pa-4">
          <div class="text-caption text-grey mb-3">
            TURTLE Contract Addresses
          </div>
          <div class="d-flex flex-column ga-2">
            <div
              v-for="chain in [CHAINS.cronos, CHAINS.ethereum]"
              :key="chain.id"
              class="d-flex align-center justify-space-between pa-2"
            >
              <div class="d-flex align-center">
                <v-icon
                  size="20"
                  class="mr-2"
                >
                  {{ chain.icon }}
                </v-icon>
                <span class="text-caption">{{ chain.name }}</span>
              </div>
              <div class="d-flex align-center">
                <span class="text-caption font-mono mr-2">{{ (chain.tokenContract || chain.contract)
                }}</span>
                <v-btn
                  icon="mdi-content-copy"
                  size="x-small"
                  variant="text"
                  @click="copyAddress(chain.tokenContract || chain.contract)"
                />
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>
      <v-alert
        type="warning"
        prominent
      >
        Bridge TURTLE tokens only. Native tokens (CRO/ETH) cannot be bridged.
      </v-alert>

      <v-card
        class="mt-2 bridge-card"
        elevation="2"
      >
        <v-card-text class="pa-6">
          <!-- Wrong Network Alert -->
          <v-alert
            v-if="eip155Account.isConnected && wrongNetwork"
            variant="tonal"
            color="info"
            density="compact"
            class="mb-4"
          >
            <div class="d-flex align-center justify-space-between">
              <div class="d-flex align-center">
                <v-icon
                  size="16"
                  class="mr-2"
                >
                  mdi-alert
                </v-icon>
                <span class="text-caption">Switch to {{ fromChain.name }} network to bridge</span>
              </div>
              <v-btn
                size="small"
                variant="outlined"
                @click="switchNetwork"
              >
                Switch Network
              </v-btn>
            </div>
          </v-alert>

          <!-- Process Info -->
          <v-alert
            v-else-if="eip155Account.isConnected"
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

          <!-- Direction Arrow with Swap -->
          <div class="text-center my-2">
            <v-btn
              icon
              variant="outlined"
              @click="swapChains"
            >
              <v-icon>mdi-swap-vertical</v-icon>
            </v-btn>
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
                <span class="text-caption font-weight-bold">{{ eip155Account.address }}</span>
              </div>
            </v-card-text>
          </v-card>

          <v-btn
            v-if="!eip155Account.isConnected"
            flat
            class="custom-button"
            block
            size="large"
            @click="open"
          >
            Connect Wallet
          </v-btn>
          <v-btn
            v-else-if="wrongNetwork"
            flat
            class="custom-button"
            block
            size="large"
            disabled
          >
            Wrong Network
          </v-btn>
          <v-btn
            v-else
            flat
            class="custom-button"
            block
            size="large"
            :disabled="!amount || parseFloat(amount) <= 0"
            @click="bridge"
          >
            Bridge to {{ toChain.name }}
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

      <!-- wTURTLE Information -->
      <v-card
        class="mt-6"
        elevation="2"
      >
        <v-card-text class="pa-6">
          <div class="text-h5 font-weight-bold mb-4">
            $wTURTLE on Ethereum – Official Bridged Integration with CamelsNFT
          </div>

          <p class="mb-3">
            <strong>$wTURTLE</strong> (Ethereum contract: <code class="text-primary">0x911eb8e70D2bFf89c16Df04aF557c4De546838dF</code>) is the <strong>official bridged equivalent</strong> of $TURTLE from Cronos (contract: <code class="text-primary">0x8c9e2bef2962ce302ef578113eebec62920b7e57</code>).
          </p>

          <p class="mb-4">
            The full supply was donated by the Turtle on Cronos community, CamelsNFT, and users. It is now live on Ethereum to power real, permanent utility inside the <strong>CamelsNFT</strong> ecosystem (OG Camels + 3D Camels, 16,000 total supply).
          </p>

          <div class="text-h6 font-weight-bold mb-3">
            Core Utility – Two Immutable Contracts
          </div>
          <p class="text-caption text-grey mb-3">
            (Live on Cronos via our project websites for months, now expanding to Ethereum + full OG + 3D Camels support)
          </p>

          <div class="mb-4">
            <div class="text-subtitle-1 font-weight-bold mb-2">
              🐢 Camels Liquidity Vault (CLC)
            </div>
            <ul class="text-body-2">
              <li>Swap <strong>any Camel or 3D Camel</strong> in the vault 1:1 for a small $wTURTLE fee (100% of fees go back into the pool).</li>
              <li>Deposit/forfeit any Camel or 3D Camel → redeem your share of the $wTURTLE pool.</li>
              <li>Buy any Camel or 3D Camel from the vault with $ETH (price always starts at 0.03 ETH and stays <strong>20% above</strong> the highest floor of both collections — up-only forever).</li>
              <li><strong>Initially, all $ETH purchase proceeds are burned directly into $wTURTLE liquidity</strong> on Uniswap V2.</li>
              <li>0.01 ETH from every 3D Camel mint also goes toward building &amp; burning more $wTURTLE liquidity.</li>
              <li><strong>$wTURTLE is permanently locked to NFTs forever</strong> — nobody (including the team) can withdraw any NFTs or $wTURTLE.</li>
              <li>Fed forever by enforced 7.5% royalties (3.75% to the pool) + mint funds.</li>
              <li>Only editable functions: withdraw $ETH, adjust purchase price, or swap fee.</li>
              <li>Fully immutable and on-chain for life.</li>
            </ul>
          </div>

          <div class="mb-4">
            <div class="text-subtitle-1 font-weight-bold mb-2">
              🐢 Camels Earning Contract
            </div>
            <ul class="text-body-2">
              <li>Soft-stake any Camel or 3D Camel + hard-stake $wTURTLE → earn $wTURTLE rewards daily.</li>
              <li>Immutable: $wTURTLE cannot be withdrawn except through staked NFTs.</li>
              <li>Proven on Cronos for months — now live on Ethereum with full OG + 3D Camel support.</li>
            </ul>
          </div>

          <div class="mb-4">
            <div class="text-h6 font-weight-bold mb-2">
              Liquidity &amp; Growth
            </div>
            <ul class="text-body-2">
              <li>First batch of $ETH liquidity already added and burned by CamelsNFT (≈24.3% of the Uniswap V2 pool is permanently burned).</li>
              <li>More $ETH will be burned into the pool with every new mint, Liquidity Vault purchase, and contract payment.</li>
              <li>Live pair: <a href="https://dexscreener.com/ethereum/0x95bd1b5518e739bbc1b84e532e734b09e177ebcd" target="_blank" class="text-primary">https://dexscreener.com/ethereum/0x95bd1b5518e739bbc1b84e532e734b09e177ebcd</a></li>
            </ul>
          </div>

          <div class="mb-4">
            <div class="text-h6 font-weight-bold mb-2">
              Why the Bridge Exists
            </div>
            <p class="text-body-2">
              We bridged $TURTLE to Ethereum under the $wTURTLE ticker to give the original Cronos memecoin <strong>real, lasting utility</strong> while making it easier for the wider Ethereum community to support a Cronos Layer-1 project.
            </p>
            <p class="text-body-2">
              Everything is built <strong>non-profit, organically, and immutable</strong> — slow and steady, turtle style 🐢🐫
            </p>
          </div>

          <v-divider class="my-4" />

          <div class="text-body-2 mb-3">
            <strong>Official $wTURTLE CA on ETH:</strong><br>
            <code class="text-primary">0x911eb8e70D2bFf89c16Df04aF557c4De546838dF</code>
          </div>

          <p class="text-body-2 mb-3">
            Use the bridge on this page to move $TURTLE from Cronos → $wTURTLE on Ethereum. (Bridges also live at turtleoncro.com/bridge and camelsnft.io/bridge)
          </p>

          <div class="text-body-2">
            <strong>Follow the journey:</strong><br>
            @Cryptodaave • @TurtleonCro • @CamelsNFT<br>
            <a href="https://camelsnft.io/" target="_blank" class="text-primary">https://camelsnft.io/</a><br>
            <a href="https://turtleoncro.com/" target="_blank" class="text-primary">https://turtleoncro.com/</a>
          </div>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script setup>
import { useAppKitAccount, useAppKitProvider, useAppKitNetwork } from '@reown/appkit/vue'
import { cronos, mainnet } from '@reown/appkit/networks'
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
  'function balanceOf(address) view returns (uint256)',
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
    contract: '0xd5Fc2B122B9c085cd196d94Bf83F64972371B8Aa', //  oft adapter
    explorer: 'https://explorer.cronos.org/',
    explorerName: 'Cronos Explorer',
  },
  ethereum: {
    id: 1,
    name: 'Ethereum',
    icon: 'mdi-ethereum',
    nativeToken: 'ETH',
    eid: 30101,
    contract: '0x911eb8e70D2bFf89c16Df04aF557c4De546838dF', // oft
    explorer: 'https://etherscan.io',
    explorerName: 'Etherscan',
  },
}

const { notifySuccess, notifyError } = useSnackbar()
const { open } = useContract()
const eip155Account = useAppKitAccount({ namespace: 'eip155' })
const networkData = useAppKitNetwork()

const fromChain = ref(CHAINS.cronos)
const toChain = ref(CHAINS.ethereum)
const amount = ref('')
const processing = ref(false)
const txHash = ref('')
const balance = ref('')
const estimatedFee = ref('')
const wrongNetwork = ref(false)

watch(() => eip155Account.value.isConnected, async (connected) => {
  if (connected) {
    detectAndSetNetwork()
    await loadStats()
  }
})
watch(() => networkData.value.chainId, async (newChainId, oldChainId) => {
  if (eip155Account.value.isConnected && newChainId !== oldChainId) {
    detectAndSetNetwork()
    await loadStats()
  }
})
watch(amount, () => {
  if (amount.value && parseFloat(amount.value) > 0) {
    estimateFee()
  }
  else {
    estimatedFee.value = ''
  }
})

const detectAndSetNetwork = () => {
  const chainId = networkData.value.chainId
  if (chainId === CHAINS.cronos.id) {
    fromChain.value = CHAINS.cronos
    toChain.value = CHAINS.ethereum
    wrongNetwork.value = false
  }
  else if (chainId === CHAINS.ethereum.id) {
    fromChain.value = CHAINS.ethereum
    toChain.value = CHAINS.cronos
    wrongNetwork.value = false
  }
  else {
    wrongNetwork.value = true
  }
}

const swapChains = async () => {
  const temp = fromChain.value
  fromChain.value = toChain.value
  toChain.value = temp
  amount.value = ''
  estimatedFee.value = ''

  if (eip155Account.value.chainId !== fromChain.value.id) {
    wrongNetwork.value = true
  }
  else {
    wrongNetwork.value = false
  }
}

const switchNetwork = async () => {
  const networkData = useAppKitNetwork()
  networkData.value.switchNetwork(networkData.value.chainId === CHAINS.cronos.id ? mainnet : cronos)
}

const loadStats = async () => {
  if (wrongNetwork.value) {
    balance.value = ''
    estimatedFee.value = ''
    return
  }
  try {
    const { walletProvider } = useAppKitProvider('eip155')
    const provider = new BrowserProvider(walletProvider)

    let bal
    if (fromChain.value.id === CHAINS.cronos.id) {
      const token = new Contract(fromChain.value.tokenContract, ERC20_ABI, provider)
      bal = await token.balanceOf(eip155Account.value.address)
    }
    else {
      const contract = new Contract(fromChain.value.contract, OFT_ABI, provider)
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

const copyAddress = async (addr) => {
  try {
    await navigator.clipboard.writeText(addr)
    notifySuccess('Address copied to clipboard')
  }
  catch (err) {
    notifyError('Failed to copy address')
  }
}

const bridge = async () => {
  if (wrongNetwork.value) {
    notifyError('Please connect to Cronos or Ethereum network')
    return
  }

  const bridgeAmount = parseFloat(amount.value)
  const userBalance = parseFloat(balance.value)

  if (bridgeAmount <= 0) {
    notifyError('Amount must be greater than 0')
    return
  }

  if (bridgeAmount > userBalance) {
    notifyError('Insufficient balance')
    return
  }

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
    const errorMsg = err.reason || err.message || 'Bridge failed. Please try again.'
    notifyError(errorMsg)
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
