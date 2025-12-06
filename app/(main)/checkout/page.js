"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    payment_method: "cod",
    note: "",
  });

  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Lấy giỏ hàng từ localStorage
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);

    // Lấy user đăng nhập
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
      setForm((prev) => ({
        ...prev,
        name: savedUser.name,
        phone: savedUser.phone || "",
        email: savedUser.email || "",
      }));
    }

    // Tính tổng tiền
    const totalAmount = savedCart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(totalAmount);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert("Giỏ hàng của bạn đang trống!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/api/order", {
        user_id: user?.id,
        email: user?.email,
        cart_items: cart,
        ...form,
        total_price: total,
      });

      if (res.data.status) {
        alert("Đặt hàng thành công! Vui lòng kiểm tra email xác nhận.");
        localStorage.removeItem("cart");
        window.location.href = "/";
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi khi gửi đơn hàng!");
    }
  };

  return (
    <section className="section-content padding-y bg">
      <div className="container">
        <h4 className="mb-4">Thanh toán</h4>

        <div className="row">
          {/* GIỎ HÀNG */}
          <aside className="col-md-6">
            <div className="card mb-4">
              <div className="card-header">Giỏ hàng của bạn</div>
              <div className="card-body">
                {cart.length > 0 ? (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="d-flex justify-content-between border-bottom py-2"
                    >
                      <div>
                        <strong>{item.name}</strong> <br />
                        <small>
                          {item.quantity} x{" "}
                          {Number(item.price).toLocaleString()} đ
                        </small>
                      </div>
                      <span>
                        {(item.price * item.quantity).toLocaleString()} đ
                      </span>
                    </div>
                  ))
                ) : (
                  <p>Giỏ hàng trống.</p>
                )}
              </div>
              <div className="card-footer text-right">
                <strong>Tổng cộng: {total.toLocaleString()} đ</strong>
              </div>
            </div>
          </aside>

          {/* THÔNG TIN THANH TOÁN */}
          <main className="col-md-6">
            <form onSubmit={handleCheckout}>
              <div className="card">
                <div className="card-header">Thông tin người nhận</div>
                <div className="card-body">
                  <div className="form-group">
                    <label>Họ tên</label>
                    <input
                      name="name"
                      className="form-control"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Địa chỉ nhận hàng</label>
                    <input
                      name="address"
                      className="form-control"
                      value={form.address}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Số điện thoại</label>
                    <input
                      name="phone"
                      className="form-control"
                      value={form.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      name="email"
                      className="form-control"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Ghi chú</label>
                    <textarea
                      name="note"
                      className="form-control"
                      value={form.note}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Hình thức thanh toán</label>
                    <select
                      name="payment_method"
                      className="form-control"
                      value={form.payment_method}
                      onChange={handleChange}
                    >
                      <option value="cod">Thanh toán khi nhận hàng (COD)</option>
                      <option value="bank">Chuyển khoản ngân hàng</option>
                    </select>
                  </div>
                </div>
                <div className="card-footer text-right">
                  <button className="btn btn-primary">Thanh toán</button>
                </div>
              </div>
            </form>
          </main>
        </div>
      </div>
    </section>
  );
}
