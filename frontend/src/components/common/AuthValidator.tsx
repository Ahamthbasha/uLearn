import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { API } from '../../service/axios';
import { useDispatch } from 'react-redux';
import { clearUserDetails } from '../../redux/slices/userSlice';
import { clearInstructorDetails } from '../../redux/slices/instructorSlice';
import { toast } from 'react-toastify';  // ✅ Import toast

const AuthValidator = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const validate = async () => {
      const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
      const storedInstructor = JSON.parse(localStorage.getItem('instructor') || 'null');

      try {
        if (storedUser?.role === 'student') {
          await API.get('/api/student/profile');
        } else if (storedInstructor?.role === 'instructor') {
          await API.get('/api/instructor/profile');
        }
      } catch (err: any) {
        if ([401, 403].includes(err.response?.status)) {
          // ✅ Show toast
          toast.error("🚫 Access Denied. You may have been blocked by the admin.");

          dispatch(clearUserDetails());
          dispatch(clearInstructorDetails());

          return navigate(
            storedUser?.role === 'student'
              ? '/user/login'
              : storedInstructor?.role === 'instructor'
              ? '/instructor/login'
              : '/login'
          );
        }
      }
    };

    validate();
  }, [location.pathname]);

  return null;
};

export default AuthValidator;
