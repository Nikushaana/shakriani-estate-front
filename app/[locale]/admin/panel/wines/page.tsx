"use client";

import { useEffect, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { toast } from "react-hot-toast";

interface Wine {
  image: string;
  slug: string;
  originalSlug?: string; // Baseline backup tracker for endpoint URL routing mutations
  image_alt: string;
  image_alt_en: string;
  image_alt_ru: string;
  name: string;
  name_en: string;
  name_ru: string;
  type: string;
  type_en: string;
  type_ru: string;
  year: string;
  price: string;
  description: string;
  description_en: string;
  description_ru: string;
  alc: string;
  vol: string;
  origin: string;
  origin_en: string;
  origin_ru: string;
  serve: string;
  meta_title: string;
  meta_title_en: string;
  meta_title_ru: string;
  meta_description: string;
  meta_description_en: string;
  meta_description_ru: string;
}

export default function WinesPage() {
  const router = useRouter();

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Form Creation State
  const [slug, setSlug] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [alc, setAlc] = useState("");
  const [vol, setVol] = useState("");
  const [serve, setServe] = useState("");

  const [imageAlt, setImageAlt] = useState("");
  const [imageAltEn, setImageAltEn] = useState("");
  const [imageAltRu, setImageAltRu] = useState("");

  const [name, setName] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [nameRu, setNameRu] = useState("");

  const [type, setType] = useState("");
  const [typeEn, setTypeEn] = useState("");
  const [typeRu, setTypeRu] = useState("");

  const [description, setDescription] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [descriptionRu, setDescriptionRu] = useState("");

  const [origin, setOrigin] = useState("");
  const [originEn, setOriginEn] = useState("");
  const [originRu, setOriginRu] = useState("");

  const [metaTitle, setMetaTitle] = useState("");
  const [metaTitleEn, setMetaTitleEn] = useState("");
  const [metaTitleRu, setMetaTitleRu] = useState("");

  const [metaDescription, setMetaDescription] = useState("");
  const [metaDescriptionEn, setMetaDescriptionEn] = useState("");
  const [metaDescriptionRu, setMetaDescriptionRu] = useState("");

  const [loading, setLoading] = useState(false);
  const [wines, setWines] = useState<Wine[]>([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [updatingSlug, setUpdatingSlug] = useState<string | null>(null);

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
    fetchWines(token);
  }, []);

  // Handle preview generation for new assets
  useEffect(() => {
    if (!image) {
      setImagePreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(image);
    setImagePreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  const fetchWines = async (token?: string) => {
    try {
      setFetchLoading(true);
      const authToken = token || sessionStorage.getItem("shakrianiEstateToken");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/wines`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      );

      if (!res.ok) throw new Error("Failed to fetch wines");

      const data = await res.json();
      const structuralWines = data.map((w: Wine) => ({
        ...w,
        originalSlug: w.slug,
      }));

      setWines(structuralWines);
    } catch (err) {
      toast.error("ღვინოების წამოღება ვერ მოხერხდა");
    } finally {
      setFetchLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !image ||
      !slug.trim() ||
      !year.trim() ||
      !price.trim() ||
      !alc.trim() ||
      !vol.trim() ||
      !serve.trim() ||
      !imageAlt.trim() ||
      !imageAltEn.trim() ||
      !imageAltRu.trim() ||
      !name.trim() ||
      !nameEn.trim() ||
      !nameRu.trim() ||
      !type.trim() ||
      !typeEn.trim() ||
      !typeRu.trim() ||
      !description.trim() ||
      !descriptionEn.trim() ||
      !descriptionRu.trim() ||
      !origin.trim() ||
      !originEn.trim() ||
      !originRu.trim() ||
      !metaTitle.trim() ||
      !metaTitleEn.trim() ||
      !metaTitleRu.trim() ||
      !metaDescription.trim() ||
      !metaDescriptionEn.trim() ||
      !metaDescriptionRu.trim()
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
      formData.append("year", year);
      formData.append("price", price);
      formData.append("alc", alc);
      formData.append("vol", vol);
      formData.append("serve", serve);
      formData.append("image_alt", imageAlt);
      formData.append("image_alt_en", imageAltEn);
      formData.append("image_alt_ru", imageAltRu);
      formData.append("name", name);
      formData.append("name_en", nameEn);
      formData.append("name_ru", nameRu);
      formData.append("type", type);
      formData.append("type_en", typeEn);
      formData.append("type_ru", typeRu);
      formData.append("description", description);
      formData.append("description_en", descriptionEn);
      formData.append("description_ru", descriptionRu);
      formData.append("origin", origin);
      formData.append("origin_en", originEn);
      formData.append("origin_ru", originRu);
      formData.append("meta_title", metaTitle);
      formData.append("meta_title_en", metaTitleEn);
      formData.append("meta_title_ru", metaTitleRu);
      formData.append("meta_description", metaDescription);
      formData.append("meta_description_en", metaDescriptionEn);
      formData.append("meta_description_ru", metaDescriptionRu);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/wines`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      if (!res.ok) throw new Error();

      toast.success("ღვინო წარმატებით დაემატა");

      // Reset Fields
      setImage(null);
      setSlug("");
      setYear("");
      setPrice("");
      setAlc("");
      setVol("");
      setServe("");
      setImageAlt("");
      setImageAltEn("");
      setImageAltRu("");
      setName("");
      setNameEn("");
      setNameRu("");
      setType("");
      setTypeEn("");
      setTypeRu("");
      setDescription("");
      setDescriptionEn("");
      setDescriptionRu("");
      setOrigin("");
      setOriginEn("");
      setOriginRu("");
      setMetaTitle("");
      setMetaTitleEn("");
      setMetaTitleRu("");
      setMetaDescription("");
      setMetaDescriptionEn("");
      setMetaDescriptionRu("");

      fetchWines(token);
    } catch (err) {
      toast.error("ღვინის დამატება ვერ მოხერხდა");
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

  const handleUpdate = async (wine: Wine) => {
    const targetLookup = wine.originalSlug || wine.slug;

    if (!wine.slug.trim()) {
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
      formData.append("slug", wine.slug); // Send mutated slug in body
      formData.append("year", wine.year);
      formData.append("price", wine.price);
      formData.append("alc", wine.alc);
      formData.append("vol", wine.vol);
      formData.append("serve", wine.serve);
      formData.append("image_alt", wine.image_alt);
      formData.append("image_alt_en", wine.image_alt_en);
      formData.append("image_alt_ru", wine.image_alt_ru);
      formData.append("name", wine.name);
      formData.append("name_en", wine.name_en);
      formData.append("name_ru", wine.name_ru);
      formData.append("type", wine.type);
      formData.append("type_en", wine.type_en);
      formData.append("type_ru", wine.type_ru);
      formData.append("description", wine.description);
      formData.append("description_en", wine.description_en);
      formData.append("description_ru", wine.description_ru);
      formData.append("origin", wine.origin);
      formData.append("origin_en", wine.origin_en);
      formData.append("origin_ru", wine.origin_ru);
      formData.append("meta_title", wine.meta_title);
      formData.append("meta_title_en", wine.meta_title_en);
      formData.append("meta_title_ru", wine.meta_title_ru);
      formData.append("meta_description", wine.meta_description);
      formData.append("meta_description_en", wine.meta_description_en);
      formData.append("meta_description_ru", wine.meta_description_ru);

      if (selectedImages[targetLookup]) {
        formData.append("image", selectedImages[targetLookup]!);
      }

      // Hit API using stable lookup identifier parameter
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/wines/${targetLookup}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      if (!res.ok) throw new Error();

      toast.success("ღვინო წარმატებით განახლდა");

      if (itemPreviews[targetLookup]) {
        URL.revokeObjectURL(itemPreviews[targetLookup]!);
        setItemPreviews((prev) => ({ ...prev, [targetLookup]: null }));
      }
      setSelectedImages((prev) => ({ ...prev, [targetLookup]: null }));

      fetchWines(token);
    } catch (err) {
      toast.error("განახლება ვერ მოხერხდა");
    } finally {
      setUpdatingSlug(null);
    }
  };

  const handleDelete = async (targetSlug: string) => {
    if (!confirm("ნამდვილად გსურთ ამ ღვინის ბარათის წაშლა?")) return;

    try {
      const token = sessionStorage.getItem("shakrianiEstateToken");
      if (!token) {
        router.replace("/admin");
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/wines/${targetSlug}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!res.ok) throw new Error();

      toast.success("ღვინო წაიშალა");
      setWines((prev) =>
        prev.filter((item) => (item.originalSlug || item.slug) !== targetSlug),
      );
    } catch (err) {
      toast.error("წაშლა ვერ მოხერხდა");
    }
  };

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-[26px] font-bold text-gray-900 tracking-tight">
          ღვინოები
        </h1>
        <p className="text-sm text-gray-500 mt-1">მართეთ შენი ღვინოები.</p>
      </div>

      {/* ========================================================================= */}
      {/* TOP SECTION: ADD WINE FORM                                               */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Top Info Layout Wrapper */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-start bg-gray-50/50">
            {/* Image Box */}
            <div className="space-y-1.5 col-span-1">
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider">
                ღვინის ფოტო
              </label>
              <div className="relative group border-2 border-dashed border-gray-300 hover:border-secondary transition-colors duration-200 rounded-lg overflow-hidden bg-white aspect-[10/14] flex flex-col items-center justify-center text-center p-2">
                {imagePreview ? (
                  <>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center justify-center">
                      <span className="text-[11px] font-medium text-white bg-black/50 px-2 py-1 rounded-md backdrop-blur-sm">
                        შეცვლა
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="space-y-1 pointer-events-none flex flex-col items-center">
                    <svg
                      className="w-6 h-6 text-gray-400 group-hover:text-secondary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                      />
                    </svg>
                    <p className="text-[11px] font-medium text-gray-400">
                      ატვირთვა
                    </p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    e.target.files && setImage(e.target.files[0])
                  }
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>

            {/* Flat Standard Data Matrix Attributes */}
            <div className="col-span-1 xl:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 h-full">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Slug იდენტიფიკატორი
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="მაგ: saperavi-premium-2024"
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-secondary bg-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                  წელი (Year)
                </label>
                <input
                  type="text"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="მაგ: 2024"
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-secondary bg-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                  ფასი (Price)
                </label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="მაგ: 45"
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-secondary bg-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                  ალკოჰოლი (Alc %)
                </label>
                <input
                  type="text"
                  value={alc}
                  onChange={(e) => setAlc(e.target.value)}
                  placeholder="მაგ: 13.5%"
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-secondary bg-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                  მოცულობა (Vol)
                </label>
                <input
                  type="text"
                  value={vol}
                  onChange={(e) => setVol(e.target.value)}
                  placeholder="მაგ: 0.75 L"
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-secondary bg-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                  სერვირება (Serve Temp)
                </label>
                <input
                  type="text"
                  value={serve}
                  onChange={(e) => setServe(e.target.value)}
                  placeholder="მაგ: 16-18°C"
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-secondary bg-white"
                />
              </div>
            </div>
          </div>

          {/* Multilingual Grid Matrix */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* KA Block */}
            <div className="space-y-4 bg-gray-50/40 p-4 rounded-xl border border-gray-200/60">
              <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                <span className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
                  🇬🇪 ქართული ვერსია
                </span>
                <span className="px-1.5 py-0.5 bg-gray-200 text-gray-600 rounded text-[10px] font-bold">
                  KA
                </span>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">
                  ღვინის დასახელება
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="მაგ: საფერავი"
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:border-secondary focus:outline-none bg-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">
                  ღვინის ტიპი
                </label>
                <input
                  type="text"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  placeholder="მაგ: მშრალი წითელი"
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:border-secondary focus:outline-none bg-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">
                  წარმოშობის ადგილი
                </label>
                <input
                  type="text"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  placeholder="მაგ: კახეთი, ყვარელი"
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:border-secondary focus:outline-none bg-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">
                  ფოტოს Alt ტექსტი
                </label>
                <input
                  type="text"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  placeholder="ფოტოს აღწერა SEO-სთვის"
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:border-secondary focus:outline-none bg-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">
                  ღვინის აღწერა
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="დაახასიათეთ გემოვნური თვისებები..."
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:border-secondary focus:outline-none bg-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  placeholder="საძიებო სათაური"
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:border-secondary focus:outline-none bg-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">
                  Meta Description
                </label>
                <textarea
                  rows={2}
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="საძიებო მოკლე აღწერა"
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:border-secondary focus:outline-none bg-white resize-none"
                />
              </div>
            </div>

            {/* EN Block */}
            <div className="space-y-4 bg-blue-50/20 p-4 rounded-xl border border-blue-100">
              <div className="flex items-center justify-between border-b border-blue-200/60 pb-2">
                <span className="text-sm font-bold text-blue-900 flex items-center gap-1.5">
                  🇬🇧 English Version
                </span>
                <span className="px-1.5 py-0.5 bg-blue-100 text-blue-600 rounded text-[10px] font-bold">
                  EN
                </span>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-blue-700">
                  Wine Name
                </label>
                <input
                  type="text"
                  value={nameEn}
                  onChange={(e) => setNameEn(e.target.value)}
                  placeholder="მაგ: Saperavi"
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:border-secondary focus:outline-none bg-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-blue-700">
                  Wine Type
                </label>
                <input
                  type="text"
                  value={typeEn}
                  onChange={(e) => setTypeEn(e.target.value)}
                  placeholder="მაგ: Dry Red"
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:border-secondary focus:outline-none bg-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-blue-700">
                  Origin Region
                </label>
                <input
                  type="text"
                  value={originEn}
                  onChange={(e) => setOriginEn(e.target.value)}
                  placeholder="მაგ: Kakheti, Kvareli"
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:border-secondary focus:outline-none bg-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-blue-700">
                  Image Alt Text
                </label>
                <input
                  type="text"
                  value={imageAltEn}
                  onChange={(e) => setImageAltEn(e.target.value)}
                  placeholder="SEO description"
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:border-secondary focus:outline-none bg-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-blue-700">
                  Wine Description
                </label>
                <textarea
                  rows={4}
                  value={descriptionEn}
                  onChange={(e) => setDescriptionEn(e.target.value)}
                  placeholder="Tasting characteristics..."
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:border-secondary focus:outline-none bg-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-blue-700">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={metaTitleEn}
                  onChange={(e) => setMetaTitleEn(e.target.value)}
                  placeholder="SEO title"
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:border-secondary focus:outline-none bg-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-blue-700">
                  Meta Description
                </label>
                <textarea
                  rows={2}
                  value={metaDescriptionEn}
                  onChange={(e) => setMetaDescriptionEn(e.target.value)}
                  placeholder="SEO description snippet"
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:border-secondary focus:outline-none bg-white resize-none"
                />
              </div>
            </div>

            {/* RU Block */}
            <div className="space-y-4 bg-red-50/20 p-4 rounded-xl border border-red-100">
              <div className="flex items-center justify-between border-b border-red-200/60 pb-2">
                <span className="text-sm font-bold text-red-900 flex items-center gap-1.5">
                  🇷🇺 Russian Version
                </span>
                <span className="px-1.5 py-0.5 bg-red-100 text-red-600 rounded text-[10px] font-bold">
                  RU
                </span>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-red-700">
                  Название вина
                </label>
                <input
                  type="text"
                  value={nameRu}
                  onChange={(e) => setNameRu(e.target.value)}
                  placeholder="მაგ: Саперави"
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:border-secondary focus:outline-none bg-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-red-700">
                  Тип вина
                </label>
                <input
                  type="text"
                  value={typeRu}
                  onChange={(e) => setTypeRu(e.target.value)}
                  placeholder="მაგ: Сухое Красное"
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:border-secondary focus:outline-none bg-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-red-700">
                  Регион происхождения
                </label>
                <input
                  type="text"
                  value={originRu}
                  onChange={(e) => setOriginRu(e.target.value)}
                  placeholder="მაგ: Кахетия, Кварели"
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:border-secondary focus:outline-none bg-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-red-700">
                  Alt текст фото
                </label>
                <input
                  type="text"
                  value={imageAltRu}
                  onChange={(e) => setImageAltRu(e.target.value)}
                  placeholder="SEO описание фотки"
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:border-secondary focus:outline-none bg-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-red-700">
                  Описание вина
                </label>
                <textarea
                  rows={4}
                  value={descriptionRu}
                  onChange={(e) => setDescriptionRu(e.target.value)}
                  placeholder="Вкусовые качества винного изделия..."
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:border-secondary focus:outline-none bg-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-red-700">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={metaTitleRu}
                  onChange={(e) => setMetaTitleRu(e.target.value)}
                  placeholder="Поисковый заголовок"
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:border-secondary focus:outline-none bg-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-red-700">
                  Meta Description
                </label>
                <textarea
                  rows={2}
                  value={metaDescriptionRu}
                  onChange={(e) => setMetaDescriptionRu(e.target.value)}
                  placeholder="Поисковое описание"
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:border-secondary focus:outline-none bg-white resize-none"
                />
              </div>
            </div>
          </div>

          {/* Actions Button */}
          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-secondary hover:bg-secondary/90 text-white font-semibold py-3 px-12 rounded-lg text-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-md"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ინფორმაცია იტვირთება...
                </>
              ) : (
                "ღვინის ასორტიმენტში დამატება"
              )}
            </button>
          </div>
        </form>
      </div>

      {/* ========================================================================= */}
      {/* BOTTOM SECTION: WINES VIEW CARDS GRID LIST                               */}
      {/* ========================================================================= */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
          <h2 className="text-xl font-bold text-gray-900">
            არსებული ღვინოების ასორტიმენტი ({wines.length})
          </h2>
        </div>

        {fetchLoading ? (
          <div className="bg-white rounded-xl border border-gray-200 p-16 text-center flex flex-col items-center justify-center">
            <div className="w-9 h-9 border-3 border-secondary/20 border-t-secondary rounded-full animate-spin mb-3" />
            <p className="text-sm text-gray-500 font-medium">
              ინფორმაცია იტვირთება მონაცემთა ბაზიდან...
            </p>
          </div>
        ) : wines.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-16 text-center">
            <p className="text-sm text-gray-400 font-medium">
              ღვინოები ვერ მოიძებნა.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {wines.map((wine) => {
              const lookupKey = wine.originalSlug || wine.slug;
              return (
                <div
                  key={lookupKey}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col max-h-[900px] overflow-y-auto custom-scrollbar"
                >
                  {/* Item Summary Header Controls */}
                  <div className="flex flex-col sm:flex-row border-b border-gray-100 bg-gray-50/50 p-4 justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div>
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                          Slug Identifier (რედაქტირებადი)
                        </label>
                        <input
                          type="text"
                          value={wine.slug || ""}
                          onChange={(e) =>
                            setWines((prev) =>
                              prev.map((item) =>
                                (item.originalSlug || item.slug) === lookupKey
                                  ? { ...item, slug: e.target.value }
                                  : item,
                              ),
                            )
                          }
                          className="w-full font-mono text-xs border border-gray-300 rounded px-2 py-1.5 text-gray-800 bg-white focus:outline-none focus:border-secondary"
                        />
                      </div>

                      {/* Metric Values Inline Controls Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        <div>
                          <label className="text-[9px] font-bold text-gray-400 block uppercase">
                            წელი
                          </label>
                          <input
                            type="text"
                            value={wine.year || ""}
                            onChange={(e) =>
                              setWines((prev) =>
                                prev.map((item) =>
                                  (item.originalSlug || item.slug) === lookupKey
                                    ? { ...item, year: e.target.value }
                                    : item,
                                ),
                              )
                            }
                            className="w-full text-xs border rounded p-1 bg-white"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] font-bold text-gray-400 block uppercase">
                            ფასი
                          </label>
                          <input
                            type="text"
                            value={wine.price || ""}
                            onChange={(e) =>
                              setWines((prev) =>
                                prev.map((item) =>
                                  (item.originalSlug || item.slug) === lookupKey
                                    ? { ...item, price: e.target.value }
                                    : item,
                                ),
                              )
                            }
                            className="w-full text-xs border rounded p-1 bg-white"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] font-bold text-gray-400 block uppercase">
                            Alc %
                          </label>
                          <input
                            type="text"
                            value={wine.alc || ""}
                            onChange={(e) =>
                              setWines((prev) =>
                                prev.map((item) =>
                                  (item.originalSlug || item.slug) === lookupKey
                                    ? { ...item, alc: e.target.value }
                                    : item,
                                ),
                              )
                            }
                            className="w-full text-xs border rounded p-1 bg-white"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] font-bold text-gray-400 block uppercase">
                            მოცულობა
                          </label>
                          <input
                            type="text"
                            value={wine.vol || ""}
                            onChange={(e) =>
                              setWines((prev) =>
                                prev.map((item) =>
                                  (item.originalSlug || item.slug) === lookupKey
                                    ? { ...item, vol: e.target.value }
                                    : item,
                                ),
                              )
                            }
                            className="w-full text-xs border rounded p-1 bg-white"
                          />
                        </div>
                        <div className="col-span-1 sm:col-span-2">
                          <label className="text-[9px] font-bold text-gray-400 block uppercase">
                            სერვირება
                          </label>
                          <input
                            type="text"
                            value={wine.serve || ""}
                            onChange={(e) =>
                              setWines((prev) =>
                                prev.map((item) =>
                                  (item.originalSlug || item.slug) === lookupKey
                                    ? { ...item, serve: e.target.value }
                                    : item,
                                ),
                              )
                            }
                            className="w-full text-xs border rounded p-1 bg-white"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Wine Image Box Frame */}
                    <div className="relative aspect-[10/13] w-28 sm:w-32 bg-gray-100 border border-gray-200 rounded-lg overflow-hidden shrink-0 self-center">
                      <img
                        src={itemPreviews[lookupKey] || wine.image}
                        alt="Wine layout frame"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <label className="cursor-pointer bg-white text-gray-800 text-[10px] font-bold px-2 py-1 rounded shadow-sm border">
                          შეცვლა
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              e.target.files &&
                              handleItemImageChange(
                                lookupKey,
                                e.target.files[0],
                              )
                            }
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Multi-language inputs container blocks */}
                  <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* KA Translation inputs */}
                    <div className="space-y-2 bg-gray-50/50 p-2.5 rounded-lg border border-gray-200/60 text-xs">
                      <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wide border-b pb-1 mb-2 flex items-center gap-1">
                        <span className="px-1 bg-gray-200 text-gray-600 rounded text-[9px]">
                          KA
                        </span>{" "}
                        ქართული
                      </div>
                      <input
                        type="text"
                        placeholder="სახელი"
                        value={wine.name || ""}
                        onChange={(e) =>
                          setWines((prev) =>
                            prev.map((item) =>
                              (item.originalSlug || item.slug) === lookupKey
                                ? { ...item, name: e.target.value }
                                : item,
                            ),
                          )
                        }
                        className="w-full border border-gray-200 rounded p-1.5 focus:outline-none bg-white"
                      />
                      <input
                        type="text"
                        placeholder="ტიპი"
                        value={wine.type || ""}
                        onChange={(e) =>
                          setWines((prev) =>
                            prev.map((item) =>
                              (item.originalSlug || item.slug) === lookupKey
                                ? { ...item, type: e.target.value }
                                : item,
                            ),
                          )
                        }
                        className="w-full border border-gray-200 rounded p-1.5 focus:outline-none bg-white"
                      />
                      <input
                        type="text"
                        placeholder="რეგიონი"
                        value={wine.origin || ""}
                        onChange={(e) =>
                          setWines((prev) =>
                            prev.map((item) =>
                              (item.originalSlug || item.slug) === lookupKey
                                ? { ...item, origin: e.target.value }
                                : item,
                            ),
                          )
                        }
                        className="w-full border border-gray-200 rounded p-1.5 focus:outline-none bg-white"
                      />
                      <input
                        type="text"
                        placeholder="Image Alt"
                        value={wine.image_alt || ""}
                        onChange={(e) =>
                          setWines((prev) =>
                            prev.map((item) =>
                              (item.originalSlug || item.slug) === lookupKey
                                ? { ...item, image_alt: e.target.value }
                                : item,
                            ),
                          )
                        }
                        className="w-full border border-gray-200 rounded p-1.5 focus:outline-none bg-white"
                      />
                      <textarea
                        rows={4}
                        placeholder="აღწერა..."
                        value={wine.description || ""}
                        onChange={(e) =>
                          setWines((prev) =>
                            prev.map((item) =>
                              (item.originalSlug || item.slug) === lookupKey
                                ? { ...item, description: e.target.value }
                                : item,
                            ),
                          )
                        }
                        className="w-full border border-gray-200 rounded p-1.5 focus:outline-none bg-white"
                      />
                      <input
                        type="text"
                        placeholder="Meta Title"
                        value={wine.meta_title || ""}
                        onChange={(e) =>
                          setWines((prev) =>
                            prev.map((item) =>
                              (item.originalSlug || item.slug) === lookupKey
                                ? { ...item, meta_title: e.target.value }
                                : item,
                            ),
                          )
                        }
                        className="w-full border border-gray-200 rounded p-1.5 focus:outline-none bg-white"
                      />
                      <textarea
                        rows={2}
                        placeholder="Meta Description"
                        value={wine.meta_description || ""}
                        onChange={(e) =>
                          setWines((prev) =>
                            prev.map((item) =>
                              (item.originalSlug || item.slug) === lookupKey
                                ? { ...item, meta_description: e.target.value }
                                : item,
                            ),
                          )
                        }
                        className="w-full border border-gray-200 rounded p-1.5 focus:outline-none bg-white resize-none"
                      />
                    </div>

                    {/* EN Translation inputs */}
                    <div className="space-y-2 bg-blue-50/10 p-2.5 rounded-lg border border-blue-100/40 text-xs">
                      <div className="text-[11px] font-bold text-blue-500 uppercase tracking-wide border-b pb-1 mb-2 flex items-center gap-1">
                        <span className="px-1 bg-blue-100 text-blue-600 rounded text-[9px]">
                          EN
                        </span>{" "}
                        English
                      </div>
                      <input
                        type="text"
                        placeholder="Wine Name"
                        value={wine.name_en || ""}
                        onChange={(e) =>
                          setWines((prev) =>
                            prev.map((item) =>
                              (item.originalSlug || item.slug) === lookupKey
                                ? { ...item, name_en: e.target.value }
                                : item,
                            ),
                          )
                        }
                        className="w-full border border-gray-200 rounded p-1.5 focus:outline-none bg-white"
                      />
                      <input
                        type="text"
                        placeholder="Wine Type"
                        value={wine.type_en || ""}
                        onChange={(e) =>
                          setWines((prev) =>
                            prev.map((item) =>
                              (item.originalSlug || item.slug) === lookupKey
                                ? { ...item, type_en: e.target.value }
                                : item,
                            ),
                          )
                        }
                        className="w-full border border-gray-200 rounded p-1.5 focus:outline-none bg-white"
                      />
                      <input
                        type="text"
                        placeholder="Origin"
                        value={wine.origin_en || ""}
                        onChange={(e) =>
                          setWines((prev) =>
                            prev.map((item) =>
                              (item.originalSlug || item.slug) === lookupKey
                                ? { ...item, origin_en: e.target.value }
                                : item,
                            ),
                          )
                        }
                        className="w-full border border-gray-200 rounded p-1.5 focus:outline-none bg-white"
                      />
                      <input
                        type="text"
                        placeholder="Image Alt"
                        value={wine.image_alt_en || ""}
                        onChange={(e) =>
                          setWines((prev) =>
                            prev.map((item) =>
                              (item.originalSlug || item.slug) === lookupKey
                                ? { ...item, image_alt_en: e.target.value }
                                : item,
                            ),
                          )
                        }
                        className="w-full border border-gray-200 rounded p-1.5 focus:outline-none bg-white"
                      />
                      <textarea
                        rows={4}
                        placeholder="Description..."
                        value={wine.description_en || ""}
                        onChange={(e) =>
                          setWines((prev) =>
                            prev.map((item) =>
                              (item.originalSlug || item.slug) === lookupKey
                                ? { ...item, description_en: e.target.value }
                                : item,
                            ),
                          )
                        }
                        className="w-full border border-gray-200 rounded p-1.5 focus:outline-none bg-white"
                      />
                      <input
                        type="text"
                        placeholder="Meta Title"
                        value={wine.meta_title_en || ""}
                        onChange={(e) =>
                          setWines((prev) =>
                            prev.map((item) =>
                              (item.originalSlug || item.slug) === lookupKey
                                ? { ...item, meta_title_en: e.target.value }
                                : item,
                            ),
                          )
                        }
                        className="w-full border border-gray-200 rounded p-1.5 focus:outline-none bg-white"
                      />
                      <textarea
                        rows={2}
                        placeholder="Meta Description"
                        value={wine.meta_description_en || ""}
                        onChange={(e) =>
                          setWines((prev) =>
                            prev.map((item) =>
                              (item.originalSlug || item.slug) === lookupKey
                                ? {
                                    ...item,
                                    meta_description_en: e.target.value,
                                  }
                                : item,
                            ),
                          )
                        }
                        className="w-full border border-gray-200 rounded p-1.5 focus:outline-none bg-white resize-none"
                      />
                    </div>

                    {/* RU Translation inputs */}
                    <div className="space-y-2 bg-red-50/10 p-2.5 rounded-lg border border-red-100/40 text-xs">
                      <div className="text-[11px] font-bold text-red-500 uppercase tracking-wide border-b pb-1 mb-2 flex items-center gap-1">
                        <span className="px-1 bg-red-100 text-red-600 rounded text-[9px]">
                          RU
                        </span>{" "}
                        Russian
                      </div>
                      <input
                        type="text"
                        placeholder="Название вина"
                        value={wine.name_ru || ""}
                        onChange={(e) =>
                          setWines((prev) =>
                            prev.map((item) =>
                              (item.originalSlug || item.slug) === lookupKey
                                ? { ...item, name_ru: e.target.value }
                                : item,
                            ),
                          )
                        }
                        className="w-full border border-gray-200 rounded p-1.5 focus:outline-none bg-white"
                      />
                      <input
                        type="text"
                        placeholder="Тип вина"
                        value={wine.type_ru || ""}
                        onChange={(e) =>
                          setWines((prev) =>
                            prev.map((item) =>
                              (item.originalSlug || item.slug) === lookupKey
                                ? { ...item, type_ru: e.target.value }
                                : item,
                            ),
                          )
                        }
                        className="w-full border border-gray-200 rounded p-1.5 focus:outline-none bg-white"
                      />
                      <input
                        type="text"
                        placeholder="Происхождение"
                        value={wine.origin_ru || ""}
                        onChange={(e) =>
                          setWines((prev) =>
                            prev.map((item) =>
                              (item.originalSlug || item.slug) === lookupKey
                                ? { ...item, origin_ru: e.target.value }
                                : item,
                            ),
                          )
                        }
                        className="w-full border border-gray-200 rounded p-1.5 focus:outline-none bg-white"
                      />
                      <input
                        type="text"
                        placeholder="Image Alt"
                        value={wine.image_alt_ru || ""}
                        onChange={(e) =>
                          setWines((prev) =>
                            prev.map((item) =>
                              (item.originalSlug || item.slug) === lookupKey
                                ? { ...item, image_alt_ru: e.target.value }
                                : item,
                            ),
                          )
                        }
                        className="w-full border border-gray-200 rounded p-1.5 focus:outline-none bg-white"
                      />
                      <textarea
                        rows={4}
                        placeholder="Описание..."
                        value={wine.description_ru || ""}
                        onChange={(e) =>
                          setWines((prev) =>
                            prev.map((item) =>
                              (item.originalSlug || item.slug) === lookupKey
                                ? { ...item, description_ru: e.target.value }
                                : item,
                            ),
                          )
                        }
                        className="w-full border border-gray-200 rounded p-1.5 focus:outline-none bg-white"
                      />
                      <input
                        type="text"
                        placeholder="Meta Title"
                        value={wine.meta_title_ru || ""}
                        onChange={(e) =>
                          setWines((prev) =>
                            prev.map((item) =>
                              (item.originalSlug || item.slug) === lookupKey
                                ? { ...item, meta_title_ru: e.target.value }
                                : item,
                            ),
                          )
                        }
                        className="w-full border border-gray-200 rounded p-1.5 focus:outline-none bg-white"
                      />
                      <textarea
                        rows={2}
                        placeholder="Meta Description"
                        value={wine.meta_description_ru || ""}
                        onChange={(e) =>
                          setWines((prev) =>
                            prev.map((item) =>
                              (item.originalSlug || item.slug) === lookupKey
                                ? {
                                    ...item,
                                    meta_description_ru: e.target.value,
                                  }
                                : item,
                            ),
                          )
                        }
                        className="w-full border border-gray-200 rounded p-1.5 focus:outline-none bg-white resize-none"
                      />
                    </div>
                  </div>

                  {/* Card Actions Bottom Block */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 border-t border-gray-100 mt-auto shrink-0">
                    <button
                      onClick={() => handleDelete(lookupKey)}
                      className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1 transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      წაშლა
                    </button>

                    <button
                      onClick={() => handleUpdate(wine)}
                      disabled={updatingSlug === lookupKey}
                      className="bg-primary hover:bg-primary/95 text-white font-medium text-xs px-5 py-2 rounded-md transition-colors disabled:opacity-50 flex items-center gap-1.5 shadow-sm"
                    >
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
