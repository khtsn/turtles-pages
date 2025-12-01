<template>
  <div>
    <v-app-bar
      id="navbar"
      color="background"
      :elevation="0"
    >
      <template #prepend>
        <div
          class="logo-wrapper"
          @click="pushTo('/')"
        >
          <img
            src="/logo.jpg"
            class="logo"
          >
        </div>
        <div class="d-none d-lg-block">
          <div class="menu-group">
            <div
              v-for="(item, i) in menus"
              :key="i"
            >
              <NuxtLink
                :to="item.to"
                class="menu"
              >
                {{ item.title }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </template>

      <template #append>
        <div class="d-none d-lg-block">
          <v-btn
            v-if="!eip155Account.isConnected"
            flat
            class="custom-button"
            @click="open"
          >
            Connect Wallet
          </v-btn>
          <div
            v-else
            class="wallet-info"
          >
            <span class="wallet-address">{{ formatAddress(eip155Account.address) }}</span>
            <v-btn
              flat
              size="small"
              class="ml-2"
              @click="disconnect"
            >
              Disconnect
            </v-btn>
          </div>
        </div>
        <div class="d-flex d-lg-none">
          <v-btn
            icon="mdi-menu"
            @click.stop="drawer = !drawer"
          />
        </div>
      </template>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      theme="custom"
      temporary
    >
      <v-list
        density="compact"
        nav
      >
        <v-list-item v-if="!eip155Account.isConnected">
          <v-btn
            flat
            class="custom-button w-100"
            @click="open"
          >
            Connect Wallet
          </v-btn>
        </v-list-item>
        <v-list-item v-else>
          <div class="mobile-wallet-info">
            <div class="wallet-address mb-2">
              {{ formatAddress(eip155Account.address) }}
            </div>
            <v-btn
              flat
              size="small"
              class="w-100"
              @click="disconnect"
            >
              Disconnect
            </v-btn>
          </div>
        </v-list-item>
        <v-divider
          v-if="eip155Account.isConnected || !eip155Account.isConnected"
          class="my-2"
        />
        <v-list-item
          v-for="(item, i) in menus"
          :key="i"
          :title="item.mobile_title || item.title"
          :href="item?.href"
          link
        />
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script setup>
import { useAppKitAccount } from '@reown/appkit/vue'

const { pushTo } = useNavigation()
const { open, disconnect } = useContract()
const eip155Account = useAppKitAccount({ namespace: 'eip155' })

const drawer = ref(false)

const formatAddress = (address) => {
  if (!address) return ''
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}
const menus = reactive([
  {
    title: 'Links',
    mobile_title: 'Dexscreener Links',
    to: '/links',
    href: '/links',
  },
  {
    title: 'Buy Turtle',
    to: '/buy-turtle',
    href: '/buy-turtle',
  },
  {
    title: 'Branding',
    to: '/branding',
    href: '/branding',
  },
  {
    title: 'Partners',
    to: '/partners',
    href: '/partners',
  },
  {
    title: 'About Us',
    to: '/about',
    href: '/about',
  },
  {
    title: 'Turtle Whitepaper',
    to: '/turtle-paper',
    href: '/turtle-paper',
  },
  {
    title: 'Mint Turtles NFTs',
    to: '/mint-turtle',
    href: '/mint-turtle',
  },
  {
    title: 'Earning Turtle',
    to: '/earning-turtle',
    href: '/earning-turtle',
  },
  {
    title: 'NFT Generator',
    to: '/generator',
    href: '/generator',
  },
  {
    title: 'Redemption Vault',
    to: '/vault',
    href: '/vault',
  },
])
</script>

<style scoped>
.logo {
  height: 50px;
  margin-left: 1rem;
  cursor: pointer;
  border-top-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

.menu-group {
  display: inline-flex !important;
  margin-left: 3rem;
}

.menu {
  color: rgb(var(--v-theme-surface));
  cursor: pointer;
  transition: all .3s ease-out;
  margin-right: 3rem;
  font-weight: bold;
  text-decoration: none;
}

.menu:hover {
  color: rgb(var(--v-theme-primary));
}

.wallet-info {
  display: flex;
  align-items: center;
}

.wallet-address {
  font-size: 0.875rem;
  color: rgb(var(--v-theme-surface));
  font-weight: 500;
}

.custom-button {
  background-color: rgb(var(--v-theme-primary));
  color: white;
}

.mobile-wallet-info {
  width: 100%;
  text-align: center;
}

.mobile-wallet-info .wallet-address {
  font-size: 0.875rem;
  color: rgb(var(--v-theme-primary));
  font-weight: 500;
}
</style>
