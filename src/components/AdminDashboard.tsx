import { HiOutlineBell, HiOutlineChatAlt2, HiOutlineUsers } from "react-icons/hi";
import { Link } from "react-router-dom";
import { BackgroundEffect } from "./BackgroundEffect";

export default function AdminDashboard() {
  const stats = [
    { label: "Total Notices", count: 12, icon: <HiOutlineBell />, color: "bg-blue-500", shadow: "shadow-blue-200", link: "/notices" },
    { label: "Total Complaints", count: 8, icon: <HiOutlineChatAlt2 />, color: "bg-amber-500", shadow: "shadow-amber-200", link: "/complaints" },
    { label: "Total Students", count: "1,240", icon: <HiOutlineUsers />, color: "bg-emerald-500", shadow: "shadow-emerald-200", link: "#" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden font-sans">
      <BackgroundEffect />

      <div className="relative z-10 pt-28 px-8 pb-12 max-w-7xl mx-auto">
        {/* Header Section*/}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">
            Admin <span className="text-blue-600">Dashboard</span>
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            <p className="text-slate-500 italic font-bold text-[11px] uppercase tracking-wider">
              System Overview & Control
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, idx) => (
            <Link 
              to={stat.link} 
              key={idx} 
              className="group relative bg-white/70 backdrop-blur-xl p-6 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-white hover:translate-y-[-3px] transition-all duration-300"
            >
              <div className={`w-12 h-12 ${stat.color} text-white rounded-xl flex items-center justify-center text-xl mb-4 shadow-2xl ${stat.shadow} group-hover:scale-105 transition-transform`}>
                {stat.icon}
              </div>

              <div>
                <h3 className="text-slate-400 font-black uppercase tracking-[0.15em] text-[12px] mb-1">
                  {stat.label}
                </h3>
                <p className="text-3xl font-black text-slate-900 tracking-tighter">
                  {stat.count}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}