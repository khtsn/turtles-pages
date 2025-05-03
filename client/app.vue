<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <NotifySnackbar />
  </div>
</template>

<script setup>
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/vue'

const { chain, metadata } = useProvider()
const config = useRuntimeConfig()

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [chain],
  projectId: config.public.walletConnectId,
  enableAnalytics: true,
})
</script>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s;
}

.slide-enter-from {
  opacity: 0;
  transform: translate(50px, 0);
}

.slide-leave-to {
  opacity: 0;
  transform: translate(-50px, 0);
}
</style>
