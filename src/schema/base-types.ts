export const baseDefTypes = {
  string: "string",
  array: "array",
  number: "number",
  null: "null",
  object: "object",
  date: "date",
  boolean: "boolean",
}
export type BASEDEFTYPES = typeof baseDefTypes
export type ID = string
export type DATE = number
export type MARKDOWN = string
export type REF_URL = { id: ID; name?: string; type?: string; url?: string }
export type ATTACHMENT = REF_URL & { size?: number }
export type BASEDEFTYPE = (typeof baseDefTypes)[keyof typeof baseDefTypes]
export type MEMBER = {
  id: ID
  name?: string
  email?: string
  src?: string
  slug?: string
  color?: string
}
export const idDef = {
  type: baseDefTypes.string,
  maxLength: 50,
} as const
export type IDDef = typeof idDef
export const nameDef = {
  type: baseDefTypes.string,
  title: "Name",
  maxLength: 50,
} as const
export const emailDef = {
  type: baseDefTypes.string,
  title: "Email",
  maxLength: 100,
} as const
export const luvDef = {
  maxLength: 50,
  ref: "" as string,
  luv: true,
  enums: [] as string[],
} as const
export const oneOfDef = {
  type: baseDefTypes.string,
  ...luvDef,
} as const
export type OneOfDef = typeof oneOfDef & { ref?: string }
export function setEnums(
  def: OneOfDef | ManyOfDef,
  enums: string[]
): OneOfDef | ManyOfDef {
  return { ...def, enums: [...enums] }
}
export function setLabel(
  def: OneOfDef | ManyOfDef,
  ref: string
): OneOfDef | ManyOfDef {
  return { ...def, ref }
}
export const manyOfDef = {
  type: baseDefTypes.array,
  ...luvDef,
  items: {
    type: baseDefTypes.string,
  },
} as const
export const namesDef = {
  type: baseDefTypes.array,
  items: {
    type: baseDefTypes.string,
  },
} as const
export const numberDef = {
  type: baseDefTypes.number,
  minimum: 0,
  default: 0,
} as const
export type ManyOfDef = typeof manyOfDef
export const dateDef = {
  type: baseDefTypes.date,
} as const
export type DateDef = typeof dateDef
export const nullableIdDef = {
  ...idDef,
  type: [baseDefTypes.string, null],
} as const
export type NullableIdDef = typeof nullableIdDef
export const booleanDef = {
  type: baseDefTypes.boolean,
  default: false,
} as const
export type BooleanDef = typeof booleanDef
export const descriptionDef = {
  type: baseDefTypes.string,
  title: "Description",
  maxLength: 2000,
  default: "",
} as const
export type DescriptionDef = typeof descriptionDef
export const listDef = {
  type: baseDefTypes.array,
  title: "list",
  default: [],
} as const
export type ListDef = typeof listDef
export const orderDef = {
  type: baseDefTypes.number,
  title: "Order",
  default: 0,
  minimum: 0,
  multipleOf: 1,
  hidden: true,
} as const
export type OrderDef = typeof orderDef
export type CHECKLIST = {
  id: ID
  name: string
  checked: boolean
  order: number
}
export type SCHEMA = {
  title: string
  version: number
  primaryKey: string
  type: BASEDEFTYPE
}
export const schema: SCHEMA = {
  title: "",
  version: 0,
  primaryKey: "id",
  type: "object",
}
const checkListItemDef = {
  id: { ...idDef },
  name: { ...nameDef },
  checked: { ...booleanDef },
  order: { ...orderDef },
} as const
export const checkListDef = {
  type: baseDefTypes.array,
  title: "Checklist",
  properties: { ...checkListItemDef },
  required: Object.keys(checkListItemDef),
} as const
export type CheckListDef = typeof checkListDef
export const urlDef = {
  type: baseDefTypes.string,
  maxLength: 1000,
} as const
export const TASK_URL_ENUMS = ["Figma", "Task", "Github", "Other"] as const
export const urlItemDef = {
  id: { ...idDef },
  url: { ...urlDef },
  name: { ...nameDef },
  type: { ...oneOfDef },
} as const
export const urlsDef = {
  type: baseDefTypes.object,
  title: "Links",
  properties: { ...urlItemDef },
  required: ["id"],
} as const
export const attachmentsDef = {
  ...urlsDef,
  properties: {
    ...urlsDef.properties,
    size: { ...numberDef },
  },
}
export type AUDIT = {
  createdAt: DATE
  updatedAt: DATE
  createdBy: ID
  updatedBy: ID
}
export const auditDef = {
  type: baseDefTypes.object,
  properties: {
    createdAt: { ...dateDef },
    updatedAt: { ...dateDef },
    createdBy: { ...idDef },
    updatedBy: { ...idDef },
  },
  required: ["createdAt", "createdBy"],
} as const
export type INSERTAUDIT = {
  createdAt: DATE
  createdBy: ID
}
export const insertAuditDef = {
  type: baseDefTypes.object,
  properties: {
    createdAt: { ...dateDef },
    createdBy: { ...idDef },
  },
  required: ["createdAt", "createdBy"],
} as const
export type UrlDefs = typeof urlsDef
export const memberDef = {
  type: baseDefTypes.object,
  properties: {
    id: { ...idDef },
    name: { ...nameDef },
    src: { ...urlDef },
    email: { ...emailDef },
    slug: { ...nameDef },
  },
  required: ["id"],
} as const
export type MemberDef = typeof memberDef
export const membersDef = {
  type: baseDefTypes.array,
  title: "Members",
  items: { ...memberDef },
} as const
export type MembersDef = typeof membersDef
export const idsDef = {
  type: baseDefTypes.array,
  items: { ...idDef },
} as const
export type IdsDef = typeof idsDef

// no maxlength
export const markdownDef = {
  type: baseDefTypes.string,
}
export type MarkdownDef = typeof markdownDef
export type COMMENT = INSERTAUDIT & {
  id: ID
  content?: MARKDOWN
  author?: MEMBER
 export type COMMENT = INSERTAUDIT & {
   id: ID
   content?: MARKDOWN
   author?: MEMBER
   refs?: ID[]
 }
}
export const commentsDef = {
  ...schema,
  type: baseDefTypes.array,
  title: "Comments",
  default: [],
  items: {
    type: baseDefTypes.object,
    properties: {
      id: { ...idDef },
      content: { ...markdownDef },
      author: { ...memberDef },
      refs: { ...idsDef },
      ...insertAuditDef.properties,
    },
    required: ["id"],
  },
}
