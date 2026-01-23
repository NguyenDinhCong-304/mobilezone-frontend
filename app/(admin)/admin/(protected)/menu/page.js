"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { notify, confirmDialog } from "@/app/utils/notify";
import adminAxios from "@/app/utils/adminAxios";

export default function MenuList() {
  const [menus, setMenus] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  // Lấy danh sách menu
  const fetchMenus = async () => {
    setLoading(true);
    try {
      const res = await adminAxios.get("/menu", {
        params: { page, type: filterType },
      });

      setMenus(res.data.data);
      setLastPage(res.data.last_page);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, [page, filterType]);

  //Xóa menu
  const handleDelete = async (id) => {
    const ok = await confirmDialog({
      title: "Xác nhận xóa menu",
      text: "Menu này sẽ bị xóa vĩnh viễn!",
      confirmText: "Xóa",
      cancelText: "Hủy",
    });

    if (!ok) return;

    try {
      await adminAxios.delete(`/menu/${id}`);
      notify.success("Xóa menu thành công!");
      fetchMenus(filterType);
    } catch (err) {
      console.error(err);
      notify.error(
        err.response?.data?.message || "Có lỗi xảy ra khi xóa menu!"
      );
    }
  };

  return (
    <section className="p-6 rounded-lg text-black">
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
            setPage(1);
            setFilterType(e.target.value);
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
              <th className="border px-3 py-2">STT</th>
              <th className="border px-3 py-2">Tên menu</th>
              <th className="border px-3 py-2">Menu cha</th>
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
                  <td className="border px-3 py-2">{(page - 1) * 10 + index + 1}</td>
                  <td className="border px-3 py-2">{menu.name}</td>
                  <td className="border px-3 py-2">{menu.parent ? menu.parent.name : "null"}</td>
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
      <div className="flex justify-center items-center mt-4 gap-2 text-black">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50 cursor-pointer"
        >
          « Trước
        </button>
        <span>
          Trang {page} / {lastPage}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, lastPage))}
          disabled={page === lastPage}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50 cursor-pointer"
        >
          Sau »
        </button>
      </div>
    </section>
  );
}
