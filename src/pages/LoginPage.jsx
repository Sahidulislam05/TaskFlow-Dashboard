import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  LayoutDashboard,
  Eye,
  EyeOff,
  TrendingUp,
  Users,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../api/axiosInstance";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.email || !formData.password) {
      setError("সব field পূরণ করুন।");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axiosInstance.post("/api/login", {
        email: formData.email,
        password: formData.password,
      });

      const { token, ...userData } = response.data;
      login(userData, token);
      const from = location.state?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
    } catch (err) {
      const msg = err.response?.data?.message || "Invalid email or password.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const features = [
    { icon: TrendingUp, text: "Real-time Analytics & Insights" },
    { icon: Users, text: "Team Collaboration Tools" },
    { icon: ShieldCheck, text: "Secure & Private Workspace" },
  ];

  return (
    <div
      className="min-h-screen flex"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* ===================== LEFT PANEL ===================== */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-12"
        style={{
          background:
            "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
        }}
      >
        {/* Background decorative circles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-20"
            style={{ background: "rgba(255,255,255,0.3)" }}
          />
          <div
            className="absolute top-1/2 -right-32 w-80 h-80 rounded-full opacity-15"
            style={{ background: "rgba(255,255,255,0.3)" }}
          />
          <div
            className="absolute -bottom-20 left-1/4 w-64 h-64 rounded-full opacity-10"
            style={{ background: "rgba(255,255,255,0.4)" }}
          />
        </div>

        {/* Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
              <LayoutDashboard size={22} className="text-white" />
            </div>
            <span className="text-white text-xl font-bold tracking-tight">
              TaskFlow
            </span>
          </div>
        </div>

        {/* Center Content */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            {/* Mock Dashboard Preview Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 mb-8 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-white/80 text-sm font-medium">
                  Overview
                </span>
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-400/80" />
                  <div className="w-2 h-2 rounded-full bg-yellow-400/80" />
                  <div className="w-2 h-2 rounded-full bg-green-400/80" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { label: "Total Users", value: "12,458", up: true },
                  { label: "Revenue", value: "$245K", up: true },
                  { label: "Active Users", value: "8,234", up: true },
                  { label: "Growth", value: "23.5%", up: true },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white/10 rounded-2xl p-3 border border-white/10"
                  >
                    <div className="text-white/60 text-xs mb-1">
                      {stat.label}
                    </div>
                    <div className="text-white font-bold text-base">
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>
              {/* Mini chart bars */}
              <div className="flex items-end gap-1 h-10">
                {[40, 65, 50, 80, 60, 90, 75, 85, 70, 95].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm bg-white/30"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>

            <h1 className="text-4xl font-extrabold text-white leading-tight mb-3">
              Manage Tasks
              <br />
              <span className="text-white/70">Like a Pro</span>
            </h1>
            <p className="text-white/60 text-base leading-relaxed">
              Your all-in-one dashboard for tracking productivity, analytics,
              and team performance.
            </p>
          </motion.div>
        </div>

        {/* Feature list */}
        <div className="relative z-10 space-y-3">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center border border-white/20">
                <f.icon size={15} className="text-white" />
              </div>
              <span className="text-white/75 text-sm">{f.text}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ===================== RIGHT PANEL ===================== */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-base-100">
        <motion.div
          className="w-full max-w-md"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Mobile Logo */}
          <motion.div
            variants={itemVariants}
            className="flex lg:hidden items-center gap-2 mb-8"
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #667eea, #764ba2)",
              }}
            >
              <LayoutDashboard size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold text-base-content">
              TaskFlow
            </span>
          </motion.div>

          {/* Header */}
          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-3xl font-extrabold text-base-content mb-2">
              Welcome back 👋
            </h2>
            <p className="text-base-content/50 text-sm">
              Sign in to your dashboard account
            </p>
          </motion.div>

          {/* Demo Credentials Badge */}
          <motion.div variants={itemVariants}>
            <div className="alert mb-6 border border-indigo-200 bg-indigo-50 text-indigo-700 rounded-2xl py-3 px-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-xs">
                Demo: <strong>user1@example.com</strong> /{" "}
                <strong>password123</strong>
              </span>
            </div>
          </motion.div>

          {/* Error Alert */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="alert alert-error mb-5 rounded-2xl py-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm">{error}</span>
            </motion.div>
          )}

          {/* Form Card */}
          <motion.div variants={itemVariants}>
            <div className="card bg-base-100 border border-base-200 shadow-xl rounded-3xl">
              <div className="card-body p-7 gap-5">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Email Field */}
                  <div className="form-control gap-2">
                    <label className="label py-0">
                      <span className="label-text font-semibold text-base-content text-sm">
                        Email Address
                      </span>
                    </label>
                    <label className="input input-bordered rounded-2xl flex items-center gap-3 focus-within:input-primary transition-all duration-200 h-12">
                      <Mail
                        size={16}
                        className="text-base-content/40 shrink-0"
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="user1@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="grow text-sm"
                        autoComplete="email"
                      />
                    </label>
                  </div>

                  {/* Password Field */}
                  <div className="form-control gap-2">
                    <label className="label py-0">
                      <span className="label-text font-semibold text-base-content text-sm">
                        Password
                      </span>
                    </label>
                    <label className="input input-bordered rounded-2xl flex items-center gap-3 focus-within:input-primary transition-all duration-200 h-12">
                      <Lock
                        size={16}
                        className="text-base-content/40 shrink-0"
                      />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        className="grow text-sm"
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-base-content/40 hover:text-base-content/70 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </label>
                  </div>

                  {/* Remember me + Forgot */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary checkbox-sm rounded-md"
                      />
                      <span className="text-sm text-base-content/60">
                        Remember me
                      </span>
                    </label>
                    <button
                      type="button"
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn w-full h-12 rounded-2xl text-white font-semibold text-sm border-0 shadow-lg shadow-indigo-200 disabled:opacity-70"
                    style={{
                      background: loading
                        ? "#a5b4fc"
                        : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    }}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="loading loading-spinner loading-sm" />
                        Signing in...
                      </span>
                    ) : (
                      "Sign In to Dashboard"
                    )}
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.p
            variants={itemVariants}
            className="text-center text-xs text-base-content/40 mt-6"
          >
            © 2026 TaskFlow. All rights reserved.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
