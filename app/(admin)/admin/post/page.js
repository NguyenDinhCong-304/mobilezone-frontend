"use client"
import { useEffect, useState } from "react";
import axios from "axios";

export default function ContactList() {
    const [posts, setPosts] = useState([]);
    const [topic, setTopic] = useState([]);
    
    const [status, setStatus] = useState("");
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [filterTopic, setFilterTopic] = useState("");
    const [searchText, setSearchText] = useState("");
    const [search, setSearch] = useState("");
    

    // Fetch categories (dùng page hiện tại)
    const fetchPosts = async () => {
        setLoading(true);
        try {
            const res = await axios.get("http://localhost:8000/api/post", {
                params: {
                    search,
                    topic_id: filterTopic,
                    status,
                    page
                },
            });
            setPosts(res.data.data);
            setLastPage(res.data.last_page);
        } catch (err) {
            console.error("Lỗi tải bài viết:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/topic")
            .then((res) => setTopic(res.data.data || res.data))
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        fetchPosts();
    }, [page, search, filterTopic, status]);

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1); // Reset về trang đầu khi tìm
        setSearch(searchText);
    };

    const handleDelete = async (id) => {
        if (!confirm("Bạn có chắc muốn xóa bài viết này không?")) return;

        try {
            const res = await axios.delete(`http://localhost:8000/api/post/${id}`);
            alert(res.data.message || "Xóa thành công!");
            fetchPosts(page);
        } catch (err) { 
            console.error(err);
            alert("Lỗi khi xóa bài viết!");
        }
    };

    return (
        <section id="main-content">
            <section className="wrapper">
                <h3 className="text-black mb-6 text-3xl border-b font-bold">
                    Bài viết
                </h3>
                {/* BỘ LỌC & TÌM KIẾM */}
                <form
                    onSubmit={handleSearch}
                    className="flex gap-3 mb-6 items-center justify-between text-black "
                >
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Tìm kiếm bài viết..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="border px-3 py-2 rounded w-64"
                        />
                        <select
                            className="border px-3 py-2 rounded"
                            value={filterTopic}
                            onChange={(e) => {
                                setPage(1);
                                setFilterTopic(e.target.value);
                            }}
                        >
                            <option value="">-- Tất cả chủ đề --</option>
                            {topic.map((top) => (
                                <option key={top.id} value={top.id}>
                                    {top.name}
                                </option>
                            ))}
                        </select>
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

                    <a
                        href="/admin/post/add"
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        + Thêm bài viết
                    </a>
                </form>
                <div className="row mt">
                    <div className="col-md-12 mt">
                        <div className="content-panel">
                            <div className="flex justify-between mb-2">
                                <h4 className="text-black mb-4 text-2xl font-semibold">
                                    Danh sách bài viết
                                </h4>
                            </div>

                            <table className="table-auto border-collapse border border-gray-400 w-full table-default">
                                <thead>
                                    <tr>
                                        {/* <th>#</th> */}
                                        <th>ID</th>
                                        <th>Tên chủ đề</th>
                                        <th>Tiêu đề</th>
                                        <th>Slug</th>
                                        <th>Ảnh</th>
                                        <th>Nội dung</th>
                                        <th>Chi tiết</th>
                                        <th className="w-35">Trạng thái</th>
                                        <th className="w-35">Hoạt động</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    {posts.length > 0 ? (
                                        posts.map((post) => (
                                            <tr key={post.id}>
                                                {/* <td>{index + 1}</td> */}
                                                <td>{post.id}</td>
                                                <td>{post.topic.name}</td>
                                                <td>
                                                    {post.title}
                                                </td>
                                                <td>{post.slug}</td>
                                                <td>
                                                    {post.image ? (
                                                        <img
                                                            src={`http://localhost:8000/storage/${post.image}`}
                                                            alt={post.title}
                                                            className="w-16 h-16 object-cover mx-auto"
                                                        />
                                                    ) : (
                                                        "Không có"
                                                    )}
                                                </td>
                                                <td>{post.content}</td>
                                                <td>{post.description}</td>
                                                <td>
                                                    {Number(post.status) === 1 ? (
                                                        <span className="label label-success label-mini bg-blue-500 text-white rounded p-1">Hiển thị</span>
                                                    ) : (
                                                        <span className="label label-default label-mini bg-red-500 text-white rounded p-1">Ẩn</span>
                                                    )}
                                                </td>
                                                <td className="items-center space-x-4">
                                                    <button className="text-green-500">
                                                        <i className="fa-solid fa-eye"></i>
                                                    </button>
                                                    <a href={`/admin/post/${post.id}/edit`} className="text-blue-600">
                                                        <i className="fa fa-pencil"></i>
                                                    </a>
                                                    <button className="text-red-600" onClick={() => handleDelete(post.id)}>
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
                            {/* PHÂN TRANG */}
                            <div className="flex justify-center items-center mt-4 gap-2 text-black">
                                <button
                                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                                    disabled={page === 1}
                                    className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50 cursor-pointer"
                                >
                                    « Trước
                                </button>
                                <span>
                                    Trang {page} / {lastPage}
                                </span>
                                <button
                                    onClick={() => setPage((p) => Math.min(p + 1, lastPage))}
                                    disabled={page === lastPage}
                                    className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50 cursor-pointer"
                                >
                                    Sau »
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    );
}
