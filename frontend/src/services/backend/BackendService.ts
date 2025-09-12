export type EntityId = string

export interface Person {
  id: EntityId
  name: string
  email?: string
  createdAt: string
  updatedAt: string
}

export interface CreatePersonInput {
  name: string
  email?: string
}

export interface UpdatePersonInput {
  name: string
  email?: string
}

export interface Project {
  id: EntityId
  name: string
  description?: string
  ownerId?: EntityId
  createdAt: string
  updatedAt: string
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

export type TaskStatus = 'todo' | 'in_progress' | 'done'

export interface Task {
  id: EntityId
  title: string
  description?: string
  status: TaskStatus
  projectId?: EntityId
  assigneeId?: EntityId
  createdAt: string
  updatedAt: string
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

export abstract class BackendService {
  // People
  abstract createPerson(input: CreatePersonInput): Promise<Person>
  abstract listPeople(): Promise<Person[]>
  abstract getPersonById(personId: EntityId): Promise<Person | null>
  abstract updatePerson(personId: EntityId, input: UpdatePersonInput): Promise<Person>
  abstract patchPerson(personId: EntityId, input: Partial<UpdatePersonInput>): Promise<Person>
  abstract deletePerson(personId: EntityId): Promise<void>

  // Projects
  abstract createProject(input: CreateProjectInput): Promise<Project>
  abstract listProjects(): Promise<Project[]>
  abstract getProjectById(projectId: EntityId): Promise<Project | null>
  abstract updateProject(projectId: EntityId, input: UpdateProjectInput): Promise<Project>
  abstract patchProject(projectId: EntityId, input: Partial<UpdateProjectInput>): Promise<Project>
  abstract deleteProject(projectId: EntityId): Promise<void>

  // Tasks
  abstract createTask(input: CreateTaskInput): Promise<Task>
  abstract listTasks(): Promise<Task[]>
  abstract getTaskById(taskId: EntityId): Promise<Task | null>
  abstract updateTask(taskId: EntityId, input: UpdateTaskInput): Promise<Task>
  abstract patchTask(taskId: EntityId, input: Partial<UpdateTaskInput>): Promise<Task>
  abstract deleteTask(taskId: EntityId): Promise<void>
}


