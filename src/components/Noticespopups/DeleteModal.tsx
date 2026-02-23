import { HiOutlineExclamation } from "react-icons/hi";

export default function DeleteModal({ isOpen, onClose, onConfirm }: any) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-sm rounded-[2rem] shadow-2xl p-8 text-center animate-in fade-in zoom-in-95 duration-200">
        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <HiOutlineExclamation size={40} />
        </div>
        <h3 className="text-2xl font-black text-slate-800 mb-2 tracking-tight">Are you sure?</h3>
        <p className="text-slate-500 font-medium mb-8 leading-relaxed">This notice will be permanently removed from the campus portal.</p>
        
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-4 rounded-2xl font-black text-slate-400 hover:bg-slate-100 transition-colors">Cancel</button>
          <button onClick={onConfirm} className="flex-1 py-4 bg-red-500 text-white rounded-2xl font-black shadow-lg shadow-red-200 hover:bg-red-600 transition-all">Yes, Delete</button>
        </div>
      </div>
    </div>
  );
}