import { z } from "zod"

export const operators = [
  "iLike",
  "notILike",
  "eq",
  "ne",
  "isEmpty",
  "isNotEmpty",
  "lt",
  "lte",
  "gt",
  "gte",
  "isBetween",
  "isRelativeToToday",
  "and",
  "or",
] as const

export const joinOperators = [
  { label: "And", value: "and" as const },
  { label: "Or", value: "or" as const },
]

export const columnTypes = [
  "text",
  "number",
  "date",
  "boolean",
  "select",
  "multi-select",
] as const
export const allowedParams = [
  "filters",
  "joinOperator",
  "sort",
  "page",
  "pageSize",
] as const

export const operatorMap: Record<Op, string> = {
  eq: "=",
  ne: "!=",
  gt: ">",
  lt: "<",
  lte: "<=",
  gte: ">=",
  iLike: "ilike",
  notILike: "",
  isEmpty: "",
  isNotEmpty: "",
  isBetween: "",
  isRelativeToToday: "",
  and: "",
  or: "",
}

export const sortingItemSchema = z.object({
  id: z.string(),
  desc: z.boolean(),
})

export const filterSchema = z.object({
  id: z.string(),
  value: z.union([z.string(), z.array(z.string())]),
  type: z.enum(columnTypes),
  operator: z.enum(operators),
  rowId: z.string(),
})

export const kyselyQuerySchema = z.object({
  sort: sortingItemSchema.array().default([]),
  filters: filterSchema.array().default([]),
  joinOperator: z.enum(["and", "or"]).default("and"),
  pagination: z.object({
    page: z.coerce.number().default(1),
    pageSize: z.coerce.number().default(10),
  }),
})

export type AllowedParamKey = (typeof allowedParams)[number]
export type ColumnType = (typeof columnTypes)[number]
export type Op = (typeof operators)[number]
export type JoinOperator = (typeof joinOperators)[number]["value"]
export type Filter<Column extends string> = Omit<
  z.infer<typeof filterSchema>,
  "id"
> & { id: Column }
export type SortOrder = "asc" | "desc"
export type Sort<Column extends string> = Omit<
  z.infer<typeof sortingItemSchema>,
  "id"
> & {
  id: Column
}

export type KyselyQuery<Column extends string> = Omit<
  z.infer<typeof kyselyQuerySchema>,
  "sort" | "filters"
> & {
  sort: Sort<Column>[]
  filters: Filter<Column>[]
}

export const searchParamsSchema = z.object({
  filters: filterSchema.array().optional(),
  page: z.coerce.number().optional(),
  pageSize: z.coerce.number().optional(),
  sort: sortingItemSchema.array().optional(),
  joinOperator: z.enum(["and", "or"]).optional(),
})

export const PaginationMeta = z.object({
  total: z.number(),
  page: z.number(),
  pageSize: z.number(),
  hasNextPage: z.boolean(),
  hasPrevPage: z.boolean(),
  pageCount: z.number(),
})
