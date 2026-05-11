"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { z } from "zod";

export default function OrderForm() {
  const t = useTranslations("main");
  const t1 = useTranslations("order");

  const orderSchema = z.object({
    fullName: z.string().min(2, t1("fullNameIsRequired")),

    mobile: z.string().min(5, t1("mobileNumberIsRequired")),

    email: z.string().email(t1("pleaseEnterAValidEmail")),

    details: z.string().min(5, t1("detailsAreRequired")),
  });

  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      {
        threshold: 0.2,
      },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    details: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const validatedData = orderSchema.parse(formData);

      setLoading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: validatedData.fullName,
          tel: validatedData.mobile,
          email: validatedData.email,
          details: validatedData.details,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create order");
      }

      const data = await res.json();

      toast.success(t1("orderSentSuccessfully"), {
        style: {
          background: "#166534",
          color: "#fff",
          border: "1px solid #22c55e",
          padding: "16px",
          borderRadius: "12px",
        },
        iconTheme: {
          primary: "#22c55e",
          secondary: "#fff",
        },
      });

      setFormData({
        fullName: "",
        mobile: "",
        email: "",
        details: "",
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        err.issues.forEach((error, index) => {
          setTimeout(() => {
            toast.error(error.message, {
              style: {
                background: "#7f1d1d",
                color: "#fff",
                border: "1px solid #ef4444",
                padding: "16px",
                borderRadius: "12px",
              },
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fff",
              },
            });
          }, index * 300);
        });

        return;
      }

      toast.error(t1("smthWrong"), {
        style: {
          background: "#7f1d1d",
          color: "#fff",
          border: "1px solid #ef4444",
          padding: "16px",
          borderRadius: "12px",
        },
        iconTheme: {
          primary: "#ef4444",
          secondary: "#fff",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      ref={ref}
      className="relative py-[80px] px-2 flex flex-col items-center justify-center overflow-hidden "
    >
      {inView ? (
        <video
          poster="/media/wineyard.png"
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        >
          <source
            src="/media/vlc-record-2026-05-10-15h19m25s-kai 1.MP4- (1).webm"
            type="video/webm"
          />
        </video>
      ) : (
        <img
          src="/media/wineyard.png"
          alt="background"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      )}
      <div
        className="relative z-10 rounded-[20px] text-white max-w-300 w-full py-[40px] px-[16px] flex flex-col
       items-center bg-[#8e997e62]"
      >
        <h1 className="text-[40px] font-extrabold text-center">
          {t("leaveYourOrderHere")}
        </h1>

        <div className="relative max-w-[400px] w-full mt-[40px]">
          <input
            type="text"
            name="fullName"
            id="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder=" "
            className="peer border-b border-white h-[47px] w-full px-2 bg-transparent outline-none text-white"
          />
          <label
            htmlFor="fullName"
            className="absolute left-2 top-3 text-white duration-300 pointer-events-none
            peer-placeholder-shown:top-3 peer-placeholder-shown:text-base
            peer-focus:-top-3 peer-focus:text-sm
            peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-sm"
          >
            {t("nameSurname")}
          </label>
        </div>
        <div className="relative max-w-[400px] w-full mt-[20px]">
          <input
            type="text"
            name="mobile"
            id="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder=" "
            className="peer border-b border-white h-[47px] w-full px-2 bg-transparent outline-none text-white"
          />
          <label
            htmlFor="mobile"
            className="absolute left-2 top-3 text-white duration-300 pointer-events-none
            peer-placeholder-shown:top-3 peer-placeholder-shown:text-base
            peer-focus:-top-3 peer-focus:text-sm
            peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-sm"
          >
            {t("mob")}
          </label>
        </div>
        <div className="relative max-w-[400px] w-full mt-[20px]">
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder=" "
            className="peer border-b border-white h-[47px] w-full px-2 bg-transparent outline-none text-white"
          />
          <label
            htmlFor="email"
            className="absolute left-2 top-3 text-white duration-300 pointer-events-none
            peer-placeholder-shown:top-3 peer-placeholder-shown:text-base
            peer-focus:-top-3 peer-focus:text-sm
            peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-sm"
          >
            {t("email")}
          </label>
        </div>
        <div className="relative max-w-[440px] w-full mt-[40px]">
          <textarea
            name="details"
            id="details"
            value={formData.details}
            onChange={handleChange}
            placeholder=" "
            className="peer border border-white h-[120px] w-full resize-none p-2 outline-none text-white"
          />
          <label
            htmlFor="details"
            className="absolute left-2 top-3 text-white duration-300 pointer-events-none px-1 rounded
            peer-placeholder-shown:top-5 peer-placeholder-shown:text-base
            peer-focus:-top-5 peer-focus:text-sm
            peer-not-placeholder-shown:-top-5 peer-not-placeholder-shown:text-sm"
          >
            {t("details")}
          </label>
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="text-white bg-secondary hover:bg-[#64744C] focus:bg-[#44552B] duration-100 cursor-pointer rounded-[10px] h-[50px] max-w-[300px] w-full mt-[60px] flex items-center justify-center gap-8"
        >
          <h2 className="text-[20px] font-medium">
            {loading ? `...${t("sending")}` : t("send")}
          </h2>
        </button>
      </div>
    </div>
  );
}
