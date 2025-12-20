"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import CategorySection from "./_components/CategorySection";
import ProductSale from "./_components/ProductSale"
import ProductNew from "./_components/ProductNew"
import PostNew from "./_components/PostNew";
export default function Home() {

  const [banners, setBanners] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/banner?position=slideshow&status=1")
      .then((res) => setBanners(res.data.data))
      .catch((err) => console.error("Lỗi banner:", err));
  }, []);

  return (
    <>
      <div className="container">
        {/* <!-- ========================= SECTION MAIN  ========================= --> */}
        <div id="carousel1_indicator" className="slider-home-banner carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            {banners.map((_, index) => (
              <li
                key={index}
                data-target="#carousel1_indicator"
                data-slide-to={index}
                className={index === 0 ? "active" : ""}
              />
            ))}
          </ol>
          <div className="carousel-inner">
            {banners.map((banner, index) => (
              <div
                key={banner.id}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <a href={banner.link || "#"}>
                  <img
                    src={`http://localhost:8000/storage/${banner.image}`}
                    className="d-block w-100"
                    alt={banner.name}
                  />
                </a>
              </div>
            ))}
          </div>
          <a className="carousel-control-prev" href="#carousel1_indicator" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carousel1_indicator" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
        <ProductSale/>
        
        <ProductNew/>
       
        <CategorySection
          title="Điện thoại"
          catId={1} // ID của danh mục điện thoại
          banner={{
            title: "Best trending phones",
            desc: "Các mẫu điện thoại hot nhất hiện nay",
            btnText: "Xem thêm",
            link: "/category/1",
            img: "/images/items/iphone-16-pro.webp"
          }}
        />
        <CategorySection
          title="Máy tính bảng"
          catId={2} // ID của danh mục điện thoại
          banner={{
            title: "Best trending tablets",
            desc: "Các mẫu máy tính bảng hot nhất hiện nay",
            btnText: "Xem thêm",
            link: "/category/2",
            img: "/images/items/xiaomi-pad-7_5__1.webp"
          }}
        />
        <CategorySection
          title="Laptop"
          catId={3} // ID của danh mục điện thoại
          banner={{
            title: "Best trending laptop",
            desc: "Các mẫu laptop hot nhất hiện nay",
            btnText: "Xem thêm",
            link: "/category/3",
            img: "/images/items/laptop.jpg"
          }}
        />
        <CategorySection
          title="Đồng hồ thông minh"
          catId={4} // ID của danh mục điện thoại
          banner={{
            title: "Best trending smartwatch",
            desc: "Các mẫu Đồng hồ thông minh hot nhất hiện nay",
            btnText: "Xem thêm",
            link: "/category/4",
            img: "/images/items/apple-watch.jpg"
          }}
        />
        <CategorySection
          title="Phụ kiện"
          catId={5} // ID của danh mục điện thoại
          banner={{
            title: "Best trending smartwatch",
            desc: "Các mẫu phụ kiện hot nhất hiện nay",
            btnText: "Xem thêm",
            link: "/category/5",
            img: "/images/items/airpods-4-2.webp"
          }}
        />

        <section className="padding-bottom">

          <header className="section-heading heading-line">
            <h4 className="title-section text-uppercase">Request for Quotation</h4>
          </header>

          <div className="row">
            <div className="col-md-8">
              <div className="card-banner banner-quote overlay-gradient"
                style={{ backgroundImage: "url('/images/banners/banner9.jpg')", }}>
                <div className="card-img-overlay white">
                  <h3 className="card-title">An easy way to send request to suppliers</h3>
                  <p className="card-text" style={{ maxWidth: "400px" }}>Lorem ipsum dolor sit amet, consectetur
                    adipisicing elit, sed do eiusmod
                    tempor incididunt.</p>
                  <a href="" className="btn btn-primary rounded-pill">Learn more</a>
                </div>
              </div>
            </div>
            <div className="col-md-4">

              <div className="card card-body">
                <h4 className="title py-3">One Request, Multiple Quotes</h4>
                <form>
                  <div className="form-group">
                    <input className="form-control" name="" placeholder="What are you looking for?" type="text" />
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <input className="form-control" placeholder="Quantity" name="" type="text" />

                      <select className="custom-select form-control">
                        <option>Pieces</option>
                        <option>Litres</option>
                        <option>Tons</option>
                        <option>Gramms</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group text-muted">
                    <p>Select template type:</p>
                    <label className="form-check form-check-inline">
                      <input className="form-check-input" type="checkbox" value="option1" />
                      <span className="form-check-label">Request price</span>
                    </label>
                    <label className="form-check form-check-inline">
                      <input className="form-check-input" type="checkbox" value="option2" />
                      <span className="form-check-label">Request a sample</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <button className="btn btn-warning">Request for quote</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        <PostNew/>

        <article className="my-4">
          <img src="images/banners/ad-sm.png" className="w-100" />
        </article>

      </div>
      <section className="section-subscribe padding-y-lg">
        <div className="container">

          <p className="pb-2 text-center text-white">Delivering the latest product trends and industry news straight to
            your inbox</p>

          <div className="row justify-content-md-center">
            <div className="col-lg-5 col-md-6">
              <form className="form-row">
                <div className="col-md-8 col-7">
                  <input className="form-control border-0" placeholder="Your Email" type="email" />
                </div>
                <div className="col-md-4 col-5">
                  <button type="submit" className="btn btn-block btn-warning"> <i className="fa fa-envelope"></i>
                    Subscribe </button>
                </div>
              </form>
              <small className="form-text text-white-50">We’ll never share your email address with a third-party.
              </small>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
