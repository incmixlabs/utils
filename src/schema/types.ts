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

export const taskStatusSchemaLiteral = {
  title: "task status schema", // Renamed for clarity, was "columns schema"
  version: 0, // Consider incrementing version if this is a migration
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      maxLength: 100,
      type: "string",
    },
    projectId: {
      type: "string",
      maxLength: 100,
    },
    name: {
      type: "string",
      maxLength: 200,
    },
    color: {
      type: "string",
      maxLength: 50,
      default: "#6366f1",
    },
    order: {
      type: "number",
      default: 0,
      multipleOf: 1,
      minimum: 0,
      maximum: 100000,
    },
    description: {
      type: "string",
      maxLength: 500,
    },
    isDefault: {
      type: "boolean",
      default: false,
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
    "color",
    "order",
    "createdAt",
    "updatedAt",
    "createdBy",
    "updatedBy",
  ],
  indexes: ["projectId", "order"],
} as const

export const taskSchemaLiteral = {
  title: "tasks schema",
  version: 1, // Increment version due to schema changes
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      maxLength: 100,
      type: "string",
    },
    projectId: {
      type: "string",
      maxLength: 100,
    },
    taskId: {
      type: "string",
      maxLength: 100,
    },
    name: {
      type: "string",
      maxLength: 500,
    },
    columnId: {
      type: "string",
      maxLength: 100,
    },
    order: {
      type: "number",
      default: 0,
      minimum: 0,
      maximum: 1000000,
    },
    startDate: {
      type: "string",
      maxLength: 50,
    },
    endDate: {
      type: "string",
      maxLength: 50,
    },
    description: {
      type: "string",
      maxLength: 2000,
    },
    checklist: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: {
            type: "string",
            maxLength: 100,
          },
          text: {
            type: "string",
            maxLength: 500,
          },
          checked: {
            type: "boolean",
            default: false,
          },
        },
        required: ["id", "text", "checked"],
      },
      default: [],
    },
    completed: {
      type: "boolean",
      default: false,
    },
    priority: {
      type: "string",
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },
    refUrls: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: {
            type: "string",
            maxLength: 100,
          },
          url: {
            type: "string",
            maxLength: 1000,
          },
          title: {
            type: "string",
            maxLength: 255,
          },
          type: {
            type: "string",
            enum: ["figma", "task", "external"],
            // default removed to comply with RxDB requirements
          },
          taskId: {
            type: "string",
            maxLength: 100,
          },
        },
        required: ["id", "url", "type"],
      },
      default: [],
    },
    labelsTags: {
      type: "array",
      items: {
        type: "object",
        properties: {
          value: {
            type: "string",
            maxLength: 200,
          },
          label: {
            type: "string",
            maxLength: 200,
          },
          color: {
            type: "string",
            maxLength: 100,
          },
        },
        required: ["value", "label", "color"],
      },
      default: [],
    },
    attachments: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: {
            type: "string",
            maxLength: 100,
          },
          name: {
            type: "string",
            maxLength: 255,
          },
          url: {
            type: "string",
            maxLength: 1000,
          },
          size: {
            type: "string",
            maxLength: 50,
          },
          type: {
            type: "string",
            maxLength: 100,
          },
        },
        required: ["id", "name", "url", "size"],
      },
      default: [],
    },
    assignedTo: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: {
            type: "string",
            maxLength: 100,
          },
          name: {
            type: "string",
            maxLength: 200,
          },
          image: {
            // Changed from 'avatar' to 'image' for consistency
            type: "string",
            maxLength: 500,
          },
        },
        required: ["id", "name"],
      },
      default: [],
    },
    subTasks: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: {
            type: "string",
            maxLength: 100,
          },
          name: {
            type: "string",
            maxLength: 300,
          },
          completed: {
            type: "boolean",
            default: false,
          },
        },
        required: ["id", "name", "completed"],
      },
      default: [],
    },
    comments: {
      type: "array",
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
      default: [],
    },
    commentsCount: {
      type: "number",
      default: 0,
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
        id: {
          type: "string",
          maxLength: 100,
        },
        name: {
          type: "string",
          maxLength: 200,
        },
        image: {
          type: "string",
          maxLength: 500,
        },
      },
      required: ["id", "name"],
    },
    updatedBy: {
      type: "object",
      properties: {
        id: {
          type: "string",
          maxLength: 100,
        },
        name: {
          type: "string",
          maxLength: 200,
        },
        image: {
          type: "string",
          maxLength: 500,
        },
      },
      required: ["id", "name"],
    },
  },
  required: [
    "id",
    "projectId",
    "taskId",
    "name",
    "columnId",
    "order",
    "createdAt",
    "updatedAt",
    "createdBy",
    "updatedBy",
  ],
} as const

