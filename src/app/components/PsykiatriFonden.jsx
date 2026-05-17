"use client";
import { useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PsykiatriFonden() {
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
          },
        }
      );
    });
  }, []);

  return (
    <section className="bg-[var(--white)] text-[#2c2c2c] py-20 px-4 sm:px-6 lg:px-16 space-y-32 pt-64">
      <div className="max-w-4xl mx-auto text-center psy-section">
        <h2 className="text-sm uppercase text-[#4D6A4E] tracking-widest mb-2">DERES ARBEJDE</h2>
        <div className="flex justify-center pl-[5%] items-center">
        <h1 className="text-5xl font-bold mb-6">Psykiatrifonden</h1>
        <div>
          <Image src="/photos/psykiatrifondenlogo.png" alt="Mentalt helbred billede" width={50} height={50} className="mb-10" />
        </div>
        </div>
        <p className="text-lg leading-relaxed mb-6">Psykiatrifonden arbejder for et samfund, hvor alle har mulighed for et godt liv uanset psykisk sygdom. De tilbyder rådgivning, oplysning og undervisning for at nedbryde fordomme og skabe bedre forståelse for mental sundhed. </p>
        <button className="border bg-[var(--black)] text-[var(--white)] px-6 py-2 text-xs tracking-wider hover:bg-[var(--white)] hover:text-[var(--black)] transition rounded-xl w-30 text-center">Læs mere</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24 psy-section">
        <div className="order-2 md:order-1">
          <h2 className="text-sm uppercase text-[#4D6A4E] tracking-widest mb-2">HVORDAN ARBEJDER DE</h2>
          <h1 className="text-4xl font-semibold mb-4">Workshops & Oplysning</h1>
          <p className="text-base leading-relaxed mb-6">Gennem undervisning og oplysningskampagner arbejder Psykiatrifonden på at udbrede viden om psykisk sundhed, så vi sammen kan skabe en mere inkluderende fremtid. Du kan melde dig på hold, workshops ved at klikke på "læs mere". </p>
          <button className="mt-6 border bg-[var(--black)] text-[var(--white)] px-6 py-2 text-xs tracking-wider hover:bg-[var(--white)] hover:text-[var(--black)] transition rounded-xl w-30 text-center">Læs mere</button>
        </div>
        <div className="order-1 md:order-2">
        <Image
              src="/photos/workshopogoplysning.webp"
              alt="Workshop billede"
              width={400}
              height={400}
              className="rounded-lg mx-auto"
            />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center psy-section">
        <div>
          <Image
              src="/photos/maskotmedhjerte.png"
              alt="Workshop billede"
              width={400}
              height={400}
              className="rounded-lg mx-auto"
            />
        </div>
        <div>
          <h2 className="text-sm uppercase text-[#4D6A4E] tracking-widest mb-2">STØT OG GØR EN FORSKEL</h2>
          <h1 className="text-4xl font-semibold mb-4">Støt Psykiatrifonden</h1>
          <p className="text-base leading-relaxed mb-6">Vil du støtte Psykiatrifondens arbejde for bedre mental trivsel i Danmark? Din støtte går direkte til rådgivning, kampagner og undervisning. Du kan læse mere om hvad du støtter og hvordan du støtter, ved at trykke på knappen herunder. </p>
          <button className="mt-6 border bg-[var(--black)] text-[var(--white)] px-6 py-2 text-xs tracking-wider hover:bg-[var(--white)] hover:text-[var(--black)] transition rounded-xl w-30 text-center">Læs mere</button>
        </div>
      </div>
    </section>
  );
}
