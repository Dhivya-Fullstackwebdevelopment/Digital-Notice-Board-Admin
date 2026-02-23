import { Link, useNavigate, useLocation } from "react-router-dom";
import { HiOutlineLogout, HiOutlineBell } from "react-icons/hi";
import { FaGraduationCap } from "react-icons/fa";
import { motion } from "framer-motion";
import { GiGraduateCap } from "react-icons/gi";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/");
  };

  const navLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Notices", path: "/notices" },
    { name: "Complaints", path: "/complaints" },
  ];

  return (
    <nav className="fixed top-0 w-full z-[100] bg-white/90 backdrop-blur-xl border-b border-slate-100 px-8 py-3 flex justify-between items-center shadow-sm">

      {/* LEFT: Branding with Graduation Icon */}
      <div className="flex items-center gap-3 shrink-0">
        <Link to={isAdmin ? "/dashboard" : "/"} className="flex items-center gap-2 group cursor-pointer">
          <div className="bg-black w-10 h-10 rounded-full flex items-center justify-center text-white shadow-xl group-hover:rotate-12 transition-transform duration-300">
            <GiGraduateCap size={22} />
          </div>
          <span className="text-xl font-black text-slate-900 tracking-tighter uppercase">
            Campus<span className="text-blue-600">Connect</span>
          </span>
        </Link>
      </div>

      {/* CENTER: Navigation with Sliding Underline */}
      {isAdmin && (
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 text-[14px] font-black uppercase tracking-widest transition-all duration-300 cursor-pointer ${isActive ? "text-blue-600" : "text-slate-400 hover:text-slate-900"
                  }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0  w-full h-[3px] bg-blue-600 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      )}

      {/* RIGHT: Black Theme Logout Button */}
      <div className="shrink-0">
        {isAdmin ? (
          <button
            onClick={handleLogout}
            className="group relative flex items-center gap-2 bg-slate-900 text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest overflow-hidden transition-all hover:bg-black hover:shadow-2xl hover:shadow-blue-200 active:scale-95 cursor-pointer"
          >
            <span className="relative z-10">Logout</span>
            <HiOutlineLogout size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-20 transition-opacity" />
          </button>
        ) : (
          <div className="p-2 bg-slate-50 border border-slate-100 rounded-full text-slate-400 cursor-pointer hover:text-blue-600 transition-colors">
            <HiOutlineBell size={22} />
          </div>
        )}
      </div>
    </nav>
  );
}