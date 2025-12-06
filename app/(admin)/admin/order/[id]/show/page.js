"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function OrderDetail() {
    const { id } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8000/api/order/${id}`)
            .then((res) => res.json())
            .then((data) => setOrder(data.data))
            .catch((err) => console.error(err));
    }, [id]);

    if (!order) return <p className="text-black">Đang tải...</p>;

    return (
        <div className="text-black p-6">
            <h2 className="text-2xl font-bold mb-4">Chi tiết đơn hàng #{order.id}</h2>
            <p><strong>Khách hàng:</strong> {order.name}</p>
            <p><strong>Trạng thái:</strong>
                {order.status === 0 ? "Đã đặt" : order.status === 1 ? "Đang giao" : "Đã giao"}
            </p>
            <h3 className="text-xl font-semibold mt-4 mb-2">Sản phẩm:</h3>
            <table className="table-auto w-full border">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border">Tên sản phẩm</th>
                        <th className="border">Hình ảnh</th>
                        <th className="border">Số lượng</th>
                        <th className="border">Giá</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {(order?.details ?? []).map((item) => (
                        <tr key={item.id}>
                            <td className="border">{item.product?.name}</td>
                            <td className="border">
                                {item.product?.thumbnail ? (
                                    <img
                                        src={`http://localhost:8000/storage/${item.product.thumbnail}`}
                                        alt={item.product.name}
                                        className="w-16 h-16 object-cover mx-auto"
                                    />
                                ) : (
                                    "Không có ảnh"
                                )}
                            </td>
                            <td className="border">{item.qty}</td>
                            <td className="border">{item.price.toLocaleString("vi-VN")}₫</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
