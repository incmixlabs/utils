export function validEmail(email: string): boolean {
  const re =
    /^(([^<>()[]\\.,;:\s@\"]+(\.[^<>()[]\\.,;:\s@\"]+)*)|(\".+\"))@(([[0-9]{1,3}\‌​.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}
export function validHandle(handle: string): boolean {
  const isValid = handle.length > 0 && handle.length < 20
  if (!isValid) return false
  const re = /^[a-zA-Z0-9_]+$/
  return re.test(handle)
}
export function validURL(url: string): boolean {
  const re =
    /http|https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,255}\.[a-z]{2,9}\y([-a-zA-Z0-9@:%_\+.,~#?!&>//=]*)$/
  return re.test(url)
}
export function validPassword(password: string): boolean {
  return password.length > 7
}
export function validPhone(phone: string): boolean {
  const re = /^\d{10}$/
  return re.test(phone)
}
