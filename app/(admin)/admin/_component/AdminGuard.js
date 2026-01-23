"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import adminAxios from "@/app/utils/adminAxios";

export default function AdminGuard({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");

    // ❌ Không có token → login
    if (!token) {
      router.replace("/admin/login");
      return;
    }

    // ✅ Có token → kiểm tra còn sống không
    adminAxios
      .get("/me")
      .then(() => setLoading(false))
      .catch(() => {
        localStorage.removeItem("admin_token");
        router.replace("/admin/login");
      });
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Đang xác vào admin...
      </div>
    );
  }

  return children;
}
