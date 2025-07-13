
import {
  faHouseUser,
  faCalendarCheck,
  faHeart,
  faMusic,
  faSearch
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const navLinkClass = ({ isActive }) =>
    `flex items-center flex-shrink-0 cursor-pointer rounded-lg px-2 py-4 m-1.5 tektur mb-8 text-xl ${

isActive
  ? "bg-[#1e293b] text-white font-semibold text-center shadow-md shadow-cyan-500/20 border border-cyan-500 rounded-lg"
  : "bg-[#0f172a]/70 backdrop-blur-sm text-gray-300 font-medium text-center shadow-lg border border-slate-700 rounded-lg hover:shadow-cyan-500/100 transition-all duration-200"

    }`;

  return (
    <aside
      className={`fixed left-0 z-40 transition-all  duration-300 bg-gray-900`}
      style={{
        top: "6rem",
        height: "calc(100vh - 4rem)",
        width: isCollapsed ? "4rem" : "15rem",
      }}
    >

      
      <button
        onClick={toggleSidebar}
        className="flex items-center justify-center h-13 w-13 mt-4 mb-6 mx-auto p-5 rounded-lg  bg-[#0f172a]/70 backdrop-blur-sm text-gray-300 font-medium text-center shadow-lg border border-slate-700  hover:shadow-cyan-500/100 transition-all duration-200  "
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


         <NavLink to="/playlist" className={navLinkClass}>
          <FontAwesomeIcon
            icon={faCalendarCheck}
            className="min-w-[1.5rem] text-white"
          />
          {!isCollapsed && (
            <span className="ml-3 text-white">Playlists</span>
          )}
        </NavLink>

          <NavLink to="/search" className={navLinkClass}>
          <FontAwesomeIcon
            icon={faSearch}
            className="min-w-[1.5rem] text-white"
          />
          {!isCollapsed && (
            <span className="ml-3 text-white">Search</span>
          )}
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
