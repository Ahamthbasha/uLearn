import { Routes,Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import StudentRouter from './routes/StudentRouter'
import InstructorRouter from './routes/InstructorRouter'
import AdminRouter from './routes/AdminRouter'

const App = () => {
  return (
    <>
    <ToastContainer />
    <Routes>
      <Route path='/*' element={<StudentRouter />}/>
      <Route path='instructor/*' element={<InstructorRouter/>}/>
      <Route path='admin/*' element={<AdminRouter/>}/>
    </Routes>
    </>
  )
}

export default App