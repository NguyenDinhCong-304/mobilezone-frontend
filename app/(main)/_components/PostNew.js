"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function PostNew() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/post-new?limit=4") // gọi API
            .then((res) => setPosts(res.data.data)) // chỉ lấy mảng data
            .catch((err) => console.error(err));
    }, []);

    return (
        <section className="padding-bottom">
            <header className="section-heading heading-line">
                <h4 className="title-section text-uppercase">Bài viết mới</h4>
            </header>

            <div className="row">
                {posts.length === 0 ? (
                    <p className="p-3">Đang tải bài viết...</p>
                ) : (
                    posts.map((post) => (
                        <div className="col-md-3 col-sm-6" key={post.id}>
                            <article className="card card-post">
                                <img
                                    src={`http://127.0.0.1:8000/storage/${post.image}`}
                                    className="card-img-top"
                                    alt={post.title}
                                />
                                <div className="card-body">
                                    <h6 className="title">{post.title}</h6>
                                    <p className="small text-uppercase text-muted">
                                        {post.description}
                                    </p>
                                </div>
                            </article>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}
