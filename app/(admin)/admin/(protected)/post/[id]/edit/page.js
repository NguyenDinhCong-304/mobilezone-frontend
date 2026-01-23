"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import slugify from "slugify";
import { notify } from "@/app/utils/notify";
import adminAxios from "@/app/utils/adminAxios";

export default function EditPost() {
    const { id } = useParams();
    const router = useRouter();

    const [postTitle, setPostTitle] = useState("");
    const [postSlug, setPostSlug] = useState("");
    const [topicId, setTopicId] = useState("");
    const [content, setContent] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState(1);
    const [image, setImage] = useState("");
    const [newImage, setNewImage] = useState(null);

    const [topics, setTopics] = useState([]);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Lấy danh sách chủ đề
    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const res = await adminAxios.get("/topic");
                console.log("API topic response:", res.data);
                const topicsData = Array.isArray(res.data.data)
                    ? res.data.data
                    : Array.isArray(res.data)
                        ? res.data
                        : [];
                setTopics(topicsData);
            } catch (err) {
                console.error(err);
                notify.error("Không thể tải chủ đề!");
            }
        };
        fetchTopics();
    }, []);


    //Lấy thông tin bài viết
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await adminAxios.get(`/post/${id}`);
                const data = res.data.data; //Backend trả về { data: {...} }

                setPostTitle(data.title);
                setPostSlug(data.slug);
                setTopicId(data.topic_id);
                setContent(data.content);
                setDescription(data.description);
                setStatus(data.status);
                if (data.image) {
                    setImage(`http://localhost:8000/storage/${data.image}`);
                }
            } catch (err) {
                console.error(err);
                notify.error("Không thể tải dữ liệu bài viết.");
            }
        };
        if (id) fetchPost();
    }, [id]);

    // Xử lý ảnh mới
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    // Gửi dữ liệu cập nhật
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("title", postTitle);
            formData.append("slug", postSlug || slugify(postTitle, { lower: true }));
            formData.append("topic_id", topicId);
            formData.append("content", content);
            formData.append("description", description);
            formData.append("status", status);

            if (newImage) formData.append("image", newImage);

            await adminAxios.post(`/post/${id}?_method=PUT`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            notify.success("Cập nhật bài viết thành công!");
            router.push("/admin/post");
        } catch (err) {
            console.error(err);
            notify.error(err.response?.data?.error || "Có lỗi xảy ra khi cập nhật.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-white shadow-md rounded-lg text-black">
            <h2 className="text-2xl font-semibold mb-4">Cập nhật bài viết</h2>

            {error && <div className="text-red-600 mb-2">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Tiêu đề */}
                <div>
                    <label className="block font-medium mb-1">Tiêu đề bài viết</label>
                    <input
                        value={postTitle}
                        onChange={(e) => setPostTitle(e.target.value)}
                        className="w-full border rounded-lg p-2"
                        placeholder="Nhập tiêu đề bài viết"
                        required
                    />
                </div>

                {/* Chủ đề */}
                <div>
                    <label className="block font-medium mb-1">Chủ đề bài viết</label>
                    <select
                        value={topicId}
                        onChange={(e) => setTopicId(e.target.value)}
                        className="w-full border rounded-lg p-2"
                    >
                        <option value="">-- Chọn chủ đề --</option>
                        {topics.map((t) => (
                            <option key={t.id} value={t.id}>
                                {t.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Slug */}
                <div>
                    <label className="block font-medium mb-1">Slug</label>
                    <input
                        value={postSlug}
                        onChange={(e) => setPostSlug(e.target.value)}
                        className="w-full border rounded-lg p-2"
                        placeholder="Ví dụ: bai-viet-moi"
                    />
                </div>

                {/* Mô tả */}
                <div>
                    <label className="block font-medium mb-1">Mô tả ngắn</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border rounded-lg p-2"
                        rows={3}
                        placeholder="Nhập mô tả ngắn cho bài viết"
                    />
                </div>

                {/* Ảnh hiện tại */}
                {image && (
                    <div>
                        <label className="block mb-1 font-medium">Ảnh hiện tại</label>
                        <img src={image} alt="Ảnh bài viết" className="max-w-xs border rounded" />
                    </div>
                )}

                {/* Ảnh mới */}
                <div>
                    <label className="block font-medium mb-1">Ảnh mới</label>
                    <input type="file" onChange={handleImageChange} />
                    {preview && (
                        <img
                            src={preview}
                            alt="Preview"
                            className="mt-2 w-40 h-40 object-cover rounded-lg border"
                        />
                    )}
                </div>

                {/* Nội dung */}
                <div>
                    <label className="block font-medium mb-1">Nội dung</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full border rounded-lg p-2"
                        rows={8}
                        placeholder="Nhập nội dung bài viết..."
                    />
                </div>

                {/* Trạng thái */}
                <div>
                    <label className="block font-medium mb-1">Trạng thái</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full border rounded-lg p-2"
                    >
                        <option value={0}>Ẩn</option>
                        <option value={1}>Hiện</option>
                    </select>
                </div>

                {/* Nút lưu */}
                <button
                    type="submit"
                    disabled={loading}
                    className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    {loading ? "Đang lưu..." : "Lưu bài viết"}
                </button>
            </form>
        </div>
    );
}
