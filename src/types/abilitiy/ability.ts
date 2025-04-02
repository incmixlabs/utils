import type {
  AbilityTuple,
  Subject as CaslSubject,
  MongoAbility,
  MongoQuery,
  PureAbility,
} from "@casl/ability"

export const actions = ["manage", "create", "read", "update", "delete"] as const
export const subjects = [
  "all",
  "Organisation",
  "Member",
  "Role",
  "User",
  "Project",
  "Task",
  "Comment",
  "Document",
  "Folder",
  "File",
] as const

type OrganisationSubject = CaslSubject & {
  id: string
  owner: string
}

type UserSubject = CaslSubject & {
  id: string
}

type Actions = (typeof actions)[number]
type SubjectsTuple =
  | OrganisationSubject
  | UserSubject
  | (typeof subjects)[number]

export type Action = Actions
export type Subject = SubjectsTuple

export type AbilitiesTuple = AbilityTuple<Action, SubjectsTuple>
export type Abilities = PureAbility<AbilitiesTuple, MongoQuery>

// MongoAbility is not related to MongoDB,
// It's just a syntax to define permissions and conditions
export type AppAbility = MongoAbility<AbilitiesTuple>
