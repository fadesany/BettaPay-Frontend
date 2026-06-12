import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950 flex">
      {/* Left Pane - Form Area */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center relative p-6 sm:p-12">
        {/* Mobile Logo */}
        <div className="absolute top-8 left-8 lg:hidden flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-primary" />
          <span className="font-bold text-white">BettaPay</span>
        </div>
        
        {/* Content Wrapper */}
        <div className="w-full max-w-[400px]">
          {children}
        </div>
      </div>

      {/* Right Pane - Visual Area (Hidden on Mobile) */}
      <div className="hidden lg:flex w-1/2 relative bg-zinc-900 border-l border-white/5 overflow-hidden items-center justify-center">
        {/* Complex Gradient Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-zinc-900 to-zinc-950" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-yellow-500/10 blur-[100px] rounded-full pointer-events-none" />

        {/* Branding & Value Prop */}
        <div className="relative z-10 p-16 max-w-xl">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30 backdrop-blur-md">
              <ShieldCheck className="w-7 h-7 text-primary" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">BettaPay</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            Global settlement, <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-200">
              zero friction.
            </span>
          </h2>
          <p className="text-lg text-zinc-400 leading-relaxed mb-10">
            Join thousands of modern businesses across Africa accepting USDC natively. Real-time fiat conversion via Stellar anchors, powered by trustless Soroban contracts.
          </p>

          <div className="flex items-center gap-4 text-sm font-medium text-zinc-500">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" /> System Operational
            </span>
            <span>•</span>
            <span>Soroban Testnet</span>
          </div>
        </div>
      </div>
    </div>
  );
}
