import { z } from "@hono/zod-openapi"
import { PermissionSchema } from "../abilitiy/schemas"
import type { GroupMembers } from "../groups"
import type { UserRole } from "../user"
import type { Zone } from "../zones"
export enum AccessType {
  public = "public",
  private = "private",
  private_and_public = "private_and_public",
}
export const ACCESS_TYPES = [
  AccessType.public,
  AccessType.private,
  AccessType.private_and_public,
]
export type Organization = {
  id: string
  name: string
  handle: string
  members: Member[] | GroupMembers[]
  zone?: Zone[]
  accessType?: AccessType
}
export type Member = {
  userId: string
  role: UserRole
}
export type CreateOrganizationInput = {
  name: string
  handle: string
  members: Member[] | GroupMembers[]
  zone?: Zone[]
}
export type UpdateOrganizationInput = {
  name: string
}
export type AddMemberInput = {
  userId: string
  role: UserRole
}
export type UpdateMemberRoleInput = {
  userId: string
  role: UserRole
}
export type RemoveMembersInput = {
  userIds: string[]
}

export const MemberDetailsSchema = z
  .object({
    userId: z.string(),
    name: z.string(),
    email: z.string().email(),
    profileImage: z.string().nullable(),
    avatar: z.string().nullable(),
    role: z.string(),
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
