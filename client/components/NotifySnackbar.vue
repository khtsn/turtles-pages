<template>
  <v-snackbar
    v-model="show"
    timeout="2000"
    :color="color"
    location="top right"
    elevation="24"
  >
    <div :class="{ 'text-shadow': color === 'success' }">
      {{ message }}
    </div>
  </v-snackbar>
</template>

<script setup>
import { useSnackbarStore } from '~/store/snackbar'

const snackbarStore = useSnackbarStore()
const show = ref(false)
const message = ref('')
const color = ref('')

snackbarStore.$onAction((action) => {
  if (action.name === 'showSnackbar') {
    const msg = action.args[0]
    color.value = msg.color
    message.value = msg.content
    show.value = true
  }
})
</script>
