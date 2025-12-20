"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
    const [openMobile, setOpenMobile] = useState(false);
    const [openProduct, setOpenProduct] = useState(false);

    return (
        <nav className="relative">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">

                    {/* Mobile button */}
                    <div className="flex sm:hidden">
                        <button
                            onClick={() => setOpenMobile(!openMobile)}
                            className="inline-flex items-center justify-center rounded-md p-2 text-gray-300 hover:bg-gray-800 hover:text-white"
                        >
                            {openMobile ? (
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Desktop menu */}
                    <div className="hidden sm:flex sm:space-x-4">
                        <Link href="/" className="rounded-md px-3 py-2 text-sm">
                            Trang chủ
                        </Link>

                        <div className="relative group">
                            <Link
                                href="/product"
                                className="inline-flex items-center rounded-md px-3 py-2 text-sm text-gray-800 hover:text-white hover:bg-gray-800"
                            >
                                Sản phẩm
                            </Link>

                            <div className="absolute left-0 top-full z-50 hidden group-hover:block">
                                <div className="mt-2 w-48 rounded-md bg-white shadow-lg py-1">
                                    <Link href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                                        Điện thoại
                                    </Link>
                                    <Link href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                                        Máy tính bảng
                                    </Link>
                                    <Link href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                                        Laptop
                                    </Link>
                                    <Link href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                                        Đồng hồ thông minh
                                    </Link>
                                    <Link href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                                        Phụ kiện
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <Link href="/sales" className="rounded-md px-3 py-2 text-sm text-gray-300 hover:text-white">
                            Khuyến mãi
                        </Link>

                        <Link href="/post" className="rounded-md px-3 py-2 text-sm text-gray-300 hover:text-white">
                            Bài viết
                        </Link>

                        <Link href="/contact" className="rounded-md px-3 py-2 text-sm text-gray-300 hover:text-white">
                            Liên hệ
                        </Link>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {openMobile && (
                <div className="sm:hidden px-2 pt-2 pb-3 space-y-1">
                    <Link href="/" className="block rounded-md px-3 py-2 text-base bg-gray-700">
                        Trang chủ
                    </Link>
                    <button
                        onClick={() => setOpenProduct(!openProduct)}
                        className="flex w-full items-center justify-between rounded-md px-3 py-2 text-base hover:bg-gray-700"
                    >
                        Sản phẩm
                        <span>{openProduct ? "-" : "+"}</span>
                    </button>

                    {openProduct && (
                        <div className="ml-4 space-y-1">
                            <Link href="/product" className="block px-3 py-2 text-sm text-gray-300 hover:bg-gray-700">
                                Tất cả sản phẩm
                            </Link>
                            <Link href="#" className="block px-3 py-2 text-sm text-gray-300 hover:bg-gray-700">
                                Điện thoại
                            </Link>
                            <Link href="#" className="block px-3 py-2 text-sm text-gray-300 hover:bg-gray-700">
                                Máy tính bảng
                            </Link>
                            <Link href="#" className="block px-3 py-2 text-sm text-gray-300 hover:bg-gray-700">
                                Laptop
                            </Link>
                            <Link href="#" className="block px-3 py-2 text-sm text-gray-300 hover:bg-gray-700">
                                Đồng hồ thông minh
                            </Link>
                            <Link href="#" className="block px-3 py-2 text-sm text-gray-300 hover:bg-gray-700">
                                Phụ kiện
                            </Link>
                        </div>
                    )}

                    <Link href="/sales" className="block rounded-md px-3 py-2 text-base text-gray-300 hover:bg-gray-700">
                        Khuyến mãi
                    </Link>

                    <Link href="/post" className="block rounded-md px-3 py-2 text-base text-gray-300 hover:bg-gray-700">
                        Bài viết
                    </Link>

                    <Link href="/contact" className="block rounded-md px-3 py-2 text-base text-gray-300 hover:bg-gray-700">
                        Liên hệ
                    </Link>
                </div>
            )}
        </nav>
    );
}
