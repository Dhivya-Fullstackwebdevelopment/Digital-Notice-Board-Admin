import { useState, useMemo } from "react";
import { HiOutlinePencil, HiOutlineTrash, HiPlus, HiOutlineFilter, HiSearch } from "react-icons/hi";
import NoticeModal from "../components/Noticespopups/NoticeModal";
import DeleteModal from "../components/Noticespopups/DeleteModal";
import { CATEGORIES, DEPARTMENTS, type Notice } from "../components/types/notices";
import { BackgroundEffect } from "./BackgroundEffect";

export default function NoticeManagement() {
  // Initial State
  const [notices, setNotices] = useState<Notice[]>([
    { id: "NTC001", title: "Semester Results Out", categoryId: "5", deptId: "10", content: "Fall 2025 results published on the student portal." },
    { id: "NTC002", title: "Annual Sports Meet", categoryId: "7", deptId: "1", content: "Register for upcoming sports meet scheduled for next month." },
  ]);

  // Search & Filter States
  const [searchTitle, setSearchTitle] = useState("");
  const [filterDept, setFilterDept] = useState("0");
  const [filterCat, setFilterCat] = useState("0");

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Helpers
  const getDeptLabel = (id: string) => DEPARTMENTS.find(d => d.id === id)?.label || "N/A";
  const getCatLabel = (id: string) => CATEGORIES.find(c => c.id === id)?.label || "N/A";

  // Combined Filter & Search Logic
  const filteredNotices = useMemo(() => {
    return notices.filter((n) => {
      const matchesSearch = n.title.toLowerCase().includes(searchTitle.toLowerCase());
      const matchesDept = filterDept === "0" || n.deptId === filterDept;
      const matchesCat = filterCat === "0" || n.categoryId === filterCat;
      return matchesSearch && matchesDept && matchesCat;
    });
  }, [notices, searchTitle, filterDept, filterCat]);

  const handleSave = (data: Notice) => {
    if (selectedNotice) {
      setNotices(notices.map(n => n.id === selectedNotice.id ? data : n));
    } else {
      const newNotice = { ...data, id: `NTC${Math.floor(100 + Math.random() * 900)}` };
      setNotices([newNotice, ...notices]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="pt-24 px-6 pb-12 bg-slate-50 min-h-screen font-sans relative overflow-hidden">
      <BackgroundEffect />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Notice <span className="text-blue-600">Management</span></h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="px-2 py-0.5 bg-blue-600 text-white text-[9px] font-black rounded uppercase">Admin</div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Campus Communications Control</p>
            </div>
          </div>
          <button onClick={() => { setSelectedNotice(null); setIsModalOpen(true); }}
            className="flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-blue-200 hover:bg-blue-700 hover:scale-105 transition-all">
            <HiPlus size={20} /> New Notice
          </button>
        </div>

        {/* Impressive Search Panel */}
        <div className="bg-white/70 backdrop-blur-xl rounded-[2rem] p-8 mb-8 shadow-sm border border-white flex flex-wrap items-end gap-6">
          <div className="flex-1 min-w-[250px] space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Search Notice Title</label>
            <div className="relative">
              <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Filter by title..."
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
                className="w-full pl-11 pr-4 py-3  text-black border border-gray-300 placeholder-gray-300 bg-white rounded-xl text-sm focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
              />
            </div>
          </div>

          <div className="w-full md:w-64 space-y-2">
            <label className="text-[10px] font-black text-slate-300 uppercase ml-1">Department Filter</label>
            <select
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-blue-500/10 cursor-pointer appearance-none"
            >
              <option value="0">All Departments</option>
              {DEPARTMENTS.map(d => <option key={d.id} value={d.id}>{d.label}</option>)}
            </select>
          </div>

          <div className="w-full md:w-64 space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Category Filter</label>
            <select
              value={filterCat}
              onChange={(e) => setFilterCat(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-blue-500/10 cursor-pointer appearance-none"
            >
              {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
          </div>

          <button
            onClick={() => { setSearchTitle(""); setFilterDept("0"); setFilterCat("0"); }}
            className="px-6 py-3 text-white bg-blue-500 hover:bg-white border-2 hover:border-blue-500 hover:text-blue-500  rounded-3xl font-black text-[10px] uppercase tracking-widest transition-colors"
          >
            Reset Filters
          </button>
        </div>

        {/* Table Section */}
        <div className="bg-white/90 backdrop-blur-md rounded-[2.5rem] border border-white shadow-xl overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-blue-50 text-blue-600 text-[10px] uppercase tracking-widest font-black border-b border-slate-200">
                <th className="p-6">ID</th>
                <th className="p-6">Announcement Title</th>
                <th className="p-6">Department</th>
                <th className="p-6">Category</th>
                <th className="p-6">Description</th>
                <th className="p-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y  divide-slate-50">
              {filteredNotices.map((n) => (
                <tr key={n.id} className="hover:bg-blue-50/30 transition-colors group border-b border-1 border-slate-200">
                  <td className="py-3 px-6 font-black text-slate-400 text-[11px]">{n.id}</td>
                  <td className="py-3 px-6">
                    <p className="font-bold text-slate-800 text-sm leading-none mb-1">{n.title}</p>
                  </td>
                  <td className="py-3 px-6 text-slate-500 text-xs font-bold">{getDeptLabel(n.deptId)}</td>
                  <td className="py-3 px-6">
                    <span className="bg-white text-blue-600 px-3 py-1 rounded-full text-[9px] font-black border border-blue-100 uppercase shadow-sm">
                      {getCatLabel(n.categoryId)}
                    </span>
                  </td>
                  <td className="py-3 px-6">
                    <p className=" text-slate-500 text-sm leading-none mb-1 italic">{n.title}</p>
                  </td>
                  <td className="py-3 px-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => { setSelectedNotice(n); setIsModalOpen(true); }} className="p-2.5 text-blue-500 hover:bg-blue-50 rounded-xl transition-all">
                        <HiOutlinePencil size={20} />
                      </button>
                      <button onClick={() => { setDeleteId(n.id); setIsDeleteOpen(true); }} className="p-2.5 text-red-400 hover:bg-red-50 rounded-xl transition-all">
                        <HiOutlineTrash size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredNotices.length === 0 && (
            <div className="p-24 text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                <HiOutlineFilter size={32} />
              </div>
              <p className="text-slate-400 font-bold">No announcements found matching your filters.</p>
            </div>
          )}
        </div>
      </div>

      <NoticeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={selectedNotice}
      />

      <DeleteModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={() => {
          if (deleteId) setNotices(notices.filter(n => n.id !== deleteId));
          setIsDeleteOpen(false);
        }}
      />
    </div>
  );
}