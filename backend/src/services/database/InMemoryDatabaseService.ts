import { randomUUID } from 'crypto'
import {
  DatabaseService,
  Person,
  Project,
  Task,
  CreatePersonInput,
  UpdatePersonInput,
  CreateProjectInput,
  UpdateProjectInput,
  CreateTaskInput,
  UpdateTaskInput,
} from './DatabaseService.js'

/**
 * Simple in-memory implementation of DatabaseService.
 * Not intended for production; state resets on process restart.
 */
export class InMemoryDatabaseService extends DatabaseService {
  private peopleById: Map<string, Person> = new Map()
  private projectsById: Map<string, Project> = new Map()
  private tasksById: Map<string, Task> = new Map()

  // People
  async createPerson(input: CreatePersonInput): Promise<Person> {
    const now = new Date()
    const person: Person = {
      id: randomUUID(),
      name: input.name,
      email: input.email,
      createdAt: now,
      updatedAt: now,
    }
    this.peopleById.set(person.id, person)
    return person
  }

  async listPeople(): Promise<Person[]> {
    return Array.from(this.peopleById.values())
  }

  async getPersonById(personId: string): Promise<Person | null> {
    return this.peopleById.get(personId) ?? null
  }

  async updatePerson(personId: string, input: UpdatePersonInput): Promise<Person> {
    const existing = this.peopleById.get(personId)
    if (!existing) {
      throw new Error('Person not found')
    }
    const updated: Person = {
      ...existing,
      name: input.name,
      email: input.email,
      updatedAt: new Date(),
    }
    this.peopleById.set(personId, updated)
    return updated
  }

  async patchPerson(personId: string, input: Partial<UpdatePersonInput>): Promise<Person> {
    const existing = this.peopleById.get(personId)
    if (!existing) {
      throw new Error('Person not found')
    }
    const updated: Person = {
      ...existing,
      ...input,
      updatedAt: new Date(),
    }
    this.peopleById.set(personId, updated)
    return updated
  }

  async deletePerson(personId: string): Promise<void> {
    this.peopleById.delete(personId)
  }

  // Projects
  async createProject(input: CreateProjectInput): Promise<Project> {
    const now = new Date()
    const project: Project = {
      id: randomUUID(),
      name: input.name,
      description: input.description,
      ownerId: input.ownerId,
      createdAt: now,
      updatedAt: now,
    }
    this.projectsById.set(project.id, project)
    return project
  }

  async listProjects(): Promise<Project[]> {
    return Array.from(this.projectsById.values())
  }

  async getProjectById(projectId: string): Promise<Project | null> {
    return this.projectsById.get(projectId) ?? null
  }

  async updateProject(projectId: string, input: UpdateProjectInput): Promise<Project> {
    const existing = this.projectsById.get(projectId)
    if (!existing) {
      throw new Error('Project not found')
    }
    const updated: Project = {
      ...existing,
      name: input.name,
      description: input.description,
      ownerId: input.ownerId,
      updatedAt: new Date(),
    }
    this.projectsById.set(projectId, updated)
    return updated
  }

  async patchProject(projectId: string, input: Partial<UpdateProjectInput>): Promise<Project> {
    const existing = this.projectsById.get(projectId)
    if (!existing) {
      throw new Error('Project not found')
    }
    const updated: Project = {
      ...existing,
      ...input,
      updatedAt: new Date(),
    }
    this.projectsById.set(projectId, updated)
    return updated
  }

  async deleteProject(projectId: string): Promise<void> {
    this.projectsById.delete(projectId)
  }

  // Tasks
  async createTask(input: CreateTaskInput): Promise<Task> {
    const now = new Date()
    const task: Task = {
      id: randomUUID(),
      title: input.title,
      description: input.description,
      status: input.status ?? 'todo',
      projectId: input.projectId,
      assigneeId: input.assigneeId,
      createdAt: now,
      updatedAt: now,
    }
    this.tasksById.set(task.id, task)
    return task
  }

  async listTasks(): Promise<Task[]> {
    return Array.from(this.tasksById.values())
  }

  async getTaskById(taskId: string): Promise<Task | null> {
    return this.tasksById.get(taskId) ?? null
  }

  async updateTask(taskId: string, input: UpdateTaskInput): Promise<Task> {
    const existing = this.tasksById.get(taskId)
    if (!existing) {
      throw new Error('Task not found')
    }
    const updated: Task = {
      ...existing,
      title: input.title,
      description: input.description,
      status: input.status,
      projectId: input.projectId,
      assigneeId: input.assigneeId,
      updatedAt: new Date(),
    }
    this.tasksById.set(taskId, updated)
    return updated
  }

  async patchTask(taskId: string, input: Partial<UpdateTaskInput>): Promise<Task> {
    const existing = this.tasksById.get(taskId)
    if (!existing) {
      throw new Error('Task not found')
    }
    const updated: Task = {
      ...existing,
      ...input,
      updatedAt: new Date(),
    }
    this.tasksById.set(taskId, updated)
    return updated
  }

  async deleteTask(taskId: string): Promise<void> {
    this.tasksById.delete(taskId)
  }
}

export function createInMemoryDatabaseService(): InMemoryDatabaseService {
  return new InMemoryDatabaseService()
}


