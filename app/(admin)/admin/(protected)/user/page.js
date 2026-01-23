"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [roles, setRoles] = useState("");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("admin_token");

      const res = await axios.get("http://localhost:8000/api/admin/user", {
        params: { search, status, page },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(res.data.data);
      setLastPage(res.data.last_page);
    } catch (err) {
      console.error("Lỗi tải banner:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, roles, status]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchUsers();
  };

  const handleDelete = async (id) => {
    if (!confirm("Bạn có chắc muốn xóa tài khoản này không?")) return;

    try {
      const token = localStorage.getItem("admin_token");

      const res = await axios.delete(
        `http://localhost:8000/api/admin/user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      alert(res.data.message || "Xóa thành công!");
      fetchUsers(page);
    } catch (err) {
      console.error(err);
      alert("Lỗi khi xóa tài khoản!");
    }
  };

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-500">Đang tải dữ liệu...</p>
    );
  }

  return (
    <section id="main-content">
      <section className="wrapper text-black">
        <h3 className="text-black mb-6 text-3xl border-b font-bold">
          Quản lý thành viên
        </h3>

        {/* Bộ lọc & tìm kiếm */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Tìm kiếm tên, email, username..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded flex-1"
          />

          <select
            value={roles}
            onChange={(e) => setRoles(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Tất cả quyền</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Tất cả</option>
            <option value="1">Hiển thị</option>
            <option value="0">Ẩn</option>
          </select>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Tìm kiếm
          </button>

          <a
            href="/admin/user/add"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Thêm User
          </a>
        </form>

        {/* Danh sách user */}
        <table className="table-auto border-collapse border border-gray-400 w-full table-default">
          <thead>
            <tr className="bg-gray-100">
              <th>#</th>
              <th>Avatar</th>
              <th>Tên</th>
              <th>Email</th>
              <th>Điện thoại</th>
              <th>Username</th>
              <th>Vai trò</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user.id} className="border-t">
                  <td>{index + 1}</td>
                  <td>
                    {user.avatar ? (
                      <img
                        src={`http://localhost:8000/${user.avatar}`}
                        className="w-12 h-12 rounded-full mx-auto object-cover"
                      />
                    ) : (
                      <span>Null</span>
                    )}
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.username}</td>
                  <td>{user.roles}</td>
                  <td>
                    {user.status == 1 ? (
                      <span className="text-green-600 font-semibold">
                        Hiển thị
                      </span>
                    ) : (
                      <span className="text-red-500">Ẩn</span>
                    )}
                  </td>
                  <td className="space-x-2">
                    <button className="text-green-500">
                      <i className="fa-solid fa-eye"></i>
                    </button>
                    <a
                      href={`/admin/user/${user.id}/edit`}
                      className="text-blue-600"
                    >
                      <i className="fa fa-pencil"></i>
                    </a>
                    <button
                      className="text-red-600"
                      onClick={() => handleDelete(user.id)}
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="py-4">
                  Không có dữ liệu
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* PHÂN TRANG */}
        <div className="flex justify-center mt-4 gap-3 text-black">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-lg font-semibold">
            {page} / {lastPage}
          </span>
          <button
            disabled={page === lastPage}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </section>
    </section>
  );
}
