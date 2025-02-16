export enum GroupParent {
  organization = "organization",
  workspace = "workspace",
}

export const GROUP_PARENTS = [GroupParent.organization, GroupParent.workspace]

export type Group = {
  id: string
  name: string
  parent: GroupParent
  parentId: string
  members: Member[]
  lastActiveAt: Date
}