export const taskDataSchemaLiteral = {
  title: "tasks schema",
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      maxLength: 100,
      type: "string",
    },
    projectId: {
      type: "string",
      maxLength: 100,
    },
    taskId: {
      type: "string",
      maxLength: 100,
    },
    name: {
      type: "string",
      maxLength: 500,
    },
    columnId: {
      type: "string",
      maxLength: 100,
    },
    startDate: {
      type: "string",
      maxLength: 50,
    },
    endDate: {
      type: "string",
      maxLength: 50,
    },
    description: {
      type: "string",
      maxLength: 2000,
    },
    completed: {
      type: "boolean",
      default: false,
    },
    taskOrder: {
      type: "number",
      default: 0,
    },
    labelsTags: {
      type: "array",
      items: {
        type: "object",
        properties: {
          value: {
            type: "string",
            maxLength: 200,
          },
          label: {
            type: "string",
            maxLength: 200,
          },
          color: {
            type: "string",
            maxLength: 100,
          },
          checked: {
            type: "boolean",
          },
        },
        required: ["value", "label", "color", "checked"],
      },
      default: [],
    },
    attachment: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: {
            type: "string",
            maxLength: 255,
          },
          url: {
            type: "string",
            maxLength: 1000,
          },
          size: {
            type: "string",
            maxLength: 50,
          },
        },
        required: ["name", "url", "size"],
      },
      default: [],
    },
    assignedTo: {
      type: "array",
      items: {
        type: "object",
        properties: {
          value: {
            type: "string",
            maxLength: 100,
          },
          name: {
            type: "string",
            maxLength: 200,
          },
          label: {
            type: "string",
            maxLength: 200,
          },
          avatar: {
            type: "string",
            maxLength: 500,
          },
          color: {
            type: "string",
            maxLength: 100,
          },
          checked: {
            type: "boolean",
          },
        },
        required: ["value", "name", "label", "avatar", "color", "checked"],
      },
      default: [],
    },
    subTasks: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: {
            type: "string",
            maxLength: 300,
          },
          progress: {
            type: "number",
            minimum: 0,
            maximum: 100,
          },
          completed: {
            type: "boolean",
            default: false,
          },
        },
        required: ["name", "progress", "completed"],
      },
      default: [],
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
        id: {
          type: "string",
          maxLength: 100,
        },
        name: {
          type: "string",
          maxLength: 200,
        },
        image: {
          type: "string",
          maxLength: 500,
        },
      },
      required: ["id", "name", "image"],
    },
    updatedBy: {
      type: "object",
      properties: {
        id: {
          type: "string",
          maxLength: 100,
        },
        name: {
          type: "string",
          maxLength: 200,
        },
        image: {
          type: "string",
          maxLength: 500,
        },
      },
      required: ["id", "name", "image"],
    },
  },
  required: [
    "id",
    "taskId",
    "name",
    "columnId",
    "startDate",
    "endDate",
    "completed",
    "createdAt",
    "updatedAt",
    "createdBy",
    "updatedBy",
  ],
} as const

// Column Schema with required fields added
export const columnSchemaLiteral = {
  title: "columns schema",
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      maxLength: 10,
      type: "string",
    },
    label: {
      type: "string",
    },
    projectId: {
      type: "string",
    },
    columnOrder: {
      type: "integer",
    },
    createdAt: {
      type: "string",
      // format: "date-time",
    },
    updatedAt: {
      type: "string",
      // format: "date-time",
    },
    createdBy: {
      type: "string",
    },
    updatedBy: {
      type: "string",
    },
    parentId: {
      type: ["string", "null"],
    },
  },
  required: [
    "id",
    "label",
    "projectId",
    "columnOrder",
    "createdAt",
    "updatedAt",
    "createdBy",
    "updatedBy",
    "parentId",
  ],
} as const

// Define the schema for a layout item
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
    "title",
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

