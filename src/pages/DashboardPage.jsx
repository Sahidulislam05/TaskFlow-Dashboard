import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  DollarSign,
  TrendingUp,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  MousePointerClick,
  RefreshCw,
  ShoppingBag,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import DashboardLayout from "../components/DashboardLayout";
import axiosInstance from "../api/axiosInstance";

// ── Animation Variants ──────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: "easeOut" },
  }),
};

// ── Stat Card Component ──────────────────────────────────────
const StatCard = ({
  icon: Icon,
  label,
  value,
  change,
  changeType,
  color,
  delay,
}) => (
  <motion.div
    custom={delay}
    variants={fadeUp}
    initial="hidden"
    animate="visible"
    whileHover={{ y: -4, transition: { duration: 0.2 } }}
    className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-lg transition-shadow duration-300 rounded-3xl"
  >
    <div className="card-body p-6 gap-4">
      <div className="flex items-start justify-between">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-md"
          style={{ background: color }}
        >
          <Icon size={22} className="text-white" />
        </div>
        <div
          className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full
          ${changeType === "up" ? "bg-success/10 text-success" : "bg-error/10 text-error"}`}
        >
          {changeType === "up" ? (
            <ArrowUpRight size={13} />
          ) : (
            <ArrowDownRight size={13} />
          )}
          {change}
        </div>
      </div>
      <div>
        <p className="text-3xl font-extrabold text-base-content tracking-tight">
          {value}
        </p>
        <p className="text-sm text-base-content/50 font-medium mt-1">{label}</p>
      </div>
    </div>
  </motion.div>
);

// ── Custom Tooltip for Charts ────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="bg-base-100 border border-base-200 rounded-2xl shadow-xl p-3 text-xs"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <p className="font-bold text-base-content/60 mb-2">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2 mb-1">
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: p.color }}
          />
          <span className="text-base-content/60 capitalize">{p.name}:</span>
          <span className="font-bold text-base-content">
            {p.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
};

// ── Skeleton Loader ──────────────────────────────────────────
const Skeleton = ({ className }) => (
  <div className={`skeleton rounded-2xl ${className}`} />
);

// ── Main Dashboard Page ──────────────────────────────────────
const DashboardPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError("");
    try {
      const res = await axiosInstance.get("/api/dashboard");
      setData(res.data);
    } catch {
      setError("Data load করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ── Format analytics dates ──
  const analyticsData =
    data?.analytics?.map((d) => ({
      ...d,
      date: new Date(d.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
    })) || [];

  // ── Pie chart data ──
  const PIE_COLORS = ["#667eea", "#764ba2", "#f093fb", "#f5576c"];
  const pieData =
    data?.products?.map((p) => ({
      name: p.name,
      value: p.sales,
    })) || [];

  // ── Stat cards config ──
  const stats = data
    ? [
        {
          icon: Users,
          label: "Total Users",
          value: data.overview.totalUsers.toLocaleString(),
          change: "12.5%",
          changeType: "up",
          color: "linear-gradient(135deg,#667eea,#764ba2)",
        },
        {
          icon: Activity,
          label: "Active Users",
          value: data.overview.activeUsers.toLocaleString(),
          change: "8.2%",
          changeType: "up",
          color: "linear-gradient(135deg,#f093fb,#f5576c)",
        },
        {
          icon: DollarSign,
          label: "Total Revenue",
          value: `$${(data.overview.revenue / 1000).toFixed(0)}K`,
          change: "18.7%",
          changeType: "up",
          color: "linear-gradient(135deg,#4facfe,#00f2fe)",
        },
        {
          icon: TrendingUp,
          label: "Growth Rate",
          value: `${data.overview.growth}%`,
          change: "4.1%",
          changeType: "up",
          color: "linear-gradient(135deg,#43e97b,#38f9d7)",
        },
      ]
    : [];

  // ════════════════════════════════════════════════════════════
  return (
    <DashboardLayout>
      <div
        className="space-y-6 max-w-7xl mx-auto"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {/* ── Error Alert ── */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="alert alert-error rounded-2xl shadow-sm"
          >
            <span className="text-sm">{error}</span>
            <button
              onClick={() => fetchData()}
              className="btn btn-sm btn-ghost rounded-xl"
            >
              Retry
            </button>
          </motion.div>
        )}

        {/* ── Header Row ── */}
        <motion.div
          variants={fadeUp}
          custom={0}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-between"
        >
          <div>
            <h3 className="text-2xl font-extrabold text-base-content">
              Overview
            </h3>
            <p className="text-sm text-base-content/40 mt-0.5">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => fetchData(true)}
            disabled={refreshing}
            className="btn btn-sm rounded-2xl border border-base-200 bg-base-100 shadow-sm gap-2 text-base-content/60 hover:text-base-content"
          >
            <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
            Refresh
          </motion.button>
        </motion.div>

        {/* ══════════════════════════════════════════════════════
            STAT CARDS
        ══════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {loading
            ? Array(4)
                .fill(0)
                .map((_, i) => <Skeleton key={i} className="h-40" />)
            : stats.map((s, i) => <StatCard key={s.label} {...s} delay={i} />)}
        </div>

        {/* ══════════════════════════════════════════════════════
            CHARTS ROW — Line Chart + Pie Chart
        ══════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          {/* Line Chart — Analytics */}
          <motion.div
            variants={fadeUp}
            custom={4}
            initial="hidden"
            animate="visible"
            className="xl:col-span-2 card bg-base-100 border border-base-200 shadow-sm rounded-3xl"
          >
            <div className="card-body p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-extrabold text-base-content text-base">
                    Analytics Overview
                  </h4>
                  <p className="text-xs text-base-content/40 mt-0.5">
                    Views, Clicks & Conversions
                  </p>
                </div>
                <div className="flex gap-1.5">
                  {["Views", "Clicks", "Conversions"].map((item, i) => (
                    <span
                      key={item}
                      className="badge badge-sm rounded-xl border-0 text-white text-[10px] font-semibold px-2.5"
                      style={{
                        background: ["#667eea", "#f093fb", "#43e97b"][i],
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {loading ? (
                <Skeleton className="h-56" />
              ) : (
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart
                    data={analyticsData}
                    margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="oklch(var(--b2))"
                    />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 11, fill: "oklch(var(--bc)/0.4)" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: "oklch(var(--bc)/0.4)" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="views"
                      stroke="#667eea"
                      strokeWidth={2.5}
                      dot={{ fill: "#667eea", r: 4 }}
                      activeDot={{ r: 6, strokeWidth: 0 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="clicks"
                      stroke="#f093fb"
                      strokeWidth={2.5}
                      dot={{ fill: "#f093fb", r: 4 }}
                      activeDot={{ r: 6, strokeWidth: 0 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="conversions"
                      stroke="#43e97b"
                      strokeWidth={2.5}
                      dot={{ fill: "#43e97b", r: 4 }}
                      activeDot={{ r: 6, strokeWidth: 0 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </motion.div>

          {/* Pie Chart — Products Sales */}
          <motion.div
            variants={fadeUp}
            custom={5}
            initial="hidden"
            animate="visible"
            className="card bg-base-100 border border-base-200 shadow-sm rounded-3xl"
          >
            <div className="card-body p-6">
              <div className="mb-4">
                <h4 className="font-extrabold text-base-content text-base">
                  Sales by Plan
                </h4>
                <p className="text-xs text-base-content/40 mt-0.5">
                  Product distribution
                </p>
              </div>

              {loading ? (
                <Skeleton className="h-56" />
              ) : (
                <>
                  <ResponsiveContainer width="100%" height={180}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={75}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {pieData.map((_, i) => (
                          <Cell
                            key={i}
                            fill={PIE_COLORS[i % PIE_COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          borderRadius: "16px",
                          border: "1px solid oklch(var(--b2))",
                          fontSize: "12px",
                          fontFamily: "'Inter', sans-serif",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>

                  {/* Legend */}
                  <div className="space-y-2 mt-2">
                    {pieData.map((item, i) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ background: PIE_COLORS[i] }}
                          />
                          <span className="text-xs text-base-content/60 truncate max-w-[110px]">
                            {item.name}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-base-content">
                          {item.value} sales
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>

        {/* ══════════════════════════════════════════════════════
            BAR CHART — Analytics
        ══════════════════════════════════════════════════════ */}
        <motion.div
          variants={fadeUp}
          custom={6}
          initial="hidden"
          animate="visible"
          className="card bg-base-100 border border-base-200 shadow-sm rounded-3xl"
        >
          <div className="card-body p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-extrabold text-base-content text-base">
                  Performance Breakdown
                </h4>
                <p className="text-xs text-base-content/40 mt-0.5">
                  Daily views vs clicks
                </p>
              </div>
              <Eye size={16} className="text-base-content/30" />
            </div>
            {loading ? (
              <Skeleton className="h-48" />
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart
                  data={analyticsData}
                  margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="oklch(var(--b2))"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 11, fill: "oklch(var(--bc)/0.4)" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "oklch(var(--bc)/0.4)" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    wrapperStyle={{ fontSize: "11px", paddingTop: "12px" }}
                    iconType="circle"
                    iconSize={8}
                  />
                  <Bar
                    dataKey="views"
                    name="Views"
                    fill="#667eea"
                    radius={[6, 6, 0, 0]}
                  />
                  <Bar
                    dataKey="clicks"
                    name="Clicks"
                    fill="#f093fb"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════════════
            TABLES ROW — Users + Products
        ══════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {/* Users Table */}
          <motion.div
            variants={fadeUp}
            custom={7}
            initial="hidden"
            animate="visible"
            className="card bg-base-100 border border-base-200 shadow-sm rounded-3xl"
          >
            <div className="card-body p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-extrabold text-base-content text-base">
                    Recent Users
                  </h4>
                  <p className="text-xs text-base-content/40 mt-0.5">
                    Latest registered accounts
                  </p>
                </div>
                <div
                  className="badge rounded-xl text-white text-xs font-semibold border-0 px-3"
                  style={{
                    background: "linear-gradient(135deg,#667eea,#764ba2)",
                  }}
                >
                  {data?.users?.length || 0} users
                </div>
              </div>

              {loading ? (
                <div className="space-y-3">
                  {Array(4)
                    .fill(0)
                    .map((_, i) => (
                      <Skeleton key={i} className="h-12" />
                    ))}
                </div>
              ) : (
                <div className="overflow-x-auto -mx-2">
                  <table className="table table-sm w-full">
                    <thead>
                      <tr className="border-base-200">
                        <th className="text-xs font-bold text-base-content/40 uppercase tracking-wide bg-transparent">
                          User
                        </th>
                        <th className="text-xs font-bold text-base-content/40 uppercase tracking-wide bg-transparent">
                          Joined
                        </th>
                        <th className="text-xs font-bold text-base-content/40 uppercase tracking-wide bg-transparent">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.users?.map((user, i) => (
                        <motion.tr
                          key={user.id}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.05 * i }}
                          className="border-base-200 hover:bg-base-200/40 transition-colors duration-150 rounded-xl"
                        >
                          <td>
                            <div className="flex items-center gap-3">
                              <div className="avatar placeholder">
                                <div
                                  className="w-8 rounded-full text-white text-xs font-bold"
                                  style={{
                                    background: `hsl(${user.id * 47}, 65%, 55%)`,
                                  }}
                                >
                                  <span>{user.name.charAt(0)}</span>
                                </div>
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-base-content leading-tight">
                                  {user.name}
                                </p>
                                <p className="text-xs text-base-content/40">
                                  {user.email}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="text-xs text-base-content/50">
                            {new Date(user.joinDate).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "2-digit",
                              },
                            )}
                          </td>
                          <td>
                            <div
                              className={`badge badge-sm rounded-xl border-0 font-semibold text-xs
                                ${
                                  user.status === "active"
                                    ? "bg-success/15 text-success"
                                    : "bg-error/15 text-error"
                                }`}
                            >
                              <div
                                className={`w-1.5 h-1.5 rounded-full mr-1.5
                                  ${user.status === "active" ? "bg-success" : "bg-error"}`}
                              />
                              {user.status}
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </motion.div>

          {/* Products Table */}
          <motion.div
            variants={fadeUp}
            custom={8}
            initial="hidden"
            animate="visible"
            className="card bg-base-100 border border-base-200 shadow-sm rounded-3xl"
          >
            <div className="card-body p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-extrabold text-base-content text-base">
                    Products & Plans
                  </h4>
                  <p className="text-xs text-base-content/40 mt-0.5">
                    Sales performance by plan
                  </p>
                </div>
                <ShoppingBag size={16} className="text-base-content/30" />
              </div>

              {loading ? (
                <div className="space-y-3">
                  {Array(4)
                    .fill(0)
                    .map((_, i) => (
                      <Skeleton key={i} className="h-12" />
                    ))}
                </div>
              ) : (
                <div className="overflow-x-auto -mx-2">
                  <table className="table table-sm w-full">
                    <thead>
                      <tr className="border-base-200">
                        <th className="text-xs font-bold text-base-content/40 uppercase tracking-wide bg-transparent">
                          Product
                        </th>
                        <th className="text-xs font-bold text-base-content/40 uppercase tracking-wide bg-transparent">
                          Price
                        </th>
                        <th className="text-xs font-bold text-base-content/40 uppercase tracking-wide bg-transparent">
                          Sales
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.products?.map((product, i) => (
                        <motion.tr
                          key={product.id}
                          initial={{ opacity: 0, x: 12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.05 * i }}
                          className="border-base-200 hover:bg-base-200/40 transition-colors duration-150"
                        >
                          <td>
                            <div className="flex items-center gap-3">
                              <div
                                className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                                style={{
                                  background: [
                                    "linear-gradient(135deg,#667eea,#764ba2)",
                                    "linear-gradient(135deg,#4facfe,#00f2fe)",
                                    "linear-gradient(135deg,#f093fb,#f5576c)",
                                    "linear-gradient(135deg,#43e97b,#38f9d7)",
                                  ][i % 4],
                                }}
                              >
                                <ShoppingBag size={14} className="text-white" />
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-base-content leading-tight">
                                  {product.name}
                                </p>
                                <p className="text-xs text-base-content/40 capitalize">
                                  {product.category}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="text-sm font-bold text-base-content">
                            ${product.price}
                          </td>
                          <td>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-base-200 rounded-full h-1.5 w-16 overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{
                                    width: `${(product.sales / 600) * 100}%`,
                                  }}
                                  transition={{
                                    delay: 0.3 + i * 0.1,
                                    duration: 0.6,
                                  }}
                                  className="h-full rounded-full"
                                  style={{
                                    background: [
                                      "linear-gradient(90deg,#667eea,#764ba2)",
                                      "linear-gradient(90deg,#4facfe,#00f2fe)",
                                      "linear-gradient(90deg,#f093fb,#f5576c)",
                                      "linear-gradient(90deg,#43e97b,#38f9d7)",
                                    ][i % 4],
                                  }}
                                />
                              </div>
                              <span className="text-xs font-bold text-base-content">
                                {product.sales}
                              </span>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* ══════════════════════════════════════════════════════
            BOTTOM — Quick Stats Row
        ══════════════════════════════════════════════════════ */}
        <motion.div
          variants={fadeUp}
          custom={9}
          initial="hidden"
          animate="visible"
          className="card bg-base-100 border border-base-200 shadow-sm rounded-3xl"
        >
          <div className="card-body p-6">
            <h4 className="font-extrabold text-base-content text-base mb-4">
              Analytics Summary
            </h4>
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton key={i} className="h-20" />
                  ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  {
                    icon: Eye,
                    label: "Total Views",
                    value: data?.analytics
                      ?.reduce((s, d) => s + d.views, 0)
                      .toLocaleString(),
                    color: "#667eea",
                  },
                  {
                    icon: MousePointerClick,
                    label: "Total Clicks",
                    value: data?.analytics
                      ?.reduce((s, d) => s + d.clicks, 0)
                      .toLocaleString(),
                    color: "#f093fb",
                  },
                  {
                    icon: TrendingUp,
                    label: "Conversions",
                    value: data?.analytics
                      ?.reduce((s, d) => s + d.conversions, 0)
                      .toLocaleString(),
                    color: "#43e97b",
                  },
                  {
                    icon: ShoppingBag,
                    label: "Total Sales",
                    value: data?.products
                      ?.reduce((s, p) => s + p.sales, 0)
                      .toLocaleString(),
                    color: "#4facfe",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * i }}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-base-200/50 hover:bg-base-200 transition-colors duration-200"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${item.color}20` }}
                    >
                      <item.icon size={18} style={{ color: item.color }} />
                    </div>
                    <div>
                      <p className="text-lg font-extrabold text-base-content leading-tight">
                        {item.value}
                      </p>
                      <p className="text-xs text-base-content/40">
                        {item.label}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
