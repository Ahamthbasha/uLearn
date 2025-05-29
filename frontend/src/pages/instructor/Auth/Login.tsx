import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import PasswordField from '../../../components/StudentComponents/common/PasswordField';
import { setInstructor } from '../../../redux/slices/instructorSlice';
import { login } from '../../../api/auth/InstructorAuthentication';
import type { Login } from '../../../types/LoginTypes';

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required")
});

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
    role: '',
    isBlocked: false
  };

  const onSubmit = async (data: Login) => {
    try {
      const response = await login({email:data.email, password:data.password,role:data.role});
      const user = response.user;

      if (user) {
        localStorage.setItem('instructor', JSON.stringify(user));
        toast.success(response?.message);

        dispatch(setInstructor({
          userId: user._id,
          name: user.username,
          email: user.email,
          role: user.role,
          isBlocked: user.isBlocked,
          profilePicture: user.profilePicture
        }));

        console.log("Naviagating to landing page")
        navigate('/instructor/verification')

      } else {
        toast.error(response?.message || "Login failed");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        <Formik initialValues={initialValues} validationSchema={loginSchema} onSubmit={onSubmit}>
          {() => (
            <Form className="space-y-4">
              <div>
                <Field name="email" type="email" placeholder="Email" className="w-full p-2 border rounded" />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <PasswordField name="password" placeholder="Password" />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
              </div>

              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                Login
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
