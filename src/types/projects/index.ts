import { z } from "zod"

export const checklistStatusEnum = ["todo", "in_progress", "done"] as const
export type ChecklistStatus = (typeof checklistStatusEnum)[number]

export const projectStatusEnum = [
  "todo",
  "started",
  "on_hold",
  "cancelled",
  "completed",
  "archived",
] as const
export type ProjectStatus = (typeof projectStatusEnum)[number]

export const taskStatusEnum = [
  "backlog",
  "active",
  "on_hold",
  "cancelled",
  "archived",
] as const
export type TaskStatus = (typeof taskStatusEnum)[number]

export const CommentSchema = z.object({
  id: z.string(),
  content: z.string(),
  userId: z.string(),
  createdBy: z.string(),
  updatedBy: z.string(),
  createdAt: z.date({ coerce: true }),
  updatedAt: z.date({ coerce: true }),
})

export const ProjectMemberSchema = z.object({
  id: z.string(),
  name: z.string(),
  avatar: z.string().nullish(),
  role: z.string(),
  isOwner: z.boolean(),
})

export const ChecklistSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.enum(checklistStatusEnum),
  createdBy: z.string(),
  updatedBy: z.string(),
  createdAt: z.date({ coerce: true }),
  updatedAt: z.date({ coerce: true }),
})

export const ProjectSchema = z
  .object({
    id: z.string(),
    orgId: z.string(),
    name: z.string(),
    company: z.string(),
    logo: z.string().nullish(),
    description: z.string(),
    members: z.array(ProjectMemberSchema),
    status: z.enum(projectStatusEnum),
    currentTimelineStartDate: z.date({ coerce: true }),
    currentTimelineEndDate: z.date({ coerce: true }),
    actualTimelineStartDate: z.date({ coerce: true }),
    actualTimelineEndDate: z.date({ coerce: true }),
    budgetEstimate: z.number({ coerce: true }).nonnegative(),
    budgetActual: z.number({ coerce: true }).nonnegative(),
    checklists: z.array(
      ChecklistSchema.pick({ id: true, title: true, status: true })
    ),
    comments: z.array(
      CommentSchema.pick({
        id: true,
        content: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
      })
    ),
    createdBy: z.string(),
    updatedBy: z.string(),
    createdAt: z.date({ coerce: true }),
    updatedAt: z.date({ coerce: true }),
  })
  .refine(
    (data) => data.currentTimelineEndDate >= data.currentTimelineStartDate,
    {
      message: "Current timeline end date must be after or equal to start date",
      path: ["currentTimelineEndDate"],
    }
  )
  .refine(
    (data) => data.actualTimelineEndDate >= data.actualTimelineStartDate,
    {
      message: "Actual timeline end date must be after or equal to start date",
      path: ["actualTimelineEndDate"],
    }
  )

export const TaskSchema = z
  .object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
    taskOrder: z.number().int().nonnegative(),
    figmaLink: z.string().url().nullish(),
    codeSnippets: z.array(z.string()).nullish(),
    status: z.enum(taskStatusEnum),
    checklists: z.array(
      ChecklistSchema.pick({ id: true, title: true, status: true })
    ),
    comments: z.array(
      CommentSchema.pick({
        id: true,
        content: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
      })
    ),
    parentId: z.string().nullish(),
    projectId: z.string(),
    columnId: z.string().nullish(),
    assignedTo: z.string().nullish(),
    currentTimelineStartDate: z.date({ coerce: true }),
    currentTimelineEndDate: z.date({ coerce: true }),
    actualTimelineStartDate: z.date({ coerce: true }),
    actualTimelineEndDate: z.date({ coerce: true }),
    createdAt: z.date({ coerce: true }),
    updatedAt: z.date({ coerce: true }),
    createdBy: z.string(),
    updatedBy: z.string(),
  })
  .refine(
    (data) => data.currentTimelineEndDate >= data.currentTimelineStartDate,
    {
      message: "Current timeline end date must be after or equal to start date",
      path: ["currentTimelineEndDate"],
    }
  )
  .refine(
    (data) => data.actualTimelineEndDate >= data.actualTimelineStartDate,
    {
      message: "Actual timeline end date must be after or equal to start date",
      path: ["actualTimelineEndDate"],
    }
  )

export const ColumnSchema = z.object({
  id: z.string(),
  label: z.string(),
  projectId: z.string(),
  parentId: z.string().nullish(),
  columnOrder: z.number().int().nonnegative(),
  createdBy: z.string(),
  updatedBy: z.string(),
  updatedAt: z.date({ coerce: true }),
  createdAt: z.date({ coerce: true }),
})

export type Project = z.infer<typeof ProjectSchema>

export type Comment = z.infer<typeof CommentSchema>
export type ProjectMember = z.infer<typeof ProjectMemberSchema>
export type Checklist = z.infer<typeof ChecklistSchema>
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
  project: ProjectSchema,
  columns: NestedColumnSchema.array(),
  tasks: TaskSchema.array(),
})

export type Board = z.infer<typeof BoardSchema>
