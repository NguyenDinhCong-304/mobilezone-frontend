"use client";
import { useEffect, useState } from "react";
import adminAxios from "@/app/utils/adminAxios";

export default function SettingList() {
  const [setting, setSetting] = useState([]);

  useEffect(() => {
    const fetchSetting = async () => {
      try {
        const res = await adminAxios.get("/setting");
        setSetting(res.data);
      } catch (err) {
        console.error("Lỗi tải setting:", err);
      }
    };

    fetchSetting();
  }, []);

  return (
    <section id="main-content">
      <section className="wrapper">
        <h3 className="text-black mb-6 text-3xl border-b font-bold">
          <i className="fa fa-angle-right"></i> Cài đặt
        </h3>

        <div className="row mt">
          <div className="col-md-12 mt">
            <div className="content-panel">
              <div className="flex justify-between mb-2">
                {/* <h4 className="text-black mb-4 text-2xl">
                                    <i className="fa fa-angle-right"></i> Danh sách cài đặt
                                </h4>
                                <a href="/admin/category/add" className="bg-blue-600 text-white pl-4 pr-4 pt-3">
                                    Thêm cài đặt
                                </a> */}
              </div>

              <table className="table-auto border-collapse border border-gray-400 w-full table-default">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>ID</th>
                    <th>Tên</th>
                    <th>Email</th>
                    <th>Điện thoại</th>
                    <th>Hotline</th>
                    <th>Địa chỉ</th>
                    <th>Trạng thái</th>
                    <th>Hoạt động</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {setting.length > 0 ? (
                    setting.map((sett, index) => (
                      <tr key={sett.id}>
                        <td>{index + 1}</td>
                        <td>{sett.id}</td>
                        <td>{sett.site_name}</td>
                        <td>{sett.email}</td>
                        <td>{sett.phone}</td>
                        <td>{sett.hotline}</td>
                        <td>{sett.address}</td>
                        <td>
                          {Number(sett.status) === 1 ? (
                            <span className="label label-success label-mini">
                              Hiển thị
                            </span>
                          ) : (
                            <span className="label label-default label-mini">
                              Ẩn
                            </span>
                          )}
                        </td>
                        <td className="items-center space-x-4">
                          {/* <button className="text-green-500">
                                                        <i className="fa-solid fa-eye"></i>
                                                    </button> */}
                          <a
                            href={`/admin/setting/${sett.id}/edit`}
                            className="text-blue-600"
                          >
                            <i className="fa fa-pencil"></i>
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10">Không có dữ liệu</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
