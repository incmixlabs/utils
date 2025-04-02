export enum RelationType {
  parent_child = "pc",
  peer = "pr",
  child_parent = "cp",
  cloned_from = "cf",
  cloned_to = "ct",
  cloned_from_template = "cft",
  cloned_to_template = "ctt",
  linked_to = "lt",
  linked_from = "lf",
  linked_to_template = "ltt",
  linked_from_template = "lft",
  references = "r",
  referenced_by = "rb",
}
export type Api = {
  id: string
  name: string
  owner?: Owner
  url: string
  method: string
  body: string
  headers: string
  params: string
  streaming?: boolean
  frequency?: number
  transform: <T = unknown, R = unknown>(data: T) => R
} & Transaction

export type CompositeApi = {
  id: string
  name: string
  owner?: Owner
  apis: Api[]
  transform: <T = unknown, R = unknown>(data: T) => R
} & Transaction

export const RELATION_TYPES = [
  RelationType.parent_child,
  RelationType.peer,
  RelationType.child_parent,
  RelationType.cloned_from,
  RelationType.cloned_to,
  RelationType.linked_to,
  RelationType.linked_from,
  RelationType.cloned_from_template,
  RelationType.cloned_to_template,
  RelationType.linked_to_template,
  RelationType.linked_from_template,
  RelationType.references,
  RelationType.referenced_by,
]
export type CAudit = {
  created_at: number
  created_by: string
}
export enum Owner {
  org = "o",
  workspace = "w",
  project = "p",
  spreadsheet = "s",
}
export const OWNER = [
  Owner.org,
  Owner.workspace,
  Owner.project,
  Owner.spreadsheet,
]
export type Audit = CAudit & {
  updated_at?: number
  updated_by?: string
  deleted_at?: number
  deleted_by?: string
}
export type Comment = {
  id: string
  content: string
}
export type Tag = {
  id: string
  name: string
} & Audit
export type Transaction = {
  id: string
  comments?: Comment[]
  tags?: Tag[]
  owner?: Owner
} & Audit
export type Relation = Transaction & {
  UUID1: string
  UUID2: string
  relation: RelationType
}
export type LOV = {
  id: string
  name: string
  owner?: Owner
  renderer?: object
  css?: string
  allow_multiple?: boolean
  allow_null?: boolean
  allow_add_new?: boolean
} & Transaction
export type LOV_VALUES = {
  id: string
  value: string
  lov_id: string
  renderer?: object
  css?: string
} & Transaction
export type ForeignKey = {
  table_id: string
  columns: [
    {
      column_id: string
      foreign_column_id: string
    },
  ]
}
export type PrimaryKey = {
  column_id: string
}
export enum CellRender {
  text = "text",
  number = "number",
  date = "date",
  time = "time",
  datetime = "datetime",
  daterange = "daterange",
  timerange = "timerange",
  boolean = "boolean",
  checkbox = "checkbox",
  select = "select",
  multi_select = "multi_select",
  link = "link",
  image = "image",
  file = "file",
  color = "color",
  formula = "formula",
  rich_text = "rich_text",
  code = "code",
}
export enum TableView {
  table = "table",
  form = "form",
  kanban = "kanban",
  list = "list",
  calendar = "calendar",
  gantt = "gantt",
  timeline = "timeline",
  pivot = "pivot",
  chart = "chart",
  map = "map",
  report = "report",
  dashboard = "dashboard",
}
export type Table = {
  id: string
  name: string // unique within owner space
  mmn: string
  owner?: Owner
  foreign_keys?: ForeignKey[]
  primary_key?: PrimaryKey[]
  comments?: Comment[]
  views?: TableView[]
  tags?: Tag[]
  readonly?: boolean
  API?: string
} & Transaction

export enum Aggregation {
  sum = "sum",
  avg = "avg",
  min = "min",
  max = "max",
  count = "count",
  distinct = "distinct",
  custom = "custom",
}
export const AGGREGATIONS = [
  Aggregation.sum,
  Aggregation.avg,
  Aggregation.min,
  Aggregation.max,
  Aggregation.count,
  Aggregation.distinct,
  Aggregation.custom,
]
export type TableColumn = {
  id: string
  table_id: string
  lov_id: string
  pos: number
  name: string
  render: CellRender
  css: string
  dimension?: boolean
  value?: boolean
  formula?: string
  required?: boolean
  aggregation?: Aggregation[]
  is_primary_key: boolean
  is_nullable: boolean
  is_unique: boolean
  foreign_key_table_id: string
  foreign_key_column_id: string
  comments?: Comment[]
  tags?: Tag[]
} & Transaction

export type RowColumnValue = {
  row_id: string
  row_no?: number
  col_no?: number
  col_id: string
  value: string
  col_span: number[]
  row_span: number[]
} & Transaction

export type SpreadSheet = {
  id: string
  name: string
  owner?: Owner
  tables: Table[]
} & Transaction

export type SpreadColumn = {
  render: CellRender
  css: string
  invalid?: object
} & TableColumn
