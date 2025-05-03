import { ethers } from 'ethers'
import marketplaceData from '~/assets/js/marketplace-contract.json'
import approvalData from '~/assets/js/approval-contract.json'

export default function useContract() {
  const marketplaceContractData = ref(null)
  const approvalContractData = ref(null)
  const marketplaceAddress = '0x2bAA455e573df4019B11859231Dd9e425D885293'
  const approvalAddress = '0x8C9E2bEf2962CE302ef578113eebEc62920B7e57'

  onMounted(() => {
    marketplaceContractData.value = marketplaceData.abi
    approvalContractData.value = approvalData.abi
  })

  const approveMint = async (signer, amount) => {
    const contract = new ethers.Contract(
      approvalAddress,
      approvalContractData.value,
      signer)
    const approval = await contract.approve(
      marketplaceAddress,
      amount,
    )
    return approval
  }
  const mint = async (signer, amount) => {
    const contract = new ethers.Contract(
      marketplaceAddress,
      marketplaceContractData.value,
      signer)
    const result = await contract.publicMintWithERC20Token(amount)
    return result
  }
  const mintNative = async (signer, amount) => {
    const contract = new ethers.Contract(
      marketplaceAddress,
      marketplaceContractData.value,
      signer)
    const result = await contract.publicMintWithNativeToken(
      ethers.utils.parseEther('240') * amount,
      amount,
    )
    return result
  }

  return {
    approveMint,
    mint,
    mintNative,
  }
}
