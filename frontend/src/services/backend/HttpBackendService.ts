import {
  BackendService,
  type CreatePersonInput,
  type UpdatePersonInput,
  type CreateProjectInput,
  type UpdateProjectInput,
  type CreateTaskInput,
  type UpdateTaskInput,
  type Person,
  type Project,
  type Task,
  type EntityId,
} from './BackendService'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export class HttpBackendService extends BackendService {
  constructor(private readonly baseUrl: string = '') {
    super()
  }

  private async request<T>(path: string, options: { method?: HttpMethod; body?: unknown } = {}): Promise<T> {
    const url = `${this.baseUrl}${path}`
    const res = await fetch(url, {
      method: options.method ?? 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
      credentials: 'include',
    })
    if (!res.ok) {
      const text = await res.text().catch(() => '')
      throw new Error(`Request failed: ${res.status} ${res.statusText}${text ? ` - ${text}` : ''}`)
    }
    if (res.status === 204) {
      return undefined as unknown as T
    }
    return (await res.json()) as T
  }

  // People
  createPerson(input: CreatePersonInput): Promise<Person> {
    return this.request<Person>('/api/people', { method: 'POST', body: input })
  }
  listPeople(): Promise<Person[]> {
    return this.request<Person[]>('/api/people')
  }
  getPersonById(personId: EntityId): Promise<Person | null> {
    return this.request<Person>(`/api/people/${personId}`)
  }
  updatePerson(personId: EntityId, input: UpdatePersonInput): Promise<Person> {
    return this.request<Person>(`/api/people/${personId}`, { method: 'PUT', body: input })
  }
  patchPerson(personId: EntityId, input: Partial<UpdatePersonInput>): Promise<Person> {
    return this.request<Person>(`/api/people/${personId}`, { method: 'PATCH', body: input })
  }
  deletePerson(personId: EntityId): Promise<void> {
    return this.request<void>(`/api/people/${personId}`, { method: 'DELETE' })
  }

  // Projects
  createProject(input: CreateProjectInput): Promise<Project> {
    return this.request<Project>('/api/projects', { method: 'POST', body: input })
  }
  listProjects(): Promise<Project[]> {
    return this.request<Project[]>('/api/projects')
  }
  getProjectById(projectId: EntityId): Promise<Project | null> {
    return this.request<Project>(`/api/projects/${projectId}`)
  }
  updateProject(projectId: EntityId, input: UpdateProjectInput): Promise<Project> {
    return this.request<Project>(`/api/projects/${projectId}`, { method: 'PUT', body: input })
  }
  patchProject(projectId: EntityId, input: Partial<UpdateProjectInput>): Promise<Project> {
    return this.request<Project>(`/api/projects/${projectId}`, { method: 'PATCH', body: input })
  }
  deleteProject(projectId: EntityId): Promise<void> {
    return this.request<void>(`/api/projects/${projectId}`, { method: 'DELETE' })
  }

  // Tasks
  createTask(input: CreateTaskInput): Promise<Task> {
    return this.request<Task>('/api/tasks', { method: 'POST', body: input })
  }
  listTasks(): Promise<Task[]> {
    return this.request<Task[]>('/api/tasks')
  }
  getTaskById(taskId: EntityId): Promise<Task | null> {
    return this.request<Task>(`/api/tasks/${taskId}`)
  }
  updateTask(taskId: EntityId, input: UpdateTaskInput): Promise<Task> {
    return this.request<Task>(`/api/tasks/${taskId}`, { method: 'PUT', body: input })
  }
  patchTask(taskId: EntityId, input: Partial<UpdateTaskInput>): Promise<Task> {
    return this.request<Task>(`/api/tasks/${taskId}`, { method: 'PATCH', body: input })
  }
  deleteTask(taskId: EntityId): Promise<void> {
    return this.request<void>(`/api/tasks/${taskId}`, { method: 'DELETE' })
  }
}


