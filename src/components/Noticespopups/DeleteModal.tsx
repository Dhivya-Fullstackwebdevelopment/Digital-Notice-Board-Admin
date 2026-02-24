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
    <div className="fixed inset-0 z-[110] flex items-center justify-center py-2 bg-slate-900/30 backdrop-blur-md animate-in fade-in duration-300">
      {/* Modal Container */}
      <div
        ref={modalRef}
        className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl py-2  text-center relative border border-white overflow-hidden animate-in zoom-in-95 duration-300"
      >
        <BackgroundEffect />
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevents event from bubbling
            onClose();
          }}
          className="absolute top-8 right-8 p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all z-50 cursor-pointer"
          aria-label="Close modal"
        >
          <HiOutlineX size={24} />
        </button>
        <div className="relative z-10">
          <div className="w-17 h-17 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
            <HiOutlineExclamation size={40} className="animate-bounce" />
          </div>

          <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">Confirm Deletion</h3>
          <p className="text-slate-500 font-medium mb-10 leading-relaxed px-6 text-base">
            Are you sure you want to remove this notice?
          </p>

          <div className="flex gap-3 justify-center mt-2">
            <button
              onClick={onClose}
              className="px-10 py-3 hover:bg-slate-100 rounded-2xl font-black text-slate-400  transition-colors border border-transparent hover:border-slate-100 text-sm"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-10 py-3 bg-red-500 text-white rounded-2xl font-black shadow-lg shadow-red-100 hover:bg-red-600 hover:-translate-y-0.5 active:scale-95 transition-all text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}