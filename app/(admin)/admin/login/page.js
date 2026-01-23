"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { notify } from "../../../utils/notify";

export default function AdminLogin() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8000/api/login", {
        login: login.trim(),
        password,
      });

      const { token, role, user } = res.data;

      if (!token || !role) {
        notify.error("Dữ liệu đăng nhập không hợp lệ");
        setLoading(false);
        return;
      }

      // CHUẨN HÓA ROLE
      let isAdmin = false;

      if (typeof role === "string") {
        isAdmin = role === "admin";
      } else if (Array.isArray(role)) {
        isAdmin = role.includes("admin");
      } else if (typeof role === "object") {
        isAdmin = role?.name === "admin";
      }

      if (!isAdmin) {
        notify.error("Bạn không có quyền admin");
        setLoading(false);
        return;
      }

      // LƯU ADMIN RIÊNG
      localStorage.setItem("admin_token", token);
      localStorage.setItem("admin_role", JSON.stringify(role));
      localStorage.setItem("admin_user", JSON.stringify(user));

      notify.success("Đăng nhập admin thành công");
      router.replace("/admin");
    } catch (err) {
      console.error("Admin login error:", err);
      const msg =
        err.response?.data?.message || "Sai tài khoản hoặc mật khẩu";
      notify.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow w-96"
      >
        <h2 className="text-black text-xl font-bold mb-4 text-center">
          ADMIN LOGIN
        </h2>

        <input
          type="text"
          placeholder="Email / Username / Phone"
          className="text-black w-full border p-2 mb-3"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="text-black w-full border p-2 mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>
    </div>
  );
}


