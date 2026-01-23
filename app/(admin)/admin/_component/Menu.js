"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import adminAxios from "@/app/utils/adminAxios";
import axios from "axios";

const Menu = ({ icon, title, basePaths = [], children }) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  //Tự mở menu nếu URL khớp
  useEffect(() => {
    if (basePaths.some((path) => pathname.startsWith(path))) {
      setOpen(true);
    }
  }, [pathname, basePaths]);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2 rounded hover:bg-gray-700"
      >
        <div className="flex items-center">
          <i className={`${icon} mr-2`}></i>
          {title}
        </div>
        <i className={`fa fa-chevron-${open ? "down" : "right"}`}></i>
      </button>

      {open && (
        <div className="ml-6 mt-1 flex flex-col space-y-1">{children}</div>
      )}
    </div>
  );
};

export default function AdminSidebar() {
  const [admin, setAdmin] = useState(null);
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/admin/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
          },
        });

        setAdmin(res.data);
      } catch (err) {
        console.error("Không lấy được thông tin admin", err);
      }
    };

    fetchAdmin();
  }, []);

  if (!admin) return null;
  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col p-4">
      <div className="profile flex flex-col items-center mb-6">
        <img
          src={
            admin.avatar
              ? `http://localhost:8000/${admin.avatar}`
              : "/assets/img/ui-sam.jpg"
          }
          width="80"
          alt="Avatar"
          className="rounded-full mb-2"
        />
        <h6 className="mt-2 font-semibold">{admin.username}</h6>
      </div>
      <nav className="flex flex-col space-y-2 text-sm">
        {/* Trang chủ */}
        <a
          href="/admin"
          className="flex items-center px-3 py-2 rounded hover:bg-gray-700"
        >
          <i className="fa fa-home mr-2"></i> Trang chủ
        </a>

        {/* Người dùng & đơn hàng */}
        <Menu
          icon="fa fa-users"
          title="Quản lý bán hàng"
          basePaths={["/admin/user", "/admin/order"]}
        >
          <a href="/admin/user" className="px-3 py-2 rounded hover:bg-gray-700">
            Tài khoản
          </a>
          <a
            href="/admin/order"
            className="px-3 py-2 rounded hover:bg-gray-700"
          >
            Đơn hàng
          </a>
        </Menu>

        {/* Sản phẩm */}
        <Menu
          icon="fa fa-box"
          title="Quản lý sản phẩm"
          basePaths={[
            "/admin/category",
            "/admin/brand",
            "/admin/product",
            "/admin/product-store",
            "/admin/product-sale",
          ]}
        >
          <a
            href="/admin/category"
            className="px-3 py-2 rounded hover:bg-gray-700"
          >
            Danh mục
          </a>
          <a
            href="/admin/brand"
            className="px-3 py-2 rounded hover:bg-gray-700"
          >
            Thương hiệu
          </a>
          <a
            href="/admin/product"
            className="px-3 py-2 rounded hover:bg-gray-700"
          >
            Sản phẩm
          </a>
          <a
            href="/admin/product-store"
            className="px-3 py-2 rounded hover:bg-gray-700"
          >
            Nhập kho
          </a>
          <a
            href="/admin/product-sale"
            className="px-3 py-2 rounded hover:bg-gray-700"
          >
            Khuyến mãi
          </a>
        </Menu>

        {/* Nội dung */}
        <Menu
          icon="fa fa-file-alt"
          title="Quản lý nội dung"
          basePaths={[
            "/admin/menu",
            "/admin/banner",
            "/admin/post",
            "/admin/topic",
            "/admin/contact",
          ]}
        >
          <a href="/admin/menu" className="px-3 py-2 rounded hover:bg-gray-700">
            Menu
          </a>
          <a
            href="/admin/banner"
            className="px-3 py-2 rounded hover:bg-gray-700"
          >
            Banner
          </a>
          <a href="/admin/post" className="px-3 py-2 rounded hover:bg-gray-700">
            Bài viết
          </a>
          <a
            href="/admin/topic"
            className="px-3 py-2 rounded hover:bg-gray-700"
          >
            Chủ đề
          </a>
          <a
            href="/admin/contact"
            className="px-3 py-2 rounded hover:bg-gray-700"
          >
            Liên hệ
          </a>
        </Menu>

        {/* Cài đặt */}
        <a
          href="/admin/setting"
          className="flex items-center px-3 py-2 rounded hover:bg-gray-700"
        >
          <i className="fa fa-cogs mr-2"></i> Cài đặt
        </a>
      </nav>
    </aside>
  );
}
