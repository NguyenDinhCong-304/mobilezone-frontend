export default function UpdateProfile({ user, formData, setFormData, avatar, setAvatar, onSubmit }) {
  return (
    <article className="card mb-4">
      <div className="card-body">
        <h5 className="mb-3">Cập nhật thông tin cá nhân</h5>

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Họ và tên</label>
            <input
              className="form-control"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Số điện thoại</label>
            <input
              className="form-control"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              className="form-control"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="pr-4">Ảnh đại diện:</label>
            <input type="file" className="border p-2" onChange={(e) => setAvatar(e.target.files[0])} />
          </div>

          <button className="btn btn-primary mt-2">Cập nhật</button>
        </form>
      </div>
    </article>
  );
}
