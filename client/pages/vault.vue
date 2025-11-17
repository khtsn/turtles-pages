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
                ⚠️ WARNING: You will permanently lose ownership of selected NFTs. You will receive {{ vaultInfo?.perNFT || '0' }} TURTLE tokens per NFT.
              </v-alert>
              <div class="mb-4">
                <v-btn
                  class="mr-2"
                  @click="selectBatch(userNFTs, selectedNFTs, 0, 10)"
                >
                  Select First 10
                </v-btn>
                <v-btn @click="clearSelection()">
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
                  :class="{ selected: selectedVaultNFTs.includes(tokenId) }"
                  class="nft-card"
                  @click="toggleVaultNFTSelection(tokenId)"
                >
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

          <!-- Get NFTs from Vault -->
          <v-card class="mb-6">
            <v-card-title>Get NFTs from Vault</v-card-title>
            <v-card-text>
              <div class="mb-4">
                <v-btn
                  class="mr-2"
                  @click="selectBatch(vaultNFTs, selectedVaultNFTs, 0, 10)"
                >
                  Select First 10
                </v-btn>
                <v-btn @click="clearVaultSelection()">
                  Clear All
                </v-btn>
              </div>
              <div v-if="selectedVaultNFTs.length > 0">
                <v-card
                  class="mb-4"
                  color="grey-lighten-4"
                >
                  <v-card-text>
                    <p><strong>Cost Estimation:</strong></p>
                    <p>Swap Cost: {{ getSwapCost() }} TURTLE</p>
                    <p>Purchase Cost: {{ getPurchaseCost() }} CRO</p>
                  </v-card-text>
                </v-card>
                <v-btn
                  color="secondary"
                  class="mr-2"
                  :loading="processing"
                  @click="swapForNFTs"
                >
                  Swap TURTLE ({{ selectedVaultNFTs.length }})
                </v-btn>
                <v-btn
                  color="success"
                  :loading="processing"
                  @click="purchaseWithCRO"
                >
                  Purchase with CRO ({{ selectedVaultNFTs.length }})
                </v-btn>
              </div>
              <p v-else>
                Select NFTs from vault above to swap/purchase
              </p>
            </v-card-text>
          </v-card>
        </div>

        <!-- Contract Info -->
        <v-card class="text-center">
          <v-card-text>
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
import { ref, onMounted } from 'vue'
import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/vue'
import { ethers, BrowserProvider } from 'ethers'

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

const eip155Account = useAppKitAccount({ namespace: 'eip155' })
const totalTurtle = ref(2354000)
const nftsInVault = ref(1250)
const turtlePerNft = ref(2354)
const vaultInfo = ref(null)
const userNFTs = ref([])
const vaultNFTs = ref([])
const selectedNFTs = ref([])
const selectedVaultNFTs = ref([])
const processing = ref(false)

const contractAddress = process.env.VITE_VAULT_ADDRESS || '0x...'
const nftContractAddress = process.env.VITE_NFT_ADDRESS || '0x...'
const tokenContractAddress = process.env.VITE_TOKEN_ADDRESS || '0x...'
const chainId = process.env.VITE_CHAIN_ID || 25

function getVaultContract(signer) {
  const abi = [
    'function turtlePerNFT() external view returns (uint256)',
    'function getVaultNFTs() external view returns (uint256[])',
    'function swapFeeTurtle() external view returns (uint256)',
    'function purchaseFeeCRO() external view returns (uint256)',
    'function depositByIds(uint256[] calldata tokenIds) external',
    'function swapForNFTs(uint256[] calldata tokenIds) external',
    'function purchaseNFTsWithCRO(uint256[] calldata tokenIds) external payable',
  ]
  return new ethers.Contract(contractAddress, abi, signer)
}

