"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

export default function EditProductStore() {
    const { id } = useParams();
    const router = useRouter();

    const [storeData, setStoreData] = useState({
        product_id: "",
        price_root: "",
        qty: "",
        status: 1,
    });

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // ✅ Lấy danh sách sản phẩm
    useEffect(() => {
        axios.get("http://localhost:8000/api/product")
            .then(res => {
                setProducts(res.data.data ?? []); // lấy mảng products bên trong
            })
            .catch(err => console.error(err));
    }, []);

    // ✅ Lấy thông tin nhập kho cần sửa
    useEffect(() => {
        const fetchStore = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/productstore/${id}`);
                setStoreData({
                    product_id: res.data.product_id,
                    price_root: res.data.price_root,
                    qty: res.data.qty,
                    status: res.data.status,
                });
            } catch (err) {
                console.error("Lỗi tải nhập kho:", err);
                setError("Không thể tải dữ liệu nhập kho.");
            }
        };
        if (id) fetchStore();
    }, [id]);

    // ✅ Xử lý cập nhật nhập kho
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await axios.put(`http://localhost:8000/api/productstore/${id}`, storeData);
            alert("Cập nhật nhập kho thành công!");
            router.push("/admin/product-store");
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || "Có lỗi xảy ra khi cập nhật.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full mx-auto bg-white shadow rounded p-6 text-black">
            <div className="flex justify-between mb-4">
                <h2 className="text-xl font-semibold">Sửa nhập kho</h2>
                <a
                    href="/admin/product-store"
                    className="bg-blue-600 px-3 py-2 text-white rounded hover:bg-blue-700"
                >
                    ← Quay lại danh sách
                </a>
            </div>

            {error && <p className="text-red-600 mb-3">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Sản phẩm */}
                <div>
                    <label className="block mb-1 font-medium">Sản phẩm</label>
                    <select
                        className="w-full border rounded px-3 py-2"
                        value={storeData.product_id}
                        onChange={(e) =>
                            setStoreData({ ...storeData, product_id: e.target.value })
                        }
                        required
                    >
                        <option value="">-- Chọn sản phẩm --</option>
                        {products.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Giá nhập */}
                <div>
                    <label className="block mb-1 font-medium">Giá nhập</label>
                    <input
                        type="number"
                        className="w-full border rounded px-3 py-2"
                        value={storeData.price_root}
                        onChange={(e) =>
                            setStoreData({ ...storeData, price_root: e.target.value })
                        }
                        required
                    />
                </div>

                {/* Số lượng */}
                <div>
                    <label className="block mb-1 font-medium">Số lượng</label>
                    <input
                        type="number"
                        className="w-full border rounded px-3 py-2"
                        value={storeData.qty}
                        onChange={(e) =>
                            setStoreData({ ...storeData, qty: e.target.value })
                        }
                        required
                    />
                </div>

                {/* Trạng thái */}
                <div>
                    <label className="block mb-1 font-medium">Trạng thái</label>
                    <select
                        className="w-full border rounded px-3 py-2"
                        value={storeData.status}
                        onChange={(e) =>
                            setStoreData({ ...storeData, status: e.target.value })
                        }
                        required
                    >
                        <option value="1">Kích hoạt</option>
                        <option value="0">Tạm ẩn</option>
                    </select>
                </div>

                {/* Nút lưu */}
                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                    {loading ? "Đang lưu..." : "Cập nhật nhập kho"}
                </button>
            </form>
        </div>
    );
}
