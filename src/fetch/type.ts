import type { UpdateFreq } from "../date/types"

export const localPersistTypes = {
  local: "local",
  rxdb: "rxdb",
  session: "session",
  cookie: "cookie",
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
export type QueueOptions = {
  enabled?: boolean
  slaSeconds?: number
}
export type ApiPagination = {
  page: number
  pageSize: number
  total: number
}
export type ApiResponse = {
  status: number
  data?: any
  error?: string
  message?: string
  pagination?: ApiPagination
}
export type HeadersMap = Record<string, string>
export type Ops = (typeof ops)[keyof typeof ops]
export type OpPersistence = {
  op: Ops
  path: string
  queue?: Queue
  persistence: Persistence
  method?: HttpMethod
  updateFreq?: UpdateFreq
  streaming?: boolean
}
export type endPointDef = {
  endpoint: string
  opPersistence?: OpPersistence[]
  localPersist?: LocalPersistType
}
export type endPointBackendDef = {
  sampleResponse?: any
  sampleRequest?: any
  requestSchema: any
  responseSchema: any
}
