"use client";
import { useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabase";
import ProductCard from "./ProductCard";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Bundles() {
  const [products, setProducts] = useState([]);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const imageRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from("spotter_produkter")
        .select("*")
        .eq("category", "Bundles");

      if (error) {
        console.error("Supabase-fejl:", error);
      } else {
        setProducts(data);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (products.length === 0) return;

    cardsRef.current = cardsRef.current.slice(0, products.length);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          id: "bundles-trigger",
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play reverse play reverse",
        },
      });

      // Produktkort animation – starter sammen med titlen
      tl.from(cardsRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.1,
      });

      // Titel, beskrivelse og billede
      tl.from(
        titleRef.current,
        {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: "power2.out",
        },
        "<"
      )
        .from(
          descRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .from(
          imageRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        );

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [products]);

  return (
    <section className="w-full flex justify-center px-5 lg:h-screen py-[clamp(4rem,5vw,10rem)] bp-10">
      <div ref={sectionRef} className="max-w-[1350px]">
        <div className="grid lg:grid-cols-[1fr_1fr] mb-16 gap-7">
          <div className="flex flex-col-reverse lg:flex-col">
            <div>
              <h2
                ref={titleRef}
                className="text-[clamp(2rem,3.2vw,4rem)] font-bold mb-4 text-[var(--black)]"
              >
                Har du travlt?
              </h2>
              <p ref={descRef} className="text-lg max-w-xl leading-relaxed">
                Spotter har sammensat nogle bundles til dig, der har travlt – så
                du hurtigt kan finde det, du leder efter, og komme videre med
                dagen.
              </p>
            </div>

            <Image
              ref={imageRef}
              src="/photos/runningmaskot.png"
              alt="Running maskot"
              width={200}
              height={200}
              className="lg:mt-14"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {products.length === 0 ? (
              <p>Ingen produkter fundet.</p>
            ) : (
              products.map((product, i) => (
                <div key={product.id} ref={(el) => (cardsRef.current[i] = el)}>
                  <ProductCard product={product} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
