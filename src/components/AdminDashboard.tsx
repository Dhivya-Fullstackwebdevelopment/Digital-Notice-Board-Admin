import { useEffect, useState } from "react";
import { HiOutlineBell, HiOutlineChatAlt2, HiOutlineUsers, HiOutlineClock, HiOutlineCheckCircle, HiOutlineRefresh } from "react-icons/hi";
import { Link } from "react-router-dom";
import { BackgroundEffect } from "./BackgroundEffect";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import axios from "axios"; // Ensure axios is installed
import apiClient from "../api/apiUrl";

export default function AdminDashboard() {
  const [data, setData] = useState({
    totalStudents: 0,
    totalNotices: 0,
    complaints: { total: 0, pending: 0, inProgress: 0, resolved: 0 }
  });

  // 1. Fetch real data from backend
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await apiClient.get("/api/dashboard/stats");
        if (res.data.Status === 1) {
          setData(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
      }
    };
    fetchStats();
  }, []);

  // 2. Define Main Overview Cards
  const mainStats = [
    { label: "Total Students", count: data.totalStudents, icon: <HiOutlineUsers />, color: "bg-emerald-500", hex: "#10b981", shadow: "shadow-emerald-200", link: "#" },
    { label: "Total Notices", count: data.totalNotices, icon: <HiOutlineBell />, color: "bg-blue-500", hex: "#3b82f6", shadow: "shadow-blue-200", link: "/notices" },
    { label: "Total Complaints", count: data.complaints.total, icon: <HiOutlineChatAlt2 />, color: "bg-slate-700", hex: "#334155", shadow: "shadow-slate-200", link: "/complaints" },
  ];

  // 3. Define Complaint Status Cards
  const statusStats = [
    { label: "Pending", count: data.complaints.pending, icon: <HiOutlineClock />, color: "bg-rose-500", hex: "#f43f5e" },
    { label: "In Progress", count: data.complaints.inProgress, icon: <HiOutlineRefresh />, color: "bg-amber-500", hex: "#f59e0b" },
    { label: "Resolved", count: data.complaints.resolved, icon: <HiOutlineCheckCircle />, color: "bg-emerald-400", hex: "#34d399" },
  ];

  // 4. Chart Data specifically for Complaint Status
  const chartData = statusStats.map(s => ({
    name: s.label,
    value: s.count,
    color: s.hex
  }));

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden font-sans">
      <BackgroundEffect />

      <div className="relative z-10 pt-28 px-8 pb-12 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">
            Admin <span className="text-blue-600">Dashboard</span>
          </h1>
          <p className="text-slate-500 italic font-bold text-[11px] uppercase tracking-wider mt-1">
            Real-time Campus Monitoring
          </p>
        </div>

        {/* Top Level Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {mainStats.map((stat, idx) => (
            <Link to={stat.link} key={idx} className="group bg-white/70 backdrop-blur-xl p-6 rounded-[2rem] shadow-xl border border-white hover:translate-y-[-3px] transition-all">
              <div className={`w-12 h-12 ${stat.color} text-white rounded-xl flex items-center justify-center text-xl mb-4 shadow-lg`}>
                {stat.icon}
              </div>
              <h3 className="text-slate-400 font-black uppercase text-[12px] tracking-widest">{stat.label}</h3>
              <p className="text-3xl font-black text-slate-900">{stat.count}</p>
            </Link>
          ))}
        </div>

        {/* Complaint Status Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Status Breakdown Cards */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-4 px-2">Complaint Status</h2>
            {statusStats.map((status, idx) => (
              <div key={idx} className="bg-white/50 backdrop-blur-md p-5 rounded-2xl border border-white flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${status.color} text-white`}>{status.icon}</div>
                  <span className="font-bold text-slate-600 uppercase text-xs tracking-tighter">{status.label}</span>
                </div>
                <span className="text-xl font-black text-slate-800">{status.count}</span>
              </div>
            ))}
          </div>

          {/* Pie Chart Analysis */}
          <div className="lg:col-span-2 bg-white/70 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-xl border border-white">
            <h2 className="text-xl font-black text-slate-800 tracking-tight uppercase mb-6">
              Resolution <span className="text-blue-600">Analysis</span>
            </h2>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={chartData} cx="50%" cy="50%" innerRadius={70} outerRadius={100} paddingAngle={1} dataKey="value" stroke="none">
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '15px', border: 'none', fontWeight: '900' }} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}