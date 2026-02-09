import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4">
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="text-4xl font-bold font-rajdhani">Order Confirmed!</h1>
      <p className="text-slate-400 max-w-md">
        Thank you for your order. Your custom vehicle is being processed.
        You will receive an email confirmation shortly.
      </p>
      <Link href="/" className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded transition-colors">
        Back to Home
      </Link>
    </div>
  );
}
