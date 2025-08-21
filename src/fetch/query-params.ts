export interface QueryParams {
  page?: number
  limit?: number
  select?: string
  filter?: string
  [key: string]: any // Allow for additional custom parameters
}

export const queryParamKeys = {
  page: "page",
  limit: "limit",
  select: "select",
  filter: "filter",
}
export class QueryParamManager {
  private params: URLSearchParams

  constructor(
    initialParams?:
      | string
      | URLSearchParams
      | { [key: string]: string | string[] }
  ) {
    let normalizedParams:
      | string
      | URLSearchParams
      | Record<string, string>
      | undefined = undefined
    if (
      typeof initialParams === "object" &&
      !(initialParams instanceof URLSearchParams)
    ) {
      normalizedParams = Object.entries(initialParams).reduce<
        Record<string, string>
      >((acc, [key, value]) => {
        acc[key] = Array.isArray(value) ? value.join(",") : value
        return acc
      }, {})
    } else {
      normalizedParams = initialParams
    }
    this.params = new URLSearchParams(normalizedParams)
  }

  /**
   * Parses the current URL's query string or a provided string/object into a QueryParams object.
   * @param queryInput Optional query string or object to parse. Defaults to current window.location.search.
   * @returns A QueryParams object.
   */
  static parse(
    queryInput?: string | { [key: string]: string | string[] }
  ): QueryParams {
    let normalizedInput:
      | string
      | URLSearchParams
      | Record<string, string>
      | undefined
    if (
      typeof queryInput === "object" &&
      queryInput !== null &&
      !(queryInput instanceof URLSearchParams)
    ) {
      normalizedInput = Object.entries(queryInput).reduce<
        Record<string, string>
      >((acc, [key, value]) => {
        acc[key] = Array.isArray(value) ? value.join(",") : value
        return acc
      }, {})
    } else {
      normalizedInput = queryInput || window.location.search
    }
    const urlParams = new URLSearchParams(normalizedInput)
    const parsed: QueryParams = {}

    urlParams.forEach((value, key) => {
      // Handle common parameters for type safety
      if (key === queryParamKeys.page) {
        parsed.page = Number.parseInt(value, 10)
      } else if (key === queryParamKeys.limit) {
        parsed.limit = Number.parseInt(value, 10)
      } else if (key === queryParamKeys.select) {
        parsed.select = value
      } else if (key === queryParamKeys.filter) {
        parsed.filter = value
      } else {
        parsed[key] = value
      }
    })
    return parsed
  }

  /**
   * Gets the value of a specific query parameter.
   * @param key The key of the parameter to retrieve.
   * @returns The parameter's value as a string, or null if not found.
   */
  get(key: keyof QueryParams): string | null {
    return this.params.get(key as string)
  }

  /**
   * Sets or updates a query parameter.
   * @param key The key of the parameter.
   * @param value The value to set.
   * @returns The QueryParamManager instance for chaining.
   */
  set(
    key: keyof QueryParams,
    value: string | number | undefined
  ): QueryParamManager {
    if (value !== undefined && value !== null) {
      this.params.set(key as string, String(value))
    } else {
      this.params.delete(key as string)
    }
    return this
  }

  /**
   * Returns the query string representation of the current parameters.
   * @returns The URL-encoded query string, starting with '?'.
   */
  toString(): string {
    const queryString = this.params.toString()
    return queryString ? `?${queryString}` : ""
  }

  /**
   * Returns the current parameters as a plain object.
   * @returns A plain object representing the query parameters.
   */
  toObject(): QueryParams {
    return QueryParamManager.parse(this.params.toString())
  }
}
