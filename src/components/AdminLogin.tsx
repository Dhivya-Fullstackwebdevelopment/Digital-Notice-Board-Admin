import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineShieldCheck, HiOutlineMail, HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import AdminloginBG from "../assets/Adminlogin-BGimg.jpg";
import apiClient from "../api/apiUrl";
import { NotifySuccess, NotifyError } from "../Toast/ToastNotification";
import { z } from "zod";
import { ErrorMsg } from "./Reuse/ErrortextStyle";
import { IoEyeOff, IoEye  } from "react-icons/io5";


const loginSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function AdminLogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State for eye toggle
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<any>({});

    const handleInputChange = (setter: any, field: string, value: string) => {
        setter(value);
        if (errors[field]) {
            setErrors((prev: any) => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        const validation = loginSchema.safeParse({ email, password });

        if (!validation.success) {
            const fieldErrors = validation.error.flatten().fieldErrors;
            setErrors(fieldErrors);
            return;
        }

        setLoading(true);
        try {
            const response = await apiClient.post("/api/admin/login", { email, password });

            if (response.data.Status === 1) {
                localStorage.setItem("isAdmin", "true");
                localStorage.setItem("adminUser", JSON.stringify(response.data.data));

                NotifySuccess("Login successful!");
                navigate("/dashboard");
            } else {
                NotifyError(response.data.message || "Invalid Credentials");
            }
        } catch (error: any) {
            NotifyError(error.response?.data?.message || "Server Error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-end p-8 md:pr-40 bg-cover bg-center font-sans"
            style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${AdminloginBG})` }}
        >
            <div className="w-full max-w-md bg-white/90 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-2xl border border-white/20 relative overflow-hidden">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                        <HiOutlineShieldCheck size={40} className="text-blue-600" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-800">Admin Portal</h2>
                    <p className="text-slate-500 text-sm font-medium italic uppercase tracking-wider mt-1">Authorized Access</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-1">
                        <div className="relative">
                            <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="text"
                                placeholder="Admin Email"
                                className={`w-full pl-12 pr-4 py-4 text-black rounded-2xl bg-white border outline-none focus:ring-4 transition-all font-medium ${errors.email ? "border-red-400 focus:ring-red-500/10" : "border-slate-200 focus:ring-blue-500/10"
                                    }`}
                                value={email}
                                onChange={(e) => handleInputChange(setEmail, "email", e.target.value)}
                            />
                        </div>
                        <ErrorMsg message={errors.email} />
                    </div>

                    <div className="space-y-1">
                        <div className="relative">
                            <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type={showPassword ? "text" : "password"} // Dynamic type
                                placeholder="Password"
                                className={`w-full pl-12 pr-12 py-4 rounded-2xl text-black bg-white border outline-none focus:ring-4 transition-all font-medium ${errors.password ? "border-red-400 focus:ring-red-500/10" : "border-slate-200 focus:ring-blue-500/10"
                                    }`}
                                value={password}
                                onChange={(e) => handleInputChange(setPassword, "password", e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors focus:outline-none"
                            >
                                {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                            </button>
                        </div>
                        <ErrorMsg message={errors.password} />
                    </div>

                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-0.5 active:scale-95 transition-all mt-4 disabled:bg-slate-400 uppercase tracking-widest flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Verifying...
                            </>
                        ) : "Secure Login"}
                    </button>
                </form>
            </div>
        </div>
    );
}