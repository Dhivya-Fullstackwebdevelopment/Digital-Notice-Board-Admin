import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineShieldCheck, HiOutlineUser, HiOutlineLockClosed } from "react-icons/hi";
import AdminloginBG from "../assets/Adminlogin-BGimg.jpg";

export default function AdminLogin() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (username === "admin" && password === "admin123") {
            localStorage.setItem("isAdmin", "true");
            navigate("/dashboard"); // Redirect to flat route
        } else {
            alert("Invalid credentials!");
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-end p-8 md:pr-40 bg-cover bg-center"
            style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${AdminloginBG})` }}
        >
            <div className="w-full max-w-md bg-white/90 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-2xl border border-white/20">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <HiOutlineShieldCheck size={40} className="text-blue-600" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-800">Admin Portal</h2>
                    <p className="text-slate-500 text-sm font-medium italic">Authorized Personnel Only</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="relative">
                        <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder="Username"
                            className="w-full pl-12 pr-4 py-4 text-black  rounded-2xl bg-white border border-slate-200 outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="relative">
                        <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full pl-12 pr-4 py-4 rounded-2xl text-black bg-white border border-slate-200 outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all mt-4">
                        Secure Login
                    </button>
                </form>
            </div>
        </div>
    );
}