import type { DateTime } from "luxon"

export type ProjectStatus = "all" | "started" | "on-hold" | "completed"
export type TimeType = "day" | "days" | "week" | "month" | "year"
import { z } from "zod"

export const VALID_STATUSES: ProjectStatus[] = [
  "all",
  "started",
  "on-hold",
  "completed",
]
export const VALID_TIME_TYPES: TimeType[] = [
  "day",
  "days",
  "week",
  "month",
  "year",
]
export const labelSchemaLiteral = {
  title: "label",
  version: 1,
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 100,
    },
    projectId: {
      type: "string",
      maxLength: 100,
    },
    // The core of the generic model: what kind of label is this?
    // like status, priority, etc.
    type: {
      type: "string",
      enum: ["status", "priority"], // Can be expanded later with "team", "sprint", etc.
      maxLength: 50,
    },
    // The name of the label or title
    name: {
      type: "string",
      maxLength: 200,
    },
    // store the theme color for that perticular lable like for done we can store green
    // for high priority we can store red
    color: {
      type: "string",
      maxLength: 50,
    },
    // order of the label
    order: {
      type: "number",
      default: 0,
      minimum: 0,
      multipleOf: 1,
    },
    description: {
      type: "string",
      maxLength: 500,
      default: "",
    },
    createdAt: {
      type: "number",
    },
    updatedAt: {
      type: "number",
    },
    createdBy: {
      type: "object",
      properties: {
        id: { type: "string", maxLength: 100 },
        name: { type: "string", maxLength: 200 },
        image: { type: "string", maxLength: 500 },
      },
      required: ["id", "name"],
    },
    updatedBy: {
      type: "object",
      properties: {
        id: { type: "string", maxLength: 100 },
        name: { type: "string", maxLength: 200 },
        image: { type: "string", maxLength: 500 },
      },
      required: ["id", "name"],
    },
  },
  required: [
    "id",
    "projectId",
    "type",
    "name",
    "order",
    "createdAt",
    "updatedAt",
    "createdBy",
    "updatedBy",
  ],
} as const

