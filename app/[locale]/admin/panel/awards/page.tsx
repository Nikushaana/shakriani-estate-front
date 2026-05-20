"use client";

import { useEffect, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { toast } from "react-hot-toast";

interface Award {
  id: string;
  image: string;
  text: string;    // KA (Georgian)
  text_en: string; // EN (English)
  text_ru: string; // RU (Russian)
}

export default function AwardsPage() {
  const router = useRouter();

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  // Localized state for creation form
  const [text, setText] = useState("");
  const [textEn, setTextEn] = useState("");
  const [textRu, setTextRu] = useState("");
  
  const [loading, setLoading] = useState(false);

  const [awards, setAwards] = useState<Award[]>([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const [selectedImages, setSelectedImages] = useState<{
    [key: string]: File | null;
  }>({});
  const [itemPreviews, setItemPreviews] = useState<{
    [key: string]: string | null;
  }>({});

  // 🔐 AUTH CHECK
  useEffect(() => {
    const token = sessionStorage.getItem("shakrianiEstateToken");

    if (!token) {
      router.replace("/admin");
      return;
    }

    fetchAwards(token);
  }, []);

  // Handle preview for new award creation
  useEffect(() => {
    if (!image) {
      setImagePreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(image);
    setImagePreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  const fetchAwards = async (token?: string) => {
    try {
      setFetchLoading(true);
      const authToken = token || sessionStorage.getItem("shakrianiEstateToken");

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/awards`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch awards");

      const data = await res.json();
      setAwards(data);
    } catch (err) {
      toast.error("ჯილდოების წამოღება ვერ მოხერხდა");
    } finally {
      setFetchLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!image || !text.trim() || !textEn.trim() || !textRu.trim()) {
      toast.error("ყველა ენის ველი აუცილებელია");
      return;
    }

    try {
      setLoading(true);
      const token = sessionStorage.getItem("shakrianiEstateToken");

      if (!token) {
        router.replace("/admin");
        return;
      }

      const formData = new FormData();
      formData.append("image", image);
      formData.append("text", text);
      formData.append("text_en", textEn);
      formData.append("text_ru", textRu);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/awards`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error();

      toast.success("ჯილდო წარმატებით დაემატა");
      setImage(null);
      setText("");
      setTextEn("");
      setTextRu("");
      fetchAwards(token);
    } catch (err) {
      toast.error("ჯილდოს დამატება ვერ მოხერხდა");
    } finally {
      setLoading(false);
    }
  };

  const handleItemImageChange = (id: string, file: File | null) => {
    if (!file) return;
    
    setSelectedImages((prev) => ({ ...prev, [id]: file }));
    const objectUrl = URL.createObjectURL(file);
    setItemPreviews((prev) => ({ ...prev, [id]: objectUrl }));
  };

  const handleUpdate = async (award: Award) => {
    try {
      setUpdatingId(award.id);
      const token = sessionStorage.getItem("shakrianiEstateToken");

      if (!token) {
        router.replace("/admin");
        return;
      }

      const formData = new FormData();
      formData.append("text", award.text);
      formData.append("text_en", award.text_en);
      formData.append("text_ru", award.text_ru);

      if (selectedImages[award.id]) {
        formData.append("image", selectedImages[award.id]!);
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/awards/${award.id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error();

      toast.success("ჯილდო განახლდა");
      
      if (itemPreviews[award.id]) {
        URL.revokeObjectURL(itemPreviews[award.id]!);
        setItemPreviews((prev) => ({ ...prev, [award.id]: null }));
      }
      setSelectedImages((prev) => ({ ...prev, [award.id]: null }));

      fetchAwards(token);
    } catch (err) {
      toast.error("განახლება ვერ მოხერხდა");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("ნამდვილად გსურთ ამ ჯილდოს წაშლა?")) return;

    try {
      const token = sessionStorage.getItem("shakrianiEstateToken");

      if (!token) {
        router.replace("/admin");
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/awards/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to delete award");

      toast.success("ჯილდო წაიშალა");
      setAwards((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      toast.error("წაშლა ვერ მოხერხდა");
    }
  };

  return (
    <div className="w-full space-y-8">
      {/* Top Header Row */}
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-[26px] font-bold text-gray-900 tracking-tight">ჯილდოები</h1>
        <p className="text-sm text-gray-500 mt-1">მართეთ თქვენი ჯილდოები.</p>
      </div>

      {/* Main Two Column View Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
        
        {/* LEFT COLUMN: Add New Award Form View */}
        <div className="xl:col-span-1 bg-white rounded-xl border border-gray-200 shadow-sm p-6 sticky top-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-5">ახალი ჯილდოს დამატება</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Custom Visual Image Uploader Container */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">ჯილდოს ფოტო</label>
              <div className="relative group border-2 border-dashed border-gray-300 hover:border-secondary transition-colors duration-200 rounded-xl overflow-hidden bg-gray-50 aspect-[16/11] flex flex-col items-center justify-center text-center p-4">
                {imagePreview ? (
                  <>
                    <img src={imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center justify-center">
                      <span className="text-xs font-medium text-white bg-black/50 px-3 py-1.5 rounded-md backdrop-blur-sm">ფოტოს შეცვლა</span>
                    </div>
                  </>
                ) : (
                  <div className="space-y-2 pointer-events-none flex flex-col items-center">
                    <svg className="w-8 h-8 text-gray-400 group-hover:text-secondary transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                    <p className="text-xs font-medium text-gray-500">ატვირთეთ ჯილდოს სურათი</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files && setImage(e.target.files[0])}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>

            {/* Translation Inputs Stack */}
            <div className="space-y-3 pt-2">
              <div className="space-y-1">
                <label className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <span className="px-1.5 py-0.5 bg-gray-100 border border-gray-200 text-gray-500 rounded text-[10px] font-bold">KA</span> აღწერა
                </label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="მაგ: ოქროს მედალი..."
                  rows={2}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm text-gray-900 focus:outline-none focus:border-secondary transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <span className="px-1.5 py-0.5 bg-blue-50 border border-blue-100 text-blue-600 rounded text-[10px] font-bold">EN</span> Description
                </label>
                <textarea
                  value={textEn}
                  onChange={(e) => setTextEn(e.target.value)}
                  placeholder="e.g., Gold Medal..."
                  rows={2}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm text-gray-900 focus:outline-none focus:border-secondary transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <span className="px-1.5 py-0.5 bg-red-50 border border-red-100 text-red-600 rounded text-[10px] font-bold">RU</span> Описание
                </label>
                <textarea
                  value={textRu}
                  onChange={(e) => setTextRu(e.target.value)}
                  placeholder="напр., Золотая медаль..."
                  rows={2}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm text-gray-900 focus:outline-none focus:border-secondary transition-all"
                />
              </div>
            </div>

            {/* Action Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-secondary hover:bg-secondary/90 text-white font-medium py-2.5 px-4 rounded-lg text-sm transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm flex items-center justify-center gap-2 pt-3"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  იტვირთება...
                </>
              ) : (
                "ჯილდოს დამატება"
              )}
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: Already Added Awards List Container */}
        <div className="xl:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">არსებული ჯილდოები ({awards.length})</h2>
          
          {fetchLoading ? (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center flex flex-col items-center justify-center">
              <div className="w-8 h-8 border-3 border-secondary/20 border-t-secondary rounded-full animate-spin mb-3" />
              <p className="text-sm text-gray-500 font-medium">ჯილდოები იტვირთება...</p>
            </div>
          ) : awards.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M22.5 12a10.5 10.5 0 11-21 0 10.5 10.5 0 0121 0z" />
              </svg>
              <p className="text-sm text-gray-500 font-medium">ჯილდოები ჯერ არ არის დამატებული.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {awards.map((award) => (
                <div key={award.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col group">
                  
                  {/* Inline Editable Image Container Component */}
                  <div className="relative aspect-[16/10] bg-gray-100 border-b border-gray-100 overflow-hidden">
                    <img
                      src={itemPreviews[award.id] || award.image}
                      alt="Award asset"
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    />
                    <div className="absolute bottom-3 right-3">
                      <label className="cursor-pointer bg-white/90 hover:bg-white text-gray-800 text-xs font-medium px-2.5 py-1.5 rounded-md shadow-sm border border-gray-200 backdrop-blur-sm inline-flex items-center gap-1.5 transition-colors">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        შეცვლა
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => e.target.files && handleItemImageChange(award.id, e.target.files[0])}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Multilingual Text Content Edit Stack */}
                  <div className="p-4 flex-1 flex flex-col space-y-3">
                    
                    {/* KA Input */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400 uppercase">
                        <span className="px-1 bg-gray-100 text-gray-500 rounded font-extrabold text-[9px]">KA</span> ქართული
                      </div>
                      <textarea
                        value={award.text || ""}
                        onChange={(e) =>
                          setAwards((prev) =>
                            prev.map((item) =>
                              item.id === award.id ? { ...item, text: e.target.value } : item
                            )
                          )
                        }
                        rows={1}
                        className="w-full border border-gray-200 focus:border-secondary rounded-lg p-2 text-sm text-gray-800 focus:outline-none transition-colors bg-gray-50/30 focus:bg-white"
                      />
                    </div>

                    {/* EN Input */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400 uppercase">
                        <span className="px-1 bg-blue-50 text-blue-500 rounded font-extrabold text-[9px]">EN</span> English
                      </div>
                      <textarea
                        value={award.text_en || ""}
                        onChange={(e) =>
                          setAwards((prev) =>
                            prev.map((item) =>
                              item.id === award.id ? { ...item, text_en: e.target.value } : item
                            )
                          )
                        }
                        rows={1}
                        className="w-full border border-gray-200 focus:border-secondary rounded-lg p-2 text-sm text-gray-800 focus:outline-none transition-colors bg-gray-50/30 focus:bg-white"
                      />
                    </div>

                    {/* RU Input */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400 uppercase">
                        <span className="px-1 bg-red-50 text-red-500 rounded font-extrabold text-[9px]">RU</span> Russian
                      </div>
                      <textarea
                        value={award.text_ru || ""}
                        onChange={(e) =>
                          setAwards((prev) =>
                            prev.map((item) =>
                              item.id === award.id ? { ...item, text_ru: e.target.value } : item
                            )
                          )
                        }
                        rows={1}
                        className="w-full border border-gray-200 focus:border-secondary rounded-lg p-2 text-sm text-gray-800 focus:outline-none transition-colors bg-gray-50/30 focus:bg-white"
                      />
                    </div>

                    {/* Lower Card Action Section Toolbar */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
                      <button
                        onClick={() => handleDelete(award.id)}
                        className="text-xs font-semibold text-red-600 hover:text-red-700 transition-colors flex items-center gap-1"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        წაშლა
                      </button>

                      <button
                        onClick={() => handleUpdate(award)}
                        disabled={updatingId === award.id}
                        className="bg-primary hover:bg-primary/95 text-white font-medium text-xs px-3.5 py-2 rounded-md shadow-sm transition-colors duration-150 disabled:opacity-50 flex items-center gap-1.5"
                      >
                        {updatingId === award.id ? (
                          <>
                            <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ინახება...
                          </>
                        ) : (
                          "შენახვა"
                        )}
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}