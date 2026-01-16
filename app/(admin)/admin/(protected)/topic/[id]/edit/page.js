"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import slugify from "slugify";
import { useRouter, useParams } from "next/navigation";

export default function EditTopic() {
  const router = useRouter();
  const { id } = useParams(); // ✅ lấy id từ URL

  // State topic
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [sortOrder, setSortOrder] = useState(1);
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(1);

  // State UI
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState("");

  // Lấy dữ liệu topic theo id
  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/topic/${id}`);
        const data = res.data.data;

        // Gán dữ liệu từ API vào form
        setName(data.name || "");
        setSlug(data.slug || "");
        setSortOrder(data.sort_order || 1);
        setDescription(data.description || "");
        setStatus(data.status ?? 1);
        console.log("topic: ", data);
      } catch (err) {
        console.error(err);
        setError("Không thể tải dữ liệu chủ đề.");
      } finally {
        setLoadingData(false);
      }
    };

    if (id) fetchTopic();
  }, [id]);

  // ✅ Cập nhật chủ đề
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.post(`http://localhost:8000/api/topic/${id}?_method=PUT`, {
        name,
        slug: slug || slugify(name, { lower: true }),
        sort_order: sortOrder,
        description,
        status,
      });

      alert("Cập nhật chủ đề thành công!");
      router.push("/admin/topic");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Có lỗi xảy ra khi cập nhật.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Nếu đang tải dữ liệu
  if (loadingData) {
    return <p className="text-center mt-10 text-gray-500">Đang tải dữ liệu...</p>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow text-black max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Chỉnh sửa chủ đề</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Tên chủ đề */}
        <div>
          <label className="block font-medium mb-1">Tên chủ đề</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Nhập tên chủ đề"
            required
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block font-medium mb-1">Slug</label>
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Tự động tạo nếu để trống"
          />
        </div>

        {/* Mô tả */}
        <div>
          <label className="block font-medium mb-1">Mô tả</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded p-2"
            rows={3}
            placeholder="Nhập mô tả cho chủ đề"
          />
        </div>

        {/* Thứ tự */}
        <div>
          <label className="block font-medium mb-1">Thứ tự</label>
          <input
            type="number"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>

        {/* Trạng thái */}
        <div>
          <label className="block font-medium mb-1">Trạng thái</label>
          <select
            value={status}
            onChange={(e) => setStatus(Number(e.target.value))}
            className="w-full border rounded p-2"
          >
            <option value={1}>Hiển thị</option>
            <option value={0}>Ẩn</option>
          </select>
        </div>

        {/* Hiển thị lỗi */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Nút lưu */}
        <button
          disabled={loading}
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Đang cập nhật..." : "Lưu thay đổi"}
        </button>
      </form>
    </div>
  );
}
