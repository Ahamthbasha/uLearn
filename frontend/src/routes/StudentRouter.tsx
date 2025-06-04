import {Routes,Route} from 'react-router-dom'
import StudentLayout from '../layouts/StudentLayout'
import UserSessionRoute from '../Protecter/UserSessionRoute'
import LandingPage from '../pages/LandingPage'
import EnrollPage from '../pages/EnrollPage'
import SignUp from '../pages/student/Auth/SignUp'
import LoginPage from '../pages/student/Auth/Login'
import OTPVerification from '../pages/student/Auth/OTPVerification'
import ForgotPassword from '../pages/student/Auth/ForgotPassword'
import ResetVerificationOTP from '../pages/student/Auth/ResetVerificationOtp'
import ResetPassword from '../pages/student/Auth/ResetPassword'


const StudentRouter = () => {
  return (
    <Routes>
        <Route element={<StudentLayout />}>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/enrollPage" element={<EnrollPage/>}/>
        <Route path="/user/signUp" element={<SignUp/>}/>
        <Route path='/user/login' element={<UserSessionRoute><LoginPage/></UserSessionRoute>}/>
        <Route path="/user/verifyOtp" element={<OTPVerification/>}/>

        <Route path='/user/verifyEmail' element={<ForgotPassword/>} />
        <Route path='/user/forgotPasswordOtp' element={<ResetVerificationOTP/>}/>
        <Route path='/user/resetPassword' element={<ResetPassword/>}/>


        </Route>

    </Routes>
  )
}

export default StudentRouter
