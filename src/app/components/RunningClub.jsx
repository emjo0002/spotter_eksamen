"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import "../../app/globals.css";

export default function RunningClub() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const btnRef = useRef(null);
  const imagesRef = useRef([]);
  const cardRef = useRef(null);
  const [loadedImages, setLoadedImages] = useState(0);

  useEffect(() => {
    if (loadedImages < 3) return;
  
    gsap.registerPlugin(ScrollTrigger);
  
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          id: "runningclub-trigger",
          trigger: containerRef.current,
          start: "top center",
          toggleActions: "play reverse play reverse",
        },
      });
  
      const leftSide = [titleRef.current, descRef.current, btnRef.current];
      tl.from(leftSide, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.15,
      });
  
      tl.from(
        [...imagesRef.current, cardRef.current],
        {
          opacity: 0,
          y: 30,
          duration: 1,
          ease: "power2.out",
        },
        0
      )
  
      .from(
        cardRef.current.querySelectorAll("p, h2"),
        {
          opacity: 0,
          y: 15,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
        },
        "-=0.2"
      );
    }, containerRef);
  
    return () => ctx.revert();
  }, [loadedImages]);

  return (
    <section className="relative px-[clamp(4rem,10vw,20rem)] items-center py-[clamp(4rem,10vw,20rem)]">
      <div
        ref={containerRef}
        className="flex flex-col lg:flex-row w-full gap-8 items-center"
      >

        <div className="w-[99%] md:w-[74%] lg:w-[50%] flex flex-col order-2 lg:order-1">
          <div ref={titleRef}>
            <h1 className="text-[clamp(2rem,3.2vw,5rem)] text-[var(--black)] font-bold tracking-tighter">
              Mangler du en løbeklub?
            </h1>
            <h2 className="opacity-70 text-[clamp(1rem,2.3vw,1.5rem)]">
              Tirsdage kl. 7:30, Nørrebrogade 26
            </h2>
          </div>

          <p
            ref={descRef}
            className="text-[clamp(0.2rem,4vw,1.2rem)] lg:text-[clamp(0.2rem,4vw,1.2rem)] pt-[5%] pb-[5%] lg:pt-[10%] lg:pb-[10%]"
          >
            Hver tirsdag kl. 7:40 løber vi fra vores butik på Nørrebrogade 26.
            Alle niveauer er velkomne – uanset om du er nybegynder eller
            erfaren løber. Vi deler os op i tempo-grupper, så alle kan være med.
            Efter løbet byder vi på en kop kaffe og god stemning i butikken.
          </p>

          <div ref={btnRef}>
            <button
              href="/"
              className="border bg-[var(--black)] text-[var(--white)] px-6 py-2 text-xs tracking-wider hover:bg-[var(--white)] hover:text-[var(--black)] transition rounded-xl w-30 text-center inline-block"
            >
            Tilmeld dig
           </button>
          </div>
        </div>

        <div className="w-[99%] md:w-[72%] lg:w-[48%] grid grid-cols-2 order-1 lg:order-2">
          <Image
            ref={(el) => (imagesRef.current[0] = el)}
            src="/photos/Runningclub3.webp"
            alt="Running Club 1"
            width={300}
            height={300}
            onLoad={() => setLoadedImages((count) => count + 1)}
          />
          <Image
            ref={(el) => (imagesRef.current[1] = el)}
            src="/photos/Runningclub2.webp"
            alt="Running Club 2"
            width={300}
            height={300}
            onLoad={() => setLoadedImages((count) => count + 1)}
          />
          <Image
            ref={(el) => (imagesRef.current[2] = el)}
            src="/photos/Runningclub1.webp"
            alt="Running Club 3"
            width={300}
            height={300}
            onLoad={() => setLoadedImages((count) => count + 1)}
          />

          <div
            ref={cardRef}
            className="aspect-square w-full bg-[var(--spotter-green)] text-[var(--white)] flex flex-col justify-between font-sans"
          >
            <div className="text-right leading-tight text-[clamp(1.5rem,2vw,2rem)] md:text-[clamp(1.5rem,3vw,4rem)] lg:text-[clamp(1.5rem,2vw,2rem)] font-extrabold uppercase pr-[5%]">
              <p className="italic">Spotter</p>
              <p className="-mt-3 italic">Runner</p>
              <p className="-mt-3 italic">Club</p>
            </div>

            <div className="text-left text-[clamp(0.5rem,1.5vw,1rem)] md:text-[clamp(0.5rem,2vw,2rem)] lg:text-[clamp(0.5rem,1vw,1rem)] font-semibold flex pt-[3%] pr-[5%] pl-[5%] justify-between">
              <div>
                <p>Tuesdays</p>
                <p>7:15am</p>
              </div>
              <p className="text-base italic font-semibold">@Spotter</p>
            </div>

            <div className="pt-[1%]">
              <h2 className="text-[clamp(3rem,10vw,15rem)] md:text-[clamp(2rem,7vw,10rem)] lg:text-[clamp(1.5rem,5vw,4.5rem)] font-extrabold leading-none italic">
                RUN
              </h2>
              <h2 className="text-[clamp(3rem,10vw,15rem)] md:text-[clamp(2rem,7vw,10rem)] lg:text-[clamp(1.5rem,5vw,4.5rem)] font-extrabold leading-none italic -mt-[6%] text-right pr-[5%]">
                CLUB
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
