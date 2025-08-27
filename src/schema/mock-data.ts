import { nanoid } from "nanoid"
import type { TaskData } from "./tasks"

const now = Date.now()
export const mockTasks: TaskData[] = [
  {
    id: "mock-task-1",
    name: "Implement user authentication",
    description: "Add OAuth2 authentication with Google and GitHub providers",
    order: 1,
    projectId: "mock-project-1",
    status: "Todo",
    priority: "high",
    tags: ["backend", "security", "auth"],
    links: [
      {
        id: "ref-1",
        name: "Auth Implementation",
        type: "github",
        url: "https://github.com/example/auth-implementation",
      },
      {
        id: "ref-2",
        type: "figma",
        url: "https://figma.com/file/example/auth-flow",
        name: "Auth Flow Design",
      },
    ],
    attachments: [],
    acceptanceCriteria: [
      {
        id: "ac-1",
        name: "Users can sign in with Google",
        checked: false,
        order: 1,
      },
      {
        id: "ac-2",
        name: "Users can sign in with GitHub",
        checked: false,
        order: 2,
      },
      {
        id: "ac-3",
        name: "Session management is implemented",
        checked: false,
        order: 3,
      },
      {
        id: "ac-4",
        name: "Refresh tokens are handled properly",
        checked: false,
        order: 4,
      },
    ],
    startDate: +new Date("2025-01-15"),
    endDate: +new Date("2025-01-25"),
    createdBy: "user-1",
    updatedBy: "user-1",
    createdAt: +new Date("2025-01-10"),
    updatedAt: +new Date("2025-01-10"),
    completed: false,
    checkList: [
      {
        id: "check-1",
        name: "Setup OAuth providers",
        checked: true,
        order: 1,
      },
      {
        id: "check-2",
        name: "Implement login endpoints",
        checked: false,
        order: 2,
      },
      {
        id: "check-3",
        name: "Add session middleware",
        checked: false,
        order: 3,
      },
      { id: "check-4", name: "Write tests", checked: false, order: 4 },
    ],
  },
  {
    id: "mock-task-2",
    name: "Design dashboard UI",
    description: "Create responsive dashboard with analytics widgets",
    order: 2,
    projectId: "mock-project-1",
    status: "in-progress",
    priority: "priority-medium",
    tags: ["frontend", "ui", "design"],
    links: [
      {
        id: "ref-3",
        type: "figma",
        url: "https://figma.com/file/example/dashboard-design",
        name: "Dashboard Design",
      },
    ],
    attachments: [
      {
        id: "att-1",
        name: "dashboard-mockup.png",
        url: "/uploads/dashboard-mockup.png",
        size: 25000,
        type: "image/png",
      },
      {
        id: "att-2",
        name: "widget-components.sketch",
        url: "/uploads/widget-components.sketch",
        size: 25000,
        type: "application/sketch",
      },
    ],
    acceptanceCriteria: [
      {
        id: "ac-5",
        name: "Dashboard is responsive on mobile, tablet, and desktop",
        checked: false,
        order: 1,
      },
      {
        id: "ac-6",
        name: "Analytics widgets display real-time data",
        checked: false,
        order: 2,
      },
      { id: "ac-7", name: "Dark mode is supported", checked: false, order: 3 },
      {
        id: "ac-8",
        name: "Loading states are implemented",
        checked: false,
        order: 4,
      },
    ],
    startDate: +new Date("2025-01-20"),
    endDate: +new Date("2025-02-05"),
    createdBy: "user-2",
    updatedBy: "user-2",
    createdAt: +new Date("2025-01-12"),
    updatedAt: +new Date("2025-01-18"),
    completed: false,
    checkList: [
      { id: "check-5", name: "Create wireframes", checked: true, order: 1 },
      { id: "check-6", name: "Design components", checked: true, order: 2 },
      {
        id: "check-7",
        name: "Implement responsive layout",
        checked: false,
        order: 3,
      },
    ],
  },
  {
    id: "mock-task-3",
    name: "API rate limiting",
    description: "Implement rate limiting for all API endpoints",
    order: 3,
    projectId: "mock-project-2",
    status: "done",
    priority: "low",
    tags: ["backend", "performance", "security"],
    links: [],
    attachments: [],
    acceptanceCriteria: [
      {
        id: "ac-9",
        name: "Rate limits are configurable per endpoint",
        checked: true,
        order: 1,
      },
      {
        id: "ac-10",
        name: "Redis is used for distributed rate limiting",
        checked: true,
        order: 2,
      },
      {
        id: "ac-11",
        name: "Clear error messages for rate limit exceeded",
        checked: true,
        order: 3,
      },
    ],
    startDate: +new Date("2025-05-01"),
    endDate: +new Date("2025-05-01"),
    createdBy: "user-1",
    updatedBy: "user-3",
    createdAt: +new Date("2025-04-01"),
    updatedAt: +new Date("2025-04-01"),
    completed: true,
    checkList: [],
  },
]

