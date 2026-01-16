"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import useSummernote from "../../_hooks/useSummernote";

export default function CategoryAdd() {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [parent_id, setParent_id] = useState("");
    const [sort_order, setSortOrder] = useState("");
    const [description, setDescription] = useState("");

    const [image, setImage] = useState(null);
    const [status, setStatus] = useState(1);

    const descriptionRef = useSummernote({
        height: 300,
        placeholder: "Mô tả danh mục...",
        onChange: setDescription,
    });

    useEffect(() => {
        fetch("http://localhost:8000/api/category")
            .then((res) => res.json())
            .then((data) => {
                setCategories(data.data);
                console.log('data', data);
            })
            .catch((err) => console.error("Error:", err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("slug", slug);
        formData.append("description", description);
        formData.append("parent_id", parent_id || 0);
        formData.append("sort_order", sort_order || 0);
        if (image) formData.append("image", image);
        formData.append("status", status);

        try {
            const res = await axios.post("http://localhost:8000/api/category", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            const data = res.data;

            toast.success(data.message || "Thêm danh mục thành công!");
            console.log("Thêm thành công:", data);
            setName("");
            setSlug("");
            setParent_id("");
            setSortOrder("");
            setImage(null);
            setStatus(1);
            window.location.href = "/admin/category";

        } catch (err) {
            console.error("Lỗi khi thêm:", err);

            if (err.response?.status === 422) {
                const errors = err.response.data.errors;
                const firstError = Object.values(errors)[0][0];
                toast.warning(firstError);
            }

            else if (err.response?.data?.message) {
                toast.error(err.response.data.message);
            }

            else {
                toast.error("Thêm danh mục thất bại!");
            }
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white text-black shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
            <div
                className="flex justify-between">
                <h2 className="text-2xl text-black font-bold mb-4">Thêm danh mục</h2>
                <a
                    href="/admin/category"
                    className="bg-blue-600 text-white px-3 py-2 rounded inline-block mb-4"
                >
                    ← Quay lại danh sách
                </a>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Tên danh mục</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border rounded w-full py-2 px-3"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Slug</label>
                <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="border rounded w-full py-2 px-3"
                    required
                />
            </div>
            <div className="mb-4 text-black">
                <label className="block text-gray-700">Danh mục cha</label>
                <select
                    name="parent_id"
                    placeholder="Danh mục cha"
                    value={parent_id}
                    onChange={(e) => setParent_id(e.target.value)}
                    className="form-select border rounded py-2 px-3 w-full">
                    <option className="" value="">-- Không có --</option>
                    {categories.map((item) => (
                        <option className="text-black" key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}

                </select>
            </div>
            <div className="mb-4 text-black">
                <label className="block text-gray-700">Mô tả</label>
                <textarea
                    ref={descriptionRef}
                    name="description"
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Vị trí</label>
                <select
                    name="sort_order"
                    value={sort_order}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="form-select border rounded py-2 px-3 w-full">
                    <option value="0">-- Chọn vị trí --</option>
                    {categories.map((item) => (
                        <option key={item.id} value={item.id + 1}>
                            Sau {item.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Hình ảnh</label>
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="border rounded w-full py-2 px-3"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Trạng thái</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="border rounded w-full py-2 px-3"
                >
                    <option value="1">Hiển thị</option>
                    <option value="0">Ẩn</option>
                </select>
            </div>

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Lưu
            </button>
        </form>
    );
}
