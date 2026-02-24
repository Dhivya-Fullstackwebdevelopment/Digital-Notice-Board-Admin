import { useState, useEffect } from "react";
import { HiOutlineX } from "react-icons/hi";
import { CATEGORIES, DEPARTMENTS, type Notice } from "../types/notices";
import {BackgroundEffect} from "../BackgroundEffect";

export default function NoticeModal({ isOpen, onClose, onSave, initialData }: any) {
    const [formData, setFormData] = useState<Notice>({
        id: "", title: "", categoryId: "1", deptId: "1", content: ""
    });

    useEffect(() => {
        if (initialData) setFormData(initialData);
        else setFormData({ id: "", title: "", categoryId: "1", deptId: "1", content: "" });
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-md">
            <div className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-white relative">
                <BackgroundEffect />
                
                {/* Header - Impressive Light Theme */}
                <div className="relative z-10 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 flex justify-between items-center border-b border-blue-100">
                    <div>
                        <h2 className="text-xl font-black text-slate-900 tracking-tight">
                            {initialData ? "Modify Notice" : " New Notice"}
                        </h2>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                            <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Live Portal Editor</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 bg-white/80 hover:bg-white text-slate-400 hover:text-blue-600 rounded-full shadow-sm transition-all border border-blue-100">
                        <HiOutlineX size={20} />
                    </button>
                </div>

                <div className="p-8 relative z-10">
                    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onSave(formData); }}>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Announcement Title</label>
                            <input required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} 
                                className="w-full text-slate-900 px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-400 focus:bg-white transition-all  shadow-sm" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Department</label>
                                <select value={formData.deptId} onChange={e => setFormData({ ...formData, deptId: e.target.value })} 
                                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-4 focus:ring-blue-500/10  text-sm text-slate-700 appearance-none cursor-pointer">
                                    <option value="0">All Departments</option>
                                    {DEPARTMENTS.map(d => <option key={d.id} value={d.id}>{d.label}</option>)}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Category</label>
                                <select value={formData.categoryId} onChange={e => setFormData({ ...formData, categoryId: e.target.value })} 
                                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-4 focus:ring-blue-500/10  text-sm text-slate-700 appearance-none cursor-pointer">
                                    {CATEGORIES.filter(c => c.id !== "0").map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Main Content</label>
                            <textarea required rows={4} value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })} 
                                className="w-full text-slate-900 px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-4 focus:ring-blue-500/10 transition-all  resize-none shadow-sm" />
                        </div>

                        <button type="submit" className="w-full text-white bg-blue-600 py-2 rounded-2xl font-black text-md shadow-xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all mt-2 uppercase tracking-widest">
                            {initialData ? "Apply Changes" : "Post to Portal"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}