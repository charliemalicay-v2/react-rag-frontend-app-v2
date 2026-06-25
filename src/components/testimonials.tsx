import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  { quote: "This product changed how we work. Incredible experience.", name: "Jane D.", role: "CEO, Company" },
  { quote: "The best investment we've made this year. Highly recommend.", name: "Mark S.", role: "Engineer" },
  { quote: "Simple, powerful, and beautiful. Exactly what we needed.", name: "Sarah L.", role: "Designer" },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-muted py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">What People Say</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <blockquote>
                  <p className="text-muted-foreground">&ldquo;{t.quote}&rdquo;</p>
                  <footer className="mt-4">
                    <p className="font-semibold text-card-foreground">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                  </footer>
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
