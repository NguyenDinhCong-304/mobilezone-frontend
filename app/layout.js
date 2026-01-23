import "./globals.css";

export const metadata = {
  title: "MobileZone",
  description: "Shop bán sản phẩm công nghệ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
