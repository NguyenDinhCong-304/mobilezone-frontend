"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { notify } from "../../utils/notify";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    content: "",
  });

  const [errors, setErrors] = useState({});

  // Tự động lấy thông tin user từ localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setForm((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        user_id: user.id || null,
      }));
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      const res = await axios.post("http://localhost:8000/api/contact", form);

      notify.success(res.data.message || "Gửi liên hệ thành công!");
      setForm((prev) => ({
        ...prev,
        content: "",
      }));
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
        notify.warning("Vui lòng kiểm tra lại dữ liệu!");
      } else {
        notify.error("Đã xảy ra lỗi. Vui lòng thử lại.");
      }
    }
  };


  return (
    <div>
      {/* Breadcrumb */}
      <section className="py-3 bg-light">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/">Trang chủ</a></li>
            <li className="breadcrumb-item active" aria-current="page">Liên hệ</li>
          </ol>
        </div>
      </section>

      {/* Contact Section */}
      <div className="container pb-4 pt-4">
        <div className="row g-4">
          {/* Left Side: Contact Info & Form */}
          <div className="col-md-6">
            {/* Contact Info */}
            <div className="mb-4">
              <div className="row gy-3 mt-3">
                <div className="d-flex align-items-start gap-3 col-6">
                  <div className="border rounded-circle border-primary p-2">
                    <i className="fa-solid fa-location-dot text-primary"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Địa chỉ</h6>
                    <p className="mb-0">70 Lữ Gia, Phường 15, Quận 11, TP. HCM</p>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3 col-6">
                  <div className="border rounded-circle border-primary p-2">
                    <i className="fa-solid fa-clock text-primary"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Thời gian làm việc</h6>
                    <p className="mb-0">8h - 22h</p>
                    <p className="mb-0">Thứ 2 - Chủ nhật</p>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3 col-6">
                  <div className="border rounded-circle border-primary p-2">
                    <i className="fa-solid fa-phone-volume text-primary"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Hotline</h6>
                    <p className="mb-0">1900 6750</p>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3 col-6">
                  <div className="border rounded-circle border-primary p-2">
                    <i className="fa-solid fa-envelope text-primary"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Email</h6>
                    <p className="mb-0">support@sapo.vn</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="border p-3 rounded shadow-sm">
              <h4 className="fw-bold mb-3">Liên hệ với chúng tôi</h4>
              <p className="mb-3">Nếu bạn có thắc mắc gì, hãy gửi yêu cầu, chúng tôi sẽ phản hồi sớm nhất.</p>

              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label>Họ tên *</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={form.name}
                    onChange={handleChange}
                  />
                  {errors.name && <small className="text-danger">{errors.name[0]}</small>}
                </div>

                <div className="form-group mb-3">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={form.email}
                    onChange={handleChange}
                  />
                  {errors.email && <small className="text-danger">{errors.email[0]}</small>}
                </div>

                <div className="form-group mb-3">
                  <label>Số điện thoại</label>
                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    value={form.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && <small className="text-danger">{errors.phone[0]}</small>}
                </div>

                <div className="form-group mb-3">
                  <label>Nội dung *</label>
                  <textarea
                    name="content"
                    rows="5"
                    className="form-control"
                    value={form.content}
                    onChange={handleChange}
                  ></textarea>
                  {errors.content && <small className="text-danger">{errors.content[0]}</small>}
                </div>

                <button type="submit" className="btn btn-primary">
                  Gửi liên hệ
                </button>
              </form>
            </div>
          </div>

          {/* Right Side: Google Map */}
          <div className="col-md-6 mt-4">
            <div className="ratio ratio-16x9">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.518170261775!2d106.65068857485672!3d10.77156858937688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ec07488c543%3A0x7dc9617e924ddb50!2zNzAgxJAuIEzhu68gR2lhLCBQaMaw4budbmcgMTUsIFF14bqtbiAxMSwgSOG7kyBDaMOtIE1pbmggNzAwMDAwLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1732541520743!5m2!1svi!2s"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ width: "100%", height: "600px", border: 0 }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
