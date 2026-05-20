"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Admin {
  id: string;
  email: string;
}

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const token = sessionStorage.getItem("shakrianiEstateToken");

        if (!token) {
          router.replace("/admin");
          return;
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          sessionStorage.removeItem("shakrianiEstateToken");
          router.replace("/admin");
          return;
        }

        const data = await res.json();
        setAdmin(data);
      } catch (err) {
        sessionStorage.removeItem("shakrianiEstateToken");
        router.replace("/admin");
      }
    };

    fetchAdmin();
  }, [router]);

  // Close sidebar automatically on mobile when a route changes
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  // Helper function to apply active styling conditionally
  const getNavLinkClass = (href: string) => {
    const baseClasses = "flex items-center gap-3 px-4 py-3 text-[15px] font-medium rounded-lg transition-all duration-200";
    const isActive = pathname === href;

    return isActive
      ? `${baseClasses} bg-secondary text-white shadow-sm`
      : `${baseClasses} text-white/70 hover:text-white hover:bg-white/5`;
  };

  return (
    <div className="flex min-h-screen bg-[#f8f9fa] relative">
      
      {/* 📱 MOBILE TOP NAV BAR */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-primary text-white flex items-center justify-between px-6 z-40 border-b border-white/10 shadow-sm">
        <div className="flex flex-col">
          <span className="text-base font-bold tracking-tight uppercase">Shakriani Estate</span>
          <span className="text-[10px] text-white/40 tracking-wider -mt-0.5">Admin</span>
        </div>
        
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {isSidebarOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* 🪟 DARK OVERLAY BACKDROP FOR MOBILE */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
        />
      )}

      {/* 🧭 SIDEBAR DRAWER (Responsive) */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-[260px] bg-primary text-white p-6 flex flex-col border-r border-white/10 transform transition-transform duration-300 ease-in-out
        md:static md:translate-x-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        {/* Logo / Brand Info */}
        <div className="mb-8 px-2 flex items-center justify-between">
          <div>
            <h1 className="text-[20px] font-bold tracking-tight uppercase">
              Shakriani Estate
            </h1>
            <p className="text-[11px] text-white/40 font-medium tracking-widest uppercase mt-0.5">
              Admin Management
            </p>
          </div>
          
          {/* Mobile Close Button Inside Drawer */}
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden p-1.5 rounded-md hover:bg-white/10 text-white/60 hover:text-white"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation items */}
        <nav className="flex flex-col gap-1 flex-1">
          <Link href="/admin/panel/awards" className={getNavLinkClass("/admin/panel/awards")}>
            <svg className="w-5 h-5 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
            ჯილდოები
          </Link>

          <Link href="/admin/panel/blogs" className={getNavLinkClass("/admin/panel/blogs")}>
            <svg className="w-5 h-5 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            ბლოგები
          </Link>

          <Link href="/admin/panel/wines" className={getNavLinkClass("/admin/panel/wines")}>
            <svg className="w-5 h-5 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            ღვინოები
          </Link>
          
          <Link href="/admin/panel/orders" className={getNavLinkClass("/admin/panel/orders")}>
            {/* Corrected Clipboard/Orders List Icon */}
            <svg className="w-5 h-5 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            შეკვეთები
          </Link>
        </nav>

        {/* User Profile Info Footer */}
        {admin && (
          <div className="mt-auto pt-4 border-t border-white/10 flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-xs uppercase text-white shrink-0">
              {admin.email.substring(0, 2)}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs text-white/40 font-medium leading-none mb-1">Signed in as</span>
              <span className="text-sm font-medium text-white/90 truncate leading-none">{admin.email}</span>
            </div>
          </div>
        )}
      </aside>

      {/* 🖥️ MAIN PANEL CONTENT VIEW */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-w-[1400px] mx-auto w-full pt-24 md:pt-10">
        {children}
      </main>
    </div>
  );
}