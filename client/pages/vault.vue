<template>
  <v-container class="content-container">
    <v-row>
      <v-col cols="12">
        <div
          class="markdown-content mb-6"
          v-html="renderedMarkdown"
        />

        <!-- Live Dashboard -->
        <v-card
          v-if="eip155Account.isConnected"
          variant="outlined"
          class="mb-6"
        >
          <v-card-title class="text-h4">
            Live Dashboard - Real-time stats
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
                  color="primary"
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
              • Vault Contract ({{ contractAddress }}) verified on Cronos Explorer •
            </p>
          </v-card-text>
        </v-card>

        <!-- Wallet Connection -->
        <v-card
          v-if="!eip155Account.isConnected"
          class="mb-6 text-center"
        >
          <v-card-text>
            <p class="text-h6 mb-4">
              Connect your wallet to interact with the vault
            </p>
            <p class="mb-4">
              Please use the wallet connection button in the header
            </p>
          </v-card-text>
        </v-card>

        <!-- Vault Interface -->
        <div v-if="eip155Account.isConnected">
          <!-- Wallet Asset Delay Warning -->
          <v-alert
            type="warning"
            class="mb-4"
            prominent
          >
            <v-alert-title>Wallet Asset Delay Notice</v-alert-title>
            Wallet assets may have a 4 hour delay, vault assets are real-time. If you minted or purchased Turtles NFTs in the last 4 hours it may not show up in wallet here. Check marketplaces or explorer.
          </v-alert>

          <!-- Your NFTs -->
          <v-card class="mb-6">
            <v-card-title>Your NFTs ({{ userNFTs.length }})</v-card-title>
            <v-card-text>
              <div
                v-if="userNFTs.length > 0"
                class="nft-grid"
              >
                <v-card
                  v-for="tokenId in userNFTs"
                  :key="tokenId"
                  :class="{ selected: selectedNFTs.includes(tokenId) }"
                  class="nft-card"
                  @click="toggleNFTSelection(tokenId)"
                >
                  <v-img
                    :src="`https://nft.turtleoncro.com/${parseInt(tokenId) + 1}.png`"
                    height="150"
                    cover
                  />
                  <v-card-text class="text-center">
                    <div>NFT #{{ tokenId }}</div>
                    <div
                      v-if="selectedNFTs.includes(tokenId)"
                      class="selected-indicator"
                    >
                      ✓ Selected
                    </div>
                  </v-card-text>
                </v-card>
              </div>
              <p v-else>
                No NFTs found in your wallet
              </p>
              <p
                v-if="lastSynced"
                class="text-center text-caption"
              >
                Last synced: {{ lastSynced.toLocaleTimeString() }}
              </p>
            </v-card-text>
          </v-card>

          <!-- Deposit Section -->
          <v-card class="mb-6">
            <v-card-title>Deposit NFTs</v-card-title>
            <v-card-text>
              <v-alert
                type="warning"
                class="mb-4"
              >
                ⚠️ WARNING: You will permanently lose ownership of selected NFTs. You will receive {{ vaultInfo?.perNFT ? parseFloat(vaultInfo.perNFT).toFixed(2) : '0' }} TURTLE tokens per NFT.
              </v-alert>
              <div class="mb-4">
                <v-btn
                  variant="outlined"
                  class="mr-2"
                  @click="selectBatch(userNFTs, selectedNFTs, 0, 10)"
                >
                  Select First 10
                </v-btn>
                <v-btn
                  variant="outlined"
                  @click="clearSelection()"
                >
                  Clear All
                </v-btn>
              </div>
              <v-btn
                v-if="selectedNFTs.length > 0"
                color="primary"
                :loading="processing"
                @click="depositByTokenIds"
              >
                Deposit Selected ({{ selectedNFTs.length }})
              </v-btn>
              <p v-else>
                Select NFTs from your collection above to deposit
              </p>
            </v-card-text>
          </v-card>

          <!-- Vault NFTs -->
          <v-card class="mb-6">
            <v-card-title>
              Vault NFTs ({{ vaultNFTs.length }})
              <v-btn
                size="small"
                class="ml-2"
                variant="outlined"
                @click="loadVaultNFTs"
              >
                Refresh
              </v-btn>
            </v-card-title>
            <v-card-text>
              <div
                v-if="vaultNFTs.length > 0"
                class="nft-grid"
              >
                <v-card
                  v-for="tokenId in vaultNFTs"
                  :key="tokenId"
                  variant="text"
                  :class="{ selected: selectedVaultNFTs.includes(tokenId) }"
                  class="nft-card"
                  @click="toggleVaultNFTSelection(tokenId)"
                >
                  <v-img
                    :src="`https://nft.turtleoncro.com/${parseInt(tokenId) + 1}.png`"
                    height="150"
                    cover
                  />
                  <v-card-text class="text-center">
                    <div>NFT #{{ tokenId }}</div>
                    <div
                      v-if="selectedVaultNFTs.includes(tokenId)"
                      class="selected-indicator"
                    >
                      ✓ Selected
                    </div>
                  </v-card-text>
                </v-card>
              </div>
              <p v-else>
                No NFTs in vault
              </p>
            </v-card-text>
          </v-card>

          <!-- Swap NFTs (1:1 Exchange) -->
          <v-card class="mb-6">
            <v-card-title>Swap NFTs (1:1 Exchange)</v-card-title>
            <v-card-text>
              <v-alert
                type="info"
                class="mb-4"
              >
                ℹ️ Select equal number of NFTs from both your collection and vault to perform a 1:1 swap. You pay {{ vaultInfo?.swapFee ? parseFloat(vaultInfo.swapFee).toFixed(2) : '0' }} TURTLE per NFT as swap fee.
              </v-alert>
              <v-row class="mb-4">
                <v-col cols="6">
                  <h4>Your NFTs Selected: {{ selectedNFTs.length }}</h4>
                </v-col>
                <v-col cols="6">
                  <h4>Vault NFTs Selected: {{ selectedVaultNFTs.length }}</h4>
                </v-col>
              </v-row>
              <div v-if="selectedNFTs.length > 0 && selectedVaultNFTs.length > 0">
                <v-card
                  class="mb-4"
                  color="grey-lighten-4"
                >
                  <v-card-text>
                    <p><strong>Swap Summary:</strong></p>
                    <p>Giving: {{ selectedNFTs.length }} NFT(s) from your wallet</p>
                    <p>Receiving: {{ selectedVaultNFTs.length }} NFT(s) from vault</p>
                    <p>Fee: {{ getSwapCost() }} TURTLE ({{ parseFloat(vaultInfo.swapFee).toFixed(2) }} per NFT)</p>
                    <p
                      v-if="selectedNFTs.length !== selectedVaultNFTs.length"
                      class="text-error"
                    >
                      ⚠️ Must select equal numbers!
                    </p>
                  </v-card-text>
                </v-card>
                <v-btn
                  color="secondary"
                  class="mb-2"
                  block
                  :disabled="selectedNFTs.length !== selectedVaultNFTs.length"
                  :loading="processingSwap"
                  @click="swapForNFTs"
                >
                  Swap NFTs ({{ selectedNFTs.length }} ↔ {{ selectedVaultNFTs.length }})
                </v-btn>
              </div>
              <p v-else>
                Select NFTs from both your collection and vault above to swap
              </p>
            </v-card-text>
          </v-card>

          <!-- Purchase NFTs with CRO -->
          <v-card class="mb-6">
            <v-card-title>Purchase NFTs with CRO</v-card-title>
            <v-card-text>
              <div class="mb-4">
                <v-btn
                  class="mr-2"
                  variant="outlined"
                  @click="selectBatch(vaultNFTs, selectedVaultNFTs, 0, 10)"
                >
                  Select First 10
                </v-btn>
                <v-btn
                  variant="outlined"
                  @click="clearVaultSelection()"
                >
                  Clear Vault Selection
                </v-btn>
              </div>
              <div v-if="selectedVaultNFTs.length > 0">
                <v-card
                  class="mb-4"
                  color="grey-lighten-4"
                >
                  <v-card-text>
                    <p><strong>Purchase Cost:</strong> {{ getPurchaseCost() }} CRO ({{ parseFloat(vaultInfo.purchaseFee).toFixed(2) }} per NFT)</p>
                  </v-card-text>
                </v-card>
                <v-btn
                  color="success"
                  class="mb-2"
                  block
                  :loading="processingPurchase"
                  @click="purchaseWithCRO"
                >
                  Purchase with CRO ({{ selectedVaultNFTs.length }})
                </v-btn>
              </div>
              <p v-else>
                Select NFTs from vault above to purchase
              </p>
            </v-card-text>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/vue'
