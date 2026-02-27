import DashboardLayout from "../components/DashboardLayout";
import { Users } from "lucide-react";

const UsersPage = () => (
  <DashboardLayout>
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <div
        className="w-16 h-16 rounded-3xl flex items-center justify-center shadow-lg"
        style={{ background: "linear-gradient(135deg,#667eea,#764ba2)" }}
      >
        <Users size={28} className="text-white" />
      </div>
      <div className="text-center">
        <h2 className="text-xl font-extrabold text-base-content">Users Page</h2>
        <p className="text-sm text-base-content/40 mt-1">
          User management coming soon
        </p>
      </div>
    </div>
  </DashboardLayout>
);

export default UsersPage;
