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

export const persistType = ["local", "rxdb", "session", "cookie"] as const
export const persistTypes = {
  local: 'local',
  rxdb: 'rxdb',
  session: 'session',
  cookie: 'cookie',
}
export type PersistType = (typeof persistType)[number]
export const dataSize = ["large", "medium", "small"] as const
export const dataSizes = {
  large: 'large',
  medium: 'medium',
  small: 'small',
}
export type DataSize = (typeof dataSize)[number]
export const updateFreq = ["stream", "immediate", "hourly", "daily"] as const
export type UpdateFreq = (typeof updateFreq)[number]

export const updateFreqs = {
  stream: 'stream',
  immediate: 'immediate',
  hourly: 'hourly',
  daily: 'daily',
}
export const method = ['GET', 'POST', 'PUT', 'DELETE'] as const
export const methods = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
}
export type Method = (typeof method)[number]
