import Ajv from "ajv"
import addFormats from "ajv-formats"
import { beforeAll, describe, expect, it } from "vitest"
import {
  dashboardSchemaLiteral,
  dashboardTemplateSchemaLiteral,
  labelSchemaLiteral,
  projectSchemaLiteral,
  projectStatusSchema,
  taskSchemaLiteral,
} from "./index"

describe("AJV Schema Validation", () => {
  let ajv: Ajv

  beforeAll(() => {
    ajv = new Ajv({
      allErrors: true,
      verbose: true,
      strict: false, // Allow unknown keywords like 'version', 'primaryKey' etc.
    })
    addFormats(ajv)
  })

  describe("Project Status Schema", () => {
    let validateProjectStatus: Ajv.ValidateFunction

    beforeAll(() => {
      validateProjectStatus = ajv.compile(projectStatusSchema)
    })

    it("should validate valid project statuses", () => {
      expect(validateProjectStatus("all")).toBe(true)
      expect(validateProjectStatus("started")).toBe(true)
      expect(validateProjectStatus("on-hold")).toBe(true)
      expect(validateProjectStatus("completed")).toBe(true)
    })

    it("should reject invalid project statuses", () => {
      expect(validateProjectStatus("invalid")).toBe(false)
      expect(validateProjectStatus("")).toBe(false)
      expect(validateProjectStatus(null)).toBe(false)
      expect(validateProjectStatus(123)).toBe(false)
      expect(validateProjectStatus({})).toBe(false)
    })

    it("should provide detailed error messages for invalid data", () => {
      validateProjectStatus("invalid")
      expect(validateProjectStatus.errors).toBeDefined()
      expect(validateProjectStatus.errors?.[0]).toMatchObject({
        keyword: "enum",
        message: expect.stringContaining(
          "must be equal to one of the allowed values"
        ),
      })
    })
  })

  describe("Label Schema", () => {
    let validateLabel: Ajv.ValidateFunction

    beforeAll(() => {
      validateLabel = ajv.compile(labelSchemaLiteral)
    })

    it("should validate a complete valid label", () => {
      const validLabel = {
        id: "label-123",
        projectId: "project-456",
        type: "status",
        name: "In Progress",
        color: "blue",
        order: 1,
        description: "Tasks currently being worked on",
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

      expect(validateLabel(validLabel)).toBe(true)
    })

    it("should validate label with only required fields", () => {
      const minimalLabel = {
        id: "label-123",
        projectId: "project-456",
        type: "priority",
        name: "High",
        color: "red",
        order: 0,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        createdBy: {
          id: "user-1",
          name: "John Doe",
        },
        updatedBy: {
          id: "user-1",
          name: "John Doe",
        },
      }

      expect(validateLabel(minimalLabel)).toBe(true)
    })

    it("should reject label with missing required fields", () => {
      const invalidLabel = {
        id: "label-123",
        // missing projectId
        type: "status",
        name: "In Progress",
      }

      expect(validateLabel(invalidLabel)).toBe(false)
      expect(validateLabel.errors).toBeDefined()
    })

    it("should reject label with invalid type", () => {
      const invalidLabel = {
        id: "label-123",
        projectId: "project-456",
        type: "invalid-type", // should be "status" or "priority"
        name: "Test",
        color: "blue",
        order: 0,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        createdBy: { id: "user-1", name: "John" },
        updatedBy: { id: "user-1", name: "John" },
      }

      expect(validateLabel(invalidLabel)).toBe(false)
    })
  })

  describe("Task Schema", () => {
    let validateTask: Ajv.ValidateFunction

    beforeAll(() => {
      validateTask = ajv.compile(taskSchemaLiteral)
    })

    it("should validate a complete valid task", () => {
      const validTask = {
        id: "task-123",
        projectId: "project-456",
        name: "Implement user authentication",
        statusId: "status-todo",
        priorityId: "priority-high",
        taskOrder: 1,
        startDate: Date.now(),
        endDate: Date.now() + 86400000, // 1 day later
        description: "Add JWT-based authentication system",
        acceptanceCriteria: [
          {
            id: "ac-1",
            text: "User can login with email/password",
            checked: false,
            order: 0,
          },
        ],
        checklist: [
          {
            id: "cl-1",
            text: "Setup JWT library",
            checked: true,
            order: 0,
          },
        ],
        completed: false,
        refUrls: [
          {
            id: "ref-1",
            url: "https://example.com",
            type: "external",
          },
        ],
        labelsTags: [
          {
            value: "frontend",
            label: "Frontend",
            color: "green",
          },
        ],
        attachments: [
          {
            id: "att-1",
            name: "mockup.png",
            url: "https://example.com/mockup.png",
            size: "150KB",
          },
        ],
        assignedTo: [
          {
            id: "user-1",
            name: "John Doe",
            image: "avatar.jpg",
          },
        ],
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

      expect(validateTask(validTask)).toBe(true)
    })

    it("should validate task with only required fields", () => {
      const minimalTask = {
        id: "task-123",
        projectId: "project-456",
        name: "Simple task",
        statusId: "status-todo",
        priorityId: "priority-low",
        taskOrder: 1,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        createdBy: {
          id: "user-1",
          name: "John Doe",
        },
        updatedBy: {
          id: "user-1",
          name: "John Doe",
        },
      }

      expect(validateTask(minimalTask)).toBe(true)
    })

    it("should reject task with missing required fields", () => {
      const invalidTask = {
        id: "task-123",
        // missing projectId, name, statusId, priorityId, etc.
      }

      expect(validateTask(invalidTask)).toBe(false)
      expect(validateTask.errors).toBeDefined()
    })

    it("should validate task with null endDate", () => {
      const taskWithNullEndDate = {
        id: "task-123",
        projectId: "project-456",
        name: "Ongoing task",
        statusId: "status-todo",
        priorityId: "priority-low",
        taskOrder: 1,
        endDate: null, // This should be allowed
        createdAt: Date.now(),
        updatedAt: Date.now(),
        createdBy: { id: "user-1", name: "John" },
        updatedBy: { id: "user-1", name: "John" },
      }

      expect(validateTask(taskWithNullEndDate)).toBe(true)
    })

    it("should validate task with subtask fields", () => {
      const subtask = {
        id: "task-123",
        projectId: "project-456",
        name: "Subtask",
        statusId: "status-todo",
        priorityId: "priority-low",
        parentTaskId: "parent-task-456",
        isSubtask: true,
        taskOrder: 1,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        createdBy: { id: "user-1", name: "John" },
        updatedBy: { id: "user-1", name: "John" },
      }

      expect(validateTask(subtask)).toBe(true)
    })
  })

  describe("Project Schema", () => {
    let validateProject: Ajv.ValidateFunction

    beforeAll(() => {
      validateProject = ajv.compile(projectSchemaLiteral)
    })

    it("should validate a complete valid project", () => {
      const validProject = {
        id: "proj-123",
        name: "E-commerce Platform",
        logo: "logo.png",
        status: "started",
        description: "Building a modern e-commerce platform",
        orgId: "org-456",
        company: "Tech Corp",
        startDate: Date.now(),
        endDate: Date.now() + 7776000000, // 90 days later
        budget: 50000,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        createdBy: "user-1",
        updatedBy: "user-1",
      }

      expect(validateProject(validProject)).toBe(true)
    })

    it("should validate project with null dates", () => {
      const projectWithNullDates = {
        id: "proj-123",
        name: "Ongoing Project",
        orgId: "org-456",
        company: "Tech Corp",
        status: "started",
        description: "Project description",
        startDate: null,
        endDate: null,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        createdBy: "user-1",
        updatedBy: "user-1",
      }

      expect(validateProject(projectWithNullDates)).toBe(true)
    })

    it("should reject project with invalid status", () => {
      const invalidProject = {
        id: "proj-123",
        name: "Test Project",
        orgId: "org-456",
        company: "Tech Corp",
        status: "invalid-status", // Invalid status
        description: "Test",
        createdAt: Date.now(),
        updatedAt: Date.now(),
        createdBy: "user-1",
        updatedBy: "user-1",
      }

      expect(validateProject(invalidProject)).toBe(false)
    })
  })

  describe("Dashboard Schema", () => {
    let validateDashboard: Ajv.ValidateFunction

    beforeAll(() => {
      validateDashboard = ajv.compile(dashboardSchemaLiteral)
    })

    it("should validate a valid dashboard", () => {
      const validDashboard = {
        id: "dash-123",
        dashboardId: "dashboard-456",
        dashboardName: "Project Overview",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-02T00:00:00Z",
        createdBy: "user-1",
        updatedBy: "user-1",
      }

      expect(validateDashboard(validDashboard)).toBe(true)
    })

    it("should validate dashboard with only required fields", () => {
      const minimalDashboard = {
        dashboardId: "dashboard-456",
        dashboardName: "Simple Dashboard",
      }

      expect(validateDashboard(minimalDashboard)).toBe(true)
    })
  })

  describe("Dashboard Template Schema", () => {
    let validateDashboardTemplate: Ajv.ValidateFunction

    beforeAll(() => {
      validateDashboardTemplate = ajv.compile(dashboardTemplateSchemaLiteral)
    })

    it("should validate a complete dashboard template", () => {
      const validTemplate = {
        id: "template-123",
        isActive: true,
        templateName: "Project Dashboard Template",
        dashboardLink: "https://dashboard.example.com",
        tags: ["project", "overview", "charts"],
        mainLayouts: {
          lg: [
            {
              w: 6,
              h: 4,
              x: 0,
              y: 0,
              i: "widget-1",
              componentName: "TaskChart",
            },
          ],
          md: [
            {
              w: 4,
              h: 3,
              x: 0,
              y: 0,
              i: "widget-1",
              componentName: "TaskChart",
            },
          ],
          sm: [
            {
              w: 3,
              h: 3,
              x: 0,
              y: 0,
              i: "widget-1",
              componentName: "TaskChart",
            },
          ],
          xs: [
            {
              w: 2,
              h: 2,
              x: 0,
              y: 0,
              i: "widget-1",
              componentName: "TaskChart",
            },
          ],
          xxs: [
            {
              w: 1,
              h: 2,
              x: 0,
              y: 0,
              i: "widget-1",
              componentName: "TaskChart",
            },
          ],
        },
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }

      expect(validateDashboardTemplate(validTemplate)).toBe(true)
    })

    it("should reject template with missing required layout breakpoints", () => {
      const invalidTemplate = {
        id: "template-123",
        templateName: "Incomplete Template",
        dashboardLink: "https://example.com",
        tags: ["test"],
        mainLayouts: {
          lg: [], // Missing other breakpoints (md, sm, xs, xxs)
        },
      }

      expect(validateDashboardTemplate(invalidTemplate)).toBe(false)
    })
  })
})
