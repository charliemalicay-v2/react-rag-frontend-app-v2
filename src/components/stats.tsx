const stats = [
  { label: "Users", value: "10K+" },
  { label: "Downloads", value: "50K+" },
  { label: "Countries", value: "120+" },
  { label: "Reviews", value: "4.9" },
];

export function Stats() {
  return (
    <section className="bg-gray-900 py-16 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl font-bold md:text-4xl">{s.value}</p>
              <p className="mt-1 text-sm text-gray-400">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
