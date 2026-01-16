"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { notify, confirmDialog } from "../../../utils/notify";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    // TÌM KIẾM
    const [searchText, setSearchText] = useState("");
    const [search, setSearch] = useState("");

    // LỌC
    const [filterCategory, setFilterCategory] = useState("");
    const [filterBrand, setFilterBrand] = useState("");
    const [filterStatus, setFilterStatus] = useState("");

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:8000/api/product`, {
                params: {
                    page,
                    search,
                    category_id: filterCategory,
                    status: filterStatus,
                },
            })
            .then((res) => {
                setProducts(res.data.data);
                setLastPage(res.data.last_page);
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, [page, search, filterCategory, filterStatus]);
    //Lấy danh mục
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/category")
            .then((res) => setCategories(res.data.data || res.data))
            .catch((err) => console.error(err));
    }, []);

    //Lấy thương hiệu
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/brand")
            .then((res) => setBrands(res.data.data || res.data))
            .catch((err) => console.error(err));
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1);
        setSearch(searchText);
    };

    const handleDelete = async (id) => {
        const confirmed = await confirmDialog({
            title: "Xác nhận xóa sản phẩm",
            text: "Bạn có chắc chắn muốn xóa sản phẩm này?",
            confirmText: "Xóa",
            cancelText: "Hủy",
        });

        if (!confirmed) return;

        try {
            const res = await axios.delete(`http://localhost:8000/api/product/${id}`);

            notify.success(res.data?.message || "Xóa sản phẩm thành công!");
            // load lại danh sách
            setProducts((prev) => prev.filter((p) => p.id !== id));
        } catch (error) {
            console.error("Lỗi khi xóa sản phẩm:", error.response?.data || error);
            notify.error(
                error.response?.data?.message || "Không thể xóa sản phẩm!"
            );
        }
    };


    if (loading) return <p>Đang tải sản phẩm...</p>;

    return (
        <div className="p-6 text-black min-h-screen flex flex-col">
            <h3 className="text-black mb-6 text-3xl border-b font-bold">
                {/* <i className="fa fa-angle-right"></i>  */}
                Sản phẩm
            </h3>

            {/* THANH TÌM KIẾM */}
            <form onSubmit={handleSearch} className="mb-4 flex gap-2">
                <input
                    type="text"
                    placeholder="Nhập tên sản phẩm..."
                    className="border px-3 py-2 flex-1 rounded-xl"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Tìm kiếm
                </button>
            </form>

            {/* BỘ LỌC */}
            <div className="flex gap-4 mb-4">

                {/* LỌC THEO DANH MỤC */}
                <select
                    className="border px-3 py-2 rounded"
                    value={filterCategory}
                    onChange={(e) => {
                        setPage(1);
                        setFilterCategory(e.target.value);
                    }}
                >
                    <option value="">-- Tất cả danh mục --</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>

                {/* LỌC THEO THƯƠNG HIỆU */}
                <select
                    className="border px-3 py-2 rounded"
                    value={filterBrand}
                    onChange={(e) => {
                        setPage(1);
                        setFilterBrand(e.target.value);
                    }}
                >
                    <option value="">-- Tất cả thương hiệu --</option>
                    {brands.map((brand) => (
                        <option key={brand.id} value={brand.id}>
                            {brand.name}
                        </option>
                    ))}
                </select>

                {/* LỌC THEO TRẠNG THÁI */}
                <select
                    className="border px-3 py-2 rounded"
                    value={filterStatus}
                    onChange={(e) => {
                        setPage(1);
                        setFilterStatus(e.target.value);
                    }}
                >
                    <option value="">-- Tất cả trạng thái --</option>
                    <option value="1">Hiển thị</option>
                    <option value="0">Ẩn</option>
                </select>
                <a
                    href="product/add"
                    className=" border bg-blue-500 text-white py-2 px-1 rounded"
                >
                    Thêm sản phẩm
                </a>
            </div>
            {/* BẢNG SẢN PHẨM */}
            <table className="table-auto border-collapse border border-gray-300 w-full">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">STT</th>
                        <th className="border p-2">Hình</th>
                        <th className="border p-2">Tên</th>
                        <th className="border p-2">Danh mục</th>
                        <th className="border p-2">Thương hiệu</th>
                        <th className="border p-2">Giá</th>
                        <th className="border p-2">Kho</th>
                        <th className="border p-2">Khuyến mãi</th>
                        <th className="border p-2 w-28">Trạng thái</th>
                        <th className="border p-2 w-28">Hoạt động</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map((p, index) => (
                            <tr key={p.id} className="text-center">
                                <td className="border p-2">{(page - 1) * 10 + index + 1}</td>
                                <td className="border p-2">
                                    {p.thumbnail ? (
                                        <img
                                            src={`http://localhost:8000/storage/${p.thumbnail}`}
                                            alt={p.name}
                                            className="w-16 h-16 object-cover mx-auto"
                                        />
                                    ) : (
                                        "No Image"
                                    )}
                                </td>
                                <td className="border p-2">{p.name}</td>
                                <td className="border p-2">{p.category.name}</td>
                                <td className="border p-2">{p.brand?.name}</td>
                                <td className="border p-2">
                                    {Number(p.price_buy).toLocaleString("vi-VN")}đ
                                </td>
                                <td className="border p-2">{p.store?.total_qty ?? 0}</td>
                                <td className="border p-2">
                                    {p.sale ? (
                                        <span className="px-2 py-1 rounded">
                                            {p.sale.price_sale.toLocaleString("vi-VN")}đ
                                        </span>
                                    ) : (
                                        "-"
                                    )}
                                </td>
                                <td className="border p-2">
                                    {p.status === 1 ? (
                                        <span className="bg-blue-500 text-white px-2 py-1 rounded">
                                            Hiển thị
                                        </span>
                                    ) : (
                                        <span className="bg-red-500 text-white px-2 py-1 rounded">
                                            Ẩn
                                        </span>
                                    )}
                                </td>
                                <td className="border p-2 space-x-4">
                                    <a href={`/admin/product/${p.id}`} className="text-green-500">
                                        <i className="fa-solid fa-eye"></i>
                                    </a>
                                    <a href={`/admin/product/${p.id}/edit`} className="text-blue-600">
                                        <i className="fa fa-pencil"></i>
                                    </a>
                                    <button
                                        className="text-red-600 cursor-pointer"
                                        onClick={() => handleDelete(p.id)}
                                    >
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={9} className="p-4 text-gray-500">
                                Không có sản phẩm nào
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* PHÂN TRANG */}
            <div className="flex justify-center items-center mt-4 gap-2">
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
        </div>
    );
}