export type TaskDataSchema = {
  id: string
  taskId: string
  projectId: string
  name: string
  columnId: string
  order: number
  startDate?: string
  endDate?: string
  description?: string
  completed: boolean
  priority: "low" | "medium" | "high" | "urgent"

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
  }[]

  checklist?: {
    id: string
    text: string
    checked: boolean
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

  commentsCount: number

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

// Update the type to match the actual form data structure with optional fields
export type TaskStatusSchema = {
  id: string
  projectId: string
  name: string
  color: string
  order: number
  description?: string
  isDefault?: boolean
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
      | "id"
      | "taskId"
      | "projectId"
      | "createdAt"
      | "updatedAt"
      | "createdBy"
      | "updatedBy"
    >
  >

export type UpdateTaskData = Partial<
  Omit<
    TaskDataSchema,
    "id" | "taskId" | "projectId" | "createdAt" | "createdBy"
  >
>

export type CreateTaskStatusData = Pick<TaskStatusSchema, "name"> &
  Partial<Pick<TaskStatusSchema, "color" | "description">>

export type UpdateTaskStatusData = Partial<
  Pick<TaskStatusSchema, "name" | "color" | "description">
>

// UI-specific types
export type TaskPriority = TaskDataSchema["priority"]
export type TaskLabel = TaskDataSchema["labelsTags"][0]
export type TaskAttachment = TaskDataSchema["attachments"][0]
export type TaskAssignee = TaskDataSchema["assignedTo"][0]
export type TaskSubTask = TaskDataSchema["subTasks"][0]
export type TaskComment = TaskDataSchema["comments"][0]

export interface DefaultDataOptions {
  projectId?: string
  statusesOnly?: boolean
  forceStatusCreation?: boolean
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
export type TaskStatusDocType = {
  id: string
  projectId: string
  name: string
  order: number
  color: string
  createdAt: number
  createdBy: {
    id: string
    name: string
    image?: string | undefined
  }
  updatedAt: number
  updatedBy: {
    id: string
    name: string
    image?: string | undefined
  }
  description?: string | undefined
  isDefault?: boolean | undefined
}
export interface ProjectData {
  tasks: TaskDataSchema[]
  taskStatuses: TaskStatusDocType[]
  isLoading: boolean
  error: string | null
}
export interface UseProjectDataReturn extends ProjectData {
  // Task operations
  createTask: (
    columnId: string,
    taskData: Partial<TaskDataSchema>
  ) => Promise<void>
  updateTask: (
    taskId: string,
    updates: Partial<TaskDataSchema>
  ) => Promise<void>
  deleteTask: (taskId: string) => Promise<void>
  moveTask: (
    taskId: string,
    targetColumnId: string,
    targetIndex?: number
  ) => Promise<void>

  // Task status operations
  createTaskStatus: (
    name: string,
    color?: string,
    description?: string
  ) => Promise<string>
  updateTaskStatus: (
    statusId: string,
    updates: { name?: string; color?: string; description?: string }
  ) => Promise<void>
  deleteTaskStatus: (statusId: string) => Promise<void>
  reorderTaskStatuses: (statusIds: string[]) => Promise<void>

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
export interface KanbanColumn {
  id: string
  projectId: string
  name: string
  color: string
  order: number
  description?: string
  isDefault?: boolean
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
  tasks: KanbanTask[]
  // Computed properties from useKanban hook
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

  // Make priority optional
  priority?: "low" | "medium" | "high" | "urgent"
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
    columnId: string,
    taskData: Partial<TaskDataSchema>
  ) => Promise<void>
  updateTask: (
    taskId: string,
    updates: Partial<TaskDataSchema>
  ) => Promise<void>
  deleteTask: (taskId: string) => Promise<void>
  moveTask: (
    taskId: string,
    targetColumnId: string,
    targetIndex?: number
  ) => Promise<void>

  // Column operations
  createColumn: (
    name: string,
    color?: string,
    description?: string
  ) => Promise<string>
  updateColumn: (
    columnId: string,
    updates: { name?: string; color?: string; description?: string }
  ) => Promise<void>
  deleteColumn: (columnId: string) => Promise<void>
  reorderColumns: (columnIds: string[]) => Promise<void>

  // Bulk operations for future use
  bulkUpdateTasks: (
    taskIds: string[],
    updates: Partial<TaskDataSchema>
  ) => Promise<void>
  bulkMoveTasks: (taskIds: string[], targetColumnId: string) => Promise<void>
  bulkDeleteTasks: (taskIds: string[]) => Promise<void>

  // Utility - FIXED: refetch is no longer async
  refetch: () => void
  clearError: () => void

  // Statistics
  projectStats: {
    totalTasks: number
    completedTasks: number
    totalColumns: number
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
  taskStatuses: Array<{
    id: string
    name: string
    color: string
    projectId: string
    order: number
    description?: string
    isDefault?: boolean
    createdAt: number
    updatedAt: number
    createdBy: { id: string; name: string; image?: string }
    updatedBy: { id: string; name: string; image?: string }
  }>
  isLoading: boolean
  error: string | null

  // Task operations
  createTask: (taskData: Partial<TaskDataSchema>) => Promise<void>
  updateTask: (
    taskId: string,
    updates: Partial<TaskDataSchema>
  ) => Promise<void>
  deleteTask: (taskId: string) => Promise<void>
  moveTaskToStatus: (taskId: string, statusId: string) => Promise<void>

  // Status operations
  createTaskStatus: (
    name: string,
    color?: string,
    description?: string
  ) => Promise<string>
  updateTaskStatus: (
    statusId: string,
    updates: { name?: string; color?: string; description?: string }
  ) => Promise<void>
  deleteTaskStatus: (statusId: string) => Promise<void>

  // Utility
  refetch: () => void
  clearError: () => void

  // Statistics
  projectStats: {
    totalTasks: number
    completedTasks: number
    totalStatuses: number
    overdueTasks: number
    urgentTasks: number
  }
}
