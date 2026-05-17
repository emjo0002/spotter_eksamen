"use client";

import { usePathname } from "next/navigation";
import { useRef, useEffect } from "react";
import Link from "next/link";
import Basket from "./Basket";
import BurgerMenu from "./Burgermenu";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import { IoIosSearch } from "react-icons/io";

export default function Header() {
  const pathname = usePathname();
  const isIndex = pathname === "/";
  const headerRef = useRef(null);
  const textDesktopRef = useRef(null);
  const textMobileRef = useRef(null);

  useEffect(() => {
    if (isIndex && typeof window !== "undefined") {
      window.spotterHeader = headerRef.current;
    }
  }, [isIndex]);

  useEffect(() => {
    if (!isIndex) return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      [textDesktopRef.current, textMobileRef.current],
      { opacity: 0 },
      {
        opacity: 1,
        delay: 0.5,
        duration: 1.9,
        ease: "power2.out",
      }
    );

    let headerTL;
    const mm = gsap.matchMedia();

    mm.add("(max-width: 1025px)", () => {
      const el = textMobileRef.current;
      if (!el) return;

      gsap.set(el, {
        y: "22rem",
        scale: 4.2,
        color: "#FFFFFF",
      });

      headerTL = gsap.to(el, {
        y: "0.2rem",
        scale: 1,
        color: "#000000",
        ease: "none",
        scrollTrigger: {
          id: "headerScrollTriggerMobile",
          trigger: el,
          start: "center center",
          end: "top top",
          scrub: true,
        },
      });
    });

    mm.add("(min-width: 1025px)", () => {
      const el = textDesktopRef.current;
      if (!el) return;

      gsap.set(el, {
        y: "22rem",
        scale: 10,
        color: "#FFFFFF",
      });

      headerTL = gsap.to(el, {
        y: "0.2rem",
        scale: 1.2,
        color: "#000000",
        ease: "none",
        scrollTrigger: {
          id: "headerScrollTriggerDesktop",
          trigger: el,
          start: "center center",
          end: "top top",
          scrub: true,
        },
      });
    });

    return () => {
      ScrollTrigger.getById("headerScrollTriggerMobile")?.kill();
      ScrollTrigger.getById("headerScrollTriggerDesktop")?.kill();
      headerTL?.kill();
    };
  }, [isIndex]);

  return (
    <header
  ref={isIndex ? headerRef : null}
  className={`w-full px-6 py-3 fixed z-50 text-[var(--black)] ${
    !isIndex ? "bg-[var(--white)]" : ""
  }`}
    >
      {isIndex && (
        <div
          id="header-bg"
          className="absolute inset-0 bg-[var(--white)] z-[-1] transition-opacity duration-0"
        />
      )}

      {isIndex && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-30 pointer-events-none hidden lg:block">
          <h1
            ref={textDesktopRef}
            className="text-[clamp(1rem,4vw,1.5rem)] italic tracking-[-0.08em] opacity-0 drop-shadow-2xl"
          >
            Spotter.
          </h1>
        </div>
      )}

      {isIndex && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-30 pointer-events-none lg:hidden">
          <h1
            ref={textMobileRef}
            className="text-[clamp(1rem,6vw,2rem)] italic tracking-[-0.08em] opacity-0 drop-shadow-2xl"
          >
            Spotter.
          </h1>
        </div>
      )}

      <div className="w-full mx-auto hidden lg:flex justify-between items-center relative z-50">
        <nav className="flex gap-6 text-lg relative">
          <div className="relative group">
            <Link href="/productlist" className="hover:underline">Produkter</Link>
            <div className="group-hover:flex absolute -left-6 top-full bg-white shadow-xl rounded-md z-50 transition-all duration-500 ease-in-out opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 pointer-events-none group-hover:pointer-events-auto">
              <div className="grid grid-cols-[1fr_1fr_1fr_2fr_2fr] gap-8 w-screen p-6 pt-9 h-[45vh]">
                <div className="flex flex-col gap-4">
                  <p className="opacity-70 text-xs mb-2 font-medium">Produkter</p>
                  <Link href="/productlist?category=proteinpulver" className="text-sm font-normal hover:underline">Proteinpulver</Link>
                  <Link href="/productlist?category=kreatin" className="text-sm font-normal hover:underline">Kreatin</Link>
                  <Link href="/productlist?category=vegansk" className="text-sm font-normal hover:underline">Vegansk</Link>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="opacity-70 mb-3 text-xs">Accessories</p>
                  <Link href="/productlist?category=merch" className="text-sm font-normal hover:underline">Spotter merch</Link>
                  <Link href="/productlist?category=udstyr" className="text-sm font-normal hover:underline">Udstyr</Link>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="opacity-70 mb-2 text-xs">Vejledning</p>
                  <Link href="/guides/opskrifter" className="text-sm font-normal hover:underline">Opskrifter</Link>
                  <Link href="/guides/ny" className="text-sm font-normal hover:underline">Ny til træning?</Link>
                </div>
                <div><Image src="/photos/smoothie.webp" alt="Billede 1" width={300} height={200} className="object-cover rounded-lg" style={{ width: "auto", height: "auto" }} /></div>
                <div><Image src="/photos/flasker.webp" alt="Billede 2" width={300} height={200} className="object-cover rounded-lg" style={{ width: "auto", height: "auto" }} /></div>
              </div>
            </div>
          </div>

          <Link href="/psykiatrifonden" className="hover:underline">Psykiatrifonden</Link>
          <Link href="/omos" className="hover:underline">Om os</Link>
          <Link href="/contact" className="hover:underline">Kontakt</Link>
        </nav>

        <div className="flex items-center gap-2">
          <IoIosSearch className="text-[35px]" />
          <Basket />
        </div>

        {!isIndex && (
          <div className="absolute left-1/2 -translate-x-1/2">
            <Link href="/" className="font-bold italic tracking-[-0.08em] text-[clamp(1rem,4vw,1.5rem)] scale-[1.2]">
              Spotter.
            </Link>
          </div>
        )}
      </div>

      <div className="lg:hidden flex items-center justify-end gap-4">
        <IoIosSearch className="text-[35px]" />
        <Basket />
        {!isIndex && (
          <div className="absolute left-1/2 -translate-x-1/2 font-bold italic tracking-[-0.08em] text-2xl">
            <Link href="/">Spotter.</Link>
          </div>
        )}
        <BurgerMenu />
      </div>
    </header>
  );
}
