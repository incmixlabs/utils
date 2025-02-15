export enum RelationType   {
  parent_child = 'parent-child',
  peer = 'peer',
  child_parent = 'child-parent',
  cloned_from = 'cloned-from',
  cloned_to = 'cloned-to',
  linked_to = 'linked-to',
  linked_from = 'linked-from',
}
export const RELATION_TYPES = [
  RelationType.parent_child,
  RelationType.peer,
  RelationType.child_parent,
  RelationType.cloned_from,
  RelationType.cloned_to,
  RelationType.linked_to,
  RelationType.linked_from,
]

export type Notes = {
  id: string;
  content: string;
} & Audit
export type Tag = {
  id: string;
  name: string;
} & Audit
export type Audit  = {
  created_at: number;
  created_by: string;
  updated_at?: number;
  updated_by?: string;
  deleted_at?: number;
  deleted_by?: string;
}

export enum Owner  {
  org = 'org',
  workspace = 'workspace',
  project = 'project',
  spreadsheet = 'spreadsheet',
}

export type Transaction = {
  id: string;
  notes?: Notes[];
  tags?: Tag[];
  owner?: Owner;
} & Audit

export const OWNER = [
  Owner.org,
  Owner.workspace,
  Owner.project,
  Owner.spreadsheet,
]
export type Relation = {
  UUID1: string;
  UUID2: string;
  relation: RelationType;
  created_at: number;
}
export type LOV = {
  id: string,
  name: string,
  owner: Owner,
  renderer?: object
  css?: string
} & Audit

export type LOV_VALUES = {
  id: string,
  value: string,
  lov_id: string,
  renderer?: object
  css?: string
} & Audit
export type ForeignKey = {
  foreign_table_id: string,
  column_id: string,
  foreign_column_id: string,
}
export type Table = {
  id: string,
  name: string,
  owner: Owner,
  mmn: string,
  foreign_keys?: ForeignKey[][],
} & Audit
export enum CellRender {
  text = 'text',
  number = 'number',
  date = 'date',
  time = 'time',
  datetime = 'datetime',
  boolean = 'boolean',
  checkbox = 'checkbox',
  select = 'select',
  multi_select = 'multi_select',
  link = 'link',
  image = 'image',
  file = 'file',
  color = 'color',
  formula = 'formula',
  rich_text = 'rich_text',
  code = 'code',
}
export type TableColumn = {
  id: string,
  table_id: string,
  pos: number,
  name: string,
  type: string,
  render: CellRender,
  invalid?: object,
  css: string,
  is_primary_key: boolean,
  is_nullable: boolean,
  is_unique: boolean,
  foreign_key_table_id: string,
  foreign_key_column_id: string,
} & Audit

export type RowColumnValue = {
  row_id: string,
  row_no?: number,
  col_no?: number,
  col_id: string,
  value: string,
} & Audit
export type SpreadSheet = {
  
} & Table
export type SpreadCellValue = {
  render: CellRender,
  css: string,
  invalid?: string,
} & RowColumnValue
