"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CategoryList() {
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(false);

    // Fetch categories (dùng page hiện tại)
    const fetchCategories = async () => {
        setLoading(true);
        try {
            const res = await axios.get("http://localhost:8000/api/category", {
                params: { search, status, page },
            });
            setCategories(res.data.data);
            setLastPage(res.data.last_page);
        } catch (err) {
            console.error("Lỗi tải danh mục:", err);
        } finally {
            setLoading(false);
        }
    };

    // 👇 Gọi lại khi page, search, hoặc status thay đổi
    useEffect(() => {
        fetchCategories();
    }, [page, status]);

    // Gọi khi bấm nút tìm kiếm
    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1); // Reset về trang đầu khi tìm
        fetchCategories();
    };

    // Xóa danh mục
    const handleDelete = async (id) => {
        if (!confirm("Bạn có chắc muốn xóa danh mục này không?")) return;

        try {
            const res = await axios.delete(`http://localhost:8000/api/category/${id}`);
            alert(res.data.message || "Xóa thành công!");
            fetchCategories(page);
        } catch (err) {
            console.error(err);
            alert("Lỗi khi xóa danh mục!");
        }
    };

    if (loading) {
        return <p className="text-center mt-10 text-gray-500">Đang tải dữ liệu...</p>;
    }

    return (
        <section id="main-content">
            <section className="wrapper text-black">
                <h3 className="mb-6 text-3xl border-b font-bold">
                    Danh mục
                </h3>

                {/* BỘ LỌC & TÌM KIẾM */}
                <form
                    onSubmit={handleSearch}
                    className="flex gap-3 mb-6 items-center justify-between"
                >
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Tìm kiếm danh mục..."
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
                        href="/admin/category/add"
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        + Thêm danh mục
                    </a>
                </form>

                {/* BẢNG DANH MỤC */}
                <div className="overflow-x-auto">
                    <h3 className="text-xl font-semibold mb-2">Danh sách danh mục:</h3>
                    <table className="table-auto border-collapse border w-full text-center">
                        <thead className="bg-gray-200">
                            <tr>
                                <th>#</th>
                                <th className="border p-2">ID</th>
                                <th className="border p-2">Tên</th>
                                <th className="border p-2">Slug</th>
                                <th className="border p-2">Ảnh</th>
                                <th className="border p-2">Danh mục cha</th>
                                <th className="border p-2">Vị trí</th>
                                <th className="border p-2">Mô tả</th>
                                <th className="border p-2">Trạng thái</th>
                                <th className="border p-2">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.length > 0 ? (
                                categories.map((cat, index) => (
                                    <tr key={cat.id} className="border-t">
                                        <td className="border p-2">{(page - 1) * 10 + index + 1}</td>
                                        <td className="border p-2">{cat.id}</td>
                                        <td className="border p-2">{cat.name}</td>
                                        <td className="border p-2">{cat.slug}</td>
                                        <td className="border p-2">
                                            {cat.image ? (
                                                <img
                                                    src={`http://localhost:8000/storage/${cat.image}`}
                                                    alt={cat.name}
                                                    className="w-16 h-16 object-cover mx-auto"
                                                />
                                            ) : (
                                                "Không có"
                                            )}
                                        </td>
                                        <td className="border p-2">{cat.parent_id ?? "Không có"}</td>
                                        <td className="border p-2">{cat.sort_order ?? "Không có"}</td>
                                        <td className="border p-2">{cat.description ?? "Không có"}</td>
                                        <td className="border p-2">
                                            {Number(cat.status) === 1 ? (
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
                                                href={`/admin/category/${cat.id}/edit`}
                                                className="text-blue-600 hover:underline"
                                            >
                                                <i className="fa fa-pencil"></i>
                                            </a>
                                            <button
                                                onClick={() => handleDelete(cat.id)}
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