import { ethers, BrowserProvider } from 'ethers'
import { marked } from 'marked'
import { useSnackbarStore } from '~/store/snackbar'

useHead({
  title: 'Turtle Redemption Vault',
  meta: [
    { name: 'description', content: 'Unlock $TURTLE Rewards & Stabilize Turtle NFTs with TurtleRedemptionVault' },
    {
      hid: 'og:title',
      property: 'og:title',
      content: 'Turtle Redemption Vault - Turtle On Cronos',
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content: 'Your live, on-chain liquidity engine for Turtle NFTs on Cronos',
    },
  ],
})

const config = useRuntimeConfig()
const snackbar = useSnackbarStore()
const eip155Account = useAppKitAccount({ namespace: 'eip155' })
const totalTurtle = ref(0)
const nftsInVault = ref(0)
const turtlePerNft = ref(0)
const lastSynced = ref(null)
const vaultInfo = ref(null)
const userNFTs = ref([])
const vaultNFTs = ref([])
const selectedNFTs = ref([])
const selectedVaultNFTs = ref([])
const processing = ref(false)
const processingSwap = ref(false)
const processingPurchase = ref(false)
const renderedMarkdown = ref('')

const contractAddress = config.public.vaultAddress || '0x03D90756cf107898bB86049aCd426a6E980b79B7'
const nftContractAddress = config.public.nftAddress || '0x5848335bbd8e10725f5a35d97a8e252efda9be1a'
const tokenContractAddress = config.public.tokenAddress || '0x2baa455e573df4019b11859231dd9e425d885293'
const chainId = config.public.chainId || 338

