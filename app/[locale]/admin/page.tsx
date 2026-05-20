"use client";

import { useRouter } from "@/i18n/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { z } from "zod";

export default function AdminLoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // ✅ AUTO CHECK AUTH ON LOAD
  useEffect(() => {
    const checkAuth = async () => {
      const token = sessionStorage.getItem("shakrianiEstateToken");

      if (!token) {
        setCheckingAuth(false);
        return;
      }

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          sessionStorage.removeItem("shakrianiEstateToken");
          setCheckingAuth(false);
          return;
        }

        router.push("/admin/panel/awards");
      } catch (err) {
        sessionStorage.removeItem("shakrianiEstateToken");
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const loginSchema = z.object({
    email: z.string().email("გთხოვთ მიუთითოთ სწორი ელ.ფოსტა!"),
    password: z.string().min(1, "პაროლის შეყვანა აუცილებელია!"),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents page reload on submission

    try {
      const validatedData = loginSchema.parse(formData);
      setLoading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: validatedData.email,
          password: validatedData.password,
        }),
      });

      if (!res.ok) throw new Error("Unauthorized");

      const data = await res.json();
      sessionStorage.setItem("shakrianiEstateToken", data.token);

      toast.success("ავტორიზაცია წარმატებით შესრულდა");
      router.push("/admin/panel/awards");
    } catch (err) {
      if (err instanceof z.ZodError) {
        err.issues.forEach((error, index) => {
          setTimeout(() => {
            toast.error(error.message);
          }, index * 200);
        });
        return;
      }
      toast.error("ელ.ფოსტა ან პაროლი არასწორია");
    } finally {
      setLoading(false);
    }
  };

  // Prevent UI flickering while checking authentication tokens on load
  if (checkingAuth) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-[#f8f9fa]">
        <div className="w-6 h-6 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#f8f9fa] px-4">
      <div className="w-full max-w-[440px] bg-white rounded-2xl border border-gray-200 shadow-xl p-8 md:p-10 transition-all">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <h1 className="text-[22px] font-bold tracking-tight text-gray-900 uppercase">
            Shakriani Estate
          </h1>
          <p className="text-xs text-gray-400 font-medium tracking-widest uppercase mt-1">
            Admin Portal Login
          </p>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Email Field Container */}
          <div className="relative group">
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder=" "
              className="peer w-full h-[52px] px-3.5 pt-4 pb-1 bg-gray-50/50 border border-gray-200 rounded-xl outline-none text-sm text-gray-900 focus:bg-white focus:border-secondary focus:ring-4 focus:ring-secondary/5 transition-all"
            />
            <label 
              htmlFor="email"
              className="absolute left-3.5 top-4 text-sm text-gray-400 transition-all duration-200 pointer-events-none origin-[0] transform peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-2.5 peer-focus:scale-75 peer-focus:text-secondary -translate-y-2.5 scale-75"
            >
              ელ.ფოსტა
            </label>
          </div>

          {/* Password Field Container */}
          <div className="relative group">
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder=" "
              className="peer w-full h-[52px] px-3.5 pt-4 pb-1 bg-gray-50/50 border border-gray-200 rounded-xl outline-none text-sm text-gray-900 focus:bg-white focus:border-secondary focus:ring-4 focus:ring-secondary/5 transition-all"
            />
            <label 
              htmlFor="password"
              className="absolute left-3.5 top-4 text-sm text-gray-400 transition-all duration-200 pointer-events-none origin-[0] transform peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-2.5 peer-focus:scale-75 peer-focus:text-secondary -translate-y-2.5 scale-75"
            >
              პაროლი
            </label>
          </div>

          {/* Action Submission Trigger Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-secondary hover:bg-secondary/95 text-white font-medium h-[48px] rounded-xl text-sm transition-all shadow-sm flex items-center justify-center gap-2 mt-8 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                მიმდინარეობს შესვლა...
              </>
            ) : (
              "სისტემაში შესვლა"
            )}
          </button>
        </form>

      </div>
    </div>
  );
}