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
        Earning Turtle
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
        <b>CA:</b> 0x7016db90c1f8b87ea4d18b7e53fb7c42999bc995<br>
        <b>Required TURTLE per NFT:</b> {{ requiredTurtlePerNFT }} TURTLE<br>
        <b>Daily earning rate:</b> {{ dailyEarningRate }} TURTLE per NFT<br>
        <b>Withdrawal fee (less than 24h):</b> {{ first24hFee }} CRO<br>
        <b>Withdrawal fee (less than 72h):</b> {{ first72hFee }} CRO<br>
      </p>

      <v-row
        v-if="eip155Account.isConnected"
        class="mt-4"
      >
        <v-col>
          <v-card class="mb-4">
            <v-card-title>Stake Information</v-card-title>
            <v-card-text>
              <p><b>Staked NFTs:</b> {{ stakeInfo.nftCount }} / {{ nftBalance }} owned</p>
              <p><b>Staked TURTLE:</b> {{ stakedTurtleTokens }} TURTLE</p>
              <p><b>Pending Earnings:</b> {{ pendingEarnings }} TURTLE</p>
              <p><b>Staked At:</b> {{ formatTimestamp(stakeInfo.stakedAt) }}</p>
              <p><b>Last Claim At:</b> {{ formatTimestamp(stakeInfo.lastClaimAt) }}</p>
              <p><b>Withdrawal Fee:</b> {{ withdrawalFee }} CRO</p>
            </v-card-text>
          </v-card>

          <v-row>
            <v-col
              cols="12"
              md="4"
              class="action-buttons"
            >
              <v-btn
                flat
                class="custom-button action-button mb-2"
                :disabled="!canStake"
                @click="submitStake"
              >
                {{ stakeInfo.nftCount > 0 ? 'Stake More NFTs' : 'Stake NFTs' }} ({{ requiredTurtleAmount }} TURTLE)
              </v-btn>
              <v-btn
                flat
                class="custom-button action-button mb-2"
                :disabled="pendingEarnings === '0'"
                @click="submitClaim"
              >
                Claim Rewards
              </v-btn>
              <v-btn
                flat
                class="custom-button action-button"
                :disabled="stakeInfo.nftCount === 0"
                @click="submitUnstake"
              >
                Unstake All
              </v-btn>
            </v-col>
          </v-row>
          <v-row v-if="transactionHash">
            <p>
              Transaction successful!<br>
              Transaction Hash: <a :href="prepareExplorerURL(transactionHash)">{{ transactionHash }}</a>
            </p>
          </v-row>
        </v-col>
      </v-row>
      <v-row
        v-else
        class="mt-4"
      >
        <v-col class="text-center">
          <p>Please connect your wallet using the header to access earning features.</p>
        </v-col>
      </v-row>

      <v-row class="mt-4">
        <v-col>
          <div class="content-text">
            <h2>Turtles Earning Contract</h2>
            <p>As a CTO of a NON TAX fully circulating token, the NFTs are funding the build of this project.</p>
            <p>$TURTLE and Turtles NFTs are programmed to work together. These are key details of our earning contract.</p>
            <p>Safety, decentralization, and long-term sustainability of the Turtle Brand are key concerns in this.</p>
            <br>
            <p>
              🔸️Each NFT must pair with 35,000 Turtle to earn a fixed rate of 10 Turtle per day.<br>
              🔸️Fixed 10.29% annual return (excluding NFT cost)
              🔸️35,000 Turtle lock-up can be adjusted, but minimum is 10,000.<br>
              🔸️10 Turtle per day earned can be adjusted, but 10 is the maximum.<br>
              🔸️No withdraw feature on contract<br>
              🔸️Your $TURTLE goes to contract when locked<br>
              🔸️Your NFT stays in your wallet
            </p>
            <br>
            <p>Having no withdraw up insures that NO-ONE, INCLUDING US, can remove funds from the contract for ANY reason, at any time, ever! Turtle in the contract can only be distributed to corresponding $TURTLE and Turtle NFT pairings, when they are initiated.</p>
            <br>
            <p>
              🔸️This is a maximum of 3.88% or 38,781,250 million turtle emissions annually, if max supply token and NFT pairings were locked. We purchased 12% of supply, or 3 years for this, prior to any NFT minting or royalty buybacks.<br>
              🔸️If any initiated NFT is sold before your Turtle claim is made, any unclaimed turtle earnings pause. IF you do not replace the sold NFT, your $TURTLE stays locked in contract. Nobody else can remove it. You MUST replace the sold NFT to claim your $TURTLE.<br>
              🔸️Earnings are calculated by the day<br>
              🔸️The Fixed earning Rate is adjusted annually based on the previous years earnings from the community, and the amounts used.<br>
              🔸️Community must maintain an estimated 3 years earnings in contract at renewal in order to prevent emissions reduction.<br>
              🔸️If there are more annual earnings than needed we can Dao vote options for where the extra turtle gets used up during annual adjustment announcements.
            </p>
            <br>
            <h3>🏦Fees:</h3>
            <p>
              <strong>🐢Disclaimer🐢</strong><br>
              All fees go to TurtleCommunity-Vault.CRO and follow the royalty schedule in turtlepaper for our NFTs. This is our main royalty/community treasury wallet controlled by DAO voting. We will keep a float of minimum 200 $CRO and disperse fees/royalties when they are at certain thresholds.
            </p>
            <p>
              🔸️10 CRO withdraw fee in the first 24 hours.<br>
              🔸️5 CRO withdraw fee first 72 hours.<br>
              🔸️0 CRO to claim or unstake after.
            </p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/vue'
