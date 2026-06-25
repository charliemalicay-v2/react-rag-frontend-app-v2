"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

const faqs = [
  { q: "How does it work?", a: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
  { q: "Is there a free trial?", a: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
  { q: "Can I cancel anytime?", a: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
];

export function FAQ() {
  return (
    <section id="faq" className="py-24">
      <div className="container mx-auto max-w-3xl px-4">
        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">FAQ</h2>
        <div className="mt-12">
          <Accordion>
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{faq.q}</AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
