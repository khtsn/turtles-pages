<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <NotifySnackbar />
  </div>
</template>

<script setup>
import { createAppKit } from '@reown/appkit/vue'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { cronos, cronosTestnet } from '@reown/appkit/networks'

const config = useRuntimeConfig()

const metadata = {
  name: 'Turtle On Cronos',
  description: 'Turtle On Cronos',
  url: 'http://localhost:8080', // origin must match your domain & subdomain
  icons: [''],
}

createAppKit({
  adapters: [new EthersAdapter()],
  networks: [cronos, cronosTestnet],
  metadata: metadata,
  projectId: config.public.walletConnectId,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
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
