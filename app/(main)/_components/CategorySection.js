"use client";
import { useEffect, useState } from "react";

export default function CategorySection({ title, catId, banner }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(`http://localhost:8000/api/product-category/${catId}`);
                const data = await res.json();
                console.log(data);
                setProducts(data.data);
            } catch (err) {
                console.error("Error fetching products:", err);
            }
        };
        fetchProducts();
    }, [catId]);

    return (
        <section className="padding-bottom">
            <header className="section-heading heading-line">
                <h4 className="title-section text-uppercase">{title}</h4>
            </header>

            <div className="card card-deal">
                {/* Banner trái */}
                <div className="col-heading">
                    <div className="home-category-banner bg-light-orange">
                        <h5 className="title">{banner.title}</h5>
                        <p>{banner.desc}</p>
                        <a href={banner.link} className="btn btn-outline-primary rounded-pill">
                            {banner.btnText}
                        </a>
                        <img src={banner.img} className="img-bg" alt="banner" />
                    </div>
                </div>

                {/* Sản phẩm */}
                <div className="row no-gutters items-wrap">
                    {products.length === 0 ? (
                        <p className="p-3">Đang tải sản phẩm...</p>
                    ) : (
                        products.slice(0, 5).map((product) => (
                            <div key={product.id} className="col-md col-6">
                                <figure className="card-product-grid card-sm">
                                    <a href={`/product/${product.id}`} className="img-wrap">
                                        <img src={`http://localhost:8000/storage/${product.thumbnail}`} alt={product.name} />
                                        {product.price_sale && (
                                            <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                                                -
                                                {Math.round(
                                                    ((product.price_buy - product.price_sale) / product.price_buy) *
                                                    100
                                                )}
                                                %
                                            </span>
                                        )}
                                    </a>
                                    <div className="text-wrap p-3">
                                        <a href={`/product/${product.id}`} className="title text-truncate">
                                            {product.name.length > 20 ? product.name.substring(0, 20) + "..." : product.name}
                                        </a>
                                        <div className=" justify-center space-x-4">
                                            <div
                                                className={`${product.price_sale ? "line-through text-gray-500" : ""
                                                    }`}
                                            >
                                                {Number(product.price_buy).toLocaleString()} đ
                                            </div>

                                            {product.price_sale && (
                                                <div className="text-red-600 font-bold">
                                                    {Number(product.price_sale).toLocaleString()} đ
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </figure>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}

