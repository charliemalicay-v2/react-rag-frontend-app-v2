import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

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
            href="/chat"
            className={cn(buttonVariants({ variant: "default", size: "lg" }), "px-8 py-3")}
          >
            Get Started
          </a>
          <a
            href="#"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "px-8 py-3")}
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
