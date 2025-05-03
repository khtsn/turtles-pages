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
          <div class="menu-group ">
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
        <div class="d-flex d-sm-none">
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
        <v-list-item
          v-for="(item, i) in menus"
          :key="i"
          :title="item.title"
          :href="item?.href"
          link
        />
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script setup>
const { pushTo } = useNavigation()

const drawer = ref(false)
const menus = reactive([
  {
    title: 'Dexscreener Links',
    to: '/dexscreener',
    href: '/dexscreener',
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
    title: 'Turtle Paper',
    to: '/turtle-paper',
    href: '/turtle-paper',
  },
  {
    title: 'Mint Turtles NFTs',
    to: '/mint-turtle',
    href: '/mint-turtle',
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
</style>
