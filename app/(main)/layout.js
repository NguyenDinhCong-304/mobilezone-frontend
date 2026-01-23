// "use client"; // Thêm dòng này ở đầu để cho phép dùng useState, useEffect

// import "../globals.css";
// import Script from "next/script";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Footer from "./_components/Footer";
// import Header from "./_components/Header";

// export default function MainLayout({ children }) {

//   return (
//     <html lang="en">
//       <head>
//         <meta charSet="utf-8" />
//         <meta httpEquiv="pragma" content="no-cache" />
//         <meta httpEquiv="cache-control" content="max-age=604800" />
//         <meta
//           name="viewport"
//           content="width=device-width, initial-scale=1, shrink-to-fit=no"
//         />
//         <meta
//           name="keywords"
//           content="Online template, shop, theme, template, html, css, bootstrap 4"
//         />

//         <link href="/css/bootstrap.css" rel="stylesheet" />
//         <link href="/fonts/fontawesome/css/all.min.css" rel="stylesheet" />
//         <link href="/css/ui.css" rel="stylesheet" />
//         <link href="/css/responsive.css" rel="stylesheet" />
//       </head>
//       <body>

//         <Header/>
//         <ToastContainer
//           position="top-right"
//           autoClose={3000}
//           pauseOnHover
//           draggable
//           theme="light"
//         />

//         {/* Nội dung trang */}
//         {children}

//         {/* Footer */}
//         <Footer/>

//         {/* Scripts */}
//         <Script src="/js/jquery-2.0.0.min.js" strategy="afterInteractive" />
//         <Script src="/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
//         <Script src="/js/script.js" strategy="afterInteractive" />
//       </body>
//     </html>
//   );
// }

"use client";

import "../globals.css";
import Script from "next/script";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./_components/Footer";
import Header from "./_components/Header";

export default function MainLayout({ children }) {
  return (
    <>
      {/* CSS riêng user */}
      <link href="/css/bootstrap.css" rel="stylesheet" />
      <link href="/fonts/fontawesome/css/all.min.css" rel="stylesheet" />
      <link href="/css/ui.css" rel="stylesheet" />
      <link href="/css/responsive.css" rel="stylesheet" />
      
        <Header />

        <ToastContainer
          position="top-right"
          autoClose={3000}
          pauseOnHover
          draggable
          theme="light"
        />

        {children}

        <Footer />

      {/* JS riêng user */}
      <Script src="/js/jquery-2.0.0.min.js" strategy="afterInteractive" />
      <Script src="/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
      <Script src="/js/script.js" strategy="afterInteractive" />
    </>
  );
}
