

const complaints = [
    { id: 1, name: "Student Name 1", compID: "COMP1", category: "Anti-Ragging", dept: "Computer Science", subject: "Issue regarding labs", status: "Pending" },
    { id: 2, name: "Student Name 2", compID: "COMP2", category: "Harassment", dept: "Electronics", subject: "Issue regarding hostel", status: "In Progress" },
    { id: 3, name: "Student Name 3", compID: "COMP3", category: "Campus Facilities", dept: "Mechanical", subject: "Issue regarding exams", status: "Resolved" },
];

export default function ComplaintManagement() {
    return (
        <div className="pt-28 px-8 pb-12 max-w-full mx-auto">
            <div className="mb-10">
                <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none">Complaint Management</h1>
                <p className="text-slate-500 mt-2 italic font-medium">Authorized Personnel Access Only</p>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl overflow-hidden overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[1000px]">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 text-xs uppercase tracking-widest font-black">
                            <th className="p-6">Full Name</th>
                            <th className="p-6">Complaint ID</th>
                            <th className="p-6">Category</th>
                            <th className="p-6">Department</th>
                            <th className="p-6">Subject</th>
                            <th className="p-6 w-[350px]">Description</th>
                            <th className="p-6">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {complaints.map((c) => (
                            <tr key={c.id} className="hover:bg-slate-50/50 transition-colors group">
                                <td className="p-6 font-bold text-blue-600">{c.name}</td>
                                 <td className="p-6 font-bold text-blue-600">{c.compID}</td>
                                <td className="p-6 text-slate-600 font-medium">{c.category}</td>
                                <td className="p-6 text-slate-600">{c.dept}</td>
                                <td className="p-6 font-bold text-slate-800">{c.subject}</td>
                                <td className="p-6 text-slate-400 italic text-xs leading-relaxed">
                                    Detailed description for complaint number {c.id}. This is a secure system log...
                                </td>
                                <td className="p-6">
                                    <select className={`rounded-xl px-4 py-1.5 text-[11px] font-black border outline-none cursor-pointer appearance-none transition-all
                    ${c.status === "Pending" ? "bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-100" : ""}
                    ${c.status === "In Progress" ? "bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100" : ""}
                    ${c.status === "Resolved" ? "bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100" : ""}
                  `}>
                                        <option>Pending</option>
                                        <option>In Progress</option>
                                        <option>Resolved</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}