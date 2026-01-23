"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function DashboardOrderChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchChart = async () => {
      try {
        const token = localStorage.getItem("admin_token");

        if (!token) {
          console.error("Không có admin token");
          return;
        }

        const res = await axios.get(
          "http://localhost:8000/api/admin/dashboard/chart",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setData(res.data);
      } catch (err) {
        console.error("Lỗi load chart:", err.response?.data || err);
      }
    };

    fetchChart();
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-3 text-black">
        Đơn hàng 7 ngày gần nhất
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#2563eb"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
