export default function ChangePassword({ passwordData, setPasswordData, onSubmit }) {
  return (
    <article className="card mb-4">
      <div className="card-body">
        <h5 className="mb-3">Đổi mật khẩu</h5>

        <form onSubmit={onSubmit}>
          <input
            type="password"
            className="form-control mb-2"
            placeholder="Mật khẩu hiện tại"
            value={passwordData.current_password}
            onChange={(e) =>
              setPasswordData({ ...passwordData, current_password: e.target.value })
            }
          />

          <input
            type="password"
            className="form-control mb-2"
            placeholder="Mật khẩu mới"
            value={passwordData.new_password}
            onChange={(e) =>
              setPasswordData({ ...passwordData, new_password: e.target.value })
            }
          />

          <input
            type="password"
            className="form-control mb-2"
            placeholder="Xác nhận mật khẩu mới"
            value={passwordData.new_password_confirmation}
            onChange={(e) =>
              setPasswordData({
                ...passwordData,
                new_password_confirmation: e.target.value,
              })
            }
          />

          <button className="btn btn-warning">Đổi mật khẩu</button>
        </form>
      </div>
    </article>
  );
}
