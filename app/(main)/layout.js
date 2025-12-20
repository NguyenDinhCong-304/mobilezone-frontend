"use client"; // Thêm dòng này ở đầu để cho phép dùng useState, useEffect

import "../globals.css";
import Script from "next/script";
import { useEffect, useState } from "react";
import Navbar from "./_components/Navbar";

// export const metadata = {
//   title: "Website title - bootstrap alistyle html template",
//   description: "Bootstrap e-commerce html template similar to Alibaba",
// };

export default function RootLayout({ children }) {
  const [user, setUser] = useState(null);

  // Lấy thông tin user từ localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log("Saved user:", storedUser);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    setUser(null);
    alert("Đã đăng xuất!");
    window.location.href = "/";
  };

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="pragma" content="no-cache" />
        <meta httpEquiv="cache-control" content="max-age=604800" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta
          name="keywords"
          content="Online template, shop, theme, template, html, css, bootstrap 4"
        />

        <link href="/css/bootstrap.css" rel="stylesheet" />
        <link href="/fonts/fontawesome/css/all.min.css" rel="stylesheet" />
        <link href="/css/ui.css" rel="stylesheet" />
        <link href="/css/responsive.css" rel="stylesheet" />
      </head>
      <body>
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
                  <form action="#" className="search-header">
                    <div className="input-group w-100">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
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
                    <div className="widget-header mr-3">
                      <a href="#" className="widget-view">
                        <span className="icon-area">
                          <i className="fa fa-comment-dots"></i>
                          <span className="notify">1</span>
                        </span>
                        <small className="text"> Message </small>
                      </a>
                    </div>

                    {/* Orders */}
                    <div className="widget-header mr-3">
                      <a href="/order" className="widget-view">
                        <span className="icon-area">
                          <i className="fa fa-store"></i>
                        </span>
                        <small className="text"> Orders </small>
                      </a>
                    </div>

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

          {/* Navbar */}
          {/* <nav className="navbar navbar-main navbar-expand pl-0 ml-38">
            <ul className="navbar-nav flex-wrap">
              <li className="nav-item">
                <a className="nav-link" href="/">Trang chủ</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#">Sản phẩm</a>
                <div className="dropdown-menu">
                  <ul className="w-60 m-2">
                    <li><a href="/product">Tất cả sản phẩm</a></li>
                    <li className="mt-2"><a href="#">Điện thoại</a></li>
                    <li className="mt-2"><a href="#">Máy tính bảng</a></li>
                    <li className="mt-2"><a href="#">Laptop</a></li>
                    <li className="mt-2"><a href="#">Đồng hồ</a></li>
                    <li className="mt-2"><a href="#">Phụ kiện</a></li>
                  </ul>
                </div>
              </li>
              <li className="nav-item"><a className="nav-link" href="/sales">Khuyến mãi</a></li>
              <li className="nav-item"><a className="nav-link" href="/post">Bài viết</a></li>
              <li className="nav-item"><a className="nav-link" href="/contact">Liên hệ</a></li>
            </ul>
          </nav> */}
          <Navbar />
        </header>

        {/* Nội dung trang */}
        {children}

        {/* Footer */}
        <footer className="section-footer bg-secondary">
          <div className="container">
            <section className="footer-top padding-y-lg text-white">
              <div className="row">
                <aside className="col-md col-6">
                  <h6 className="title">Brands</h6>
                  <ul className="list-unstyled">
                    <li><a href="#">Adidas</a></li>
                    <li><a href="#">Puma</a></li>
                    <li><a href="#">Reebok</a></li>
                    <li><a href="#">Nike</a></li>
                  </ul>
                </aside>
                <aside className="col-md col-6">
                  <h6 className="title">Company</h6>
                  <ul className="list-unstyled">
                    <li><a href="#">About us</a></li>
                    <li><a href="#">Career</a></li>
                    <li><a href="#">Find a store</a></li>
                    <li><a href="#">Rules and terms</a></li>
                    <li><a href="#">Sitemap</a></li>
                  </ul>
                </aside>
                <aside className="col-md col-6">
                  <h6 className="title">Help</h6>
                  <ul className="list-unstyled">
                    <li><a href="#">Contact us</a></li>
                    <li><a href="#">Money refund</a></li>
                    <li><a href="#">Order status</a></li>
                    <li><a href="#">Shipping info</a></li>
                    <li><a href="#">Open dispute</a></li>
                  </ul>
                </aside>
                <aside className="col-md col-6">
                  <h6 className="title">Account</h6>
                  <ul className="list-unstyled">
                    <li><a href="#">User Login</a></li>
                    <li><a href="#">User register</a></li>
                    <li><a href="#">Account Setting</a></li>
                    <li><a href="#">My Orders</a></li>
                  </ul>
                </aside>
                <aside className="col-md">
                  <h6 className="title">Social</h6>
                  <ul className="list-unstyled">
                    <li><a href="#"><i className="fab fa-facebook"></i> Facebook</a></li>
                    <li><a href="#"><i className="fab fa-twitter"></i> Twitter</a></li>
                    <li><a href="#"><i className="fab fa-instagram"></i> Instagram</a></li>
                    <li><a href="#"><i className="fab fa-youtube"></i> Youtube</a></li>
                  </ul>
                </aside>
              </div>
            </section>
            <section className="footer-bottom text-center">
              <p className="text-white">
                Privacy Policy - Terms of Use - User Information Legal Enquiry Guide
              </p>
              <p className="text-muted">&copy; 2025 Công ty bạn, All rights reserved</p>
            </section>
          </div>
        </footer>

        {/* Scripts */}
        <Script src="/js/jquery-2.0.0.min.js" strategy="afterInteractive" />
        <Script src="/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
        <Script src="/js/script.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
