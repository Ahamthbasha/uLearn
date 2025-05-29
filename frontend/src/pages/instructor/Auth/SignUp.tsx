import { Formik, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import InputField from "../../../components/StudentComponents/common/InputField";
import PasswordField from "../../../components/StudentComponents/common/PasswordField";
import { signup } from "../../../api/auth/InstructorAuthentication";
import type { signUp } from "../../../types/signUpType";
import { useNavigate } from "react-router-dom";
import MentorSignUp from '../../../assets/Mentorship.jpg'

const signupSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const SignUp = () => {
    const navigate = useNavigate() 
  const handleRegister = async (values: signUp) => {
    try {
      
      const response = await signup(values);
     
      if (response.success) {
        localStorage.setItem("verificationToken", response.token);
        localStorage.setItem("email", values.email);
        toast.success(response.message);
        navigate("/instructor/verifyOtp")
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      toast.error(error.message || "Unknown error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Section */}
      <div className="flex flex-1 justify-center items-center bg-gray-50">
        <div className="max-w-6xl w-full flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Left Side Image */}
          <div className="md:w-1/2 flex items-center justify-center p-8 bg-gray-100">
            <img
              src={MentorSignUp}
              alt="Mentor"
              className="rounded-full w-56 h-56 object-cover"
            />
          </div>

          {/* Right Side Form */}
          <div className="md:w-1/2 p-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
              Mentor SignUp
            </h2>

            <Formik<signUp>
              initialValues={{
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={signupSchema}
              onSubmit={handleRegister}
            >
              {() => (
                <Form className="space-y-4">
                  <InputField
                    name="username"
                    type="text"
                    label="Username"
                    placeholder="Enter username"
                  />

                  <InputField
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="Enter email"
                  />

                  <PasswordField
                    name="password"
                    placeholder="Enter password"
                  />

                  <PasswordField
                    name="confirmPassword"
                    placeholder="Confirm password"
                  />

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
                  >
                    Register
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
