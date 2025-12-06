"use client"
import { useEffect, useState } from "react";
import axios from "axios";

export default function OrderList() {
    const [orders, setOrders] = useState([]);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const res = await axios.get("http://localhost:8000/api/order", {
                params: { search, status, page },
            });
            setOrders(res.data.data);
            setLastPage(res.data.last_page);
        } catch (err) {
            console.error("Lỗi tải đơn hàng:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [page, search, status]);

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1); // Reset về trang đầu khi tìm
        fetchOrders();
    };

    const handleStatusChange = async (id, status) => {
        try {
            const res = await fetch(`http://localhost:8000/api/order/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });
            if (!res.ok) throw new Error("Cập nhật thất bại");
            alert("Đã cập nhật trạng thái!");
            // Reload lại danh sách
            setOrders((prev) =>
                prev.map((order) =>
                    order.id === id ? { ...order, status } : order
                )
            );
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <section id="main-content">
            <section className="wrapper">
                <h3 className="text-black mb-6 text-3xl border-b font-bold">
                    Đơn hàng
                </h3>
                <form
                    onSubmit={handleSearch}
                    className="flex gap-3 mb-6 items-center justify-between"
                >
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Tìm kiếm đơn hàng..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border px-3 py-2 rounded w-64 text-black"
                        />
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="border px-3 py-2 rounded text-black"
                        >
                            <option value="">Tất cả trạng thái</option>
                            <option value="1">Đã đặt</option>
                            <option value="2">Đang giao</option>
                            <option value="3">Đã Giao</option>
                            <option value="0">Đã hủy</option>
                        </select>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Tìm kiếm
                        </button>
                    </div>
                </form>
                <div className="row mt">
                    <div className="col-md-12 mt">
                        <div className="content-panel">
                            <div className="flex justify-between mb-2">
                                <h4 className="text-black mb-4 text-2xl">
                                    Danh sách đơn hàng
                                </h4>
                                {/* <a href="/admin/category/add" className="bg-blue-600 text-white pl-4 pr-4 pt-3">
                                    Thêm đơn hàng
                                </a> */}
                            </div>

                            <table className="table-auto border-collapse border border-gray-400 w-full table-default">
                                <thead>
                                    <tr>
                                        {/* <th className="border p-2">#</th> */}
                                        <th className="border p-2">ID</th>
                                        <th className="border p-2">Tên</th>
                                        {/* <th className="border p-2">Email</th> */}
                                        <th className="border p-2">Điện thoại</th>
                                        <th className="border p-2">Địa chỉ</th>
                                        <th className="border p-2">Ghi chú</th>
                                        <th className="w-35">Trạng thái</th>
                                        <th className="w-25">Hoạt động</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    {orders.length > 0 ? (
                                        orders.map((order, index) => (
                                            <tr key={order.id}>
                                                {/* <td className="border p-2">{index + 1}</td> */}
                                                <td className="border p-2">{order.id}</td>
                                                <td className="border p-2">{order.name}</td>
                                                {/* <td className="border p-2">{order.email}</td> */}
                                                <td className="border p-2">
                                                    {order.phone}
                                                </td>
                                                <td className="border p-2">{order.address}</td>
                                                <td className="border p-2">{order.note ?? "-"}</td>
                                                <td>
                                                    <select
                                                        value={order.status}
                                                        onChange={(e) =>
                                                            handleStatusChange(order.id, Number(e.target.value))
                                                        }
                                                        className="border rounded p-1"
                                                    >
                                                        <option value={0}>Đã đặt</option>
                                                        <option value={1}>Đang giao</option>
                                                        <option value={2}>Đã giao</option>
                                                    </select>
                                                </td>

                                                <td className="space-x-1">
                                                    <a href={`/admin/order/${order.id}/show`} className="text-green-500">
                                                        <i className="fa-solid fa-eye"></i>
                                                    </a>
                                                    {/* <a href={`/admin/order/edit/${order.id}`} className="text-blue-600">
                                                        <i className="fa fa-pencil"></i>
                                                    </a>
                                                    <button className="text-red-600">
                                                        <i className="fa fa-trash"></i>
                                                    </button> */}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="10">Không có dữ liệu</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {/* PHÂN TRANG */}
                <div className="flex justify-center mt-4 gap-3 text-black">
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