export const taskSchemaLiteral = {
  title: "task",
  version: 2,
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 100,
    },
    projectId: {
      type: "string",
      maxLength: 100,
    },
    // name of the task or title of the task
    name: {
      type: "string",
      maxLength: 500,
    },

    // id of the status label : meaning to which status this task belong to like Todo, or In Progress, or Done etc.
    statusId: {
      type: "string",
      maxLength: 100,
      ref: "label",
    },
    // id of the priority label : meaning to which priority this task belong to like Low, or Medium, or High etc.
    priorityId: {
      type: "string",
      maxLength: 100,
      ref: "label",
    },
    parentTaskId: {
      type: ["string", "null"],
      maxLength: 100,
      default: null, // null means it's a top-level task
    },
    isSubtask: {
      type: "boolean",
      default: false,
    },
    // order of the task in the project
    taskOrder: {
      type: "number",
      default: 0,
      minimum: 0,
      multipleOf: 1,
    },
    startDate: {
      type: "number",
    },
    endDate: {
      type: "number",
    },
    description: {
      type: "string",
      maxLength: 2000,
      default: "",
    },
    acceptanceCriteria: {
      type: "array",
      default: [],
      items: {
        type: "object",
        properties: {
          id: { type: "string", maxLength: 100 },
          text: { type: "string", maxLength: 500 },
          checked: { type: "boolean", default: false },
          order: { type: "number", default: 0, minimum: 0 },
        },
        required: ["id", "text", "checked", "order"],
      },
    },
    checklist: {
      type: "array",
      default: [],
      items: {
        type: "object",
        properties: {
          id: { type: "string", maxLength: 100 },
          text: { type: "string", maxLength: 500 },
          checked: { type: "boolean", default: false },
          order: { type: "number", default: 0, minimum: 0 },
        },
        required: ["id", "text", "checked", "order"],
      },
    },
    completed: {
      type: "boolean",
      default: false,
    },
    refUrls: {
      type: "array",
      default: [],
      items: {
        type: "object",
        properties: {
          id: { type: "string", maxLength: 100 },
          url: { type: "string", maxLength: 1000 },
          title: { type: "string", maxLength: 255 },
          type: { type: "string", enum: ["figma", "task", "external"] },
          taskId: { type: "string", maxLength: 100 },
        },
        required: ["id", "url", "type"],
      },
    },
    labelsTags: {
      type: "array",
      default: [],
      items: {
        type: "object",
        properties: {
          value: { type: "string", maxLength: 200 },
          label: { type: "string", maxLength: 200 },
          color: { type: "string", maxLength: 100 },
        },
        required: ["value", "label", "color"],
      },
    },
    attachments: {
      type: "array",
      default: [],
      items: {
        type: "object",
        properties: {
          id: { type: "string", maxLength: 100 },
          name: { type: "string", maxLength: 255 },
          url: { type: "string", maxLength: 1000 },
          size: { type: "string", maxLength: 50 },
          type: { type: "string", maxLength: 100 },
        },
        required: ["id", "name", "url", "size"],
      },
    },
    assignedTo: {
      type: "array",
      default: [],
      items: {
        type: "object",
        properties: {
          id: { type: "string", maxLength: 100 },
          name: { type: "string", maxLength: 200 },
          image: { type: "string", maxLength: 500 },
        },
        required: ["id", "name"],
      },
    },
    subTasks: {
      type: "array",
      default: [],
      items: {
        type: "object",
        properties: {
          id: { type: "string", maxLength: 100 },
          name: { type: "string", maxLength: 300 },
          completed: { type: "boolean", default: false },
          order: { type: "number", default: 0, minimum: 0 },
        },
        required: ["id", "name", "completed", "order"],
      },
    },
    comments: {
      type: "array",
      default: [],
      items: {
        type: "object",
        properties: {
          id: { type: "string", maxLength: 100 },
          content: { type: "string", maxLength: 2000 },
          createdAt: { type: "number" },
          createdBy: {
            type: "object",
            properties: {
              id: { type: "string", maxLength: 100 },
              name: { type: "string", maxLength: 200 },
              image: { type: "string", maxLength: 500 },
            },
            required: ["id", "name"],
          },
        },
        required: ["id", "content", "createdAt", "createdBy"],
      },
    },
    createdAt: {
      type: "number",
    },
    updatedAt: {
      type: "number",
    },
    createdBy: {
      type: "object",
      properties: {
        id: { type: "string", maxLength: 100 },
        name: { type: "string", maxLength: 200 },
        image: { type: "string", maxLength: 500 },
      },
      required: ["id", "name"],
    },
    updatedBy: {
      type: "object",
      properties: {
        id: { type: "string", maxLength: 100 },
        name: { type: "string", maxLength: 200 },
        image: { type: "string", maxLength: 500 },
      },
      required: ["id", "name"],
    },
  },
  required: [
    "id",
    "projectId",
    "name",
    "statusId",
    "priorityId",
    "taskOrder",
    "createdAt",
    "updatedAt",
    "createdBy",
    "updatedBy",
  ],
} as const

const layoutItemSchema = {
  type: "object",
  properties: {
    w: { type: "number" },
    h: { type: "number" },
    x: { type: "number" },
    y: { type: "number" },
    i: { type: "string" },
    componentName: { type: "string" },
    moved: { type: "boolean", default: false },
    static: { type: "boolean", default: false },
    layouts: {
      type: "array",
      items: {
        type: "object",
        properties: {
          w: { type: "number" },
          h: { type: "number" },
          x: { type: "number" },
          y: { type: "number" },
          i: { type: "string" },
          componentName: { type: "string" },
          moved: { type: "boolean", default: false },
          static: { type: "boolean", default: false },
        },
        required: ["w", "h", "x", "y", "i"],
      },
    },
    compactType: {
      type: ["string", "null"],
      enum: ["horizontal", "vertical", null],
    },
  },
  required: ["w", "h", "x", "y", "i"],
  additionalProperties: true,
} as const

export const dashboardTemplateSchemaLiteral = {
  title: "dashboard template schema",
  version: 0,
  description: "Schema for dashboard templates",
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 100,
    },
    isActive: {
      type: "boolean",
      default: false,
    },
    templateName: {
      type: "string",
    },
    dashboardLink: {
      type: "string",
    },
    tags: {
      type: "array",
      items: {
        type: "string",
      },
    },
    mainLayouts: {
      type: "object",
      properties: {
        lg: {
          type: "array",
          items: layoutItemSchema,
        },
        md: {
          type: "array",
          items: layoutItemSchema,
        },
        sm: {
          type: "array",
          items: layoutItemSchema,
        },
        xs: {
          type: "array",
          items: layoutItemSchema,
        },
        xxs: {
          type: "array",
          items: layoutItemSchema,
        },
      },
      required: ["lg", "md", "sm", "xs", "xxs"],
    },
    createdAt: {
      type: "number",
    },
    updatedAt: {
      type: "number",
    },
  },
  required: ["id", "templateName", "dashboardLink", "tags", "mainLayouts"],
} as const

