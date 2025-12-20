import Link from "next/link";

export default function PostTopicMenu({
  topics = [],
  active,
  perPage = 6,
}) {
  return (
    <aside className="card mb-4">
      <div className="card-header">
        <strong>Chủ đề</strong>
      </div>

      <ul className="list-group list-group-flush">

        {/* 🔹 TẤT CẢ */}
        <li
          className={`list-group-item ${!active ? "active" : ""}`}
        >
          <Link
            href={`/post?page=1&per_page=${perPage}`}
            className="d-block text-reset"
          >
            Tất cả bài viết
          </Link>
        </li>

        {topics.map((topic) => (
          <li
            key={topic.id}
            className={`list-group-item ${
              String(active) === String(topic.id) ? "active" : ""
            }`}
          >
            <Link
              href={`/post?topic=${topic.id}&page=1&per_page=${perPage}`}
              className="d-block text-reset"
            >
              {topic.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
