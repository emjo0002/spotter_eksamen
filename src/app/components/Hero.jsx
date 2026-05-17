"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function Hero() {
  const taglineRef = useRef(null);
  const mobileImageRef = useRef(null);
  const desktopImageRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  
    const ctx = gsap.context(() => {
      if (taglineRef.current) {
        gsap.fromTo(
          taglineRef.current,
          { opacity: 1 },
          {
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: taglineRef.current,
              start: "top-=30 center",
              end: "center center",
              scrub: true,
            },
          }
        );
      }
  
      if (mobileImageRef.current) {
        gsap.fromTo(
          mobileImageRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            delay: 0,
            duration: 1,
            ease: "power2.out",
          }
        );
      }
  
      if (desktopImageRef.current) {
        gsap.fromTo(
          desktopImageRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            delay: 0,
            duration: 1,
            ease: "power2.out",
          }
        );
      }
    });
  
    return () => ctx.revert();
  }, []);

  return (
    <section className="h-screen relative flex items-center justify-center px-6 lg:px-[clamp(4rem,12vw,20rem)] overflow-hidden">
      <h3
        ref={taglineRef}
        className="absolute top-[56%] lg:top-[62%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-30 text-xl text-[var(--white)] lg:text-4xl font-black"
      >
        sundhed med mening
      </h3>

      <div ref={mobileImageRef} className="absolute inset-0 z-0 lg:hidden opacity-0">
        <Image
          src="/photos/hero.webp"
          alt="Workshop billede"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div ref={desktopImageRef} className="hidden lg:block z-0 opacity-0">
        <Image
          src="/photos/hero.webp"
          alt="Workshop billede"
          width={1920}
          height={1080}
          className="rounded-lg"
        />
      </div>
    </section>
  );
}
