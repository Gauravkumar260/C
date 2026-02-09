"use client";

import { useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, MapPin, Check, ChevronRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { dealerships } from '@/data/cars';
import { cn } from '@/lib/utils';
import { fetchAPI } from '@/lib/api';

const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
];

const BookingWizard = () => {
    const [step, setStep] = useState(1);
    const [selectedDealership, setSelectedDealership] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userStr = localStorage.getItem('user');
            const user = userStr ? JSON.parse(userStr) : null;

            if (!user || !user.id) {
                // If no user, maybe redirect to login or show error
                // For now, we'll try to submit anyway, but it will likely fail on backend validation
                // unless we have a guest flow. 
                // Let's alert the user.
                alert("Please log in to book a test drive.");
                return;
            }

            await fetchAPI('/bookings', {
                method: 'POST',
                body: JSON.stringify({
                    userId: user.id,
                    dealershipId: selectedDealership,
                    scheduledTime: new Date(`${format(selectedDate!, 'yyyy-MM-dd')} ${selectedTime}`),
                }),
            });
            setIsSubmitted(true);
        } catch (error) {
            console.error("Booking failed", error);
            // Handle error state (e.g., show toast)
        }
    };

    const canProceedToStep2 = selectedDealership !== null;
    const canProceedToStep3 = selectedDate !== undefined && selectedTime !== null;
    const canSubmit =
        formData.firstName && formData.lastName && formData.email && formData.phone;

    const selectedDealershipData = dealerships.find((d) => d.id === selectedDealership);

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-background">
                <Navigation />
                <div className="pt-32 pb-24 px-6">
                    <div className="container mx-auto max-w-2xl text-center">
                        <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-primary/20 flex items-center justify-center">
                            <Check className="h-10 w-10 text-primary" />
                        </div>
                        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                            Booking Confirmed!
                        </h1>
                        <p className="text-muted-foreground text-xl mb-8">
                            Thank you, {formData.firstName}. Your test drive has been scheduled.
                        </p>

                        <div className="bg-card rounded-lg border border-border p-8 text-left mb-8">
                            <h3 className="font-display text-xl font-bold mb-6">Appointment Details</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between py-3 border-b border-border">
                                    <span className="text-muted-foreground">Location</span>
                                    <span className="font-medium">{selectedDealershipData?.name}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-border">
                                    <span className="text-muted-foreground">Date</span>
                                    <span className="font-medium">
                                        {selectedDate && format(selectedDate, 'MMMM d, yyyy')}
                                    </span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-border">
                                    <span className="text-muted-foreground">Time</span>
                                    <span className="font-medium">{selectedTime}</span>
                                </div>
                                <div className="flex justify-between py-3">
                                    <span className="text-muted-foreground">Confirmation Email</span>
                                    <span className="font-medium">{formData.email}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 justify-center">
                            <Button variant="hero" size="lg" asChild>
                                <Link href="/models">Explore Models</Link>
                            </Button>
                            <Button variant="heroOutline" size="lg" asChild>
                                <Link href="/">Back to Home</Link>
                            </Button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            <div className="pt-32 pb-24 px-6">
                <div className="container mx-auto max-w-4xl">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <p className="text-primary uppercase tracking-[0.3em] text-sm font-medium mb-4">
                            Experience APEX
                        </p>
                        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                            Book Your Test Drive
                        </h1>
                        <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
                            Feel the raw power and precision engineering firsthand at your nearest APEX dealership.
                        </p>
                    </div>

                    {/* Progress Steps */}
                    <div className="flex items-center justify-center gap-4 mb-12">
                        {[
                            { id: 1, name: 'Location' },
                            { id: 2, name: 'Date & Time' },
                            { id: 3, name: 'Your Details' },
                        ].map((s, index) => (
                            <div key={s.id} className="flex items-center">
                                <div
                                    className={cn(
                                        "flex items-center gap-2 px-4 py-2 rounded transition-all",
                                        step === s.id
                                            ? "bg-primary text-primary-foreground"
                                            : step > s.id
                                                ? "bg-primary/20 text-primary"
                                                : "bg-secondary text-muted-foreground"
                                    )}
                                >
                                    <span className="w-6 h-6 rounded-full bg-current/20 flex items-center justify-center text-xs font-bold">
                                        {step > s.id ? <Check className="h-3 w-3" /> : s.id}
                                    </span>
                                    <span className="text-sm uppercase tracking-wider">{s.name}</span>
                                </div>
                                {index < 2 && (
                                    <div className={cn("w-8 h-0.5 mx-2", step > s.id ? "bg-primary" : "bg-border")} />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Step 1: Location Selection */}
                    {step === 1 && (
                        <div className="animate-fade-up">
                            <h2 className="font-display text-2xl font-bold mb-6 text-center">
                                Select Your Dealership
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {dealerships.map((dealer) => (
                                    <button
                                        key={dealer.id}
                                        onClick={() => setSelectedDealership(dealer.id)}
                                        className={cn(
                                            "p-6 rounded-lg border-2 transition-all text-left",
                                            selectedDealership === dealer.id
                                                ? "border-primary bg-primary/5"
                                                : "border-border hover:border-muted-foreground"
                                        )}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                <MapPin className="h-5 w-5 text-primary" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-display text-lg font-bold">{dealer.name}</p>
                                                <p className="text-muted-foreground text-sm mt-1">{dealer.address}</p>
                                                <p className="text-muted-foreground text-sm">{dealer.phone}</p>
                                            </div>
                                            {selectedDealership === dealer.id && (
                                                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                                                    <Check className="h-4 w-4 text-primary-foreground" />
                                                </div>
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <div className="flex justify-end mt-8">
                                <Button
                                    variant="hero"
                                    size="lg"
                                    onClick={() => setStep(2)}
                                    disabled={!canProceedToStep2}
                                    className="gap-2"
                                >
                                    Continue <ChevronRight className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Date & Time */}
                    {step === 2 && (
                        <div className="animate-fade-up">
                            <h2 className="font-display text-2xl font-bold mb-6 text-center">
                                Choose Date & Time
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Date Picker */}
                                <div>
                                    <Label className="text-lg font-medium mb-4 block">Select Date</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    'w-full justify-start text-left font-normal h-14',
                                                    !selectedDate && 'text-muted-foreground'
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-5 w-5" />
                                                {selectedDate ? format(selectedDate, 'PPP') : 'Pick a date'}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={selectedDate}
                                                onSelect={setSelectedDate}
                                                disabled={(date) =>
                                                    date < new Date() || date.getDay() === 0
                                                }
                                                initialFocus
                                                className="p-3 pointer-events-auto"
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                {/* Time Slots */}
                                <div>
                                    <Label className="text-lg font-medium mb-4 block">Select Time</Label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {timeSlots.map((time) => (
                                            <button
                                                key={time}
                                                onClick={() => setSelectedTime(time)}
                                                className={cn(
                                                    "p-4 rounded-lg border-2 transition-all text-sm font-medium",
                                                    selectedTime === time
                                                        ? "border-primary bg-primary text-primary-foreground"
                                                        : "border-border hover:border-muted-foreground"
                                                )}
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between mt-8">
                                <Button variant="ghost" onClick={() => setStep(1)}>
                                    Back
                                </Button>
                                <Button
                                    variant="hero"
                                    size="lg"
                                    onClick={() => setStep(3)}
                                    disabled={!canProceedToStep3}
                                    className="gap-2"
                                >
                                    Continue <ChevronRight className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Contact Details */}
                    {step === 3 && (
                        <div className="animate-fade-up">
                            <h2 className="font-display text-2xl font-bold mb-6 text-center">
                                Your Details
                            </h2>

                            <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="firstName">First Name</Label>
                                        <Input
                                            id="firstName"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className="h-12 mt-2"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="lastName">Last Name</Label>
                                        <Input
                                            id="lastName"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className="h-12 mt-2"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="h-12 mt-2"
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="h-12 mt-2"
                                        required
                                    />
                                </div>

                                {/* Summary */}
                                <div className="p-6 bg-card rounded-lg border border-border mt-8">
                                    <h3 className="font-display text-lg font-bold mb-4">Booking Summary</h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Location</span>
                                            <span>{selectedDealershipData?.name}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Date</span>
                                            <span>{selectedDate && format(selectedDate, 'MMMM d, yyyy')}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Time</span>
                                            <span>{selectedTime}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between pt-4">
                                    <Button type="button" variant="ghost" onClick={() => setStep(2)}>
                                        Back
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="hero"
                                        size="lg"
                                        disabled={!canSubmit}
                                    >
                                        Confirm Booking
                                    </Button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default BookingWizard;
