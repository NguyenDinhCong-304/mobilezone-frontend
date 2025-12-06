"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";


export default function EditCategory() {
  const { id } = useParams();
  const router = useRouter();

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [parentId, setParentId] = useState(0);
  const [sortOrder, setSortOrder] = useState(0);
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(1);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  // Lấy dữ liệu category hiện tại
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/category/${id}`);
        if (!res.ok) throw new Error("Không tìm thấy danh mục");
        const json = await res.json();
        const cat = json.data ?? json;

        setName(cat.name || "");
        setSlug(cat.slug || "");
        setParentId(cat.parent_id ?? 0);
        setSortOrder(cat.sort_order ?? 0);
        setDescription(cat.description ?? "");
        setStatus(cat.status ?? 1);
      } catch (err) {
        toast.error("Lỗi: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCategory();
  }, [id]);

  // Lấy danh sách để chọn parent_id
  useEffect(() => {
    fetch("http://localhost:8000/api/category")
      .then((res) => res.json())
      .then((data) => setCategories(data.data))
      .catch((err) => console.error("Error:", err));
  }, []);

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("slug", slug);
    formData.append("parent_id", parentId);
    formData.append("sort_order", sortOrder);
    formData.append("description", description);
    formData.append("status", status);
    if (image) formData.append("image", image);
    formData.append("_method", "PUT"); // Laravel cần dòng này

    try {
      const res = await fetch(`http://localhost:8000/api/category/${id}`, {
        method: "POST", // gửi POST thay vì PUT
        body: formData,
      });

      if (!res.ok) throw new Error("Cập nhật thất bại");
      toast.success("Cập nhật danh mục thành công");
      router.push("/admin/category");
    } catch (err) {
      toast.error("Lỗi: " + err.message);
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
        <div>
          <label className="block">Tên danh mục</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border px-3 py-2 w-full rounded"
            required
          />
        </div>

        <div>
          <label className="block">Slug</label>
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="border px-3 py-2 w-full rounded"
          />
        </div>

        <div>
          <label className="block">Danh mục cha</label>
          <select
            value={parentId}
            onChange={(e) => setParentId(Number(e.target.value))}
            className="border px-3 py-2 w-full rounded"
          >
            <option value={0}>-- Không có --</option>
            {categories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block">Thứ tự</label>
          <input
            type="number"
            value={sortOrder}
            onChange={(e) => setSortOrder(Number(e.target.value))}
            className="border px-3 py-2 w-full rounded"
          />
        </div>

        <div>
          <label className="block">Mô tả</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border px-3 py-2 w-full rounded"
          />
        </div>

        <div>
          <label className="block">Hình ảnh</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="border px-3 py-2 w-full rounded"
          />
        </div>

        <div>
          <label className="block">Trạng thái</label>
          <select
            value={status}
            onChange={(e) => setStatus(Number(e.target.value))}
            className="border px-3 py-2 w-full rounded"
          >
            <option value={1}>Hiển thị</option>
            <option value={0}>Ẩn</option>
          </select>
        </div>

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
