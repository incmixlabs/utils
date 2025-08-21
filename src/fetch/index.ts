export async function secureFetch<T>(
  url: string,
  init: RequestInit & { json?: unknown } = {}
): Promise<T> {
  const { json, ...opts } = init
  const res = await fetch(url, {
    credentials: opts.credentials ?? "same-origin",
    headers: {
      ...(json ? { "Content-Type": "application/json" } : {}),
      ...opts.headers,
    },
    body: json ? JSON.stringify(json) : undefined,
    ...opts,
  })
  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(`Request to ${url} failed with ${res.status}: ${errorText}`)
  }
  const contentType = res.headers.get("content-type")
  if (!contentType?.includes("application/json")) {
    throw new Error(`Expected JSON response from ${url}, got ${contentType}`)
  }
  return res.json() as Promise<T>
}
export * from "./env"
export * from "./query-params"
export * from "./type"
