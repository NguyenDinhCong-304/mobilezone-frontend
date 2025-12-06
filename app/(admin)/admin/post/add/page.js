"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PostAddPage() {
    const [topics, setTopics] = useState([]);
    const [form, setForm] = useState({
        topic_id: "",
        title: "",
        description: "",
        content: "",
        status: 1,
    });
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState("");

    // Lấy danh sách chủ đề
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/topic") // endpoint trả danh sách topic
            .then((res) => setTopics(res.data.data || res.data))
            .catch((err) => console.error("Lỗi khi tải chủ đề:", err));
    }, []);

    // Gửi form thêm bài viết
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        const data = new FormData();
        Object.keys(form).forEach((key) => data.append(key, form[key]));
        if (image) data.append("image", image);

        try {
            const res = await axios.post("http://localhost:8000/api/post", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setMessage(res.data.message || "Thêm bài viết thành công!");
            setForm({
                topic_id: "",
                title: "",
                description: "",
                content: "",
                status: 1,
            });
            setImage(null);
        } catch (err) {
            console.error("Lỗi khi thêm bài viết:", err);
            setMessage("Thêm bài viết thất bại!");
        }
    };

    return (
        <div className="w-full mx-auto text-black">
            <h1 className="text-3xl font-bold mb-6 border-b">Bài viết</h1>
            <div className="flex justify-between mb-4">
                <h1 className="text-xl font-semibold">
                    Thêm bài viết mới
                </h1>

                {message && (
                    <div className="mb-4 p-3 rounded bg-blue-100 border border-blue-300 text-blue-700">
                        {message}
                    </div>
                )}

                <a
                    href="/admin/post"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Về danh sách
                </a>
            </div>
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-lg p-6 space-y-4"
            >
                {/* Chủ đề */}
                <div>
                    <label className="block font-medium mb-1">Chủ đề</label>
                    <select
                        value={form.topic_id}
                        onChange={(e) => setForm({ ...form, topic_id: e.target.value })}
                        className="w-full border rounded p-2"
                        required
                    >
                        <option value="">-- Chọn chủ đề --</option>
                        {topics.map((topic) => (
                            <option key={topic.id} value={topic.id}>
                                {topic.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Tiêu đề */}
                <div>
                    <label className="block font-medium mb-1">Tiêu đề</label>
                    <input
                        type="text"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        className="w-full border rounded p-2"
                        placeholder="Nhập tiêu đề bài viết..."
                        required
                    />
                </div>

                {/* Mô tả */}
                <div>
                    <label className="block font-medium mb-1">Mô tả</label>
                    <textarea
                        value={form.description}
                        onChange={(e) =>
                            setForm({ ...form, description: e.target.value })
                        }
                        className="w-full border rounded p-2 h-20"
                        placeholder="Mô tả ngắn gọn..."
                    />
                </div>

                {/* Nội dung */}
                <div>
                    <label className="block font-medium mb-1">Nội dung</label>
                    <textarea
                        value={form.content}
                        onChange={(e) => setForm({ ...form, content: e.target.value })}
                        className="w-full border rounded p-2 h-40"
                        placeholder="Nhập nội dung chi tiết bài viết..."
                        required
                    />
                </div>

                {/* Ảnh đại diện */}
                <div>
                    <label className="block font-medium mb-1">Ảnh đại diện</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="w-full border rounded p-2"
                    />
                    {image && (
                        <img
                            src={URL.createObjectURL(image)}
                            alt="Xem trước ảnh"
                            className="w-32 mt-2 rounded shadow"
                        />
                    )}
                </div>

                {/* Trạng thái */}
                <div>
                    <label className="block font-medium mb-1">Trạng thái</label>
                    <select
                        value={form.status}
                        onChange={(e) => setForm({ ...form, status: e.target.value })}
                        className="w-full border rounded p-2"
                    >
                        <option value="1">Hiển thị</option>
                        <option value="0">Ẩn</option>
                    </select>
                </div>

                {/* Nút submit */}
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
                >
                    Thêm bài viết
                </button>
            </form>
        </div>
    );
}