import { ethers, BrowserProvider, Contract } from 'ethers'
import earningABI from '~/assets/js/earning-contract.json'
import marketplaceABI from '~/assets/js/marketplace-contract.json'
import approvalABI from '~/assets/js/approval-contract.json'

useHead({
  title: 'Earning Turtle',
  meta: [
    { name: 'description', content: 'Earning Turtle Page' },
    {
      hid: 'og:title',
      property: 'og:title',
      content: 'Earning Turtle - Turtle On Cronos',
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content: 'Earning Turtle Page',
    },
  ],
})

const { notifySuccess, notifyError } = useSnackbar()
const processing = ref(false)
const eip155Account = useAppKitAccount({ namespace: 'eip155' })
const transactionHash = ref(false)

// Contract constants
const requiredTurtlePerNFT = ref('0')
const dailyEarningRate = ref('0')
const first24hFee = ref('0')
const first72hFee = ref('0')

// User data
const stakeInfo = ref({ nftCount: 0, stakedAt: 0, lastClaimAt: 0 })
const stakedTurtleTokens = ref('0')
const pendingEarnings = ref('0')
const withdrawalFee = ref('0')
const nftBalance = ref(0)
const canStake = ref(false)
const requiredTurtleAmount = ref('0')

// Contract address (replace with actual deployed address)
const EARNING_CONTRACT_ADDRESS = '0x7016db90c1f8b87ea4d18b7e53fb7c42999bc995'

const getContract = (provider) => {
  return new Contract(EARNING_CONTRACT_ADDRESS, earningABI, provider)
}

const loadContractData = async (provider) => {
  const contract = getContract(provider)
  const address = eip155Account.value.address

  // Load contract constants
  requiredTurtlePerNFT.value = ethers.formatEther(await contract.requiredTurtlePerNFT())
  dailyEarningRate.value = ethers.formatEther(await contract.dailyEarningRate())
  first24hFee.value = ethers.formatEther(await contract.FIRST_24H_FEE())
  first72hFee.value = ethers.formatEther(await contract.FIRST_72H_FEE())

  // Load user data
  const [nftCount, stakedAt, lastClaimAt] = await contract.getStakeInfo(address)
  stakeInfo.value = { nftCount: Number(nftCount), stakedAt: Number(stakedAt), lastClaimAt: Number(lastClaimAt) }

  stakedTurtleTokens.value = ethers.formatEther(await contract.stakedTurtleTokens(address))
  pendingEarnings.value = ethers.formatEther(await contract.calculateEarnings(address))

  if (stakeInfo.value.stakedAt > 0) {
    withdrawalFee.value = ethers.formatEther(await contract.calculateWithdrawalFee(stakeInfo.value.stakedAt))
  }

  // Check if user can stake (has more NFTs than currently staked)
  const nftContract = await contract.nftContract()
  const nftContractInstance = new Contract(nftContract, marketplaceABI, provider)
  const balance = await nftContractInstance.balanceOf(address)
  nftBalance.value = Number(balance)
  canStake.value = nftBalance.value > stakeInfo.value.nftCount

  // Calculate required TURTLE tokens for staking
  const totalRequired = BigInt(nftBalance.value) * await contract.requiredTurtlePerNFT()
  const alreadyStaked = await contract.stakedTurtleTokens(address)
  const additionalRequired = totalRequired - alreadyStaked
  requiredTurtleAmount.value = ethers.formatEther(additionalRequired > 0 ? additionalRequired : 0)
}

