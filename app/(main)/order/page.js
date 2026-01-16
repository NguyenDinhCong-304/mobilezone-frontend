"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function OrderHistory() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        notify.warning("Vui lòng đăng nhập để xem lịch sử đặt hàng!");
        router.push("/login");
        return;
      }

      const userData = JSON.parse(storedUser);

      if (!userData?.id) {
        notify.error("Thông tin đăng nhập không hợp lệ!");
        localStorage.removeItem("user");
        router.push("/login");
        return;
      }

      fetchOrders(userData.id);
    } catch (err) {
      console.error("Lỗi đọc user:", err);
      notify.error("Phiên đăng nhập đã hết hạn!");
      localStorage.removeItem("user");
      router.push("/login");
    }
  }, [router]);

  const fetchOrders = async (id) => {
    if (!id) return;

    try {
      const res = await axios.get(`http://localhost:8000/api/order/history/${id}`);
      setOrders(res.data);
    } catch (err) {
      console.error("Lỗi tải lịch sử:", err);
      notify.error("Không thể tải lịch sử đơn hàng!");
    }
  };

  if (orders.length === 0)
    return <div className="container py-5">Chưa có đơn hàng nào.</div>;

  return (
    <div className="container py-5">
      <h2 className="mb-4">🧾 Lịch sử đặt hàng</h2>

      {orders.map((order) => (
        <div key={order.id} className="card mb-3 shadow-sm">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5>Đơn hàng #{order.id}</h5>
              <span
                className={`badge ${order.status === "Đã hủy"
                  ? "bg-danger"
                  : order.status === "Đang giao"
                    ? "bg-info"
                    : "bg-success"
                  }`}
              >
                {order.status}
              </span>
            </div>
            <p>
              <strong>Ngày đặt:</strong>{" "}
              {new Date(order.created_at).toLocaleString("vi-VN")}
            </p>
            <p>
              <strong>Tổng tiền:</strong>{" "}
              {order.total?.toLocaleString("vi-VN")}₫
            </p>

            <div className="border-top pt-2 mt-2">
              <h6>Sản phẩm trong đơn:</h6>
              {order.order_items?.length === 0 && <p>Không có sản phẩm.</p>}
              <ul className="list-group">
                {order.order_items?.map((item) => (
                  <li
                    key={item.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <span>
                      {item.product?.name || "Sản phẩm đã xóa"} x{" "}
                      {item.quantity}
                    </span>
                    <span>
                      {(item.price * item.quantity).toLocaleString("vi-VN")}₫
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
