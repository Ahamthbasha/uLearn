import {Routes,Route} from 'react-router-dom'
import StudentLayout from '../layouts/StudentLayout'
import LandingPage from '../pages/LandingPage'
import SignUp from '../pages/student/Auth/SignUp'
import EnrollPage from '../pages/EnrollPage'
import OTPVerification from '../pages/student/Auth/OTPVerification'
import LoginPage from '../pages/student/Auth/Login'

const StudentRouter = () => {
  return (
    <Routes>
        <Route element={<StudentLayout />}>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/enrollPage" element={<EnrollPage/>}/>
        <Route path="/user/signUp" element={<SignUp/>}/>
        <Route path="/user/verifyOtp" element={<OTPVerification/>}/>
        <Route path='/user/login' element={<LoginPage/>}/>
        </Route>
    </Routes>
  )
}

export default StudentRouter
