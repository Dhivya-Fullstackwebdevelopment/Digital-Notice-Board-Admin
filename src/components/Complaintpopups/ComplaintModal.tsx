import { useState, useEffect } from "react";
import { HiOutlineX } from "react-icons/hi";
import { BackgroundEffect } from "../BackgroundEffect";

export default function ComplaintModal({ isOpen, onClose, onSave, initialData }: any) {
  const [formData, setFormData] = useState({
    name: "", 
    compID: "", 
    category: "Anti-Ragging", 
    dept: "Computer Science", 
    subject: "", 
    status: "Pending", 
    description: "",
    resolution: "" 
  });

  useEffect(() => {
    if (initialData) setFormData({ ...initialData, resolution: initialData.resolution || "" });
    else setFormData({ name: "", compID: "", category: "Anti-Ragging", dept: "Computer Science", subject: "", status: "Pending", description: "", resolution: "" });
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-md">
      
      <div className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-white relative">
        <BackgroundEffect />
        
        {/* Header Section */}
        <div className="relative z-10 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 flex justify-between items-center border-b border-blue-100">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              {initialData ? "Resolve Complaint" : "New Complaint Log"}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className={`w-2 h-2 rounded-full animate-pulse ${formData.status === 'Resolved' ? 'bg-green-500' : 'bg-amber-500'}`} />
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Grievance Redressal System</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 bg-white/80 hover:bg-white text-slate-400 hover:text-blue-600 rounded-full shadow-sm transition-all border border-blue-100">
            <HiOutlineX size={20} />
          </button>
        </div>

        {/* Scrollable Content Body - Uses global .custom-scrollbar from index.css */}
        <div className="p-8 relative z-10 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); onSave(formData); }}>
            
            {/* Student Name & Status */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Student Name</label>
                <input required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} 
                  className="w-full text-slate-900 px-5 py-3 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-400 focus:bg-white transition-all font-bold shadow-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Current Status</label>
                <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} 
                  className="w-full px-5 py-3 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-4 focus:ring-blue-500/10 font-bold text-sm text-slate-700 appearance-none cursor-pointer">
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Complaint Subject</label>
              <input required value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} 
                className="w-full text-slate-900 px-5 py-3 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-400 focus:bg-white transition-all font-bold shadow-sm" />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Issue Description</label>
              <textarea rows={3} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} 
                className="w-full text-slate-900 px-5 py-3 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-medium resize-none shadow-sm" />
            </div>

            {/* Admin Resolution Field */}
            <div className="space-y-2 p-4 bg-blue-50/50 rounded-3xl border border-blue-100">
              <label className="text-[10px] font-black uppercase tracking-widest text-blue-500 ml-1">Resolution / Action Taken (Admin Only)</label>
              <textarea 
                placeholder="Describe how this issue was resolved..."
                rows={2} 
                value={formData.resolution} 
                onChange={e => setFormData({ ...formData, resolution: e.target.value })} 
                className="w-full text-slate-900 px-5 py-3 rounded-xl bg-white border border-blue-200 outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-medium resize-none shadow-sm" />
            </div>

            <button type="submit" className="w-full text-white bg-blue-600 py-4 rounded-2xl font-black text-sm shadow-xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all mt-2 uppercase tracking-widest">
              {initialData ? "Update & Finalize Record" : "Post Complaint"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}