export const dashboardSchemaLiteral = {
  title: "dashboard schema",
  version: 0,
  description: "Schema for dashboards",
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 100,
    },
    dashboardId: {
      type: "string",
      maxLength: 100,
    },
    dashboardName: {
      type: "string",
    },
    createdAt: {
      type: "string",
    },
    updatedAt: {
      type: "string",
    },
    createdBy: {
      type: "string",
    },
    updatedBy: {
      type: "string",
    },
  },
  required: ["dashboardId", "dashboardName"],
  additionalProperties: false,
} as const

export const projectSchemaLiteral = {
  title: "projects schema",
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      maxLength: 10,
      type: "string",
    },
    name: {
      type: "string",
    },
    orgId: {
      type: "string",
    },
    createdAt: {
      type: "string",
    },
    updatedAt: {
      type: "string",
    },
    createdBy: {
      type: "string",
    },
    updatedBy: {
      type: "string",
    },
  },
  required: [
    "id",
    "name",
    "orgId",
    "createdAt",
    "updatedAt",
    "createdBy",
    "updatedBy",
  ],
} as const

export const formProjectSchemaLiteral = {
  title: "form projects schema",
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      maxLength: 30,
      type: "string",
    },
    name: {
      type: "string",
    },
    company: {
      type: "string",
    },
    logo: {
      type: "string",
    },
    description: {
      type: "string",
    },
    progress: {
      type: "integer",
    },
    timeLeft: {
      type: "string",
    },
    timeType: {
      type: "string",
      enum: ["day", "days", "week", "month", "year"],
    },
    members: {
      type: "array",
      items: {
        type: "object",
        properties: {
          label: { type: "string" },
          value: { type: "string" },
        },
      },
    },
    status: {
      type: "string",
      enum: ["all", "started", "on-hold", "completed"],
    },
    startDate: {
      type: "integer", // Using integer for timestamp
    },
    endDate: {
      type: "integer", // Using integer for timestamp
    },
    budget: {
      type: "integer",
    },
    fileInfo: {
      type: "object",
      properties: {
        name: { type: "string" },
        type: { type: "string" },
        size: { type: "integer" },
        attachmentId: { type: "string" },
      },
    },
    createdAt: {
      type: "integer", // Using integer for timestamp
    },
    updatedAt: {
      type: "integer", // Using integer for timestamp
    },
  },
  required: [
    "id",
    "name",
    "company",
    "description",
    "status",
    "startDate",
    "endDate",
  ],
  attachments: {
    encrypted: false,
  },
} as const
/**
 * Validates and sanitizes project data to match the RxDB schema
 */
export interface ValidatedProjectData {
  id: string
  name: string
  company?: string
  logo?: string
  description: string
  progress?: number
  timeLeft?: string
  timeType?: TimeType
  members?: Array<{ name: string; value: string }>
  status?: ProjectStatus
  startDate?: number
  endDate?: number
  budget?: number
}
export type FileLikeObject = {
  name: string
  type: string
  size: number
  data?: string
  arrayBuffer?: ArrayBuffer
  buffer?: ArrayBuffer
}
export interface FileInput {
  data: File | Blob | ArrayBuffer | string
  name: string
  type: string
  size: number
}
// Update the type to match the actual form data structure with optional fields
export type ProjectFormData = ValidatedProjectData & {
  fileData?: FileInput // Accept various possible file input formats
}

export const projectStatusSchema = z.union([
  z.literal("all"),
  z.literal("started"),
  z.literal("on-hold"),
  z.literal("completed"),
])

export const timeTypeSchema = z.union([
  z.literal("day"),
  z.literal("days"),
  z.literal("week"),
  z.literal("month"),
  z.literal("year"),
])

export const validatedProjectDataSchema = z.object({
  id: z.string(),
  name: z.string(),
  company: z.string(),
  logo: z.string(),
  description: z.string(),
  progress: z.number(),
  timeLeft: z.string(),
  timeType: timeTypeSchema,
  members: z.array(
    z.object({
      name: z.string(),
      value: z.string(),
    })
  ),
  status: projectStatusSchema,
  startDate: z.number(),
  endDate: z.number(),
  budget: z.number(),
})

