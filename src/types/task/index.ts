import { z } from "zod"
import { validatedProjectDataSchema } from "../../schema/types"
export const taskStatus = ["todo", "in_progress", "done", "backlog"] as const
export type TaskStatus = (typeof taskStatus)[number]

export const TaskSchema = z.object({
  id: z.string(),
  status: z.enum(taskStatus),
  content: z.string(),
  taskOrder: z.number().int(),
  assignedTo: z.string(),
  createdAt: z.date({ coerce: true }),
  updatedAt: z.date({ coerce: true }),
  createdBy: z.string(),
  updatedBy: z.string(),
  columnId: z.string(),
  projectId: z.string(),
})


export type Project = z.infer<typeof validatedProjectDataSchema>

export const ColumnSchema = z.object({
  id: z.string(),
  label: z.string(),
  projectId: z.string(),
  parentId: z.string().nullish(),
  columnOrder: z.number().int(),
  createdBy: z.string(),
  updatedBy: z.string(),
  updatedAt: z.date({ coerce: true }),
  createdAt: z.date({ coerce: true }),
})

export type Column = z.infer<typeof ColumnSchema>
export type Task = z.infer<typeof TaskSchema>

export const ColumnWithTaskSchema = ColumnSchema.extend({
  tasks: TaskSchema.array(),
})

export type ColumnWithTasks = z.infer<typeof ColumnWithTaskSchema>
type ColumnWithChildren = ColumnWithTasks & {
  children?: ColumnWithChildren[]
}

export const NestedColumnSchema: z.ZodType<ColumnWithChildren> =
  ColumnWithTaskSchema.extend({
    children: z.lazy(() => NestedColumnSchema.array()).optional(),
  })

export type NestedColumns = z.infer<typeof NestedColumnSchema>

export const BoardSchema = z.object({
  project: validatedProjectDataSchema,
  columns: NestedColumnSchema.array(),
  tasks: TaskSchema.array(),
})

export type Board = z.infer<typeof BoardSchema>
