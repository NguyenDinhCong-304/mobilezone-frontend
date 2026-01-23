"use client";
import { useEffect, useState } from "react";
import adminAxios from "@/app/utils/adminAxios";
import { toast } from "react-toastify";
import { confirmDialog } from "../../../../utils/notify";

export default function CategoryList() {
  const [brands, setBrands] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch categories (dùng page hiện tại)
  const fetchBrands = async () => {
    setLoading(true);
    try {
      const res = await adminAxios.get("/brand", {
        params: { search, status, page },
      });

      setBrands(res.data.data);
      setLastPage(res.data.last_page);
    } catch (err) {
      console.error("Lỗi tải thương hiệu:", err);
    } finally {
      setLoading(false);
    }
  };

  // Gọi lại khi page, search, hoặc status thay đổi
  useEffect(() => {
    fetchBrands();
  }, [page, status, search]);

  // Gọi khi bấm nút tìm kiếm
  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // Reset về trang đầu khi tìm
    fetchBrands();
  };

  // Xóa danh mục
  const handleDelete = async (id) => {
    const confirmed = await confirmDialog({
      title: "Xóa thương hiệu",
      text: "Bạn có chắc chắn muốn xóa thương hiệu này?",
      confirmText: "Xóa",
      cancelText: "Hủy",
    });

    if (!confirmed) return;

    try {
      const res = await adminAxios.delete(`/brand/${id}`);
      toast.success(res.data.message || "Xóa thương hiệu thành công!");
      fetchBrands(page);
    } catch (err) {
      console.error(err);
      toast.error("Lỗi khi xóa thương hiệu!");
    }
  };

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-500">Đang tải dữ liệu...</p>
    );
  }

  return (
    <section id="main-content">
      <section className="wrapper text-black">
        <h3 className="mb-6 text-3xl border-b font-bold">Thương hiệu</h3>

        {/* BỘ LỌC & TÌM KIẾM */}
        <form
          onSubmit={handleSearch}
          className="flex gap-3 mb-6 items-center justify-between"
        >
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Tìm kiếm thương hiệu..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border px-3 py-2 rounded w-64"
            />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border px-3 py-2 rounded"
            >
              <option value="">Tất cả trạng thái</option>
              <option value="1">Hiển thị</option>
              <option value="0">Ẩn</option>
            </select>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Tìm kiếm
            </button>
          </div>

          <a
            href="/admin/brand/add"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            + Thêm thương hiệu
          </a>
        </form>

        {/* BẢNG DANH MỤC */}
        <div className="overflow-x-auto">
          <h3 className="text-xl font-semibold mb-2">Danh sách danh mục:</h3>
          <table className="table-auto border-collapse border w-full text-center">
            <thead className="bg-gray-200">
              <tr>
                <th>STT</th>
                <th className="border p-2">Tên</th>
                <th className="border p-2">Slug</th>
                <th className="border p-2">Logo</th>
                <th className="border p-2">Quốc gia</th>
                <th className="border p-2">Mô tả</th>
                <th className="border p-2">Trạng thái</th>
                <th className="border p-2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {brands.length > 0 ? (
                brands.map((brand, index) => (
                  <tr key={brand.id} className="border-t">
                    <td className="border p-2">
                      {(page - 1) * 10 + index + 1}
                    </td>
                    <td className="border p-2">{brand.name}</td>
                    <td className="border p-2">{brand.slug}</td>
                    <td className="border p-2">
                      {brand.logo ? (
                        <img
                          src={`http://localhost:8000/storage/${brand.logo}`}
                          alt={brand.name}
                          className="w-16 h-16 object-cover mx-auto"
                        />
                      ) : (
                        "Không có"
                      )}
                    </td>
                    <td className="border p-2">{brand.country}</td>
                    <td className="border p-2">
                      {brand.description ?? "Không có"}
                    </td>
                    <td className="border p-2">
                      {Number(brand.status) === 1 ? (
                        <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm">
                          Hiển thị
                        </span>
                      ) : (
                        <span className="bg-red-600 text-white px-2 py-1 rounded text-sm">
                          Ẩn
                        </span>
                      )}
                    </td>
                    <td className="space-x-3">
                      <a
                        href={`/admin/brand/${brand.id}/edit`}
                        className="text-blue-600 hover:underline"
                      >
                        <i className="fa fa-pencil"></i>
                      </a>
                      <button
                        onClick={() => handleDelete(brand.id)}
                        className="text-red-600 hover:underline"
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-gray-500 py-4">
                    Không có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PHÂN TRANG */}
        <div className="flex justify-center mt-4 gap-3">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-lg font-semibold">
            {page} / {lastPage}
          </span>
          <button
            disabled={page === lastPage}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </section>
    </section>
  );
}
