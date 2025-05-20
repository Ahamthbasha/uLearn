import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import EnrollPage from '../pages/EnrollPage';
import StudentLogin from '../pages/student/StudentLogin';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/homePage" element={<LandingPage />} />
      <Route path="/enrollPage" element={<EnrollPage />} />
      <Route path='/studentLogin' element={<StudentLogin/>}/>
    </Routes>
  );
};

export default AppRoutes;
