import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="bg-gradient-to-t from-gray-900 via-zinc-950 to-orange-600  
 w-60 h-screen p-6 fixed hidden md:block">
   <img src="/Logo.png" alt="Musico Logo" width={140 } style={ {border:"1px",borderRadius: "50%" }}/>
      <nav className="flex flex-col gap-4 mt-9 m-6  ">
        <NavLink 
          to="/"
          className={({ isActive }) =>
            isActive ? "text-green-400 font-semibold" : "hover:text-green-300"
          }
        >
          🏠 Home
        </NavLink>
        <NavLink
          to="/search"
          className={({ isActive }) =>
            isActive ? "text-green-400 font-semibold" : "hover:text-green-300"
          }
        >
          🔍 Search
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
