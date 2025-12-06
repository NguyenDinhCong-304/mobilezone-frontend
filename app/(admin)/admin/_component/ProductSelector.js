"use client";
import AsyncSelect from "react-select/async";
import axios from "axios";

export default function ProductSelector({ value, onChange }) {
  const loadOptions = async (inputValue) => {
    try {
      const res = await axios.get("http://localhost:8000/api/product", {
        params: { search: inputValue },
      });

      return res.data.data.map((p) => ({
        value: p.id,
        label: p.name,
      }));
    } catch (error) {
      console.error("Lỗi tải sản phẩm:", error);
      return [];
    }
  };

  return (
    <AsyncSelect
      cacheOptions
      loadOptions={loadOptions}
      defaultOptions
      value={value}
      onChange={onChange}
      placeholder="Chọn sản phẩm..."
      noOptionsMessage={() => "Không tìm thấy sản phẩm"}
    />
  );
}
