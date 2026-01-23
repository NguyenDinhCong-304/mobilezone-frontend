"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function UserAdd() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    roles: "user",
    status: 1,
    avatar: null,
    password: "",
    password_confirmation: "",
  });

  // State lưu lỗi validation
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Xóa lỗi khi user sửa input
  };

  const handleImageChange = (e) => {
    setForm({ ...form, avatar: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(form.phone)) {
      setErrors({ phone: "Số điện thoại phải gồm 10 chữ số!" });
      return;
    }

    if (form.password !== form.password_confirmation) {
      setErrors({ password_confirmation: "Mật khẩu xác nhận không khớp!" });
      return;
    }

    try {
      const token = localStorage.getItem("admin_token");

      const formData = new FormData();
      for (const key in form) {
        formData.append(key, form[key]);
      }

      await axios.post("http://localhost:8000/api/admin/user", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Thêm user thành công!");
      router.push("/admin/user");
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors);
      } else if (err.response?.status === 401) {
        alert("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!");
        router.push("/admin/login");
      } else {
        console.error(err);
        alert("Lỗi khi thêm user!");
      }
    }
  };

  return (
    <section className="p-6 bg-white shadow-md rounded text-black max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Thêm User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Họ tên */}
        <div>
          <label className="block font-semibold">Tên người dùng</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        {/* Số điện thoại */}
        <div>
          <label className="block font-semibold">Số điện thoại</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}
        </div>

        {/* Tên đăng nhập */}
        <div>
          <label className="block font-semibold">Tên đăng nhập</label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username}</p>
          )}
        </div>

        {/* Mật khẩu */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold">Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              required
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <div>
            <label className="block font-semibold">Xác nhận mật khẩu</label>
            <input
              type="password"
              name="password_confirmation"
              value={form.password_confirmation}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              required
            />
            {errors.password_confirmation && (
              <p className="text-red-500 text-sm">
                {errors.password_confirmation}
              </p>
            )}
          </div>
        </div>

        {/* Avatar */}
        <div>
          <label className="block font-semibold">Avatar</label>
          <input type="file" onChange={handleImageChange} />
          {errors.avatar && (
            <p className="text-red-500 text-sm">{errors.avatar}</p>
          )}
        </div>

        {/* Quyền */}
        <div>
          <label className="block font-semibold">Quyền</label>
          <select
            name="roles"
            value={form.roles}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          {errors.roles && (
            <p className="text-red-500 text-sm">{errors.roles}</p>
          )}
        </div>

        {/* Trạng thái */}
        <div>
          <label className="block font-semibold">Trạng thái</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          >
            <option value={1}>Hiển thị</option>
            <option value={0}>Ẩn</option>
          </select>
          {errors.status && (
            <p className="text-red-500 text-sm">{errors.status}</p>
          )}
        </div>

        {/* Nút hành động */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/user")}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Lưu lại
          </button>
        </div>
      </form>
    </section>
  );
}
