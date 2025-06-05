import { Navigate } from "react-router-dom";

interface ProtectedRouteProps{
    children : React.ReactNode
}

const InstructorSessionRoute : React.FC<ProtectedRouteProps> = ({children}) =>{
    const instructor = JSON.parse(localStorage.getItem('instructor') || 'null')

    if(instructor){
        return <Navigate to='/' replace/>
    }

    return children
}

export default InstructorSessionRoute