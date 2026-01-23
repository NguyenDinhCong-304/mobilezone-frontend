"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { notify, confirmDialog } from "@/app/utils/notify";
import adminAxios from "@/app/utils/adminAxios";

export default function AddMenu() {
  const router = useRouter();
  const [type, setType] = useState("main");
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [parentId, setParentId] = useState(null);
  const [tableId, setTableId] = useState(0);
  const [sortOrder, setSortOrder] = useState(0);
  const [status, setStatus] = useState(1);
  const [menus, setMenus] = useState([]); // danh sách menu cha
  const [loading, setLoading] = useState(false);

  //Lấy danh sách menu cha
  useEffect(() => {
    adminAxios
      .get("/menu")
      .then((res) => {
        setMenus(Array.isArray(res.data.data) ? res.data.data : []);
      })
      .catch((err) => {
        console.error("Lỗi khi tải menu cha:", err);
        setMenus([]);
      });
  }, []);

  //Gửi request thêm menu
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await adminAxios.post("/menu", {
        name,
        link,
        type,
        parent_id: parentId || null,
        table_id: tableId,
        sort_order: sortOrder,
        status,
      });
      notify.success("Thêm menu thành công!");
      router.push("/admin/menu");
    } catch (err) {
      console.error(err);
      notify.error(
        err.response?.data?.message || "Có lỗi xảy ra khi thêm menu!"
      );
    } finally {
      setLoading(false);
    }
  };

  //Import menu từ nguồn (Category, Topic, Page)
  const handleImport = async (sourceType) => {
    const ok = await confirmDialog({
      title: "Xác nhận import menu",
      text: `Bạn có chắc muốn thêm menu từ ${sourceType}?`,
      confirmText: "Import",
      cancelText: "Hủy",
    });

    if (!ok) return;
    try {
      await adminAxios.post(`/menu/import`, {
        type: sourceType,
      });
      notify.success(`Đã thêm menu từ ${sourceType} thành công!`);
    } catch (err) {
      console.error(err);
      notify.error(err.response?.data?.message || "Lỗi khi import menu!");
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
            <option value="main">main</option>
            <option value="footer">footer</option>
            <option value="category">category</option>
            <option value="topic">topic</option>
            <option value="page">page</option>
          </select>
        </div>

        {/* Menu cha */}
        <div>
          <label className="block mb-1 font-medium">Menu cha</label>
          <select
            value={parentId ?? ""}
            onChange={(e) => setParentId(e.target.value ? Number(e.target.value) : null)}
            className="border p-2 rounded w-full"
          >
            <option value={""}>Không có (menu gốc)</option>
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
