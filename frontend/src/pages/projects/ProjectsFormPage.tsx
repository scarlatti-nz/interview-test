import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useBackend } from '../../services/backend/BackendProvider'
import type { CreateProjectInput, UpdateProjectInput, Project } from '../../services/backend/BackendService'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

export default function ProjectsFormPage() {
  const backend = useBackend()
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = Boolean(id)

  const [loading, setLoading] = useState(isEdit)
  const [error, setError] = useState<string | null>(null)
  const [values, setValues] = useState<Partial<Project>>({ name: '', description: '' })

  useEffect(() => {
    if (!isEdit) return
    let mounted = true
    backend.getProjectById(id!).then((p) => {
      if (!p) setError('Not found')
      else if (mounted) setValues(p)
    }).catch((e) => setError(String(e))).finally(() => setLoading(false))
    return () => { mounted = false }
  }, [backend, id, isEdit])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      if (isEdit) {
        const input: UpdateProjectInput = { name: values.name!.trim(), description: values.description || undefined, ownerId: values.ownerId }
        await backend.updateProject(id!, input)
        navigate(`/projects/${id}`)
      } else {
        const input: CreateProjectInput = { name: values.name!.trim(), description: values.description || undefined, ownerId: values.ownerId }
        const created = await backend.createProject(input)
        navigate(`/projects/${created.id}`)
      }
    } catch (err) {
      setError(String(err))
    }
  }

  if (loading) return <Typography>Loading...</Typography>

  return (
    <Box component="form" onSubmit={onSubmit} sx={{ maxWidth: 480, display: 'grid', gap: 2 }}>
      <Typography variant="h5">{isEdit ? 'Edit project' : 'Create project'}</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField label="Name" value={values.name ?? ''} onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))} required />
      <TextField label="Description" value={values.description ?? ''} onChange={(e) => setValues((v) => ({ ...v, description: e.target.value }))} />
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button type="submit" variant="contained">{isEdit ? 'Save' : 'Create'}</Button>
        <Button variant="text" onClick={() => navigate(-1)}>Cancel</Button>
      </Box>
    </Box>
  )
}


