

import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Playlist from "./pages/Playlist";
import Home from "./pages/Home";
import FavouriteSongs from "./pages/FavoriteSongs";
import AlbumDetails from "./pages/AlbumDetails";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const sidebarWidth = isCollapsed ? "4rem" : "15rem";
  const navbarHeight = "6rem";

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <BrowserRouter >
    

      <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
       <Navbar />
     
      <div className="min-h-screen bg-white dark:bg-gray-900 dark:text-gray-200">
        <main
          className="p-4"
          style={{
            marginTop: navbarHeight,
            marginLeft: sidebarWidth,
            transition: "all 0.3s ease",
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favourite" element={<FavouriteSongs />} />
            {/* <Route path="/playlist" element={<Playlist />} /> */}
            <Route path="/album/:id" element={<AlbumDetails />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
