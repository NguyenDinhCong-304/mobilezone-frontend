"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

export default function ProductShowPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/product/${id}`)
            .then((res) => setProduct(res.data.data || res.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <p>Đang tải sản phẩm...</p>;
    if (!product) return <p>Không tìm thấy sản phẩm</p>;

    return (
        <section className="wrapper text-black max-w-5xl mx-auto">
            <h3 className="text-3xl font-bold mb-6">
                Chi tiết sản phẩm
            </h3>

            <div className="bg-white p-6 rounded shadow grid grid-cols-2 gap-6">
                {/* ẢNH */}
                <div>
                    {product.thumbnail && (
                        <img
                            src={`http://localhost:8000/storage/${product.thumbnail}`}
                            className="w-full rounded border"
                        />
                    )}
                </div>

                {/* THÔNG TIN */}
                <div className="space-y-2">
                    <p><b>ID:</b> {product.id}</p>
                    <p><b>Tên:</b> {product.name}</p>
                    <p><b>Slug:</b> {product.slug}</p>
                    <p><b>Giá:</b> {product.price?.toLocaleString()} đ</p>
                    <p><b>Số lượng:</b> {product.qty}</p>
                    <p><b>Danh mục:</b> {product.category?.name}</p>
                    <p><b>Thương hiệu:</b> {product.brand?.name}</p>
                    <p>
                        <b>Trạng thái:</b>{" "}
                        {product.status === 1 ? "Hiển thị" : "Ẩn"}
                    </p>
                </div>

                {/* MÔ TẢ */}
                <div className="col-span-2">
                    <h4 className="font-semibold mb-2">Mô tả</h4>
                    <div className="border p-3 rounded bg-gray-50">
                        {product.description}
                    </div>
                </div>

                {/* NỘI DUNG */}
                <div className="col-span-2">
                    <h4 className="font-semibold mb-2">Chi tiết</h4>
                    <div
                        className="border p-3 rounded bg-gray-50"
                        dangerouslySetInnerHTML={{
                            __html: product.content,
                        }}
                    />
                </div>
            </div>

            <a
                href="/admin/product"
                className="inline-block mt-6 bg-gray-600 text-white px-4 py-2 rounded"
            >
                ← Quay lại danh sách
            </a>
        </section>
    );
}
