export const useSnackbarStore = defineStore('snackbar', () => {
  const content = ref(null)
  const color = ref(null)

  const showSnackbar = async (payload) => {
    content.value = payload.content
    color.value = payload.color
  }

  return {
    showSnackbar,
  }
})