export type LabelSchema = {
  id: string
  projectId: string
  type: "status" | "priority" // New field
  name: string
  color: string
  order: number
  description?: string
  createdAt: number
  updatedAt: number
  createdBy: {
    id: string
    name: string
    image?: string
  }
  updatedBy: {
    id: string
    name: string
    image?: string
  }
}

export type TaskDataSchema = {
  id: string
  projectId: string
  name: string
  statusId: string // Changed from columnId
  priorityId: string // New field
  parentTaskId?: string | null
  isSubtask?: boolean
  taskOrder: number // Changed from order
  startDate?: number // Changed from string
  endDate?: number // Changed from string
  description?: string

  acceptanceCriteria?: {
    id: string
    text: string
    checked: boolean // Added 'checked' property
    order: number // Added 'order' property for reordering
  }[]

  completed: boolean

  // Arrays - MUTABLE for UI editing
  refUrls: {
    id: string
    url: string
    title?: string
    type: "figma" | "task" | "external"
    taskId?: string
  }[]

  labelsTags: {
    value: string
    label: string
    color: string
  }[]

  attachments: {
    id: string
    name: string
    url: string
    size: string
    type?: string
  }[]

  assignedTo: {
    id: string
    name: string
    image?: string
  }[]

  subTasks: {
    id: string
    name: string
    completed: boolean
    order: number // Added 'order' property for reordering
  }[]

  checklist?: {
    id: string
    text: string
    checked: boolean
    order: number // Added 'order' property for reordering
  }[]

  // Comments with proper structure
  comments: {
    id: string
    content: string
    createdAt: number
    createdBy: {
      id: string
      name: string
      image?: string
    }
  }[]

  // Audit fields
  createdAt: number
  updatedAt: number
  createdBy: {
    id: string
    name: string
    image?: string
  }
  updatedBy: {
    id: string
    name: string
    image?: string
  }
}

// Helper types for form data
export type CreateTaskData = Pick<TaskDataSchema, "name"> &
  Partial<
    Omit<
      TaskDataSchema,
      "id" | "projectId" | "createdAt" | "updatedAt" | "createdBy" | "updatedBy"
    >
  >

export type UpdateTaskData = Partial<
  Omit<TaskDataSchema, "id" | "projectId" | "createdAt" | "createdBy">
>

export type CreateLabelData = Pick<LabelSchema, "name" | "type"> &
  Partial<Pick<LabelSchema, "color" | "description" | "order">>

export type UpdateLabelData = Partial<
  Pick<LabelSchema, "name" | "color" | "description" | "type" | "order">
>

// UI-specific types
export type TaskLabel = TaskDataSchema["labelsTags"][0]
export type TaskAttachment = TaskDataSchema["attachments"][0]
export type TaskAssignee = TaskDataSchema["assignedTo"][0]
export type TaskSubTask = TaskDataSchema["subTasks"][0]
export type TaskComment = TaskDataSchema["comments"][0]

export interface DefaultDataOptions {
  projectId?: string
  labelsOnly?: boolean
  forceLabelCreation?: boolean
}

export const baseFieldType = {
  TEXT: "TEXT",
  INTEGER: "INTEGER",
  REAL: "REAL",
  BLOB: "BLOB",
}
export const fieldType = {
  ...baseFieldType,
  BOOLEAN: baseFieldType.INTEGER,
  DATE: baseFieldType.INTEGER,
  TIME: baseFieldType.INTEGER,
  DATETIME: baseFieldType.INTEGER,
  FUTUREDATE: baseFieldType.INTEGER,
  FUTURETIME: baseFieldType.INTEGER,
  FUTUREDATETIME: baseFieldType.INTEGER,
  PASTDATE: baseFieldType.INTEGER,
  PASTDATETIME: baseFieldType.INTEGER,
  ADULTAGE: baseFieldType.INTEGER,
  CHILDAGE: baseFieldType.INTEGER,
  JSON: baseFieldType.TEXT,
  JSONB: baseFieldType.BLOB,
  UUID: baseFieldType.TEXT,
  ARRAY: baseFieldType.TEXT,
  ENUM: baseFieldType.TEXT,
  SERIAL: baseFieldType.INTEGER,
}
export type FieldType = (typeof fieldType)[keyof typeof fieldType]
export type FieldDef = {
  key: string
  type: FieldType
  unique?: boolean
  notNull?: boolean
  check?: string
}
export type Index = {
  fields: string[]
  unique: boolean
  indexName: string
}

