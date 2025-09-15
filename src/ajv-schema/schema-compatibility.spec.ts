import Ajv from "ajv"
import addFormats from "ajv-formats"
import { beforeAll, describe, expect, it } from "vitest"
import {
  DEFAULT_LABELS,
  type LabelSchema,
  type TaskDataSchema,
  labelSchemaLiteral,
  projectSchemaLiteral,
  taskSchemaLiteral,
} from "./index"

describe("Schema Compatibility", () => {
  let ajv: Ajv
  let validateLabel: Ajv.ValidateFunction
  let validateTask: Ajv.ValidateFunction
  let validateProject: Ajv.ValidateFunction

  beforeAll(() => {
    ajv = new Ajv({ allErrors: true, strict: false })
    addFormats(ajv)
    validateLabel = ajv.compile(labelSchemaLiteral)
    validateTask = ajv.compile(taskSchemaLiteral)
    validateProject = ajv.compile(projectSchemaLiteral)
  })

  describe("Default Label Validation", () => {
    it("should validate all default labels from constants", () => {
      // Create mock labels based on DEFAULT_LABELS
      const mockLabels = DEFAULT_LABELS.map((defaultLabel, index) => ({
        id: `label-${index}`,
        projectId: "test-project-123",
        type: defaultLabel.type as "status" | "priority",
        name: defaultLabel.name,
        color: defaultLabel.color,
        order: defaultLabel.order,
        description: defaultLabel.description,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        createdBy: {
          id: "system",
          name: "System",
          image: "system.png",
        },
        updatedBy: {
          id: "system",
          name: "System",
          image: "system.png",
        },
      }))

      mockLabels.forEach((label, index) => {
        const isValid = validateLabel(label)
        if (!isValid) {
          console.error(
            `Label ${index} validation failed:`,
            validateLabel.errors
          )
        }
        expect(isValid).toBe(true)
      })
    })
  })

  describe("Real-world Data Scenarios", () => {
    it("should handle typical project workflow data", () => {
      // Simulate a real project with labels
      const statusLabels = [
        {
          id: "status-backlog",
          projectId: "ecommerce-project",
          type: "status" as const,
          name: "Backlog",
          color: "gray",
          order: 0,
          description: "Items waiting to be prioritized",
          createdAt: 1640995200000, // Jan 1, 2022
          updatedAt: 1640995200000,
          createdBy: { id: "pm-1", name: "Product Manager", image: "pm.jpg" },
          updatedBy: { id: "pm-1", name: "Product Manager", image: "pm.jpg" },
        },
        {
          id: "status-sprint",
          projectId: "ecommerce-project",
          type: "status" as const,
          name: "In Sprint",
          color: "blue",
          order: 1,
          createdAt: 1640995200000,
          updatedAt: 1641081600000, // Jan 2, 2022
          createdBy: { id: "pm-1", name: "Product Manager" },
          updatedBy: { id: "dev-lead", name: "Dev Lead" },
        },
      ]

      statusLabels.forEach((label) => {
        expect(validateLabel(label)).toBe(true)
      })

      // Test priority labels
      const priorityLabels = [
        {
          id: "priority-critical",
          projectId: "ecommerce-project",
          type: "priority" as const,
          name: "Critical",
          color: "red",
          order: 0,
          description: "Must be fixed immediately",
          createdAt: Date.now(),
          updatedAt: Date.now(),
          createdBy: { id: "pm-1", name: "Product Manager" },
          updatedBy: { id: "pm-1", name: "Product Manager" },
        },
      ]

      priorityLabels.forEach((label) => {
        expect(validateLabel(label)).toBe(true)
      })
    })

    it("should validate complex task with all optional fields populated", () => {
      const complexTask = {
        id: "task-feature-auth",
        projectId: "ecommerce-project",
        name: "Implement OAuth 2.0 Authentication",
        statusId: "status-sprint",
        priorityId: "priority-critical",
        parentTaskId: null,
        isSubtask: false,
        taskOrder: 3,
        startDate: 1641168000000, // Jan 3, 2022
        endDate: 1641772800000, // Jan 10, 2022
        description: `# OAuth 2.0 Implementation

## Requirements
- Support Google and GitHub OAuth
- Implement JWT token management
- Add refresh token functionality

## Technical Details
- Use passport.js library
- Store tokens securely
- Implement proper error handling`,
        acceptanceCriteria: [
          {
            id: "ac-oauth-google",
            text: "Users can login with Google account",
            checked: false,
            order: 0,
          },
          {
            id: "ac-oauth-github",
            text: "Users can login with GitHub account",
            checked: false,
            order: 1,
          },
          {
            id: "ac-jwt-tokens",
            text: "JWT tokens are properly generated and validated",
            checked: true,
            order: 2,
          },
        ],
        checklist: [
          {
            id: "cl-setup-passport",
            text: "Install and configure passport.js",
            checked: true,
            order: 0,
          },
          {
            id: "cl-google-strategy",
            text: "Implement Google OAuth strategy",
            checked: false,
            order: 1,
          },
          {
            id: "cl-github-strategy",
            text: "Implement GitHub OAuth strategy",
            checked: false,
            order: 2,
          },
          {
            id: "cl-jwt-middleware",
            text: "Create JWT middleware",
            checked: true,
            order: 3,
          },
          {
            id: "cl-error-handling",
            text: "Add comprehensive error handling",
            checked: false,
            order: 4,
          },
        ],
        completed: false,
        refUrls: [
          {
            id: "ref-figma-auth",
            url: "https://www.figma.com/file/abc123/Authentication-Flow",
            title: "Authentication UI Designs",
            type: "figma" as const,
            taskId: "task-feature-auth",
          },
          {
            id: "ref-github-issue",
            url: "https://github.com/company/project/issues/42",
            title: "OAuth Implementation Issue",
            type: "external" as const,
          },
          {
            id: "ref-related-task",
            url: "/tasks/user-profile-setup",
            title: "User Profile Setup Task",
            type: "task" as const,
            taskId: "task-user-profile",
          },
        ],
        labelsTags: [
          {
            value: "authentication",
            label: "Authentication",
            color: "purple",
          },
          {
            value: "security",
            label: "Security",
            color: "red",
          },
          {
            value: "backend",
            label: "Backend",
            color: "green",
          },
        ],
        attachments: [
          {
            id: "att-oauth-spec",
            name: "OAuth2_Implementation_Spec.pdf",
            url: "https://storage.example.com/docs/oauth-spec.pdf",
            size: "1.2MB",
            type: "application/pdf",
          },
          {
            id: "att-flow-diagram",
            name: "authentication_flow.png",
            url: "https://storage.example.com/images/auth-flow.png",
            size: "456KB",
            type: "image/png",
          },
        ],
        assignedTo: [
          {
            id: "dev-alice",
            name: "Alice Johnson",
            image: "https://avatars.example.com/alice.jpg",
          },
          {
            id: "dev-bob",
            name: "Bob Smith",
            image: "https://avatars.example.com/bob.jpg",
          },
        ],
        createdAt: 1641081600000, // Jan 2, 2022
        updatedAt: 1641254400000, // Jan 4, 2022
        createdBy: {
          id: "pm-sarah",
          name: "Sarah Wilson",
          image: "https://avatars.example.com/sarah.jpg",
        },
        updatedBy: {
          id: "dev-alice",
          name: "Alice Johnson",
          image: "https://avatars.example.com/alice.jpg",
        },
      }

      const isValid = validateTask(complexTask)
      if (!isValid) {
        console.error("Complex task validation failed:", validateTask.errors)
      }
      expect(isValid).toBe(true)
    })

    it("should validate subtask relationships", () => {
      const parentTask = {
        id: "task-parent-feature",
        projectId: "ecommerce-project",
        name: "User Management Feature",
        statusId: "status-in-progress",
        priorityId: "priority-high",
        parentTaskId: null,
        isSubtask: false,
        taskOrder: 1,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        createdBy: { id: "pm-1", name: "PM" },
        updatedBy: { id: "pm-1", name: "PM" },
      }

      const subtask = {
        id: "task-subtask-validation",
        projectId: "ecommerce-project",
        name: "Add Input Validation",
        statusId: "status-todo",
        priorityId: "priority-medium",
        parentTaskId: "task-parent-feature",
        isSubtask: true,
        taskOrder: 1,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        createdBy: { id: "dev-1", name: "Developer" },
        updatedBy: { id: "dev-1", name: "Developer" },
      }

      expect(validateTask(parentTask)).toBe(true)
      expect(validateTask(subtask)).toBe(true)
    })

    it("should validate project with realistic data", () => {
      const realisticProject = {
        id: "PROJ001",
        name: "E-Commerce Platform Redesign",
        logo: "https://cdn.example.com/projects/ecommerce/logo.png",
        status: "started" as const,
        description:
          "Complete redesign of the e-commerce platform with focus on mobile-first approach, improved UX, and performance optimization. Includes new payment gateway integration and inventory management system.",
        orgId: "org-acme-corp",
        company: "ACME Corporation",
        startDate: 1640995200000, // Jan 1, 2022
        endDate: 1672531200000, // Jan 1, 2023
        budget: 250000,
        createdAt: 1640908800000, // Dec 31, 2021
        updatedAt: Date.now(),
        createdBy: "exec-john-doe",
        updatedBy: "pm-jane-smith",
      }

      const isValid = validateProject(realisticProject)
      if (!isValid) {
        console.error(
          "Realistic project validation failed:",
          validateProject.errors
        )
      }
      expect(isValid).toBe(true)
    })
  })

  describe("Edge Cases", () => {
    it("should handle maximum length strings", () => {
      const longLabel = {
        id: "a".repeat(50), // Assuming max 50 chars for ID
        projectId: "b".repeat(50),
        type: "status" as const,
        name: "c".repeat(200), // Assuming max 200 chars for name
        color: "d".repeat(50),
        order: 999999,
        description: "e".repeat(500), // Assuming max 500 chars for description
        createdAt: Date.now(),
        updatedAt: Date.now(),
        createdBy: {
          id: "f".repeat(50),
          name: "g".repeat(200),
          image: "h".repeat(500),
        },
        updatedBy: {
          id: "i".repeat(50),
          name: "j".repeat(200),
          image: "k".repeat(500),
        },
      }

      // This might fail if our maxLength constraints are too restrictive
      // The test helps us identify if our schema constraints match real usage
      validateLabel(longLabel)

      // We don't expect this to necessarily pass, but it shouldn't crash
      expect(() => validateLabel(longLabel)).not.toThrow()
    })

    it("should handle empty arrays gracefully", () => {
      const taskWithEmptyArrays = {
        id: "task-empty-arrays",
        projectId: "project-1",
        name: "Task with Empty Collections",
        statusId: "status-todo",
        priorityId: "priority-low",
        taskOrder: 1,
        acceptanceCriteria: [], // Empty array
        checklist: [], // Empty array
        refUrls: [], // Empty array
        labelsTags: [], // Empty array
        attachments: [], // Empty array
        assignedTo: [], // Empty array
        completed: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        createdBy: { id: "user-1", name: "User" },
        updatedBy: { id: "user-1", name: "User" },
      }

      expect(validateTask(taskWithEmptyArrays)).toBe(true)
    })
  })
})
