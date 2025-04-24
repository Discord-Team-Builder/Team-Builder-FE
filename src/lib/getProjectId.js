export function extractProjectId(pathname){
    const match = pathname.match(/^\/dashboard\/([^\/]+)/)
    return match ? match[1] : null
  }