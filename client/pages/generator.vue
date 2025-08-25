<template>
  <v-container class="content-container">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-4">
          NFT Generator
        </h1>

        <!-- NFTs Section -->
        <v-card
          v-if="isConnected"
          class="mb-4"
        >
          <v-card-title>
            Your NFTs ({{ nfts.length }})
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-if="nfts.length > 0"
              v-model="searchTokenId"
              label="Search by Token ID"
              prepend-inner-icon="mdi-magnify"
              clearable
              density="compact"
              class="mb-3"
            />
            <div
              v-if="loading"
              class="text-center pa-4"
            >
              <v-progress-circular indeterminate />
              <p class="mt-2">
                {{ loadingText }}
              </p>
            </div>
            <v-row v-else-if="nfts.length === 0">
              <v-col cols="12">
                <p>No NFTs found in your wallet</p>
              </v-col>
            </v-row>
            <div v-else-if="filteredNFTs.length === 0">
              <p>No NFTs match your search</p>
            </div>
            <div
              v-else
              class="nft-scroll-container"
            >
              <v-card
                v-for="nft in filteredNFTs"
                :key="nft.tokenId"
                :class="{ selected: selectedNFT?.tokenId === nft.tokenId }"
                class="nft-card"
                @click="selectNFT(nft)"
              >
                <v-img
                  :src="nft.image"
                  width="128"
                  height="128"
                  cover
                />
                <v-card-subtitle>Token #{{ nft.tokenId }}</v-card-subtitle>
              </v-card>
            </div>
          </v-card-text>
        </v-card>

        <!-- Wallet Not Connected Message -->
        <v-card
          v-if="!isConnected"
          class="mb-4"
        >
          <v-card-text class="text-center">
            <p>Please connect your wallet using the header to access your NFTs and generate images.</p>
          </v-card-text>
        </v-card>

        <!-- Overlays Section -->
        <v-card class="mb-4">
          <v-card-title>Overlays</v-card-title>
          <v-card-text>
            <v-tabs v-model="activeTab">
              <v-tab value="GM">
                GM
              </v-tab>
              <v-tab value="TACOS">
                TACOS
              </v-tab>
            </v-tabs>

            <v-tabs-window v-model="activeTab">
              <v-tabs-window-item value="GM">
                <div class="overlay-scroll-container mt-2">
                  <v-card
                    v-for="overlay in gmTeacupOverlays"
                    :key="overlay.id"
                    :class="{ selected: selectedOverlay?.id === overlay.id }"
                    class="overlay-card"
                    @click="selectOverlay(overlay)"
                  >
                    <v-img
                      :src="overlay.src"
                      width="128"
                      height="128"
                      cover
                    />
                    <v-card-subtitle>{{ overlay.name }}</v-card-subtitle>
                  </v-card>
                </div>
              </v-tabs-window-item>

              <v-tabs-window-item value="TACOS">
                <div class="overlay-scroll-container mt-2">
                  <v-card
                    v-for="overlay in tacosOverlays"
                    :key="overlay.id"
                    :class="{ selected: selectedOverlay?.id === overlay.id }"
                    class="overlay-card"
                    @click="selectOverlay(overlay)"
                  >
                    <v-img
                      :src="overlay.src"
                      width="128"
                      height="128"
                      cover
                    />
                    <v-card-subtitle>{{ overlay.name }}</v-card-subtitle>
                  </v-card>
                </div>
              </v-tabs-window-item>
            </v-tabs-window>
          </v-card-text>
        </v-card>

        <!-- Generator Section -->
        <v-card
          v-if="selectedNFT"
          class="my-2"
        >
          <v-card-title>Mixed Image</v-card-title>
          <v-card-text>
            <v-row>
              <v-col
                cols="12"
                md="4"
              >
                <h3>Selected NFT</h3>
                <v-img
                  :src="selectedNFT.image"
                  width="128"
                  height="128"
                  cover
                />
              </v-col>
              <v-col
                v-if="selectedOverlay"
                cols="12"
                md="4"
              >
                <h3>Selected Overlay</h3>
                <v-img
                  :src="selectedOverlay.src"
                  width="128"
                  height="128"
                  cover
                />
              </v-col>
              <v-col
                cols="12"
                :md="selectedOverlay ? 4 : 8"
              >
                <h3>{{ selectedOverlay ? 'Generated Image' : 'Original Image' }}</h3>
                <v-progress-circular
                  v-if="generating"
                  indeterminate
                  size="64"
                />
                <div v-else>
                  <v-img
                    :src="mixedImage || selectedNFT.image"
                    width="128"
                    height="128"
                    cover
                  />
                  <v-btn
                    color="success"
                    class="mt-2"
                    size="small"
                    @click="downloadImage"
                  >
                    Download
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useAppKitAccount } from '@reown/appkit/vue'

const eip155Account = useAppKitAccount({ namespace: 'eip155' })
const isConnected = computed(() => eip155Account.value.isConnected)
const address = computed(() => eip155Account.value.address)

const nfts = ref([])
const overlays = ref([])
const selectedNFT = ref(null)
const selectedOverlay = ref(null)
const mixedImage = ref('')
const loading = ref(false)
const loadingText = ref('Fetching your NFTs...')
const generating = ref(false)
const activeTab = ref('GM')
const loadedAddress = ref('')
const searchTokenId = ref('')

const gmTeacupOverlays = computed(() =>
  overlays.value.filter(o => o.category === 'GM'),
)

const tacosOverlays = computed(() =>
  overlays.value.filter(o => o.category === 'TACOS'),
)

