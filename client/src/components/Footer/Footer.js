import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Footer.css";
import Auth from "../../utils/auth";

// Import footer icons from Material UI
import "../Icons/Icons.css";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <footer className="w-100 mt-auto text-dark p-4">
      <div className="container text-center mb-5">
        {location.pathname !== "/" && (
          <Link className="footerBtn" onClick={() => navigate(-1)}>
            <KeyboardBackspaceOutlinedIcon className="icon" />
          </Link>
        )}
        <Link to="/dashboard" className="footerBtn">
          <DashboardCustomizeOutlinedIcon className="icon" />
        </Link>
        <Link to="/account" className="footerBtn">
          <AccountCircleOutlinedIcon className="icon" />
        </Link>
        <Link onClick={logout} className="footerBtn">
          <ExitToAppIcon className="icon" />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
