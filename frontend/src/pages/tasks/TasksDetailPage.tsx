import { useEffect, useState } from 'react'
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom'
import { useBackend } from '../../services/backend/BackendProvider'
import type { Task } from '../../services/backend/BackendService'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

export default function TasksDetailPage() {
  const backend = useBackend()
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [task, setTask] = useState<Task | null>(null)

  useEffect(() => {
    let mounted = true
    backend.getTaskById(id!).then((t) => { if (mounted) setTask(t) }).catch((e) => setError(String(e))).finally(() => setLoading(false))
    return () => { mounted = false }
  }, [backend, id])

  if (loading) return <Typography>Loading...</Typography>
  if (error) return <Typography color="error">{error}</Typography>
  if (!task) return <Typography>Not found</Typography>

  return (
    <Box sx={{ display: 'grid', gap: 2, maxWidth: 640 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>{task.title}</Typography>
          <Typography color="text.secondary">Status: {task.status}</Typography>
          <Typography color="text.secondary">ID: {task.id}</Typography>
        </CardContent>
      </Card>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button variant="contained" component={RouterLink} to={`/tasks/${task.id}/edit`}>Edit</Button>
        <Button variant="outlined" onClick={async () => { await backend.deleteTask(task.id); navigate('/tasks') }}>Delete</Button>
        <Button variant="text" onClick={() => navigate(-1)}>Back</Button>
      </Box>
    </Box>
  )
}


