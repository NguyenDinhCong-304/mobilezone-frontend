"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { notify } from "@/app/utils/notify";
import UpdateProfile from "../../_components/UpdateProfile";
import ChangePassword from "../../_components/ChangePassword";
import MyOrders from "../../_components/MyOrders";
import { confirmDialog } from "@/app/utils/notify";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
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
      notify.warning("Vui lòng đăng nhập để xem thông tin tài khoản!");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1200);
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
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get(
        `http://localhost:8000/api/orders/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(res.data.data);
      setOrders(res.data.data);
    } catch (err) {
      notify.error("Không thể tải danh sách đơn hàng!");
    }
  };

  // Cập nhật thông tin cá nhân
  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const form = new FormData();
    form.append("_method", "PUT"); // 🔑 QUAN TRỌNG
    form.append("name", formData.name);
    form.append("phone", formData.phone);
    form.append("email", formData.email);

    if (avatar) {
      form.append("avatar", avatar);
    }

    try {
      const res = await axios.post(
        `http://localhost:8000/api/user/${user.id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      notify.success(res.data.message || "Cập nhật thông tin thành công!");

      const oldUser = JSON.parse(localStorage.getItem("user")) || {};
      const mergedUser = { ...oldUser, ...(res.data.user || {}) };

      localStorage.setItem("user", JSON.stringify(mergedUser));
      setUser(mergedUser);
    } catch (err) {
      console.error(err.response?.data);
      notify.error("Lỗi khi cập nhật thông tin!");
    }
  };

  // Đổi mật khẩu
  const handleChangePassword = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      notify.error("Bạn chưa đăng nhập!");
      return;
    }
    try {
      const res = await axios.post(
        `http://localhost:8000/api/user/change-password/${user.id}`,
        passwordData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      notify.success(res.data.message || "Đổi mật khẩu thành công!");
      setPasswordData({
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
      });
      setActiveTab("overview");
    } catch (err) {
      if (err.response?.data?.message) {
        notify.error(err.response.data.message);
      } else {
        notify.error("Đổi mật khẩu thất bại!");
      }
    }
  };

  // Hủy đơn hàng
  const handleCancelOrder = async (orderId) => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      notify.error("Bạn chưa đăng nhập!");
      return;
    }
    const confirmed = await confirmDialog({
      title: "Xác nhận hủy đơn",
      text: "Bạn có chắc chắn muốn hủy đơn hàng này không?",
      icon: "warning",
    });

    if (!confirmed) return;

    try {
      await axios.put(
        `http://localhost:8000/api/orders/${orderId}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      notify.success("Đã hủy đơn hàng thành công!");
      fetchOrders(user.id);
    } catch (err) {
      notify.error("Không thể hủy đơn hàng!");
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
                <button
                  className={`list-group-item ${activeTab === "overview" ? "active" : ""}`}
                  onClick={() => setActiveTab("overview")}
                >
                  Tổng quan
                </button>
                <button
                  className={`list-group-item ${activeTab === "profile" ? "active" : ""}`}
                  onClick={() => setActiveTab("profile")}
                >
                  Cập nhật thông tin
                </button>
                <button
                  className={`list-group-item ${activeTab === "password" ? "active" : ""}`}
                  onClick={() => setActiveTab("password")}
                >
                  Đổi mật khẩu
                </button>
                <button
                  className={`list-group-item ${activeTab === "orders" ? "active" : ""}`}
                  onClick={() => setActiveTab("orders")}
                >
                  Đơn hàng
                </button>

                <button
                  className="list-group-item text-danger"
                  onClick={() => {
                    localStorage.removeItem("user");
                    window.location.href = "/login";
                  }}
                >
                  Đăng xuất
                </button>
              </nav>
            </aside>

            {/* Main content */}
            <main className="col-md-9">
              {activeTab === "overview" && (
                <div className="card p-4">
                  <div className="d-flex align-items-center gap-4">
                    {/* Avatar */}
                    <img
                      src={
                        user.avatar
                          ? `http://localhost:8000/${user.avatar}`
                          : "/images/default-avatar.png"
                      }
                      className="rounded-circle border"
                      width="120"
                      height="120"
                      alt="Avatar"
                    />

                    {/* Thông tin */}
                    <div>
                      <h4 className="mb-1">{user.name}</h4>
                      <p className="mb-1 text-muted">
                        <i className="fa fa-envelope me-2"></i>
                        {user.email}
                      </p>
                      <p className="mb-0 text-muted">
                        <i className="fa fa-phone me-2"></i>
                        {user.phone || "Chưa cập nhật"}
                      </p>
                    </div>
                  </div>

                  <hr />

                  <div className="text-end">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => setActiveTab("profile")}
                    >
                      Cập nhật thông tin
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "profile" && (
                <UpdateProfile
                  user={user}
                  formData={formData}
                  setFormData={setFormData}
                  avatar={avatar}
                  setAvatar={setAvatar}
                  onSubmit={handleUpdateProfile}
                />
              )}

              {activeTab === "password" && (
                <ChangePassword
                  passwordData={passwordData}
                  setPasswordData={setPasswordData}
                  onSubmit={handleChangePassword}
                />
              )}

              {activeTab === "orders" && (
                <MyOrders orders={orders} onCancel={handleCancelOrder} />
              )}
            </main>
          </div>
        </div>
      </section>
    </>
  );
}
