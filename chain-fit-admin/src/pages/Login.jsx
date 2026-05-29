import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { User, Lock, ArrowRight, Sun, Moon, Eye, EyeOff } from "lucide-react";
import BorderGlow from "../components/BorderGlow";
import Logo from "../components/Logo";
import { cn } from "../utils/cn";
import { useTheme } from "../hooks/useTheme";
import { authService } from "../services/authService";

const Login = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { isDark, setIsDark } = useTheme();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await authService.login(username, password);
            const token = response?.data?.access_token || response?.access_token;

            if (token) {
                localStorage.setItem("token", token);
                localStorage.setItem("isAuthenticated", "true");

                navigate("/admin/dashboard");
            } else {
                setErrorMessage("Login gagal: Token tidak ditemukan. Cek console browser untuk melihat struktur data.");
            }
        } catch (error) {
            console.error(error);
            const errorMsg = error.response?.data?.message || "Terjadi kesalahan saat login. Periksa username dan password Anda.";
            setErrorMessage(errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 dark:bg-[#050505] text-gray-900 dark:text-white relative overflow-hidden font-sans transition-colors duration-500">

            <button
                onClick={() => setIsDark(!isDark)}
                className="absolute top-6 right-8 p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-colors bg-white/50 dark:bg-black/50 backdrop-blur-md group z-30 shadow-sm"
            >
                <AnimatePresence mode="wait">
                    {isDark ? (
                        <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                            <Sun className="w-5 h-5 text-gray-400 group-hover:text-amber-400" />
                        </motion.div>
                    ) : (
                        <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                            <Moon className="w-5 h-5 text-gray-600 group-hover:text-indigo-600" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </button>

            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-black/[0.03] dark:bg-white/[0.02] rounded-full blur-[100px] pointer-events-none transition-colors duration-500" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-black/[0.02] dark:bg-white/[0.015] rounded-full blur-[120px] pointer-events-none transition-colors duration-500" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-[480px] px-6 relative z-10"
            >
                <BorderGlow
                    className="w-full shadow-2xl dark:shadow-none transition-colors duration-500"
                    backgroundColor={isDark ? '#0a0a0a' : '#ffffff'}
                    colors={isDark
                        ? ['#c084fc', '#f472b6', '#38bdf8']
                        : ['#2563eb', '#7c3aed', '#0ea5e9']
                    }
                    glowColor={isDark ? '40 80 80' : '220 90 40'}
                    glowIntensity={isDark ? 1.0 : 1.5}
                    animated={true}
                >
                    <div className="px-10 py-12 flex flex-col items-center">

                        <div className="mb-6">
                            <Logo className="w-28 h-auto" />
                        </div>

                        <h2 className="text-3xl font-bold mb-2 tracking-tight text-gray-900 dark:text-white transition-colors">Chain Fit Admin</h2>
                        <p className="text-[14px] text-gray-500 dark:text-gray-400 mb-10 font-medium transition-colors">Secure access for premium management.</p>

                        <form onSubmit={handleLogin} className="w-full space-y-5">

                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <User className="h-[18px] w-[18px] text-gray-400 dark:text-gray-500 group-focus-within:text-gray-600 dark:group-focus-within:text-gray-300 transition-colors" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Enter username"
                                    required
                                    value={username}
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                        setErrorMessage("");
                                    }}
                                    className="w-full bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-200 text-[15px] rounded-xl focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-600 focus:border-gray-400 dark:focus:border-gray-600 block pl-11 py-3.5 transition-all outline-none placeholder:text-gray-400 dark:placeholder:text-gray-600 shadow-sm dark:shadow-none"
                                />
                            </div>

                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-[18px] w-[18px] text-gray-400 dark:text-gray-500 group-focus-within:text-gray-600 dark:group-focus-within:text-gray-300 transition-colors" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    required
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setErrorMessage("");
                                    }}
                                    className="w-full bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-200 text-[15px] rounded-xl focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-600 focus:border-gray-400 dark:focus:border-gray-600 block pl-11 pr-12 py-3.5 transition-all outline-none placeholder:text-gray-400 dark:placeholder:text-gray-600 tracking-widest shadow-sm dark:shadow-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                                </button>
                            </div>

                            <div className="flex items-center justify-between pt-2 pb-5">
                                <label className="flex items-center gap-2.5 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#111] checked:bg-black checked:border-black dark:checked:bg-white dark:checked:border-white focus:ring-0 focus:ring-offset-0 cursor-pointer appearance-none
                    checked:bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTQgMTQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTExLjY2NjYgMy41TDUuMjQ5OTIgOS45MTY2N0wyLjMzMzI1IDcuMCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L3N2Zz4=')]
                    dark:checked:bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTQgMTQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTExLjY2NjYgMy41TDUuMjQ5OTIgOS45MTY2N0wyLjMzMzI1IDcuMCIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L3N2Zz4=')]
                    bg-center bg-no-repeat transition-all"
                                    />
                                    <span className="text-[13px] text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors">
                    Remember me
                  </span>
                                </label>
                                <a href="#" className="text-[13px] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                                    Forgot password?
                                </a>
                            </div>

                            {errorMessage && (
                                <p className="text-red-500 text-[13px] text-center font-medium">
                                    {errorMessage}
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={cn(
                                    "w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-[15px] font-semibold transition-all duration-300 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed",
                                    "bg-black text-white hover:bg-gray-800 shadow-md",
                                    "dark:bg-white dark:text-black dark:hover:bg-gray-200"
                                )}
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Login to Admin
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </BorderGlow>

                <div className="mt-8 text-center">
                    <p className="text-[12px] text-gray-400 dark:text-gray-600 font-medium transition-colors">
                        © 2026 Chain Fit. System access is restricted.
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;