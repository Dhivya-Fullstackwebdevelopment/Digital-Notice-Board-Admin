import { useState, useEffect } from "react";
import { HiOutlineX } from "react-icons/hi";
import { CATEGORIES, DEPARTMENTS, type Notice } from "../types/notices";

export default function NoticeModal({ isOpen, onClose, onSave, initialData }: any) {
    const [formData, setFormData] = useState<Notice>({
        id: "",
        title: "",
        categoryId: "1",
        deptId: "1",
        content: ""
    });

    useEffect(() => {
        if (initialData) setFormData(initialData);
        else setFormData({ id: "", title: "", categoryId: "1", deptId: "1", content: "" });
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm">
            <div className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100">
                {/* Header - Light Theme */}
                <div className="bg-white p-6 flex justify-between items-center border-b border-slate-100">
                    <div>
                      <h2 className="text-xl font-black text-slate-900 tracking-tight">
                        {initialData ? "Modify Notice" : "New Notice"}
                      </h2>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Editor Mode</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
                      <HiOutlineX size={20} />
                    </button>
                </div>

                <div className="p-8">
                    <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); onSave(formData); }}>
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Notice Title</label>
                            <input 
                              required 
                              value={formData.title} 
                              onChange={e => setFormData({ ...formData, title: e.target.value })} 
                              className="w-full text-slate-900 px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold" 
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Assign Department</label>
                                <select 
                                  value={formData.deptId} 
                                  onChange={e => setFormData({ ...formData, deptId: e.target.value })} 
                                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-bold text-sm text-slate-600 cursor-pointer"
                                >
                                    <option value="0">All Departments</option>
                                    {DEPARTMENTS.map(d => <option key={d.id} value={d.id}>{d.label}</option>)}
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Category</label>
                                <select 
                                  value={formData.categoryId} 
                                  onChange={e => setFormData({ ...formData, categoryId: e.target.value })} 
                                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-bold text-sm text-slate-600 cursor-pointer"
                                >
                                    {CATEGORIES.filter(c => c.id !== "0").map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Description</label>
                            <textarea 
                              required 
                              rows={4} 
                              value={formData.content} 
                              onChange={e => setFormData({ ...formData, content: e.target.value })} 
                              className="w-full text-slate-900 px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-medium resize-none" 
                            />
                        </div>

                        <button type="submit" className="w-full text-white bg-blue-600 py-4 rounded-2xl font-black text-lg shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all mt-2 uppercase tracking-widest">
                            {initialData ? "Save Changes" : "Commit to Portal"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}