function getVaultContract(signer) {
  const abi = [
    'function turtlePerNFT() external view returns (uint256)',
    'function getVaultNFTs() external view returns (uint256[])',
    'function swapFeeTurtle() external view returns (uint256)',
    'function purchaseFeeCRO() external view returns (uint256)',
    'function depositByIds(uint256[] calldata tokenIds) external',
    'function swapForNFTs(uint256[] calldata userTokenIds, uint256[] calldata vaultTokenIds) external',
    'function purchaseNFTsWithCRO(uint256[] calldata tokenIds) external payable',
  ]
  return new ethers.Contract(contractAddress, abi, signer)
}

function getNFTContract(signer) {
  const abi = [
    'function setApprovalForAll(address operator, bool approved) external',
    'function isApprovedForAll(address owner, address operator) external view returns (bool)',
    'function balanceOf(address owner) external view returns (uint256)',
  ]
  return new ethers.Contract(nftContractAddress, abi, signer)
}

function getTurtleContract(signer) {
  const abi = [
    'function balanceOf(address account) external view returns (uint256)',
    'function approve(address spender, uint256 amount) external returns (bool)',
    'function allowance(address owner, address spender) external view returns (uint256)',
  ]
  return new ethers.Contract(tokenContractAddress, abi, signer)
}

async function loadVaultData() {
  try {
    const config = useRuntimeConfig()
    const apiUrl = config.public.nftApiUrl || 'http://localhost:8080'

    // Get last fetch time from API
    const contractResponse = await fetch(`${apiUrl}/api/contracts/${nftContractAddress}/${chainId}`)
    const contractData = await contractResponse.json()
    if (contractData.last_fetch) {
      lastSynced.value = new Date(contractData.last_fetch)
    }

    const { walletProvider } = useAppKitProvider('eip155')
    const provider = new BrowserProvider(walletProvider)

    const vaultContract = getVaultContract(provider)
    const turtleContract = getTurtleContract(provider)

    const poolBalance = await turtleContract.balanceOf(contractAddress)
    const perNFT = await vaultContract.turtlePerNFT()
    const swapFee = await vaultContract.swapFeeTurtle()
    const purchaseFee = await vaultContract.purchaseFeeCRO()
    const tokens = await vaultContract.getVaultNFTs()

    totalTurtle.value = parseInt(ethers.formatEther(poolBalance))
    nftsInVault.value = parseInt(tokens.length || 0)
    turtlePerNft.value = parseInt(ethers.formatEther(perNFT))
    vaultNFTs.value = tokens.map(t => t.toString())

    vaultInfo.value = {
      poolBalance: ethers.formatEther(poolBalance),
      perNFT: ethers.formatEther(perNFT),
      swapFee: ethers.formatEther(swapFee),
      purchaseFee: ethers.formatEther(purchaseFee),
    }

    if (eip155Account.value.isConnected) {
      await loadUserNFTs()
    }
  }
  catch (error) {
    console.error('Error loading vault data:', error)
  }
}

