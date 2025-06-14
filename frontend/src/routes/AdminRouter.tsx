import { Routes,Route } from "react-router-dom"
import LoginPage from "../pages/admin/Auth/Login"
import Home from "../pages/admin/Home"
import AdminLayout from "../layouts/AdminLayout"
import AdminSessionRoute from "../Protecter/AdminSessionRoute"
import UserList from "../pages/admin/UserList"
import InstructorList from "../pages/admin/InstructorList"
import VerificationPage from "../pages/admin/VerificationPage"
import VerificationDetailsPage from "../pages/admin/VerificationDetailPage"

const AdminRouter = () => {
  return (
    <Routes>
      <Route path='login' element={<AdminSessionRoute><LoginPage/></AdminSessionRoute>}/>
      <Route element={<AdminLayout/>}>
      <Route path='home' element={<Home/>}/>
      <Route path='users' element={<UserList />}/>
      <Route path='instructors' element={<InstructorList/>}/>
      <Route path='verification' element={<VerificationPage/>}/>
      <Route path='verificationDetail/:email' element={<VerificationDetailsPage/>}/>

      </Route>
    </Routes>
  )
}

export default AdminRouter