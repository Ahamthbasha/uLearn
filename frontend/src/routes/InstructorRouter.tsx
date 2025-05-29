import { Routes,Route } from 'react-router-dom'

import SignUp from '../pages/instructor/Auth/SignUp'
import InstructorHeader from '../components/InstructorComponents/InstructorHeader'
import OTPVerification from '../pages/instructor/Auth/OTPVerification'
import LoginPage from '../pages/instructor/Auth/Login'
import VerificationForm from '../pages/instructor/VerificationForm'

const InstructorRouter = () => {
  return (
    <Routes>
      <Route element={<InstructorHeader/>}>
      <Route path='signUp' element={<SignUp/>}/>
       <Route path="verifyOtp" element={<OTPVerification/>}/>
        <Route path='login' element={<LoginPage/>}/>
        <Route path='verification' element={<VerificationForm/>}/>
      </Route>
    </Routes>
  )
}

export default InstructorRouter
