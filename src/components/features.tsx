import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const features = [
  { title: "RAG Chat", description: "Chat with a bot using streaming or non-streaming modes. Supports document-based queries.", href: "/chat" },
];

export function Features() {
  return (
    <section id="features" className="py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
          Features
        </h2>
        <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-center text-lg">
          Everything you need to get started.
        </p>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => {
            const inner = (
              <CardHeader>
                <CardTitle>{f.title}</CardTitle>
                <CardDescription>{f.description}</CardDescription>
              </CardHeader>
            );
            return (
              <Card key={i} size="sm" className={f.href ? "transition-opacity hover:opacity-80" : ""}>
                {f.href ? <a href={f.href}>{inner}</a> : inner}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
