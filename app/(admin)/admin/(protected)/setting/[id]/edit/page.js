"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import adminAxios from "@/app/utils/adminAxios";

export default function EditSettingPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [formData, setFormData] = useState({
    site_name: "",
    email: "",
    phone: "",
    hotline: "",
    address: "",
    status: 1,
  });

  useEffect(() => {
    if (!id) return;

    const fetchSetting = async () => {
      try {
        const res = await adminAxios.get(`/setting/${id}`);

        // Chuẩn Laravel Resource
        if (res.data?.data) {
          setFormData(res.data.data);
        }
      } catch (err) {
        console.error("Lỗi tải setting:", err);
      }
    };

    fetchSetting();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await adminAxios.put(`/setting/${id}`, formData);

      toast.success(res.data?.message || "Cập nhật thành công!");
      setTimeout(() => {
        router.push("/admin/setting");
      }, 1000);
    } catch (err) {
      console.error(err);

      if (err.response?.status === 422) {
        const errors = err.response.data.errors;
        const messages = Object.values(errors).flat().join("\n");
        toast.error("Dữ liệu không hợp lệ:\n" + messages);
      } else {
        toast.error(err.response?.data?.message || "Lỗi khi cập nhật!");
      }
    }
  };

  return (
    <section id="main-content">
      <ToastContainer position="top-right" autoClose={2000} />
      <section className="wrapper text-black">
        <h3 className=" mb-6 text-3xl border-b font-bold">
          <i className="fa fa-angle-right"></i> Cập nhật cài đặt
        </h3>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white p-6 rounded shadow-md"
        >
          <div>
            <label className="block font-semibold mb-1">Tên website</label>
            <input
              type="text"
              name="site_name"
              value={formData.site_name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Điện thoại</label>
            <input
              type="text"
              name="phone"
              value={formData.phone || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Hotline</label>
            <input
              type="text"
              name="hotline"
              value={formData.hotline || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Địa chỉ</label>
            <input
              type="text"
              name="address"
              value={formData.address || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Trạng thái</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value={1}>Hiển thị</option>
              <option value={0}>Ẩn</option>
            </select>
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              Cập nhật
            </button>
            <button
              type="button"
              className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded"
              onClick={() => router.push("/admin/setting")}
            >
              Quay lại
            </button>
          </div>
        </form>
      </section>
    </section>
  );
}
