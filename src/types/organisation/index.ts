import { z } from "@hono/zod-openapi"
import { PermissionSchema } from "../abilitiy/schemas"
import {
  ROLE_ADMIN,
  ROLE_COMMENTER,
  ROLE_EDITOR,
  ROLE_MEMBER,
  ROLE_OWNER,
  ROLE_SUPER_ADMIN,
  ROLE_USER,
  ROLE_VIEWER,
} from "./constants"
export * from "./constants"
export const MemberRoles = [
  ROLE_ADMIN,
  ROLE_OWNER,
  ROLE_VIEWER,
  ROLE_COMMENTER,
  ROLE_EDITOR,
] as const

export const UserTypes = [ROLE_MEMBER, ROLE_SUPER_ADMIN, ROLE_USER] as const

export type MemberRole = (typeof MemberRoles)[number]
export type UserType = (typeof UserTypes)[number]

export type Organization = {
  id: string
  name: string
  handle: string
  members: Member[]
}

export type Member = {
  userId: string
  orgId: string
  role: MemberRole
}

export type Role = {
  id: number
  name: string
}

export type CreateOrganizationInput = {
  name: string
  handle: string
  members: Omit<Member, "orgId">[]
}

export type UpdateOrganizationInput = {
  name: string
}

export type AddMemberInput = {
  userId: string
  role: MemberRole
}

export type UpdateMemberRoleInput = {
  userId: string
  role: MemberRole
}

export type RemoveMembersInput = {
  userIds: string[]
}

export const MemberDetailsSchema = z
  .object({
    userId: z.string(),
    fullName: z.string(),
    email: z.string().email(),
    profileImage: z.string().nullable(),
    avatar: z.string().nullable(),
    role: z.enum(MemberRoles),
  })
  .openapi("MemberDetails")

export const MembersResponseSchema = z
  .array(MemberDetailsSchema)
  .openapi("MembersResponse")

export type MemberDetails = z.infer<typeof MemberDetailsSchema>
export type GetMembersResponse = z.infer<typeof MembersResponseSchema>

export const PermissionsResponseSchema = z
  .array(PermissionSchema)
  .openapi("PermissionsResponse")

export type PermissionsResponse = z.infer<typeof PermissionsResponseSchema>
