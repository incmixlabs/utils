import { z } from "@hono/zod-openapi"

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
    page: z.number({ coerce: true }).default(1),
    pageSize: z.number({ coerce: true }).default(10),
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
  page: z.number().optional(),
  pageSize: z.number({ coerce: true }).optional(),
  sort: sortingItemSchema.array().optional(),
  joinOperator: z.enum(["and", "or"]).optional(),
})

export const PaginationMeta = z.object({
  total: z.number().openapi({ example: 100 }),
  page: z.number().openapi({ example: 1 }),
  pageSize: z.number().openapi({ example: 10 }),
  hasNextPage: z.boolean().openapi({ example: true }),
  hasPrevPage: z.boolean().openapi({ example: true }),
  pageCount: z.number().openapi({ example: 5 }),
})
