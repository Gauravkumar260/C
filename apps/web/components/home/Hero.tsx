import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Gauge, Zap, Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src="/hero-car.jpg"
                    alt="APEX Flagship Sports Car"
                    fill
                    className="object-cover object-center"
                    priority
                />
                <div className="absolute inset-0 hero-gradient" />
                <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
            </div>

            {/* Content */}
            <div className="container mx-auto px-6 relative z-10 pt-20">
                <div className="max-w-3xl">
                    {/* Eyebrow */}
                    <p className="text-primary uppercase tracking-[0.3em] text-sm font-medium mb-6 animate-fade-up">
                        Introducing the 2026 Collection
                    </p>

                    {/* Main Headline */}
                    <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] mb-6 animate-fade-up delay-100">
                        BORN TO
                        <br />
                        <span className="text-gradient">DOMINATE</span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-xl mb-10 animate-fade-up delay-200">
                        Experience raw power meets precision engineering.
                        The pinnacle of automotive excellence awaits.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-fade-up delay-300">
                        <Button variant="hero" size="xl" asChild>
                            <Link href="/models" className="group">
                                Explore Models
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                        <Button variant="heroOutline" size="xl" asChild>
                            <Link href="/test-drive">Book Test Drive</Link>
                        </Button>
                    </div>

                    {/* Performance Stats */}
                    <div className="grid grid-cols-3 gap-8 max-w-lg animate-fade-up delay-400">
                        <div className="text-center">
                            <div className="flex justify-center mb-2">
                                <Timer className="h-5 w-5 text-primary" />
                            </div>
                            <div className="stat-value text-3xl md:text-4xl">2.7<span className="text-primary">s</span></div>
                            <div className="stat-label mt-1">0-60 MPH</div>
                        </div>
                        <div className="text-center">
                            <div className="flex justify-center mb-2">
                                <Gauge className="h-5 w-5 text-primary" />
                            </div>
                            <div className="stat-value text-3xl md:text-4xl">217<span className="text-primary">mph</span></div>
                            <div className="stat-label mt-1">Top Speed</div>
                        </div>
                        <div className="text-center">
                            <div className="flex justify-center mb-2">
                                <Zap className="h-5 w-5 text-primary" />
                            </div>
                            <div className="stat-value text-3xl md:text-4xl">750<span className="text-primary">hp</span></div>
                            <div className="stat-label mt-1">Power</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center pt-2">
                    <div className="w-1 h-2 bg-primary rounded-full animate-pulse" />
                </div>
            </div>
        </section>
    );
};

export default Hero;
