"use client";

import { useRouter } from "next/navigation";
import axios from "axios";

export default function AdminHeader() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("admin_token");

      if (token) {
        await axios.post(
          "http://localhost:8000/api/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      }
    } catch (error) {
      console.warn("Logout API failed, continue logout anyway");
    } finally {
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_user");
      localStorage.removeItem("admin_role");

      router.push("/admin/login");
    }
  };

  return (
    <header className="flex items-center justify-between bg-yellow-400 px-4 py-2">
      <a href="/" className="text-xl font-bold text-white no-underline">
        TRANG QUẢN LÝ
      </a>
      <button
        onClick={handleLogout}
        className="bg-sky-400 hover:bg-sky-500 text-white px-4 py-2 rounded"
      >
        Đăng xuất
      </button>
    </header>
  );
}
