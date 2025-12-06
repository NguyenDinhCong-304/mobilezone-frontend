"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function AddMenu() {
  const router = useRouter();
  const [type, setType] = useState("custom");
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [parentId, setParentId] = useState(0);
  const [tableId, setTableId] = useState(0);
  const [sortOrder, setSortOrder] = useState(0);
  const [status, setStatus] = useState(1);
  const [menus, setMenus] = useState([]); // danh sách menu cha
  const [loading, setLoading] = useState(false);

  //Lấy danh sách menu cha
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/menu")
      .then((res) => setMenus(res.data))
      .catch((err) => console.error("Lỗi khi tải menu cha:", err));
  }, []);

  //Gửi request thêm menu
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:8000/api/menu", {
        name,
        link,
        type,
        parent_id: parentId || null,
        table_id: tableId,
        sort_order: sortOrder,
        status,
      });
      alert("Thêm menu thành công!");
      router.push("/admin/menu");
    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra khi thêm menu!");
    } finally {
      setLoading(false);
    }
  };

  //Import menu từ nguồn (Category, Topic, Page)
  const handleImport = async (sourceType) => {
    if (!confirm(`Bạn có chắc muốn thêm menu từ ${sourceType}?`)) return;
    try {
      await axios.post(`http://localhost:8000/api/menu/import`, {
        type: sourceType,
      });
      alert(`Đã thêm menu từ ${sourceType} thành công!`);
    } catch (err) {
      console.error(err);
      alert("Lỗi khi import menu!");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow text-black w-full">
      <h2 className="text-2xl font-semibold mb-4">Thêm menu mới</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Tên menu */}
        <div>
          <label className="block mb-1 font-medium">Tên menu</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Nhập tên menu..."
            required
          />
        </div>

        {/* Đường dẫn */}
        <div>
          <label className="block mb-1 font-medium">Đường dẫn (link)</label>
          <input
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="/duong-dan"
            required
          />
        </div>

        {/* Loại menu */}
        <div>
          <label className="block mb-1 font-medium">Loại menu</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="custom">Custom</option>
            <option value="category">Category</option>
            <option value="topic">Topic</option>
            <option value="page">Page</option>
          </select>
        </div>

        {/* Menu cha */}
        <div>
          <label className="block mb-1 font-medium">Menu cha</label>
          <select
            value={parentId}
            onChange={(e) => setParentId(Number(e.target.value))}
            className="border p-2 rounded w-full"
          >
            <option value={0}>Không có (menu gốc)</option>
            {menus.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </div>

        {/* Sort order */}
        <div>
          <label className="block mb-1 font-medium">Thứ tự sắp xếp</label>
          <input
            type="number"
            value={sortOrder}
            onChange={(e) => setSortOrder(Number(e.target.value))}
            className="border p-2 rounded w-full"
            min={0}
          />
        </div>

        {/* Trạng thái */}
        <div>
          <label className="block mb-1 font-medium">Trạng thái</label>
          <select
            value={status}
            onChange={(e) => setStatus(Number(e.target.value))}
            className="border p-2 rounded w-full"
          >
            <option value={1}>Hiển thị</option>
            <option value={0}>Ẩn</option>
          </select>
        </div>

        {/* Nút lưu */}
        <button
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Đang lưu..." : "Lưu menu"}
        </button>
      </form>

      {/* Import từ nguồn */}
      <hr className="my-6" />
      <h3 className="text-lg font-semibold mb-2">Hoặc thêm từ nguồn có sẵn:</h3>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => handleImport("category")}
          className="bg-gray-700 text-white px-4 py-2 rounded"
        >
          Từ Category
        </button>
        <button
          onClick={() => handleImport("topic")}
          className="bg-gray-700 text-white px-4 py-2 rounded"
        >
          Từ Topic
        </button>
        <button
          onClick={() => handleImport("page")}
          className="bg-gray-700 text-white px-4 py-2 rounded"
        >
          Từ Page
        </button>
      </div>
    </div>
  );
}
