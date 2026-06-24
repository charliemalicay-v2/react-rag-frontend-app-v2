"use client";

import { useState } from "react";

const faqs = [
  { q: "How does it work?", a: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
  { q: "Is there a free trial?", a: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
  { q: "Can I cancel anytime?", a: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24">
      <div className="container mx-auto max-w-3xl px-4">
        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">FAQ</h2>
        <div className="mt-12 space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-xl border">
              <button
                className="flex w-full items-center justify-between px-6 py-4 text-left font-medium"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                {faq.q}
                <span className="ml-2">{openIndex === i ? "\u2212" : "+"}</span>
              </button>
              {openIndex === i && (
                <div className="border-t px-6 py-4 text-sm text-gray-600">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
