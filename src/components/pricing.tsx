const plans = [
  { name: "Starter", price: "$9", features: ["1 project", "Basic analytics", "Email support"] },
  { name: "Pro", price: "$29", features: ["Unlimited projects", "Advanced analytics", "Priority support"] },
  { name: "Enterprise", price: "$99", features: ["Everything in Pro", "Dedicated manager", "Custom integrations"] },
];

export function Pricing() {
  return (
    <section id="pricing" className="bg-gray-50 py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">Pricing</h2>
        <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-center text-lg">
          Choose the plan that fits your needs.
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {plans.map((plan, i) => (
            <div key={i} className="rounded-xl border bg-white p-8">
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <p className="mt-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-gray-500">/mo</span>
              </p>
              <ul className="mt-6 space-y-3">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-green-500">&#10003;</span> {f}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className="mt-8 block rounded-lg bg-gray-900 px-6 py-3 text-center text-sm font-medium text-white hover:bg-gray-800"
              >
                Get Started
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
