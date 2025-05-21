import LoginForm from '../../components/forms/LoginForm'
import StudentLayout from '../../layouts/StudentLayout';
import mentorLogin from '../../assets/Mentorship.jpg'

const MentorLogin = () => {
    const handleLogin = (credentials: { email: string; password: string }) => {
    console.log('Student login credentials:', credentials);
    // Call your API here (e.g. axios.post('/student/login', credentials))
  };

  return (
  <StudentLayout>
  <LoginForm role="mentor" onSubmit={handleLogin} imageUrl={mentorLogin}/>
  </StudentLayout>
  
   )
    
};

export default MentorLogin;