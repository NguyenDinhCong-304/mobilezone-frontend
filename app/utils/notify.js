import { toast } from "react-toastify";
import Swal from "sweetalert2";

export const notify = {
  success: (msg) => toast.success(msg),
  error: (msg) => toast.error(msg),
  warning: (msg) => toast.warning(msg),
};

// Modal xác nhận
export const confirmDialog = async ({
  title = "Bạn chắc chắn?",
  text = "Hành động này không thể hoàn tác!",
  confirmText = "Xác nhận",
  cancelText = "Hủy",
}) => {
  const result = await Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    reverseButtons: true,
  });

  return result.isConfirmed;
};
