"use client";

import Navbar from "../_components/Navbar";
import { useEffect, useState } from "react";
import { notify, confirmDialog } from "../../utils/notify";

export default function Header() {
  const [user, setUser] = useState(null);
  const [keyword, setKeyword] = useState("");

  // Lấy thông tin user từ localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log("Saved user:", storedUser);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = async () => {
    const ok = await confirmDialog({
      title: "Đăng xuất?",
      text: "Bạn có chắc muốn đăng xuất không?",
      confirmText: "Đăng xuất",
    });

    if (!ok) return;

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("cart");
    setUser(null);

    notify.success("Đã đăng xuất thành công");
    window.location.href = "/";
  };
  return (
    <header className="section-header">
      <section className="header-main border-bottom">
        <div className="container">
          <div className="row align-items-center">
            {/* Logo */}
            <div className="col-xl-2 col-lg-3 col-md-12">
              <a href="/" className="brand-wrap">
                <img className="logo" src="/images/logo.png" alt="Logo" />
              </a>
            </div>

            {/* Search */}
            <div className="col-xl-6 col-lg-5 col-md-6">
              <form
                className="search-header"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!keyword.trim()) return;
                  window.location.href = `/search?q=${encodeURIComponent(
                    keyword,
                  )}`;
                }}
              >
                <div className="input-group w-100">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                  <div className="input-group-append">
                    <button className="btn btn-primary" type="submit">
                      <i className="fa fa-search"></i> Search
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* User + Cart + Message */}
            <div className="col-xl-4 col-lg-4 col-md-6">
              <div className="widgets-wrap float-md-right">
                {/*User Section */}
                <div className="widget-header mr-3 nav-item dropdown">
                  <a
                    href="#"
                    className="widget-view btn btn-link nav-link"
                    data-toggle="dropdown"
                  >
                    <span className="icon-area">
                      <i className="fa fa-user"></i>
                    </span>
                    <small className="text dropdown-toggle">
                      {user ? user.username : "Guest"}
                    </small>
                  </a>

                  <div className="dropdown-menu dropdown-menu-right">
                    {user ? (
                      <>
                        <a href="/profile" className="dropdown-item">
                          Thông tin cá nhân
                        </a>
                        <button
                          className="dropdown-item"
                          onClick={handleLogout}
                        >
                          Đăng xuất
                        </button>
                      </>
                    ) : (
                      <>
                        <a href="/login" className="dropdown-item">
                          Đăng nhập
                        </a>
                        <a href="/register" className="dropdown-item">
                          Đăng ký
                        </a>
                      </>
                    )}
                  </div>
                </div>

                {/* Message */}
                {/* <div className="widget-header mr-3">
                  <a href="#" className="widget-view">
                    <span className="icon-area">
                      <i className="fa fa-comment-dots"></i>
                      <span className="notify">1</span>
                    </span>
                    <small className="text"> Message </small>
                  </a>
                </div> */}

                {/* Orders */}
                {/* <div className="widget-header mr-3">
                  <a href="/order" className="widget-view">
                    <span className="icon-area">
                      <i className="fa fa-store"></i>
                    </span>
                    <small className="text"> Orders </small>
                  </a>
                </div> */}

                {/* Cart */}
                <div className="widget-header">
                  <a href="/cart" className="widget-view">
                    <span className="icon-area">
                      <i className="fa fa-shopping-cart"></i>
                    </span>
                    <small className="text"> Cart </small>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Navbar />
    </header>
  );
}
