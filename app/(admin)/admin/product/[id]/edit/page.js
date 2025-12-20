"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import slugify from "slugify";
import useSummernote from "../../../_hooks/useSummernote";

export default function ProductEdit() {
    const { id } = useParams();
    const router = useRouter();

    // State sản phẩm
    const [productName, setProductName] = useState("");
    const [productSlug, setProductSlug] = useState("");
    const [catId, setCatId] = useState("");
    const [brandId, setBrandId] = useState("");
    const [price, setPrice] = useState("");
    const [content, setContent] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [newImage, setNewImage] = useState(null);
    const [attributes, setAttributes] = useState([{ name: "", value: "" }]);

    const contentRef = useSummernote({
        height: 150,
        value: content,
        onChange: setContent,
    });

    const descriptionRef = useSummernote({
        height: 150,
        value: description,
        onChange: setDescription,
    });

    // State danh mục
    const [categories, setCategories] = useState([]);

    const [brands, setBrands] = useState([]);

    const [attributeList, setAttributeList] = useState([]);

    // Trạng thái
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Lấy danh sách danh mục từ DB
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/category");
                setCategories(res.data.data);
            } catch (err) {
                console.error(err);
                setError("Không thể tải danh mục");
            }
        };
        fetchCategories();
    }, []);

    // Lấy danh sách thương hiệu từ DB
    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/brand");
                setBrands(res.data.data);
            } catch (err) {
                console.error(err);
                setError("Không thể tải thương hiệu");
            }
        };
        fetchBrands();
    }, []);

    // Lấy danh sách thuộc tính từ DB
    useEffect(() => {
        const fetchAttributes = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/attribute");
                setAttributeList(res.data);
            } catch (err) {
                console.error("Lỗi khi tải thuộc tính:", err);
            }
        };
        fetchAttributes();
    }, []);

    // Lấy thông tin sản phẩm
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/product/${id}`);
                const data = res.data;

                setProductName(data.name);
                setProductSlug(data.slug);
                setCatId(data.category_id);
                setBrandId(data.brand_id);
                setPrice(data.price_buy);
                setContent(data.content);
                setDescription(data.description);
                setImage(`http://localhost:8000/storage/${data.thumbnail}`);
                if (data.attributes && Array.isArray(data.attributes)) {
                    const formatted = data.attributes.map(attr => ({
                        name: attr.name || "",
                        value: attr.pivot?.value || attr.value || "",
                    }));
                    setAttributes(formatted);
                } else {
                    setAttributes([{ name: "", value: "" }]);
                }

                console.log("Product data:", data);
            } catch (err) {
                console.error(err);
                setError("Không thể tải dữ liệu sản phẩm.");
            }
        };
        if (id) fetchProduct();
    }, [id]);

    // Gửi dữ liệu cập nhật
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("name", productName);
            formData.append("slug", productSlug);
            formData.append("category_id", catId);
            formData.append("brand_id", brandId);
            formData.append("price_buy", price);
            formData.append("content", content);
            formData.append("description", description);
            formData.append("status", 1);

            if (newImage) {
                formData.append("thumbnail", newImage);
            }

            //Gửi attributes
            formData.append("attributes", JSON.stringify(attributes));

            await axios.post(`http://localhost:8000/api/product/${id}?_method=PUT`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            alert("Cập nhật sản phẩm thành công!");
            router.push("/admin/product");
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || "Có lỗi xảy ra khi cập nhật.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full  mx-auto bg-white shadow rounded p-6 text-black">
            <div className="flex justify-between">
                <h2 className="text-xl font-semibold mb-4">Chỉnh sửa sản phẩm</h2>
                <a href="/admin/product" className="bg-blue-600 px-1 py-2 inline-block mb-2 rounded text-white">← Quay lại danh sách</a>
            </div>


            {error && <p className="text-red-600 mb-3">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Tên sản phẩm */}
                <div>
                    <label className="block mb-1 font-medium">Tên sản phẩm</label>
                    <input
                        className="w-full border rounded px-3 py-2"
                        value={productName}
                        onChange={(e) => {
                            const name = e.target.value;
                            setProductName(name);
                            setProductSlug(slugify(name, { lower: true, strict: true }));
                        }}
                        required
                    />
                </div>

                {/* Slug */}
                <div>
                    <label className="block mb-1 font-medium">Slug</label>
                    <input
                        type="text"
                        className="w-full border rounded px-3 py-2 bg-gray-100"
                        value={productSlug}
                        readOnly
                    />
                </div>

                {/* Danh mục */}
                <div>
                    <label className="block mb-1 font-medium">Danh mục</label>
                    <select
                        className="w-full border rounded px-3 py-2"
                        value={catId}
                        onChange={(e) => setCatId(e.target.value)}
                        required
                    >
                        <option value="">-- Chọn danh mục --</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/*Thương hiệu*/}
                <div>
                    <label className="block mb-1 font-medium">Thương hiệu</label>
                    <select
                        className="w-full border rounded px-3 py-2"
                        value={brandId}
                        onChange={(e) => setBrandId(e.target.value)}
                        required
                    >
                        <option value="">-- Chọn thương hiệu --</option>
                        {brands.map((brand) => (
                            <option key={brand.id} value={brand.id}>
                                {brand.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Giá */}
                <div>
                    <label className="block mb-1 font-medium">Giá bán</label>
                    <input
                        className="w-full border rounded px-3 py-2"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>

                {/* Mô tả */}
                <div>
                    <label className="block mb-1 font-medium">Mô tả</label>
                    <textarea ref={contentRef} />

                </div>

                {/* Nội dung */}
                <div>
                    <label className="block mb-1 font-medium">Nội dung chi tiết</label>
                    <textarea ref={descriptionRef} />

                </div>

                {/* Ảnh hiện tại */}
                {image && (
                    <div>
                        <label className="block mb-1 font-medium">Ảnh hiện tại</label>
                        <img
                            src={image}
                            alt="Ảnh sản phẩm"
                            className="max-w-xs border rounded"
                        />
                    </div>
                )}

                {/* Ảnh mới */}
                <div>
                    <label className="block mb-1 font-medium">Ảnh mới (tùy chọn)</label>
                    <input
                        className="w-full border rounded px-3 py-2"
                        type="file"
                        accept="image/*"
                        // multiple
                        onChange={(e) => setNewImage(e.target.files[0])}
                    />
                </div>

                {/* Thuộc tính sản phẩm */}
                <div>
                    {attributes.map((attr, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                            <select
                                className="flex-1 border rounded px-3 py-2"
                                value={attr.name || ""}
                                onChange={(e) => {
                                    const newAttrs = [...attributes];
                                    newAttrs[index].name = e.target.value;
                                    setAttributes(newAttrs);
                                }}
                            >
                                <option value="">-- Chọn thuộc tính --</option>
                                {attributeList.map((a) => (
                                    <option key={a.id} value={a.name}>
                                        {a.name}
                                    </option>
                                ))}
                            </select>

                            <input
                                type="text"
                                placeholder="Giá trị (vd: Đỏ)"
                                className="flex-1 border rounded px-3 py-2"
                                value={attr.value || ""}
                                onChange={(e) => {
                                    const newAttrs = [...attributes];
                                    newAttrs[index].value = e.target.value;
                                    setAttributes(newAttrs);
                                }}
                            />

                            <button
                                type="button"
                                onClick={() => setAttributes(attributes.filter((_, i) => i !== index))}
                                className="px-2 text-red-600"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() =>
                            setAttributes([...attributes, { name: "", value: "" }])
                        }
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        + Thêm thuộc tính
                    </button>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    {loading ? "Đang lưu..." : "Cập nhật sản phẩm"}
                </button>
            </form>
        </div>
    );
}
