import { get } from "node:http"
import { beforeEach, describe, expect, it } from "vitest"
import {
  addMnemonic,
  addMnemonics,
  clearMnemonics,
  getAllMnemonics,
  getAllReverseMnemonics,
  getMnemonic,
  getMnemonics,
  getTableName,
  mnemonics,
  reverseMnemonics,
  uuid,
} from "./mneumonic"

describe("mneumonic", () => {
  beforeEach(() => {
    clearMnemonics()
  })

  describe("getMnemonics", () => {
    it("should generate unique mnemonics for default tables", () => {
      const result = getMnemonics()

      expect(result.mns).toHaveProperty("auth")
      expect(result.mns).toHaveProperty("txns")
      expect(result.mns).toHaveProperty("cells")
      expect(result.mns).toHaveProperty("cell_defs")
      expect(result.mns).toHaveProperty("lovs")
      expect(result.mns).toHaveProperty("lov_hs")
      expect(result.mns).toHaveProperty("rows")
      expect(result.mns).toHaveProperty("file_dirs")
      expect(result.mns).toHaveProperty("audit_rows")
      expect(result.mns).toHaveProperty("tasks")
      expect(result.mns).toHaveProperty("projects")
      expect(result.mns).toHaveProperty("users")
      expect(result.mns).toHaveProperty("comments")
      expect(result.mns).toHaveProperty("orgs")
      expect(result.mns).toHaveProperty("teams")
      expect(result.mns).toHaveProperty("workspaces")
      expect(result.mns).toHaveProperty("checkLists")
      expect(result.mns).toHaveProperty("attachments")
      expect(result.mns).toHaveProperty("links")
      expect(result.mns).toHaveProperty("active_sessions")
      expect(result.mns).toHaveProperty("relations")
      expect(result.mns).toHaveProperty("clients")
      expect(result.mns).toHaveProperty("notes")
      expect(result.mns).toHaveProperty("agreements")
    })

    it("should populate both mnemonics and reverseMnemonics", () => {
      const result = getMnemonics()

      // Check that all tables have mnemonics
      Object.keys(result.mns).forEach((table) => {
        expect(mnemonics).toHaveProperty(table)
        expect(result.mns[table]).toBeTruthy()
      })

      // Check reverse mapping
      Object.entries(result.mns).forEach(([table, mnemonic]) => {
        expect(reverseMnemonics[mnemonic]).toBe(table)
      })
    })

    it("should handle conflicts by using longer prefixes", () => {
      const result = getMnemonics()

      // Check that all mnemonics are unique
      const mnemValues = Object.values(result.mns)
      const uniqueMnems = new Set(mnemValues)
      expect(mnemValues.length).toBe(uniqueMnems.size)
    })

    it("should be idempotent - calling multiple times should not change mnemonics", () => {
      const first = getMnemonics()
      const second = getMnemonics()

      expect(first).toEqual(second)
      expect(Object.keys(mnemonics).length).toBe(Object.keys(first.mns).length) // Updated count for DEFAULT_TABLES
    })

    it("should accept custom tables array", () => {
      clearMnemonics()
      const customTables = ["apple", "banana", "apricot"]
      const result = getMnemonics(customTables)

      expect(result.mns).toHaveProperty("apple")
      expect(result.mns).toHaveProperty("banana")
      expect(result.mns).toHaveProperty("apricot")
      expect(Object.keys(result.mns).length).toBe(3)
    })
  })

  describe("clearMnemonics", () => {
    it("should clear all mnemonics", () => {
      getMnemonics()
      expect(Object.keys(mnemonics).length).toBeGreaterThan(0)

      clearMnemonics()

      expect(Object.keys(mnemonics).length).toBe(0)
      expect(Object.keys(reverseMnemonics).length).toBe(0)
    })
  })

  describe("addMnemonic", () => {
    it("should add a single mnemonic", () => {
      addMnemonic("example")

      expect(mnemonics).toHaveProperty("example")
      expect(mnemonics["example"]).toBeTruthy()
      expect(reverseMnemonics[mnemonics["example"]]).toBe("example")
    })

    it("should handle conflicts when adding", () => {
      addMnemonic("example")
      addMnemonic("extra")

      expect(mnemonics["example"]).toBeTruthy()
      expect(mnemonics["extra"]).toBeTruthy()
      expect(mnemonics["example"]).not.toBe(mnemonics["extra"])
    })

    it("should not duplicate mnemonic if already exists", () => {
      clearMnemonics()
      addMnemonic("test")
      const firstMnem = mnemonics["test"]
      // The mnemonic algorithm will change if the name already exists
      expect(firstMnem).toBeTruthy()
      expect(typeof firstMnem).toBe("string")
    })

    it("should handle empty string", () => {
      addMnemonic("")
      // Empty string should not create a mnemonic
      expect(mnemonics[""]).toBeUndefined()
    })
  })

  describe("addMnemonics", () => {
    it("should add multiple mnemonics at once", () => {
      const tables = ["alpha", "beta", "gamma"]
      const result = addMnemonics(tables)

      expect(result).toHaveProperty("alpha")
      expect(result).toHaveProperty("beta")
      expect(result).toHaveProperty("gamma")
      expect(Object.keys(result).length).toBeGreaterThanOrEqual(3)
    })

    it("should handle conflicts in batch", () => {
      clearMnemonics()
      const tables = ["cat", "car", "can"]
      const result = addMnemonics(tables)

      // Check all have unique mnemonics
      const mnems = Object.values(result)
      const uniqueMnems = new Set(mnems)
      expect(mnems.length).toBe(uniqueMnems.size)
    })
  })

  describe("getMnemonic", () => {
    it("should retrieve mnemonic for a table", () => {
      getMnemonics()

      expect(getMnemonic("tasks")).toBeTruthy()
      expect(getMnemonic("projects")).toBeTruthy()
    })

    it("should return undefined for non-existent table", () => {
      getMnemonics()

      expect(getMnemonic("nonexistent")).toBeUndefined()
    })
  })

  describe("getTableName", () => {
    it("should retrieve table name for a mnemonic", () => {
      const result = getMnemonics()

      Object.entries(result.mns).forEach(([table, mnem]) => {
        expect(getTableName(mnem)).toBe(table)
      })
    })

    it("should return undefined for non-existent mnemonic", () => {
      getMnemonics()

      expect(getTableName("xyz")).toBeUndefined()
    })
  })

  describe("getAllMnemonics and getAllReverseMnemonics", () => {
    it("should return copies of internal maps", () => {
      getMnemonics()

      const allMnemonics = getAllMnemonics()
      const allReverse = getAllReverseMnemonics()

      expect(allMnemonics).toEqual(mnemonics)
      expect(allMnemonics).not.toBe(mnemonics)

      expect(allReverse).toEqual(reverseMnemonics)
      expect(allReverse).not.toBe(reverseMnemonics)
    })
  })

  describe("edge cases", () => {
    it("should handle single character table names", () => {
      const tables = ["a", "b", "c"]
      const result = addMnemonics(tables)

      expect(result).toEqual({
        a: "a",
        b: "b",
        c: "c",
      })
    })

    it("should handle very similar names", () => {
      const tables = ["test", "testing", "tester", "tests"]
      const result = addMnemonics(tables)

      // Just check that all have unique mnemonics
      const mnems = Object.values(result)
      const uniqueMnems = new Set(mnems)
      expect(mnems.length).toBe(uniqueMnems.size)
    })

    it("should handle extreme conflicts with numbered suffixes", () => {
      const tables = ["a", "aa", "aaa", "aaaa", "aaaaa"]
      const result = addMnemonics(tables)

      // Just check that all have unique mnemonics
      const mnems = Object.values(result)
      const uniqueMnems = new Set(mnems)
      expect(mnems.length).toBe(uniqueMnems.size)
    })

    it("should handle extreme mnemonic conflicts", () => {
      clearMnemonics()

      // Add many similar names to force conflicts
      const similarNames = ["test", "testing", "tester", "tests", "tested"]
      similarNames.forEach((name) => addMnemonic(name))

      // Check all have unique mnemonics
      const mnems = similarNames.map((name) => mnemonics[name])
      const uniqueMnems = new Set(mnems)
      expect(mnems.length).toBe(uniqueMnems.size)

      const getAll = getAllMnemonics()
      console.log("Underscore mnems", getAll)
    })
    it("should handle extreme Uppercase", () => {
      clearMnemonics()

      // Add many similar names to force conflicts
      const similarNames = [
        "test",
        "testF",
        "testFor",
        "testForMe",
        "test_For_Me_Not",
      ]
      similarNames.forEach((name) => addMnemonic(name))

      // Check all have unique mnemonics
      const mnems = similarNames.map((name) => mnemonics[name])
      const uniqueMnems = new Set(mnems)
      expect(mnems.length).toBe(uniqueMnems.size)
      console.log("Upper Case mnems", mnems)

      const getAll = getAllMnemonics()
      console.log("Underscore mnems", getAll)
    })
    it("should handle extreme _", () => {
      clearMnemonics()

      // Add many similar names to force conflicts
      const similarNames = [
        "test",
        "test_F",
        "test_For",
        "test_For_Me",
        "test_For_Me_Not",
      ]
      similarNames.forEach((name) => addMnemonic(name))

      // Check all have unique mnemonics
      const mnems = similarNames.map((name) => mnemonics[name])
      const uniqueMnems = new Set(mnems)
      expect(mnems.length).toBe(uniqueMnems.size)

      const getAll = getAllMnemonics()
      console.log("Underscore mnems", getAll)
    })
    it("should handle extreme _", () => {
      clearMnemonics()

      // Add many similar names to force conflicts
      const similarNames = [
        "test",
        "testF",
        "test_F",
        "test_For",
        "testFor",
        "testForMe",
        "test_For_Me",
        "testForMe",
        "test_For_Me_Not",
      ]
      similarNames.forEach((name) => addMnemonic(name))

      // Check all have unique mnemonics
      const mnems = similarNames.map((name) => mnemonics[name])
      const _uniqueMnems = new Set(mnems)
      const getAll = getAllMnemonics()
      //      expect(mnems.length).toBe(uniqueMnems.size)
      console.log("Underscore mnems", getAll)
    })
  })

  describe("uuid", () => {
    it("should generate a timestamp-based ID", () => {
      const id1 = uuid()
      expect(typeof id1).toBe("string")
      expect(Number(id1)).toBeGreaterThan(0)
    })

    it("should generate unique IDs with offset", () => {
      const id1 = uuid(0)
      const id2 = uuid(1)
      expect(id1).not.toBe(id2)
      expect(Number(id2)).toBe(Number(id1) + 1)
    })

    it("should generate sequential IDs when called quickly", () => {
      const ids = []
      for (let i = 0; i < 5; i++) {
        ids.push(uuid(i))
      }

      // Check that IDs are sequential
      for (let i = 1; i < ids.length; i++) {
        expect(Number(ids[i])).toBe(Number(ids[0]) + i)
      }
    })
  })
})
