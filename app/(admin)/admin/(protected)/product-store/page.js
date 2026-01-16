"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductStoreList() {
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    const [searchText, setSearchText] = useState("");
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("");

    useEffect(() => {
        setLoading(true);
        axios
            .get("http://localhost:8000/api/productstore", {
                params: {
                    page,
                    search,
                    status: filterStatus,
                },
            })
            .then((res) => {
                console.log("API DATA:", res.data);
                setStores(res.data.data);
                setLastPage(res.data.last_page);
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, [page, search, filterStatus]);

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1);
        setSearch(searchText);
    };

    const handleDelete = async (id) => {
        if (!confirm("Bạn có chắc muốn xóa bản ghi nhập kho này?")) return;

        try {
            await axios.delete(`http://localhost:8000/api/productstore/${id}`);
            alert("Xóa nhập kho thành công!");
            setStores(stores.filter((item) => item.id !== id));
        } catch (err) {
            console.error(err);
            alert(
                err.response?.data?.error ||
                "Đã xảy ra lỗi khi xóa bản ghi nhập kho!"
            );
        }
    };


    if (loading) return <p>Đang tải dữ liệu...</p>;

    return (
        <div className="p-6 text-black min-h-screen flex flex-col">
            <h3 className="text-black mb-6 text-3xl border-b font-bold">
                {/* <i className="fa fa-angle-right"></i>  */}
                Nhập kho
            </h3>

            {/* TÌM KIẾM */}
            <form onSubmit={handleSearch} className="mb-4 flex gap-2">
                <input
                    type="text"
                    placeholder="Tìm theo tên sản phẩm..."
                    className="border px-3 py-2 flex-1"
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

            {/* LỌC */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex gap-4 mb-4">
                    <select
                        className="border px-3 py-2"
                        value={filterStatus}
                        onChange={(e) => {
                            setPage(1);
                            setFilterStatus(e.target.value);
                        }}
                    >
                        <option value="">-- Tất cả trạng thái --</option>
                        <option value="1">Đã nhập</option>
                        <option value="0">Hủy</option>
                    </select>
                </div>
                <a href="product-store/add" className="bg-blue-500 cursor-pointer px-2 py-1 text-white">Nhập kho</a>
            </div>

            {/* BẢNG */}
            <table className="table-auto border-collapse border border-gray-300 w-full">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">ID</th>
                        <th className="border p-2">Sản phẩm</th>
                        <th className="border p-2">Ảnh</th>
                        <th className="border p-2">Giá nhập</th>
                        <th className="border p-2">Số lượng</th>
                        <th className="border p-2">Người nhập</th>
                        <th className="border p-2">Ngày nhập</th>
                        <th className="border p-2">Trạng thái</th>
                        <th className="border p-2">Hoạt động</th>
                    </tr>
                </thead>
                <tbody>
                    {stores.length > 0 ? (
                        stores.map((s) => (
                            <tr key={s.id} className="text-center">
                                <td className="border p-2">{s.id}</td>
                                <td className="border p-2">{s.product?.name}</td>
                                <td className="border p-2">
                                    {s.product?.thumbnail ? (
                                        <img
                                            src={`http://localhost:8000/storage/${s.product.thumbnail}`}
                                            alt={s.product.name}
                                            className="w-16 h-16 object-cover mx-auto"
                                        />
                                    ) : (
                                        "No Image"
                                    )}
                                </td>
                                <td className="border p-2">
                                    {s.price_root.toLocaleString("vi-VN")} đ
                                </td>
                                <td className="border p-2">{s.qty}</td>
                                <td className="border p-2">{s.created_by}</td>
                                <td className="border p-2">
                                    {new Date(s.created_at).toLocaleString("vi-VN")}
                                </td>
                                <td className="border p-2">
                                    {s.status === 1 ? (
                                        <span className="bg-green-500 text-white px-2 py-1 rounded">
                                            Đã nhập
                                        </span>
                                    ) : (
                                        <span className="bg-red-500 text-white px-2 py-1 rounded">
                                            Hủy
                                        </span>
                                    )}
                                </td>
                                <td className="border p-2 space-x-4">
                                    <a href={`/admin/product-store/${s.id}/edit`} className="text-blue-600">
                                        <i className="fa fa-pencil"></i>
                                    </a>
                                    <button 
                                        className="text-red-600 cursor-pointer" 
                                        onClick={() => handleDelete(s.id)}>
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={9} className="p-4 text-gray-500">
                                Không có dữ liệu
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