watch(eip155Account.value, async (account) => {
  if (account.isConnected) {
    const { walletProvider } = useAppKitProvider('eip155')
    const provider = new BrowserProvider(walletProvider)
    await loadContractData(provider)
  }
})

const submitStake = async () => {
  try {
    processing.value = true

    const { walletProvider } = useAppKitProvider('eip155')
    const provider = new BrowserProvider(walletProvider)
    const signer = await provider.getSigner()
    const contract = getContract(signer)
    const address = eip155Account.value.address

    // 1. Get NFT balance and validate
    const nftContract = await contract.nftContract()
    const nftContractInstance = new Contract(nftContract, marketplaceABI, provider)
    const nftBalance = await nftContractInstance.balanceOf(address)

    if (nftBalance === 0n) {
      throw new Error('No NFTs in wallet')
    }

    if (nftBalance <= stakeInfo.value.nftCount) {
      throw new Error('All NFTs already staked')
    }

    // 2. Calculate required TURTLE and validate balance
    const requiredTurtle = nftBalance * await contract.requiredTurtlePerNFT()
    const alreadyStaked = await contract.stakedTurtleTokens(address)
    const additionalRequired = requiredTurtle - alreadyStaked

    const turtleToken = await contract.turtleToken()
    const turtleContract = new Contract(turtleToken, approvalABI, signer)
    const turtleBalance = await turtleContract.balanceOf(address)

    if (turtleBalance < additionalRequired) {
      throw new Error('Insufficient TURTLE tokens')
    }

    // 3. Get approval
    if (additionalRequired > 0) {
      const approveTx = await turtleContract.approve(EARNING_CONTRACT_ADDRESS, additionalRequired)
      await approveTx.wait()
    }

    // 4. Perform stake
    const tx = await contract.stake()
    const receipt = await tx.wait()
    transactionHash.value = receipt.hash

    await loadContractData(provider)
    processing.value = false
    notifySuccess('Staked successfully!')
  }
  catch (err) {
    console.error(err)
    processing.value = false
    notifyError(err.message || 'Unable to stake')
  }
}

const submitClaim = async () => {
  try {
    processing.value = true

    const { walletProvider } = useAppKitProvider('eip155')
    const provider = new BrowserProvider(walletProvider)
    const signer = await provider.getSigner()
    const contract = getContract(signer)

    const tx = await contract.claim()
    const receipt = await tx.wait()
    transactionHash.value = receipt.hash

    await loadContractData(provider)
    processing.value = false
    notifySuccess('Claimed successfully!')
  }
  catch (err) {
    console.error(err)
    processing.value = false
    notifyError('Unable to claim rewards.')
  }
}

const submitUnstake = async () => {
  try {
    processing.value = true

    const { walletProvider } = useAppKitProvider('eip155')
    const provider = new BrowserProvider(walletProvider)
    const signer = await provider.getSigner()
    const contract = getContract(signer)

    const fee = ethers.parseEther(withdrawalFee.value)
    const tx = await contract.unstake({ value: fee })
    const receipt = await tx.wait()
    transactionHash.value = receipt.hash

    await loadContractData(provider)
    processing.value = false
    notifySuccess('Unstaked successfully!')
  }
  catch (err) {
    console.error(err)
    processing.value = false
    notifyError('Unable to unstake. Please make sure you have enough CRO for fees.')
  }
}

const formatTimestamp = (timestamp) => {
  if (timestamp === 0) return 'Never'
  return new Date(timestamp * 1000).toLocaleString()
}

const prepareExplorerURL = (val) => {
  return ('https://cronoscan.com/tx/' + val)
}
</script>

<style scoped>
.action-button {
  height: 40px !important;
  width: 100%;
}

.thumbnail {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.content-text {
  line-height: 1.6;
}

.content-text h2 {
  margin-bottom: 16px;
}

.content-text h3 {
  margin: 20px 0 12px 0;
}

@media screen and (max-width: 450px) {
  .action-buttons {
    text-align: center;
  }
}
</style>
