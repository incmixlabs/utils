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

  // @ts-ignore
  if (typeof process !== "undefined" && process?.env) {
    // @ts-ignore
    version = process.env["NODE_ENV"] as Version
  }
  // @ts-ignore
  if (typeof import.meta !== "undefined" && Object.hasOwn(import.meta, "env")) {
    version = import.meta.env["MODE"] as Version
  }

  return mergeDeep(_default, configVersions[version])
})()

export const API = {
  AUTH: "/api/auth",
  USERS: "/api/users",
  ORG: "/api/org",
  INTL: "/api/intl",
  TASKS: "/api/tasks",
  EMAIL: "/api/email",
  FILES: "/api/files",
  LOCATION: "/api/location",
  RATELIMITS: "/api/rate-limits",
  PROJECTS: "/api/projects",
  GENAI: "/api/genai",
  COMMENTS: "/api/comments",
  RXDB_SYNC: "/api/rxdb-sync",
}
