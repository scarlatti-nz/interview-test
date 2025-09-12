/**
 * Abstract database service that defines CRUD operations for core resources.
 *
 * Routes should depend on this interface so the underlying storage can be
 * swapped (in-memory, SQL, etc.) without changing route logic.
 */
export abstract class DatabaseService {
  // People
  /** Create a new person. */
  abstract createPerson(input: CreatePersonInput): Promise<Person>
  /** List all people. */
  abstract listPeople(): Promise<Person[]>
  /** Get a single person by id. */
  abstract getPersonById(personId: string): Promise<Person | null>
  /** Replace a person. */
  abstract updatePerson(personId: string, input: UpdatePersonInput): Promise<Person>
  /** Partially update a person. */
  abstract patchPerson(personId: string, input: Partial<UpdatePersonInput>): Promise<Person>
  /** Delete a person. */
  abstract deletePerson(personId: string): Promise<void>

  // Projects
  /** Create a new project. */
  abstract createProject(input: CreateProjectInput): Promise<Project>
  /** List all projects. */
  abstract listProjects(): Promise<Project[]>
  /** Get a single project by id. */
  abstract getProjectById(projectId: string): Promise<Project | null>
  /** Replace a project. */
  abstract updateProject(projectId: string, input: UpdateProjectInput): Promise<Project>
  /** Partially update a project. */
  abstract patchProject(projectId: string, input: Partial<UpdateProjectInput>): Promise<Project>
  /** Delete a project. */
  abstract deleteProject(projectId: string): Promise<void>

  // Tasks
  /** Create a new task. */
  abstract createTask(input: CreateTaskInput): Promise<Task>
  /** List all tasks. */
  abstract listTasks(): Promise<Task[]>
  /** Get a single task by id. */
  abstract getTaskById(taskId: string): Promise<Task | null>
  /** Replace a task. */
  abstract updateTask(taskId: string, input: UpdateTaskInput): Promise<Task>
  /** Partially update a task. */
  abstract patchTask(taskId: string, input: Partial<UpdateTaskInput>): Promise<Task>
  /** Delete a task. */
  abstract deleteTask(taskId: string): Promise<void>
}

// Types
export type EntityId = string

export interface BaseEntity {
  id: EntityId
  createdAt: Date
  updatedAt: Date
}

// People
export interface Person extends BaseEntity {
  name: string
  email?: string
}

export interface CreatePersonInput {
  name: string
  email?: string
}

export interface UpdatePersonInput {
  name: string
  email?: string
}

// Projects
export interface Project extends BaseEntity {
  name: string
  description?: string
  ownerId?: EntityId
}

export interface CreateProjectInput {
  name: string
  description?: string
  ownerId?: EntityId
}

export interface UpdateProjectInput {
  name: string
  description?: string
  ownerId?: EntityId
}

// Tasks
export type TaskStatus = 'todo' | 'in_progress' | 'done'

export interface Task extends BaseEntity {
  title: string
  description?: string
  status: TaskStatus
  projectId?: EntityId
  assigneeId?: EntityId
}

export interface CreateTaskInput {
  title: string
  description?: string
  status?: TaskStatus
  projectId?: EntityId
  assigneeId?: EntityId
}

export interface UpdateTaskInput {
  title: string
  description?: string
  status: TaskStatus
  projectId?: EntityId
  assigneeId?: EntityId
}


