export class FetchError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly url: string,
    public readonly responseText?: string
  ) {
    super(message)
    this.name = "FetchError"
  }
}

export interface SecureFetchOptions extends RequestInit {
  json?: unknown
  timeout?: number
  retries?: number
  retryDelay?: number
}

export async function secureFetch<T>(
  url: string,
  options: SecureFetchOptions = {}
): Promise<T> {
  const {
    json,
    timeout = 30000,
    retries = 0,
    retryDelay = 1000,
    ...fetchOptions
  } = options

  const controller = new AbortController()
  const timeoutId = timeout
    ? setTimeout(() => controller.abort(), timeout)
    : null

  const attemptFetch = async (attempt: number): Promise<T> => {
    try {
      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
        credentials: fetchOptions.credentials ?? "same-origin",
        headers: {
          ...(json ? { "Content-Type": "application/json" } : {}),
          ...fetchOptions.headers,
        },
        body: json ? JSON.stringify(json) : fetchOptions.body,
      })

      if (!response.ok) {
        const errorText = await response.text().catch(() => "Unknown error")
        throw new FetchError(
          `Request failed with status ${response.status}`,
          response.status,
          url,
          errorText
        )
      }

      const contentType = response.headers.get("content-type")
      if (contentType?.includes("application/json")) {
        return response.json() as Promise<T>
      }

      if (!contentType || contentType.includes("text/")) {
        return response.text() as unknown as T
      }

      return response.blob() as unknown as T
    } catch (error) {
      if (attempt < retries) {
        await new Promise((resolve) =>
          setTimeout(resolve, retryDelay * (attempt + 1))
        )
        return attemptFetch(attempt + 1)
      }

      if (error instanceof FetchError) {
        throw error
      }

      if (error instanceof Error) {
        if (error.name === "AbortError") {
          throw new FetchError("Request timeout", 408, url)
        }
        throw new FetchError(error.message, 0, url)
      }

      throw new FetchError("Unknown error occurred", 0, url)
    } finally {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }

  return attemptFetch(0)
}
export * from "./env"
export * from "./query-params"
export * from "./type"
