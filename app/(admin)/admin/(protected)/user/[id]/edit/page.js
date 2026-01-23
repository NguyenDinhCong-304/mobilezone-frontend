"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

export default function UserEdit() {
  const { id } = useParams();
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
  const [preview, setPreview] = useState("");

  // Load user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("admin_token");

        const res = await axios.get(
          `http://localhost:8000/api/admin/user/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = res.data;
        console.log(res.data);
        setForm({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          username: data.username || "",
          roles: data.roles || "user",
          status: data.status ?? 1,
          avatar: null,
          password: "",
          password_confirmation: "",
        });

        setPreview(
          data.avatar ? `http://localhost:8000/${data.avatar}` : "",
        );
      } catch (err) {
        console.error("Không tải được user", err);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "status" ? Number(value) : value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, avatar: file });
    setPreview(file ? URL.createObjectURL(file) : "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("admin_token");

      const formData = new FormData();
      for (const key in form) {
        if (
          form[key] !== null &&
          form[key] !== "" &&
          !(key === "password_confirmation" && !form.password)
        ) {
          formData.append(key, form[key]);
        }
      }

      await axios.post(
        `http://localhost:8000/api/admin/user/${id}?_method=PUT`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      alert("Cập nhật user thành công!");
      router.push("/admin/user");
    } catch (err) {
      if (err.response?.status === 401) {
        alert("Phiên đăng nhập hết hạn");
        router.push("/admin/login");
      } else if (err.response?.status === 422) {
        alert("Dữ liệu không hợp lệ");
      } else {
        console.error(err);
        alert("Lỗi khi cập nhật user!");
      }
    }
  };

  return (
    <section className="p-6 bg-white shadow-md rounded text-black max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">✏️ Sửa User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Tên</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Số điện thoại</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Tên tài khoản</label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>

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
        </div>

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
        </div>

        <div>
          <label className="block font-semibold">Avatar</label>
          <input type="file" onChange={handleImageChange} />
          {preview && (
            <img
              src={preview}
              className="w-32 h-32 object-cover mt-2 rounded"
            />
          )}
        </div>

        <div>
          <label className="block font-semibold">Mật khẩu (nếu muốn đổi)</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Xác nhận mật khẩu</label>
          <input
            type="password"
            name="password_confirmation"
            value={form.password_confirmation}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>

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
            Cập nhật
          </button>
        </div>
      </form>
    </section>
  );
}
