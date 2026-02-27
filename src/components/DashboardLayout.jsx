import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Route change হলে mobile sidebar বন্ধ করো
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // ESC key দিয়ে sidebar বন্ধ
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="min-h-screen bg-base-200/40">
      <div className="drawer lg:drawer-open">
        <input
          id="sidebar-drawer"
          type="checkbox"
          className="drawer-toggle"
          checked={sidebarOpen}
          onChange={() => setSidebarOpen(!sidebarOpen)}
          readOnly
        />

        {/* ── Main Content ── */}
        <div className="drawer-content flex flex-col min-h-screen">
          <Navbar onMenuClick={() => setSidebarOpen(true)} />

          <main className="flex-1 p-4 sm:p-5 lg:p-7 xl:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Footer */}
          <footer className="border-t border-base-200 px-6 lg:px-8 py-4">
            <p className="text-xs text-base-content/30 text-center">
              © 2025 TaskFlow Management Suite. All rights reserved.
            </p>
          </footer>
        </div>

        {/* ── Sidebar ── */}
        <div className="drawer-side z-40">
          <label
            htmlFor="sidebar-drawer"
            aria-label="close sidebar"
            className="drawer-overlay backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
