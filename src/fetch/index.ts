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
  if (!res.ok) throw new Error(`${url} failed with ${res.status}`)
  return res.json() as Promise<T>
}
