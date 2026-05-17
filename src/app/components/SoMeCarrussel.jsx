"use client";

export default function SoMeCarousel() {
  const items = [
    { type: "image", src: "/photos/some1.webp" },
    { type: "image", src: "/photos/SoMe2.webp" },
    { type: "box" },
    { type: "image", src: "/photos/SoMe3.webp" },
    { type: "image", src: "/photos/SoMe4.webp" },
    { type: "image", src: "/photos/SoMe6.webp" },
  ];

  const loopItems = [...items, ...items];

  return (
    <div className="overflow-hidden w-full pt-20 bg-[var(--white)]">
      <style>
        {`
          @keyframes some-carousel-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>

      <div
        className="flex w-max animate-[some-carousel-scroll_20s_linear_infinite]"
        style={{ willChange: "transform" }}
      >
        {loopItems.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[350px] px-2"
          >
            {item.type === "box" ? (
              <div className="w-full h-[250px] bg-[var(--spotter-green)] flex flex-col items-center justify-center text-[var(--white)] text-center p-4">
                <h2 className="text-3xl font-bold leading-tight">JOIN THE<br />FAMILY</h2>
                <div className="mt-6 border border-[var(--white)] px-6 py-2">
                  <p className="text-lg italic font-semibold">@ Spotter</p>
                </div>
              </div>
            ) : (
              <img
                src={item.src}
                alt={`carousel-${index}`}
                className="w-full object-cover"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