const filteredNFTs = computed(() => {
  if (!searchTokenId.value) return nfts.value
  return nfts.value.filter(nft =>
    nft.tokenId.toString().includes(searchTokenId.value),
  )
})

const fetchUserNFTs = async (userAddress) => {
  loadingText.value = 'Connecting to blockchain...'
  try {
    const config = useRuntimeConfig()
    const apiUrl = config.public.nftApiUrl || 'http://localhost:3000'
    loadingText.value = 'Fetching your NFTs...'
    const response = await fetch(`${apiUrl}/nfts/${userAddress}`)
    if (!response.ok) return []

    const data = await response.json()
    const fetchedNFTs = []

    loadingText.value = 'Processing NFT data...'
    for (const nft of data.nfts || []) {
      fetchedNFTs.push({
        tokenId: nft.tokenID,
        image: `https://nft.turtleoncro.com/${parseInt(nft.tokenID) + 1}.png`,
      })
    }

    nfts.value = fetchedNFTs
    return fetchedNFTs
  }
  catch (error) {
    console.error('Error fetching NFTs:', error)
    loadingText.value = 'Error loading NFTs'
    return []
  }
}

const loadOverlays = () => {
  const overlays = []

  // GM (28)
  for (let i = 1; i <= 28; i++) {
    overlays.push({
      id: i,
      name: `GM ${i}`,
      category: 'GM',
      src: `/overlays/GM/gm${i}.png`,
    })
  }

  // TACOS (28)
  for (let i = 1; i <= 28; i++) {
    overlays.push({
      id: i,
      name: `TACOS ${i}`,
      category: 'TACOS',
      src: `/overlays/Taco/taco${i}.png`,
    })
  }

  return overlays
}

const mixImages = (nftImage, overlayImage) => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const nftImg = new Image()
    const overlayImg = new Image()

    nftImg.crossOrigin = 'anonymous'
    overlayImg.crossOrigin = 'anonymous'

    let loadedImages = 0
    const draw = () => {
      loadedImages++
      if (loadedImages == 2) {
        canvas.width = nftImg.width
        canvas.height = nftImg.height
        ctx.drawImage(nftImg, 0, 0)
        ctx.drawImage(overlayImg, 0, 0, canvas.width, canvas.height)

        resolve(canvas.toDataURL())
      }
    }

    nftImg.onerror = () => reject(new Error('Failed to load NFT image'))
    overlayImg.onerror = () => reject(new Error('Failed to load overlay image'))
    nftImg.onload = draw
    overlayImg.onload = draw
    nftImg.src = nftImage
    overlayImg.src = overlayImage
  })
}

const selectNFT = async (nft) => {
  selectedNFT.value = nft
  mixedImage.value = ''
  if (selectedOverlay.value) {
    await generateMixedImage()
  }
}

const selectOverlay = async (overlay) => {
  if (selectedOverlay.value?.id === overlay.id) {
    selectedOverlay.value = null
    mixedImage.value = selectedNFT.value?.image || ''
  }
  else {
    selectedOverlay.value = overlay
    mixedImage.value = ''
    if (selectedNFT.value) {
      await generateMixedImage()
    }
  }
}

const loadUserNFTs = async () => {
  if (!isConnected.value) return

  loading.value = true
  loadingText.value = 'Fetching your NFTs...'
  nfts.value = []
  try {
    await fetchUserNFTs(
      address.value,
    )
  }
  catch (error) {
    console.error('Error loading NFTs:', error)
  }
  finally {
    loading.value = false
  }
}

const generateMixedImage = async () => {
  if (!selectedNFT.value || !selectedOverlay.value) return

  generating.value = true
  try {
    const mixed = await mixImages(`${selectedNFT.value.image}?time=${Date.now()}`, `${selectedOverlay.value.src}?time=${Date.now()}`)
    mixedImage.value = mixed
  }
  catch (error) {
    console.error('Error generating mixed image:', error)
  }
  finally {
    generating.value = false
  }
}

const downloadImage = () => {
  const imageToDownload = mixedImage.value || selectedNFT.value?.image
  if (!imageToDownload) return

  if (imageToDownload.startsWith('data:')) {
    // Convert base64 to blob for better browser compatibility
    const byteString = atob(imageToDownload.split(',')[1])
    const mimeString = imageToDownload.split(',')[0].split(':')[1].split(';')[0]
    const ab = new ArrayBuffer(byteString.length)
    const ia = new Uint8Array(ab)
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i)
    }
    const blob = new Blob([ab], { type: mimeString })
    const blobUrl = URL.createObjectURL(blob)
    window.open(blobUrl, '_blank')
  }
  else {
    window.open(imageToDownload, '_blank')
  }
}

onMounted(() => {
  overlays.value = loadOverlays()
})

watch(eip155Account.value, async (account) => {
  if (account.isConnected) {
    if (account.address === loadedAddress.value) return
    loadedAddress.value = account.address
    await loadUserNFTs()
  }
  else {
    nfts.value = []
    selectedNFT.value = null
    mixedImage.value = ''
  }
})
</script>

<style scoped>
.nft-card, .overlay-card {
  cursor: pointer;
  transition: all 0.3s;
}

.overlay-scroll-container, .nft-scroll-container {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding: 8px 0;
}

.overlay-scroll-container .overlay-card,
.nft-scroll-container .nft-card {
  flex-shrink: 0;
  width: 128px;
}

.nft-card:hover, .overlay-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.selected {
  border: 2px solid #1976d2;
}
</style>
