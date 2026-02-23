import { HiOutlinePencil, HiOutlineTrash, HiPlus } from "react-icons/hi";

const notices = [
  { id: 1, title: "Semester Results Out", category: "Academic", content: "The results for the Fall 2025 semester have been published on the portal." },
  { id: 2, title: "Annual Sports Meet", category: "Events", content: "Register now for the upcoming sports meet scheduled for next week." },
  { id: 3, title: "Library Renovation", category: "Facilities", content: "The central library will be closed for maintenance from Friday to Sunday." },
  // ... rest of data
];

export default function NoticeManagement() {

  return (
    <div className="pt-28 px-8 pb-12 max-w-7xl mx-auto">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Notice Management</h1>
          <p className="text-slate-500 mt-1 font-medium italic">Create and manage campus-wide announcements</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
            <HiPlus size={20} /> New Notice
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-5 font-black text-slate-400 text-xs uppercase tracking-widest">Title</th>
              <th className="p-5 font-black text-slate-400 text-xs uppercase tracking-widest">Category</th>
              <th className="p-5 font-black text-slate-400 text-xs uppercase tracking-widest">Content</th>
              <th className="p-5 font-black text-slate-400 text-xs uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {notices.map((n) => (
              <tr key={n.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                <td className="p-5 font-bold text-blue-700">{n.title}</td>
                <td className="p-5">
                  <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-xs font-black border border-slate-200 uppercase tracking-tighter">
                    {n.category}
                  </span>
                </td>
                <td className="p-5 text-slate-600 max-w-md truncate">{n.content}</td>
                <td className="p-5 text-right flex justify-end gap-2">
                  <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><HiOutlinePencil size={20}/></button>
                  <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><HiOutlineTrash size={20}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}