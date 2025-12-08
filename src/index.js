export default {
  async fetch(request) {

    // 🧭 Upstream phải có dấu "/" ở cuối
    const upstream = 'https://xuanan2018.github.io/input-hourly-target/'

    const url = new URL(request.url)
    const upstreamUrl = new URL(url.pathname + url.search, upstream)

    // 🔄 Forward request đến GitHub Pages (origin server)
    const res = await fetch(upstreamUrl.toString(), {
      method: request.method,
      headers: request.headers,
      body: request.body,
      redirect: 'manual',
    })

    // 🌐 Bổ sung CORS (Cross-Origin Resource Sharing)
    const newHeaders = new Headers(res.headers)
    newHeaders.set('Access-Control-Allow-Origin', '*')

    return new Response(res.body, {
      status: res.status,
      statusText: res.statusText,
      headers: newHeaders,
    })
  }
}
