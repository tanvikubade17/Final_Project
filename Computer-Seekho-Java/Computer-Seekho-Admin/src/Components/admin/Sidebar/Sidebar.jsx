import React, { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { accountItems, menuItemsAdmin } from "./sidebarData.jsx";
import { NavLink,useNavigate } from "react-router-dom";
import "./Sidebar.css";
const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("token"); 
    navigate("/"); 
  };

  return (
    <div className={`sidebar ${open ? "open" : "closed"}`}>
      <div className="sidebar-header">
        <span
          className={`toggle-btn ${!open && "rotate"}`}
          onClick={() => setOpen(!open)}
        >
          <FaChevronLeft className="toggle-icon" />
        </span>
        <div className="logo-container">
          <h1 className={`school-name ${!open ? "scale-0" : "scale-100"}`}>
            SM-VITA
          </h1>
        </div>
      </div>

      <ul className="menu-list">
        {menuItemsAdmin.map((menu, index) => (
          <NavLink to={
            index === 0
              ? "/admin/enquiry"
              : index === 1
                ? "/admin/notification"
                : index === 2
                  ? "/admin/staff"
                  : index === 3
                    ? "/admin/student"
                    : index === 4
                      ? "/admin/course"
                      : index === 5
                        ? "/admin/closure"
                          : index === 6
                            ? "/admin/payment"
                              :"/"
          }
            className={"link"}
            key={index}
          >
            <div className="menu-item">
              <div>{menu.icon}</div>
              <span className={`menu-title ${!open ? "scale-0" : "scale-100"}`}>
                {menu.title}
              </span>
            </div>
          </NavLink>
        ))}
      </ul>

      <div className="account-items">
        {accountItems.map((item, index) => (
          item.title === "Logout" ? (
            <div key={index} className="menu-item" onClick={handleLogout} style={{ cursor: "pointer" }}>
              <div>{item.icon}</div>
              <span className={`menu-title ${!open ? "scale-0" : "scale-100"}`}>
                {item.title}
              </span>
            </div>
          ) : (
            <div key={index} className="menu-item">
              <div>{item.icon}</div>
              <span className={`menu-title ${!open ? "scale-0" : "scale-100"}`}>
                {item.title}
              </span>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
