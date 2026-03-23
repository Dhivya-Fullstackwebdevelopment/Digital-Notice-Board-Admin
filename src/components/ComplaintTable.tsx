import { useState, useMemo, useEffect } from "react";
import { HiOutlinePencil, HiOutlineTrash, HiPlus, HiSearch, HiOutlineFilter } from "react-icons/hi";
import ComplaintModal from "../components/Complaintpopups/ComplaintModal";
import DeleteModal from "../components/Noticespopups/DeleteModal";
import { BackgroundEffect } from "./BackgroundEffect";
import apiClient from "../api/apiUrl"; // Ensure this path is correct
import { CircularProgress } from '@mui/material';
import { NotifyError, NotifySuccess } from "../Toast/ToastNotification";

export default function ComplaintManagement() {
  const [complaints, setComplaints] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<any | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // 1. Fetch Data from API
  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get("/api/complaints/all");
      if (response.data.Status === 1) {
        setComplaints(response.data.data);
      }
    } catch (error) {
      console.error("Error:", error);
      NotifyError("Failed to fetch complaints");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchComplaints(); }, []);

  // 2. Filter Logic
  const filteredComplaints = useMemo(() => {
    return complaints.filter((c) => {
      const matchesSearch = c.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.complaintId.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === "All" || c.status.toLowerCase() === filterStatus.toLowerCase();
      return matchesSearch && matchesStatus;
    });
  }, [complaints, searchQuery, filterStatus]);

  // 3. Handle Save (Refresh list)
  const handleSave = () => {
    setIsModalOpen(false);
    fetchComplaints();
  };

  // 4. Handle Delete
  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const response = await apiClient.delete(`/api/complaints/delete/${deleteId}`);
      if (response.data.Status === 1) {
        NotifySuccess("Complaint deleted successfully");
        fetchComplaints();
      }
    } catch (error) {
      NotifyError("Delete failed");
    } finally {
      setIsDeleteOpen(false);
    }
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
          <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
            {loading ? (
              <div className="flex justify-center p-20"><CircularProgress /></div>
            ) : (
              <>
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-blue-50 text-blue-600 text-[10px] uppercase tracking-widest font-black border-b border-slate-200">
                      <th className="p-6">Student & ID</th>
                      <th className="p-6">Category</th>
                      <th className="p-6">Department</th>
                      <th className="p-6">Subject</th>
                      <th className="p-6">Status</th>
                      <th className="p-6">Resolution</th>
                      <th className="p-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredComplaints.map((c) => (
                      <tr key={c._id} className="hover:bg-blue-50/30 border-b border-slate-200 transition-colors group">
                        <td className="py-3 px-6">
                          <p className="font-bold text-slate-800 text-sm">{c.studentName}</p>
                          <p className="text-[10px] font-black text-blue-500 uppercase">{c.complaintId}</p>
                        </td>
                        <td className="py-3 px-6 text-xs font-bold text-slate-500">{c.categoryName || c.otherCategory}</td>
                        <td className="py-3 px-6 text-xs font-bold text-slate-500">{c.deptName || c.otherDept}</td>
                        <td className="py-3 px-6 text-sm text-slate-600">{c.subject}</td>
                        <td className="py-3 px-6">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${c.status === "pending"
                            ? "bg-amber-100 text-amber-600"
                            : c.status === "inprogress"
                              ? "bg-blue-100 text-blue-600"
                              : "bg-emerald-100 text-emerald-600"
                            }`}>
                            {c.status}
                          </span>
                        </td>
                        <td className="py-3 px-6 text-xs font-bold text-slate-500">{c.resolution}</td>
                        <td className="py-3 px-6 text-right">
                          <div className="flex justify-end gap-2">
                            <button onClick={() => { setSelectedComplaint(c); setIsModalOpen(true); }} className="p-2 text-blue-500 hover:bg-blue-50 rounded-xl transition-all">
                              <HiOutlinePencil size={18} />
                            </button>
                            <button onClick={() => { setDeleteId(c.complaintId); setIsDeleteOpen(true); }} className="p-2 text-red-400 hover:bg-red-50 rounded-xl transition-all">
                              <HiOutlineTrash size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredComplaints.length === 0 && (
                  <div className="p-24 text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                      <HiOutlineFilter size={32} />
                    </div>
                    <p className="text-slate-400 font-bold">No complaints found matching your filters.</p>
                  </div>
                )}
              </>
            )}
          </div>
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
        onConfirm={handleDelete}
      />
    </div >
  );
}