import { ethers } from 'ethers'
import { useWeb3ModalAccount } from '@web3modal/ethers5/vue'

export default function useProvider() {
  const chain = {
    chainId: 25,
    name: 'Cronos by Allnodes',
    currency: 'CRO',
    explorerUrl: 'https://cronos.crypto.org/explorer',
    rpcUrl: 'https://cronos-evm-rpc.publicnode.com',
  }

  const metadata = {
    name: 'Turtle On Cronos',
    description: 'Turtle On Cronos',
    url: '', // origin must match your domain & subdomain
    icons: [''],
  }

  const isConnected = computed(() => {
    return useWeb3ModalAccount().isConnected.value
  })

  const getSigner = (provider) => {
    const prov = new ethers.providers.Web3Provider(provider)
    const signer = prov.getSigner()
    return signer
  }

  return {
    chain,
    metadata,
    isConnected,
    getSigner,
  }
}
