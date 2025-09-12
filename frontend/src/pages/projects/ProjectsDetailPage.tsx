import { useEffect, useState } from 'react'
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom'
import { useBackend } from '../../services/backend/BackendProvider'
import type { Project } from '../../services/backend/BackendService'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

export default function ProjectsDetailPage() {
  const backend = useBackend()
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [project, setProject] = useState<Project | null>(null)

  useEffect(() => {
    let mounted = true
    backend.getProjectById(id!).then((p) => { if (mounted) setProject(p) }).catch((e) => setError(String(e))).finally(() => setLoading(false))
    return () => { mounted = false }
  }, [backend, id])

  if (loading) return <Typography>Loading...</Typography>
  if (error) return <Typography color="error">{error}</Typography>
  if (!project) return <Typography>Not found</Typography>

  return (
    <Box sx={{ display: 'grid', gap: 2, maxWidth: 640 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>{project.name}</Typography>
          <Typography color="text.secondary">Description: {project.description ?? '-'}</Typography>
          <Typography color="text.secondary">ID: {project.id}</Typography>
        </CardContent>
      </Card>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button variant="contained" component={RouterLink} to={`/projects/${project.id}/edit`}>Edit</Button>
        <Button variant="outlined" onClick={async () => { await backend.deleteProject(project.id); navigate('/projects') }}>Delete</Button>
        <Button variant="text" onClick={() => navigate(-1)}>Back</Button>
      </Box>
    </Box>
  )
}


