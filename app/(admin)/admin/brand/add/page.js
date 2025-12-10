"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export default function BrandAdd() {
    const [brands, setBrands] = useState([]);
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [country, setCountry] = useState("");
    const [description, setDescription] = useState("");

    const [logo, setLogo] = useState(null);
    const [status, setStatus] = useState(1);

    useEffect(() => {
        fetch("http://localhost:8000/api/brand")
            .then((res) => res.json())
            .then((data) => {
                setBrands(data.data);
                console.log('data', data);
            })
            .catch((err) => console.error("Error:", err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("slug", slug);
        formData.append("country", country);
        formData.append("description", description);
        if (logo) formData.append("logo", logo);
        formData.append("status", status);

        try {
            const res = await axios.post("http://localhost:8000/api/brand", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            const data = res.data;

            toast.success(data.message || "Thêm thương hiệu thành công!");
            console.log("Thêm thành công:", data);
            setName("");
            setSlug("");
            setCountry("");
            setLogo(null);
            setStatus(1);
            window.location.href = "/admin/brand";

        } catch (err) {
            console.error("Lỗi khi thêm:", err);
            toast.error("Thêm thương hiệu thất bại!");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white text-black shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
            <div
                className="flex justify-between">
                <h2 className="text-2xl text-black font-bold mb-4">Thêm thương hiệu</h2>
                <a
                    href="/admin/brand"
                    className="bg-blue-600 text-white px-3 py-2 rounded inline-block mb-4"
                >
                    ← Quay lại danh sách
                </a>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Tên thương hiệu</label>
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
                <label className="block text-gray-700">Quốc gia</label>
                <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="border rounded w-full py-2 px-3"
                    required
                />
            </div>
            <div className="mb-4 text-black">
                <label className="block text-gray-700">Mô tả</label>
                <textarea
                    name="description"
                    placeholder="Mô tả"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border p-2 col-span-2 w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Hình ảnh</label>
                <input
                    type="file"
                    onChange={(e) => setLogo(e.target.files[0])}
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
