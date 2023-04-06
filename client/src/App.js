import Signin from "./components/users/Signin";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import AdminDashboard from "./components/users/AdminDashboard"; 
import AddUser from "./components/users/AddUser";
import EditUser from "./components/users/Edit";
import Profile from "./components/users/Profile";
import Userexpense from "./components/expenses/Userexpenses";
import AdminViewExpense from "./components/expenses/AdminViewExpense";
import Dashboard from "./components/users/Dashboard";
import Allexpenses from "./components/expenses/Allexpenses";
import UserViewExpense from "./components/expenses/UserViewExpense";
import Addexpense from "./components/expenses/Addexpense";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './App.css'


const Routing = () => {
  const navigate = useNavigate()
  useEffect(()=>{
    if(!localStorage.getItem('user_id')) navigate('/users/signin')
  },[])
  
  return (
    <Routes>
      <Route exact path="/users/signin" element={<Signin />} />
      <Route exact path="/users/adminpage" element={<AdminDashboard />} />
      <Route exact path="/users/adduser" element={<AddUser />} />
      <Route exact path="/users/edit/:id" element={<EditUser />} />
      <Route exact path="/users/profile/:id" element={<Profile />} />
      <Route exact path="/expenses/userexpenses/:id" element={<Userexpense />} />
      <Route exact path="/expenses/adminviewexpense/:exp_id" element={<AdminViewExpense />} />
      <Route exact path="/expenses/userviewexpense/:exp_id" element={<UserViewExpense />} />
      <Route exact path="/users/dashboard/:id" element={<Dashboard />} />
      <Route exact path="/expenses/allexpenses/:id" element={<Allexpenses />} />
      <Route exact path="/expenses/addexpense/:id" element={<Addexpense />} />
    </Routes>
  );
};

function App() {
  return (
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
  );
}

export default App;