import { Routes,Route } from "react-router-dom"
import LoginPage from "../pages/admin/Auth/Login"
import Home from "../pages/admin/Home"
import AdminLayout from "../layouts/AdminLayout"
import AdminSessionRoute from "../Protecter/AdminSessionRoute"

const AdminRouter = () => {
  return (
    <Routes>
      <Route path='login' element={<AdminSessionRoute><LoginPage/></AdminSessionRoute>}/>
      <Route element={<AdminLayout/>}>
      <Route path='home' element={<Home/>}/>
      </Route>
    </Routes>
  )
}

export default AdminRouter