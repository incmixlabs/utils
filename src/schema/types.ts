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
  version: 1,
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
      multipleOf: 1,
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
    completed: {
      type: "boolean",
      default: false,
    },
    priority: {
      type: "string",
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
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
          avatar: {
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
  indexes: ["projectId", "columnId", ["columnId", "order"]],
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
  startDate: string
  endDate: string
  description?: string
  completed: boolean
  taskOrder: number
  labelsTags: Array<{
    value: string
    label: string
    color: string
    checked: boolean
  }>
  attachment: Array<{
    name: string
    url: string
    size: string
  }>
  assignedTo: Array<{
    value: string
    name: string
    label: string
    avatar: string
    color: string
    checked: boolean
  }>
  subTasks: Array<{
    name: string
    progress: number
    completed: boolean
  }>
  createdAt: number
  updatedAt: number
  createdBy: {
    id: string
    name: string
    image: string
  }
  updatedBy: {
    id: string
    name: string
    image: string
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