export const requiredColumns: Record<string, FieldType> = {
  id: fieldType.TEXT,
  // client generated - to be synced with server
  _id: fieldType.TEXT,
  _needs_sync: fieldType.BOOLEAN,
  _createdAt: fieldType.INTEGER,
  _updatedAt: fieldType.INTEGER,
  _deletedAt: fieldType.INTEGER,
  _syncedAt: fieldType.INTEGER,
}

export const requiredColumnArray: FieldDef[] = Object.keys(requiredColumns).map(
  (key) => {
    const field = {
      key,
      type: requiredColumns[key],
      unique: true,
      notNull: false,
      check: undefined,
    }
    if (key === "id" || key === "_id") {
      field.unique = true
      field.notNull = true
    }
    return { ...field }
  }
)

export type TableSchema = {
  name: string
  lov?: boolean
  large?: boolean
  gridView?: boolean
  formView?: boolean
  readonly?: boolean
  columns: FieldDef[]
  indexes: Index[]
}

export interface Project {
  id: string
  name: string
  startDate: DateTime
  endDate: DateTime
  progress: number
  color: string
  subProjects?: Project[]
}

export interface DataItem {
  name?: string
  notes?: string
  value?: string
}

export interface TreeDataItem {
  children?: TreeDataItem[]
  data?: DataItem
  expanded?: boolean
  id: string
  name: string
  type: "folder" | "file"
}

export interface ProjectData {
  tasks: TaskDataSchema[]
  labels: LabelSchema[]
  isLoading: boolean
  error: string | null
}
export interface UseProjectDataReturn extends ProjectData {
  // Task operations
  createTask: (
    statusId: string,
    taskData: Partial<TaskDataSchema>
  ) => Promise<void>
  updateTask: (
    taskId: string,
    updates: Partial<TaskDataSchema>
  ) => Promise<void>
  deleteTask: (taskId: string) => Promise<void>
  moveTask: (
    taskId: string,
    targetStatusId: string,
    targetIndex?: number
  ) => Promise<void>

  // Task status operations
  createLabel: (
    // Change from createTaskStatus
    type: "status" | "priority", // Add new parameter
    name: string,
    color?: string,
    description?: string
  ) => Promise<string>

  updateLabel: (
    // Change from updateTaskStatus
    labelId: string, // Change from statusId
    updates: { name?: string; color?: string; description?: string }
  ) => Promise<void>

  deleteLabel: (labelId: string) => Promise<void> // Change from deleteTaskStatus
  reorderLabels: (labelIds: string[]) => Promise<void> // Change from reorderTaskStatuses

  // Utility
  refetch: () => void
  clearError: () => void
}

// Define a type for user information
export interface CurrentUser {
  id: string
  name: string
  image?: string
}
export interface KanbanColumn extends Omit<LabelSchema, "type"> {
  // KanbanColumn is based on LabelSchema but only for type="status"
  tasks: KanbanTask[] // Computed properties remain the same
  completedTasksCount: number
  totalTasksCount: number
  progressPercentage: number
}

// Making most properties optional for mock data compatibility
export interface KanbanTask
  extends Partial<
    Omit<
      TaskDataSchema,
      | "attachments"
      | "labelsTags"
      | "createdBy"
      | "assignedTo"
      | "subTasks"
      | "updatedBy"
      | "completed"
      | "priority"
    >
  > {
  // Make completed optional
  completed?: boolean
  statusLabel?: string
  statusColor?: string
  priorityLabel?: string
  priorityColor?: string

  // Make attachments mutable to match the UI component expectations
  attachments?: {
    id: string
    name: string
    url: string
    size: string
    type?: string
  }[]

  // For backward compatibility with existing code using 'attachment' instead of 'attachments'
  attachment?: {
    name: string
    url?: string
    size: string
    type?: string
  }[]

  // Make labelsTags mutable
  labelsTags?: {
    value: string
    label: string
    color: string
  }[]

  // Make assignedTo mutable with optional avatar
  assignedTo?: {
    id: string
    name: string
    avatar?: string
    label?: string
    color?: string
    value?: string
    checked?: boolean
  }[]

  // Make subTasks mutable
  subTasks?: {
    id?: string
    name: string
    completed: boolean
    progress?: number
  }[]

  // Make createdBy properties compatible with the data source
  createdBy?: {
    id: string
    name: string
    image?: string // Optional to match the data source
  }

  // Make updatedBy properties compatible with the data source
  updatedBy?: {
    id: string
    name: string
    image?: string // Optional to match the data source
  }

  // Any additional UI-specific properties can be added here
}
export interface UseKanbanReturn {
  columns: KanbanColumn[]
  isLoading: boolean
  error: string | null

