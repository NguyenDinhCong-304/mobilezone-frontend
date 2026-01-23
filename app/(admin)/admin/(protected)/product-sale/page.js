"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductSelector from "../../_component/ProductSelector";
import { confirmDialog, notify } from "@/app/utils/notify";
import adminAxios from "@/app/utils/adminAxios";

export default function ProductSaleList() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [file, setFile] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Form thêm mới
  const [form, setForm] = useState({
    name: "",
    product_id: "",
    price_sale: "",
    date_begin: "",
    date_end: "",
    status: 1,
  });

  // Gọi API danh sách khuyến mãi
  const fetchSales = async () => {
    const res = await adminAxios.get("/productsale", {
      params: { search: searchText, status, page },
    });
    setSales(res.data.data);
    setLastPage(res.data.last_page);
  };

  // Lấy danh sách sản phẩm cho dropdown
  const fetchProducts = async () => {
    const res = await adminAxios.get("/product", {
      params: { per_page: 100 },
    });
    setProducts(res.data.data || res.data);
  };

  useEffect(() => {
    fetchSales();
    fetchProducts();
  }, [page, status]);

  if (!isClient) return null;

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchSales();
  };

  //Import file excel
  const handleImport = async () => {
    if (!file) return notify.warning("Vui lòng chọn file Excel để import!");
    const formData = new FormData();
    formData.append("file", file);

    try {
      await adminAxios.post("/productsale/import", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      notify.success("Import thành công!");
      fetchSales();
    } catch (err) {
      console.error(err);
      notify.error(err.response?.data?.message || "Lỗi khi import file!");
    }
  };

  // Thêm khuyến mãi
  const handleAdd = async (e) => {
    e.preventDefault();

    // Kiểm tra sản phẩm đã chọn chưa
    if (!selectedProduct) {
      return notify.warning("Vui lòng chọn sản phẩm!");
    }

    try {
      const payload = {
        ...form,
        product_id: selectedProduct.value, // Lấy ID từ ProductSelector
      };

      await adminAxios.post("/productsale", payload);
      notify.success("Thêm khuyến mãi thành công!");

      // Reset form sau khi thêm
      setForm({
        name: "",
        product_id: "",
        price_sale: "",
        date_begin: "",
        date_end: "",
        status: 1,
      });
      setSelectedProduct(null); // Reset chọn sản phẩm
      fetchSales();
    } catch (err) {
      if (err.response?.status === 422) {
        const errors = err.response.data.errors;
        const messages = Object.values(errors).flat().join("\n");
        notify.error("Lỗi nhập liệu:\n" + messages);
      } else if (err.response?.status === 400) {
        notify.error(err.response.data.message || "Yêu cầu không hợp lệ!");
      } else if (err.response?.status === 500) {
        notify.error("Lỗi hệ thống, vui lòng thử lại sau!");
      } else {
        notify.error("Đã xảy ra lỗi không xác định.");
      }
    }
  };

  //Xóa khuyến mãi
  const handleDelete = async (id) => {
    const confirmed = await confirmDialog({
      title: "Xác nhận xóa khuyến mãi",
      text: "Bạn có chắc chắn muốn xóa khuyến mãi này?",
      confirmText: "Xóa",
      cancelText: "Hủy",
    });

    if (!confirmed) return;

    try {
      const res = await adminAxios.delete(`/productsale/${id}`);

      notify.success(res.data.message || "Xóa thành công!");
      // Gọi lại API để load lại danh sách
      fetchSales();
    } catch (err) {
      if (err.response?.status === 404) {
        notify.error("Không tìm thấy khuyến mãi cần xóa.");
      } else {
        notify.error("Lỗi khi xóa khuyến mãi!");
      }
    }
  };

  return (
    <div className="p-6 text-black">
      <h2 className="text-3xl font-bold mb-6 border-b">
        Quản lý khuyến mãi sản phẩm
      </h2>
      {/* FORM THÊM MỚI */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h3 className="text-xl font-semibold mb-3">Thêm khuyến mãi</h3>
        <p className="pb-2">- Thêm từng khuyến mãi:</p>
        <form onSubmit={handleAdd} className="grid grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Tên khuyến mãi"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border px-3 py-2 rounded"
            required
          />

          <ProductSelector
            value={selectedProduct}
            onChange={(option) => {
              setSelectedProduct(option);
              setForm({ ...form, product_id: option ? option.value : "" });
            }}
          />

          <input
            type="number"
            placeholder="Giá khuyến mãi"
            value={form.price_sale}
            onChange={(e) => setForm({ ...form, price_sale: e.target.value })}
            className="border px-3 py-2 rounded"
            required
          />

          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="border px-3 py-2 rounded"
          >
            <option value="1">Hoạt động</option>
            <option value="0">Ngừng</option>
          </select>

          <input
            type="date"
            value={form.date_begin}
            onChange={(e) => setForm({ ...form, date_begin: e.target.value })}
            className="border px-3 py-2 rounded"
            required
          />

          <input
            type="date"
            value={form.date_end}
            onChange={(e) => setForm({ ...form, date_end: e.target.value })}
            className="border px-3 py-2 rounded"
            required
          />

          <button
            type="submit"
            className="col-span-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Lưu khuyến mãi
          </button>
        </form>
        <p className="pt-6">- Hoặc import danh sách từ file Excel:</p>
        {/* DOWNLOAD FILE MẪU */}
        <div className="flex items-center gap-3 mt-4">
          <p className="font-bold">File mẫu: </p>
          <a
            href="http://localhost:8000/api/productsale/template"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            <i className="fa-solid fa-download"></i> Tải xuống file mẫu
          </a>
        </div>

        {/* IMPORT FILE */}
        <div className="flex gap-3 mb-6 mt-6">
          <input
            type="file"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            onChange={(e) => setFile(e.target.files[0])}
            className="border p-2 rounded"
          />
          <button
            onClick={handleImport}
            className="bg-purple-600 text-white px-4 py-2 rounded"
          >
            Import file
          </button>
        </div>
      </div>

      {/* BỘ LỌC */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border px-3 py-2 rounded w-1/3"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">Tất cả trạng thái</option>
          <option value="1">Hoạt động</option>
          <option value="0">Ngừng</option>
        </select>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Tìm kiếm
        </button>
      </form>

      {/* DANH SÁCH KHUYẾN MÃI */}
      <div className="text-xl font-semibold pb-2">Danh sách khuyến mãi</div>
      <table className="border-collapse border w-full">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">#</th>
            <th className="border p-2">ID</th>
            <th className="border p-2">Tên KM</th>
            <th className="border p-2">Sản phẩm</th>
            <th className="border p-2">Ảnh</th>
            <th className="border p-2">Giá KM</th>
            <th className="border p-2">Ngày bắt đầu</th>
            <th className="border p-2">Ngày kết thúc</th>
            <th className="border p-2">Trạng thái</th>
            <th className="border p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {sales.length > 0 ? (
            sales.map((s, i) => (
              <tr key={s.id} className="text-center">
                <td className="border p-2">{i + 1}</td>
                <td className="border p-2">{s.id}</td>
                <td className="border p-2">{s.name}</td>
                <td className="border p-2">{s.product?.name}</td>
                <td className="border p-2">
                  {s.product?.thumbnail ? (
                    <img
                      src={`http://localhost:8000/storage/${s.product.thumbnail}`}
                      className="w-16 h-16 object-cover mx-auto"
                    />
                  ) : (
                    "No image"
                  )}
                </td>
                <td className="border p-2">{s.price_sale} ₫</td>
                <td className="border p-2">{s.date_begin}</td>
                <td className="border p-2">{s.date_end}</td>
                <td className="border p-2">
                  {s.status === 1 ? "Hoạt động" : "Ngừng"}
                </td>
                <td className="border p-2 space-x-4">
                  {/* <button className="text-green-500">
                    <i className="fa-solid fa-eye"></i>
                  </button> */}
                  <a
                    href={`/admin/product-sale/${s.id}/edit`}
                    className="text-blue-600"
                  >
                    <i className="fa fa-pencil"></i>
                  </a>
                  <button
                    className="text-red-600 cursor-pointer"
                    onClick={() => handleDelete(s.id)}
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center p-4 text-gray-500">
                Không có dữ liệu
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="flex justify-center mt-4 gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
        >
          Prev
        </button>
        <span>
          {page} / {lastPage}
        </span>
        <button
          disabled={page === lastPage}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
}
