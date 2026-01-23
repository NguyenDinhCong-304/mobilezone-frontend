"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { confirmDialog } from "@/app/utils/notify";
import adminAxios from "@/app/utils/adminAxios";

export default function BannerEdit() {
  const { id } = useParams();
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
  const [preview, setPreview] = useState("");

  useEffect(() => {
    adminAxios.get(`/banner/${id}`).then((res) => {
      const data = res.data;
      setForm({
        name: data.name || "",
        link: data.link || "",
        description: data.description || "",
        position: data.position || "",
        sort_order: data.sort_order || "",
        status: data.status,
        image: null,
      });
      setPreview(`http://localhost:8000/storage/${data.image}`);
    })
      .catch(() => {
        toast.error("Không tải được dữ liệu banner!");
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirmed = await confirmDialog({
      title: "Xác nhận cập nhật banner",
      text: "Bạn có chắc chắn muốn cập nhật banner này không?",
      confirmText: "Cập nhật",
      cancelText: "Hủy",
    });

    if (!confirmed) return;

    try {
      const formData = new FormData();

      // Chỉ append nếu có giá trị hợp lệ
      for (const key in form) {
        if (key === "image") {
          if (form.image) formData.append("image", form.image);
        } else if (form[key] !== undefined && form[key] !== null){
          formData.append(key, form[key]);
        }
      }

      await adminAxios.post(`/banner/${id}?_method=PUT`, formData);

      toast.success("Cập nhật banner thành công!");
      router.push("/admin/banner");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Lỗi khi cập nhật banner!"
      );
    }
  };

  return (
    <section className="p-6 bg-white shadow-md rounded text-black max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">✏️ Sửa Banner</h2>
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

        <div>
          <label className="block">Mô tả</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="border px-3 py-2 w-full rounded"
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
          {preview && (
            <img src={preview} className="w-32 h-32 object-cover mt-2 rounded" />
          )}
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
            Cập nhật
          </button>
        </div>
      </form>
    </section>
  );
}
