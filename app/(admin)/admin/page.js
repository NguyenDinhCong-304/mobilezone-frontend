"use client";
import { useEffect, useRef } from "react";

export default function Dashboard() {
   const serverLoadRef = useRef(null);
   const statRef = useRef(null);
  return (
    <section className="p-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-9 gap-6">
        {/* Main chart section */}
        <div className="lg:col-span-6 space-y-6">
          {/* Top small stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-white p-4 rounded shadow text-center">
              <span className="text-pink-500 text-2xl">❤</span>
              <h3 className="text-xl font-bold text-gray-500">933</h3>
              <p className="text-gray-500 text-sm">
                933 người đã thích trang của bạn trong 24h
              </p>
            </div>
            <div className="bg-white p-4 rounded shadow text-center">
              <span className="text-blue-500 text-2xl">☁</span>
              <h3 className="text-xl font-bold text-gray-500">+48</h3>
              <p className="text-gray-500 text-sm">
                48 tập tin mới đã được thêm vào cloud
              </p>
            </div>
            <div className="bg-white p-4 rounded shadow text-center">
              <span className="text-green-500 text-2xl">📚</span>
              <h3 className="text-xl font-bold text-gray-500">23</h3>
              <p className="text-gray-500 text-sm">Bạn có 23 tin nhắn chưa đọc</p>
            </div>
            <div className="bg-white p-4 rounded shadow text-center">
              <span className="text-orange-500 text-2xl">📰</span>
              <h3 className="text-xl font-bold text-gray-500">+10</h3>
              <p className="text-gray-500 text-sm">10 tin tức mới trong trình đọc</p>
            </div>
            <div className="bg-white p-4 rounded shadow text-center">
              <span className="text-purple-500 text-2xl">💾</span>
              <h3 className="text-xl font-bold text-gray-500">OK!</h3>
              <p className="text-gray-500 text-sm">Máy chủ đang chạy ổn định</p>
            </div>
          </div>

          {/* Middle charts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded shadow p-4 flex flex-col items-center">
              <h5 className="font-bold mb-2 text-gray-500">Tải máy chủ</h5>
              <div className="w-32 h-32">
                <canvas ref={serverLoadRef}></canvas>
              </div>
              <p className="mt-2 text-gray-500">70% sử dụng</p>
            </div>

            <div className="bg-white rounded shadow p-4 flex flex-col items-center">
              <h5 className="font-bold mb-2 text-gray-500">Top sản phẩm</h5>
              <p className="text-gray-500 mb-2">❤ 122</p>
              <img
                src="/demo/img/product/Nu/RunningShoes/rs1.png"
                alt="Top sản phẩm"
                className="w-24"
              />
            </div>

            <div className="bg-white rounded shadow p-4 text-center">
              <h5 className="font-bold mb-2 text-gray-500">Top người dùng</h5>
              <img
                src="/assets/img/ui-zac.jpg"
                alt="Zac Snider"
                className="w-20 h-20 rounded-full mx-auto"
              />
              <p className="font-bold mt-2 text-gray-500">Zac Snider</p>
              <div className="flex justify-around mt-4 text-sm text-gray-500">
                <div>
                  <p>Thành viên từ</p>
                  <p className="font-bold text-black">2018</p>
                </div>
                <div>
                  <p>Tổng chi tiêu</p>
                  <p className="font-bold text-black">12,050,000 đ</p>
                </div>
              </div>
            </div>
          </div>

          {/* More stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-900 text-white rounded shadow p-4 flex flex-col items-center">
              <h5 className="mb-2">Thống kê</h5>
              <div className="w-32 h-32">
                <canvas ref={statRef}></canvas>
              </div>
              <p className="mt-2">17/11/2022</p>
              <div className="flex justify-between w-full mt-2 text-sm">
                <span>💽 17 GB</span>
                <span>60% sử dụng</span>
              </div>
            </div>

            <div className="bg-pink-400 rounded shadow p-4 flex flex-col items-center">
              <i className="fa fa-instagram fa-3x text-pink-600"></i>
              <p className="mt-2">@THISISYOU · 5 phút trước</p>
              <p className="text-sm">
                💬 18 | ❤ 49
              </p>
            </div>

            <div className="bg-blue-900 text-white rounded shadow p-4 flex flex-col items-center">
              <h5 className="mb-2">Doanh thu</h5>
              <p className="mt-8 text-xl font-bold">17.980.000 đ</p>
              <p>Thu nhập tháng</p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-3 space-y-6 text-gray-400">
          <div>
            <h3 className="text-lg font-bold">Thông báo</h3>
            <ul className="space-y-4">
              <li className="bg-white p-3 rounded shadow">
                <p className="text-sm text-gray-500">2 phút trước</p>
                <p>
                  <b>James Brown</b> đã đăng ký nhận bản tin
                </p>
              </li>
              <li className="bg-white p-3 rounded shadow">
                <p className="text-sm text-gray-500">3 giờ trước</p>
                <p>
                  <b>Diana Kennedy</b> đã thanh toán đăng ký một năm
                </p>
              </li>
              <li className="bg-white p-3 rounded shadow">
                <p className="text-sm text-gray-500">7 giờ trước</p>
                <p>
                  <b>Brandon Page</b> đã thanh toán đăng ký một năm
                </p>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold">Thành viên nhóm</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <img
                  src="/assets/img/ui-divya.jpg"
                  className="w-10 h-10 rounded-full"
                  alt=""
                />
                <div>
                  <p className="font-bold">DIVYA MANIAN</p>
                  <p className="text-sm text-gray-500">Khả dụng</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <img
                  src="/assets/img/ui-sherman.jpg"
                  className="w-10 h-10 rounded-full"
                  alt=""
                />
                <div>
                  <p className="font-bold">DJ SHERMAN</p>
                  <p className="text-sm text-gray-500">Tôi đang bận</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
