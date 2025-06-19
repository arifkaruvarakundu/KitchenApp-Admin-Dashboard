// *********************
// Role of the component: Sidebar component that displays the sidebar navigation
// Name of the component: Sidebar.jsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <Sidebar />
// Input parameters: none
// Output: Sidebar component that displays the sidebar navigation
// *********************

import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  HiLogin,
  HiOutlineHome,
  HiUserGroup,
  HiOutlineTag,
  HiOutlineTruck,
  HiOutlineStar,
  HiOutlineInformationCircle,
  HiOutlineChat,
  HiOutlineX,
  HiOutlineUser,
} from "react-icons/hi";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { setSidebar } from "../features/dashboard/dashboardSlice";

const Sidebar = () => {
  const [isLandingOpen, setIsLandingOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Commented out Redux usage; re-enable if needed
  const { isSidebarOpen } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Clear anything else if needed (e.g., roles, settings)
    localStorage.clear();

    navigate("/");
  };

  // const isSidebarOpen = true; // Use true/false based on your app logic

  const sidebarClass = isSidebarOpen ? "sidebar-open" : "sidebar-closed";

  const navActiveClass =
    "block dark:bg-whiteSecondary flex items-center self-stretch gap-4 py-4 px-6 cursor-pointer max-xl:py-3 dark:text-blackPrimary bg-white text-blackPrimary";
  const navInactiveClass =
    "block flex items-center self-stretch gap-4 py-4 px-6 dark:bg-blackPrimary dark:hover:bg-blackSecondary cursor-pointer max-xl:py-3 dark:text-whiteSecondary hover:bg-white text-blackPrimary bg-whiteSecondary";

  return (
    <div className="relative">
      <div
          className={`w-72 h-[100vh] dark:bg-blackPrimary bg-amber-100 pt-6 xl:sticky xl:top-0 xl:z-10 max-xl:fixed max-xl:top-0 max-xl:z-10 xl:translate-x-0 ${sidebarClass} shadow-lg rounded-tr-3xl rounded-br-3xl`}

      >
        <HiOutlineX
          className="dark:text-whiteSecondary text-blackPrimary text-2xl ml-auto mb-2 mr-2 cursor-pointer xl:py-3"
          onClick={() => dispatch(setSidebar())}
        />
        <div>
          <div
            onClick={() => setIsLandingOpen(!isLandingOpen)}
            className="block flex items-center self-stretch gap-4 py-4 px-6 dark:bg-blackPrimary dark:hover:bg-blackSecondary cursor-pointer max-xl:py-3 dark:text-whiteSecondary hover:bg-white text-blackPrimary bg-whiteSecondary"
          >
            <HiOutlineHome className="text-xl" />
            <span className="text-lg">Landing pages</span>
          </div>
          {isLandingOpen && (
            <div>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? navActiveClass : navInactiveClass
                }
              >
                <HiOutlineHome className="text-xl" />
                <span className="text-lg">Overview v1</span>
              </NavLink>
              {/* <NavLink
                to="/landing-v2"
                className={({ isActive }) =>
                  isActive ? navActiveClass : navInactiveClass
                }
              >
                <HiOutlineHome className="text-xl" />
                <span className="text-lg">Overview v2</span>
              </NavLink> */}
            </div>
          )}

          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? navActiveClass : navInactiveClass
            }
          >
            <HiOutlineDevicePhoneMobile className="text-xl" />
            <span className="text-lg">Products</span>
          </NavLink>
          <NavLink
            to="/categories"
            className={({ isActive }) =>
              isActive ? navActiveClass : navInactiveClass
            }
          >
            <HiOutlineTag className="text-xl" />
            <span className="text-lg">Categories</span>
          </NavLink>
          <NavLink
            to="/orders"
            className={({ isActive }) =>
              isActive ? navActiveClass : navInactiveClass
            }
          >
            <HiOutlineTruck className="text-xl" />
            <span className="text-lg">Orders</span>
          </NavLink>
          <NavLink
            to="/users"
            className={({ isActive }) =>
              isActive ? navActiveClass : navInactiveClass
            }
          >
            <HiOutlineUser className="text-xl" />
            <span className="text-lg">Users</span>
          </NavLink>
          {/* <NavLink
            to="/reviews"
            className={({ isActive }) =>
              isActive ? navActiveClass : navInactiveClass
            }
          >
            <HiOutlineStar className="text-xl" />
            <span className="text-lg">Reviews</span>
          </NavLink> */}

          <div
            onClick={() => setIsAuthOpen(!isAuthOpen)}
            className="block flex items-center self-stretch gap-4 py-4 px-6 dark:bg-blackPrimary dark:hover:bg-blackSecondary cursor-pointer max-xl:py-3 dark:text-whiteSecondary hover:bg-white text-blackPrimary bg-whiteSecondary"
          >
            <HiUserGroup className="text-xl" />
            <span className="text-lg">Auth</span>
          </div>
          {isAuthOpen && (
            <div>
              <NavLink
                to="/"
                onClick={logout}
                className={({ isActive }) =>
                  isActive ? navActiveClass : navInactiveClass
                }
              >
                <HiLogin className="text-xl" />
                <span className="text-lg">LogOut</span>
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? navActiveClass : navInactiveClass
                }
              >
                <HiUserGroup className="text-xl" />
                <span className="text-lg">Register</span>
              </NavLink>
            </div>
          )}
        </div>

        {/* <div className="absolute bottom-0 border-1 border-t dark:border-blackSecondary border-blackSecondary w-full">
          <NavLink
            to="/help-desk"
            className={({ isActive }) =>
              isActive ? navActiveClass : navInactiveClass
            }
          >
            <HiOutlineInformationCircle className="text-xl" />
            <span className="text-lg">Help Desk</span>
          </NavLink>
        </div> */}
      </div>
    </div>
  );
};

export default Sidebar;
