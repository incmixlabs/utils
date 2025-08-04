import {
  type AbilityTuple,
  type InferSubjects,
  type MongoAbility,
  subject,
} from "@casl/ability"

export const actions = ["manage", "create", "read", "update", "delete"] as const

interface Organisation {
  kind: "Organisation"
  id: string
  owner: string
}

interface Member {
  kind: "Member"
  id: string
}

interface Project {
  kind: "Project"
  id: string
}

interface Task {
  kind: "Task"
  id: string
}

interface Comment {
  kind: "Comment"
  id: string
}

interface Document {
  kind: "Document"
  id: string
}

interface Folder {
  kind: "Folder"
  id: string
}

interface File {
  kind: "File"
  id: string
}

interface ProjectMember {
  kind: "ProjectMember"
  id: string
}

interface Role {
  kind: "Role"
  id: string
}

interface Permission {
  kind: "Permission"
  id: string
}

export const subjects = [
  "all",
  "Organisation",
  "Member",
  "Project",
  "Task",
  "Comment",
  "Document",
  "Folder",
  "File",
  "ProjectMember",
  "Role",
  "Permission",
] as const

export type SubjectTuple = InferSubjects<
  | Organisation
  | Member
  | Project
  | Task
  | Comment
  | Document
  | Folder
  | File
  | ProjectMember
  | Role
  | Permission
  | "all"
>

export type Subject = (typeof subjects)[number]
export type Action = (typeof actions)[number]

export type AbilitiesTuple = AbilityTuple<Action, SubjectTuple>

// MongoAbility is not related to MongoDB,
// It's just a syntax to define permissions and conditions
export type AppAbility = MongoAbility<AbilitiesTuple>
