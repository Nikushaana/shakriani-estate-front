"use client";

import { useEffect, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { toast } from "react-hot-toast";

interface Order {
  id: string;
  full_name: string;
  tel: string;
  email: string;
  details: string;
}

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [fetchLoading, setFetchLoading] = useState(true);

  // 🔐 AUTH CHECK & FETCH
  useEffect(() => {
    const token = sessionStorage.getItem("shakrianiEstateToken");
    if (!token) {
      router.replace("/admin");
      return;
    }
    fetchOrders(token);
  }, []);

  const fetchOrders = async (token?: string) => {
    try {
      setFetchLoading(true);
      const authToken = token || sessionStorage.getItem("shakrianiEstateToken");

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/orders`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch orders");

      const data = await res.json();
      setOrders(data);
    } catch (err) {
      toast.error("შეკვეთების წამოღება ვერ მოხერხდა");
    } finally {
      setFetchLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("ნამდვილად გსურთ ამ შეკვეთის წაშლა?")) return;

    try {
      const token = sessionStorage.getItem("shakrianiEstateToken");
      if (!token) return;

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/orders/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error();

      toast.success("შეკვეთა წაიშალა");
      setOrders((prev) => prev.filter((order) => order.id !== id));
    } catch (err) {
      toast.error("წაშლა ვერ მოხერხდა");
    }
  };

  return (
    <div className="w-full space-y-8 px-2 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">შეკვეთების მართვა</h1>
        <p className="text-sm text-gray-500 mt-1">მიღებული შეკვეთების სრული სია და დეტალები.</p>
      </div>

      {/* ORDERS LIST CONTAINER */}
      {fetchLoading ? (
        <div className="bg-white rounded-xl border border-gray-200 p-16 text-center flex flex-col items-center justify-center">
          <div className="w-9 h-9 border-3 border-secondary/20 border-t-secondary rounded-full animate-spin mb-3" />
          <p className="text-sm text-gray-500 font-medium">ინფორმაცია იტვირთება მონაცემთა ბაზიდან...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-16 text-center">
          <p className="text-sm text-gray-400 font-medium">შეკვეთები ვერ მოიძებნა.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
              
              {/* Upper row: Contact Matrix & ID */}
              <div className="flex flex-col sm:flex-row border-b border-gray-100 bg-gray-50/50 p-5 justify-between gap-4 items-start sm:items-center">
                <div className="space-y-1">
                  <h2 className="text-base font-bold text-gray-900">{order.full_name}</h2>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-600">
                    <span className="flex items-center gap-1">
                      <span className="font-semibold text-gray-400">ტელ:</span> {order.tel}
                    </span>
                    <span className="hidden sm:inline text-gray-300">|</span>
                    <span className="flex items-center gap-1">
                      <span className="font-semibold text-gray-400">ელ-ფოსტა:</span> {order.email}
                    </span>
                  </div>
                </div>

                <span className="font-mono text-[10px] bg-gray-200 text-gray-600 px-2 py-1 rounded font-bold tracking-wider">
                  ID: {order.id}
                </span>
              </div>

              {/* Lower row: Details content */}
              <div className="p-5 bg-white space-y-1.5 flex-1">
                <h3 className="text-[11px] uppercase tracking-wider font-bold text-gray-400">შეკვეთის დეტალები</h3>
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap break-words font-medium">
                  {order.details}
                </p>
              </div>

              {/* Action row */}
              <div className="px-5 py-3.5 bg-gray-50 border-t border-gray-100 flex justify-end shrink-0">
                <button onClick={() => handleDelete(order.id)} className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  შეკვეთის წაშლა
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}