async function loadUserNFTs() {
  if (!eip155Account.value.address) return
  try {
    const config = useRuntimeConfig()
    const apiUrl = config.public.nftApiUrl || 'http://localhost:8080'
    const response = await fetch(`${apiUrl}/api/${nftContractAddress}/${chainId}/tokens?owner=${eip155Account.value.address}`)
    const data = await response.json()
    const tokens = data.tokens ? data.tokens.map(t => t.toString()) : []
    // Filter out NFTs that are in vault to handle API delay
    userNFTs.value = tokens.filter(tokenId => !vaultNFTs.value.includes(tokenId))
  }
  catch (error) {
    console.error('Error loading user NFTs:', error)
    userNFTs.value = []
  }
}

async function loadVaultNFTs() {
  try {
    const { walletProvider } = useAppKitProvider('eip155')
    const provider = new BrowserProvider(walletProvider)
    const signer = await provider.getSigner()
    const contract = getVaultContract(signer)
    const tokens = await contract.getVaultNFTs()
    vaultNFTs.value = tokens.map(t => t.toString())
  }
  catch (error) {
    console.error('Error loading vault NFTs:', error)
  }
}

function toggleNFTSelection(tokenId) {
  const index = selectedNFTs.value.indexOf(tokenId)
  if (index > -1) {
    selectedNFTs.value.splice(index, 1)
  }
  else if (selectedNFTs.value.length < 20) {
    selectedNFTs.value.push(tokenId)
  }
}

function toggleVaultNFTSelection(tokenId) {
  const index = selectedVaultNFTs.value.indexOf(tokenId)
  if (index > -1) {
    selectedVaultNFTs.value.splice(index, 1)
  }
  else if (selectedVaultNFTs.value.length < 20) {
    selectedVaultNFTs.value.push(tokenId)
  }
}

function clearSelection() {
  selectedNFTs.value = []
}

function clearVaultSelection() {
  selectedVaultNFTs.value = []
}

function selectBatch(nftList, selectedList, start, end) {
  const batch = nftList.slice(start, end)
  batch.forEach((tokenId) => {
    if (!selectedList.includes(tokenId) && selectedList.length < 20) {
      selectedList.push(tokenId)
    }
  })
}

function getSwapCost() {
  if (!vaultInfo.value || selectedVaultNFTs.value.length === 0) return '0'
  const swapFee = parseFloat(vaultInfo.value.swapFee)
  return (swapFee * selectedVaultNFTs.value.length).toFixed(4)
}

function getPurchaseCost() {
  if (!vaultInfo.value || selectedVaultNFTs.value.length === 0) return '0'
  const purchaseFee = parseFloat(vaultInfo.value.purchaseFee)
  return (purchaseFee * selectedVaultNFTs.value.length).toFixed(4)
}

async function depositByTokenIds() {
  if (selectedNFTs.value.length === 0) return
  try {
    processing.value = true
    const { walletProvider } = useAppKitProvider('eip155')
    const provider = new BrowserProvider(walletProvider)
    const signer = await provider.getSigner()

    const contract = getVaultContract(signer)
    const nftContract = getNFTContract(signer)

    const isApproved = await nftContract.isApprovedForAll(eip155Account.value.address, contractAddress)
    if (!isApproved) {
      const approveTx = await nftContract.setApprovalForAll(contractAddress, true)
      await approveTx.wait()
    }

    const tx = await contract.depositByIds(selectedNFTs.value)
    await tx.wait()

    selectedNFTs.value = []
    await loadVaultData()
    snackbar.showSnackbar({ content: `Successfully deposited ${selectedNFTs.value.length} NFT(s)!`, color: 'success' })
    processing.value = false
  }
  catch (error) {
    console.error('Deposit failed:', error)
    snackbar.showSnackbar({ content: `Deposit failed: ${error.message}`, color: 'error' })
    processing.value = false
  }
}

