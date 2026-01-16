"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import slugify from "slugify";
import useSummernote from "../../../_hooks/useSummernote";
import { notify } from "../../../../../utils/notify";

export default function ProductEdit() {
    const { id } = useParams();
    const router = useRouter();

    // ===== States sản phẩm =====
    const [productName, setProductName] = useState("");
    const [productSlug, setProductSlug] = useState("");
    const [catId, setCatId] = useState("");
    const [brandId, setBrandId] = useState("");
    const [price, setPrice] = useState("");
    const [content, setContent] = useState("");
    const [description, setDescription] = useState("");
    const [thumbnail, setThumbnail] = useState(""); // URL thumbnail
    const [newThumbnail, setNewThumbnail] = useState(null); // file thumbnail mới
    const [productImages, setProductImages] = useState([]); // [{id, url, file, toDelete}]
    const [status, setStatus] = useState(1);
    const [attributes, setAttributes] = useState([{ name: "", value: "" }]);

    // Summernote
    const contentRef = useSummernote({ height: 150, value: content, onChange: setContent });
    const descriptionRef = useSummernote({ height: 150, value: description, onChange: setDescription });

    // ===== Dữ liệu liên quan =====
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [attributeList, setAttributeList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // ===== Lấy danh mục =====
    useEffect(() => {
        axios.get("http://localhost:8000/api/category")
            .then(res => setCategories(res.data.data))
            .catch(err => console.error(err));
    }, []);

    // ===== Lấy thương hiệu =====
    useEffect(() => {
        axios.get("http://localhost:8000/api/brand")
            .then(res => setBrands(res.data.data))
            .catch(err => console.error(err));
    }, []);

    // ===== Lấy thuộc tính =====
    useEffect(() => {
        axios.get("http://localhost:8000/api/attribute")
            .then(res => setAttributeList(res.data))
            .catch(err => console.error(err));
    }, []);

    // ===== Lấy dữ liệu sản phẩm =====
    useEffect(() => {
        if (!id) return;
        axios.get(`http://localhost:8000/api/product/${id}`)
            .then(res => {
                const data = res.data.data || res.data;
                setProductName(data.name);
                setProductSlug(data.slug);
                setCatId(data.category_id);
                setBrandId(data.brand_id);
                setPrice(data.price_buy);
                setContent(data.content);
                setDescription(data.description);
                setThumbnail(data.thumbnail ? `http://localhost:8000/storage/${data.thumbnail}` : "");

                if (Array.isArray(data.attributes)) {
                    setAttributes(data.attributes.map(attr => ({
                        name: attr.name || "",
                        value: attr.pivot?.value || attr.value || ""
                    })));
                }

                if (Array.isArray(data.images)) {
                    setProductImages(data.images.map(img => ({
                        id: img.id,
                        url: `http://localhost:8000/storage/${img.image}`,
                        file: null,
                        toDelete: false
                    })));
                }
            })
            .catch(err => {
                console.error(err);
                setError("Không thể tải dữ liệu sản phẩm");
            });
    }, [id]);

    // ===== Submit =====
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const formData = new FormData();
            formData.append("name", productName);
            formData.append("slug", productSlug);
            formData.append("category_id", catId);
            formData.append("brand_id", brandId);
            formData.append("price_buy", price);
            formData.append("content", content);
            formData.append("description", description);
            formData.append("status", status);
            formData.append("attributes", JSON.stringify(attributes));

            // Thumbnail
            if (newThumbnail) formData.append("thumbnail", newThumbnail);

            // Xử lý ảnh phụ
            productImages.forEach(img => {
                if (img.toDelete) return; // ảnh xóa gửi riêng
                if (img.file) {
                    formData.append("images[]", img.file); // dùng [] để Laravel parse thành array
                    // Nếu muốn biết là ảnh cũ hay mới, bạn có thể gửi ID kèm JSON:
                    // formData.append("images_meta[]", JSON.stringify({id: img.id || null}));
                }
            });

            // Gửi danh sách id ảnh cần xóa
            const deletedIds = productImages.filter(img => img.toDelete).map(img => img.id);
            if (deletedIds.length > 0) formData.append("deleted_images", JSON.stringify(deletedIds));

            const res = await axios.post(
                `http://localhost:8000/api/product/${id}?_method=PUT`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            notify.success(res.data?.message || "Cập nhật sản phẩm thành công!");
            router.push("/admin/product");
        } catch (err) {
            console.error(err);
            const msg = err.response?.data?.message || "Có lỗi xảy ra khi cập nhật!";
            setError(msg);
            notify.error(msg);
        } finally {
            setLoading(false);
        }
    };

    // ===== Render =====
    return (
        <div className="w-full mx-auto bg-white shadow rounded p-6 text-black">
            <h2 className="text-xl font-semibold mb-4">Chỉnh sửa sản phẩm</h2>
            {error && <p className="text-red-600 mb-3">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Tên & Slug */}
                <div>
                    <label className="block">Tên sản phẩm</label>
                    <input
                        className="w-full border rounded px-3 py-2"
                        value={productName}
                        onChange={e => {
                            const val = e.target.value;
                            setProductName(val);
                            setProductSlug(slugify(val, { lower: true, strict: true }));
                        }}
                        required
                    />
                </div>
                <div>
                    <label className="block">Slug</label>
                    <input className="w-full border rounded px-3 py-2 bg-gray-100" value={productSlug} readOnly />
                </div>

                {/* Danh mục & Thương hiệu */}
                <div>
                    <label>Danh mục</label>
                    <select value={catId} onChange={e => setCatId(e.target.value)} className="w-full border rounded px-3 py-2">
                        <option value="">-- Chọn danh mục --</option>
                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                </div>
                <div>
                    <label>Thương hiệu</label>
                    <select value={brandId} onChange={e => setBrandId(e.target.value)} className="w-full border rounded px-3 py-2">
                        <option value="">-- Chọn thương hiệu --</option>
                        {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                    </select>
                </div>

                {/* Giá */}
                <div>
                    <label>Giá bán</label>
                    <input type="number" className="w-full border rounded px-3 py-2" value={price} onChange={e => setPrice(e.target.value)} />
                </div>

                {/* Mô tả & Nội dung */}
                <div>
                    <label>Mô tả</label>
                    <textarea className="w-full border rounded px-3 py-2 h-24" value={description} onChange={e => setDescription(e.target.value)} />
                </div>
                <div>
                    <label>Nội dung chi tiết</label>
                    <textarea ref={contentRef} />
                </div>

                {/* Thumbnail */}
                <div>
                    <label>Ảnh chính</label>
                    {thumbnail && !newThumbnail && <img src={thumbnail} className="w-32 mb-2 border rounded" />}
                    {newThumbnail && <img src={URL.createObjectURL(newThumbnail)} className="w-32 mb-2 border rounded" />}
                    <input className="border px-4 py-2 rounded-xl" type="file" onChange={e => setNewThumbnail(e.target.files[0])} />
                </div>

                {/* Ảnh phụ */}
                <div>
                    <label className="font-semibold">Ảnh sản phẩm</label>
                    <div className="flex gap-4 flex-wrap mt-2">
                        {productImages.map((img, idx) => (
                            <div key={img.id || idx} className="flex flex-col items-center">
                                <div className="w-32 h-32 border rounded overflow-hidden mb-1">
                                    <img
                                        src={img.file ? URL.createObjectURL(img.file) : img.url}
                                        className={`w-full h-full object-cover ${img.toDelete ? "opacity-50" : ""}`}
                                    />
                                </div>
                                {!img.toDelete && (
                                    <>
                                        <input
                                        className="border px-4 py-2 rounded-xl"
                                            type="file"
                                            onChange={e => {
                                                const files = e.target.files;
                                                if (files.length > 0) {
                                                    const newImgs = [...productImages];
                                                    newImgs[idx].file = files[0];
                                                    setProductImages(newImgs);
                                                }
                                            }}
                                        />
                                        <button
                                            type="button"
                                            className="border rounded-xl bg-red-600 py-1 px-6 text-white mt-1"
                                            onClick={() => {
                                                const newImgs = [...productImages];
                                                newImgs[idx].toDelete = true;
                                                setProductImages(newImgs);
                                            }}
                                        >
                                            Xóa
                                        </button>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Thuộc tính */}
                <div>
                    {attributes.map((attr, idx) => (
                        <div key={idx} className="flex gap-2 mb-2">
                            <select
                                className="flex-1 border rounded px-3 py-2"
                                value={attr.name || ""}
                                onChange={e => {
                                    const newAttrs = [...attributes];
                                    newAttrs[idx].name = e.target.value;
                                    setAttributes(newAttrs);
                                }}
                            >
                                <option value="">-- Chọn thuộc tính --</option>
                                {attributeList.map(a => <option key={a.id} value={a.name}>{a.name}</option>)}
                            </select>
                            <input
                                type="text"
                                placeholder="Giá trị"
                                className="flex-1 border rounded px-3 py-2"
                                value={attr.value || ""}
                                onChange={e => {
                                    const newAttrs = [...attributes];
                                    newAttrs[idx].value = e.target.value;
                                    setAttributes(newAttrs);
                                }}
                            />
                            <button
                                type="button"
                                className="text-red-600 px-2"
                                onClick={() => setAttributes(attributes.filter((_, i) => i !== idx))}
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        onClick={() => setAttributes([...attributes, { name: "", value: "" }])}
                    >
                        + Thêm thuộc tính
                    </button>
                </div>

                {/* Trạng thái */}
                <div>
                    <label>Trạng thái</label>
                    <select value={String(status)} onChange={e => setStatus(Number(e.target.value))} className="w-full border rounded px-3 py-2">
                        <option value="1">Hiển thị</option>
                        <option value="0">Ẩn</option>
                    </select>
                </div>

                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    {loading ? "Đang lưu..." : "Cập nhật sản phẩm"}
                </button>
            </form>
        </div>
    );
}
