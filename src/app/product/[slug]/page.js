"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../lib/supabase";
import Image from "next/image";
import Breadcrumbs from "../../components/Breadcrumbs";
import BackButton from "@/app/components/BackButton";
import { useCartStore } from "../../lib/useCartStore";

export default function ProductSlugPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState("Standard");
  const [mainImage, setMainImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  useEffect(() => {
    async function fetchProduct() {
      const { data, error } = await supabase.from("spotter_produkter").select("*").eq("slug", slug).single();

      if (error) {
        console.error("Produkt ikke fundet:", error);
      } else {
        setProduct(data);
        setMainImage(data.image);
      }

      setLoading(false);
    }

    if (slug) fetchProduct();
  }, [slug]);

  if (loading) return <p className="p-6">Indlæser produkt...</p>;
  if (!product) return <p className="p-6">Produkt ikke fundet.</p>;

  const allImages = [product.image, product.image2, product.image3].filter((img) => img && img !== mainImage);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 pt-[15%] lg:pt-[10%]">
      <BackButton />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 pt-5">
        <div>
          <div className="relative aspect-square w-full rounded overflow-hidden">
            <Image
            src={mainImage}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            priority
          />
          </div>

          <div className="mt-4 flex gap-4">
            {allImages.map((img, i) => (
              <div key={i} className="relative w-[100px] h-[100px] rounded overflow-hidden">
              <Image
                src={img}
                alt={`thumb-${i}`}
                fill
                sizes="100px"
                onClick={() => setMainImage(img)}
                className="object-cover cursor-pointer hover:opacity-70 transition"
              />
            </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-start">
          <Breadcrumbs product={product} />
          <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
          <p className="text-sm text-gray-500 mb-6">{product.category}</p>

          <p className="text-lg text-gray-700 mb-6 leading-relaxed">{product.description}</p>

          <hr className="mb-6" />

          <div className="mb-6">
            <label htmlFor="variant" className="block text-sm font-medium mb-2 text-gray-700">
              Vælg variant:
            </label>
            {product.variants && product.variants.length > 0 && (
              <select
                id="variant"
                value={selectedVariant}
                onChange={(e) => {
                  const selectedSlug = e.target.value;
                  setSelectedVariant(selectedSlug);
                  window.location.href = `/product/${selectedSlug}`;
                }}
                className="border border-gray-300 px-4 py-2 rounded w-full"
              >
                {product.variants.map((variant, i) => (
                  <option key={i} value={variant.slug}>
                    {variant.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="mb-4">
            <p className="text-3xl font-semibold mb-2">{product.price},–</p>
            {product.sold_out ? (
              <p className="text-red-600 font-semibold">Ikke på lager</p>
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  addItem({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                  });
                }}
                className="w-full bg-[var(--black)] text-[var(--white)] px-6 py-3 rounded hover:opacity-90 hover:text-black  transition mb-3"
              >
                Læg i kurv
              </button>
            )}
          </div>

          <hr className="my-6" />

          <div>
            <h3 className="text-md font-semibold mb-2">Spotters råd til dig</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{product.spottersadvice}</p>
          </div>
        </div>
      </div>

      <div className="mt-20 px-[clamp(4rem,10vw,20rem)] flex flex-col">
        <h2 className="text-[clamp(2rem,3.2vw,4rem)] font-bold mb-4 self-center">Hvad synes andre?</h2>
        {Array.isArray(product.review) && product.review.length > 0 ? (
          <>
            <p className="mb-6 text-sm opacity-70 self-center">{product.review.length} reviews</p>
            {product.review.map((rev, i) => (
              <div key={i} className="py-6 border-b border-[var(--black)]">
                <p className="font-semibold mb-1">{rev.name}</p>
                <div className="flex items-center text-[var(--spotter-green)] mb-2">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                  <span
                    key={starIndex}
                    className={starIndex < Number(rev.stars) ? "opacity-100" : "opacity-40"}
                  >
                    ★
                  </span>
                ))}
              </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {rev.desc || "Ingen kommentar."}
                </p>
              </div>
            ))}
          </>
        ) : (
          <p className="text-sm text-gray-500">Ingen anmeldelser endnu.</p>
        )}
      </div>
    </div>
  );
}
