import { useSnackbarStore } from '~/store/snackbar'

export default function useSnackbar() {
  const snackbarStore = useSnackbarStore()

  const { showSnackbar } = snackbarStore

  const notifySuccess = (content) => {
    showSnackbar({ content, color: 'success' })
  }
  const notifyError = (content) => {
    showSnackbar({ content, color: 'error' })
  }

  return {
    notifySuccess,
    notifyError,
  }
}