async function swapForNFTs() {
  if (selectedNFTs.value.length === 0 || selectedVaultNFTs.value.length === 0) {
    snackbar.showSnackbar({ content: 'Select NFTs from both your wallet and vault', color: 'warning' })
    return
  }
  if (selectedNFTs.value.length !== selectedVaultNFTs.value.length) {
    snackbar.showSnackbar({ content: 'Must select equal number of NFTs from both sides', color: 'warning' })
    return
  }
  try {
    processingSwap.value = true
    const { walletProvider } = useAppKitProvider('eip155')
    const provider = new BrowserProvider(walletProvider)
    const signer = await provider.getSigner()

    const contract = getVaultContract(signer)
    const nftContract = getNFTContract(signer)
    const turtleContract = getTurtleContract(signer)

    // Approve NFTs
    const isApproved = await nftContract.isApprovedForAll(eip155Account.value.address, contractAddress)
    if (!isApproved) {
      const approveTx = await nftContract.setApprovalForAll(contractAddress, true)
      await approveTx.wait()
    }

    // Approve TURTLE for fee
    const swapFee = await contract.swapFeeTurtle()
    const totalCost = swapFee * BigInt(selectedNFTs.value.length)

    const allowance = await turtleContract.allowance(eip155Account.value.address, contractAddress)
    if (allowance < totalCost) {
      const approveTx = await turtleContract.approve(contractAddress, totalCost)
      await approveTx.wait()
    }

    const count = selectedNFTs.value.length
    const tx = await contract.swapForNFTs(selectedNFTs.value, selectedVaultNFTs.value)
    await tx.wait()

    selectedNFTs.value = []
    selectedVaultNFTs.value = []
    await loadVaultData()
    snackbar.showSnackbar({ content: `Successfully swapped ${count} NFT(s)!`, color: 'success' })
    processingSwap.value = false
  }
  catch (error) {
    console.error('Swap failed:', error)
    snackbar.showSnackbar({ content: `Swap failed: ${error.message}`, color: 'error' })
    processingSwap.value = false
  }
}

async function purchaseWithCRO() {
  if (selectedVaultNFTs.value.length === 0) return
  try {
    processingPurchase.value = true
    const { walletProvider } = useAppKitProvider('eip155')
    const provider = new BrowserProvider(walletProvider)
    const signer = await provider.getSigner()

    const contract = getVaultContract(signer)
    const purchaseFee = await contract.purchaseFeeCRO()
    const totalCost = purchaseFee * BigInt(selectedVaultNFTs.value.length)

    const count = selectedVaultNFTs.value.length
    const tx = await contract.purchaseNFTsWithCRO(selectedVaultNFTs.value, { value: totalCost })
    await tx.wait()

    selectedVaultNFTs.value = []
    await loadVaultData()
    snackbar.showSnackbar({ content: `Successfully purchased ${count} NFT(s) with CRO!`, color: 'success' })
    processingPurchase.value = false
  }
  catch (error) {
    console.error('Purchase failed:', error)
    snackbar.showSnackbar({ content: `Purchase failed: ${error.message}`, color: 'error' })
    processingPurchase.value = false
  }
}

watch(eip155Account.value, async (account) => {
  if (account.isConnected) {
    await loadVaultData()
  }
})

onMounted(async () => {
  renderedMarkdown.value = marked(await $fetch('/content/vault.md'))
  await loadVaultData()
})
</script>

<style>
.nft-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px;
  margin: 16px 0;
}

.nft-card {
  cursor: pointer;
  transition: all 0.2s;
  border: 2px solid transparent;
}

.nft-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.nft-card.selected {
  border-color: #4CAF50;
  background-color: rgba(76, 175, 80, 0.1);
}

.selected-indicator {
  color: #4CAF50;
  font-weight: bold;
  margin-top: 4px;
}
</style>
