import { useEffect, useRef } from "react";
import { HiOutlineExclamation, HiOutlineX } from "react-icons/hi";
import { BackgroundEffect } from "../BackgroundEffect";

export default function DeleteModal({ isOpen, onClose, onConfirm }: any) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-md animate-in fade-in duration-300">
      {/* Modal Container */}
      <div 
        ref={modalRef}
        className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl p-10 text-center relative border border-white overflow-hidden animate-in zoom-in-95 duration-300"
      >
        <BackgroundEffect />
        
        {/* Top Right X Button */}
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all z-10"
          aria-label="Close modal"
        >
          <HiOutlineX size={24} />
        </button>

        <div className="relative z-10">
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <HiOutlineExclamation size={40} className="animate-bounce" />
          </div>
          
          <h3 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Confirm Deletion</h3>
          <p className="text-slate-500 font-medium mb-10 leading-relaxed px-6 text-base">
            Are you sure you want to remove this notice? 
          </p>
          
          <div className="flex gap-4">
            <button 
              onClick={onClose} 
              className="flex-1 py-4 rounded-2xl font-black text-slate-400 hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
            >
              Cancel
            </button>
            <button 
              onClick={onConfirm} 
              className="flex-1 py-4 bg-red-500 text-white rounded-2xl font-black shadow-lg shadow-red-100 hover:bg-red-600 hover:-translate-y-1 transition-all"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}