import { ethers, Contract } from 'ethers'
import { useDisconnect, useAppKit } from '@reown/appkit/vue'

import nftAbi from '~/assets/js/marketplace-contract.json'
import tokenAbi from '~/assets/js/approval-contract.json'

export default function useContract() {
  const nftContractAddress = '0x2bAA455e573df4019B11859231Dd9e425D885293'
  const tokenContractAddress = '0x8C9E2bEf2962CE302ef578113eebEc62920B7e57'

  const disconnect = () => {
    const { disconnect } = useDisconnect()
    disconnect()
  }

  const open = () => {
    const { open } = useAppKit()
    open()
  }

  const getERC20TokenFee = async (provider) => {
    const nft = new Contract(
      nftContractAddress,
      nftAbi,
      provider)
    const fee = await nft.erc20TokenFee()
    return fee
  }

  const getNativeTokenFee = async (provider) => {
    const nft = new Contract(
      nftContractAddress,
      nftAbi,
      provider)
    const fee = await nft.nativeTokenFee()
    return fee
  }

  const approveERC20Token = async (signer, amount) => {
    const token = new Contract(tokenContractAddress, tokenAbi, signer)
    const tx = await token.approve(nftContractAddress, amount)
    return tx
  }
  const mintWithERC20Token = async (signer, amount) => {
    const contract = new ethers.Contract(
      nftContractAddress,
      nftAbi,
      signer)
    const result = await contract.publicMintWithERC20Token(amount)
    return result
  }
  const mintWithNativeToken = async (signer, fee, amount) => {
    const contract = new Contract(
      nftContractAddress,
      nftAbi,
      signer)
    const result = await contract.publicMintWithNativeToken(
      amount, { value: fee * BigInt(amount) },
    )
    return result
  }

  return {
    approveERC20Token,
    mintWithERC20Token,
    mintWithNativeToken,
    getERC20TokenFee,
    getNativeTokenFee,
    disconnect,
    open,
  }
}
