"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Product() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [categoryId, setCategoryId] = useState(null);

    // load danh mục từ API
    const fetchCategories = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/category");
            setCategories(res.data.data ?? []);
        } catch (error) {
            console.error("Lỗi khi load danh mục:", error);
        }
    };

    // load sản phẩm
    const fetchProducts = async (pageNum = 1, catId = categoryId) => {
        setLoading(true);
        try {
            let url = `http://localhost:8000/api/product-sale?page=${pageNum}&limit=8`;
            if (catId) {
                url += `&category_id=${catId}`;
            }

            const res = await axios.get(url);
            const pagination = res.data;

            setProducts(pagination?.data ?? []);
            setPage(pagination?.current_page ?? 1);
            setLastPage(pagination?.last_page ?? 1);
        } catch (error) {
            console.error("Lỗi khi load sản phẩm:", error);
            setProducts([]);
            setPage(1);
            setLastPage(1);
        } finally {
            setLoading(false);
        }
    };

    // chạy khi mount component
    useEffect(() => {
        fetchCategories();
    }, []);

    // chạy khi page hoặc categoryId thay đổi
    useEffect(() => {
        fetchProducts(page, categoryId);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [page, categoryId]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= lastPage && newPage !== page) {
            setPage(newPage);
        }
    };

    const handleCategoryChange = (catId) => {
        setCategoryId(catId);
        setPage(1); // reset về trang 1 khi đổi danh mục
    };

    return (
        <>
            <section className="section-content padding-y">
                <div className="container">
                    <div className="card mb-3">
                        <div className="card-body">
                            <ol className="breadcrumb float-left">
                                <li className="breadcrumb-item"><a href="#">Trang chủ</a></li>
                                <li className="breadcrumb-item"><a href="#">Khuyến mãi</a></li>
                            </ol>
                        </div>
                    </div>
                    <div className="row">
                        <aside className="col-md-2">
                            <article className="filter-group">
                                <h6 className="title">
                                    <a href="#" className=""> Danh mục </a>
                                </h6>
                                <div className="" id="collapse_1">
                                    <div className="inner">
                                        <ul className="list-menu"> {categories.map((cat) => (
                                            <li key={cat.id}>
                                                <button className="bg-transparent border-0 p-0 text-left 
                                                    focus:outline-none focus:ring-0 focus:border-transparent active:border-transparent hover:text-orange-500 cursor-pointer" onClick={() => handleCategoryChange(cat.id)} > {cat.name}
                                                </button>
                                            </li>
                                        ))}
                                        </ul>

                                    </div>
                                </div>
                            </article>
                            <article className="filter-group">
                                <h6 className="title">
                                    <a href="#" className="" data-target="#collapse_3"> Khoảng giá  </a>
                                </h6>
                                <div className="filter-content" id="collapse_3">
                                    <div className="inner">
                                        <input type="range" className="custom-range" min="0" max="100" />
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label>Min</label>
                                                <input className="form-control" placeholder="$0" type="number" />
                                            </div>
                                            <div className="form-group text-right col-md-6">
                                                <label>Max</label>
                                                <input className="form-control" placeholder="$1,0000" type="number" />
                                            </div>
                                        </div>
                                        <button className="btn btn-block btn-primary">Áp dụng</button>
                                    </div>
                                </div>
                            </article>
                            <article className="filter-group">
                                <h6 className="title">
                                    <a href="#" className="" data-toggle="collapse" data-target="#collapse_4"> Dung lượng </a>
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
                        <main className="col-md-10">
                            <header className="mb-3">
                                <div className="form-inline">
                                    <strong className="mr-md-auto">32 Items found </strong>
                                    <select className="mr-2 form-control">
                                        <option>Latest items</option>
                                        <option>Trending</option>
                                        <option>Most Popular</option>
                                        <option>Cheapest</option>
                                    </select>
                                    <div className="btn-group">
                                        <a href="page-listing-grid.html" className="btn btn-light" data-toggle="tooltip" title="Danh sách">
                                            <i className="fa fa-bars"></i></a>
                                        <a href="page-listing-large.html" className="btn btn-light active" data-toggle="tooltip" title="Lưới">
                                            <i className="fa fa-th"></i></a>
                                    </div>
                                </div>
                            </header>
                            <div className="row">
                                {products.length > 0 ? (
                                    products.map(product => (
                                        <div key={product.id} className="col-md-3 mb-4">
                                            <div className="bg-white rounded-xl shadow-md p-3 flex flex-col">
                                                <div className="relative w-full h-64 mb-2">
                                                    <img
                                                        src={`http://localhost:8000/storage/${product.thumbnail}`}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover rounded-lg"
                                                    />
                                                    {product.price_sale && (
                                                        <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                                                            -{Math.round(((product.price_buy - product.price_sale) / product.price_buy) * 100)}%
                                                        </span>
                                                    )}
                                                </div>
                                                <a href={`/product/${product.id}`} className="text-center font-semibold line-clamp-2">
                                                    {product.name.length > 30 ? product.name.substring(0, 30) + "..." : product.name}
                                                </a>
                                                <div className="flex justify-center items-center space-x-2 mb-2">
                                                    <span className={product.price_sale ? "line-through text-gray-500" : "text-black"}>
                                                        {Number(product.price_buy).toLocaleString()} đ
                                                    </span>
                                                    {product.price_sale && (
                                                        <span className="text-red-600 font-bold">
                                                            {Number(product.price_sale).toLocaleString()} đ
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex flex-col">
                                                    <button className="btn btn-outline-primary py-2 mb-2">Thêm vào giỏ hàng</button>
                                                    <button className="btn btn-outline-info py-2">Mua ngay</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>Không có sản phẩm nào</p>
                                )}

                            </div>
                            {lastPage > 1 && (
                                <nav>
                                    <ul className="pagination justify-content-center mt-4">
                                        <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                                            <button className="page-link" onClick={() => handlePageChange(page - 1)}>Trước</button>
                                        </li>

                                        {[...Array(lastPage)].map((_, i) => (
                                            <li key={i} className={`page-item ${page === i + 1 ? "active" : ""}`}>
                                                <button className="page-link" onClick={() => handlePageChange(i + 1)}>
                                                    {i + 1}
                                                </button>
                                            </li>
                                        ))}

                                        <li className={`page-item ${page === lastPage ? "disabled" : ""}`}>
                                            <button className="page-link" onClick={() => handlePageChange(page + 1)}>Tiếp</button>
                                        </li>
                                    </ul>
                                </nav>
                            )}
                            <div className="box text-center">
                                <p>Did you find what you were looking for？</p>
                                <a href="" className="btn btn-light">Yes</a>
                                <a href="" className="btn btn-light">No</a>
                            </div>
                        </main>
                    </div>
                </div>
            </section>
            <section className="padding-y-lg bg-light border-top">
                <div className="container">
                    <p className="pb-2 text-center">Delivering the latest product trends and industry news straight to your inbox</p>
                    <div className="row justify-content-md-center">
                        <div className="col-lg-4 col-sm-6">
                            <form className="form-row">
                                <div className="col-8">
                                    <input className="form-control" placeholder="Your Email" type="email" />
                                </div>
                                <div className="col-4">
                                    <button type="submit" className="btn btn-block btn-warning"> <i className="fa fa-envelope"></i> Subscribe </button>
                                </div>
                            </form>
                            <small className="form-text">We’ll never share your email address with a third-party. </small>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}