  // Task operations
  createTask: (
    statusId: string, // Change from columnId
    taskData: Partial<TaskDataSchema>
  ) => Promise<void>
  updateTask: (
    taskId: string,
    updates: Partial<TaskDataSchema>
  ) => Promise<void>
  deleteTask: (taskId: string) => Promise<void>
  moveTask: (
    taskId: string,
    targetStatusId: string, // Change from targetColumnId
    targetIndex?: number
  ) => Promise<void>

  // Status label operations  // Change from Column operations
  createStatusLabel: (
    // Change from createColumn
    name: string,
    color?: string,
    description?: string
  ) => Promise<string>
  updateStatusLabel: (
    // Change from updateColumn
    labelId: string, // Change from columnId
    updates: { name?: string; color?: string; description?: string }
  ) => Promise<void>
  deleteStatusLabel: (labelId: string) => Promise<void> // Change from deleteColumn
  reorderStatusLabels: (labelIds: string[]) => Promise<void> // Change from reorderColumns

  // Bulk operations
  bulkUpdateTasks: (
    taskIds: string[],
    updates: Partial<TaskDataSchema>
  ) => Promise<void>
  bulkMoveTasks: (taskIds: string[], targetStatusId: string) => Promise<void> // Change from targetColumnId
  bulkDeleteTasks: (taskIds: string[]) => Promise<void>

  // Utility
  refetch: () => void
  clearError: () => void

  // Statistics
  projectStats: {
    totalTasks: number
    completedTasks: number
    totalStatusLabels: number // Change from totalColumns
    overdueTasks: number
    urgentTasks: number
  }
}

export interface TableTask extends KanbanTask {
  // Additional computed properties for table display
  statusLabel?: string
  statusColor?: string
  assignedToNames?: string
  totalSubTasks?: number
  completedSubTasks?: number
  isOverdue?: boolean
}

export interface UseTableViewReturn {
  tasks: TableTask[]
  labels: LabelSchema[] // Change from taskStatuses - use LabelSchema directly
  isLoading: boolean
  error: string | null

  // Task operations
  createTask: (taskData: Partial<TaskDataSchema>) => Promise<void>
  updateTask: (
    taskId: string,
    updates: Partial<TaskDataSchema>
  ) => Promise<void>
  deleteTask: (taskId: string) => Promise<void>
  moveTaskToStatus: (taskId: string, statusId: string) => Promise<void> // This can stay as is

  // Label operations (change from Status operations)
  createLabel: (
    // Change from createTaskStatus
    type: "status" | "priority", // Add new parameter
    name: string,
    color?: string,
    description?: string
  ) => Promise<string>
  updateLabel: (
    // Change from updateTaskStatus
    labelId: string, // Change from statusId
    updates: { name?: string; color?: string; description?: string }
  ) => Promise<void>
  deleteLabel: (labelId: string) => Promise<void> // Change from deleteTaskStatus

  // Utility
  refetch: () => void
  clearError: () => void

  // Statistics
  projectStats: {
    totalTasks: number
    completedTasks: number
    totalLabels: number // Change from totalStatuses
    overdueTasks: number
    urgentTasks: number
  }
}

export const getCurrentUser = () => ({
  id: "user-id",
  name: "Current User",
  image: "/placeholder.svg",
})

export const DEFAULT_LABELS = [
  // Status labels
  {
    name: "To Do",
    color: "yellow",
    type: "status",
    order: 0,
    description: "Tasks that need to be started",
  },
  {
    name: "In Progress",
    color: "blue",
    type: "status",
    order: 1,
    description: "Tasks currently being worked on",
  },
  {
    name: "Done",
    color: "green",
    type: "status",
    order: 2,
    description: "Completed tasks",
  },
  // Priority labels
  {
    name: "Low",
    color: "gray",
    type: "priority",
    order: 0,
    description: "Low priority tasks",
  },
  {
    name: "Medium",
    color: "orange",
    type: "priority",
    order: 1,
    description: "Medium priority tasks",
  },
  {
    name: "High",
    color: "red",
    type: "priority",
    order: 2,
    description: "High priority tasks",
  },
]
