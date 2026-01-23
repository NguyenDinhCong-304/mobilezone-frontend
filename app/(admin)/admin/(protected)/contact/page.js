"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { confirmDialog } from "@/app/utils/notify";
import adminAxios from "@/app/utils/adminAxios";

export default function ContactList() {
    const [contacts, setContacts] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchContacts = async () => {
        setLoading(true);
        try {
            const res = await adminAxios.get("/contact", {
                params: { search, page },
            });
            setContacts(res.data.data);
            setLastPage(res.data.last_page);
        } catch (err) {
            console.error("Error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, [page]);

    // Tìm kiếm
    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1);
        fetchContacts();
    };

    // Xóa liên hệ
    const handleDelete = async (id) => {

        const confirmed = await confirmDialog({
            title: "Xác nhận xóa",
            text: "Bạn có chắc muốn xóa liên hệ này không?",
            confirmText: "Xóa",
            cancelText: "Hủy",
        });

        if (!confirmed) return;

        try {
            await adminAxios.delete(`/contact/${id}`);
            toast.success("Đã xóa liên hệ thành công!");
            fetchContacts();
        } catch (err) {
            console.error("Lỗi xóa liên hệ:", err);
            toast.error("Xóa liên hệ thất bại!");
        }
    };

    return (
        <section id="main-content" className="text-black">
            <section className="wrapper">
                <h3 className="text-black mb-6 text-3xl border-b font-bold">
                    <i className="fa fa-angle-right"></i> Liên hệ
                </h3>

                <div className="mb-4 flex justify-between items-center">
                    <form onSubmit={handleSearch} className="flex gap-2">
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border rounded p-2"
                            placeholder="Tìm theo tên, email hoặc SĐT"
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Tìm kiếm
                        </button>
                    </form>
                </div>

                {loading ? (
                    <p className="text-center text-gray-500">Đang tải...</p>
                ) : (
                    <table className="table-auto border-collapse border border-gray-400 w-full">
                        <thead>
                            <tr>
                                <th className="border">STT</th>
                                <th className="border">Tên</th>
                                <th className="border">Email</th>
                                <th className="border">Điện thoại</th>
                                <th className="border">Nội dung</th>
                                <th className="border">Trạng thái</th>
                                <th className="border">Hoạt động</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {contacts.length > 0 ? (
                                contacts.map((contact, index) => (
                                    <tr key={contact.id}>
                                        <td className="border">{index + 1}</td>
                                        <td className="border">{contact.name}</td>
                                        <td className="border">{contact.email}</td>
                                        <td className="border">{contact.phone}</td>
                                        <td className="max-w-xs truncate border">{contact.content}</td>
                                        <td className="border">
                                            {Number(contact.status) === 1 ? (
                                                <span className="text-green-600">Đã phản hồi</span>
                                            ) : (
                                                <span className="text-gray-500">Chưa phản hồi</span>
                                            )}
                                        </td>
                                        <td className="space-x-3 border">
                                            <a
                                                href={`/admin/contact/${contact.id}/reply`}
                                                className="text-blue-600"
                                            >
                                                <i className="fa fa-reply"></i>
                                            </a>
                                            <button
                                                onClick={() => handleDelete(contact.id)}
                                                className="text-red-600"
                                            >
                                                <i className="fa fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7">Không có dữ liệu</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}

                {/* PHÂN TRANG */}
                <div className="flex justify-center mt-4 gap-3">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Prev
                    </button>
                    <span className="text-lg font-semibold">
                        {page} / {lastPage}
                    </span>
                    <button
                        disabled={page === lastPage}
                        onClick={() => setPage(page + 1)}
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </section>
        </section>
    );
}
