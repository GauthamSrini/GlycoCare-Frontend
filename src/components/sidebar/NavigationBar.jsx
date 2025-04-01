import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link, NavLink,useLocation } from "react-router-dom";
import "./navbar.css";
import img from '/images/gc.png'
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import StorefrontIcon from "@mui/icons-material/Storefront";
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from '@mui/icons-material/Logout';

const customstyles = {
 height:'60px',
    marginBottom:"10px",
};

const NavigationBar = () => {
  const location = useLocation(); 

  if (location.pathname === '/login') {
    return null;
  }
  return (
    <Sidebar
      className="sideBar"
      width="200px"
      collapsed={false}
      collapsedWidth="80px"
    >
      <Menu className="menu-vertical">
        <div>
          <div className="logo">
            <img src={img} alt="" width={70} height={50} />
            <h4>GLYCO CARE</h4>
          </div>
          <MenuItem
            style={customstyles}
            icon={<AutoAwesomeMosaicIcon />}
            component={<NavLink to="/dashboard" />}
          >
            {" "}
            Dashboard{" "}
          </MenuItem>
          <MenuItem
            style={customstyles}
            icon={<TextSnippetIcon />}
            component={<NavLink to="/prescription" />}
          >
            {" "}
            Prescription{" "}
          </MenuItem>
          <MenuItem
            style={customstyles}
            icon={<StorefrontIcon />}
            component={<NavLink to="/recommentation" />}
          >
            FoodChoice
          </MenuItem>
          <MenuItem
            style={customstyles}
            icon={<AccountBoxIcon />}
            component={<NavLink to="/chatbot" />}
          >
            {" "}
            ChatBot{" "}
          </MenuItem>
          <MenuItem
            style={customstyles}
            icon={<LogoutIcon />}
            component={<NavLink to="/" />}
          >
            {" "}
            Logout{" "}
          </MenuItem>
        </div>
        {/* <div className="logo2">
          <img
            src={img2}
            alt=""
            style={{ marginBottom: "20px" }}
            width={55}
            height={55}
            borderRadius="50%"
          />
          <img src="/user.jpg" alt="" className="user" width={30} height={30} />
        </div> */}
        <div style={{ height: "10px" }}></div>
      </Menu>
    </Sidebar>
  );
};

export default NavigationBar;
