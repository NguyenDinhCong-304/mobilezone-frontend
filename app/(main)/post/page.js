import PostCard from "../_components/PostCard";
import PostTopicMenu from "../_components/PostTopicMenu";
import Pagination from "../_components/Pagination";

// SERVER FETCH
async function getPosts({ topic, page = 1, perPage = 6 }) {
  let url = `http://localhost:8000/api/post?page=${page}&per_page=${perPage}`;

  if (topic) url += `&topic=${topic}`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch posts");

  return res.json(); // giữ full pagination object
}

async function getTopics() {
  const res = await fetch("http://localhost:8000/api/topic", {
    cache: "force-cache",
  });

  if (!res.ok) throw new Error("Failed to fetch topics");

  const json = await res.json();
  return json.data ?? json;
}

export default async function PostsPage({ searchParams }) {
  const sp = await searchParams;
  const activeTopic = sp?.topic ? Number(sp.topic) : null;
  const page = sp?.page ? Number(sp.page) : 1;
  const perPage = sp?.per_page ? Number(sp.per_page) : 6;

  const [postRes, topics] = await Promise.all([
    getPosts({ topic: activeTopic, page, perPage }),
    getTopics(),
  ]);

  const posts = postRes.data;
  const { current_page, last_page } = postRes;

  return (
    <section className="section-content padding-y">
      <div className="container">
        <div className="card mb-3">
          <div className="card-body">
            <ol className="breadcrumb float-left">
              <li className="breadcrumb-item">
                <a href="/">Trang chủ</a>
              </li>
              <li className="breadcrumb-item">
                <a href="#">Bài viết</a>
              </li>
            </ol>
          </div>
        </div>

        <div className="row">
          <div className="col-md-3">
            <PostTopicMenu
              topics={topics}
              active={activeTopic}
              perPage={perPage}
            />
          </div>

          <div className="col-md-9">
            <div className="row">
              {posts.length === 0 && <p className="p-3">Không có bài viết</p>}

              {posts.map((post) => (
                <div className="col-md-4" key={post.id}>
                  <PostCard post={post} />
                </div>
              ))}
            </div>
            <Pagination
              page={current_page}
              lastPage={last_page}
              topic={activeTopic}
              perPage={perPage}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
