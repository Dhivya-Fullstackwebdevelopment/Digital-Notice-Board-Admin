import { HiOutlineBell, HiOutlineChatAlt2, HiOutlineUsers } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const stats = [
    { label: "Active Notices", count: 12, icon: <HiOutlineBell />, color: "bg-blue-500", link: "/notices" },
    { label: "Pending Complaints", count: 8, icon: <HiOutlineChatAlt2 />, color: "bg-amber-500", link: "/complaints" },
    { label: "Total Students", count: "1,240", icon: <HiOutlineUsers />, color: "bg-emerald-500", link: "#" },
  ];

  return (
    <div className="pt-28 px-8 pb-12 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Admin Dashboard</h1>
        <p className="text-slate-500 mt-1 italic font-medium">Welcome back, Administrator</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, idx) => (
          <Link to={stat.link} key={idx} className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100 hover:scale-[1.02] transition-transform group">
            <div className={`w-14 h-14 ${stat.color} text-white rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-lg shadow-inherit`}>
              {stat.icon}
            </div>
            <h3 className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-1">{stat.label}</h3>
            <p className="text-4xl font-black text-slate-800">{stat.count}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}