import { useState, useEffect } from "react";
import { HiOutlineX } from "react-icons/hi";
import { BackgroundEffect } from "../BackgroundEffect";

export default function ComplaintModal({ isOpen, onClose, onSave, initialData }: any) {
  const [formData, setFormData] = useState({
    name: "", compID: "", category: "Anti-Ragging", dept: "Computer Science", subject: "", status: "Pending", description: ""
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
    else setFormData({ name: "", compID: "", category: "Anti-Ragging", dept: "Computer Science", subject: "", status: "Pending", description: "" });
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-md">
      <div className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden relative border border-white">
        <BackgroundEffect />
        
        <div className="relative z-10 bg-blue-100 p-6 flex justify-between items-center border-b border-slate-100">
          <h2 className="text-xl font-black  text-slate-900 tracking-tight">
            {initialData ? "Edit Complaint" : "New Complaint Log"}
          </h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-red-500 transition-all">
            <HiOutlineX size={20} />
          </button>
        </div>

        <div className="p-8 relative z-10">
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onSave(formData); }}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Student Name</label>
                <input required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} 
                  className="w-full px-5 py-3 rounded-2xl text-black  bg-slate-50 border border-slate-200 outline-none focus:bg-white font-bold text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Status</label>
                <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} 
                  className="w-full px-5 py-3 rounded-2xl text-black bg-slate-50 border border-slate-200 outline-none font-bold text-sm cursor-pointer">
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Subject</label>
              <input required value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} 
                className="w-full px-5 py-3 rounded-2xl text-black bg-slate-50 border border-slate-200 outline-none focus:bg-white font-bold text-sm" />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Description</label>
              <textarea rows={3} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} 
                className="w-full px-5 py-3 rounded-2xl text-black bg-slate-50 border border-slate-200 outline-none focus:bg-white text-sm" />
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black shadow-lg hover:bg-blue-700 transition-all uppercase tracking-widest text-xs mt-4">
              {initialData ? "Update Record" : "Save Complaint"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}