import { describe, expect, it } from "vitest"
import {
  TASK_URL_ENUMS,
  attachmentsDef,
  auditDef,
  baseDefTypes,
  booleanDef,
  checkListDef,
  commentsDef,
  dateDef,
  descriptionDef,
  emailDef,
  idDef,
  idsDef,
  insertAuditDef,
  listDef,
  luvDef,
  manyOfDef,
  markdownDef,
  memberDef,
  membersDef,
  nameDef,
  namesDef,
  nullableIdDef,
  numberDef,
  oneOfDef,
  orderDef,
  schema,
  setEnums,
  setLabel,
  urlDef,
  urlItemDef,
  urlsDef,
} from "./base-types"

describe("base-types", () => {
  describe("baseDefTypes", () => {
    it("should have all base type definitions", () => {
      expect(baseDefTypes).toEqual({
        string: "string",
        array: "array",
        number: "number",
        null: "null",
        object: "object",
        date: "date",
        boolean: "boolean",
      })
    })
  })

  describe("basic definitions", () => {
    it("should have correct idDef structure", () => {
      expect(idDef).toEqual({
        type: "string",
        maxLength: 50,
      })
    })

    it("should have correct nameDef structure", () => {
      expect(nameDef).toEqual({
        type: "string",
        title: "Name",
        maxLength: 50,
      })
    })

    it("should have correct emailDef structure", () => {
      expect(emailDef).toEqual({
        type: "string",
        title: "Email",
        maxLength: 100,
      })
    })

    it("should have correct numberDef structure", () => {
      expect(numberDef).toEqual({
        type: "number",
        minimum: 0,
        default: 0,
      })
    })

    it("should have correct dateDef structure", () => {
      expect(dateDef).toEqual({
        type: "date",
      })
    })

    it("should have correct booleanDef structure", () => {
      expect(booleanDef).toEqual({
        type: "boolean",
        default: false,
      })
    })

    it("should have correct descriptionDef structure", () => {
      expect(descriptionDef).toEqual({
        type: "string",
        title: "Description",
        maxLength: 2000,
        default: "",
      })
    })

    it("should have correct markdownDef structure", () => {
      expect(markdownDef).toEqual({
        type: "string",
      })
    })
  })

  describe("luv definitions", () => {
    it("should have correct luvDef structure", () => {
      expect(luvDef).toEqual({
        maxLength: 50,
        ref: "",
        luv: true,
        enums: [],
      })
    })

    it("should have correct oneOfDef structure", () => {
      expect(oneOfDef).toEqual({
        type: "string",
        maxLength: 50,
        ref: "",
        luv: true,
        enums: [],
      })
    })

    it("should have correct manyOfDef structure", () => {
      expect(manyOfDef).toEqual({
        type: "array",
        maxLength: 50,
        ref: "",
        luv: true,
        enums: [],
        items: {
          type: "string",
        },
      })
    })
  })

  describe("array definitions", () => {
    it("should have correct namesDef structure", () => {
      expect(namesDef).toEqual({
        type: "array",
        items: {
          type: "string",
        },
      })
    })

    it("should have correct listDef structure", () => {
      expect(listDef).toEqual({
        type: "array",
        title: "list",
        default: [],
      })
    })

    it("should have correct idsDef structure", () => {
      expect(idsDef).toEqual({
        type: "array",
        items: {
          type: "string",
          maxLength: 50,
        },
      })
    })
  })

  describe("complex definitions", () => {
    it("should have correct nullableIdDef structure", () => {
      expect(nullableIdDef).toEqual({
        type: ["string", null],
        maxLength: 50,
      })
    })

    it("should have correct orderDef structure", () => {
      expect(orderDef).toEqual({
        type: "number",
        title: "Order",
        default: 0,
        minimum: 0,
        multipleOf: 1,
        hidden: true,
      })
    })

    it("should have correct urlDef structure", () => {
      expect(urlDef).toEqual({
        type: "string",
        maxLength: 1000,
      })
    })
  })

  describe("schema definition", () => {
    it("should have correct default schema structure", () => {
      expect(schema).toEqual({
        title: "",
        version: 0,
        primaryKey: "id",
        type: "object",
      })
    })
  })

  describe("checklist definitions", () => {
    it("should have correct checkListDef structure", () => {
      expect(checkListDef.type).toBe("array")
      expect(checkListDef.title).toBe("Checklist")
      expect(checkListDef.properties).toHaveProperty("id")
      expect(checkListDef.properties).toHaveProperty("name")
      expect(checkListDef.properties).toHaveProperty("checked")
      expect(checkListDef.properties).toHaveProperty("order")
      expect(checkListDef.required).toEqual(["id", "name", "checked", "order"])
    })
  })

  describe("URL definitions", () => {
    it("should have correct TASK_URL_ENUMS", () => {
      expect(TASK_URL_ENUMS).toEqual(["Figma", "Task", "Github", "Other"])
    })

    it("should have correct urlItemDef structure", () => {
      expect(urlItemDef).toHaveProperty("id")
      expect(urlItemDef).toHaveProperty("url")
      expect(urlItemDef).toHaveProperty("name")
      expect(urlItemDef).toHaveProperty("type")
    })

    it("should have correct urlsDef structure", () => {
      expect(urlsDef.type).toBe("object")
      expect(urlsDef.title).toBe("Links")
      expect(urlsDef.required).toEqual(["id"])
    })

    it("should have correct attachmentsDef structure", () => {
      expect(attachmentsDef.properties).toHaveProperty("size")
      expect(attachmentsDef.properties.size).toEqual({
        type: "number",
        minimum: 0,
        default: 0,
      })
    })
  })

  describe("audit definitions", () => {
    it("should have correct auditDef structure", () => {
      expect(auditDef.type).toBe("object")
      expect(auditDef.properties).toHaveProperty("createdAt")
      expect(auditDef.properties).toHaveProperty("updatedAt")
      expect(auditDef.properties).toHaveProperty("createdBy")
      expect(auditDef.properties).toHaveProperty("updatedBy")
      expect(auditDef.required).toEqual(["createdAt", "createdBy"])
    })

    it("should have correct insertAuditDef structure", () => {
      expect(insertAuditDef.type).toBe("object")
      expect(insertAuditDef.properties).toHaveProperty("createdAt")
      expect(insertAuditDef.properties).toHaveProperty("createdBy")
      expect(insertAuditDef.required).toEqual(["createdAt", "createdBy"])
    })
  })

  describe("member definitions", () => {
    it("should have correct memberDef structure", () => {
      expect(memberDef.type).toBe("object")
      expect(memberDef.properties).toHaveProperty("id")
      expect(memberDef.properties).toHaveProperty("name")
      expect(memberDef.properties).toHaveProperty("src")
      expect(memberDef.properties).toHaveProperty("email")
      expect(memberDef.properties).toHaveProperty("slug")
      expect(memberDef.required).toEqual(["id"])
    })

    it("should have correct membersDef structure", () => {
      expect(membersDef.type).toBe("array")
      expect(membersDef.title).toBe("Members")
      expect(membersDef.items).toEqual(memberDef)
    })
  })

  describe("comments definition", () => {
    it("should have correct commentsDef structure", () => {
      expect(commentsDef.type).toBe("array")
      expect(commentsDef.title).toBe("Comments")
      expect(commentsDef.default).toEqual([])
      expect(commentsDef.items.type).toBe("object")
      expect(commentsDef.items.properties).toHaveProperty("id")
      expect(commentsDef.items.properties).toHaveProperty("content")
      expect(commentsDef.items.properties).toHaveProperty("author")
      expect(commentsDef.items.properties).toHaveProperty("refs")
      expect(commentsDef.items.required).toEqual(["id"])
    })
  })

  describe("helper functions", () => {
    describe("setEnums", () => {
      it("should set enums for oneOfDef", () => {
        const def = { ...oneOfDef }
        const result = setEnums(def, ["option1", "option2", "option3"])

        expect(result.enums).toEqual(["option1", "option2", "option3"])
        expect(result.type).toBe("string")
        expect(result.luv).toBe(true)
      })

      it("should set enums for manyOfDef", () => {
        const def = { ...manyOfDef }
        const result = setEnums(def, ["choice1", "choice2"])

        expect(result.enums).toEqual(["choice1", "choice2"])
        expect(result.type).toBe("array")
        expect(result.luv).toBe(true)
      })

      it("should create a new array, not mutate the original", () => {
        const def = { ...oneOfDef }
        const originalEnums = ["test"]
        def.enums = originalEnums

        const result = setEnums(def, ["new1", "new2"])

        expect(result.enums).toEqual(["new1", "new2"])
        expect(result.enums).not.toBe(originalEnums)
        expect(def.enums).toEqual(originalEnums)
      })
    })

    describe("setLabel", () => {
      it("should set ref label for oneOfDef", () => {
        const def = { ...oneOfDef }
        const result = setLabel(def, "myLabel")

        expect(result.ref).toBe("myLabel")
        expect(result.type).toBe("string")
        expect(result.luv).toBe(true)
      })

      it("should set ref label for manyOfDef", () => {
        const def = { ...manyOfDef }
        const result = setLabel(def, "myArrayLabel")

        expect(result.ref).toBe("myArrayLabel")
        expect(result.type).toBe("array")
        expect(result.luv).toBe(true)
      })

      it("should not mutate the original definition", () => {
        const def = { ...oneOfDef }
        const originalRef = def.ref

        const result = setLabel(def, "newRef")

        expect(result.ref).toBe("newRef")
        expect(def.ref).toBe(originalRef)
        expect(result).not.toBe(def)
      })
    })
  })

  describe("type definitions", () => {
    it("should correctly define ID type", () => {
      const id: string = "test-id"
      expect(typeof id).toBe("string")
    })

    it("should correctly define DATE type", () => {
      const date: number = Date.now()
      expect(typeof date).toBe("number")
    })

    it("should correctly define MARKDOWN type", () => {
      const markdown: string = "# Heading\n\nContent"
      expect(typeof markdown).toBe("string")
    })

    it("should correctly structure REF_URL type", () => {
      const refUrl = {
        id: "ref-123",
        name: "Reference",
        type: "document",
        url: "https://example.com",
      }

      expect(refUrl).toHaveProperty("id")
      expect(refUrl).toHaveProperty("name")
      expect(refUrl).toHaveProperty("type")
      expect(refUrl).toHaveProperty("url")
    })

    it("should correctly structure ATTACHMENT type", () => {
      const attachment = {
        id: "attach-123",
        name: "file.pdf",
        type: "pdf",
        url: "https://example.com/file.pdf",
        size: 1024,
      }

      expect(attachment).toHaveProperty("id")
      expect(attachment).toHaveProperty("size")
    })

    it("should correctly structure MEMBER type", () => {
      const member = {
        id: "user-123",
        name: "John Doe",
        email: "john@example.com",
        src: "https://example.com/avatar.jpg",
        slug: "john-doe",
        color: "#FF5733",
      }

      expect(member).toHaveProperty("id")
      expect(member).toHaveProperty("name")
      expect(member).toHaveProperty("email")
      expect(member).toHaveProperty("src")
      expect(member).toHaveProperty("slug")
      expect(member).toHaveProperty("color")
    })

    it("should correctly structure CHECKLIST type", () => {
      const checklistItem = {
        id: "check-123",
        name: "Task item",
        checked: true,
        order: 1,
      }

      expect(checklistItem).toHaveProperty("id")
      expect(checklistItem).toHaveProperty("name")
      expect(checklistItem).toHaveProperty("checked")
      expect(checklistItem).toHaveProperty("order")
    })

    it("should correctly structure AUDIT type", () => {
      const audit = {
        createdAt: Date.now(),
        updatedAt: Date.now(),
        createdBy: "user-123",
        updatedBy: "user-456",
      }

      expect(audit).toHaveProperty("createdAt")
      expect(audit).toHaveProperty("updatedAt")
      expect(audit).toHaveProperty("createdBy")
      expect(audit).toHaveProperty("updatedBy")
    })

    it("should correctly structure INSERTAUDIT type", () => {
      const insertAudit = {
        createdAt: Date.now(),
        createdBy: "user-123",
      }

      expect(insertAudit).toHaveProperty("createdAt")
      expect(insertAudit).toHaveProperty("createdBy")
    })

    it("should correctly structure COMMENT type", () => {
      const comment = {
        id: "comment-123",
        content: "This is a comment",
        author: {
          id: "user-123",
          name: "John Doe",
        },
        refs: ["ref1", "ref2"],
        createdAt: Date.now(),
        createdBy: "user-123",
      }

      expect(comment).toHaveProperty("id")
      expect(comment).toHaveProperty("content")
      expect(comment).toHaveProperty("author")
      expect(comment).toHaveProperty("refs")
      expect(comment).toHaveProperty("createdAt")
      expect(comment).toHaveProperty("createdBy")
    })

    it("should correctly structure SCHEMA type", () => {
      const schemaInstance = {
        title: "My Schema",
        version: 1,
        primaryKey: "id",
        type: "object" as const,
      }

      expect(schemaInstance).toHaveProperty("title")
      expect(schemaInstance).toHaveProperty("version")
      expect(schemaInstance).toHaveProperty("primaryKey")
      expect(schemaInstance).toHaveProperty("type")
    })
  })
})
