import { useState, useMemo } from "react";
import { HiOutlinePencil, HiOutlineTrash, HiPlus, HiSearch } from "react-icons/hi";
import ComplaintModal from "../components/Complaintpopups/ComplaintModal";
import DeleteModal from "../components/Noticespopups/DeleteModal"; // Reusing your existing delete modal
import { BackgroundEffect } from "./BackgroundEffect";

export default function ComplaintManagement() {
  const [complaints, setComplaints] = useState([
    { id: 1, name: "Dhivya S", compID: "COMP1", category: "Anti-Ragging", dept: "Computer Science", subject: "Issue regarding labs", status: "Pending", description: "Detailed description here..." },
    { id: 2, name: "Dinesh", compID: "COMP2", category: "Harassment", dept: "Electronics", subject: "Issue regarding hostel", status: "In Progress", description: "Another description here..." },
  ]);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<any | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // Filter Logic
  const filteredComplaints = useMemo(() => {
    return complaints.filter((c) => {
      const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.compID.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === "All" || c.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [complaints, searchQuery, filterStatus]);

  const handleSave = (data: any) => {
    if (selectedComplaint) {
      setComplaints(complaints.map(c => c.id === selectedComplaint.id ? data : c));
    } else {
      const newComplaint = { ...data, id: Date.now(), compID: `COMP${Math.floor(100 + Math.random() * 900)}` };
      setComplaints([newComplaint, ...complaints]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="pt-24 px-6 pb-12 bg-slate-50 min-h-screen relative overflow-hidden">
      <BackgroundEffect />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Complaint <span className="text-blue-600">Management</span></h1>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2">Authorized Personnel Access Only</p>
          </div>
          <button onClick={() => { setSelectedComplaint(null); setIsModalOpen(true); }}
            className="flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-blue-200 hover:bg-blue-700 hover:scale-105 transition-all">
            <HiPlus size={20} /> Log Complaint
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white/70 backdrop-blur-xl rounded-[2rem] p-6 mb-8 shadow-sm border border-white flex flex-wrap items-end gap-6">
          <div className="flex-1 min-w-[250px] space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase ml-1">Search Name or ID</label>
            <div className="relative">
              <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Find student..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border text-black placeholder-gray-400 border-gray-200 rounded-xl text-sm focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
              />
            </div>
          </div>

          <div className="w-full md:w-64 space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase ml-1">Status Filter</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 outline-none cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
                    <button
            onClick={() => { setSearchQuery(""); setFilterStatus("All"); }}
            className="px-6 py-3 text-white bg-blue-500 hover:bg-white border-2 hover:border-blue-500 hover:text-blue-500  rounded-3xl font-black text-[10px] uppercase tracking-widest transition-colors"
          >
            Reset Filters
          </button>
        </div>

        {/* Table */}
        <div className="bg-white/90 backdrop-blur-md rounded-[2.5rem] border border-white shadow-xl overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-blue-50 text-blue-600 text-[10px] uppercase tracking-widest font-black border-b border-slate-200">
                <th className="p-6">Student & ID</th>
                <th className="p-6">Category</th>
                <th className="p-6">Subject</th>
                <th className="p-6">Status</th>
                <th className="p-6">Description</th>
                <th className="p-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredComplaints.map((c) => (
                <tr key={c.id} className="hover:bg-blue-50/30 border-1 border-b  border-slate-200 transition-colors group">
                  <td className="py-3 px-6">
                    <p className="font-bold text-slate-800 text-sm">{c.name}</p>
                    <p className="text-[10px] font-black text-blue-500 uppercase">{c.compID}</p>
                  </td>
                  <td className="py-3 px-6 text-xs font-bold text-slate-500">{c.category}</td>
                  <td className="py-3 px-6text-sm text-slate-600 italic">{c.subject}</td>
                  <td className="py-3 px-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${c.status === "Pending" ? "bg-amber-100 text-amber-600" :
                        c.status === "In Progress" ? "bg-blue-100 text-blue-600" : "bg-emerald-100 text-emerald-600"
                      }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-sm text-slate-600 italic">{c.description}</td>
                  <td className="py-3 px-6text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => { setSelectedComplaint(c); setIsModalOpen(true); }} className="p-2 text-blue-500 hover:bg-blue-50 rounded-xl transition-all">
                        <HiOutlinePencil size={18} />
                      </button>
                      <button onClick={() => { setDeleteId(c.id); setIsDeleteOpen(true); }} className="p-2 text-red-400 hover:bg-red-50 rounded-xl transition-all">
                        <HiOutlineTrash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredComplaints.length === 0 && (
            <div className="p-20 text-center text-slate-400 font-bold">No records found.</div>
          )}
        </div>
      </div>

      <ComplaintModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={selectedComplaint}
      />

      <DeleteModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={() => {
          setComplaints(complaints.filter(c => c.id !== deleteId));
          setIsDeleteOpen(false);
        }}
      />
    </div>
  );
}