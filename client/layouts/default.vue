<template>
  <v-app>
    <v-main>
      <Header />

      <v-container
        fluid
        class="pa-0"
      >
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>
