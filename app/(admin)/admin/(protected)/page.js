"use client";

import AdminGuard from "../_component/AdminGuard";
import DashboardContent from "./dashboard/DashboardContent";

export default function Dashboard() {
  return (
    <AdminGuard>
      <DashboardContent />
    </AdminGuard>
  );
}
