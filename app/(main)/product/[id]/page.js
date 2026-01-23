"use client";
import { useEffect, useState } from "react";
import React from "react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function ProductDetail() {
  const { id } = useParams();
  console.log("Product ID:", id);
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [related, setRelated] = useState([]);

  // Thêm vào giỏ hàng
  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Kiểm tra xem sản phẩm này đã có trong giỏ hàng chưa
    const existingItem = existingCart.find((item) => item.id === product.id);

    if (existingItem) {
      // Nếu có rồi, tăng số lượng
      existingItem.quantity += quantity;
    } else {
      // Nếu chưa có, thêm mới vào giỏ hàng
      existingCart.push({
        id: product.id,
        name: product.name,
        price: product.price_sale || product.price_buy,
        image: `http://localhost:8000/storage/${product.thumbnail}`,
        quantity: quantity,
      });
    }

    // Lưu lại vào localStorage
    localStorage.setItem("cart", JSON.stringify(existingCart));

    // Thông báo
    alert("Đã thêm sản phẩm vào giỏ hàng!");

    // (Tuỳ chọn) Chuyển sang trang giỏ hàng
    // window.location.href = "/cart";
  };

  useEffect(() => {
    if (!product?.category_id) return;

    axios
      .get(
        `http://localhost:8000/api/product?category_id=${product.category_id}&exclude=${product.id}`,
      )
      .then((res) => setRelated(res.data.data))
      .catch(console.error);
  }, [product?.category_id]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/product/${id}`);
        setProduct(res.data);
        if (res.data.thumbnail_url) {
          setMainImage(res.data.thumbnail_url);
        } else if (res.data.images && res.data.images.length > 0) {
          setMainImage(`/storage/${res.data.images[0].image}`);
        }
      } catch (err) {
        console.error("Lỗi khi tải sản phẩm:", err);
      }
    };
    fetchProduct();
  }, [id]);

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1)); // không cho xuống dưới 1
  };

  if (!product) return <p>Đang tải...</p>;
  return (
    <>
      <section className="py-3 bg-light">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Trang chủ</a>
            </li>
            <li className="breadcrumb-item">
              <a href="#">{product.category?.name}</a>
            </li>
            <li className="breadcrumb-item">
              <a href="#">{product.name}</a>
            </li>
          </ol>
        </div>
      </section>

      {/* <!-- ========================= SECTION CONTENT ========================= --> */}
      <section className="section-content bg-white padding-y">
        <div className="container">
          {/* <!-- ============================ ITEM DETAIL ======================== --> */}
          <div className="row">
            <aside className="col-md-6">
              <div className="card">
                <article className="gallery-wrap">
                  <div className="img-big-wrap">
                    <div>
                      <a href="#">
                        <img
                          src={`http://localhost:8000/storage/${product.thumbnail}`}
                          alt={product?.name}
                          className="w-80 h-80 object-cover rounded-lg"
                        />
                      </a>
                    </div>
                  </div>
                  <div className="thumbs-wrap flex justify-center space-x-8">
                    {/* {product.thumbnail && (
                                            <img src={`http://localhost:8000/storage/${product.thumbnail}`} alt={product.name} className="w-20 h-20 object-cover rounded border cursor-pointer" onClick={() => setMainImage(product.thumbnail)} />
                                        )} */}

                    {/* Các ảnh phụ */}
                    {product.images?.map((img) => (
                      <img
                        key={img.id}
                        src={`http://localhost:8000/storage/${img.image}`}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded border cursor-pointer"
                        onClick={() => setMainImage(`/storage/${img.url}`)}
                      />
                    ))}
                  </div>
                </article>
              </div>
            </aside>
            <main className="col-md-6">
              <article className="product-info-aside">
                <h2 className="title mt-3">{product.name}</h2>

                <div className="rating-wrap my-3">
                  <ul className="rating-stars">
                    <li style={{ width: "80%" }} className="stars-active">
                      <i className="fa fa-star"></i>{" "}
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>{" "}
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                    </li>
                    <li>
                      <i className="fa fa-star"></i>{" "}
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>{" "}
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                    </li>
                  </ul>
                  <small className="label-rating text-muted">132 reviews</small>
                  <small className="label-rating text-success">
                    {" "}
                    <i className="fa fa-clipboard-check"></i> 154 orders{" "}
                  </small>
                </div>

                <div className="mb-3">
                  <div
                    className={`${
                      product.price_sale ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {Number(product.price_buy).toLocaleString()} đ
                  </div>

                  {product.price_sale && (
                    <div className="text-red-600 font-bold">
                      {Number(product.price_sale).toLocaleString()} đ
                    </div>
                  )}
                  {/* <span className="text-muted">USD 562.65 incl. VAT</span> */}
                </div>

                <p>{product.content}</p>

                <dl className="row">
                  {product.attributes.map((attr) => (
                    <React.Fragment key={attr.id}>
                      <dt className="col-sm-3">{attr.name}</dt>
                      <dd className="col-sm-9">{attr.pivot.value}</dd>
                    </React.Fragment>
                  ))}
                </dl>

                <div className="form-row  mt-4">
                  <div className="form-group col-md flex-grow-0">
                    <div className="input-group mb-3 input-spinner">
                      <div className="input-group-prepend">
                        <button
                          className="btn btn-light"
                          type="button"
                          onClick={handleIncrease}
                        >
                          {" "}
                          +{" "}
                        </button>
                      </div>
                      <input
                        type="text"
                        className="form-control text-center"
                        value={quantity}
                        onChange={(e) =>
                          setQuantity(Number(e.target.value) || 1)
                        }
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-light"
                          type="button"
                          onClick={handleDecrease}
                        >
                          &minus;
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="form-group col-md">
                    <button
                      onClick={handleAddToCart}
                      className="btn btn-primary"
                    >
                      <i className="fas fa-shopping-cart"></i>{" "}
                      <span className="text">Thêm vào giỏ hàng</span>
                    </button>
                  </div>
                </div>
              </article>
            </main>
          </div>

          {/* <!-- ================ ITEM DETAIL END .// ================= --> */}
        </div>
      </section>
      {/* <!-- ========================= SECTION CONTENT END// ========================= --> */}

      {/* < !-- ========================= SECTION ========================= --> */}
      <section className="section-name padding-y bg">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <h5 className="title-description">Mô tả chi tiết</h5>
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      </section>
      {related.length > 0 && (
        <section className="section-name">
          <div className="container">
            <h5>Sản phẩm liên quan</h5>
            <div className="row">
              {related.map((item) => (
                <div key={item.id} className="col bg-white rounded-xl shadow-md p-3 flex flex-col ">
                  <div className="relative w-full h-48 mb-2">
                    <img
                      src={`http://localhost:8000/storage/${item.thumbnail}`}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    {item.price_sale && (
                      <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                        -
                        {Math.round(
                          ((item.price_buy - item.price_sale) /
                            item.price_buy) *
                            100,
                        )}
                        %
                      </span>
                    )}
                  </div>
                  <a
                    href={`/product/${item.id}`}
                    className="text-center font-semibold line-clamp-2"
                  >
                    {item.name}
                  </a>
                  <div className="flex justify-center items-center space-x-2 mb-2">
                    <span
                      className={
                        item.price_sale
                          ? "line-through text-gray-500"
                          : "text-black"
                      }
                    >
                      {Number(item.price_buy).toLocaleString()} đ
                    </span>
                    {item.price_sale && (
                      <span className="text-red-600 font-bold">
                        {Number(item.price_sale).toLocaleString()} đ
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <button className="btn btn-outline-primary py-2 mb-2">
                      Thêm vào giỏ hàng
                    </button>
                    <button className="btn btn-outline-info py-2">
                      Mua ngay
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      <section className="padding-y-lg bg-light border-top">
        <div className="container">
          <p className="pb-2 text-center">
            Delivering the latest product trends and industry news straight to
            your inbox
          </p>
          <div className="row justify-content-md-center">
            <div className="col-lg-4 col-sm-6">
              <form className="form-row">
                <div className="col-8">
                  <input
                    className="form-control"
                    placeholder="Your Email"
                    type="email"
                  />
                </div>
                <div className="col-4">
                  <button type="submit" className="btn btn-block btn-warning">
                    {" "}
                    <i className="fa fa-envelope"></i> Subscribe{" "}
                  </button>
                </div>
              </form>
              <small className="form-text">
                We’ll never share your email address with a third-party.{" "}
              </small>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
