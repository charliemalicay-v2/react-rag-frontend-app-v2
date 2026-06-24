const features = [
  { title: "Feature One", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
  { title: "Feature Two", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
  { title: "Feature Three", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
  { title: "Feature Four", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
  { title: "Feature Five", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
  { title: "Feature Six", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
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
          {features.map((f, i) => (
            <div key={i} className="rounded-xl border p-6">
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="text-muted-foreground mt-2 text-sm">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
