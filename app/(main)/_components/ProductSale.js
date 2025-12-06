"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductSale() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/product-sale?limit=5")
            .then(res => setProducts(res.data.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <section className="padding-bottom pt-5">
            <div className="card card-deal">
                <div className="col-heading content-body">
                    <header className="section-heading">
                        <h3 className="section-title">Deals and offers</h3>
                        <p>Hot sale products</p>
                    </header>
                    <div className="timer">
                        <div><span className="num">04</span> <small>Days</small></div>
                        <div><span className="num">12</span> <small>Hours</small></div>
                        <div><span className="num">58</span> <small>Min</small></div>
                        <div><span className="num">02</span> <small>Sec</small></div>
                    </div>
                </div>

                <div className="row no-gutters items-wrap">
                    {products.map(p => (
                        <div className="col-md col-6" key={p.id}>
                            <figure className="card-product-grid card-sm">
                                <a href="#" className="img-wrap">
                                    <img src={`http://localhost:8000/storage/${p.thumbnail}`} alt={p.name} />
                                    {p.price_sale && (
                                        <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                                            -
                                            {Math.round(
                                                ((p.price_buy - p.price_sale) / p.price_buy) *
                                                100
                                            )}
                                            %
                                        </span>
                                    )}
                                </a>
                                <div className="text-wrap p-3">
                                    <a href={`/product/${p.id}`} className="title">
                                        {p.name.length > 20 ? p.name.substring(0, 20) + "..." : p.name}
                                    </a>
                                    <div className="text-center space-x-4">
                                        <div
                                            className={`${p.price_sale ? "line-through text-gray-500" : ""
                                                }`}
                                        >
                                            {Number(p.price_buy).toLocaleString()} đ
                                        </div>

                                        {p.price_sale && (
                                            <div className="text-red-600 font-bold">
                                                {Number(p.price_sale).toLocaleString()} đ
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </figure>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
