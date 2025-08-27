import _default, { type DeepPartial } from "./default"
import development from "./development"
import production from "./production"
import tunnel from "./tunnel"

function isObject(item: object) {
  return item && typeof item === "object" && !Array.isArray(item)
}

function mergeDeep<T extends {}, U extends DeepPartial<T>>(
  target: T,
  ...sources: U[]
) {
  if (!sources.length) return target
  const source = sources.shift()

  if (isObject(target) && source && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key as keyof object])) {
        if (!target[key as keyof object]) Object.assign(target, { [key]: {} })
        mergeDeep(target[key as keyof object], source[key as keyof object])
      } else {
        Object.assign(target, { [key]: source[key as keyof object] })
      }
    }
  }
  return mergeDeep(target, ...sources)
}

const configVersions = {
  development,
  production,
  tunnel,
}

type Version = keyof typeof configVersions

export const config = (() => {
  let version: Version = "development"

  if (typeof process !== "undefined" && process?.env) {
    version = process.env["NODE_ENV"] as Version
  }
  if (typeof import.meta !== "undefined" && Object.hasOwn(import.meta, "env")) {
    version = import.meta.env["MODE"] as Version
  }
  return mergeDeep(_default, configVersions[version])
})()

export const API = {
  auth: "/api/auth",
  users: "/api/users",
  org: "/api/org",
  intl: "/api/intl",
  tasks: "/api/tasks",
  email: "/api/email",
  files: "/api/files",
  location: "/api/location",
  permissions: "/api/permissions",
  projects: "/api/projects",
  genai: "/api/genai",
  comments: "/api/comments",
  rxdb: "/api/rxdb-sync",
}
export type APIEndPoints = keyof typeof API
export default config
