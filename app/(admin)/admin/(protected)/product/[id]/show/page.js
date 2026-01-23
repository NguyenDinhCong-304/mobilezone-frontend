"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import adminAxios from "@/app/utils/adminAxios";

export default function ProductShow() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);

    useEffect(() => {
      if (!id) return;

      adminAxios
        .get(`/product/${id}`)
        .then((res) => {
          setProduct(res.data.data || res.data);
        })
        .catch(() => {
          alert("Không tìm thấy sản phẩm!");
          router.push("/admin/product");
        });
    }, [id]);

  if (!product) return <p>Đang tải...</p>;
  return (
    <div className="bg-white p-6 rounded shadow text-black space-y-4">
      <h1 className="text-xl font-bold">Chi tiết sản phẩm</h1>

      <div>
        <strong>Tên:</strong> {product.name}
      </div>

      <div>
        <strong>Slug:</strong> {product.slug}
      </div>

      <div>
        <strong>Danh mục:</strong> {product.category?.name}
      </div>

      <div>
        <strong>Thương hiệu:</strong> {product.brand?.name}
      </div>

      <div>
        <strong>Giá bán:</strong> {Number(product.price_buy).toLocaleString()} ₫
      </div>
      {/* <div>
        <strong>Giá nhập:</strong>
        {priceRoot ? (
          <span className="text-gray-700">
            {Number(priceRoot).toLocaleString()} ₫
          </span>
        ) : (
          <span className="text-gray-400">Chưa nhập kho</span>
        )}
      </div>
      <div>
        <strong>Giá khuyến mãi:</strong>
        {priceSale ? (
          <span className="text-red-600 font-semibold">
            {Number(priceSale).toLocaleString()} ₫
          </span>
        ) : (
          <span className="text-gray-400">Không có</span>
        )}
      </div>
      <div>
        <strong>Tồn kho:</strong>{" "}
        <span className={qty > 0 ? "text-green-600" : "text-red-600"}>
          {qty} sản phẩm
        </span>
      </div> */}
      <div>
        <strong>Trạng thái:</strong> {product.status ? "Hiển thị" : "Ẩn"}
      </div>

      <div>
        <strong>Mô tả ngắn:</strong>
        <p className="mt-1">{product.description}</p>
      </div>

      <div>
        <strong>Nội dung:</strong>
        <div
          className="prose max-w-none break-words overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: product.content }}
        />
      </div>

      {/* Ảnh chính */}
      {product.thumbnail && (
        <div>
          <strong>Ảnh chính:</strong>
          <img
            src={`http://localhost:8000/storage/${product.thumbnail}`}
            className="w-48 mt-2 border rounded"
          />
        </div>
      )}

      {/* Ảnh phụ */}
      {product.images?.length > 0 && (
        <div>
          <strong>Ảnh phụ:</strong>
          <div className="flex gap-3 flex-wrap mt-2">
            {product.images.map((img) => (
              <img
                key={img.id}
                src={`http://localhost:8000/storage/${img.image}`}
                className="w-32 h-32 object-cover border rounded"
              />
            ))}
          </div>
        </div>
      )}

      {/* Thuộc tính */}
      {product.attributes?.length > 0 && (
        <div>
          <strong>Thuộc tính:</strong>
          <ul className="list-disc ml-6 mt-1">
            {product.attributes.map((a, i) => (
              <li key={i}>
                {a.name}: {a.pivot?.value}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={() => router.back()}
        className="px-4 py-2 bg-gray-300 rounded"
      >
        Quay lại
      </button>
    </div>
  );
}
