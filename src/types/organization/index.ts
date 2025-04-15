import { z } from "zod"
import { PermissionSchema } from "../abilitiy/schemas"
import type { GroupMembers } from "../groups"
import { USER_ROLES, type UserRole, UserRoles } from "../user"
import type { Zone } from "../zones"
export enum AccessType {
  public = "pb",
  private = "pr",
  private_and_public = "pr_pb",
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

export const MemberDetailsSchema = z.object({
  userId: z.string(),
  fullName: z.string(),
  email: z.string().email(),
  profileImage: z.string().nullable(),
  avatar: z.string().nullable(),
  role: z
    .enum([
      UserRoles.ROLE_ADMIN,
      UserRoles.ROLE_OWNER,
      UserRoles.ROLE_VIEWER,
      UserRoles.ROLE_EDITOR,
      UserRoles.ROLE_COMMENTER,
    ])
    .default(UserRoles.ROLE_OWNER),
})

export const MembersResponseSchema = z.array(MemberDetailsSchema)

export type MemberDetails = z.infer<typeof MemberDetailsSchema>
export type GetMembersResponse = z.infer<typeof MembersResponseSchema>

export const PermissionsResponseSchema = z.array(PermissionSchema)

export type PermissionsResponse = z.infer<typeof PermissionsResponseSchema>
