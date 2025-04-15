import { z } from "zod"

export const DdlSchema = z.object({
  name: z.string(),
  sql: z.string(),
})
export const DdlVersionSchema = z.object({
  version: z.number(),
  updated_at: z.string(),
})

export type DdlSchema = z.infer<typeof DdlSchema>

export type DdlVersion = z.infer<typeof DdlVersionSchema>
