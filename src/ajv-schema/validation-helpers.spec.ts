import Ajv from "ajv"
import addFormats from "ajv-formats"
import { beforeAll, describe, expect, it } from "vitest"
import {
  type LabelSchema,
  type TaskDataSchema,
  labelSchemaLiteral,
  projectStatusSchema,
  taskSchemaLiteral,
} from "./index"

// Utility function to create a validation helper
function createValidator<T>(schema: object) {
  const ajv = new Ajv({ allErrors: true, strict: false })
  addFormats(ajv)
  const validate = ajv.compile(schema)

  return {
    validate: (
      data: unknown
    ): { valid: boolean; data?: T; errors?: string[] } => {
      const valid = validate(data)
      if (valid) {
        return { valid: true, data: data as T }
      }
      return {
        valid: false,
        errors: validate.errors?.map(
          (err) => `${err.instancePath} ${err.message}`
        ) || ["Unknown error"],
      }
    },
    schema,
  }
}

describe("Validation Helpers", () => {
  describe("Project Status Validator", () => {
    const statusValidator = createValidator<string>(projectStatusSchema)

    it("should return valid result for correct status", () => {
      const result = statusValidator.validate("started")

      expect(result.valid).toBe(true)
      expect(result.data).toBe("started")
      expect(result.errors).toBeUndefined()
    })

    it("should return error details for invalid status", () => {
      const result = statusValidator.validate("invalid-status")

      expect(result.valid).toBe(false)
      expect(result.data).toBeUndefined()
      expect(result.errors).toBeDefined()
      expect(result.errors?.[0]).toContain(
        "must be equal to one of the allowed values"
      )
    })
  })

  describe("Label Validator", () => {
    const labelValidator = createValidator<LabelSchema>(labelSchemaLiteral)

    it("should validate and return typed data for valid label", () => {
      const validLabel = {
        id: "label-1",
        projectId: "project-1",
        type: "status" as const,
        name: "To Do",
        color: "blue",
        order: 0,
        description: "Tasks to be started",
        createdAt: Date.now(),
        updatedAt: Date.now(),
        createdBy: {
          id: "user-1",
          name: "John Doe",
          image: "avatar.jpg",
        },
        updatedBy: {
          id: "user-1",
          name: "John Doe",
          image: "avatar.jpg",
        },
      }

      const result = labelValidator.validate(validLabel)

      expect(result.valid).toBe(true)
      expect(result.data).toEqual(validLabel)
      expect(result.data?.type).toBe("status")
      expect(result.data?.name).toBe("To Do")
    })

    it("should provide detailed errors for missing fields", () => {
      const invalidLabel = {
        id: "label-1",
        // Missing required fields
        name: "Incomplete",
      }

      const result = labelValidator.validate(invalidLabel)

      expect(result.valid).toBe(false)
      expect(result.errors).toBeDefined()
      expect(result.errors?.length).toBeGreaterThan(0)
    })
  })

  describe("Task Validator", () => {
    const taskValidator = createValidator<TaskDataSchema>(taskSchemaLiteral)

    it("should handle complex nested task data", () => {
      const complexTask = {
        id: "task-1",
        projectId: "project-1",
        name: "Complex Feature Implementation",
        statusId: "status-in-progress",
        priorityId: "priority-high",
        taskOrder: 5,
        startDate: Date.now(),
        endDate: Date.now() + 604800000, // 1 week
        description: "Implement advanced features with multiple requirements",
        acceptanceCriteria: [
          {
            id: "ac-1",
            text: "Feature should handle edge cases",
            checked: false,
            order: 0,
          },
          {
            id: "ac-2",
            text: "Performance should be under 100ms",
            checked: true,
            order: 1,
          },
        ],
        checklist: [
          {
            id: "cl-1",
            text: "Write unit tests",
            checked: true,
            order: 0,
          },
          {
            id: "cl-2",
            text: "Code review",
            checked: false,
            order: 1,
          },
        ],
        completed: false,
        refUrls: [
          {
            id: "ref-1",
            url: "https://figma.com/design",
            title: "UI Design",
            type: "figma" as const,
            taskId: "task-1",
          },
        ],
        labelsTags: [
          {
            value: "backend",
            label: "Backend",
            color: "orange",
          },
        ],
        attachments: [
          {
            id: "att-1",
            name: "requirements.pdf",
            url: "https://example.com/req.pdf",
            size: "2MB",
            type: "pdf",
          },
        ],
        assignedTo: [
          {
            id: "dev-1",
            name: "Alice Developer",
            image: "alice.jpg",
          },
          {
            id: "dev-2",
            name: "Bob Developer",
            image: "bob.jpg",
          },
        ],
        createdAt: Date.now() - 86400000, // 1 day ago
        updatedAt: Date.now(),
        createdBy: {
          id: "pm-1",
          name: "Project Manager",
          image: "pm.jpg",
        },
        updatedBy: {
          id: "dev-1",
          name: "Alice Developer",
          image: "alice.jpg",
        },
      }

      const result = taskValidator.validate(complexTask)

      expect(result.valid).toBe(true)
      expect(result.data).toEqual(complexTask)
      expect(result.data?.acceptanceCriteria).toHaveLength(2)
      expect(result.data?.assignedTo).toHaveLength(2)
      expect(result.data?.refUrls?.[0].type).toBe("figma")
    })

    it("should validate task with optional fields as null/undefined", () => {
      const minimalTask = {
        id: "task-minimal",
        projectId: "project-1",
        name: "Simple Task",
        statusId: "status-todo",
        priorityId: "priority-medium",
        taskOrder: 1,
        parentTaskId: null,
        endDate: null,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        createdBy: {
          id: "user-1",
          name: "Creator",
        },
        updatedBy: {
          id: "user-1",
          name: "Creator",
        },
      }

      const result = taskValidator.validate(minimalTask)

      expect(result.valid).toBe(true)
      expect(result.data?.parentTaskId).toBeNull()
      expect(result.data?.endDate).toBeNull()
    })
  })

  describe("Error Handling", () => {
    it("should handle type mismatches gracefully", () => {
      const statusValidator = createValidator<string>(projectStatusSchema)

      // Test various invalid types
      const testCases = [
        { input: 123, description: "number" },
        { input: [], description: "array" },
        { input: {}, description: "object" },
        { input: true, description: "boolean" },
        { input: null, description: "null" },
      ]

      testCases.forEach(({ input, description }) => {
        const result = statusValidator.validate(input)
        expect(result.valid).toBe(false)
        expect(result.errors).toBeDefined()
      })
    })

    it("should accumulate multiple validation errors", () => {
      const labelValidator = createValidator<LabelSchema>(labelSchemaLiteral)

      const invalidLabel = {
        id: 123, // Should be string
        // Missing projectId
        type: "invalid-type", // Should be "status" or "priority"
        name: "", // Empty string might be invalid depending on minLength
        order: "not-a-number", // Should be number
        // Missing required fields
      }

      const result = labelValidator.validate(invalidLabel)

      expect(result.valid).toBe(false)
      expect(result.errors).toBeDefined()
      expect(result.errors?.length).toBeGreaterThan(1) // Multiple errors
    })
  })

  describe("Performance", () => {
    it("should handle validation of large datasets efficiently", () => {
      const labelValidator = createValidator<LabelSchema>(labelSchemaLiteral)

      // Create a valid label template
      const validLabelTemplate = {
        id: "label-",
        projectId: "project-1",
        type: "status" as const,
        name: "Status",
        color: "blue",
        order: 0,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        createdBy: { id: "user-1", name: "User" },
        updatedBy: { id: "user-1", name: "User" },
      }

      const startTime = performance.now()

      // Validate 1000 labels
      for (let i = 0; i < 1000; i++) {
        const label = {
          ...validLabelTemplate,
          id: `label-${i}`,
          name: `Status ${i}`,
        }
        const result = labelValidator.validate(label)
        expect(result.valid).toBe(true)
      }

      const endTime = performance.now()
      const duration = endTime - startTime

      // Should complete in reasonable time (under 1 second for 1000 validations)
      expect(duration).toBeLessThan(1000)
    })
  })
})
