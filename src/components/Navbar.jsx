import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  Bell,
  Search,
  Sun,
  Moon,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const pageTitles = {
  "/dashboard": {
    title: "Dashboard",
    subtitle: "Welcome back! Here's what's happening.",
  },
  "/dashboard/users": {
    title: "Users",
    subtitle: "Manage and monitor all users.",
  },
  "/dashboard/products": {
    title: "Products",
    subtitle: "Track your products and plans.",
  },
  "/dashboard/analytics": {
    title: "Analytics",
    subtitle: "Detailed performance metrics.",
  },
  "/dashboard/settings": {
    title: "Settings",
    subtitle: "Configure your preferences.",
  },
};

const Navbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute("data-theme") || "light",
  );
  const [searchOpen, setSearchOpen] = useState(false);

  const pageInfo = pageTitles[location.pathname] || pageTitles["/dashboard"];

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="sticky top-0 z-30 glass-card border-b border-base-200 px-4 lg:px-8"
    >
      <div className="flex items-center justify-between h-16 gap-3">
        {/* ── Left ── */}
        <div className="flex items-center gap-3 min-w-0">
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={onMenuClick}
            className="btn btn-ghost btn-sm btn-circle lg:hidden shrink-0"
          >
            <Menu size={20} />
          </motion.button>

          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.25 }}
              className="hidden sm:block min-w-0"
            >
              <h2 className="text-lg font-extrabold text-base-content leading-tight truncate">
                {pageInfo.title}
              </h2>
              <p className="text-xs text-base-content/40 truncate">
                {pageInfo.subtitle}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Right ── */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Desktop search */}
          <AnimatePresence>
            {searchOpen ? (
              <motion.div
                key="search-open"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 220, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <label
                  className="input input-bordered input-sm rounded-xl flex items-center gap-2 h-9
                  bg-base-200/60 border-base-200 focus-within:border-primary focus-within:bg-base-100 transition-all"
                >
                  <Search size={13} className="text-base-content/40 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="grow text-xs bg-transparent"
                    autoFocus
                  />
                  <button onClick={() => setSearchOpen(false)}>
                    <X
                      size={13}
                      className="text-base-content/40 hover:text-base-content"
                    />
                  </button>
                </label>
              </motion.div>
            ) : (
              <motion.button
                key="search-icon"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSearchOpen(true)}
                className="btn btn-ghost btn-sm btn-circle hidden md:flex"
              >
                <Search size={17} className="text-base-content/60" />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Theme toggle */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="btn btn-ghost btn-sm btn-circle"
            title="Toggle theme"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {theme === "light" ? (
                  <Moon size={17} className="text-base-content/60" />
                ) : (
                  <Sun size={17} className="text-yellow-400" />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.button>

          {/* Notification bell */}
          <div className="indicator relative">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="btn btn-ghost btn-sm btn-circle"
            >
              <Bell size={17} className="text-base-content/60" />
              <span className="indicator-item badge badge-primary badge-xs w-2 h-2 min-h-0 p-0 pulse-ring" />
            </motion.button>
          </div>

          {/* Divider */}
          <div className="w-px h-6 bg-base-200 mx-1" />

          {/* Avatar dropdown */}
          <div className="dropdown dropdown-end">
            <motion.div
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              tabIndex={0}
              role="button"
              className="avatar placeholder cursor-pointer"
            >
              <div
                className="w-9 rounded-full ring-2 ring-offset-base-100 ring-offset-2 ring-primary/40 text-white text-xs font-bold"
                style={{
                  background: "linear-gradient(135deg,#667eea,#764ba2)",
                }}
              >
                <span>{user?.email?.charAt(0)?.toUpperCase() || "U"}</span>
              </div>
            </motion.div>

            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-2xl shadow-2xl border border-base-200 w-60 p-2 mt-3 z-50"
            >
              {/* User info */}
              <li>
                <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-transparent cursor-default">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold shrink-0"
                    style={{
                      background: "linear-gradient(135deg,#667eea,#764ba2)",
                    }}
                  >
                    {user?.email?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-base-content truncate">
                      {user?.email?.split("@")[0] || "User"}
                    </p>
                    <p className="text-xs text-base-content/40 truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>
              </li>
              <div className="divider my-1 opacity-40" />
              <li>
                <a className="flex items-center gap-2.5 rounded-xl text-sm py-2.5 text-base-content/70 hover:text-base-content">
                  <Settings size={15} />
                  Account Settings
                </a>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2.5 rounded-xl text-sm py-2.5 text-error hover:bg-error/10 w-full text-left"
                >
                  <LogOut size={15} />
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
