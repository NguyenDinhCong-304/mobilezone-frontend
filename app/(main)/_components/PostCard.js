import Link from "next/link";
import HtmlContent from "./HtmlContent";

export default function PostCard({ post }) {
  return (
    <div className="card mb-4 shadow-sm h-100">
      <img
        src={`http://localhost:8000/storage/${post.image}`}
        className="card-img-top"
        alt={post.title}
        style={{ height: 200, objectFit: "cover" }}
      />

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{post.title}</h5>

        <HtmlContent
          html={post.description}
          className="card-text text-muted flex-grow-1"
        />

        <Link
          href={`/post/${post.id}`}
          className="btn btn-primary btn-sm mt-auto"
        >
          Xem chi tiết
        </Link>
      </div>
    </div>
  );
}
