"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import adminAxios from "@/app/utils/adminAxios";

export default function PostShow() {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (!id) return;

    adminAxios
      .get(`/post/${id}`)
      .then((res) => {
        setPost(res.data.data || res.data);
      })
      .catch(() => {
        alert("Không tìm thấy bài viết!");
        router.push("/admin/post");
      });
  }, [id]);

  if (!post) return <p>Đang tải...</p>;
  return (
    <div className="bg-white p-6 rounded shadow text-black space-y-4">
      <h1 className="text-xl font-bold">Chi tiết bài viết</h1>

      <div>
        <strong>Tiêu đề:</strong> {post.title}
      </div>

      <div>
        <strong>Chủ đề:</strong> {post.topic?.name}
      </div>

      <div>
        <strong>Trạng thái:</strong> {post.status ? "Hiển thị" : "Ẩn"}
      </div>

      <div>
        <strong>Mô tả:</strong>
        <p className="mt-1">{post.description}</p>
      </div>

      <div>
        <strong>Nội dung:</strong>
        <div
          className="prose max-w-none p-3 mt-2"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>

      {post.image && (
        <div>
          <strong>Ảnh đại diện:</strong>
          <img
            src={`http://localhost:8000/storage/${post.image}`}
            className="w-64 mt-2 border rounded"
          />
        </div>
      )}

      <button
        onClick={() => router.back()}
        className="px-4 py-2 bg-gray-300 rounded"
      >
        Quay lại
      </button>
    </div>
  );
}
