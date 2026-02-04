import type { Metadata } from "next";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminProtected from "@/components/admin/AdminProtected";

export const metadata: Metadata = {
  title: "Admin Panel - Special Graphics",
  description: "Admin dashboard for managing Special Graphics platform",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AdminProtected>
      <div className="min-h-screen flex bg-white">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0 lg:ml-0">
          <AdminHeader />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden bg-white">
            <div className="max-w-7xl mx-auto w-full">
              {children}
            </div>
          </main>
        </div>
      </div>
    </AdminProtected>
  );
}

