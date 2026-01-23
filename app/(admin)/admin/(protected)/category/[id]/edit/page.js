"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import adminAxios from "@/app/utils/adminAxios";

export default function EditCategory() {
  const { id } = useParams();
  const router = useRouter();

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [parentId, setParentId] = useState("0");
  const [sortOrder, setSortOrder] = useState(0);
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("1"); // string để React select
  const [image, setImage] = useState(null); // string hoặc File
  const [loading, setLoading] = useState(true);

  // Lấy dữ liệu category hiện tại
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await adminAxios.get(`/category/${id}`);
        const cat = res.data;

        if (!cat) {
          toast.error("Không tìm thấy danh mục");
          return;
        }

        setName(cat.name || "");
        setSlug(cat.slug || "");
        setParentId(cat.parent_id ? String(cat.parent_id) : "0"); // ép sang string
        setSortOrder(cat.sort_order ?? 0);
        setDescription(cat.description ?? "");
        setStatus(String(cat.status ?? "1")); // ép sang string
        if (cat.image) setImage(`http://localhost:8000/storage/${cat.image}`);
      } catch (err) {
        toast.error("Lỗi: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCategory();
  }, [id]);

  // Lấy danh sách categories để chọn parent
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await adminAxios.get("/category");
        console.log("CATEGORY API:", res.data);
        setCategories(res.data.data);
      } catch (err) {
        console.error("Lỗi tải danh mục:", err);
      }
    };

    fetchCategories();
  }, []);

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", name);
    formData.append("slug", slug);
    formData.append("parent_id", parentId === "0" ? 0 : parentId); // backend convert null nếu 0
    formData.append("sort_order", sortOrder);
    formData.append("description", description);
    formData.append("status", Number(status)); // convert về number
    formData.append("_method", "PUT");

    if (image && image instanceof File) {
      formData.append("image", image);
    }

    try {
      const res = await adminAxios.post(`/category/${id}`, formData);

      toast.success(res.data.message || "Cập nhật danh mục thành công!");
      router.push("/admin/category");
    } catch (err) {
      console.error("Lỗi cập nhật:", err);

      if (err.response?.status === 422) {
        const firstError = Object.values(err.response.data.errors)[0][0];
        toast.warning(firstError);
      } else {
        toast.error(
          err.response?.data?.message || "Cập nhật danh mục thất bại!",
        );
      }
    }
  };

  if (loading) return <p className="text-black">Đang tải...</p>;

  return (
    <div className="p-6 text-black">
      <div>
        <h3 className="border-b text-3xl font-semibold mb-4">Danh mục</h3>
      </div>
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold mb-4">Chỉnh sửa danh mục</h1>
        <a
          href="/admin/category"
          className="bg-blue-600 text-white px-3 py-2 rounded inline-block mb-4"
        >
          ← Quay lại danh sách
        </a>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Tên */}
        <div>
          <label className="block">Tên danh mục</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border px-3 py-2 w-full rounded"
            required
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block">Slug</label>
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="border px-3 py-2 w-full rounded"
          />
        </div>

        {/* Parent */}
        <div>
          <label className="block">Danh mục cha</label>
          <select
            value={parentId}
            onChange={(e) => setParentId(e.target.value)}
            className="border px-3 py-2 w-full rounded"
          >
            <option value="0">-- Không có --</option>
            {Array.isArray(categories) &&
              categories
                .filter(Boolean) // loại bỏ undefined / null
                .filter((item) => item.id !== Number(id))
                .map((item) => (
                  <option key={item.id} value={String(item.id)}>
                    {item.name}
                  </option>
                ))}
          </select>
        </div>

        {/* Sort Order */}
        <div>
          <label className="block">Thứ tự</label>
          <input
            type="number"
            value={sortOrder}
            onChange={(e) => setSortOrder(Number(e.target.value))}
            className="border px-3 py-2 w-full rounded"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block">Mô tả</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border px-3 py-2 w-full rounded"
          />
        </div>

        {/* Image */}
        <div>
          <label className="block">Hình ảnh</label>
          {typeof image === "string" && (
            <img src={image} className="w-32 mb-2 border rounded" />
          )}
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="border px-3 py-2 w-full rounded"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block">Trạng thái</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border px-3 py-2 w-full rounded"
          >
            <option value="1">Hiển thị</option>
            <option value="0">Ẩn</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Lưu thay đổi
        </button>
      </form>
    </div>
  );
}
