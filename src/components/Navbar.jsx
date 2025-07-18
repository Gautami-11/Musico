

const Navbar = () => {
  return (
 <nav className="fixed bg-black backdrop-blur-md top-0 left-0 right-0 z-50 h-26 shadow-md tektur  px-4">
  <div className="flex justify-between items-center h-full  w-full">
   
    <div className="flex items-center gap-3">
      <img src="/navlogo.png" alt="Musico Logo" width={90} />
      <h1  className=" navbartext text-4xl text-amber-400 font-semibold">Musico</h1>
    </div>

 
  </div>
</nav>

   
  );
};

export default Navbar;
