import PostTopicMenu from "../../_components/PostTopicMenu";
import PostContent from "../../_components/PostContent";

async function getPost(id) {
  const res = await fetch(
    `http://localhost:8000/api/post/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Post not found");

  const json = await res.json();
  return json.data ?? json;
}

async function getTopics() {
  const res = await fetch("http://localhost:8000/api/topic", {
    cache: "no-store",
  });

  const json = await res.json();
  return json.data;
}

export default async function PostDetail({ params, searchParams }) {
  const { id } = params;
  const activeTopic = searchParams?.topic || null;

  const [post, topics] = await Promise.all([
    getPost(id),
    getTopics(),
  ]);

  return (
    <section className="section-content padding-y">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <PostTopicMenu topics={topics} active={activeTopic} />
          </div>

          <div className="col-md-9">
            <h1 className="mb-3">{post.title}</h1>

            <div className="text-muted mb-4">
              Ngày đăng: {post.created_at}
            </div>

            <PostContent html={post.content} />
          </div>
        </div>
      </div>
    </section>
  );
}
