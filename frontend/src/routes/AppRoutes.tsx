import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import EnrollPage from '../pages/EnrollPage';
import StudentLogin from '../pages/student/StudentLogin';
import MentorLogin from '../pages/mentor/MentorLogin';
import StudentOTP from '../pages/student/StudentOTP';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/enrollPage" element={<EnrollPage />} />
      <Route path='/studentLogin' element={<StudentLogin/>}/>
      <Route path="/mentorLogin" element={<MentorLogin />}/>
      <Route path="/otp" element={<StudentOTP/>}/>
    </Routes>
  );
};

export default AppRoutes;
