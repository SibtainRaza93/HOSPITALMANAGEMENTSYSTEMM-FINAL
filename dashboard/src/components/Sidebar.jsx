import React, { useContext, useState } from 'react'
import { Context } from "../main"
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxLine } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [show, setShow] = useState(false);

  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const navigateTo = useNavigate();

  const gotoHomePage = () => {
    navigateTo("/");
    setShow(!show);
  };
  const gotoDoctorsPage = () => {
    navigateTo("/doctors");
    setShow(!show);
  };
  const gotoMessagesPage = () => {
    navigateTo("/messages");
    setShow(!show);
  };
  const gotoAddNewDoctor = () => {
    navigateTo("/doctor/addnew");
    setShow(!show);
  };
  const gotoAddNewAdmin = () => {
    navigateTo("/admin/addnew");
    setShow(!show);
  };

  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/user/admin/logout", {
        withCredentials: true,
      });
      
      toast.success(res.data.message);
      setIsAuthenticated(false);
      localStorage.removeItem("isAdminLoggedIn");
      
      // Redirect to login page after logout
      navigateTo("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed");
    }
  };

  return (
    <>
      {isAuthenticated && (
        <>
          <nav className={show ? "show sidebar" : "sidebar"}>
            <div className="links">
              <TiHome onClick={gotoHomePage} />
              <RiLogoutBoxLine onClick={handleLogout} />
              <AiFillMessage onClick={gotoMessagesPage} />
              <FaUserDoctor onClick={gotoDoctorsPage} />
              <MdAddModerator onClick={gotoAddNewAdmin} />
              <IoPersonSharp onClick={gotoAddNewDoctor} />
            </div>
          </nav>
          <div className="wrapper">
            <GiHamburgerMenu className="hamburger" onClick={() => setShow(!show)} />
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;