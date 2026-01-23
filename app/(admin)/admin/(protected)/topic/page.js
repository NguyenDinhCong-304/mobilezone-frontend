"use client"
import { useEffect, useState } from "react";
import adminAxios from "@/app/utils/adminAxios";
import { notify, confirmDialog } from "@/app/utils/notify";

export default function TopicList() {
    // const [topics, setTopics] = useState([]);

    // useEffect(() => {
    //     fetch("http://localhost:8000/api/topic")
    //         .then((res) => res.json())
    //         .then((data) => setTopics(data))
    //         .catch((err) => console.error("Error:", err));
    // }, []);
    const [topics, setTopics] = useState([]);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(false);

    // Fetch categories (dùng page hiện tại)
    const fetchTopics = async () => {
        setLoading(true);
        try {
            const res = await adminAxios.get("/topic", {
                params: { search, status, page },
            });
            setTopics(res.data.data);
            setLastPage(res.data.last_page);
        } catch (err) {
            console.error("Lỗi tải danh mục:", err);
        } finally {
            setLoading(false);
        }
    };

    // 👇 Gọi lại khi page, search, hoặc status thay đổi
    useEffect(() => {
        fetchTopics();
    }, [page, search, status]);

    // Gọi khi bấm nút tìm kiếm
    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1); // Reset về trang đầu khi tìm
        fetchTopics();
    };

    // Xóa danh mục
    const handleDelete = async (id) => {
        const isConfirmed = await confirmDialog({
                    title: "Xóa chủ đề?",
                    text: "Chủ đề sẽ bị xóa vĩnh viễn!",
                    confirmText: "Xóa",
                    cancelText: "Hủy",
                });
        
                if (!isConfirmed) return;

        try {
            const res = await adminAxios.delete(`/topic/${id}`);
            notify.success(res.data.message || "Xóa thành công!");
            fetchTopics(page);
        } catch (err) {
            console.error(err);
            notify.warning("Lỗi khi xóa chủ đề!");
        }
    };
    return (
        <section id="main-content">
            <section className="wrapper">
                <h3 className="text-black mb-6 text-3xl border-b font-bold">
                    Chủ đề
                </h3>
                <form
                    onSubmit={handleSearch}
                    className="flex gap-3 mb-6 items-center justify-between text-black"
                >
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Tìm kiếm chủ đề..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border px-3 py-2 rounded w-64"
                        />
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="border px-3 py-2 rounded"
                        >
                            <option value="">Tất cả trạng thái</option>
                            <option value="1">Hiển thị</option>
                            <option value="0">Ẩn</option>
                        </select>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Tìm kiếm
                        </button>
                    </div>
                </form>
                <div className="row mt">
                    <div className="col-md-12 mt">
                        <div className="content-panel">
                            <div className="flex justify-between mb-2">
                                <h4 className="text-black mb-4 text-2xl">
                                    Danh sách chủ đề
                                </h4>
                                <a href="/admin/topic/add" className="bg-blue-600 text-white pl-4 pr-4 pt-3 rounded">
                                    Thêm chủ đề
                                </a>
                            </div>

                            <table className="table-auto border-collapse border border-gray-400 w-full table-default">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>ID</th>
                                        <th>Tên</th>
                                        <th>Slug</th>
                                        <th>Sắp xếp</th>
                                        <th>Chi tiết</th>
                                        <th>Trạng thái</th>
                                        <th>Hoạt động</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    {topics.length > 0 ? (
                                        topics.map((topic, index) => (
                                            <tr key={topic.id}>
                                                <td>{index + 1}</td>
                                                <td>{topic.id}</td>
                                                <td>{topic.name}</td>
                                                <td>{topic.slug}</td>
                                                <td>{topic.sort_order}</td>
                                                <td>{topic.description}</td>
                                                <td>
                                                    {Number(topic.status) === 1 ? (
                                                        <span className="label label-success label-mini">Hiển thị</span>
                                                    ) : (
                                                        <span className="label label-default label-mini">Ẩn</span>
                                                    )}
                                                </td>
                                                <td className="items-center space-x-4">
                                                    <button className="text-green-500">
                                                        <i className="fa-solid fa-eye"></i>
                                                    </button>
                                                    <a href={`/admin/topic/${topic.id}/edit`} className="text-blue-600">
                                                        <i className="fa fa-pencil"></i>
                                                    </a>
                                                    <button className="text-red-600" onClick={() => handleDelete(topic.id)}>
                                                        <i className="fa fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="10">Không có dữ liệu</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        {/* PHÂN TRANG */}
                        <div className="flex justify-center mt-4 gap-3 text-black">
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
                    </div>
                </div>
            </section>
        </section>
    );
}
