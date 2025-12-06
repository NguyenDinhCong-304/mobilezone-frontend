"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

export default function EditMenu() {
    const router = useRouter();
    const { id } = useParams();
    const [menu, setMenu] = useState(null);
    const [menus, setMenus] = useState([]);

    const [type, setType] = useState("");
    const [name, setName] = useState("");
    const [link, setLink] = useState("");
    const [parentId, setParentId] = useState(0);
    const [tableId, setTableId] = useState(0);
    const [sortOrder, setSortOrder] = useState(0);
    const [status, setStatus] = useState(1);

    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(true);

    // ✅ Lấy dữ liệu menu theo id
    useEffect(() => {
        if (!id) return;
        const fetchMenu = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/menu/${id}`);
                const data = res.data.data;
                console.log("Menu data:", data);
                setMenu(data);

                // Gán dữ liệu vào form
                setType(data.type || "custom");
                setName(data.name || "");
                setLink(data.link || "");
                setParentId(data.parent_id || 0);
                setTableId(data.table_id || 0);
                setSortOrder(data.sort_order || 0);
                setStatus(data.status ?? 1);
            } catch (err) {
                console.error("Lỗi khi tải menu:", err);
                alert("Không thể tải dữ liệu menu!");
            } finally {
                setLoadingData(false);
            }
        };

        fetchMenu();
    }, [id]);

    // ✅ Lấy danh sách menu cha
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/menu")
            .then((res) => setMenus(res.data))
            .catch((err) => console.error("Lỗi khi tải danh sách menu cha:", err));
    }, []);

    // ✅ Cập nhật menu
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.put(`http://localhost:8000/api/menu/${id}`, {
                name,
                link,
                type,
                parent_id: parentId || null,
                table_id: tableId,
                sort_order: sortOrder,
                status,
            });
            alert("Cập nhật menu thành công!");
            router.push("/admin/menu");
        } catch (err) {
            console.error(err);
            alert("Có lỗi xảy ra khi cập nhật menu!");
        } finally {
            setLoading(false);
        }
    };

    if (loadingData) {
        return <p className="text-center mt-6 text-gray-500">Đang tải dữ liệu...</p>;
    }

    if (!menu) {
        return <p className="text-center mt-6 text-red-500">Không tìm thấy menu!</p>;
    }

    return (
        <div className="p-6 bg-white rounded-lg shadow text-black w-full mx-auto">
            <div className="flex justify-between">
                <h2 className="text-2xl font-semibold mb-4">✏️ Cập nhật menu</h2>
                <a
                    href="/admin/menu"
                    className="bg-blue-600 text-white px-3 py-2 rounded inline-block mb-4"
                >
                    ← Quay lại danh sách
                </a>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Loại menu */}
                <div>
                    <label className="block mb-1 font-medium">Loại menu</label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="border p-2 rounded w-full"
                    >
                        <option value="custom">Custom</option>
                        <option value="category">Category</option>
                        <option value="topic">Topic</option>
                        <option value="page">Page</option>
                    </select>
                </div>

                {/* Tên menu */}
                <div>
                    <label className="block mb-1 font-medium">Tên menu</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border p-2 rounded w-full"
                        placeholder="Nhập tên menu..."
                        required
                    />
                </div>

                {/* Đường dẫn */}
                <div>
                    <label className="block mb-1 font-medium">Đường dẫn (link)</label>
                    <input
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        className="border p-2 rounded w-full"
                        placeholder="/duong-dan"
                        required
                    />
                </div>

                {/* Menu cha */}
                <div>
                    <label className="block mb-1 font-medium">Menu cha</label>
                    <select
                        value={parentId}
                        onChange={(e) => setParentId(Number(e.target.value))}
                        className="border p-2 rounded w-full"
                    >
                        <option value={0}>Không có (menu gốc)</option>
                        {menus
                            .filter((m) => m.id !== Number(id)) // không chọn chính nó
                            .map((m) => (
                                <option key={m.id} value={m.id}>
                                    {m.name}
                                </option>
                            ))}
                    </select>
                </div>

                {/* Sort order */}
                <div>
                    <label className="block mb-1 font-medium">Thứ tự sắp xếp</label>
                    <input
                        type="number"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(Number(e.target.value))}
                        className="border p-2 rounded w-full"
                        min={0}
                    />
                </div>

                {/* Trạng thái */}
                <div>
                    <label className="block mb-1 font-medium">Trạng thái</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(Number(e.target.value))}
                        className="border p-2 rounded w-full"
                    >
                        <option value={1}>Hiển thị</option>
                        <option value={0}>Ẩn</option>
                    </select>
                </div>

                {/* Nút lưu */}
                <button
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    {loading ? "Đang cập nhật..." : "Lưu thay đổi"}
                </button>
            </form>
        </div>
    );
}
