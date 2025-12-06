"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [avatar, setAvatar] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });

  // Kiểm tra đăng nhập
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      alert("Vui lòng đăng nhập để xem thông tin tài khoản!");
      window.location.href = "/login";
      return;
    }

    setUser(storedUser);
    setFormData({
      name: storedUser.name,
      phone: storedUser.phone,
      email: storedUser.email,
    });

    fetchOrders(storedUser.id);
  }, []);

  // Lấy danh sách đơn hàng
  const fetchOrders = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:8000/api/orders/user/${userId}`);
      console.log(res.data.data);
      setOrders(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Cập nhật thông tin cá nhân
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", formData.name);
    form.append("phone", formData.phone);
    form.append("email", formData.email);
    if (avatar) {
      form.append("avatar", avatar); // nếu có ảnh mới
    }

    try {
      const res = await axios.put(`http://localhost:8000/api/user/${user.id}`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(res.data.message);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
    } catch (err) {
      alert("Lỗi khi cập nhật thông tin!");
    }
  };


  // ✅ Đổi mật khẩu
  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8000/api/user/change-password/${user.id}`, passwordData);
      alert(res.data.message);
      setPasswordData({ current_password: "", new_password: "", new_password_confirmation: "" });
    } catch (err) {
      alert("Đổi mật khẩu thất bại!");
    }
  };

  // Hủy đơn hàng
  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Bạn có chắc muốn hủy đơn hàng này?")) return;

    try {
      await axios.put(`http://localhost:8000/api/orders/${orderId}/cancel`);
      alert("Đã hủy đơn hàng thành công!");
      fetchOrders(user.id);
    } catch (err) {
      alert("Không thể hủy đơn hàng!");
    }
  };

  if (!user) return null;

  return (
    <>
      <section className="section-pagetop bg-gray">
        <div className="container">
          <h2 className="title-page">Thông tin tài khoản</h2>
        </div>
      </section>

      <section className="section-content padding-y">
        <div className="container">
          <div className="row">
            {/* Sidebar */}
            <aside className="col-md-3">
              <nav className="list-group">
                <a className="list-group-item active">Tổng quan</a>
                <a className="list-group-item">Cập nhật thông tin</a>
                <a className="list-group-item">Đổi mật khẩu</a>
                <a className="list-group-item">Đơn hàng của tôi</a>
                <a
                  className="list-group-item text-danger"
                  onClick={() => {
                    localStorage.removeItem("user");
                    window.location.href = "/login";
                  }}
                >
                  Đăng xuất
                </a>
              </nav>
            </aside>

            {/* Main content */}
            <main className="col-md-9">
              <article className="card mb-4">
                <div className="card-body text-center">
                  <img
                    src={`http://localhost:8000/${user.avatar}`}
                    className="rounded-circle img-sm border mb-2"
                    alt="avatar"
                    width="120"
                    height="120"
                  />
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setAvatar(e.target.files[0])}
                    />

                  </div>
                  <h4 className="mt-2">{user.name}</h4>
                  <p>{user.email}</p>
                </div>
              </article>

              {/* Form cập nhật thông tin */}
              <article className="card mb-4">
                <div className="card-body">
                  <h5 className="mb-3">Cập nhật thông tin cá nhân</h5>
                  <form onSubmit={handleUpdateProfile}>
                    <div className="form-group">
                      <label>Họ và tên</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Số điện thoại</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        className="form-control"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary mt-2">
                      Cập nhật
                    </button>
                  </form>
                </div>
              </article>

              {/* Form đổi mật khẩu */}
              <article className="card mb-4">
                <div className="card-body">
                  <h5 className="mb-3">Đổi mật khẩu</h5>
                  <form onSubmit={handleChangePassword}>
                    <div className="form-group">
                      <label>Mật khẩu hiện tại</label>
                      <input
                        type="password"
                        className="form-control"
                        value={passwordData.current_password}
                        onChange={(e) => setPasswordData({ ...passwordData, current_password: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Mật khẩu mới</label>
                      <input
                        type="password"
                        className="form-control"
                        value={passwordData.new_password}
                        onChange={(e) => setPasswordData({ ...passwordData, new_password: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Xác nhận mật khẩu mới</label>
                      <input
                        type="password"
                        className="form-control"
                        value={passwordData.new_password_confirmation}
                        onChange={(e) =>
                          setPasswordData({ ...passwordData, new_password_confirmation: e.target.value })
                        }
                      />
                    </div>
                    <button type="submit" className="btn btn-warning mt-2">
                      Đổi mật khẩu
                    </button>
                  </form>
                </div>
              </article>

              {/* Danh sách đơn hàng */}
              <article className="card">
                <div className="card-body">
                  <h5 className="mb-3">Đơn hàng của tôi</h5>
                  {orders.length === 0 ? (
                    <p>Chưa có đơn hàng nào.</p>
                  ) : (
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Mã đơn</th>
                          <th>Ngày đặt</th>
                          <th>Tổng tiền</th>
                          <th>Trạng thái</th>
                          <th>Thao tác</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{new Date(order.created_at).toLocaleString("vi-VN")}</td>
                            <td>{order.total.toLocaleString("vi-VN")}₫</td>
                            <td>{order.status}</td>
                            <td>
                              {order.status === "chưa xác thực" && (
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() => handleCancelOrder(order.id)}
                                >
                                  Hủy đơn
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </article>
            </main>
          </div>
        </div>
      </section>
    </>
  );
}
