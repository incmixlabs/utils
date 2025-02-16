import { z } from "@hono/zod-openapi"
import { PermissionSchema } from "../abilitiy/schemas"
import type { Zone } from "../zones"

import { type MemberRole, MemberRoles } from "../organization"
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
  role: MemberRole
}

export type Workspace = {
  id: string
  organizationId: string
  name: string
  handle: string // unique within org
  members: Member[]
  neighborhood: Neighborhood
  zone?: Zone
}

export type CreateWorkspaceInput = {
  name: string
  handle: string
  members: Member[]
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
    name: z.string(),
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
