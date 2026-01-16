"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

export default function Navbar() {
    const [menus, setMenus] = useState([]);
    const [openMobile, setOpenMobile] = useState(false);
    const [openProduct, setOpenProduct] = useState(false);
    const [openSubMenu, setOpenSubMenu] = useState(null);

    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/menu?type=${"main"}`, {
                    params: { mode: "frontend" }
                });
                console.log("Menu API response:", res.data);
                setMenus(res.data);
            } catch (err) {
                console.error("Lỗi tải menu:", err);
            }
        };

        fetchMenus();
    }, []);

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
                        {menus.map((menu) => (
                            <div key={menu.id} className="relative group">
                                <Link
                                    href={menu.link}
                                    className="inline-flex items-center rounded-md px-3 py-2 text-sm hover:bg-gray-800 hover:text-white"
                                >
                                    {menu.name}
                                </Link>

                                {/* Menu con */}
                                {menu.children?.length > 0 && (
                                    <div className="absolute left-0 top-full z-50 hidden group-hover:block">
                                        <div className="mt-2 w-48 rounded-md bg-white shadow-lg py-1">
                                            {menu.children.map((child) => (
                                                <Link
                                                    key={child.id}
                                                    href={child.link}
                                                    className="block px-4 py-2 text-sm hover:bg-gray-200"
                                                >
                                                    {child.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            {/* Mobile menu */}
            {/* {openMobile && (
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
            )} */}
            {openMobile && (
                <div className="sm:hidden px-2 pt-2 pb-3 space-y-1 bg-gray-900 text-white">

                    {menus.map((menu) => (
                        <div key={menu.id}>
                            {/* Menu cha */}
                            <button
                                onClick={() =>
                                    setOpenSubMenu(openSubMenu === menu.id ? null : menu.id)
                                }
                                className="flex w-full items-center justify-between rounded-md px-3 py-2 text-base hover:bg-gray-700"
                            >
                                <span>{menu.name}</span>
                                {menu.children?.length > 0 && (
                                    <span>{openSubMenu === menu.id ? "-" : "+"}</span>
                                )}
                            </button>

                            {/* Menu con */}
                            {openSubMenu === menu.id && menu.children?.length > 0 && (
                                <div className="ml-4 space-y-1">
                                    {menu.children.map((child) => (
                                        <Link
                                            key={child.id}
                                            href={child.link}
                                            className="block rounded-md px-3 py-2 text-sm text-gray-300 hover:bg-gray-700"
                                        >
                                            {child.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}

                </div>
            )}

        </nav>
    );
}
