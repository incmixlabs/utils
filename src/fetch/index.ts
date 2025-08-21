/**
 * Custom error class for fetch operations
 */
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

/**
 * Configuration options for secure fetch operations
 */
export interface SecureFetchOptions extends RequestInit {
  /** JSON payload to send in request body */
  json?: unknown
  /** Request timeout in milliseconds (default: 30000) */
  timeout?: number
  /** Number of retry attempts (default: 0) */
  retries?: number
  /** Delay between retries in milliseconds (default: 1000) */
  retryDelay?: number
  /** Custom retry logic function */
  shouldRetry?: (error: unknown) => boolean
}

/**
 * Secure fetch function with timeout, retries, and error handling
 * @param url - The URL to fetch
 * @param options - Fetch options including custom retry and timeout settings
 * @returns Promise resolving to the parsed response
 * @template T - The expected response type
 */
export async function secureFetch<T = unknown>(
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

  const shouldRetryDefault = (error: unknown): boolean => {
    if (error instanceof FetchError) {
      // Retry timeouts, 429, 5xx, and status 0 (network)
      return (
        error.status === 408 ||
        error.status === 429 ||
        error.status >= 500 ||
        error.status === 0
      )
    }
    // Some runtimes throw DOMException or TypeError for network/abort
    const errorWithName = error as { name?: string }
    return errorWithName.name === "AbortError" || error instanceof TypeError || error instanceof Error
  }

  const isRetriableError = options.shouldRetry ?? shouldRetryDefault

  const attemptFetch = async (attempt: number): Promise<T> => {
    const controller = new AbortController()
    const timeoutId = timeout
      ? setTimeout(() => controller.abort(), timeout)
      : null

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
      try {
        if (contentType?.includes("application/json")) {
          return (await response.json()) as T
        }

        if (!contentType || contentType.includes("text/")) {
          return (await response.text()) as unknown as T
        }

        return (await response.blob()) as unknown as T
      } catch (parseError) {
        throw new FetchError(
          `Failed to parse response: ${parseError instanceof Error ? parseError.message : "Unknown parsing error"}`,
          response.status,
          url,
          await response.text().catch(() => "Unable to read response text")
        )
      }
    } catch (error) {
      if (attempt < retries && isRetriableError(error)) {
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