function getNFTContract(signer) {
  const abi = [
    'function setApprovalForAll(address operator, bool approved) external',
    'function isApprovedForAll(address owner, address operator) external view returns (bool)',
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
  if (!eip155Account.value.isConnected) return

  try {
    const { walletProvider } = useAppKitProvider('eip155')
    const provider = new BrowserProvider(walletProvider)
    const signer = await provider.getSigner()

    const vaultContract = getVaultContract(signer)
    const turtleContract = getTurtleContract(signer)

    const poolBalance = await turtleContract.balanceOf(contractAddress)
    const perNFT = await vaultContract.turtlePerNFT()
    const swapFee = await vaultContract.swapFeeTurtle()
    const purchaseFee = await vaultContract.purchaseFeeCRO()
    const tokens = await vaultContract.getVaultNFTs()

    totalTurtle.value = parseInt(ethers.formatEther(poolBalance))
    nftsInVault.value = tokens.length
    turtlePerNft.value = parseInt(ethers.formatEther(perNFT))
    vaultNFTs.value = tokens.map(t => t.toString())

    vaultInfo.value = {
      poolBalance: ethers.formatEther(poolBalance),
      perNFT: ethers.formatEther(perNFT),
      swapFee: ethers.formatEther(swapFee),
      purchaseFee: ethers.formatEther(purchaseFee),
    }

    await loadUserNFTs()
  }
  catch (error) {
    console.error('Error loading vault data:', error)
  }
}

async function loadUserNFTs() {
  if (!eip155Account.value.address) return
  try {
    const apiBaseUrl = process.env.VITE_API_BASE || 'http://localhost:8080'
    const response = await fetch(`${apiBaseUrl}/api/${nftContractAddress}/${chainId}/tokens?owner=${eip155Account.value.address}`)
    const data = await response.json()
    userNFTs.value = data.tokens ? data.tokens.map(t => t.toString()) : []
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
  const perNFT = parseFloat(vaultInfo.value.perNFT)
  const swapFee = parseFloat(vaultInfo.value.swapFee)
  return ((perNFT + swapFee) * selectedVaultNFTs.value.length).toFixed(4)
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
    processing.value = false
  }
  catch (error) {
    console.error('Deposit failed:', error)
    processing.value = false
  }
}

async function swapForNFTs() {
  if (selectedVaultNFTs.value.length === 0) return
  try {
    processing.value = true
    const { walletProvider } = useAppKitProvider('eip155')
    const provider = new BrowserProvider(walletProvider)
    const signer = await provider.getSigner()

    const contract = getVaultContract(signer)
    const turtleContract = getTurtleContract(signer)

    const perNFT = await contract.turtlePerNFT()
    const swapFee = await contract.swapFeeTurtle()
    const totalCost = (perNFT + swapFee) * BigInt(selectedVaultNFTs.value.length)

    const allowance = await turtleContract.allowance(eip155Account.value.address, contractAddress)
    if (allowance < totalCost) {
      const approveTx = await turtleContract.approve(contractAddress, totalCost)
      await approveTx.wait()
    }

    const tx = await contract.swapForNFTs(selectedVaultNFTs.value)
    await tx.wait()

    selectedVaultNFTs.value = []
    await loadVaultData()
    processing.value = false
  }
  catch (error) {
    console.error('Swap failed:', error)
    processing.value = false
  }
}

async function purchaseWithCRO() {
  if (selectedVaultNFTs.value.length === 0) return
  try {
    processing.value = true
    const { walletProvider } = useAppKitProvider('eip155')
    const provider = new BrowserProvider(walletProvider)
    const signer = await provider.getSigner()

    const contract = getVaultContract(signer)
    const purchaseFee = await contract.purchaseFeeCRO()
    const totalCost = purchaseFee * BigInt(selectedVaultNFTs.value.length)

    const tx = await contract.purchaseNFTsWithCRO(selectedVaultNFTs.value, { value: totalCost })
    await tx.wait()

    selectedVaultNFTs.value = []
    await loadVaultData()
    processing.value = false
  }
  catch (error) {
    console.error('Purchase failed:', error)
    processing.value = false
  }
}

watch(eip155Account.value, async (account) => {
  if (account.isConnected) {
    await loadVaultData()
  }
})

onMounted(async () => {
  if (eip155Account.value.isConnected) {
    const { walletProvider } = useAppKitProvider('eip155')
    const provider = new BrowserProvider(walletProvider)
    await loadVaultData(provider)
  }
})
</script>

<style scoped>
code {
  background-color: rgba(0, 0, 0, 0.1);
  padding: 2px 4px;
  border-radius: 4px;
  font-family: monospace;
}

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
