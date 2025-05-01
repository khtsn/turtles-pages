export default function useNavigation() {
  const router = useRouter()

  const pushTo = (path, hash, query) => {
    router.push({ path, hash, query })
  }
  const pushWithNoHistory = (path) => {
    window.location.replace(path)
  }
  const openNewTab = (url) => {
    window.open(url, '_blank').focus()
  }
  const replaceUrl = (path, query) => {
    router.replace({ path, query })
  }

  return {
    pushTo,
    pushWithNoHistory,
    openNewTab,
    replaceUrl,
  }
}
