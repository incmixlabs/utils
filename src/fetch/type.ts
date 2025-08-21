import type { UpdateFreq } from "../date/types"

export const localPersistTypes = {
  local: "local",
  rxdb: "rxdb",
  session: "session",
}
const localPersistType = Object.keys(localPersistTypes)
export type LocalPersistType = (typeof localPersistType)[number]

export const dataSizes = {
  large: "large",
  medium: "medium",
  small: "small",
}
const dataSize = Object.keys(dataSizes)
export type DataSize = (typeof dataSize)[number]

export const methods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
}
const method = Object.keys(methods)
export type HttpMethod = (typeof method)[number]

const persistence = {
  "local-first": "local-first",
  "local-only": "local-only",
  "remote-first": "remote-first",
  "remote-only": "remote-only",
}
export type Persistence = keyof typeof persistence
const ops = {
  create: "create",
  update: "update",
  delete: "delete",
  list: "list",
  details: "details",
}
export type Ops = (typeof ops)[keyof typeof ops]
export type OpPersistence = {
  op: Ops
  persistence: Persistence
  method?: HttpMethod
  updateFreq?: UpdateFreq
  streaming?: boolean
  dataSize?: DataSize
  localPersist?: LocalPersistType
}
export type endPointDef = {
  endpoint: string
  discoverable?: boolean
  opPersistence?: OpPersistence[]
  localPersist?: LocalPersistType
}
