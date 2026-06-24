"use client";

import { useState } from "react";

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
          <input
            type="text"
            placeholder="Your name"
            className="w-full rounded-lg border px-4 py-3 text-sm"
            required
          />
          <input
            type="email"
            placeholder="Your email"
            className="w-full rounded-lg border px-4 py-3 text-sm"
            required
          />
          <textarea
            placeholder="Your message"
            rows={4}
            className="w-full rounded-lg border px-4 py-3 text-sm"
            required
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white hover:bg-gray-800"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
