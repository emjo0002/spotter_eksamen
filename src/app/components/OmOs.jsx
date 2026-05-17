"use client";
import { useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Omos() {
  useEffect(() => {
    const sections = gsap.utils.toArray(".psy-section");
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top bottom-=200",
            toggleActions: "play none none reverse",
            markers: true,
          },
        }
      );
    });
  }, []);

  return (
    <section className="bg-[var(--white)] text-[#2c2c2c] py-24 px-4 sm:px-6 lg:px-16 space-y-32 pt-64">
      <div className="max-w-4xl mx-auto text-center psy-section">
        <h2 className="text-sm uppercase text-[#4D6A4E] tracking-widest mb-2">Spotter</h2>
        <h1 className="text-5xl font-bold mb-6">OM OS</h1>
        <p className="text-lg leading-relaxed">Spotter er grundlagt af Frederik og Kristian, som begge lever med bipolar lidelse og ADHD. Netop det faktum har været en naturlig del af rejsen og inspirationen bag navnet Spotter, som betyder “hjælper”. At hjælpe for Spotter sker både i butikken med ærlig vejledning, til vores events og gennem vores samarbejde med Psykiatrifonden. </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center psy-section">
      <Image
        src="/photos/om_os_frederik.webp"
        alt="om os"
        width={500}
        height={500}
        className="rounded-lg mx-auto"
      />
        <div>
          <h2 className="text-3xl font-bold mb-4">Sundhed med mening</h2>
          <p className="text-base leading-relaxed mb-4">Hos Spotter ønsker vi at adskille os fra mange andre i branchen. Vi forhandler kosttilskud, men henvender os til den almindelige dansker, og ikke fitnessverdenen. Det handler om at tage hånd om både krop og sind. Til dagligt møder du Frederik og Kristian, som til dagligt arbejder i butikken og vil tage imod dig med åbne arme og vejledning. </p>
          <button className="mt-6 border bg-[var(--black)] text-[var(--white)] px-6 py-2 text-xs tracking-wider hover:bg-[var(--white)] hover:text-[var(--black)] transition rounded-xl w-30 text-center">Læs mere</button>
        </div>
      </div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center psy-section">
  <Image
    src="/photos/helping.webp"
    alt="Workshop billede"
    width={500}
    height={500}
    className="rounded-lg mx-auto order-1 md:order-2"
  />

  <div className="order-2 md:order-1">
    <h2 className="text-3xl font-bold mb-4">Samarbejde med Psykiatrifonden</h2>
    <p className="text-base leading-relaxed mb-4">
      Hos Spotter samarbejder vi med Psykiatrifonden, hvor vi har skabt tøj og afholdt events, i samarbejde med Psykiatrifonden, og så donerer vi overskuddet til deres arbejde. Vi tror på, at alle har brug for støtte, og vi vil gerne være dem, der hjælper.
    </p>
    <button className="mt-6 border bg-[var(--black)] text-[var(--white)] px-6 py-2 text-xs tracking-wider hover:bg-[var(--white)] hover:text-[var(--black)] transition rounded-xl w-30 text-center">
      Læs mere
    </button>
  </div>
</div>

    </section>
  );
}
