import 'dotenv/config'
import express, { type Request, type Response, type NextFunction } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { createInMemoryDatabaseService } from './services/database/InMemoryDatabaseService.js'

const app = express()

app.use(helmet())
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }))
app.use(express.json())

const api = express.Router()

api.get('/health', async (_req, res) => {
  res.json({ ok: true })
})

// Routers
import peopleRouter from './routes/people.js'
import projectsRouter from './routes/projects.js'
import tasksRouter from './routes/tasks.js'

api.use('/people', peopleRouter)
api.use('/projects', projectsRouter)
api.use('/tasks', tasksRouter)

app.use('/api', api)

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Not found' })
})

// Error handler
// Express 5 handles async errors; this centralizes the response shape
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  const isProd = process.env.NODE_ENV === 'production'
  const status = typeof (err as any)?.status === 'number' ? (err as any).status : 500
  const message = status === 500 ? 'Internal server error' : (err as any)?.message || 'Error'
  const body: Record<string, unknown> = { message }
  if (!isProd && err && typeof err === 'object') {
    body.stack = (err as any).stack
  }
  res.status(status).json(body)
})

const port = Number(process.env.PORT ?? 3000)
app.listen(port, () => {
  const db = createInMemoryDatabaseService()
  // Persistent reference to prevent accidental GC and to hint future DI usage
  Object.assign(app.locals, { db })
  console.log(`API on :${port}`)
})


