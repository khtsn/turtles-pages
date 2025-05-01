export default function useCommon() {
  const isApple = () => {
    return (/iPad|iPhone|iPod/.test(navigator.userAgent) || /^((?!chrome|android).)*safari/i.test(navigator.userAgent)) && !window.MSStream
  }

  return {
    isApple,
  }
}
