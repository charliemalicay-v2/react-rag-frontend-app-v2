"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="contact" className="py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold">Thank You!</h2>
          <p className="text-muted-foreground mt-4">We&apos;ll get back to you soon.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto max-w-xl px-4">
        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">Contact Us</h2>
        <p className="text-muted-foreground mt-4 text-center">Have a question? Drop us a message.</p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <Input type="text" placeholder="Your name" required />
          <Input type="email" placeholder="Your email" required />
          <textarea
            placeholder="Your message"
            rows={4}
            className="w-full rounded-lg border px-4 py-3 text-sm"
            required
          />
          <Button type="submit" className="w-full">
            Send Message
          </Button>
        </form>
      </div>
    </section>
  );
}
