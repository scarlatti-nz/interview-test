import { Router, type Request } from 'express'
import type {
  DatabaseService,
  CreateProjectInput,
  UpdateProjectInput,
} from '../services/database/DatabaseService.js'

const router = Router()

function getDb(req: Request): DatabaseService {
  return req.app.locals.db as DatabaseService
}

// Create
router.post('/', async (req, res) => {
  const db = getDb(req)
  const body = req.body as Partial<CreateProjectInput>
  if (!body || typeof body.name !== 'string' || body.name.trim().length === 0) {
    return res.status(400).json({ message: 'name is required' })
  }
  const created = await db.createProject({
    name: body.name.trim(),
    description: body.description,
    ownerId: body.ownerId,
  })
  res.status(201).json(created)
})

// Read all
router.get('/', async (req, res) => {
  const db = getDb(req)
  const list = await db.listProjects()
  res.json(list)
})

// Read one
router.get('/:id', async (req, res) => {
  const db = getDb(req)
  const one = await db.getProjectById(req.params.id)
  if (!one) return res.status(404).json({ message: 'Not found' })
  res.json(one)
})

// Update (replace)
router.put('/:id', async (req, res) => {
  const db = getDb(req)
  const body = req.body as Partial<UpdateProjectInput>
  if (!body || typeof body.name !== 'string' || body.name.trim().length === 0) {
    return res.status(400).json({ message: 'name is required' })
  }
  try {
    const updated = await db.updateProject(req.params.id, {
      name: body.name.trim(),
      description: body.description,
      ownerId: body.ownerId,
    })
    res.json(updated)
  } catch {
    res.status(404).json({ message: 'Not found' })
  }
})

// Partial update
router.patch('/:id', async (req, res) => {
  const db = getDb(req)
  const body = req.body as Partial<UpdateProjectInput>
  try {
    const updated = await db.patchProject(req.params.id, body)
    res.json(updated)
  } catch {
    res.status(404).json({ message: 'Not found' })
  }
})

// Delete
router.delete('/:id', async (req, res) => {
  const db = getDb(req)
  await db.deleteProject(req.params.id)
  res.status(204).send()
})

export default router


