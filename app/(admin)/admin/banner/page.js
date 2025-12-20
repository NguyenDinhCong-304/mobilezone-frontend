"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function BannerList() {
    const [banners, setBanners] = useState([]);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchBanners = async () => {
        setLoading(true);
        try {
            const res = await axios.get("http://localhost:8000/api/banner", {
                params: { search, status, page },
            });
            setBanners(res.data.data);
            setLastPage(res.data.last_page);
        } catch (err) {
            console.error("Lỗi tải banner:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBanners();
    }, [page, status]);

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1); // Reset về trang đầu khi tìm
        fetchBanners();
    };

    const handleDelete = async (id) => {
        toast(
            ({ closeToast }) => (
                <div>
                    <p className="font-semibold mb-2">
                        Bạn có chắc muốn xóa banner này?
                    </p>
                    <div className="flex justify-end gap-2">
                        <button
                            onClick={async () => {
                                try {
                                    await axios.delete(`http://localhost:8000/api/banner/${id}`);
                                    toast.success("Xóa banner thành công!");
                                    fetchBanners();
                                } catch (err) {
                                    console.error(err);
                                    toast.error("Lỗi khi xóa banner!");
                                }
                                closeToast();
                            }}
                            className="bg-red-600 text-white px-3 py-1 rounded"
                        >
                            Xóa
                        </button>

                        <button
                            onClick={closeToast}
                            className="bg-gray-300 px-3 py-1 rounded"
                        >
                            Hủy
                        </button>
                    </div>
                </div>
            ),
            {
                autoClose: false,
                closeOnClick: false,
                closeButton: false,
            }
        );
    };

    if (loading) {
        return <p className="text-center mt-10 text-gray-500">Đang tải dữ liệu...</p>;
    }


    return (
        <section id="main-content">
            <section className="wrapper">
                <h3 className="text-black mb-6 text-3xl border-b font-bold">
                    Banner
                </h3>
                {/* BỘ LỌC & TÌM KIẾM */}
                <form
                    onSubmit={handleSearch}
                    className="flex gap-3 mb-6 items-center justify-between text-black"
                >
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Tìm kiếm banner..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border px-3 py-2 rounded w-64 text-black"
                        />
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="border px-3 py-2 rounded"
                        >
                            <option value="">Tất cả trạng thái</option>
                            <option value="1">Hiển thị</option>
                            <option value="0">Ẩn</option>
                        </select>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Tìm kiếm
                        </button>
                    </div>

                    <a
                        href="/admin/banner/add"
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        Thêm banner
                    </a>
                </form>

                <div className="row mt">
                    <div className="col-md-12 mt">
                        <div className="content-panel">
                            <div className="flex justify-between mb-2">
                                <h4 className="text-black mb-4 text-2xl">
                                    Danh sách banner
                                </h4>
                            </div>

                            <table className="table-auto border-collapse border border-gray-400 w-full table-default">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>ID</th>
                                        <th>Tên</th>
                                        <th>Ảnh</th>
                                        <th>Link</th>
                                        <th>Vị trí</th>
                                        <th>Thứ tự sắp xếp</th>
                                        <th>Trạng thái</th>
                                        <th>Hoạt động</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    {banners.length > 0 ? (
                                        banners.map((banner, index) => (
                                            <tr key={banner.id}>
                                                <td>{index + 1}</td>
                                                <td>{banner.id}</td>
                                                <td>{banner.name}</td>
                                                <td>
                                                    {banner.image ? (
                                                        <img
                                                            src={`http://localhost:8000/storage/${banner.image}`}
                                                            alt={banner.name}
                                                            className="w-16 h-16 object-cover mx-auto"
                                                        />
                                                    ) : (
                                                        "Không có"
                                                    )}
                                                </td>
                                                <td>{banner.link}</td>
                                                <td>{banner.position}</td>
                                                <td>
                                                    {banner.sort_order ?? "Không có"}
                                                </td>
                                                <td>
                                                    {Number(banner.status) === 1 ? (
                                                        <span className="label label-success label-mini">Hiển thị</span>
                                                    ) : (
                                                        <span className="label label-default label-mini">Ẩn</span>
                                                    )}
                                                </td>
                                                <td className="items-center space-x-2">
                                                    <button className="text-green-500">
                                                        <i className="fa-solid fa-eye"></i>
                                                    </button>
                                                    <a href={`/admin/banner/${banner.id}/edit`} className="text-blue-600">
                                                        <i className="fa fa-pencil"></i>
                                                    </a>
                                                    <button className="text-red-600"
                                                        onClick={() => handleDelete(banner.id)}>
                                                        <i className="fa fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="10">Không có dữ liệu</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* PHÂN TRANG */}
                        <div className="flex justify-center mt-4 gap-3 text-black">
                            <button
                                disabled={page === 1}
                                onClick={() => setPage(page - 1)}
                                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                            >
                                Prev
                            </button>
                            <span className="text-lg font-semibold">
                                {page} / {lastPage}
                            </span>
                            <button
                                disabled={page === lastPage}
                                onClick={() => setPage(page + 1)}
                                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>

                    </div>
                </div>
            </section>
        </section>
    );
}
