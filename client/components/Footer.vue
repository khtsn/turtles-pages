<template>
  <footer>
    <div class="footer-wrapper">
      <div nclass="logo-wrapper">
        <img
          src="/logo.jpg"
          class="logo"
        >
      </div>
      <v-row class="mt-4">
        <v-col
          cols="12"
          md="4"
        >
          <p class="subheader-text text-primary">
            Contact us
          </p>
          <p class="text-background mt-2">
            Email: Turtlecronos@hotmail.com
          </p>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <p class="subheader-text text-primary">
            Social
          </p>
          <div class="d-flex align-center mt-2">
            <img
              src="/x.svg"
              alt="social"
              class="social-icon mr-4"
              @click="openNewTab('https://x.com/turtleoncro')"
            >
            <img
              src="/telegram.svg"
              alt="social"
              class="social-icon mr-4"
              @click="openNewTab('https://t.me/turtleoncrocommunity')"
            >
            <img
              src="/discord.svg"
              alt="social"
              class="social-icon"
              @click="openNewTab('https://discord.gg/qBa9FFa7BD')"
            >
          </div>
        </v-col>
      </v-row>

      <div class="text-center mt-16">
        <p class="text-background">
          ©2025 TurtleOnCronos. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const { openNewTab } = useNavigation()
</script>

<style scoped>
.footer-wrapper {
  background-color: rgb(var(--v-theme-surface));
  padding: 2rem;
}

.logo {
  height: 50px;
  border-top-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

.social-icon {
  height: 30px;
  width: 30px;
  cursor: pointer;
  filter: invert(97%) sepia(68%) saturate(2%) hue-rotate(225deg) brightness(112%) contrast(100%);
}

@media screen and (max-width: 600px) {
  .footer-wrapper {
    padding: 1rem;
  }
}
</style>
