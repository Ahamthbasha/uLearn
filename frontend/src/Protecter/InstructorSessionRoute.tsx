// import { Navigate } from "react-router-dom";

// interface ProtectedRouteProps{
//     children : React.ReactNode
// }

// const InstructorSessionRoute : React.FC<ProtectedRouteProps> = ({children}) =>{
//     const instructor = JSON.parse(localStorage.getItem('instructor') || 'null')

//     if(instructor){
//         return <Navigate to='/' replace/>
//     }

//     return children
// }

// export default InstructorSessionRoute

import { Navigate, Outlet } from "react-router-dom";

const InstructorSessionRoute = () => {
  const instructor = JSON.parse(localStorage.getItem("instructor") || "null");

  if (instructor) {
    if (instructor.isVerified) {
      return <Navigate to="/instructor/dashboard" replace />;
    }
    return <Navigate to={`/instructor/verificationStatus/${instructor.email}`} replace />;
  }

  return <Outlet />;
};

export default InstructorSessionRoute;
