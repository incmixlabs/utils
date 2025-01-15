import {
  type MongoQuery,
  type RawRuleOf,
  createMongoAbility,
} from "@casl/ability"
import type { AppAbility, Permission } from "../types/abilitiy"

// MongoAbility is not related to MongoDB,
// It's just a syntax to define permissions and conditions
export const createAbility = (rules: RawRuleOf<AppAbility>[]) =>
  createMongoAbility<AppAbility>(rules)

export const createAbilityFromPermissions = (
  permissions: Permission[]
): AppAbility => {
  return createAbility(permissions)
}
