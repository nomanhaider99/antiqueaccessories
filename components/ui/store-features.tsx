import { Plane, Headphones, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Headphones,
    title: "CUSTOMER SERVICE",
    description: "We are available from monday to friday to answer your questions.",
  },
  {
    icon: ShieldCheck,
    title: "SECURE PAYMENT",
    description: "Your payment information is processed securely.",
  },
];

export default function StoreFeatures() {
  return (
    <section className="w-full bg-white py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-2">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <Icon className="mb-6 h-8 w-8 text-black" strokeWidth={1.5} />
                <h3 className="mb-3 text-sm font-semibold tracking-[0.2em]">
                  {item.title}
                </h3>
                <p className="max-w-xs text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
