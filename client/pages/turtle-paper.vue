<template>
  <v-container class="content-container">
    <div
      class="markdown-content"
      v-html="renderedMarkdown"
    />
  </v-container>
</template>

<script setup>
import { onMounted } from 'vue'
import { marked } from 'marked'

const renderedMarkdown = ref('')

useHead({
  title: 'Turtle Paper',
  meta: [
    { name: 'description', content: 'Turtle Whitepaper Page' },
    {
      hid: 'og:description',
      property: 'og:description',
      content: 'The CTO Turtle Whitepaper Page',
    },
  ],
})

onMounted(async () => {
  renderedMarkdown.value = marked(await $fetch('/content/turtle-paper.md'))
})
</script>
