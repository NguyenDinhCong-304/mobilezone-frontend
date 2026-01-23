"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { FileText, Package, ShoppingCart, Users } from "lucide-react";
import DashboardOrderChart from "../../_component/DashboardOrderChart";

export default function DashboardContent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("admin_token");

        const res = await axios.get(
          "http://localhost:8000/api/admin/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setData(res.data);
      } catch (err) {
        console.error("Lỗi tải dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-black animate-pulse">Đang tải dashboard...</div>
    );
  }

  return (
    <div className="p-6 space-y-6 text-black">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Tổng quan hoạt động hệ thống</p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard
          title="Bài viết"
          value={data.posts}
          icon={<FileText />}
          color="bg-blue-100 text-blue-600"
        />
        <StatCard
          title="Sản phẩm"
          value={data.products}
          icon={<Package />}
          color="bg-green-100 text-green-600"
        />
        <StatCard
          title="Đơn hàng"
          value={data.orders}
          icon={<ShoppingCart />}
          color="bg-orange-100 text-orange-600"
        />
        <StatCard
          title="Người dùng"
          value={data.users}
          icon={<Users />}
          color="bg-purple-100 text-purple-600"
        />
      </div>

      {/* CHART */}
      <DashboardOrderChart />

      {/* LATEST DATA */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Latest Orders */}
        <LatestBox title="Đơn hàng mới">
          {data.latest_orders.length === 0 ? (
            <Empty />
          ) : (
            data.latest_orders.map((order) => (
              <RowItem
                key={order.id}
                left={`#${order.id} – ${order.name}`}
                right={formatDate(order.created_at)}
              />
            ))
          )}
        </LatestBox>

        {/* Latest Posts */}
        <LatestBox title="Bài viết mới">
          {data.latest_posts.length === 0 ? (
            <Empty />
          ) : (
            data.latest_posts.map((post) => (
              <RowItem
                key={post.id}
                left={post.title}
                right={formatDate(post.created_at)}
              />
            ))
          )}
        </LatestBox>
      </div>
    </div>
  );
}
/* ================= COMPONENTS ================= */

function StatCard({ title, value, icon, color }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 flex items-center justify-between hover:shadow-md transition">
      <div>
        <p className="text-gray-500">{title}</p>
        <p className="text-3xl font-bold mt-1">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        {icon}
      </div>
    </div>
  );
}

function LatestBox({ title, children }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <h2 className="font-semibold text-lg mb-4">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function RowItem({ left, right }) {
  return (
    <div className="flex justify-between items-center border-b pb-2 last:border-none">
      <span className="truncate max-w-[70%]">{left}</span>
      <span className="text-sm text-gray-500">{right}</span>
    </div>
  );
}

function Empty() {
  return (
    <p className="text-gray-400 text-sm">
      Chưa có dữ liệu
    </p>
  );
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("vi-VN");
}