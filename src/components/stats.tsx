import { Card, CardContent } from "@/components/ui/card"

const stats = [
  { label: "Users", value: "10K+" },
  { label: "Downloads", value: "50K+" },
  { label: "Countries", value: "120+" },
  { label: "Reviews", value: "4.9" },
];

export function Stats() {
  return (
    <section className="bg-muted py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s, i) => (
            <Card key={i} className="bg-transparent ring-0 text-center shadow-none">
              <CardContent>
                <p className="text-3xl font-bold md:text-4xl">{s.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
