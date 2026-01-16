  "use client";

  import { useSearchParams } from "next/navigation";
  import { useEffect, useState } from "react";
  import axios from "axios";
  import { notify } from "@/app/utils/notify";

  export default function SearchPage() {
    const searchParams = useSearchParams();
    const q = searchParams.get("q");

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (!q) return;

      axios
        .get(`http://localhost:8000/api/products/search?q=${q}`)
        .then((res) => {
          setProducts(res.data);
        })
        .finally(() => setLoading(false));
    }, [q]);

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

    if (loading) return <p className="text-center">Đang tìm kiếm...</p>;

    return (
      <div className="container my-4">
        <h4>
          Kết quả tìm kiếm cho: <b>{q}</b>
        </h4>

        {products.length === 0 && <p>Không tìm thấy sản phẩm</p>}

        <div className="row">
          {products.map((item) => (
            <div key={item.id} className="col-md-3 mb-3">
              <div className="bg-white rounded-xl shadow-md p-3">
                <img
                  src={`http://localhost:8000/storage/${item.thumbnail}`}
                  alt={item.name}
                  className="w-full h-64 object-cover rounded-lg"
                  style={{ height: 200, objectFit: "cover" }}
                />
                <div className="card-body">
                  <a
                    href={`/product/${item.id}`}
                    className="title text-truncate text-center"
                  >
                    {item.name.length > 20
                      ? item.name.substring(0, 20) + "..."
                      : item.name}
                  </a>
                  <div className="text-center mt-1">
                    {item.price_sale ? (
                      <>
                        <span className="line-through text-gray-500 mr-1">
                          {Number(item.price_buy).toLocaleString()} đ
                        </span>
                        <span className="text-red-600 font-bold">
                          {Number(item.price_sale).toLocaleString()} đ
                        </span>
                      </>
                    ) : (
                      <span className="font-bold">
                        {Number(item.price_buy).toLocaleString()} đ
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <button
                      className="btn btn-outline-primary py-2 mb-2"
                      onClick={() => handleAddToCart(item)}
                    >
                      Thêm vào giỏ hàng
                    </button>
                    <button className="btn btn-outline-info py-2">
                      Mua ngay
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
