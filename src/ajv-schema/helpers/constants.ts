import { se } from "date-fns/locale"

export const MAX_SLUG_LENGTH = 10
export const MIN_SLUG_LENGTH = 3

export const BIG_OFFSET = BigInt("1234567899123456789")
export const JOIN_CHAR = "_"

export const DEFAULT_TABLES = [
  "auth",
  "txns",
  "cells",
  "cell_defs",
  "col_defs",
  "col_defs_audit",
  "lovs",
  "lov_hs",
  "rows",
  "file_dirs",
  "audit",
  "audit_rows",
  "audit_cells",
  "tasks",
  "projects",
  "users",
  "comments",
  "orgs",
  "teams",
  "sessions",
  "workspaces",
  "checkLists",
  "attachments",
  "links",
  "active_sessions",
  "relations",
  "clients",
  "notes",
  "agreements",
] as const
// object lookup
export const defaultTables = Array.from(DEFAULT_TABLES).reduce(
  (acc, table) => {
    acc[table] = table
    return acc
  },
  {} as Record<string, string>
)
export type DefaultTable = keyof typeof defaultTables
