import Link from 'next/link';
import { ArrowRight, Calendar, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Test Drive CTA */}
          <div className="relative group overflow-hidden rounded-lg border border-border hover:border-primary/50 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative p-12 md:p-16">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-6">
                <Calendar className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Experience The Thrill
              </h3>
              <p className="text-muted-foreground mb-8 max-w-md">
                Schedule a private test drive at your nearest APEX dealership.
                Feel the power, precision, and adrenaline firsthand.
              </p>
              <Button variant="hero" size="lg" asChild>
                <Link href="/test-drive" className="group/btn">
                  Book Test Drive
                  <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Customize CTA */}
          <div className="relative group overflow-hidden rounded-lg border border-border hover:border-primary/50 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative p-12 md:p-16">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gold/10 mb-6">
                <Settings className="h-7 w-7 text-gold" />
              </div>
              <h3 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Make It Yours
              </h3>
              <p className="text-muted-foreground mb-8 max-w-md">
                Configure every detail to your exact specifications. From paint to
                performance upgrades, create your perfect machine.
              </p>
              <Button variant="goldOutline" size="lg" asChild>
                <Link href="/customize" className="group/btn">
                  Start Configuring
                  <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;