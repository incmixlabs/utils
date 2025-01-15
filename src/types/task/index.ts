import { z } from "@hono/zod-openapi"

export const taskStatus = ["todo", "in_progress", "done", "backlog"] as const
export type TaskStatus = (typeof taskStatus)[number]
export const TaskSchema = z
  .object({
    id: z.string().openapi({ example: "1121e21hj" }),
    status: z.enum(taskStatus).openapi({ example: "todo" }),
    content: z.string().openapi({
      example: "Task Title",
    }),
    taskOrder: z.number().int().openapi({
      example: 1,
    }),
    assignedTo: z.string().openapi({
      example: "93jpbulpkkavxnz",
    }),
    createdAt: z
      .date({ coerce: true })
      .openapi({ example: "2023-04-01T12:34:56.789Z" }),
    updatedAt: z
      .date({ coerce: true })
      .openapi({ example: "2023-04-01T12:34:56.789Z" }),
    createdBy: z.string().openapi({
      example: "93jpbulpkkavxnz",
    }),
    updatedBy: z.string().openapi({
      example: "93jpbulpkkavxnz",
    }),
    columnId: z.string().openapi({
      example: "lpkkavxnz",
    }),
    projectId: z.string().openapi({
      example: "lpkkavxnz",
    }),
  })
  .openapi("Task")

export const ProjectSchema = z
  .object({
    id: z.string().openapi({ example: "2hek2bkjh" }),
    name: z.string().openapi({ example: "Project Name" }),
    orgId: z.string().openapi({ example: "123456886" }),
    createdBy: z.string().openapi({ example: "123456886" }),
    updatedBy: z.string().openapi({ example: "123456886" }),
    updatedAt: z
      .date({ coerce: true })
      .openapi({ example: "2023-04-01T12:34:56.789Z" }),
    createdAt: z
      .date({ coerce: true })
      .openapi({ example: "2023-04-01T12:34:56.789Z" }),
  })
  .openapi("ProjectSchema")

export type Project = z.infer<typeof ProjectSchema>

export const ColumnSchema = z
  .object({
    id: z.string().openapi({ example: "2hek2bkjh" }),
    label: z.string().openapi({ example: "Project Name" }),
    projectId: z.string().openapi({ example: "123456886" }),
    parentId: z.string().nullish().openapi({ example: "123456886" }),
    columnOrder: z.number().int().openapi({
      example: 1,
    }),
    createdBy: z.string().openapi({ example: "123456886" }),
    updatedBy: z.string().openapi({ example: "123456886" }),
    updatedAt: z
      .date({ coerce: true })
      .openapi({ example: "2023-04-01T12:34:56.789Z" }),
    createdAt: z
      .date({ coerce: true })
      .openapi({ example: "2023-04-01T12:34:56.789Z" }),
  })
  .openapi("ColumnSchema")

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
    children: z
      .lazy(() => NestedColumnSchema.array())
      .optional()
      .openapi("NestedColumns", {
        type: "array",
      }),
  })

export type NestedColumns = z.infer<typeof NestedColumnSchema>

export const BoardSchema = z
  .object({
    project: ProjectSchema,
    columns: NestedColumnSchema.array(),
    tasks: TaskSchema.array(),
  })
  .openapi("BoardSchema")

export type Board = z.infer<typeof BoardSchema>
