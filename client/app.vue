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
import { cronos } from '@reown/appkit/networks'

const config = useRuntimeConfig()

const metadata = {
  name: 'Turtle On Cronos',
  description: 'Turtle On Cronos',
  url: 'https://turtleoncro.com', // origin must match your domain & subdomain
  icons: ['https://intro.turtleoncro.com/reveal.jpg'],
}

createAppKit({
  adapters: [new EthersAdapter()],
  networks: [cronos],
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
