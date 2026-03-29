import { useState, useEffect } from "react";
import { BackgroundEffect } from "../components/BackgroundEffect";
import { HiOutlineBell, HiOutlineCheckCircle, HiOutlineTrash, HiOutlineExclamation } from "react-icons/hi";
import apiClient from "../api/apiUrl";
import { NotifyError, NotifySuccess } from "../Toast/ToastNotification";
import { CircularProgress } from '@mui/material';

export default function NotificationPage() {
    const [notifications, setNotifications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showConfirm, setShowConfirm] = useState(false);

    const fetchNotifications = async () => {
        setLoading(true);
        try {
            const response = await apiClient.get("/api/notifications/complaints");
            if (response.data.Status === 1) {
                setNotifications(response.data.data);
            }
        } catch (error) {
            NotifyError("Failed to load notifications");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    const handleClearAll = async () => {
        try {
            const response = await apiClient.patch("/api/notifications/clear-all");
            if (response.data.Status === 1) {
                setNotifications([]);
                NotifySuccess("All notifications cleared");
                setShowConfirm(false);
            }
        } catch (error) {
            NotifyError("Failed to clear notifications");
        }
    };

    const handleMarkAsRead = async (id: string) => {
        try {
            setNotifications(notifications.filter(n => n._id !== id));
            NotifySuccess("Notification dismissed");
        } catch (error) {
            NotifyError("Action failed");
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);

        // Format for Date: 2026-04-04
        const datePart = date.toLocaleDateString('en-GB', {
            timeZone: 'Asia/Kolkata',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).split('/').reverse().join('-');

        // Format for Time: 3:30 PM (or 03:30 PM)
        const timePart = date.toLocaleTimeString('en-US', {
            timeZone: 'Asia/Kolkata',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });

        return `${datePart}, ${timePart}`;
    };

    return (
        <div className="pt-24 px-6 pb-12 bg-slate-50 min-h-screen relative overflow-hidden font-sans">
            <BackgroundEffect />

            {/* 2. CONFIRMATION POPUP (MODAL) */}
            {showConfirm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowConfirm(false)}></div>
                    <div className="relative bg-white p-8 rounded-[2.5rem] shadow-2xl max-w-sm w-full text-center border border-white">
                        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <HiOutlineExclamation size={32} />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 mb-2">Are you sure?</h3>
                        <p className="text-slate-500 text-sm mb-8 font-medium">This will clear all pending notifications from your view.</p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-200 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleClearAll}
                                className="flex-1 py-3 bg-red-500 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-red-600 shadow-lg shadow-red-200 transition-all"
                            >
                                Yes, Clear All
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="relative z-10 max-w-3xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter">
                        Noti<span className="text-blue-600">fications</span>
                    </h1>

                    {notifications.length > 0 && (
                        <button
                            onClick={() => setShowConfirm(true)} // Open Confirmation
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-500 hover:text-red-500 hover:border-red-100 hover:bg-red-50 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm"
                        >
                            <HiOutlineTrash size={16} />
                            Clear All
                        </button>
                    )}
                </div>

                <div className="space-y-4">
                    {loading ? (
                        <div className="flex justify-center py-20"><CircularProgress /></div>
                    ) : notifications.length > 0 ? (
                        notifications.map((n) => (
                            <div key={n._id} className="group bg-white/70 backdrop-blur-xl p-6 rounded-3xl border border-white shadow-sm flex gap-4 items-start transition-all hover:shadow-md">
                                <div className="bg-blue-100 p-3 rounded-2xl text-blue-600">
                                    <HiOutlineBell size={24} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-bold text-slate-800">New Complaint: {n.complaintId}</h3>
                                        {!n.isRead && <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>}
                                    </div>
                                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">{n.description}</p>
                                    <div className="flex items-center gap-4 mt-3">
                                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                                            {formatDate(n.createdAt)} {/* FORMATED DATE HERE */}
                                        </span>
                                        <span className="text-[10px] font-black uppercase text-blue-500 tracking-widest bg-blue-50 px-2 py-0.5 rounded">
                                            {n.deptName}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleMarkAsRead(n._id)}
                                    className="text-slate-300 hover:text-emerald-500 transition-all hover:scale-110 p-1"
                                >
                                    <HiOutlineCheckCircle size={24} />
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-20 bg-white/40 backdrop-blur-md rounded-[3rem] border border-dashed border-slate-200">
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                                <HiOutlineBell size={32} />
                            </div>
                            <p className="text-slate-400 font-bold">All caught up! No new complaints.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}