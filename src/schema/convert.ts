import convToBoolean from "validator/lib/toBoolean"
import convToDate from "validator/lib/toDate"
export function toBoolean(value: string, strict: boolean): boolean {
  return convToBoolean(value, strict)
}
export function toDate(value: string): Date | null {
  return convToDate(value)
}
