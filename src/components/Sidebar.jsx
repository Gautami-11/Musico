
import {
  faHouseUser,
  faCalendarCheck,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const navLinkClass = ({ isActive }) =>
    `flex items-center flex-shrink-0 cursor-pointer rounded-lg px-2 py-4 m-1.5 text transition-colors duration-200 ${
      isActive
        ? "bg-blue-300 text-gray-900 font-semibold text-center"
        : "text-gray-700 hover:bg-indigo-600 hover:text-gray-900"
    }`;

  return (
    <aside
      className={`fixed left-0 z-40 transition-all duration-300 dark:bg-gray-800 bg-white shadow-lg`}
      style={{
        top: "6rem",
        height: "calc(100vh - 4rem)",
        width: isCollapsed ? "4rem" : "15rem",
      }}
    >

      
      <button
        onClick={toggleSidebar}
        className="flex items-center justify-center h-12 w-12 mt-4 mb-6 mx-auto p-5 rounded-lg text-gray-200 hover:bg-indigo-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        aria-label="Toggle sidebar"
      >
        <FontAwesomeIcon
          icon={faBars}
          className="text-2xl text-gray-700 dark:text-white"
        />
      </button>

      <nav className="flex-1 overflow-y-auto px-2 pt-2">
        <NavLink to="/" className={navLinkClass}>
          <FontAwesomeIcon
            icon={faHouseUser}
            className="min-w-[1.5rem] dark:text-white"
          />
          {!isCollapsed && <span className="ml-3 dark:text-white">Home</span>}
        </NavLink>

        <NavLink to="/favourite" className={navLinkClass}>
          <FontAwesomeIcon
            icon={faCalendarCheck}
            className="min-w-[1.5rem] dark:text-white"
          />
          {!isCollapsed && (
            <span className="ml-3 dark:text-white">Favourite</span>
          )}
        </NavLink>

         <NavLink to="/playlist" className={navLinkClass}>
          <FontAwesomeIcon
            icon={faCalendarCheck}
            className="min-w-[1.5rem] dark:text-white"
          />
          {!isCollapsed && (
            <span className="ml-3 dark:text-white">Playlists</span>
          )}
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
