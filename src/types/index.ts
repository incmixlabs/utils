import { z } from "@hono/zod-openapi"

import { config } from "../env"
import { type UserType, UserTypes } from "./user"

export enum Presence {
  online = "online",
  away = "away",
  busy = "busy",
  offline = "offline",
}
export enum StorageType {
  MEM = "memory",
  SQL = "sql",
  NONE = "none",
  Session = "session",
  Cookie = "cookie",
  Local = "local",
}
export enum RefreshType {
  none = "none",
  ws = "ws",
  periodic = "periodic",
}
export enum ErrorCode {
  OK = "200",
  BadRequest_400 = "400",
  Unauthorized_401 = "401",
  Forbidden_403 = "403",
  NotFound_404 = "404",
  InternalServerError_500 = "500",
}
export enum RequestMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}
export type BaseUrl = {
  url: string
  headers: string[]
  clientId?: string
  clientKey?: string
  variables?: string[]
}
export type FieldType =
  | typeof String
  | typeof Number
  | typeof Boolean
  | (typeof String)[]
  | (typeof Number)[]
  | (typeof Boolean)[]
export enum QueryOp {
  "=" = "=",
  ">" = ">",
  "<" = "<",
  ">=" = ">=",
  "<=" = "<=",
  "!=" = "!=",
  in = "in",
  like = "like",
  between = "between",
  "not in" = "not in",
  "not like" = "not like",
  "not between" = "not between",
}

export type Query = {
  key: string
  op: QueryOp
  value: FieldType
}
export type Pagination = {
  page: number
  pageSize: number
  lastRefresh?: number
  lastRefreshErrorCode?: ErrorCode
}
export type Meta = {
  totalPages: number
  totalItems: number
  lastRefresh?: number
  lastRefreshErrorCode?: ErrorCode
  loading?: boolean
  pages: [
    {
      page: number
      size: number
      lastRefresh?: number
      lastRefreshErrorCode?: ErrorCode
      loading?: boolean
    },
  ]
}
export type Service = {
  baseUrl: BaseUrl
  serviceUrl?: BaseUrl // service URL merges with baseURL
  queryParams?: Record<string, string>
  method?: RequestMethod
  shape?: Record<string, FieldType>
  storageType?: StorageType
  refreshType?: RefreshType
  refreshInterval?: number // if periodic in seconds
  table?: string
  mergeOnField?: string[]
  union?: boolean
  meta?: Meta
  remoteRoute?: string // if remote route, then the service is remote and the fetching is pushed to remote
}

export const AuthUserSchema = z
  .object({
    email: z.string().email().openapi({ example: "john.doe@example.com" }),
    userType: z.enum(UserTypes).default("user").openapi({ example: "user" }),
    emailVerified: z.boolean().openapi({
      example: true,
    }),
    id: z.string().openapi({
      example: "93jpbulpkkavxnz",
    }),
  })
  .openapi("User")

export const AuthUserSessionSchema = AuthUserSchema.extend({
  session: z.object({
    id: z.string(),
    expiresAt: z.string(),
    fresh: z.boolean(),
    userId: z.string(),
  }),
}).openapi("User")

export const UserProfileSchema = z
  .object({
    id: z.string().openapi({
      example: "93jpbulpkkavxnz",
    }),
    name: z.string().openapi({ example: "John Doe" }),
    email: z.string().email().openapi({ example: "john.doe@example.com" }),
    profileImage: z
      .string()
      .nullish()
      .default(null)
      .openapi({ example: "profile_image.jpg" }),
    avatar: z
      .string()
      .nullish()
      .default(null)
      .openapi({ example: "avatar.jpg" }),
    localeId: z.number({ coerce: true }).int().gt(0).openapi({ example: 1 }),
  })
  .openapi("User Profile Schema")

export type UserProfile = z.infer<typeof UserProfileSchema>
export type AuthUser = z.output<typeof AuthUserSchema>
export type AuthUserSession = z.output<typeof AuthUserSessionSchema>

export type User<TUser> = TUser & {
  email: string
  emailVerified: boolean
  slug: string
  userType: UserType
  presence?: Presence
}

