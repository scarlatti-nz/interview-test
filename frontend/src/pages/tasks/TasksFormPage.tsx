import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useBackend } from '../../services/backend/BackendProvider'
import type { CreateTaskInput, UpdateTaskInput, Task, TaskStatus } from '../../services/backend/BackendService'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

const statuses: TaskStatus[] = ['todo', 'in_progress', 'done']

export default function TasksFormPage() {
  const backend = useBackend()
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = Boolean(id)

  const [loading, setLoading] = useState(isEdit)
  const [error, setError] = useState<string | null>(null)
  const [values, setValues] = useState<Partial<Task>>({ title: '', description: '', status: 'todo' })

  useEffect(() => {
    if (!isEdit) return
    let mounted = true
    backend.getTaskById(id!).then((t) => {
      if (!t) setError('Not found')
      else if (mounted) setValues(t)
    }).catch((e) => setError(String(e))).finally(() => setLoading(false))
    return () => { mounted = false }
  }, [backend, id, isEdit])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      if (isEdit) {
        const input: UpdateTaskInput = {
          title: values.title!.trim(),
          description: values.description || undefined,
          status: values.status as TaskStatus,
          projectId: values.projectId,
          assigneeId: values.assigneeId,
        }
        await backend.updateTask(id!, input)
        navigate(`/tasks/${id}`)
      } else {
        const input: CreateTaskInput = {
          title: values.title!.trim(),
          description: values.description || undefined,
          status: values.status as TaskStatus,
          projectId: values.projectId,
          assigneeId: values.assigneeId,
        }
        const created = await backend.createTask(input)
        navigate(`/tasks/${created.id}`)
      }
    } catch (err) {
      setError(String(err))
    }
  }

  if (loading) return <Typography>Loading...</Typography>

  return (
    <Box component="form" onSubmit={onSubmit} sx={{ maxWidth: 480, display: 'grid', gap: 2 }}>
      <Typography variant="h5">{isEdit ? 'Edit task' : 'Create task'}</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField label="Title" value={values.title ?? ''} onChange={(e) => setValues((v) => ({ ...v, title: e.target.value }))} required />
      <TextField label="Description" value={values.description ?? ''} onChange={(e) => setValues((v) => ({ ...v, description: e.target.value }))} />
      <TextField select label="Status" value={values.status ?? 'todo'} onChange={(e) => setValues((v) => ({ ...v, status: e.target.value as TaskStatus }))}>
        {statuses.map((s) => (<MenuItem key={s} value={s}>{s}</MenuItem>))}
      </TextField>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button type="submit" variant="contained">{isEdit ? 'Save' : 'Create'}</Button>
        <Button variant="text" onClick={() => navigate(-1)}>Cancel</Button>
      </Box>
    </Box>
  )
}


