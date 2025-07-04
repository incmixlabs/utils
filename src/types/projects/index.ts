import { z } from "zod"

export const checklistStatusEnum = ["todo", "in_progress", "done"] as const
export type ChecklistStatus = (typeof checklistStatusEnum)[number]

export const projectStatusEnum = [
  "all",
  "started",
  "on-hold",
  "completed",
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

export const labelTypeEnum = ["status", "priority"] as const
export type LabelType = (typeof labelTypeEnum)[number]

export const timeTypeEnum = ["day", "days", "week", "month", "year"] as const
export type TimeType = (typeof timeTypeEnum)[number]

// User object schema for createdBy/updatedBy fields
export const UserSchema = z.object({
  id: z.string().max(100),
  name: z.string().max(200),
  image: z.string().max(500).optional(),
})

// Comment schema matching the task schema structure
export const CommentSchema = z.object({
  id: z.string().max(100),
  content: z.string().max(2000),
  createdAt: z.number(),
  createdBy: UserSchema,
})

// Label schema matching labelSchemaLiteral
export const LabelSchema = z.object({
  id: z.string().max(100),
  projectId: z.string().max(100),
  type: z.enum(labelTypeEnum),
  name: z.string().max(200),
  color: z.string().max(50),
  order: z.number().int().min(0).default(0),
  description: z.string().max(500).default(""),
  createdAt: z.number(),
  updatedAt: z.number(),
  createdBy: UserSchema,
  updatedBy: UserSchema,
})

// Project member schema
export const ProjectMemberSchema = z.object({
  id: z.string(),
  name: z.string(),
  avatar: z.string().nullish(),
  role: z.string(),
  isOwner: z.boolean(),
})

// Checklist item schema
export const ChecklistItemSchema = z.object({
  id: z.string().max(100),
  text: z.string().max(500),
  checked: z.boolean().default(false),
  order: z.number().int().min(0).default(0),
})

// Reference URL schema
export const RefUrlSchema = z.object({
  id: z.string().max(100),
  url: z.string().max(1000),
  title: z.string().max(255).optional(),
  type: z.enum(["figma", "task", "external"]),
  taskId: z.string().max(100).optional(),
})

// Label tag schema
export const LabelTagSchema = z.object({
  value: z.string().max(200),
  label: z.string().max(200),
  color: z.string().max(100),
})

// Attachment schema
export const AttachmentSchema = z.object({
  id: z.string().max(100),
  name: z.string().max(255),
  url: z.string().max(1000),
  size: z.string().max(50),
  type: z.string().max(100).optional(),
})

// Sub-task schema
export const SubTaskSchema = z.object({
  id: z.string().max(100),
  name: z.string().max(300),
  completed: z.boolean().default(false),
  order: z.number().int().min(0).default(0),
})

// Project schema matching projectSchemaLiteral
export const ProjectSchema = z.object({
  id: z.string().max(10),
  name: z.string(),
  orgId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  createdBy: z.string(),
  updatedBy: z.string(),
})

// Form project schema matching formProjectSchemaLiteral
export const FormProjectSchema = z.object({
  id: z.string().max(30),
  title: z.string(), // Changed from name to title to match JSON schema
  company: z.string(),
  logo: z.string(),
  description: z.string(),
  progress: z.number().int(),
  timeLeft: z.string(),
  timeType: z.enum(timeTypeEnum),
  members: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    })
  ),
  status: z.enum(projectStatusEnum),
  startDate: z.number(),
  endDate: z.number(),
  budget: z.number().int(),
  fileInfo: z
    .object({
      name: z.string(),
      type: z.string(),
      size: z.number().int(),
      attachmentId: z.string(),
    })
    .optional(),
  createdAt: z.number(),
  updatedAt: z.number(),
})

// Task schema matching taskSchemaLiteral
export const TaskSchema = z.object({
  id: z.string().max(100),
  projectId: z.string().max(100),
  name: z.string().max(500),
  statusId: z.string().max(100),
  priorityId: z.string().max(100),
  taskOrder: z.number().int().min(0).default(0),
  startDate: z.number().optional(),
  endDate: z.number().optional(),
  description: z.string().max(2000).default(""),
  acceptanceCriteria: z.array(ChecklistItemSchema).default([]),
  checklist: z.array(ChecklistItemSchema).default([]),
  completed: z.boolean().default(false),
  refUrls: z.array(RefUrlSchema).default([]),
  labelsTags: z.array(LabelTagSchema).default([]),
  attachments: z.array(AttachmentSchema).default([]),
  assignedTo: z.array(UserSchema).default([]),
  subTasks: z.array(SubTaskSchema).default([]),
  comments: z.array(CommentSchema).default([]),
  createdAt: z.number(),
  updatedAt: z.number(),
  createdBy: UserSchema,
  updatedBy: UserSchema,
})

// Legacy schemas for backward compatibility
export const ChecklistSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.enum(checklistStatusEnum),
  createdBy: z.string(),
  updatedBy: z.string(),
  createdAt: z.date({ coerce: true }),
  updatedAt: z.date({ coerce: true }),
})

export type Project = z.infer<typeof ProjectSchema>
export type FormProject = z.infer<typeof FormProjectSchema>
export type Comment = z.infer<typeof CommentSchema>
export type ProjectMember = z.infer<typeof ProjectMemberSchema>
export type Checklist = z.infer<typeof ChecklistSchema>
export type ChecklistItem = z.infer<typeof ChecklistItemSchema>
export type Task = z.infer<typeof TaskSchema>
export type Label = z.infer<typeof LabelSchema>
export type User = z.infer<typeof UserSchema>
export type RefUrl = z.infer<typeof RefUrlSchema>
export type LabelTag = z.infer<typeof LabelTagSchema>
export type Attachment = z.infer<typeof AttachmentSchema>
export type SubTask = z.infer<typeof SubTaskSchema>

export const ColumnWithTaskSchema = LabelSchema.extend({
  tasks: TaskSchema.array(),
})

export type ColumnWithTasks = z.infer<typeof ColumnWithTaskSchema>
type ColumnWithChildren = ColumnWithTasks & {
  children?: ColumnWithChildren[]
}

export const NestedColumnSchema = ColumnWithTaskSchema.extend({
  children: z.lazy(() => NestedColumnSchema.array()).optional(),
}) as z.ZodType<ColumnWithChildren>

export type NestedColumns = z.infer<typeof NestedColumnSchema>

export const BoardSchema = z.object({
  project: ProjectSchema,
  columns: NestedColumnSchema.array(),
  tasks: TaskSchema.array(),
})

export type Board = z.infer<typeof BoardSchema>
