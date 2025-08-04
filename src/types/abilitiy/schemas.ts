import type { MongoQuery } from "@casl/ability"
import { z } from "zod"
import { actions, subjects } from "./ability"

const ActionSchema = z.enum(actions)
const SubjectSchema = z.enum(subjects)

export const DbPermissionSchema = z.object({
  id: z.number(),
  role_id: z.number(),
  action: ActionSchema,
  subject: SubjectSchema,
  conditions: z.custom<MongoQuery>().nullish(),
  name: z.string(),
  description: z.string().nullish(),
})

export type DbPermission = z.infer<typeof DbPermissionSchema>

export const PermissionSchema = z.object({
  action: ActionSchema,
  subject: SubjectSchema,
  conditions: z.custom<MongoQuery>().optional(),
})

export type Permission = z.infer<typeof PermissionSchema>
