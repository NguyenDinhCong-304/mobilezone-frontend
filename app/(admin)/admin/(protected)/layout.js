// import "../../globals.css";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Menu from "./_component/Menu";
// import Header from "./_component/Header";

// export const metadata = {
//   title: "Admin Dashboard",
//   description: "Shop bán sản phẩm công nghệ",
// };

// export default function AdminLayout({ children }) {
//   return (
//     <html lang="vi">
//       <head>
//         <meta charSet="utf-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <link
//           href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
//           rel="stylesheet"
//         />

//         <script
//           src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
//           integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n"
//           crossOrigin="anonymous"
//         ></script>
//         <link
//           href="https://cdn.jsdelivr.net/npm/summernote@0.9.0/dist/summernote-lite.min.css"
//           rel="stylesheet"
//         />
//         <script src="https://cdn.jsdelivr.net/npm/summernote@0.9.0/dist/summernote-lite.min.js"></script>

//         <style>{`
//           body {
//             font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//             background: #f4f4f4;
//           }
//           .header {
//             background: #ffcc5c;
//             padding: 10px 20px;
//           }
//           .header .logo {
//             font-weight: bold;
//             color: #2c3e50;
//             font-size: 20px;
//             text-transform: uppercase;
//           }
//           .sidebar {
//             width: 220px;
//             background: #2c3e50;
//             min-height: 100vh;
//             color: #fff;
//           }
//           .sidebar .profile {
//             text-align: center;
//             padding: 20px 10px;
//           }
//           .sidebar .profile img {
//             border-radius: 50%;
//           }
//           .sidebar .nav-link {
//             color: #ddd;
//             padding: 10px 15px;
//             display: flex;
//             align-items: center;
//             gap: 10px;
//           }
//           .sidebar .nav-link:hover,
//           .sidebar .nav-link.active {
//             background: #1a252f;
//             color: #fff;
//           }
//           .main-content {
//             flex-grow: 1;
//             padding: 20px;
//           }
//           .site-footer {
//             background: #2c3e50;
//             color: #fff;
//             padding: 10px;
//             text-align: center;
//           }
//         `}</style>
//       </head>
//       <body>
//         <Header />

//         {/* Layout with Sidebar */}
//         <div className="flex min-h-screen">
//           {/* Sidebar */}
//           <Menu />
//           <ToastContainer
//             position="top-right"
//             autoClose={3000}
//             hideProgressBar={false}
//             newestOnTop={false}
//             closeOnClick
//             pauseOnHover
//             draggable
//             theme="light"
//           />
//           {/* Main Content */}
//           <main className="flex-1 p-6 bg-gray-100">{children}</main>
//         </div>

//         {/* Footer */}
//         <footer className="site-footer">
//           <a href="#" className="text-white text-decoration-none">
//             <i className="fa fa-angle-up"></i> Lên đầu trang
//           </a>
//         </footer>
//       </body>
//     </html>
//   );
// }
"use client";

import "../admin.css";
import "../../../globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Menu from "../_component/Menu";
import Header from "../_component/Header";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Script from "next/script";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import adminAxios from "@/app/utils/adminAxios";

// export const metadata = {
//   title: "Admin Dashboard",
//   description: "Trang quản lý",
// };

export default function AdminLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      try {
        await adminAxios.get("/me"); // API check token
      } catch (error) {
        // interceptor sẽ xử lý logout + redirect
        console.log("Token hết hạn hoặc không hợp lệ");
      }
    };

    checkToken();
  }, []);

  return (
      <div className="admin-root">
        <Script
          src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
          integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/summernote@0.9.0/dist/summernote-lite.min.css"
          rel="stylesheet"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/summernote@0.9.0/dist/summernote-lite.min.js"
          strategy="beforeInteractive"
        />

        <Header />

        <div className="flex min-h-screen">
          <Menu />

          <main className="flex-1 min-w-0 overflow-x-hidden p-4">
            <ToastContainer position="top-right" autoClose={3000} />
            {children}
          </main>
        </div>

        <footer className="site-footer">
          <a href="#" className="text-white">
            <i className="fa fa-angle-up"></i> Lên đầu trang
          </a>
        </footer>
      </div>
  );
}
