import { mn } from "date-fns/locale"
import { getFirstUpperChars, hasUppercase } from "../../strings"
type MnemonicMap = Record<string, string>

export const mnemonics: MnemonicMap = {}
export const reverseMnemonics: MnemonicMap = {}
import { DEFAULT_TABLES } from "./constants"
/**
 * Creates a unique mnemonic for a table name by using initials from underscored names,
 * uppercase letters, or first characters. Ensures uniqueness by appending characters or numbers.
 * @param table_name The table name to create a mnemonic for
 */
function createUniqueMnemonic(table_name: string) {
  if (!table_name || table_name.trim().length === 0) {
    throw new Error("Table name cannot be empty")
  }

  let tbl = table_name.substring(0, 2)
  if (table_name.includes("_")) {
    const splits = table_name.split("_")
    tbl = splits
      .map((s) => s[0])
      .join("")
      .substring(0, 3)
      .toLowerCase()
  } else if (hasUppercase(table_name)) {
    tbl = getFirstUpperChars(table_name, 3).toLowerCase()
  }

  let i = 1
  let j = 1
  let mnemonic = tbl[0]

  while (true) {
    if (!reverseMnemonics[mnemonic]) {
      reverseMnemonics[mnemonic] = table_name
      mnemonics[table_name] = mnemonic
      break
    }
    if (i < tbl.length) {
      mnemonic = tbl.substring(0, i + 1)
      i++
    } else {
      mnemonic = tbl + j++
    }
  }
}
export function clearMnemonics(): void {
  Object.keys(mnemonics).forEach((key) => delete mnemonics[key])
  Object.keys(reverseMnemonics).forEach((key) => delete reverseMnemonics[key])
}

export function addMnemonic(tableName: string): void {
  if (tableName && tableName.length > 0) {
    createUniqueMnemonic(tableName)
  }
}

export function addMnemonics(
  tables: readonly string[] = DEFAULT_TABLES
): MnemonicMap {
  tables.forEach((table) => createUniqueMnemonic(table))
  return { ...mnemonics }
}

export function getMnemonic(tableName: string): string | undefined {
  return mnemonics[tableName]
}

export function getTableName(mnemonic: string): string | undefined {
  return reverseMnemonics[mnemonic]
}

export function getMnemonics(tables: readonly string[] = DEFAULT_TABLES): {
  mns: MnemonicMap
  r_mns: MnemonicMap
} {
  if (Object.keys(mnemonics).length === 0) {
    tables.forEach((table) => createUniqueMnemonic(table))
  }
  return { mns: { ...mnemonics }, r_mns: { ...reverseMnemonics } }
}

export function uuid(offset = 0): string {
  return (Date.now() + offset).toString()
}

export function getAllMnemonics() {
  return { ...mnemonics }
}

export function getAllReverseMnemonics() {
  return { ...reverseMnemonics }
}
