"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
  });
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setErrors({});

    try {
      const res = await axios.post("http://localhost:8000/api/register", formData);
      setMessage(res.data.message);

      // ✅ Nếu thành công → chuyển qua trang đăng nhập
      setTimeout(() => router.push("/login"), 2000);
    } catch (err) {
      if (err.response && err.response.status === 422) {
        setErrors(err.response.data.errors);
      } else {
        setMessage(err.response?.data?.message || "Đăng ký thất bại!");
      }
    }
  };

  return (
    <section className="section-content padding-y">
      <div className="card mx-auto" style={{ maxWidth: "520px", marginTop: "40px" }}>
        <article className="card-body">
          <header className="mb-4"><h4 className="card-title">Đăng ký</h4></header>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Họ và tên</label>
              <input name="name" type="text" className="form-control" value={formData.name} onChange={handleChange}/>
              {errors.name && <small className="text-danger">{errors.name[0]}</small>}
            </div>

            <div className="form-group">
              <label>Tên tài khoản</label>
              <input name="username" type="text" className="form-control" value={formData.username} onChange={handleChange}/>
              {errors.username && <small className="text-danger">{errors.username[0]}</small>}
            </div>

            <div className="form-group">
              <label>Email</label>
              <input name="email" type="email" className="form-control" value={formData.email} onChange={handleChange}/>
              {errors.email && <small className="text-danger">{errors.email[0]}</small>}
            </div>

            <div className="form-group">
              <label>Số điện thoại</label>
              <input name="phone" type="text" className="form-control" value={formData.phone} onChange={handleChange}/>
              {errors.phone && <small className="text-danger">{errors.phone[0]}</small>}
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Mật khẩu</label>
                <input name="password" type="password" className="form-control" value={formData.password} onChange={handleChange}/>
                {errors.password && <small className="text-danger">{errors.password[0]}</small>}
              </div>
              <div className="form-group col-md-6">
                <label>Nhập lại mật khẩu</label>
                <input name="password_confirmation" type="password" className="form-control" value={formData.password_confirmation} onChange={handleChange}/>
              </div>
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block"> Register </button>
            </div>
          </form>

          {message && <p className="text-center mt-3 text-success">{message}</p>}
        </article>
      </div>

      <p className="text-center mt-4">Bạn đã có tài khoản? <a href="/login">Đăng nhập</a></p>
    </section>
  );
}
