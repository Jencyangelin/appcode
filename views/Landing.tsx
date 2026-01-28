import React from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, Zap, Shield, Globe, ArrowRight, Star, QrCode, Search, MousePointer2, Sparkles, Layers, Fingerprint } from 'lucide-react';

const Landing: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-slate-50 dark:bg-[#020617] transition-colors duration-300">
      {/* Dynamic Background Elements - Added pointer-events-none to prevent blocking clicks */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[140px] opacity-50 animate-blob pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-fuchsia-500/10 dark:bg-fuchsia-500/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[140px] opacity-50 animate-blob animation-delay-2000 pointer-events-none"></div>

      {/* Hero Section: The Identity Search Concept */}
      <section className="relative pt-24 pb-32 lg:pt-44 lg:pb-56">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Tagline */}
            <div className="inline-flex items-center space-x-2 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-12 border border-indigo-100 dark:border-indigo-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Identity Evolution is Here</span>
            </div>

            <h1 className="text-6xl md:text-[7rem] font-black tracking-tighter text-slate-900 dark:text-white mb-10 leading-[0.85]">
              Find. Scan.<br />
              <span className="text-indigo-600 dark:text-indigo-400">Collaborate.</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 mb-16 max-w-2xl mx-auto leading-relaxed font-medium">
              QRSync is the world’s first open protocol for professional identity. Turn your career into a high-performance scanning engine.
            </p>

            {/* Interactive Search Mockup - Now Fully Clickable */}
            <Link 
              to="/login"
              className="relative group max-w-3xl mx-auto mb-20 block transition-all duration-500 cursor-pointer z-10"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-60 transition duration-500 pointer-events-none"></div>
              <div className="relative bg-white dark:bg-slate-900/50 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-4 flex items-center shadow-2xl transition-all duration-500 group-hover:scale-[1.02] group-active:scale-[0.98]">
                <div className="bg-slate-100 dark:bg-white/5 p-4 rounded-2xl mr-4 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/10 transition-colors">
                  <Search className="w-6 h-6 text-slate-400 dark:text-slate-500 group-hover:text-indigo-500 transition-colors" />
                </div>
                <div className="flex-grow text-left">
                  <span className="text-slate-400 dark:text-slate-600 font-bold text-lg select-none group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">Enter your name to start...</span>
                </div>
                <div 
                  className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black text-sm group-hover:bg-indigo-500 transition-all flex items-center space-x-2 whitespace-nowrap shadow-xl shadow-indigo-500/20"
                >
                  <span>Build Card</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Platform Stats */}
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
              <div className="text-center">
                <p className="text-4xl font-black text-slate-900 dark:text-white">50k+</p>
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">Global Profiles</p>
              </div>
              <div className="h-10 w-px bg-slate-200 dark:bg-white/10 hidden md:block"></div>
              <div className="text-center">
                <p className="text-4xl font-black text-slate-900 dark:text-white">2.4M</p>
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">Monthly Scans</p>
              </div>
              <div className="h-10 w-px bg-slate-200 dark:bg-white/10 hidden md:block"></div>
              <div className="text-center">
                <p className="text-4xl font-black text-slate-900 dark:text-white">99.9%</p>
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">Identity Uptime</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="pb-32 lg:pb-56 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-full">
            
            {/* Main Card */}
            <div className="md:col-span-2 md:row-span-2 bg-white dark:bg-slate-900/40 backdrop-blur-3xl border border-slate-200 dark:border-white/5 rounded-[3rem] p-10 flex flex-col justify-between overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-700 pointer-events-none"></div>
              <div>
                <div className="p-4 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl w-fit mb-8">
                  <Fingerprint className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tighter">Biometric Grade Networking.</h3>
                <p className="text-lg text-slate-500 dark:text-slate-400 font-medium max-w-md leading-relaxed">
                  Your identity isn't just data; it's a signature. QRSync uses high-definition QR modules to ensure your brand displays perfectly on every retina display.
                </p>
              </div>
              <div className="mt-12">
                <div className="flex -space-x-4 mb-6">
                  {[1,2,3,4,5].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/100?u=bento${i}`} className="w-12 h-12 rounded-full border-4 border-white dark:border-slate-800 shadow-xl" alt="user" />
                  ))}
                  <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/5 border-4 border-white dark:border-slate-800 flex items-center justify-center text-slate-400 text-xs font-black">
                    +12k
                  </div>
                </div>
                <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Trusted by Industry Leaders</p>
              </div>
            </div>

            {/* Top Right */}
            <div className="bg-slate-900 dark:bg-indigo-600 rounded-[3rem] p-10 text-white relative overflow-hidden group">
              <div className="absolute bottom-0 right-0 p-6 opacity-20 group-hover:scale-125 transition-transform duration-500 pointer-events-none"></div>
              <h3 className="text-2xl font-black mb-4 tracking-tight">Instant Handshake.</h3>
              <p className="text-sm text-slate-400 dark:text-indigo-100 font-medium">
                Sync contacts directly to phonebooks without manual entry. One scan, one tap, eternal connection.
              </p>
            </div>

            {/* Bottom Right */}
            <div className="bg-white dark:bg-slate-900/40 backdrop-blur-3xl border border-slate-200 dark:border-white/5 rounded-[3rem] p-10 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="h-2 w-12 bg-indigo-600 rounded-full"></div>
                <div className="h-2 w-8 bg-slate-200 dark:bg-white/10 rounded-full"></div>
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">AI Augmented.</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                  Gemini-powered bio generation ensures you sound like the expert you truly are.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <div className="py-20 bg-white dark:bg-white/5 border-y border-slate-100 dark:border-white/5 overflow-hidden">
        <div className="flex whitespace-nowrap animate-shimmer opacity-20 dark:opacity-40">
           <div className="flex items-center space-x-20 px-10">
              {['FORBES', 'WIRED', 'TECHCRUNCH', 'THE VERGE', 'FAST COMPANY', 'BLOOMBERG', 'REUTERS'].map((brand) => (
                <span key={brand} className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white">{brand}</span>
              ))}
           </div>
           <div className="flex items-center space-x-20 px-10">
              {['FORBES', 'WIRED', 'TECHCRUNCH', 'THE VERGE', 'FAST COMPANY', 'BLOOMBERG', 'REUTERS'].map((brand) => (
                <span key={brand} className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white">{brand}</span>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;