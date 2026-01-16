"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {notify, confirmDialog} from "../../utils/notify"

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const router = useRouter();

  // Lấy giỏ hàng từ localStorage khi mở trang
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Tính tổng tiền mỗi khi giỏ hàng thay đổi
  useEffect(() => {
    const newTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(newTotal);
  }, [cart]);

  // Cập nhật số lượng
  const updateQuantity = (id, newQty) => {
    const updated = cart.map((item) =>
      item.id === id ? { ...item, quantity: parseInt(newQty) } : item
    );
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // Xóa sản phẩm
  const removeItem = async (id) => {
    const confirmed = await confirmDialog({
    title: "Xóa sản phẩm?",
    text: "Sản phẩm sẽ bị xóa khỏi giỏ hàng",
    confirmText: "Xóa",
    cancelText: "Hủy",
  });

  if (!confirmed) return;

  const updated = cart.filter((item) => item.id !== id);
  setCart(updated);
  localStorage.setItem("cart", JSON.stringify(updated));

  notify.success("Đã xóa sản phẩm khỏi giỏ hàng");
  };

  // Thanh toán
  const handleCheckout = () => {
    const user = localStorage.getItem("user");
    if (!user) {
      notify.warning("Vui lòng đăng nhập để tiếp tục thanh toán.");
      router.push("/login");
    } else {
      router.push("/checkout");
    }
  };

  // Nếu giỏ hàng trống
  if (cart.length === 0) {
    return (
      <section className="section-content padding-y">
        <div className="container text-center py-5">
          <h4>Chưa chọn mua sản phẩm nào</h4>
          <a href="/" className="btn btn-primary mt-3">
            Tiếp tục mua sắm
          </a>
        </div>
      </section>
    );
  }
  return (
    <>
      <section className="section-content padding-y">
        <div className="container">
          <div className="row">
            <main className="col-md-9">
              <div className="card">
                <table className="table table-borderless table-shopping-cart">
                  <thead className="text-muted">
                    <tr className="small text-uppercase">
                      <th scope="col">Sản phẩm</th>
                      <th scope="col" width="120">
                        Số lượng
                      </th>
                      <th scope="col" width="120">
                        Giá
                      </th>
                      <th scope="col" className="text-right" width="200">
                        Hành động
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <figure className="itemside">
                            <div className="aside">
                              <img
                                src={item.image || "/images/items/1.jpg"}
                                className="img-sm"
                                alt={item.name}
                              />
                            </div>
                            <figcaption className="info">
                              <a href="#" className="title text-dark">
                                {item.name}
                              </a>
                            </figcaption>
                          </figure>
                        </td>
                        <td>
                          <div className="flex items-center justify-center space-x-2">
                            <button
                              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              −
                            </button>

                            <span className="min-w-[32px] text-center">{item.quantity}</span>

                            <button
                              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td>
                          <div className="price-wrap">
                            <var className="price">
                              {Number(item.price).toLocaleString("vi-VN")}₫
                            </var>
                            <small className="text-muted">
                              {" "}
                              {(
                                item.price * item.quantity
                              ).toLocaleString("vi-VN")}
                              ₫
                            </small>
                          </div>
                        </td>
                        <td className="text-right">
                          <button
                            className="btn btn-light"
                            onClick={() => removeItem(item.id)}
                          >
                            Xóa
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="card-body border-top">
                  <button
                    onClick={handleCheckout}
                    className="btn btn-primary float-md-right"
                  >
                    Thanh toán <i className="fa fa-chevron-right"></i>
                  </button>
                  <a href="/" className="btn btn-light">
                    <i className="fa fa-chevron-left"></i> Tiếp tục mua sắm
                  </a>
                </div>
              </div>

              <div className="alert alert-success mt-3">
                <p className="icontext">
                  <i className="icon text-success fa fa-truck"></i> Giao hàng
                  miễn phí trong 1–2 tuần
                </p>
              </div>
            </main>

            <aside className="col-md-3">
              <div className="card">
                <div className="card-body">
                  <dl className="dlist-align">
                    <dt>Tổng tiền:</dt>
                    <dd className="text-right h5">
                      <strong>{total.toLocaleString("vi-VN")}₫</strong>
                    </dd>
                  </dl>
                  <hr />
                  <p className="text-center mb-3">
                    <img src="/images/misc/payments.png" height="26" />
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
