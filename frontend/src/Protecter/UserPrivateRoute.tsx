import {Navigate,Outlet} from 'react-router-dom'

const PrivateRoute = () => {
    const isAdminAuthenticated = Boolean(localStorage.getItem("user"))

    console.log(localStorage.getItem('user'))
    console.log("privateRoute",isAdminAuthenticated)

    return isAdminAuthenticated ? <Outlet /> : <Navigate to='/user/login'/>
}

export default PrivateRoute

