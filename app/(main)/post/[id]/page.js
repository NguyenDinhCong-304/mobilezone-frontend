import PostTopicMenu from "../../_components/PostTopicMenu";
import HtmlContent from "../../_components/HtmlContent";

async function getPost(id) {
  const res = await fetch(`http://localhost:8000/api/post/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Post not found");

  const json = await res.json();
  return json.data ?? json;
}

async function getTopics() {
  const res = await fetch("http://localhost:8000/api/topic?status=1", {
    cache: "no-store",
  });

  const text = await res.text();

  if (!res.ok) {
    throw new Error("Failed to fetch topics");
  }

  return JSON.parse(text).data;
}

export default async function PostDetail({ params, searchParams }) {
  const { id } = params;

  const sp = await searchParams;
  const activeTopic = sp?.topic || null;

  const [post, topics] = await Promise.all([getPost(id), getTopics()]);

  return (
    <section className="section-content padding-y">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <PostTopicMenu topics={topics} active={activeTopic} />
          </div>

          <div className="col-md-9">
            <h1 className="mb-3">{post.title}</h1>

            <div className="text-muted mb-4">Ngày đăng: {post.created_at}</div>

            <HtmlContent html={post.content} className="content" />
          </div>
        </div>
      </div>
    </section>
  );
}
