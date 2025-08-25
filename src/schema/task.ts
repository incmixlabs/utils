import { deepClone} from "../../objects"
import { schema, auditDef, booleanDef, dateDef, descriptionDef, checkListDef, idDef,idsDef, nameDef, urlsDef, orderDef, oneOfDef, manyOfDef, nullableIdDef, attachmentsDef, commentsDef } from "./base-types"
import type { ATTACHMENTS, SCHEMA, ID, AUDIT, CHECKLIST, DATE, MEMBER, REF_URL, MARKDOWN } from "./base-types"
export type TaskData =  AUDIT & {
  id: ID
  projectId: ID
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
  urls?: REF_URL[]
  tags?: string[]
  attachments?: ATTACHMENT[]
  assignedTo?: MEMBER[]
  watching?: MEMBER[]
  comments?: COMMENT[]
  acceptanceCriteria?: CHECKLIST[]
  checkList?: CHECKLIST[]
}
type TaskSchema = SCHEMA & {
  properties: {
    [k in keyof TaskData]-?: any  // -? makes all properties required, removing undefined
  }
  required: (keyof TaskData)[]
}
export const taskSchema: TaskSchema = {
  ...schema,
  title: "Task",
  properties: {
    id: {
      ...idDef
    },
    projectId: {...idDef},
    // name of the task or title of the task
    name: {...nameDef},
    // id of the status label : meaning to which status this task belong to like Todo, or In Progress, or Done etc.
    status: {...oneOfDef},
    // id of the priority label : meaning to which priority this task belong to like Low, or Medium, or High etc.
    priority: {...oneOfDef},
    parentTaskId: {...nullableIdDef},
    subTasks: deepClone(idsDef),
    // order of the task in the project
    order: {...orderDef},
    startDate: {...dateDef},
    endDate: {...dateDef},
    description: {...descriptionDef},
    acceptanceCriteria: deepClone({checkListDef, title: 'Acceptance Criteria'}),
    checkList: deepClone(checkListDef),
    completed: {...booleanDef},
    urls: deepClone(urlsDef),
    tags: deepClone({...manyOfDef, ref: "tags"}),
    attachments: deepClone(idsDef),
    assignedTo: deepClone(idsDef),
    watching: deepClone(idsDef),
    comments: deepClone(idsDef),
    ...auditDef.properties
  },
  required: [
    "id",
    "projectId",
    "name",
    "status",
    "priority",
    "order",
    ...auditDef.required
  ],
}
export type TaskFields = keyof typeof taskSchema.properties;
