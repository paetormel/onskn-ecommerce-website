import React from "react";
import PageWrapper from "../../components/layouts/PageWrapper";
import Title from "../../components/Title";
import {
  FaShoppingCart,
  FaUsers,
  FaChartLine,
  FaBoxOpen,
} from "react-icons/fa";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { analyticsData } from "../../constants/dashboard.constant";
import StatCard from "../../components/StatCard";

// --- Main Page ---
const Dashboard: React.FC = () => {
  return (
    <PageWrapper>
      <div className="flex justify-between items-center">
        <Title title="Dashboard" />
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition">
          Download Report
        </button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <StatCard
          title="Revenue"
          value="₱128,430"
          icon={FaChartLine}
          trend="+12.5%"
        />
        <StatCard
          title="Orders"
          value="1,284"
          icon={FaShoppingCart}
          trend="+8.2%"
        />
        <StatCard title="Customers" value="856" icon={FaUsers} trend="+3.1%" />
        <StatCard title="Low Stock" value="12" icon={FaBoxOpen} trend="-2.0%" />
      </div>

      {/* Analytics Section */}
      <div className="mt-8 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
        <h2 className="text-lg font-bold text-slate-800 mb-6">
          Sales Analytics
        </h2>
        <div className="h-75 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={analyticsData}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="#943E25"
                fillOpacity={1}
                fill="url(#colorSales)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Dashboard;
