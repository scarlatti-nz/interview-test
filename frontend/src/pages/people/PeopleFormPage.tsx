import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useBackend } from '../../services/backend/BackendProvider'
import type { CreatePersonInput, UpdatePersonInput, Person } from '../../services/backend/BackendService'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

export default function PeopleFormPage() {
  const backend = useBackend()
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const isEdit = Boolean(id)
  const [loading, setLoading] = useState(isEdit)
  const [error, setError] = useState<string | null>(null)
  const [values, setValues] = useState<Partial<Person>>({ name: '', email: '' })

  useEffect(() => {
    if (!isEdit) return
    let mounted = true
    backend.getPersonById(id!).then((p) => {
      if (!p) {
        setError('Not found')
      } else if (mounted) {
        setValues(p)
      }
    }).catch((e) => setError(String(e))).finally(() => setLoading(false))
    return () => { mounted = false }
  }, [backend, id, isEdit])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      if (isEdit) {
        const input: UpdatePersonInput = { name: values.name!.trim(), email: values.email || undefined }
        await backend.updatePerson(id!, input)
        navigate(`/people/${id}`)
      } else {
        const input: CreatePersonInput = { name: values.name!.trim(), email: values.email || undefined }
        const created = await backend.createPerson(input)
        navigate(`/people/${created.id}`)
      }
    } catch (err) {
      setError(String(err))
    }
  }

  if (loading) return <Typography>Loading...</Typography>

  return (
    <Box component="form" onSubmit={onSubmit} sx={{ maxWidth: 480, display: 'grid', gap: 2 }}>
      <Typography variant="h5">{isEdit ? 'Edit person' : 'Create person'}</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField label="Name" value={values.name ?? ''} onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))} required />
      <TextField label="Email" value={values.email ?? ''} onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))} />
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button type="submit" variant="contained">{isEdit ? 'Save' : 'Create'}</Button>
        <Button variant="text" onClick={() => navigate(-1)}>Cancel</Button>
      </Box>
    </Box>
  )
}


