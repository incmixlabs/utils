import { type RawRuleOf, createMongoAbility } from "@casl/ability"
import type { AppAbility, Permission } from "../types/abilitiy"

export { actions, subjects } from "../types/abilitiy"

const createAbility = (rules: RawRuleOf<AppAbility>[]) =>
  createMongoAbility<AppAbility>(rules)

export const createAbilityFromPermissions = (permissions: Permission[]) =>
  createAbility(permissions)
