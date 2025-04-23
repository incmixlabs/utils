import { z } from "zod"
import { PermissionSchema } from "../abilitiy/schemas"
import type { GroupMembers } from "../groups"
import type { UserRole } from "../user"
import type { Zone } from "../zones"
export enum Neighborhood {
  public = "public",
  private = "private",
  semi = "semi", // for partners
}
export const NEIGHBORHOODS = [
  Neighborhood.public,
  Neighborhood.private,
  Neighborhood.semi,
]
export type Member = {
  userId: string
  role: UserRole
}
export type Workspace = {
  id: string
  organizationId: string
  name: string
  handle: string // unique within org
  members: Member[] | GroupMembers[]
  neighborhood: Neighborhood
  zone?: Zone
}
export type CreateWorkspaceInput = {
  name: string
  handle: string
  members: Member[] | GroupMembers[]
}
export type UpdateOrganizationInput = {
  name: string
  handle: string
  members: Member[] | GroupMembers[]
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
  name: z.string(),
  email: z.string().email(),
  profileImage: z.string().nullable(),
  avatar: z.string().nullable(),
  role: z.string(),
})

export const MembersResponseSchema = z.array(MemberDetailsSchema)

export type MemberDetails = z.infer<typeof MemberDetailsSchema>
export type GetMembersResponse = z.infer<typeof MembersResponseSchema>
export const PermissionsResponseSchema = z.array(PermissionSchema)

export type PermissionsResponse = z.infer<typeof PermissionsResponseSchema>
