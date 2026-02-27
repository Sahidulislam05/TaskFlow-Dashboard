import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  BarChart3,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard", end: true },
  { to: "/dashboard/users", icon: Users, label: "Users" },
  { to: "/dashboard/products", icon: ShoppingBag, label: "Products" },
  { to: "/dashboard/analytics", icon: BarChart3, label: "Analytics" },
  { to: "/dashboard/settings", icon: Settings, label: "Settings" },
];

const Sidebar = ({ onClose }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex flex-col h-full w-72 bg-base-100 border-r border-base-200"
    >
      {/* ── Logo ── */}
      <div className="px-5 py-5 border-b border-base-200 shrink-0">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg shrink-0"
            style={{ background: "linear-gradient(135deg,#667eea,#764ba2)" }}
          >
            <LayoutDashboard size={20} className="text-white" />
          </motion.div>
          <div>
            <h1 className="text-base font-extrabold text-base-content tracking-tight leading-tight">
              TaskFlow
            </h1>
            <p className="text-[10px] text-base-content/35 font-medium tracking-wide">
              Management Suite
            </p>
          </div>
        </div>
      </div>

      {/* ── Menu Label ── */}
      <div className="px-5 pt-5 pb-1 shrink-0">
        <span className="text-[9px] font-black text-base-content/25 uppercase tracking-[0.15em]">
          Main Menu
        </span>
      </div>

      {/* ── Nav Items ── */}
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto py-1">
        {navItems.map((item, i) => (
          <motion.div
            key={item.to}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.04 * i, duration: 0.3 }}
          >
            <NavLink
              to={item.to}
              end={item.end}
              onClick={onClose}
              className={({ isActive }) =>
                `group relative flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm
                 font-medium transition-all duration-200 cursor-pointer
                 ${
                   isActive
                     ? "text-white shadow-lg shadow-indigo-200/50"
                     : "text-base-content/55 hover:text-base-content hover:bg-base-200/70"
                 }`
              }
              style={({ isActive }) =>
                isActive
                  ? { background: "linear-gradient(135deg,#667eea,#764ba2)" }
                  : {}
              }
            >
              {({ isActive }) => (
                <>
                  {/* Active left bar */}
                  {isActive && (
                    <motion.div
                      layoutId="activeBar"
                      className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-6 rounded-full bg-primary"
                    />
                  )}

                  <item.icon
                    size={18}
                    className={`shrink-0 transition-colors duration-200
                      ${
                        isActive
                          ? "text-white"
                          : "text-base-content/35 group-hover:text-base-content/70"
                      }`}
                  />
                  <span className="flex-1 truncate">{item.label}</span>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <ChevronRight
                        size={14}
                        className="text-white/60 shrink-0"
                      />
                    </motion.div>
                  )}
                </>
              )}
            </NavLink>
          </motion.div>
        ))}
      </nav>

      {/* ── Bottom Section ── */}
      <div className="px-3 pb-5 shrink-0 space-y-1">
        <div className="divider my-1 opacity-30" />

        {/* User card */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-base-200/60
                     hover:bg-base-200 transition-colors duration-200 cursor-default"
        >
          <div className="avatar placeholder shrink-0">
            <div
              className="w-9 rounded-full text-white text-xs font-bold"
              style={{ background: "linear-gradient(135deg,#667eea,#764ba2)" }}
            >
              <span>{user?.email?.charAt(0)?.toUpperCase() || "U"}</span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-base-content truncate leading-tight">
              {user?.email?.split("@")[0] || "User"}
            </p>
            <p className="text-[10px] text-base-content/35 truncate">
              {user?.email}
            </p>
          </div>
          {/* Online dot */}
          <div className="w-2 h-2 rounded-full bg-success shrink-0 shadow-sm shadow-success/50" />
        </motion.div>

        {/* Logout */}
        <motion.button
          whileHover={{ scale: 1.02, x: 2 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-2.5 rounded-2xl text-sm
                     font-medium text-error hover:bg-error/10 transition-all duration-200"
        >
          <LogOut size={17} className="shrink-0" />
          <span>Sign Out</span>
        </motion.button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
