"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { notify } from "../../../../../utils/notify";
import ProductSelector from "../../../_component/ProductSelector";

export default function EditProductSale() {
  const { id } = useParams();
  const router = useRouter();

  const [saleData, setSaleData] = useState({
    name: "",
    product_id: "",
    price_sale: "",
    date_begin: "",
    date_end: "",
    status: 1,
  });

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isClient, setIsClient] = useState(false); // Flag để render client-only

  // Bật isClient sau khi component mount
  useEffect(() => setIsClient(true), []);

  // Lấy thông tin khuyến mãi cần sửa
  useEffect(() => {
    if (!id) return;

    const fetchSale = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/productsale/${id}`);
        const s = res.data;

        setSaleData({
          name: s.name,
          product_id: s.product_id,
          price_sale: s.price_sale,
          date_begin: s.date_begin,
          date_end: s.date_end,
          status: s.status,
        });

        // Khởi tạo selectedProduct để ProductSelector hiển thị tên sản phẩm
        if (s.product) {
          setSelectedProduct({ value: s.product.id, label: s.product.name });
        }
      } catch (err) {
        console.error("Lỗi tải khuyến mãi:", err);
        setError("Không thể tải dữ liệu khuyến mãi.");
      }
    };

    fetchSale();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.put(`http://localhost:8000/api/productsale/${id}`, saleData);
      notify.success("Cập nhật khuyến mãi thành công!");
      router.push("/admin/product-sale");
    } catch (err) {
      console.error(err);
      if (err.response?.status === 422) {
        const errors = err.response.data.errors;
        const messages = Object.values(errors).flat().join("\n• ");
        notify.error(`Dữ liệu không hợp lệ:\n• ${messages}`);
      } else if (err.response?.status === 404) {
        notify.error("Không tìm thấy khuyến mãi cần cập nhật!");
      } else {
        notify.error(
          err.response?.data?.message || "Có lỗi xảy ra khi cập nhật khuyến mãi!"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto bg-white shadow rounded p-6 text-black">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Sửa khuyến mãi</h2>
        <a
          href="/admin/product-sale"
          className="bg-blue-600 px-3 py-2 text-white rounded hover:bg-blue-700"
        >
          ← Quay lại danh sách
        </a>
      </div>

      {error && <p className="text-red-600 mb-3 whitespace-pre-line">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Tên khuyến mãi */}
        <div>
          <label className="block mb-1 font-medium">Tên khuyến mãi</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={saleData.name}
            onChange={(e) => setSaleData({ ...saleData, name: e.target.value })}
            required
          />
        </div>

        {/* Sản phẩm (client-only để tránh hydration error) */}
        <div>
          <label className="block mb-1 font-medium">Sản phẩm</label>
          {isClient && (
            <ProductSelector
              value={selectedProduct}
              onChange={(option) => {
                setSelectedProduct(option);
                setSaleData({ ...saleData, product_id: option.value });
              }}
            />
          )}
        </div>

        {/* Giá khuyến mãi */}
        <div>
          <label className="block mb-1 font-medium">Giá khuyến mãi</label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2"
            value={saleData.price_sale}
            onChange={(e) =>
              setSaleData({ ...saleData, price_sale: e.target.value })
            }
            required
          />
        </div>

        {/* Ngày bắt đầu */}
        <div>
          <label className="block mb-1 font-medium">Ngày bắt đầu</label>
          <input
            type="date"
            value={saleData.date_begin ? saleData.date_begin.split(" ")[0] : ""}
            onChange={(e) =>
              setSaleData({ ...saleData, date_begin: e.target.value })
            }
          />
        </div>

        {/* Ngày kết thúc */}
        <div>
          <label className="block mb-1 font-medium">Ngày kết thúc</label>
          <input
            type="date"
            value={saleData.date_end ? saleData.date_end.split(" ")[0] : ""}
            onChange={(e) =>
              setSaleData({ ...saleData, date_end: e.target.value })
            }
          />
        </div>

        {/* Trạng thái */}
        <div>
          <label className="block mb-1 font-medium">Trạng thái</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={saleData.status}
            onChange={(e) =>
              setSaleData({ ...saleData, status: e.target.value })
            }
          >
            <option value="1">Hoạt động</option>
            <option value="0">Ngừng</option>
          </select>
        </div>

        {/* Nút lưu */}
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          {loading ? "Đang lưu..." : "Cập nhật khuyến mãi"}
        </button>
      </form>
    </div>
  );
}
