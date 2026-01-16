"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminGuard({ children }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    const roleRaw = localStorage.getItem("admin_role");

    if (!token) {
      router.replace("/admin/login");
      return;
    }

    // Nếu role là JSON
    let role = roleRaw;
    try {
      role = JSON.parse(roleRaw);
    } catch {}

    // CHECK ADMIN
    const isAdmin =
      role === "admin" ||
      (Array.isArray(role) && role.includes("admin")) ||
      (typeof role === "object" && role?.name === "admin");

    if (!isAdmin) {
      router.replace("/admin/login");
      return;
    }

    setChecked(true);
  }, []);

  if (!checked) return null; // hoặc spinner

  return children;
}
