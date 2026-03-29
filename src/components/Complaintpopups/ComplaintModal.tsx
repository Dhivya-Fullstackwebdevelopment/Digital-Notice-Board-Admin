import { useState, useEffect } from "react";
import { HiChevronDown, HiOutlineX } from "react-icons/hi";
import { BackgroundEffect } from "../BackgroundEffect";
import { ISSUESCATEGORIES, COMPLAINTDEPARTMENTS } from "../types/notices";
import { NotifyError, NotifySuccess } from "../../Toast/ToastNotification";
import apiClient from "../../api/apiUrl";
import { z } from "zod";
import { ErrorMsg } from "../Reuse/ErrortextStyle";

const complaintSchema = z.object({
  studentName: z.string().optional(),
  status: z.string().min(1, "Status is required"),
  categoryId: z.string().min(1, "Please select a category"),
  deptId: z.string().min(1, "Please select a department"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  description: z.string().min(3, "Please provide a more detailed description"),
  otherCategory: z.string().optional(),
  otherDept: z.string().optional(),
  resolution: z.string().optional(),
}).refine((data) => {
  if (data.categoryId === "99") {
    return !!data.otherCategory && data.otherCategory.trim().length > 0;
  }
  return true;
}, {
  message: "Please specify the category",
  path: ["otherCategory"],
}).refine((data) => {
  if (data.deptId === "99") {
    return !!data.otherDept && data.otherDept.trim().length > 0;
  }
  return true;
}, {
  message: "Please specify the department",
  path: ["otherDept"],
});

export default function ComplaintModal({ isOpen, onClose, onSave, initialData }: any) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [formData, setFormData] = useState<any>({
    studentName: "",
    status: "pending",
    categoryId: "",
    otherCategory: "",
    deptId: "",
    otherDept: "",
    subject: "",
    description: "",
    resolution: ""
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedPdf, setSelectedPdf] = useState<File | null>(null);

  // Helper to update state and clear specific error
  const handleInputChange = (field: string, value: any) => {
    setFormData((prev: any) => {
      const newState = { ...prev, [field]: value };

      if (field === "categoryId" && value !== "99") {
        newState.otherCategory = "";
      }
      if (field === "deptId" && value !== "99") {
        newState.otherDept = "";
      }

      return newState;
    });
    if (errors[field]) {
      setErrors((prev: any) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  useEffect(() => {
    const fetchDetails = async () => {
      if (initialData && initialData.complaintId) {
        setLoading(true);
        try {
          const res = await apiClient.get(`/api/complaints/${initialData.complaintId}`);
          if (res.data.Status === 1) {
            setFormData(res.data.data);
          }
        } catch (error) {
          NotifyError("Error fetching details");
        } finally {
          setLoading(false);
        }
      } else {
        setFormData({
          studentName: "", status: "pending", categoryId: "", otherCategory: "",
          deptId: "", otherDept: "", subject: "", description: "", resolution: ""
        });
      }
    };
    if (isOpen) {
      setErrors({});
      fetchDetails();
    }
  }, [initialData, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 2. Validate with Zod
    const validation = complaintSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors = validation.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      NotifyError("Please fix the errors in the form");
      return;
    }

    setLoading(true);
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });
    if (selectedImage) data.append("image", selectedImage);
    if (selectedPdf) data.append("pdf", selectedPdf);

    try {
      let response;
      if (initialData) {
        response = await apiClient.patch(`/api/complaints/update/${initialData.complaintId}`, data);
      } else {
        response = await apiClient.post("/api/complaints/create", data);
      }

      if (response.data.Status === 1) {
        NotifySuccess(initialData ? "Complaint Updated Successfully!" : "Complaint Created Successfully!");
        onSave();
        onClose();
      }
    } catch (error) {
      NotifyError("Submission failed");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-md">
      <div className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-white relative">
        <BackgroundEffect />

        <div className="relative z-10 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 flex justify-between items-center border-b border-blue-100">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              {initialData ? "Resolve Complaint" : "New Complaint Log"}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className={`w-2 h-2 rounded-full animate-pulse ${formData.status === 'resolved' ? 'bg-green-500' : 'bg-amber-500'}`} />
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Grievance Redressal System</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 bg-white/80 hover:bg-white text-slate-400 hover:text-blue-600 rounded-full shadow-sm transition-all border border-blue-100">
            <HiOutlineX size={20} />
          </button>
        </div>

        <div className="p-8 relative z-10 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <form className="space-y-5" onSubmit={handleSubmit}>

            {/* Student Name & Status */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Student Name</label>
                <input value={formData.studentName} onChange={e => handleInputChange("studentName", e.target.value)}
                  className="w-full text-slate-900 px-5 py-3 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-400 focus:bg-white transition-all shadow-sm" />
                <ErrorMsg message={errors.studentName} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Current Status</label>
                <select value={formData.status} onChange={e => handleInputChange("status", e.target.value)}
                  className="w-full px-5 py-3 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-4 focus:ring-blue-500/10 text-sm text-slate-700 cursor-pointer">
                  <option value="pending">Pending</option>
                  <option value="inprogress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
                <ErrorMsg message={errors.status} />
              </div>
            </div>

            {/* Issue Category */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Issue Category</label>
              <div className="relative">
                <select value={formData.categoryId} onChange={e => handleInputChange("categoryId", e.target.value)}
                  className="w-full px-5 py-3 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-4 focus:ring-blue-500/10 text-sm text-slate-700 appearance-none cursor-pointer transition-all">
                  <option value="">Select Category</option>
                  {ISSUESCATEGORIES.map((item) => (
                    <option key={item.id} value={item.id}>{item.label}</option>
                  ))}
                </select>
                <HiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
              </div>
              <ErrorMsg message={errors.categoryId} />

              {formData.categoryId === "99" && (
                <>
                  <input placeholder="Specify Category" value={formData.otherCategory} onChange={e => handleInputChange("otherCategory", e.target.value)}
                    className="w-full text-slate-900 mt-2 px-5 py-2 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-blue-400" />
                  <ErrorMsg message={errors.otherCategory} />
                </>
              )}
            </div>

            {/* Department */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Department</label>
              <div className="relative">
                <select value={formData.deptId} onChange={e => handleInputChange("deptId", e.target.value)}
                  className="w-full text-slate-900 px-5 py-3 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-4 focus:ring-blue-500/10 text-sm appearance-none cursor-pointer transition-all">
                  <option value="">Select Department</option>
                  {COMPLAINTDEPARTMENTS.map((dept) => (
                    <option key={dept.id} value={dept.id}>{dept.label}</option>
                  ))}
                </select>
                <HiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
              </div>
              <ErrorMsg message={errors.deptId} />

              {formData.deptId === "99" && (
                <>
                  <input placeholder="Specify Department" value={formData.otherDept} onChange={e => handleInputChange("otherDept", e.target.value)}
                    className="w-full text-slate-900 mt-2 px-5 py-2 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-blue-400" />
                  <ErrorMsg message={errors.otherDept} />
                </>
              )}
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Complaint Subject</label>
              <input value={formData.subject} placeholder="Subject" onChange={e => handleInputChange("subject", e.target.value)}
                className="w-full text-slate-900 px-5 py-3 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-4 focus:ring-blue-500/10 shadow-sm" />
              <ErrorMsg message={errors.subject} />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Issue Description</label>
              <textarea placeholder="Description" rows={3} value={formData.description} onChange={e => handleInputChange("description", e.target.value)}
                className="w-full text-slate-900 px-5 py-3 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-4 focus:ring-blue-500/10 resize-none shadow-sm" />
              <ErrorMsg message={errors.description} />
            </div>

            {/* Admin Resolution */}
            <div className="space-y-2 p-4 bg-blue-50/50 rounded-3xl border border-blue-100">
              <label className="text-[10px] font-black uppercase tracking-widest text-blue-500 ml-1">Resolution / Action Taken (Admin Only)</label>
              <textarea placeholder="Action taken..." rows={2} value={formData.resolution} onChange={e => handleInputChange("resolution", e.target.value)}
                className="w-full text-slate-900 px-5 py-3 rounded-xl bg-white border border-blue-200 outline-none focus:ring-4 focus:ring-blue-500/10 resize-none shadow-sm" />
            </div>

            <button type="submit" disabled={loading} className="w-full text-white bg-blue-600 py-4 rounded-2xl font-black text-sm shadow-xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all mt-2 uppercase tracking-widest disabled:bg-slate-400">
              {loading ? "Processing..." : initialData ? "Update & Finalize Record" : "Post Complaint"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}