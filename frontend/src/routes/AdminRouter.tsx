import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/admin/Auth/Login";
import Home from "../pages/admin/Home";
import AdminLayout from "../layouts/AdminLayout";
import AdminSessionRoute from "../Protecter/AdminSessionRoute";
import PrivateRoute from "../Protecter/AdminPrivateRoute";

// Pages
import UserList from "../pages/admin/userList/UserList";
import InstructorList from "../pages/admin/instructorList/InstructorList";
import VerificationPage from "../pages/admin/verification/VerificationPage";
import VerificationDetailsPage from "../pages/admin/verification/VerificationDetailPage";

// Category Pages
import AdminCategoryListPage from "../pages/admin/category/AdminCategoryList";
import AddCategoryPage from "../pages/admin/category/AddCategoryPage";
import EditCategoryPage from "../pages/admin/category/EditCategory";
import AdminCourseManagementPage from "../pages/admin/course/AdminCourseManagementPage";



const AdminRouter = () => {
  return (
    <Routes>
      {/* Public route */}
      <Route path='login' element={<AdminSessionRoute><LoginPage /></AdminSessionRoute>} />

      {/* Protected routes */}
      <Route element={<PrivateRoute />}>
        <Route element={<AdminLayout />}>
          <Route path='home' element={<Home />} />
          <Route path='users' element={<UserList />} />
          <Route path='instructors' element={<InstructorList />} />
          <Route path='verification' element={<VerificationPage />} />
          <Route path='verificationDetail/:email' element={<VerificationDetailsPage />} />

          {/* Category Routes */}
          <Route path='category' element={<AdminCategoryListPage />} />
          <Route path='addCategory' element={<AddCategoryPage />} />
          <Route path='category/edit/:categoryId' element={<EditCategoryPage />} />

          {/* Course Routes */}
          <Route path='courses' element={<AdminCourseManagementPage/>}/>
        </Route>
      </Route>
    </Routes>
  );
};

export default AdminRouter;
