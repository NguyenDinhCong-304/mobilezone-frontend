export default function MyOrders({ orders, onCancel }) {
  const STATUS_MAP = {
    1: {
      label: "Đã đặt",
      className: "bg-warning text-dark",
      icon: "fa fa-clock",
    },
    2: {
      label: "Đang giao",
      className: "bg-info text-dark",
      icon: "fa fa-truck",
    },
    3: {
      label: "Đã giao",
      className: "bg-success",
      icon: "fa fa-check",
    },
    0: {
      label: "Đã hủy",
      className: "bg-danger",
      icon: "fa fa-times",
    },
  };
  const renderStatus = (status) => {
    const s = STATUS_MAP[Number(status)];

    if (!s) {
      return <span className="badge bg-secondary">Không xác định</span>;
    }

    return (
      <span className={`badge ${s.className}`}>
        <i className={`${s.icon} me-1`}></i>
        {s.label}
      </span>
    );
  };
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="mb-4">
          <i className="fa fa-shopping-bag me-2"></i>
          Đơn hàng của tôi
        </h5>

        {orders.length === 0 ? (
          <div className="text-center text-muted py-5">
            <i className="fa fa-box-open fa-2x mb-3"></i>
            <p className="mb-0">Bạn chưa có đơn hàng nào</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle table-hover">
              <thead className="table-light">
                <tr>
                  <th>Mã đơn</th>
                  <th>Sản phẩm</th>
                  <th>Ngày đặt</th>
                  <th>Tổng tiền</th>
                  <th>Trạng thái</th>
                  <th className="text-end">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id}>
                    <td>
                      <strong>#{o.id}</strong>
                    </td>

                    {/* SẢN PHẨM */}
                    <td>
                      {o.details?.map((d) => (
                        <div
                          key={d.id}
                          className="d-flex align-items-center mb-2"
                        >
                          <img
                            src={`http://localhost:8000/storage/${d.product.thumbnail}`}
                            alt={d.product.name}
                            width={95}
                            height={95}
                            className="rounded border me-2"
                            style={{ objectFit: "cover" }}
                          />
                          <div>
                            <div className="fw-semibold">{d.product.name}</div>
                            <small className="text-muted">SL: {d.qty}</small>
                          </div>
                        </div>
                      ))}
                    </td>

                    <td>{new Date(o.created_at).toLocaleString("vi-VN")}</td>

                    <td className="text-danger fw-semibold">
                      {o.total.toLocaleString()}₫
                    </td>

                    <td>{renderStatus(o.status)}</td>

                    <td className="text-end">
                      {Number(o.status) === 1 && (
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => onCancel(o.id)}
                        >
                          Hủy đơn
                        </button>
                      )}

                      {Number(o.status) === 2 && (
                        <span className="text-muted fst-italic">
                          Đang giao – không thể hủy
                        </span>
                      )}

                      {Number(o.status) === 3 && (
                        <span className="text-success fst-italic">Đã giao</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
