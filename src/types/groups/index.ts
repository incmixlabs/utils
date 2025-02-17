import type { User, UserRole } from "../user"
export enum GroupParent {
  organization = "organization",
  workspace = "workspace",
}

export const GROUP_PARENTS = [GroupParent.organization, GroupParent.workspace]
export type GroupMembers = {
  userId: User[]
  role: UserRole
}
export type Group = {
  id: string
  name: string
  owner: GroupParent
  users: GroupMembers[]
  lastActiveAt: Date
}
