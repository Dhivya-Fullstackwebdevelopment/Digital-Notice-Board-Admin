import { Link, useNavigate, useLocation } from "react-router-dom";
import { HiOutlineLogout, HiViewGrid, HiOutlineBell, HiOutlineChatAlt2 } from "react-icons/hi";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/");
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex justify-between items-center shadow-sm">
      <div className="flex items-center gap-10">
        <Link to={isAdmin ? "/dashboard" : "/"} className="flex items-center gap-2 group">
          <div className="bg-blue-600 p-2 rounded-xl text-white group-hover:bg-blue-700 transition-colors">
            <HiViewGrid size={24} />
          </div>
          <span className="text-2xl font-black text-slate-800 tracking-tighter">CAMPUS<span className="text-blue-600">CONNECT</span></span>
        </Link>

        {isAdmin && (
          <div className="hidden md:flex items-center gap-8">
            <Link to="/dashboard" className={`font-bold transition-colors ${location.pathname === "/dashboard" ? "text-blue-600" : "text-slate-500 hover:text-blue-600"}`}>
               Dashboard
            </Link>
            <Link to="/notices" className={`flex items-center gap-2 font-bold transition-colors ${location.pathname === "/notices" ? "text-blue-600" : "text-slate-500 hover:text-blue-600"}`}>
              <HiOutlineBell size={20} /> Notices
            </Link>
            <Link to="/complaints" className={`flex items-center gap-2 font-bold transition-colors ${location.pathname === "/complaints" ? "text-blue-600" : "text-slate-500 hover:text-blue-600"}`}>
              <HiOutlineChatAlt2 size={20} /> Complaints
            </Link>
          </div>
        )}
      </div>

      <div>
        {isAdmin ? (
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-50 text-red-600 px-5 py-2 rounded-full font-black hover:bg-red-100 transition-all border border-red-100"
          >
            <HiOutlineLogout size={20} /> Logout
          </button>
        ) : (
          <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
            <HiViewGrid size={20} />
          </div>
        )}
      </div>
    </nav>
  );
}