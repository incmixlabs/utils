import { deepClone } from "../objects"
import {
  attachmentsDef,
  auditDef,
  booleanDef,
  checkListDef,
  commentsDef,
  dateDef,
  descriptionDef,
  idDef,
  idsDef,
  manyOfDef,
  nameDef,
  nullableIdDef,
  oneOfDef,
  orderDef,
  schema,
  urlsDef,
} from "./base-types"
import type {
  ATTACHMENT,
  AUDIT,
  CHECKLIST,
  COMMENT,
  DATE,
  ID,
  MARKDOWN,
  MEMBER,
  REF_URL,
  SCHEMA,
  TAG,
} from "./base-types"
import type { Assert, IsEqual } from "./types"
export type TaskData = AUDIT & {
  id: ID
  projectId?: ID
  name: string
  description?: MARKDOWN
  status: string
  priority: string
  order: number
  startDate?: DATE
  endDate?: DATE
  parentTaskId?: ID
  subTasks?: ID[]
  completed?: boolean
  links?: REF_URL[]
  tags?: TAG[]
  attachments?: ATTACHMENT[]
  assignedTo?: MEMBER[]
  watching?: MEMBER[]
  comments?: COMMENT[]
  acceptanceCriteria?: CHECKLIST[]
  checkList?: CHECKLIST[]
}
type TaskSchema = SCHEMA & {
  properties: {
    [k in keyof TaskData]-?: any // -? makes all properties required, removing undefined
  }
  required: (keyof TaskData)[]
}
export const taskSchema: TaskSchema = {
  ...schema,
  title: "Task",
  properties: {
    id: {
      ...idDef,
    },
    projectId: { ...idDef },
    // name of the task or title of the task
    name: { ...nameDef },
    // id of the status label : meaning to which status this task belong to like Todo, or In Progress, or Done etc.
    status: { ...oneOfDef },
    // id of the priority label : meaning to which priority this task belong to like Low, or Medium, or High etc.
    priority: { ...oneOfDef },
    parentTaskId: { ...nullableIdDef },
    subTasks: deepClone(idsDef),
    // order of the task in the project
    order: { ...orderDef },
    startDate: { ...dateDef },
    endDate: { ...dateDef },
    description: { ...descriptionDef },
    acceptanceCriteria: {
      ...deepClone(checkListDef),
      title: "Acceptance Criteria",
    },
    checkList: deepClone(checkListDef),
    completed: { ...booleanDef },
    links: deepClone(urlsDef),
    tags: deepClone({ ...manyOfDef, ref: "tags" }),
    attachments: deepClone(attachmentsDef),
    assignedTo: deepClone(idsDef),
    watching: deepClone(idsDef),
    comments: deepClone(commentsDef),
    ...auditDef.properties,
  },
  required: [
    "id",
    "name",
    "status",
    "priority",
    "order",
    ...auditDef.required,
  ],
}
export type TaskFields = keyof typeof taskSchema.properties
export type TaskDataKeys = keyof TaskData
export type _TaskKeysEqual = Assert<IsEqual<TaskFields, TaskDataKeys>>
