import { useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useBackend } from '../../services/backend/BackendProvider'
import type { Task } from '../../services/backend/BackendService'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'

export default function TasksListPage() {
  const backend = useBackend()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    let mounted = true
    backend
      .listTasks()
      .then((data) => { if (mounted) setTasks(data) })
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false))
    return () => { mounted = false }
  }, [backend])

  if (loading) return <CircularProgress />
  if (error) return <Typography color="error">{error}</Typography>

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">Tasks</Typography>
        <Button variant="contained" component={RouterLink} to="/tasks/new">Create</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((t) => (
              <TableRow key={t.id} hover>
                <TableCell>{t.title}</TableCell>
                <TableCell>{t.status}</TableCell>
                <TableCell align="right">
                  <Button size="small" component={RouterLink} to={`/tasks/${t.id}`}>View</Button>
                  <Button size="small" component={RouterLink} to={`/tasks/${t.id}/edit`}>Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {tasks.length === 0 && (
        <Typography sx={{ mt: 2 }} color="text.secondary">No tasks yet. Create one to get started.</Typography>
      )}
    </Box>
  )
}


