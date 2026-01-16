"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function EditBrand() {
    const { id } = useParams();
    const router = useRouter();

    const [brands, setBrands] = useState([]);
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [country, setCountry] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState(1);
    const [logo, setLogo] = useState(null);
    const [loading, setLoading] = useState(true);

    // Lấy dữ liệu brand hiện tại
    useEffect(() => {
        const fetchBrand = async () => {
            try {
                const res = await fetch(`http://localhost:8000/api/brand/${id}`);
                if (!res.ok) throw new Error("Không tìm thấy thương hiệu");
                const json = await res.json();
                const brand = json.data ?? json;

                setName(brand.name || "");
                setSlug(brand.slug || "");
                setCountry(brand.country);
                setDescription(brand.description ?? "");
                setStatus(brand.status ?? 1);
                setLogo(brand.logo);
            } catch (err) {
                toast.error("Lỗi: " + err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchBrand();
    }, [id]);

    // Lấy danh sách để chọn parent_id
    useEffect(() => {
        fetch("http://localhost:8000/api/brand")
            .then((res) => res.json())
            .then((data) => setBrands(data.data))
            .catch((err) => console.error("Error:", err));
    }, []);

    // Submit update
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("slug", slug);
        formData.append("country", country);
        formData.append("description", description);
        formData.append("status", status);
        if (logo) formData.append("logo", logo);
        formData.append("_method", "PUT"); // Laravel cần dòng này

        try {
            const res = await fetch(`http://localhost:8000/api/brand/${id}`, {
                method: "POST", // gửi POST thay vì PUT
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Cập nhật thất bại");
            }

            toast.success(data.message || "Cập nhật thương hiệu thành công!");
            router.push("/admin/brand");
        } catch (err) {
           toast.error(err.message || "Lỗi khi cập nhật!");
           console.error(err);
        }
    };

    if (loading) return <p className="text-black">Đang tải...</p>;

    return (
        <div className="p-6 text-black">
            <div>
                <h3 className="border-b text-3xl font-semibold mb-4">Danh mục</h3>
            </div>
            <div className="flex justify-between">
                <h1 className="text-xl font-semibold mb-4">Chỉnh sửa danh mục</h1>
                <a
                    href="/admin/category"
                    className="bg-blue-600 text-white px-3 py-2 rounded inline-block mb-4"
                >
                    ← Quay lại danh sách
                </a>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block">Tên thương hiệu</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border px-3 py-2 w-full rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block">Slug</label>
                    <input
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className="border px-3 py-2 w-full rounded"
                    />
                </div>

                <div>
                    <label className="block">Quốc gia</label>
                    <input
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="border px-3 py-2 w-full rounded"
                    />
                </div>

                <div>
                    <label className="block">Mô tả</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border px-3 py-2 w-full rounded"
                    />
                </div>

                <div>
                    <label className="block">Hình ảnh</label>
                    {/* Hình ảnh hiện tại: */}
                    {logo && (
                        <img
                            src={`http://localhost:8000/storage/${logo}`}
                            alt="Hình hiện tại"
                            className="w-32 h-32 object-cover mb-3"
                        />
                    )}

                    <input
                        type="file"
                        onChange={(e) => setLogo(e.target.files[0])}
                        className="border px-3 py-2 w-full rounded"
                    />
                </div>

                <div>
                    <label className="block">Trạng thái</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(Number(e.target.value))}
                        className="border px-3 py-2 w-full rounded"
                    >
                        <option value={1}>Hiển thị</option>
                        <option value={0}>Ẩn</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    Lưu thay đổi
                </button>
            </form>
        </div>
    );
}
