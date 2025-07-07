import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
// import Search from "./pages/Search";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AlbumDetails from './pages/AlbumDetails';


function App() {
  return (
    <Router>
      <div className="flex bg-black min-h-screen text-white">
        <Sidebar />
        <div className="flex-1 ml-0 md:ml-60">
          <Navbar />
          <main className="p-6">
            <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route path="/search" element={<Search />} /> */}
               <Route path="/album/:id" element={<AlbumDetails />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
