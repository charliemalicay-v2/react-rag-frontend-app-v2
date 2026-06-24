export function Hero() {
  return (
    <section className="from-background to-muted bg-gradient-to-b py-24 md:py-32">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Build Something Amazing
        </h1>
        <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg">
          A modern landing page built with Next.js and Tailwind CSS. Fast,
          responsive, and ready for production.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <a
            href="#"
            className="rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white hover:bg-gray-800"
          >
            Get Started
          </a>
          <a
            href="#"
            className="rounded-lg border px-6 py-3 text-sm font-medium text-gray-900 hover:bg-gray-100"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
