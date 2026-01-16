"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ProductStoreCreate() {
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({
        product_id: "",
        price_root: "",
        qty: "",
        status: 1,
    });

    useEffect(() => {
        axios.get("http://localhost:8000/api/product")
            .then(res => setProducts(res.data.data || []));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8000/api/productstore", form);
            alert(res.data.message || "Thêm phiếu nhập thành công!");
            router.push("/admin/product-store");
        } catch (err) {
            console.error(err);
            alert("Lỗi khi thêm phiếu nhập, vui lòng thử lại!");
        }
    };

    return (
        <div>
            <h3 className="text-black mb-6 text-3xl border-b font-bold p-6">
                Thêm phiếu nhập kho
            </h3>
            <a href="/admin/product-store" className="bg-blue-600 px-1 py-2 inline-block mb-2 rounded">← Quay lại danh sách</a>

            <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded text-black">
                <select
                    value={form.product_id}
                    onChange={e => setForm({ ...form, product_id: e.target.value })}
                    className="border px-3 py-2 w-full"
                >
                    <option value="">-- Chọn sản phẩm --</option>
                    {products.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                </select>

                <input
                    type="number"
                    placeholder="Giá nhập"
                    value={form.price_root}
                    onChange={e => setForm({ ...form, price_root: e.target.value })}
                    className="border px-3 py-2 w-full"
                />

                <input
                    type="number"
                    placeholder="Số lượng"
                    value={form.qty}
                    onChange={e => setForm({ ...form, qty: e.target.value })}
                    className="border px-3 py-2 w-full"
                />

                <select
                    value={form.status}
                    onChange={e => setForm({ ...form, status: e.target.value })}
                    className="border px-3 py-2 w-full"
                >
                    <option value={1}>Đã nhập</option>
                    <option value={0}>Hủy</option>
                </select>

                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
                    Lưu phiếu nhập
                </button>
            </form>
        </div>
    );
}
