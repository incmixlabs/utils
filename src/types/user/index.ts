import { z } from "@hono/zod-openapi"
import { PaginationMeta } from "@data-table"
import { UserProfileSchema } from ".."

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
