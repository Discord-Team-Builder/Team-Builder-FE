export function extractProjectId(pathname) {
    if (typeof pathname !== "string") return null
    const match = pathname.match(/^\/dashboard\/([^\/]+)/)
    return match ? match[1] : null
  }
  