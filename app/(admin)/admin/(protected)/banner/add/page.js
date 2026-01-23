"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { confirmDialog } from "@/app/utils/notify";
import adminAxios from "@/app/utils/adminAxios";

export default function BannerAdd() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    link: "",
    description: "",
    position: "",
    sort_order: "",
    status: 1,
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.image) {
      toast.warning("Vui lòng chọn ảnh trước khi thêm banner!");
      return;
    }

    const confirmed = await confirmDialog({
      title: "Xác nhận thêm banner",
      text: "Bạn có chắc chắn muốn thêm banner này không?",
      confirmText: "Thêm banner",
      cancelText: "Hủy",
    });

    if (!confirmed) return;

    try {
      const formData = new FormData();

      for (const key in form) {
        formData.append(key, form[key]);
      }

      await adminAxios.post("/banner", formData,);

      toast.success("Thêm banner thành công!");
      router.push("/admin/banner");
    } catch (err) {
      console.error(err);
      toast.error("Lỗi khi thêm banner!");
    }
  };

  return (
    <section className="p-6 bg-white shadow-md rounded text-black max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">➕ Thêm Banner</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Tên banner</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Link</label>
          <input
            name="link"
            value={form.link}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>

        <div className="mb-4 text-black">
          <label className="block text-gray-700">Mô tả</label>
          <textarea
            name="description"
            placeholder="Mô tả"
            value={form.description}
            onChange={handleChange}
            className="border p-2 col-span-2 w-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold">Vị trí</label>
            <input
              name="position"
              value={form.position}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
          </div>
          <div>
            <label className="block font-semibold">Thứ tự</label>
            <input
              name="sort_order"
              type="number"
              value={form.sort_order}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold">Ảnh banner</label>
          <input type="file" onChange={handleImageChange} />
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

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/banner")}
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
