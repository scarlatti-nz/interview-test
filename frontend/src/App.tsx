import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import { BackendProvider } from './services/backend/BackendProvider'
import PeopleListPage from './pages/people/PeopleListPage'
import PeopleFormPage from './pages/people/PeopleFormPage'
import PeopleDetailPage from './pages/people/PeopleDetailPage'
import ProjectsListPage from './pages/projects/ProjectsListPage'
import ProjectsFormPage from './pages/projects/ProjectsFormPage'
import ProjectsDetailPage from './pages/projects/ProjectsDetailPage'
import TasksListPage from './pages/tasks/TasksListPage'
import TasksFormPage from './pages/tasks/TasksFormPage'
import TasksDetailPage from './pages/tasks/TasksDetailPage'

function App() {
  return (
    <BackendProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}> 
            <Route index element={<Navigate to="/people" replace />} />
            <Route path="/people" element={<PeopleListPage />} />
            <Route path="/people/new" element={<PeopleFormPage />} />
            <Route path="/people/:id" element={<PeopleDetailPage />} />
            <Route path="/people/:id/edit" element={<PeopleFormPage />} />

            <Route path="/projects" element={<ProjectsListPage />} />
            <Route path="/projects/new" element={<ProjectsFormPage />} />
            <Route path="/projects/:id" element={<ProjectsDetailPage />} />
            <Route path="/projects/:id/edit" element={<ProjectsFormPage />} />

            <Route path="/tasks" element={<TasksListPage />} />
            <Route path="/tasks/new" element={<TasksFormPage />} />
            <Route path="/tasks/:id" element={<TasksDetailPage />} />
            <Route path="/tasks/:id/edit" element={<TasksFormPage />} />

            <Route path="*" element={<div>Not Found</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </BackendProvider>
  )
}

export default App
