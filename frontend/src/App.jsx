import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBaseRoute from "./utils/RoleBaseRoute";
import AdminSummary from "./component/dashboard/AdminSummary";
import DepartmentList from "./component/departments/DepartmentList";
import AddDepartment from "./component/departments/AddDepartment";
import EditDepartment from "./component/departments/EditDepartment";
import List from "./component/employee/List";
import Add from "./component/employee/Add";
import View from "./component/employee/View";
import Edit from "./component/employee/Edit";
import AddSalary from "./component/salary/Add";
import ViewSalary from "./component/salary/View";
import SummaryCard from "./component/employeeDashboard/Summary";
import LeaveList from "./component/leave/List";
import AddLeave from "./component/leave/Add";
import Setting from "./component/employeeDashboard/Setting";
import Table from "./component/leave/Table";
import Detail from "./component/leave/Detail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default Route - Redirect to login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Admin Dashboard Routes */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoute requiredRole={["admin"]}>
                <AdminDashboard />
              </RoleBaseRoute>
            </PrivateRoutes>
          }
        >
          <Route index element={<AdminSummary />} />
          <Route path="/admin-dashboard/departments" element={<DepartmentList />} />
          <Route path="/admin-dashboard/add-department" element={<AddDepartment />} />
          <Route path="/admin-dashboard/department/:id" element={<EditDepartment />} />
          <Route path="/admin-dashboard/add-employee" element={<Add />} />
          <Route path="/admin-dashboard/employees" element={<List />} />
          <Route path="/admin-dashboard/employees/:id" element={<View />} />
          <Route path="employees/edit/:id" element={<Edit />} />
          <Route path="salary/add" element={<AddSalary />} />
          <Route path="employees/salary/:id" element={<ViewSalary />} />
          <Route path="/admin-dashboard/leaves" element={<Table />} />  
          <Route path="/admin-dashboard/leaves/:id" element={<Detail />} />  
          <Route path="/admin-dashboard/employees/leaves/:id" element={<LeaveList />} />  
        </Route>
        <Route path={'/admin-dashboard/setting'} element={<Setting />}></Route>

        {/* Employee Dashboard Routes */}
        <Route
          path="/employee-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoute requiredRole={["admin", "employee"]}>
                <EmployeeDashboard />
              </RoleBaseRoute>
            </PrivateRoutes>
          }
        >
          <Route index element={<SummaryCard />} />
          <Route path="profile/:id" element={<View />} />
          <Route path="leaves/:id" element={<LeaveList />} />
          <Route path="add-leave" element={<AddLeave />} />
          <Route path="salary/:id" element={<ViewSalary />} />
          <Route path="setting" element={<Setting />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;