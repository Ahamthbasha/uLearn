import { Navigate,Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const isAdminAuthenticated = Boolean(localStorage.getItem('mentor'))

    return isAdminAuthenticated ? <Outlet /> : <Navigate to='/mentor/login'/>
}

export default PrivateRoute