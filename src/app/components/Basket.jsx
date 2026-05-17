"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCartStore } from "../lib/useCartStore";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Basket() {
  const basketRef = useRef(null);
  const overlayRef = useRef(null);

  const {
    items,
    isOpen,
    toggleCart,
    closeCart,
    addItem,
    removeItem,
    decreaseQuantity,
  } = useCartStore();

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const hasItems = items.length > 0;

  useEffect(() => {
    if (basketRef.current) {
      gsap.to(basketRef.current, {
        duration: 0.5,
        x: isOpen ? 0 : 400,
        ease: "power2.out",
      });
    }

    if (isOpen) {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 300);
    }
  }, [isOpen]);

  return (
    <>
      <div
        ref={basketRef}
        data-lenis-prevent
        className="fixed top-0 right-0 w-[400px] h-screen bg-[var(--white)] shadow-lg z-[9999] flex flex-col translate-x-[400px]"
      >
  
  <div className="p-6 border-b flex items-center justify-between">
    <h2 className="text-xl font-bold">Din kurv</h2>
    <button
      onClick={closeCart}
      className="text-gray-500 hover:text-[var(--black)] text-sm"
    >
      Luk ✕
    </button>
  </div>

  <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
    {items.length === 0 ? (
      <p className="text-sm text-gray-500">Kurven er tom.</p>
    ) : (
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id} className="text-sm flex flex-col gap-1 border-b pb-2">
            <div className="relative w-full aspect-[1/1] mb-4 rounded">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="320px"
                className="object-cover rounded"
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">{item.name}</span>
              <span className="font-semibold">{item.price * item.quantity},–</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <button onClick={() => decreaseQuantity(item.id)} className="px-2 py-1 border rounded hover:bg-gray-100">−</button>
                <span>{item.quantity}</span>
                <button onClick={() => addItem(item)} className="px-2 py-1 border rounded hover:bg-gray-100">+</button>
              </div>
              <button onClick={() => removeItem(item.id)} className="text-red-500 text-xs underline hover:opacity-70">Slet</button>
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>

  <div className="p-6 border-t">
    <div className="font-semibold text-lg mb-4 text-center">
      Total: {totalPrice},–
    </div>
    <button className="w-full bg-black text-white py-3 rounded border border-[var(--black)] hover:bg-[var(--white)] hover:text-[var(--black)] transition duration-300">      Fortsæt til betaling
    </button>
  </div>
</div>

      <button
        id="cart-button"
        onClick={toggleCart}
        className="z-50 text-[var(--black)]"
      >
        <div className="relative w-8 h-8">
          <Image
            src={hasItems ? "/photos/happybasket.png" : "/photos/basket.png"}
            alt="Kurv ikon"
            fill
            sizes="32px"
            className="object-contain"
          />
          {hasItems && (
            <span className="bg-[var(--spotter-green)] text-[var(--white)] text-xs w-5 h-5 rounded-full flex items-center justify-center absolute -top-1 -right-2">
              {totalItems}
            </span>
          )}
        </div>
      </button>
    </>
  );
}
