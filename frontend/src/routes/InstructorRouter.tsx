import { Routes,Route } from 'react-router-dom'

import SignUp from '../pages/instructor/Auth/SignUp'
import InstructorHeader from '../components/InstructorComponents/InstructorHeader'
import OTPVerification from '../pages/instructor/Auth/OTPVerification'
import LoginPage from '../pages/instructor/Auth/Login'
import VerificationForm from '../pages/instructor/InstructorVerificationForm'
import ForgotPassword from '../pages/instructor/Auth/ForgotPassword'
import ResetVerificationOTP from '../pages/instructor/Auth/ResetVerificationOtp'
import ResetPassword from '../pages/instructor/Auth/ResetPassword'
import InstructorSessionRoute from '../Protecter/InstructorSessionRoute'

const InstructorRouter = () => {
  return (
    <Routes>
      <Route element={<InstructorHeader/>}>
      <Route path='signUp' element={<SignUp/>}/>
       <Route path="verifyOtp" element={<OTPVerification/>}/>
        <Route path='login' element={<InstructorSessionRoute><LoginPage/></InstructorSessionRoute>}/>
        <Route path='verification' element={<VerificationForm/>}/>
        <Route path='verifyEmail' element={<ForgotPassword/>}/>
        <Route path='forgotPasswordOtp' element={<ResetVerificationOTP/>}/>
        <Route path='resetPassword' element={<ResetPassword/>}/>
      </Route>
    </Routes>
  )
}

export default InstructorRouter
