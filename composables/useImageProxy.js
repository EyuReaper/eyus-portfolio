const PROXY_BASE = 'https://wsrv.nl'
const IMAGE_BASE = 'https://cdn.jsdelivr.net/gh/EyuReaper/image-cdn'

export function useImageProxy() {
  function proxiedImage(path, options = {}) {
    const url = path.startsWith('http') ? path : `${IMAGE_BASE}/${path}`
    const params = new URLSearchParams({ url })

    if (options.width) params.set('w', options.width)
    if (options.height) params.set('h', options.height)
    if (options.quality) params.set('q', options.quality)
    if (options.format) params.set('output', options.format)

    return `${PROXY_BASE}/?${params.toString()}`
  }

  return { proxiedImage, IMAGE_BASE }
}
