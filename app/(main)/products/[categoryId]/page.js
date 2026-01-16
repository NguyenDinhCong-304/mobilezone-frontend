"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import {notify} from "../../../utils/notify"

export default function ProductByCategory() {
  const { categoryId } = useParams(); // lấy categoryId từ URL

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // load danh mục
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/category");
      setCategories(res.data.data ?? []);
    } catch (error) {
      console.error("Lỗi khi load danh mục:", error);
    }
  };

  // load sản phẩm theo categoryId
  const fetchProducts = async (pageNum = 1) => {
    if (!categoryId) return;

    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:8000/api/product-category/${categoryId}?page=${pageNum}&limit=8`
      );

      const pagination = res.data;
      setProducts(pagination.data ?? []);
      setPage(pagination.current_page ?? 1);
      setLastPage(pagination.last_page ?? 1);
    } catch (error) {
      console.error("Lỗi load sản phẩm:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setPage(1); // reset page khi đổi category
    fetchProducts(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [categoryId]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= lastPage) {
      setPage(newPage);
      fetchProducts(newPage);
    }
  };
  const handleAddToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = existingCart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      existingCart.push({
        id: product.id,
        name: product.name,
        price: product.price_sale || product.price_buy,
        image: `http://localhost:8000/storage/${product.thumbnail}`,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    notify.success("Đã thêm sản phẩm vào giỏ hàng!");
  };

  return (
    <section className="section-content padding-y">
      <div className="container">
        <div className="row">
          {/* SIDEBAR */}
          <aside className="col-md-2">
            <article className="filter-group">
              <h6 className="title">
                <a href="#" className="">
                  {" "}
                  Danh mục{" "}
                </a>
              </h6>
              <ul className="filter-group">
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <a
                      href={`/products/${cat.id}`}
                      className={`cursor-pointer ${
                        Number(categoryId) === cat.id
                          ? "text-orange-500 font-bold"
                          : ""
                      }`}
                    >
                      {cat.name}
                    </a>
                  </li>
                ))}
              </ul>
            </article>

            <article className="filter-group">
              <h6 className="title">
                <a href="#" className="" data-target="#collapse_3">
                  {" "}
                  Khoảng giá{" "}
                </a>
              </h6>
              <div className="filter-content" id="collapse_3">
                <div className="inner">
                  <input
                    type="range"
                    className="custom-range"
                    min="0"
                    max="100"
                  />
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label>Min</label>
                      <input
                        className="form-control"
                        placeholder="$0"
                        type="number"
                      />
                    </div>
                    <div className="form-group text-right col-md-6">
                      <label>Max</label>
                      <input
                        className="form-control"
                        placeholder="$1,0000"
                        type="number"
                      />
                    </div>
                  </div>
                  <button className="btn btn-block btn-primary">Áp dụng</button>
                </div>
              </div>
            </article>
            <article className="filter-group">
              <h6 className="title">
                <a
                  href="#"
                  className=""
                  data-toggle="collapse"
                  data-target="#collapse_4"
                >
                  {" "}
                  Dung lượng{" "}
                </a>
              </h6>
              <div className="filter-content" id="collapse_4">
                <div className="inner">
                  <label className="checkbox-btn">
                    <input type="checkbox" />
                    <span className="btn btn-light"> 64GB </span>
                  </label>
                  <label className="checkbox-btn">
                    <input type="checkbox" />
                    <span className="btn btn-light"> 128GB </span>
                  </label>
                  <label className="checkbox-btn">
                    <input type="checkbox" />
                    <span className="btn btn-light"> 246GB </span>
                  </label>
                  <label className="checkbox-btn">
                    <input type="checkbox" />
                    <span className="btn btn-light"> 512GB </span>
                  </label>
                </div>
              </div>
            </article>
          </aside>

          {/* PRODUCT LIST */}
          <main className="col-md-10">
            <div className="row">
              {loading && <p>Đang tải sản phẩm...</p>}

              {!loading && products.length === 0 && (
                <p>Không có sản phẩm nào</p>
              )}

              {products.map((product) => (
                <div key={product.id} className="col-md-3 mb-4">
                  <div className="bg-white rounded-xl shadow-md p-3">
                    <img
                      src={`http://localhost:8000/storage/${product.thumbnail}`}
                      alt={product.name}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <a
                      href={`/product/${product.id}`}
                      className="block mt-2 text-center font-semibold"
                    >
                      {product.name}
                    </a>
                    <div className="text-center mt-1">
                      {product.price_sale ? (
                        <>
                          <span className="line-through text-gray-500 mr-1">
                            {Number(product.price_buy).toLocaleString()} đ
                          </span>
                          <span className="text-red-600 font-bold">
                            {Number(product.price_sale).toLocaleString()} đ
                          </span>
                        </>
                      ) : (
                        <span className="font-bold">
                          {Number(product.price_buy).toLocaleString()} đ
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <button onClick={()=>handleAddToCart(product)} className="btn btn-outline-primary py-2 mb-2">
                        Thêm vào giỏ hàng
                      </button>
                      <button className="btn btn-outline-info py-2">
                        Mua ngay
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* PAGINATION */}
            {lastPage > 1 && (
              <ul className="pagination justify-content-center mt-4">
                <li className={`page-item ${page === 1 && "disabled"}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(page - 1)}
                  >
                    Trước
                  </button>
                </li>

                {[...Array(lastPage)].map((_, i) => (
                  <li
                    key={i}
                    className={`page-item ${page === i + 1 && "active"}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}

                <li className={`page-item ${page === lastPage && "disabled"}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(page + 1)}
                  >
                    Tiếp
                  </button>
                </li>
              </ul>
            )}
          </main>
        </div>
      </div>
    </section>
  );
}
