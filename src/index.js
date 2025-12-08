export default {
  async fetch(request, env) {
    // Địa chỉ GitHub Pages bạn đang dùng:
    const upstream = 'https://xuanan2018.github.io/input-hourly-target'

    // Giữ nguyên đường dẫn + query user request
    const url = new URL(request.url)
    const upstreamUrl = new URL(url.pathname + url.search, upstream)

    // Forward request tới GitHub Pages
    const res = await fetch(upstreamUrl.toString(), {
      method: request.method,
      headers: request.headers,
      body: request.body,
      redirect: 'manual'
    })

    // Trả response về client
    const responseHeaders = new Headers(res.headers)
    // (Tuỳ chọn) thêm header CORS nếu bạn cần
    responseHeaders.set('Access-Control-Allow-Origin', '*')

    return new Response(res.body, {
      status: res.status,
      statusText: res.statusText,
      headers: responseHeaders
    })
  }
}
