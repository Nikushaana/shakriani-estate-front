"use client";

import { useEffect, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { toast } from "react-hot-toast";

interface Blog {
  image: string;
  slug: string;
  // We keep track of the baseline slug fetched from DB to target the correct API endpoint
  originalSlug?: string; 
  image_alt: string;
  image_alt_en: string;
  image_alt_ru: string;
  small_text: string;
  small_text_en: string;
  small_text_ru: string;
  text: string;
  text_en: string;
  text_ru: string;
  meta_title: string;
  meta_title_en: string;
  meta_title_ru: string;
  meta_description: string;
  meta_description_en: string;
  meta_description_ru: string;
}

export default function BlogsPage() {
  const router = useRouter();

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Form State matching DTO definitions
  const [slug, setSlug] = useState("");
  
  const [imageAlt, setImageAlt] = useState("");
  const [imageAltEn, setImageAltEn] = useState("");
  const [imageAltRu, setImageAltRu] = useState("");

  const [smallText, setSmallText] = useState("");
  const [smallTextEn, setSmallTextEn] = useState("");
  const [smallTextRu, setSmallTextRu] = useState("");

  const [text, setText] = useState("");
  const [textEn, setTextEn] = useState("");
  const [textRu, setTextRu] = useState("");

  const [metaTitle, setMetaTitle] = useState("");
  const [metaTitleEn, setMetaTitleEn] = useState("");
  const [metaTitleRu, setMetaTitleRu] = useState("");

  const [metaDescription, setMetaDescription] = useState("");
  const [metaDescriptionEn, setMetaDescriptionEn] = useState("");
  const [metaDescriptionRu, setMetaDescriptionRu] = useState("");

  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [updatingSlug, setUpdatingSlug] = useState<string | null>(null);

  const [selectedImages, setSelectedImages] = useState<{ [key: string]: File | null }>({});
  const [itemPreviews, setItemPreviews] = useState<{ [key: string]: string | null }>({});

  // 🔐 AUTH CHECK
  useEffect(() => {
    const token = sessionStorage.getItem("shakrianiEstateToken");
    if (!token) {
      router.replace("/admin");
      return;
    }
    fetchBlogs(token);
  }, []);

  // Handle preview for new asset creation
  useEffect(() => {
    if (!image) {
      setImagePreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(image);
    setImagePreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  const fetchBlogs = async (token?: string) => {
    try {
      setFetchLoading(true);
      const authToken = token || sessionStorage.getItem("shakrianiEstateToken");

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/blogs`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch blogs");

      const data = await res.json();
      
      // Inject originalSlug matching properties so we don't lose the structural path lookup reference
      const structuralBlogs = data.map((b: Blog) => ({
        ...b,
        originalSlug: b.slug
      }));
      
      setBlogs(structuralBlogs);
    } catch (err) {
      toast.error("ბლოგების წამოღება ვერ მოხერხდა");
    } finally {
      setFetchLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !image || !slug.trim() ||
      !imageAlt.trim() || !imageAltEn.trim() || !imageAltRu.trim() ||
      !smallText.trim() || !smallTextEn.trim() || !smallTextRu.trim() ||
      !text.trim() || !textEn.trim() || !textRu.trim() ||
      !metaTitle.trim() || !metaTitleEn.trim() || !metaTitleRu.trim() ||
      !metaDescription.trim() || !metaDescriptionEn.trim() || !metaDescriptionRu.trim()
    ) {
      toast.error("ყველა სავალდებულო ველი უნდა შეივსოს სამივე ენაზე");
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
      formData.append("slug", slug);
      formData.append("image_alt", imageAlt);
      formData.append("image_alt_en", imageAltEn);
      formData.append("image_alt_ru", imageAltRu);
      formData.append("small_text", smallText);
      formData.append("small_text_en", smallTextEn);
      formData.append("small_text_ru", smallTextRu);
      formData.append("text", text);
      formData.append("text_en", textEn);
      formData.append("text_ru", textRu);
      formData.append("meta_title", metaTitle);
      formData.append("meta_title_en", metaTitleEn);
      formData.append("meta_title_ru", metaTitleRu);
      formData.append("meta_description", metaDescription);
      formData.append("meta_description_en", metaDescriptionEn);
      formData.append("meta_description_ru", metaDescriptionRu);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/blogs`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error();

      toast.success("ბლოგი წარმატებით დაემატა");
      
      // Clear fields
      setImage(null);
      setSlug("");
      setImageAlt(""); setImageAltEn(""); setImageAltRu("");
      setSmallText(""); setSmallTextEn(""); setSmallTextRu("");
      setText(""); setTextEn(""); setTextRu("");
      setMetaTitle(""); setMetaTitleEn(""); setMetaTitleRu("");
      setMetaDescription(""); setMetaDescriptionEn(""); setMetaDescriptionRu("");
      
      fetchBlogs(token);
    } catch (err) {
      toast.error("ბლოგის დამატება ვერ მოხერხდა");
    } finally {
      setLoading(false);
    }
  };

  const handleItemImageChange = (lookupKey: string, file: File | null) => {
    if (!file) return;
    setSelectedImages((prev) => ({ ...prev, [lookupKey]: file }));
    const objectUrl = URL.createObjectURL(file);
    setItemPreviews((prev) => ({ ...prev, [lookupKey]: objectUrl }));
  };

  const handleUpdate = async (blog: Blog) => {
    // We utilize originalSlug for query execution targeting since current blog.slug might contain changes
    const targetLookup = blog.originalSlug || blog.slug;

    if (!blog.slug.trim()) {
      toast.error("Slug არ შეიძლება იყოს ცარიელი");
      return;
    }

    try {
      setUpdatingSlug(targetLookup);
      const token = sessionStorage.getItem("shakrianiEstateToken");
      if (!token) {
        router.replace("/admin");
        return;
      }

      const formData = new FormData();
      formData.append("slug", blog.slug); // Send new slug string inside request body payload
      formData.append("image_alt", blog.image_alt);
      formData.append("image_alt_en", blog.image_alt_en);
      formData.append("image_alt_ru", blog.image_alt_ru);
      formData.append("small_text", blog.small_text);
      formData.append("small_text_en", blog.small_text_en);
      formData.append("small_text_ru", blog.small_text_ru);
      formData.append("text", blog.text);
      formData.append("text_en", blog.text_en);
      formData.append("text_ru", blog.text_ru);
      formData.append("meta_title", blog.meta_title);
      formData.append("meta_title_en", blog.meta_title_en);
      formData.append("meta_title_ru", blog.meta_title_ru);
      formData.append("meta_description", blog.meta_description);
      formData.append("meta_description_en", blog.meta_description_en);
      formData.append("meta_description_ru", blog.meta_description_ru);

      if (selectedImages[targetLookup]) {
        formData.append("image", selectedImages[targetLookup]!);
      }

      // Route parameters hit original path location context on database
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/blogs/${targetLookup}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error();

      toast.success("ბლოგი წარმატებით განახლდა");

      // Clean up asset lookups context pointers cleanly
      if (itemPreviews[targetLookup]) {
        URL.revokeObjectURL(itemPreviews[targetLookup]!);
        setItemPreviews((prev) => ({ ...prev, [targetLookup]: null }));
      }
      setSelectedImages((prev) => ({ ...prev, [targetLookup]: null }));

      fetchBlogs(token);
    } catch (err) {
      toast.error("განახლება ვერ მოხერხდა");
    } finally {
      setUpdatingSlug(null);
    }
  };

  const handleDelete = async (targetSlug: string) => {
    if (!confirm("ნამდვილად გსურთ ამ ბლოგის წაშლა?")) return;

    try {
      const token = sessionStorage.getItem("shakrianiEstateToken");
      if (!token) {
        router.replace("/admin");
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/blogs/${targetSlug}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error();

      toast.success("ბლოგი წაიშალა");
      setBlogs((prev) => prev.filter((item) => (item.originalSlug || item.slug) !== targetSlug));
    } catch (err) {
      toast.error("წაშლა ვერ მოხერხდა");
    }
  };

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-[26px] font-bold text-gray-900 tracking-tight">ბლოგები</h1>
        <p className="text-sm text-gray-500 mt-1">მართეთ თქვენი ბლოგები.</p>
      </div>

      {/* ========================================================================= */}
      {/* TOP SECTION: FULL WIDTH ADD COMPONENT                                    */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Main Attributes Row: Photo Asset + Slug */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end bg-gray-50/50">
            <div className="space-y-1.5 md:col-span-1">
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider">მთავარი ფოტო</label>
              <div className="relative group border-2 border-dashed border-gray-300 hover:border-secondary transition-colors duration-200 rounded-lg overflow-hidden bg-white aspect-[16/10] flex flex-col items-center justify-center text-center p-2">
                {imagePreview ? (
                  <>
                    <img src={imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center justify-center">
                      <span className="text-[11px] font-medium text-white bg-black/50 px-2 py-1 rounded-md backdrop-blur-sm">შეცვლა</span>
                    </div>
                  </>
                ) : (
                  <div className="space-y-1 pointer-events-none flex flex-col items-center">
                    <svg className="w-6 h-6 text-gray-400 group-hover:text-secondary transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                    <p className="text-[11px] font-medium text-gray-400">ატვირთვა</p>
                  </div>
                )}
                <input type="file" accept="image/*" onChange={(e) => e.target.files && setImage(e.target.files[0])} className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>
            </div>

            <div className="space-y-1.5 md:col-span-3 w-full">
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider">Slug (URL უნიკალური იდენტიფიკატორი)</label>
              <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="მაგ: red-wine-2026" className="w-full border border-gray-300 rounded-lg p-2.5 text-sm text-gray-900 focus:outline-none focus:border-secondary bg-white shadow-sm transition-all placeholder:text-gray-400" />
            </div>
          </div>

          {/* Side-by-Side 3-Column Language Matrix */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* KA Layout Container */}
            <div className="space-y-4 bg-gray-50/40 p-4 rounded-xl border border-gray-200/60">
              <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                <span className="text-sm font-bold text-gray-800 flex items-center gap-1.5">🇬🇪 ქართული ვერსია</span>
                <span className="px-1.5 py-0.5 bg-gray-200 text-gray-600 rounded text-[10px] font-bold">KA</span>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">სურათის ალტერნატიული ტექსტი (Alt)</label>
                <input type="text" value={imageAlt} onChange={(e) => setImageAlt(e.target.value)} placeholder="აღწერეთ ფოტო სეოსთვის" className="w-full border border-gray-300 rounded-lg p-2 text-sm bg-white focus:border-secondary focus:outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">მოკლე აღწერა (ბარათისთვის)</label>
                <textarea rows={2} value={smallText} onChange={(e) => setSmallText(e.target.value)} placeholder="მოკლე შესავალი ტექსტი..." className="w-full border border-gray-300 rounded-lg p-2 text-sm bg-white focus:border-secondary focus:outline-none resize-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">სრული სტატიის კონტენტი</label>
                <textarea rows={6} value={text} onChange={(e) => setText(e.target.value)} placeholder="დაწერეთ სრული პოსტის შინაარსი..." className="w-full border border-gray-300 rounded-lg p-2 text-sm bg-white focus:border-secondary focus:outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">Meta Title (SEO)</label>
                <input type="text" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} placeholder="საძიებო სათაური" className="w-full border border-gray-300 rounded-lg p-2 text-sm bg-white focus:border-secondary focus:outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">Meta Description (SEO)</label>
                <textarea rows={2} value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} placeholder="საძიებო სისტემის მოკლე აღწერა" className="w-full border border-gray-300 rounded-lg p-2 text-sm bg-white focus:border-secondary focus:outline-none resize-none" />
              </div>
            </div>

            {/* English Layout Container */}
            <div className="space-y-4 bg-blue-50/20 p-4 rounded-xl border border-blue-100">
              <div className="flex items-center justify-between border-b border-blue-200/60 pb-2">
                <span className="text-sm font-bold text-blue-900 flex items-center gap-1.5">🇬🇧 English Version</span>
                <span className="px-1.5 py-0.5 bg-blue-100 text-blue-600 rounded text-[10px] font-bold">EN</span>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-blue-700">Image Alt</label>
                <input type="text" value={imageAltEn} onChange={(e) => setImageAltEn(e.target.value)} placeholder="Describe photo for SEO" className="w-full border border-gray-300 rounded-lg p-2 text-sm bg-white focus:border-secondary focus:outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-blue-700">Small Text (Card preview)</label>
                <textarea rows={2} value={smallTextEn} onChange={(e) => setSmallTextEn(e.target.value)} placeholder="Short intro preview..." className="w-full border border-gray-300 rounded-lg p-2 text-sm bg-white focus:border-secondary focus:outline-none resize-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-blue-700">Full Article Content</label>
                <textarea rows={6} value={textEn} onChange={(e) => setTextEn(e.target.value)} placeholder="Write the main body content..." className="w-full border border-gray-300 rounded-lg p-2 text-sm bg-white focus:border-secondary focus:outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-blue-700">Meta Title (SEO)</label>
                <input type="text" value={metaTitleEn} onChange={(e) => setMetaTitleEn(e.target.value)} placeholder="Search engine title" className="w-full border border-gray-300 rounded-lg p-2 text-sm bg-white focus:border-secondary focus:outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-blue-700">Meta Description (SEO)</label>
                <textarea rows={2} value={metaDescriptionEn} onChange={(e) => setMetaDescriptionEn(e.target.value)} placeholder="Search engine snippet description" className="w-full border border-gray-300 rounded-lg p-2 text-sm bg-white focus:border-secondary focus:outline-none resize-none" />
              </div>
            </div>

            {/* Russian Layout Container */}
            <div className="space-y-4 bg-red-50/20 p-4 rounded-xl border border-red-100">
              <div className="flex items-center justify-between border-b border-red-200/60 pb-2">
                <span className="text-sm font-bold text-red-900 flex items-center gap-1.5">🇷🇺 Russian Version</span>
                <span className="px-1.5 py-0.5 bg-red-100 text-red-600 rounded text-[10px] font-bold">RU</span>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-red-700">Image Alt</label>
                <input type="text" value={imageAltRu} onChange={(e) => setImageAltRu(e.target.value)} placeholder="Описание фото для SEO" className="w-full border border-gray-300 rounded-lg p-2 text-sm bg-white focus:border-secondary focus:outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-red-700">Короткий текст (Для карточки)</label>
                <textarea rows={2} value={smallTextRu} onChange={(e) => setSmallTextRu(e.target.value)} placeholder="Краткое превью статьи..." className="w-full border border-gray-300 rounded-lg p-2 text-sm bg-white focus:border-secondary focus:outline-none resize-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-red-700">Полный текст статьи</label>
                <textarea rows={6} value={textRu} onChange={(e) => setTextRu(e.target.value)} placeholder="Напишите основной контент..." className="w-full border border-gray-300 rounded-lg p-2 text-sm bg-white focus:border-secondary focus:outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-red-700">Meta Title (SEO)</label>
                <input type="text" value={metaTitleRu} onChange={(e) => setMetaTitleRu(e.target.value)} placeholder="Поисковый заголовок" className="w-full border border-gray-300 rounded-lg p-2 text-sm bg-white focus:border-secondary focus:outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-red-700">Meta Description (SEO)</label>
                <textarea rows={2} value={metaDescriptionRu} onChange={(e) => setMetaDescriptionRu(e.target.value)} placeholder="Поисковое описание" className="w-full border border-gray-300 rounded-lg p-2 text-sm bg-white focus:border-secondary focus:outline-none resize-none" />
              </div>
            </div>

          </div>

          {/* Form Actions */}
          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button type="submit" disabled={loading} className="w-full sm:w-auto bg-secondary hover:bg-secondary/90 text-white font-semibold py-3 px-12 rounded-lg text-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-md">
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ინფორმაცია იტვირთება...
                </>
              ) : (
                "ბლოგის საიტზე გამოქვეყნება"
              )}
            </button>
          </div>
        </form>
      </div>

      {/* ========================================================================= */}
      {/* BOTTOM SECTION: LIST OF BLOGS                                            */}
      {/* ========================================================================= */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
          <h2 className="text-xl font-bold text-gray-900">არსებული ბლოგების სია ({blogs.length})</h2>
        </div>
        
        {fetchLoading ? (
          <div className="bg-white rounded-xl border border-gray-200 p-16 text-center flex flex-col items-center justify-center">
            <div className="w-9 h-9 border-3 border-secondary/20 border-t-secondary rounded-full animate-spin mb-3" />
            <p className="text-sm text-gray-500 font-medium">ბლოგები იტვირთება მონაცემთა ბაზიდან...</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-16 text-center">
            <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2" />
            </svg>
            <p className="text-sm text-gray-400 font-medium">ბლოგები ვერ მოიძებნა.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {blogs.map((blog) => {
              const lookupKey = blog.originalSlug || blog.slug;
              return (
                <div key={lookupKey} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col group max-h-[850px] overflow-y-auto custom-scrollbar">
                  
                  {/* Horizontal Header Info Inside Card */}
                  <div className="flex flex-col sm:flex-row border-b border-gray-100 bg-gray-50/50 p-4 justify-between sm:items-center gap-3">
                    <div className="space-y-1 flex-1">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Slug Identifier (რედაქტირებადი)</label>
                      <input 
                        type="text" 
                        value={blog.slug || ""} 
                        onChange={(e) => setBlogs(prev => prev.map(item => (item.originalSlug || item.slug) === lookupKey ? { ...item, slug: e.target.value } : item))}
                        className="w-full font-mono text-xs border border-gray-300 rounded px-2 py-1.5 text-gray-800 bg-white shadow-inner focus:outline-none focus:border-secondary" 
                      />
                    </div>
                    <div className="relative aspect-[16/9] w-full sm:w-44 bg-gray-100 border border-gray-200 rounded-lg overflow-hidden shrink-0 self-center">
                      <img src={itemPreviews[lookupKey] || blog.image} alt="Blog asset" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <label className="cursor-pointer bg-white text-gray-800 text-[10px] font-bold px-2 py-1 rounded shadow-sm border border-gray-300">
                          შეცვლა
                          <input type="file" accept="image/*" onChange={(e) => e.target.files && handleItemImageChange(lookupKey, e.target.files[0])} className="hidden" />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Multilingual Text Grid Fields Inside Card */}
                  <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    
                    {/* KA Block */}
                    <div className="space-y-2 bg-gray-50/50 p-2.5 rounded-lg border border-gray-200/60 text-xs">
                      <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wide border-b pb-1 mb-2 flex items-center gap-1">
                        <span className="px-1 bg-gray-200 text-gray-600 rounded text-[9px]">KA</span> ქართული
                      </div>
                      <input type="text" placeholder="Image Alt" value={blog.image_alt || ""} onChange={(e) => setBlogs(prev => prev.map(item => (item.originalSlug || item.slug) === lookupKey ? { ...item, image_alt: e.target.value } : item))} className="w-full border border-gray-200 rounded p-1.5 focus:outline-none focus:border-secondary bg-white" />
                      <textarea rows={2} placeholder="მოკლე ტექსტი" value={blog.small_text || ""} onChange={(e) => setBlogs(prev => prev.map(item => (item.originalSlug || item.slug) === lookupKey ? { ...item, small_text: e.target.value } : item))} className="w-full border border-gray-200 rounded p-1.5 focus:outline-none focus:border-secondary bg-white resize-none" />
                      <textarea rows={4} placeholder="სრული კონტენტი" value={blog.text || ""} onChange={(e) => setBlogs(prev => prev.map(item => (item.originalSlug || item.slug) === lookupKey ? { ...item, text: e.target.value } : item))} className="w-full border border-gray-200 rounded p-1.5 focus:outline-none focus:border-secondary bg-white" />
                      <input type="text" placeholder="Meta Title" value={blog.meta_title || ""} onChange={(e) => setBlogs(prev => prev.map(item => (item.originalSlug || item.slug) === lookupKey ? { ...item, meta_title: e.target.value } : item))} className="w-full border border-gray-200 rounded p-1.5 focus:outline-none focus:border-secondary bg-white" />
                      <textarea rows={2} placeholder="Meta Description" value={blog.meta_description || ""} onChange={(e) => setBlogs(prev => prev.map(item => (item.originalSlug || item.slug) === lookupKey ? { ...item, meta_description: e.target.value } : item))} className="w-full border border-gray-200 rounded p-1.5 focus:outline-none focus:border-secondary bg-white resize-none" />
                    </div>

                    {/* EN Block */}
                    <div className="space-y-2 bg-blue-50/10 p-2.5 rounded-lg border border-blue-100/40 text-xs">
                      <div className="text-[11px] font-bold text-blue-500 uppercase tracking-wide border-b pb-1 mb-2 flex items-center gap-1">
                        <span className="px-1 bg-blue-100 text-blue-600 rounded text-[9px]">EN</span> English
                      </div>
                      <input type="text" placeholder="Image Alt" value={blog.image_alt_en || ""} onChange={(e) => setBlogs(prev => prev.map(item => (item.originalSlug || item.slug) === lookupKey ? { ...item, image_alt_en: e.target.value } : item))} className="w-full border border-gray-200 rounded p-1.5 focus:outline-none focus:border-secondary bg-white" />
                      <textarea rows={2} placeholder="Small Text" value={blog.small_text_en || ""} onChange={(e) => setBlogs(prev => prev.map(item => (item.originalSlug || item.slug) === lookupKey ? { ...item, small_text_en: e.target.value } : item))} className="w-full border border-gray-200 rounded p-1.5 focus:outline-none focus:border-secondary bg-white resize-none" />
                      <textarea rows={4} placeholder="Full Text" value={blog.text_en || ""} onChange={(e) => setBlogs(prev => prev.map(item => (item.originalSlug || item.slug) === lookupKey ? { ...item, text_en: e.target.value } : item))} className="w-full border border-gray-200 rounded p-1.5 focus:outline-none focus:border-secondary bg-white" />
                      <input type="text" placeholder="Meta Title" value={blog.meta_title_en || ""} onChange={(e) => setBlogs(prev => prev.map(item => (item.originalSlug || item.slug) === lookupKey ? { ...item, meta_title_en: e.target.value } : item))} className="w-full border border-gray-200 rounded p-1.5 focus:outline-none focus:border-secondary bg-white" />
                      <textarea rows={2} placeholder="Meta Description" value={blog.meta_description_en || ""} onChange={(e) => setBlogs(prev => prev.map(item => (item.originalSlug || item.slug) === lookupKey ? { ...item, meta_description_en: e.target.value } : item))} className="w-full border border-gray-200 rounded p-1.5 focus:outline-none focus:border-secondary bg-white resize-none" />
                    </div>

                    {/* RU Block */}
                    <div className="space-y-2 bg-red-50/10 p-2.5 rounded-lg border border-red-100/40 text-xs">
                      <div className="text-[11px] font-bold text-red-500 uppercase tracking-wide border-b pb-1 mb-2 flex items-center gap-1">
                        <span className="px-1 bg-red-100 text-red-600 rounded text-[9px]">RU</span> Russian
                      </div>
                      <input type="text" placeholder="Image Alt" value={blog.image_alt_ru || ""} onChange={(e) => setBlogs(prev => prev.map(item => (item.originalSlug || item.slug) === lookupKey ? { ...item, image_alt_ru: e.target.value } : item))} className="w-full border border-gray-200 rounded p-1.5 focus:outline-none focus:border-secondary bg-white" />
                      <textarea rows={2} placeholder="Короткий текст" value={blog.small_text_ru || ""} onChange={(e) => setBlogs(prev => prev.map(item => (item.originalSlug || item.slug) === lookupKey ? { ...item, small_text_ru: e.target.value } : item))} className="w-full border border-gray-200 rounded p-1.5 focus:outline-none focus:border-secondary bg-white resize-none" />
                      <textarea rows={4} placeholder="Полный текст" value={blog.text_ru || ""} onChange={(e) => setBlogs(prev => prev.map(item => (item.originalSlug || item.slug) === lookupKey ? { ...item, text_ru: e.target.value } : item))} className="w-full border border-gray-200 rounded p-1.5 focus:outline-none focus:border-secondary bg-white" />
                      <input type="text" placeholder="Meta Title" value={blog.meta_title_ru || ""} onChange={(e) => setBlogs(prev => prev.map(item => (item.originalSlug || item.slug) === lookupKey ? { ...item, meta_title_ru: e.target.value } : item))} className="w-full border border-gray-200 rounded p-1.5 focus:outline-none focus:border-secondary bg-white" />
                      <textarea rows={2} placeholder="Meta Description" value={blog.meta_description_ru || ""} onChange={(e) => setBlogs(prev => prev.map(item => (item.originalSlug || item.slug) === lookupKey ? { ...item, meta_description_ru: e.target.value } : item))} className="w-full border border-gray-200 rounded p-1.5 focus:outline-none focus:border-secondary bg-white resize-none" />
                    </div>

                  </div>

                  {/* Card Action Controls */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 border-t border-gray-100 mt-auto shrink-0">
                    <button onClick={() => handleDelete(lookupKey)} className="text-xs font-semibold text-red-600 hover:text-red-700 transition-colors flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      წაშლა
                    </button>

                    <button onClick={() => handleUpdate(blog)} disabled={updatingSlug === lookupKey} className="bg-primary hover:bg-primary/95 text-white font-medium text-xs px-5 py-2 rounded-md shadow-sm transition-colors disabled:opacity-50 flex items-center gap-1.5">
                      {updatingSlug === lookupKey ? (
                        <>
                          <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          ინახება...
                        </>
                      ) : (
                        "ცვლილებების შენახვა"
                      )}
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f8fafc;
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
}