export const mockProjects = [
  {
    id: "mock-project-1",
    name: "E-commerce Platform",
    description: "Modern e-commerce platform with AI recommendations",
  },
  {
    id: "mock-project-2",
    name: "API Infrastructure",
    description: "Core API infrastructure improvements",
  },
]

export const mockLabels = [
  { id: "status-todo", name: "To Do", type: "status", color: "#808080" },
  {
    id: "status-in-progress",
    name: "In Progress",
    type: "status",
    color: "#0066CC",
  },
  { id: "done", name: "Done", type: "status", color: "#00AA00" },
  { id: "low", name: "Low", type: "priority", color: "#00AA00" },
  { id: "medium", name: "Medium", type: "priority", color: "#FFA500" },
  { id: "high", name: "High", type: "priority", color: "#FF0000" },
]

export const mockTaskAssignments = [
  { taskId: "mock-task-1", userId: "user-2" },
  { taskId: "mock-task-1", userId: "user-3" },
  { taskId: "mock-task-2", userId: "user-1" },
  { taskId: "mock-task-3", userId: "user-1" },
]

export const mockUsers = [
  {
    id: "user-1",
    name: "Alice Johnson",
    email: "alice@example.com",
    src: "https://i.pravatar.cc/150?img=1",
    color: "pink",
  },
  {
    id: "user-2",
    name: "Bob Smith",
    email: "bob@example.com",
    src: "https://i.pravatar.cc/150?img=2",
    color: "blue",
  },
  {
    id: "user-3",
    name: "Charlie Brown",
    email: "charlie@example.com",
    src: "https://i.pravatar.cc/150?img=3",
    color: "green",
  },
]

export function generateMockTask(data?: Partial<TaskData>): TaskData {
  const id = data?.id || `mock-${nanoid(7)}`

  return {
    id,
    name: data?.name || "Mock Task",
    description: data?.description || "This is a mock task for testing",
    order: data?.order || 1,
    projectId: data?.projectId || "mock-project-1",
    status: data?.status || "todo",
    priority: data?.priority || "medium",
    parentTaskId: data?.parentTaskId,
    tags: data?.tags || ["mock", "tag"],
    links: data?.links || [],
    attachments: data?.attachments || [],
    acceptanceCriteria: data?.acceptanceCriteria || [
      {
        id: "ac-mock",
        name: "Mock acceptance criteria",
        checked: false,
        order: 1,
      },
    ],
    startDate: data?.startDate ?? now,
    endDate: data?.endDate ?? now,
    createdBy: data?.createdBy || "user-1",
    updatedBy: data?.updatedBy || "user-1",
    createdAt: data?.createdAt ?? now,
    updatedAt: data?.updatedAt ?? now,
    completed: data?.completed || false,
    checkList: data?.checkList || [],
  }
}

export function getMockTaskWithAssignments(taskId: string) {
  const task = mockTasks.find((t) => t.id === taskId)
  if (!task) return null

  const assignments = mockTaskAssignments
    .filter((a) => a.taskId === taskId)
    .map((a) => {
      const user = mockUsers.find((u) => u.id === a.userId)
      return user
    })
    .filter(Boolean)

  return {
    ...task,
    assignedTo: assignments,
    comments: [],
  }
}

export function getAllMockTasksWithAssignments() {
  return mockTasks
    .map((task) => getMockTaskWithAssignments(task.id))
    .filter(Boolean)
}
