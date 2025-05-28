import { Routes,Route } from 'react-router-dom'

import StudentRouter from './routes/StudentRouter'

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/*' element={<StudentRouter />}/>
    </Routes>
    </>
  )
}

export default App
