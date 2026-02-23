import { useState } from "react";
import { HiOutlinePencil, HiOutlineTrash, HiPlus} from "react-icons/hi";
import NoticeModal from "../components/Noticespopups/NoticeModal";
import DeleteModal from "../components/Noticespopups/DeleteModal";
import { CATEGORIES, DEPARTMENTS, type Notice } from "../components/types/notices";

export default function NoticeManagement() {
  const [notices, setNotices] = useState<Notice[]>([
    { id: "NTC001", title: "Semester Results Out", categoryId: "5", deptId: "10", content: "Fall 2025 results published on the student portal." },
    { id: "NTC002", title: "Annual Sports Meet", categoryId: "7", deptId: "1", content: "Register for upcoming sports meet scheduled for next month." },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Helper functions using direct string comparison
  const getDeptLabel = (id: string) => DEPARTMENTS.find(d => d.id === id)?.label || "N/A";
  const getCatLabel = (id: string) => CATEGORIES.find(c => c.id === id)?.label || "N/A";

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

      {/* Table */}
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 text-slate-400 text-[10px] uppercase tracking-widest font-black border-b border-slate-200">
              <th className="p-6">ID</th>
              <th className="p-6">Title</th>
              <th className="p-6">Department</th>
              <th className="p-6">Category</th>
              <th className="p-6">Description</th>
              <th className="p-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {notices.map((n) => (
              <tr key={n.id} className="hover:bg-blue-50/40 transition-colors group">
                <td className="p-4 font-black text-slate-400 text-[11px]">{n.id}</td>
                <td className="p-4 font-bold text-slate-800 text-sm">{n.title}</td>
                <td className="p-4 text-slate-500 text-xs font-semibold">{getDeptLabel(n.deptId)}</td>
                <td className="p-4">
                  <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md text-[9px] font-black border border-blue-100 uppercase">
                    {getCatLabel(n.categoryId)}
                  </span>
                </td>
                <td className="p-4  text-slate-500 text-[11px] italic">{n.content}</td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-1">
                    <button onClick={() => { setSelectedNotice(n); setIsModalOpen(true); }} className="p-2 text-blue-500 hover:bg-blue-100 rounded-lg">
                      <HiOutlinePencil size={18} />
                    </button>
                    <button onClick={() => { setDeleteId(n.id); setIsDeleteOpen(true); }} className="p-2 text-red-500 hover:bg-red-100 rounded-lg">
                      <HiOutlineTrash size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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