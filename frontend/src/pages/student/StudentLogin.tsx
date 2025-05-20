import LoginForm from '../../components/forms/LoginForm'
import StudentLayout from '../../layouts/StudentLayout';
import studentLogin from '../../assets/studentLogin.jpeg'

const StudentLogin = () => {
    const handleLogin = (credentials: { email: string; password: string }) => {
    console.log('Student login credentials:', credentials);
    // Call your API here (e.g. axios.post('/student/login', credentials))
  };

  return (
  <StudentLayout>
  <LoginForm role="student" onSubmit={handleLogin} imageUrl={studentLogin}/>;
  </StudentLayout>
  
   )
    
};

export default StudentLogin;