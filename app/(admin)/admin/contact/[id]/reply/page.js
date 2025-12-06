"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

export default function ReplyContact() {
  const { id } = useParams();
  const router = useRouter();
  const [contact, setContact] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/contact/${id}`)
      .then((res) => {
        console.log('contactId: ',res.data.data);
        setContact(res.data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleReply = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8000/api/contact/${id}/reply`, {
        reply_content: replyContent,
        updated_by: 1, // ID của admin (sửa theo thực tế)
      });
      alert("Đã trả lời liên hệ!");
      router.push("/admin/contact");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Đang tải...</p>;
  if (!contact) return <p className="text-black">Không tìm thấy liên hệ</p>;

  return (
    <div className="p-6 bg-white rounded-lg shadow max-w-2xl mx-auto text-black">
      <h2 className="text-2xl font-semibold mb-4">Trả lời liên hệ</h2>

      <div className="mb-4">
        <p><strong>Tên:</strong> {contact.name}</p>
        <p><strong>Email:</strong> {contact.email}</p>
        <p><strong>Nội dung:</strong> {contact.content}</p>
      </div>

      <form onSubmit={handleReply}>
        <textarea
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
          placeholder="Nhập nội dung phản hồi..."
          className="w-full border rounded p-2 mb-3"
          rows={5}
          required
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Gửi phản hồi
        </button>
      </form>
    </div>
  );
}
