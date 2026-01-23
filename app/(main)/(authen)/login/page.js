"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { notify } from "@/app/utils/notify";

export default function Login() {
  const [mounted, setMounted] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8000/api/login", {
        login,
        password,
      });

      if (res.data.status) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        //localStorage.setItem("role", res.data.role); // Lưu role để dùng sau

        notify.success(res.data.message || "Đăng nhập thành công");

        // Điều hướng dựa trên role
        // if (res.data.role === "admin") {
        //     window.location.href = "/admin"; // Trang quản lý admin
        // } else {
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
        //}
      } else {
        notify.error(res.data.message || "Đăng nhập thất bại!");
      }
    } catch (err) {
      if (err.response && err.response.data) {
        notify.error(err.response.data.message);
      } else {
        notify.error("Lỗi kết nối máy chủ.");
      }
    }
  };

  return (
    <section className="section-conten padding-y" style={{ minHeight: "84vh" }}>
      <div
        className="card mx-auto"
        style={{ maxWidth: "380px", marginTop: "100px" }}
      >
        <div className="card-body">
          <h4 className="card-title mb-4">Đăng nhập</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                className="form-control"
                placeholder="Email / Số điện thoại / Tên đăng nhập"
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                placeholder="Mật khẩu"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block">
                Đăng nhập
              </button>
            </div>
          </form>
          {message && <div className="alert alert-info mt-3">{message}</div>}
        </div>
      </div>
      <p className="text-center mt-4">
        Chưa có tài khoản? <a href="/register">Đăng ký</a>
      </p>
    </section>
  );
}
