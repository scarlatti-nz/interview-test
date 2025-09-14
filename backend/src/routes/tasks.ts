import { Router, type Request } from 'express'
import type {
  DatabaseService,
  CreateTaskInput,
  UpdateTaskInput,
} from '../services/database/DatabaseService.js'

const router = Router()

function getDb(req: Request): DatabaseService {
  return req.app.locals.db as DatabaseService
}

// Create
router.post('/', async (req, res) => {
  const db = getDb(req)
  const body = req.body as Partial<CreateTaskInput>
  if (!body || typeof body.title !== 'string' || body.title.trim().length === 0) {
    return res.status(400).json({ message: 'title is required' })
  }
  const created = await db.createTask({
    title: body.title.trim(),
    description: body.description,
    status: body.status,
    projectId: body.projectId,
    assigneeId: body.assigneeId,
  })
  res.status(201).json(created)
})

// Read all
router.get('/', async (req, res) => {
  const db = getDb(req)
  const list = await db.listTasks()
  res.json(list)
})

// Read one
router.get('/:id', async (req, res) => {
  const db = getDb(req)
  const one = await db.getTaskById(req.params.id)
  if (!one) return res.status(404).json({ message: 'Not found' })
  res.json(one)
})

// Update (replace)
router.put('/:id', async (req, res) => {
  const db = getDb(req)
  const body = req.body as Partial<UpdateTaskInput>
  if (!body || typeof body.title !== 'string' || body.title.trim().length === 0 || typeof body.status !== 'string') {
    return res.status(400).json({ message: 'title and status are required' })
  }
  try {
    const updated = await db.updateTask(req.params.id, {
      title: body.title.trim(),
      description: body.description,
      status: body.status,
      projectId: body.projectId,
      assigneeId: body.assigneeId,
    })
    res.json(updated)
  } catch {
    res.status(404).json({ message: 'Not found' })
  }
})

// Partial update
router.patch('/:id', async (req, res) => {
  const db = getDb(req)
  const body = req.body as Partial<UpdateTaskInput>
  try {
    const updated = await db.updateTask(req.params.id, body as UpdateTaskInput)
    res.json(updated)
  } catch {
    res.status(404).json({ message: 'Not found' })
  }
})

// Delete
router.delete('/:id', async (req, res) => {
  const db = getDb(req)
  await db.deleteTask(req.params.id)
  res.status(204).send()
})

export default router


