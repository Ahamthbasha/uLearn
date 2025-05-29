import { Routes,Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'


import StudentRouter from './routes/StudentRouter'

const App = () => {
  return (
    <>
    <ToastContainer />
    <Routes>
      <Route path='/*' element={<StudentRouter />}/>
    </Routes>
    </>
  )
}

export default App
