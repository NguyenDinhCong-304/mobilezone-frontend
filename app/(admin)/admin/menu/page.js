"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function MenuList() {
  const [menus, setMenus] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ Lấy danh sách menu
  const fetchMenus = async (type = "") => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:8000/api/menu${type ? `?type=${type}` : ""}`
      );
      setMenus(res.data);
    } catch (err) {
      console.error("Error fetching menus:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  // ✅ Xóa menu
  const handleDelete = async (id) => {
    if (!confirm("Bạn có chắc muốn xóa menu này không?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/menu/${id}`);
      alert("Xóa menu thành công!");
      fetchMenus(filterType);
    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra khi xóa!");
    }
  };

  return (
    <section className="p-6 bg-white rounded-lg shadow text-black">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Danh sách Menu</h2>
        <Link
          href="/admin/menu/add"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Thêm menu
        </Link>
      </div>

      <div className="flex gap-4 mb-4">
        <select
          value={filterType}
          onChange={(e) => {
            setFilterType(e.target.value);
            fetchMenus(e.target.value);
          }}
          className="border p-2 rounded"
        >
          <option value="">Tất cả loại</option>
          <option value="category">Category</option>
          <option value="topic">Topic</option>
          <option value="page">Page</option>
          <option value="custom">Custom</option>
        </select>
      </div>

      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <table className="table-auto border-collapse border border-gray-400 w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-3 py-2">#</th>
              <th className="border px-3 py-2">Tên menu</th>
              <th className="border px-3 py-2">Link</th>
              <th className="border px-3 py-2">Loại</th>
              <th className="border px-3 py-2">Trạng thái</th>
              <th className="border px-3 py-2 w-32">Hành động</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {menus.length > 0 ? (
              menus.map((menu, index) => (
                <tr key={menu.id}>
                  <td className="border px-3 py-2">{index + 1}</td>
                  <td className="border px-3 py-2">{menu.name}</td>
                  <td className="border px-3 py-2">{menu.link}</td>
                  <td className="border px-3 py-2 capitalize">{menu.type}</td>
                  <td className="border px-3 py-2">
                    {menu.status === 1 ? "Hiển thị" : "Ẩn"}
                  </td>
                  <td className="border px-3 py-2 space-x-2">
                    <Link
                      href={`/admin/menu/${menu.id}/edit`}
                      className="text-blue-600"
                    >
                      <i className="fa fa-pencil"></i>
                    </Link>
                    <button
                      onClick={() => handleDelete(menu.id)}
                      className="text-red-600"
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-3">
                  Không có dữ liệu
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </section>
  );
}
