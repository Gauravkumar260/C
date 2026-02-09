import { Gauge, Cpu, Wind, Shield } from 'lucide-react';

const features = [
  {
    icon: Gauge,
    title: 'Extreme Performance',
    description: 'Track-bred engines delivering up to 890 horsepower with instant throttle response.',
  },
  {
    icon: Cpu,
    title: 'Intelligent Systems',
    description: 'AI-powered traction control and adaptive aerodynamics for optimal handling.',
  },
  {
    icon: Wind,
    title: 'Active Aerodynamics',
    description: 'Dynamic spoilers and air vents that adjust in real-time for maximum downforce.',
  },
  {
    icon: Shield,
    title: 'Carbon Architecture',
    description: 'Full carbon fiber monocoque construction for unmatched strength-to-weight ratio.',
  },
];

const PerformanceSection = () => {
  return (
    <section className="py-24 bg-carbon relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 carbon-pattern opacity-30" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-primary uppercase tracking-[0.3em] text-sm font-medium mb-4">
            Engineering Excellence
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Built Without Compromise
          </h2>
          <div className="section-divider" />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="text-center p-8 rounded-lg bg-background/50 border border-border hover:border-primary/50 transition-all duration-300 group animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PerformanceSection;