"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { notify } from "../../../utils/notify";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8000/api/login", {
        login: email,
        password,
      });

      if (res.data.role !== "admin") {
        notify.error("Bạn không có quyền admin");
        return;
      }

      // lưu admin riêng
      localStorage.setItem("admin_token", res.data.token);
      localStorage.setItem("admin_role", JSON.stringify(res.data.role));
      localStorage.setItem("admin_user", JSON.stringify(res.data.user));

      notify.success("Đăng nhập admin thành công");
      router.push("/admin");
    } catch (err) {
      notify.error("Đăng nhập thất bại");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow w-96">
        <h2 className=" text-black text-xl font-bold mb-4 text-center">ADMIN LOGIN</h2>

        <input
          type="email"
          placeholder="Email"
          className="text-black w-full border p-2 mb-3"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="text-black w-full border p-2 mb-3"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Đăng nhập
        </button>
      </form>
    </div>
  );
}
