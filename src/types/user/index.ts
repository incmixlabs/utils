import { PaginationMeta } from "@data-table"
import { z } from "@hono/zod-openapi"
import { UserProfileSchema } from ".."

export enum UserRoles {
  ROLE_ADMIN = "admin",
  ROLE_OWNER = "owner",
  ROLE_VIEWER = "viewer",
  ROLE_EDITOR = "editor",
  ROLE_COMMENTER = "commenter",
  ROLE_SUPER_ADMIN = "super_admin",
  ROLE_MEMBER = "member",
  ROLE_USER = "user",
  ROLE_GUEST = "guest",
  ROLE_ANONYMOUS = "anonymous",
}
export const USER_ROLES = [
  UserRoles.ROLE_ADMIN,
  UserRoles.ROLE_OWNER,
  UserRoles.ROLE_VIEWER,
  UserRoles.ROLE_EDITOR,
  UserRoles.ROLE_COMMENTER,
  UserRoles.ROLE_SUPER_ADMIN,
  UserRoles.ROLE_MEMBER,
  UserRoles.ROLE_USER,
  UserRoles.ROLE_GUEST,
  UserRoles.ROLE_ANONYMOUS,
]

export type User = {
  userId: string
  orgId: string[]
}
export const UserTypes = [UserRoles.ROLE_MEMBER, UserRoles.ROLE_SUPER_ADMIN, UserRoles.ROLE_USER] as const
export type UserType = typeof UserTypes[number]
export type UserRole = typeof USER_ROLES[number]
export const UserSchema = z.object({
  id: z.string().openapi({ example: "93jpbulpkkavxnz" }),
  oauth: z.string().nullable().openapi({ example: "google" }),
  verified: z.boolean().openapi({ example: true }),
  enabled: z.boolean().nullable().default(true).openapi({ example: true }),
})

export const PaginatedUserSchema = z.object({
  results: UserSchema.array(),
  metadata: PaginationMeta,
})

export type PaginatedUser = z.infer<typeof PaginatedUserSchema>

export const UserAndProfileSchema = UserSchema.and(UserProfileSchema)
export type UserAndProfile = z.infer<typeof UserAndProfileSchema>

export const UserProfilePaginatedSchema = z
  .object({
    results: UserAndProfileSchema.array(),
    metadata: PaginationMeta,
  })
  .openapi("UserProfilePaginatedSchema")

export type UserProfilePaginated = z.infer<typeof UserProfilePaginatedSchema>
