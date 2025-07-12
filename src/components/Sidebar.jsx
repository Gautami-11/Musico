
import {
  faHouseUser,
  faCalendarCheck,
  faHeart,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const navLinkClass = ({ isActive }) =>
    `flex items-center flex-shrink-0 cursor-pointer rounded-lg px-2 py-4 m-1.5 tektur mb-8 text-xl ${
    
       isActive
  ? "bg-gradient-to-l from-indigo-500 via-violet-500 to-pink-500 text-white font-semibold text-center"
  : "bg-transparent hover:bg-gradient-to-r hover:from-indigo-500 hover:via-violet-500 hover:to-pink-500 text-white font-medium text-center"

    }`;

  return (
    <aside
      className={`fixed left-0 z-40 transition-all  duration-300 bg-gray-900 border-r-1 border-gray-400`}
      style={{
        top: "6rem",
        height: "calc(100vh - 4rem)",
        width: isCollapsed ? "4rem" : "15rem",
      }}
    >

      
      <button
        onClick={toggleSidebar}
        className="flex items-center justify-center h-13 w-13 mt-4 mb-6 mx-auto p-5 rounded-lg text-gray-200 hover:bg-gradient-to-r hover:from-indigo-500  hover:via-violet-500 hover:to-pink-500 ,  "
        aria-label="Toggle sidebar"
      >
        <FontAwesomeIcon
          icon={faMusic}
          className="text-2xl  text-white"
        />
      </button>

      <nav className="flex-1 overflow-y-auto px-2  pt-2">
        <NavLink to="/" className={navLinkClass} >
          <FontAwesomeIcon
            icon={faHouseUser}
            className="min-w-[1.5rem]  text-white"
          />
          {!isCollapsed && <span className="ml-3 text-white">Home</span>}
        </NavLink>

        <NavLink to="/favourite" className={navLinkClass}>
          <FontAwesomeIcon
            icon={faHeart}
            className="min-w-[1.5rem] text-white  "
          />
          {!isCollapsed && (
            <span className="ml-3 text-white">Favourite</span>
          )}
        </NavLink>

         <NavLink to="/playlist" className={navLinkClass}>
          <FontAwesomeIcon
            icon={faCalendarCheck}
            className="min-w-[1.5rem] text-white"
          />
          {!isCollapsed && (
            <span className="ml-3 text-white">Playlists</span>
          )}
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
