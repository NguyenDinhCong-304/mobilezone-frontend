import "../../globals.css";
import Script from "next/script";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "Admin Dashboard",
  description: "Shop bán giày dép",
};

export default function AdminLayout({ children }) {
  return (
    <html lang="vi">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Bootstrap CSS */}
        <link href="/assets/css/bootstrap.min.css" rel="stylesheet" />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          rel="stylesheet"
        />
        <style>{`
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #f4f4f4;
          }
          .header {
            background: #ffcc5c;
            padding: 10px 20px;
          }
          .header .logo {
            font-weight: bold;
            color: #2c3e50;
            font-size: 20px;
            text-transform: uppercase;
          }
          .sidebar {
            width: 220px;
            background: #2c3e50;
            min-height: 100vh;
            color: #fff;
          }
          .sidebar .profile {
            text-align: center;
            padding: 20px 10px;
          }
          .sidebar .profile img {
            border-radius: 50%;
          }
          .sidebar .nav-link {
            color: #ddd;
            padding: 10px 15px;
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .sidebar .nav-link:hover,
          .sidebar .nav-link.active {
            background: #1a252f;
            color: #fff;
          }
          .main-content {
            flex-grow: 1;
            padding: 20px;
          }
          .site-footer {
            background: #2c3e50;
            color: #fff;
            padding: 10px;
            text-align: center;
          }
        `}</style>
      </head>
      <body>
        {/* Header */}
        <header className="flex items-center justify-between bg-yellow-400 px-4 py-2">
          <a href="/" className="text-xl font-bold text-white no-underline">
            TRANG QUẢN LÝ
          </a>
          <button className="bg-sky-400 hover:bg-sky-500 text-white px-4 py-2 rounded">
            Đăng xuất
          </button>
        </header>

        {/* Layout with Sidebar */}
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside className="w-64 bg-gray-800 text-white flex flex-col p-4">
            <div className="profile flex flex-col items-center mb-6">
              <img
                src="/assets/img/ui-sam.jpg"
                width="80"
                alt="Avatar"
                className="rounded-full mb-2"
              />
              <h6 className="mt-2 font-semibold">Nguyễn Công</h6>
            </div>

            <nav className="flex flex-col space-y-2">
              <a href="/admin" className="flex items-center px-3 py-2 rounded hover:bg-gray-700">
                <i className="fa fa-home mr-2"></i> Trang chủ
              </a>
              {/* <a href="/chart" className="flex items-center px-3 py-2 rounded hover:bg-gray-700">
                <i className="fa fa-chart-bar mr-2"></i> Biểu đồ
              </a> */}
              {/* <a href="/supplier" className="flex items-center px-3 py-2 rounded hover:bg-gray-700">
                <i className="fa fa-building mr-2"></i> Nhà cung cấp
              </a> */}
              <a href="/admin/user" className="flex items-center px-3 py-2 rounded hover:bg-gray-700">
                <i className="fa fa-users mr-2"></i> Tài khoản
              </a>
              <a href="/admin/category" className="flex items-center px-3 py-2 rounded hover:bg-gray-700">
                <i className="fa fa-list mr-2"></i> Danh mục
              </a>
              <a href="/admin/product" className="flex items-center px-3 py-2 rounded hover:bg-gray-700">
                <i className="fa fa-box mr-2"></i> Sản phẩm
              </a>
              <a href="/admin/product-store" className="flex items-center px-3 py-2 rounded hover:bg-gray-700">
                <i className="fa-solid fa-store mr-2"></i> Nhập kho
              </a>
              <a href="/admin/product-sale" className="flex items-center px-3 py-2 rounded hover:bg-gray-700">
                <i className="fa-solid fa-percent mr-2"></i> Khuyến mãi
              </a>
              <a href="/admin/order" className="flex items-center px-3 py-2 rounded hover:bg-gray-700">
                <i className="fa fa-shopping-cart mr-2"></i> Đơn hàng
              </a>
              <a href="/admin/menu" className="flex items-center px-3 py-2 rounded hover:bg-gray-700">
                <i className="fa fa-bars mr-2"></i> Menu
              </a>
              <a href="/admin/banner" className="flex items-center px-3 py-2 rounded hover:bg-gray-700">
                <i className="fa fa-image mr-2"></i> Banner
              </a>
              <a href="/admin/contact" className="flex items-center px-3 py-2 rounded hover:bg-gray-700">
                <i className="fa fa-envelope mr-2"></i> Liên hệ
              </a>
              <a href="/admin/post" className="flex items-center px-3 py-2 rounded hover:bg-gray-700">
                <i className="fa fa-file-alt mr-2"></i> Bài viết
              </a>
              <a href="/admin/topic" className="flex items-center px-3 py-2 rounded hover:bg-gray-700">
                <i className="fa fa-tags mr-2"></i> Chủ đề
              </a>
              <a href="/admin/setting" className="flex items-center px-3 py-2 rounded hover:bg-gray-700">
                <i className="fa fa-cogs mr-2"></i> Cài đặt
              </a>
            </nav>

          </aside>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnHover
            draggable
            theme="light"
          />
          {/* Main Content */}
          <main className="flex-1 p-6 bg-gray-100">{children}</main>
        </div>

        {/* Footer */}
        <footer className="site-footer">
          <a href="#" className="text-white text-decoration-none">
            <i className="fa fa-angle-up"></i> Lên đầu trang
          </a>
        </footer>

        {/* Bootstrap Bundle */}
        <Script src="/assets/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