export type MeUser<TUser, TSession> = User<TUser> &
  TSession & {
    sessionId: string
  }

export const passwordSchema = z.string().min(8).max(100)

export const cookieSchema = z.string()

export const entityTypeSchema = z.enum(config.entityTypes)
export const contextEntityTypeSchema = z.enum(config.contextEntityTypes)

export const idSchema = z.string()

export const slugSchema = z.string()

export const idOrSlugSchema = idSchema.or(slugSchema)

export const tokenSchema = z.object({
  token: z.string(),
})

export const errorSchema = z.object({
  message: z.string(),
  type: z.string(),
  status: z.number(),
  severity: z.string(),
  entityType: entityTypeSchema.optional(),
  logId: z.string().optional(),
  path: z.string().optional(),
  method: z.string().optional(),
  timestamp: z.string().optional(),
  usr: z.string().optional(),
  org: z.string().optional(),
})

export const failWithErrorSchema = z.object({
  success: z.boolean().default(false),
  error: errorSchema,
})

export const validSlugSchema = z
  .string()
  .min(2)
  .max(100)
  .refine(
    (s) => /^[A-Za-z0-9]+(-_[A-Za-z0-9]+)*$/i.test(s),
    "Slug may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen."
  )
  .transform((str) => str.toLowerCase().trim())

export const validDomainsSchema = z
  .array(
    z
      .string()
      .min(4)
      .max(100)
      .refine(
        (s) => /^[a-z0-9].*[a-z0-9]$/i.test(s) && s.includes("."),
        "Domain must not contain @, no special chars and at least one dot (.) in between."
      )
      .transform((str) => str.toLowerCase().trim())
  )
  .optional()

export const entityParamSchema = z.object({
  idOrSlug: idOrSlugSchema,
})

export const membershipsCountSchema = z.object({
  memberships: z.object({
    admins: z.number(),
    members: z.number(),
    total: z.number(),
  }),
})

export const srcSchema = z
  .string()
  .url()
  .refine((url) => new URL(url).search === "", "Search params not allowed")

export const nameSchema = z
  .string()
  .min(2)
  .max(100)
  .refine(
    (s) => /^[a-zA-Z0-9._-]+$/i.test(s),
    "Name may only contain letters, numbers, spaces and these characters: ,.'-"
  )

export const colorSchema = z
  .string()
  .min(3)
  .max(7)
  .regex(
    /^#(?:[0-9a-fA-F]{3}){1,2}$/,
    "Color may only contain letters, numbers & starts with #"
  )

export const validUrlSchema = z
  .string()
  .refine(
    (url: string) => url.startsWith("https"),
    "URL must start with https://"
  )

export const presignedUrlSchema = z
  .object({
    url: z.string().openapi({ example: "https://example.com" }),
  })
  .openapi("Presigned URL")

export const optionalPresignedUrlSchema = z
  .object({
    url: z.string().nullable().openapi({ example: "https://example.com" }),
  })
  .openapi("Optional Presigned URL")

export type OptionalPresignedUrl = z.infer<typeof optionalPresignedUrlSchema>

export type Entity = (typeof config.entityTypes)[number]

export type ContextEntity = (typeof config.contextEntityTypes)[number]

export type OauthProviderOptions = (typeof config.oauthProviderOptions)[number]

export type NonEmptyArray<T> = readonly [T, ...T[]]

export type ErrorResponse = z.infer<typeof failWithErrorSchema>

export type Env<TUser> = {
  Variables: {
    user: User<TUser>
    allowedIds: string[]
    disallowedIds: string[]
  }
}

export const wsMessageActions = [
  "GET_ONLINE_USERS",
  "CONNECT",
  "DISCONNECT",
] as const

export type WsMessageAction = (typeof wsMessageActions)[number]

export type WsMessage = {
  action: WsMessageAction
  data: Record<string, string | number | boolean | object>
  sessionId?: string
}

export * from "./organization"
export * from "./user"
export * from "./abilitiy"
export * from "./sql"
export * from "./task"
