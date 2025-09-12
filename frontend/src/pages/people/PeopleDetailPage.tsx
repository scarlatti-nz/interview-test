import { useEffect, useState } from 'react'
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom'
import { useBackend } from '../../services/backend/BackendProvider'
import type { Person } from '../../services/backend/BackendService'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

export default function PeopleDetailPage() {
  const backend = useBackend()
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [person, setPerson] = useState<Person | null>(null)

  useEffect(() => {
    let mounted = true
    backend.getPersonById(id!).then((p) => {
      if (mounted) setPerson(p)
    }).catch((e) => setError(String(e))).finally(() => setLoading(false))
    return () => { mounted = false }
  }, [backend, id])

  if (loading) return <Typography>Loading...</Typography>
  if (error) return <Typography color="error">{error}</Typography>
  if (!person) return <Typography>Not found</Typography>

  return (
    <Box sx={{ display: 'grid', gap: 2, maxWidth: 640 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>{person.name}</Typography>
          <Typography color="text.secondary">Email: {person.email ?? '-'}</Typography>
          <Typography color="text.secondary">ID: {person.id}</Typography>
        </CardContent>
      </Card>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button variant="contained" component={RouterLink} to={`/people/${person.id}/edit`}>Edit</Button>
        <Button variant="outlined" onClick={async () => { await backend.deletePerson(person.id); navigate('/people') }}>Delete</Button>
        <Button variant="text" onClick={() => navigate(-1)}>Back</Button>
      </Box>
    </Box>
  )
}


