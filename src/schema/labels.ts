import { deepClone } from "@objects"
import type { ID, AUDIT, SCHEMA} from "./base-types"
import { schema, auditDef, booleanDef, namesDef, orderDef, descriptionDef,  idDef, nameDef, baseTypes } from "./base-types"

export type Label = {
  name: string
  value?: string
  color?: string // if no color, then if color in header, apply or default
  order?: number
}
export type LabelData = AUDIT & {
  id: ID,
  projectId: ID,
  color?: string // if color in header, then color in children are shades
  name?: string, // example status, priority, etc.
  description: string,
  multi?: boolean
  values?: string[]
}
export type LabelsData = LabelData[]

const labelDef = {
  type: baseTypes.object,
  properties: {
    name: { ...nameDef },
    value: { ...nameDef },
    color: { ...nameDef },
    order: { ...orderDef },
    ...auditDef.properties
  },
  required: ["name", ...auditDef.required],
} as const
const labelsDef = {
  type: baseTypes.array,
  items: { ...labelDef },
} as const
export type LabelDef = typeof labelDef

type LabelSchema = SCHEMA & {
  properties: {
    [k in keyof LabelData]-?: any  // -? makes all properties required, removing undefined
  }
  required: (keyof LabelData)[]
}
// TBD  - ensure that for a given ProjectId + name
// projectID + values is unique
export const labelSchema: LabelSchema = {
  ...schema,
  title: "Label",
  properties: {
    id: {...idDef},
    projectId: {...idDef},
    // The core of the generic model: what kind of label is this?
    // like status, priority, etc.
    name: {...nameDef},
    color: {...nameDef},
    multi: {...booleanDef},
    description: {...descriptionDef},
    values: deepClone(labelsDef),
    ...auditDef.properties
  },
  required: [
    "id",
    "projectId",
    "name",
    ...auditDef.required
  ],
} as const

export const labelsSchema = {
  ...schema,
  title: "Labels",
  properties: {
    id: {...idDef},
    projectId: {...idDef},
    names: {...namesDef},
  },
  required: [
    "id",
    "projectId",
    "names"
  ],
}
