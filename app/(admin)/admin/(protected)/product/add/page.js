"use client";

import { useState, useEffect } from "react";
import slugify from "slugify";
import adminAxios from "@/app/utils/adminAxios";
import { useRouter } from "next/navigation";
import useSummernote from "../../../_hooks/useSummernote";
import { notify } from "../../../../../utils/notify";

export default function ProductAdd() {
  const router = useRouter();
  const [productName, setProductName] = useState("");
  const [productSlug, setProductSlug] = useState("");
  const [catId, setCatId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [price, setPrice] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [productStatus, setProductStatus] = useState("1");
  const [images, setImages] = useState([]); // nhiều ảnh
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  // attribute state
  const [attributes, setAttributes] = useState([]);
  const [selectedAttr, setSelectedAttr] = useState("");
  const [value, setValue] = useState("");
  const [productAttrs, setProductAttrs] = useState([]);
  const [newAttr, setNewAttr] = useState("");
  const [showAttrForm, setShowAttrForm] = useState(false);

  const contentRef = useSummernote({
    height: 150,
    placeholder: "Mô tả ngắn sản phẩm...",
    onChange: setContent,
  });

  // const descriptionRef = useSummernote({
  //   height: 300,
  //   placeholder: "Nội dung chi tiết sản phẩm...",
  //   onChange: setDescription,
  // });

  useEffect(() => {
    const fetchInitData = async () => {
      try {
        const [catRes, brandRes, attrRes] = await Promise.all([
          adminAxios.get("/category"),
          adminAxios.get("/brand"),
          adminAxios.get("/attribute"),
        ]);

        setCategories(catRes.data.data);
        setBrands(brandRes.data.data);
        setAttributes(attrRes.data.data || attrRes.data);
      } catch (error) {
        console.error("Lỗi tải dữ liệu khởi tạo:", error);
      }
    };

    fetchInitData();
  }, []);

  const addProductAttribute = () => {
    if (!selectedAttr || !value.trim()) return;
    const attr = attributes.find((a) => a.id == selectedAttr);
    setProductAttrs([
      ...productAttrs,
      {
        id: Date.now(),
        attribute_id: attr.id,
        attribute_name: attr.name,
        value,
      },
    ]);
    setValue("");
  };

  const deleteProductAttribute = (id) => {
    setProductAttrs(productAttrs.filter((pa) => pa.id !== id));
  };

  const addNewAttribute = async () => {
    if (!newAttr.trim()) return;

    try {
      const res = await adminAxios.post("/attribute", {
        name: newAttr,
      });

      setAttributes((prev) => [...prev, res.data.data || res.data]);
      setNewAttr("");
      setShowAttrForm(false);
    } catch (error) {
      console.error("Lỗi khi thêm thuộc tính:", error.response?.data || error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("slug", productSlug);
    formData.append("category_id", catId);
    formData.append("brand_id", brandId);
    formData.append("price_buy", price);
    formData.append("content", content);
    formData.append("description", description);
    formData.append("status", productStatus);

    // nhiều ảnh
    images.forEach((file) => {
      formData.append("images[]", file);
    });

    // thuộc tính sản phẩm
    productAttrs.forEach((attr, i) => {
      formData.append(`attributes[${i}][attribute_id]`, attr.attribute_id);
      formData.append(`attributes[${i}][value]`, attr.value);
    });

    try {
      const res = await adminAxios.post("/product", formData);
      notify.success(res.data?.message || "Thêm sản phẩm thành công!");
      router.push("/admin/product");
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error.response?.data || error);
      notify.error(
        error.response?.data?.message || "Có lỗi xảy ra khi thêm sản phẩm!",
      );
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded text-black">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Thêm sản phẩm</h1>
        <div className="space-x-4">
          <button
            type="submit"
            form="productForm"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Lưu [Thêm]
          </button>
          <a
            href="/admin/product"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Về danh sách
          </a>
        </div>
      </div>

      <form
        id="productForm"
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Cột trái */}
        <div className="space-y-4">
          {/* Tên sản phẩm */}
          <div>
            <label className="block mb-1 font-medium">Tên sản phẩm</label>
            <input
              type="text"
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

          {/* Mô tả */}
          <div>
            <label className="block mb-1 font-medium">Mô tả ngắn</label>
            <textarea
              className="w-full border rounded px-3 py-2"
              rows="2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Nội dung */}
          <div>
            <label className="block mb-1 font-medium">Nội dung chi tiết</label>
            <textarea
              ref={contentRef}
              name="content"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Thuộc tính */}
          <div className="border rounded p-3">
            <h3 className="font-medium mb-2">Thuộc tính</h3>

            <div className="flex space-x-2 mb-2">
              <select
                className="border rounded px-2 py-1 flex-1"
                value={selectedAttr}
                onChange={(e) => setSelectedAttr(e.target.value)}
              >
                <option value="">-- chọn thuộc tính --</option>
                {attributes.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
              {!showAttrForm ? (
                <button
                  type="button"
                  onClick={() => setShowAttrForm(true)}
                  className="bg-blue-500 text-white px-3 py-1 rounded mb-3 hover:bg-blue-700"
                >
                  Thêm thuộc tính
                </button>
              ) : (
                <div className="flex space-x-2 mb-3">
                  <input
                    type="text"
                    value={newAttr}
                    onChange={(e) => setNewAttr(e.target.value)}
                    placeholder="Tên thuộc tính mới"
                    className="border rounded px-2 py-1 flex-1"
                  />
                  <button
                    type="button"
                    onClick={addNewAttribute}
                    className="bg-green-500 text-white px-3 rounded"
                  >
                    Lưu
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAttrForm(false)}
                    className="bg-gray-400 text-white px-3 rounded"
                  >
                    Hủy
                  </button>
                </div>
              )}
            </div>

            <div className="flex space-x-2 mb-2">
              <input
                type="text"
                placeholder="Giá trị thuộc tính"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="border rounded px-2 py-1 flex-1"
              />
              <button
                type="button"
                onClick={addProductAttribute}
                className="bg-blue-500 text-white px-3 rounded cursor-pointer hover:bg-blue-700"
              >
                Thêm giá trị
              </button>
            </div>

            {/* bảng attr */}
            <table className="w-full border text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">STT</th>
                  <th className="border p-2">Tên thuộc tính</th>
                  <th className="border p-2">Giá trị</th>
                  <th className="border p-2">Xóa</th>
                </tr>
              </thead>
              <tbody>
                {productAttrs.map((pa, index) => (
                  <tr key={pa.id}>
                    <td className="border p-2 text-center">{index + 1}</td>
                    <td className="border p-2">{pa.attribute_name}</td>
                    <td className="border p-2">{pa.value}</td>
                    <td className="border p-2 text-center">
                      <button
                        type="button"
                        onClick={() => deleteProductAttribute(pa.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cột phải */}
        <div className="space-y-4">
          {/* Danh mục */}
          <div>
            <label className="block mb-1 font-medium">Danh mục</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={catId}
              onChange={(e) => setCatId(e.target.value)}
            >
              <option value="">-- Chọn danh mục --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Thương hiệu */}
          <div>
            <label className="block mb-1 font-medium">Thương hiệu</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={brandId}
              required
              onChange={(e) => setBrandId(e.target.value)}
            >
              <option value="">-- Chọn thương hiệu --</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>

          {/* Giá nhập */}
          <div>
            <label className="block mb-1 font-medium">Giá bán</label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          {/* Trạng thái */}
          <div>
            <label className="block mb-1 font-medium">Trạng thái</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={productStatus}
              onChange={(e) => setProductStatus(e.target.value)}
            >
              <option value="1">Hiển thị</option>
              <option value="0">Ẩn</option>
            </select>
          </div>

          {/* Upload nhiều ảnh */}
          <div>
            <label className="block mb-1 font-medium">
              Ảnh sản phẩm (chọn nhiều)
            </label>
            <input
              type="file"
              className="w-full border rounded px-3 py-2"
              accept="image/*"
              multiple
              onChange={(e) => setImages([...e.target.files])}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
