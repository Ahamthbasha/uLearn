import { Navigate } from "react-router-dom";

interface ProtectedRouteProps{
    children : React.ReactNode
}

const mentorSessionRoute : React.FC<ProtectedRouteProps> = ({children}) =>{
    const instructor = JSON.parse(localStorage.getItem('mentor') || 'null')

    if(instructor){
        return <Navigate to='/' replace/>
    }

    return children
}

export default mentorSessionRoute