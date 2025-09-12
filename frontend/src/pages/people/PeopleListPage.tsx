import { useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useBackend } from '../../services/backend/BackendProvider'
import type { Person } from '../../services/backend/BackendService'
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

export default function PeopleListPage() {
  const backend = useBackend()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [people, setPeople] = useState<Person[]>([])

  useEffect(() => {
    let mounted = true
    backend
      .listPeople()
      .then((data) => {
        if (mounted) setPeople(data)
      })
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false))
    return () => {
      mounted = false
    }
  }, [backend])

  if (loading) return <CircularProgress />
  if (error) return <Typography color="error">{error}</Typography>

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">People</Typography>
        <Button variant="contained" component={RouterLink} to="/people/new">Create</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {people.map((p) => (
              <TableRow key={p.id} hover>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.email ?? '-'}</TableCell>
                <TableCell align="right">
                  <Button size="small" component={RouterLink} to={`/people/${p.id}`}>View</Button>
                  <Button size="small" component={RouterLink} to={`/people/${p.id}/edit`}>Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {people.length === 0 && (
        <Typography sx={{ mt: 2 }} color="text.secondary">No people yet. Create one to get started.</Typography>
      )}
    </Box>
  )
}


