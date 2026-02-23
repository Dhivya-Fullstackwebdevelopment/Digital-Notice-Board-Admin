import { useState, useMemo } from "react";
import { HiOutlinePencil, HiOutlineTrash, HiPlus, HiOutlineFilter, HiSearch } from "react-icons/hi";
import NoticeModal from "../components/Noticespopups/NoticeModal";
import DeleteModal from "../components/Noticespopups/DeleteModal";
import { CATEGORIES, DEPARTMENTS, type Notice } from "../components/types/notices";

export default function NoticeManagement() {
  const [notices, setNotices] = useState<Notice[]>([
    { id: "NTC001", title: "Semester Results Out", categoryId: "5", deptId: "10", content: "Fall 2025 results published on the student portal." },
    { id: "NTC002", title: "Annual Sports Meet", categoryId: "7", deptId: "1", content: "Register for upcoming sports meet scheduled for next month." },
  ]);

  // Search & Filter States
  const [searchTitle, setSearchTitle] = useState("");
  const [filterDept, setFilterDept] = useState("0");
  const [filterCat, setFilterCat] = useState("0");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const getDeptLabel = (id: string) => DEPARTMENTS.find(d => d.id === id)?.label || "N/A";
  const getCatLabel = (id: string) => CATEGORIES.find(c => c.id === id)?.label || "N/A";

  // Filter Logic
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
    <div className="pt-24 px-6 pb-12 bg-slate-50 min-h-screen font-sans">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Notice Management</h1>
          <p className="text-slate-400 text-xs mt-1 font-bold uppercase tracking-wider">Campus Communications Manager</p>
        </div>
        <button onClick={() => { setSelectedNotice(null); setIsModalOpen(true); }}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-black shadow-lg hover:bg-blue-700 transition-all">
          <HiPlus size={18} /> New Announcement
        </button>
      </div>

      {/* Filter & Search Panel */}
      <div className="bg-white rounded-3xl p-6 mb-8 shadow-sm border border-slate-200 flex flex-wrap items-end gap-6">
        <div className="flex-1 min-w-[200px] space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Search Title</label>
          <div className="relative">
            <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Type to search..." 
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              className="w-full placeholder-gray-400 pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" 
            />
          </div>
        </div>

        <div className="w-full md:w-56 space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Department</label>
          <select 
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
            className="w-full text-black bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
          >
            <option value="0">All Departments</option>
            {DEPARTMENTS.map(d => <option key={d.id} value={d.id}>{d.label}</option>)}
          </select>
        </div>

        <div className="w-full md:w-56 space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Category</label>
          <select 
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value)}
            className="w-full text-black bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
          >
            {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
          </select>
        </div>

        <button 
          onClick={() => { setSearchTitle(""); setFilterDept("0"); setFilterCat("0"); }}
          className="px-6 py-2.5 text-slate-500 hover:text-slate-800 font-bold text-sm transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 text-slate-400 text-[10px] uppercase tracking-widest font-black border-b border-slate-200">
              <th className="p-6">ID</th>
              <th className="p-6">Title</th>
              <th className="p-6">Department</th>
              <th className="p-6">Category</th>
              <th className="p-6">Description</th>
              <th className="p-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredNotices.map((n) => (
              <tr key={n.id} className="hover:bg-blue-50/40 transition-colors group">
                <td className="p-4 font-black text-slate-400 text-[11px]">{n.id}</td>
                <td className="p-4 font-bold text-slate-800 text-sm">{n.title}</td>
                <td className="p-4 text-slate-500 text-xs font-semibold">{getDeptLabel(n.deptId)}</td>
                <td className="p-4">
                  <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md text-[9px] font-black border border-blue-100 uppercase">
                    {getCatLabel(n.categoryId)}
                  </span>
                </td>
                <td className="p-4 text-slate-500 text-[11px] italic line-clamp-1">{n.content}</td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-1">
                    <button onClick={() => { setSelectedNotice(n); setIsModalOpen(true); }} className="p-2 text-blue-500 hover:bg-blue-100 rounded-lg transition-colors">
                      <HiOutlinePencil size={18} />
                    </button>
                    <button onClick={() => { setDeleteId(n.id); setIsDeleteOpen(true); }} className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors">
                      <HiOutlineTrash size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredNotices.length === 0 && (
          <div className="p-20 text-center text-slate-400 font-medium">No notices found.</div>
        )}
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