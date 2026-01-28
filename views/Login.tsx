
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Loader2, QrCode, ArrowRight, ShieldCheck, Github, Chrome as GoogleIcon, User, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { authService } from '../services/authService';

interface LoginProps {
  onLogin: (user: any) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [googleStep, setGoogleStep] = useState<'pick' | 'loading'>('pick');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (mode === 'register') {
        await authService.register(email, password);
        setSuccess("Account created successfully! Welcome to the protocol.");
        setMode('login');
        setPassword('');
      } else {
        const user = await authService.login(email, password);
        onLogin(user);
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const startGoogleAuth = () => {
    setShowGoogleModal(true);
    setGoogleStep('pick');
  };

  const handleGoogleSelect = async () => {
    setGoogleStep('loading');
    try {
      const user = await authService.loginWithGoogle();
      await new Promise(r => setTimeout(r, 1200));
      onLogin(user);
      navigate('/dashboard');
    } catch (err) {
      setError("Google authentication failed.");
      setShowGoogleModal(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden bg-[#020617] selection:bg-indigo-500/30">
      {/* Immersive Background Architecture */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] transition-all duration-1000 ${mode === 'login' ? 'bg-indigo-600/15' : 'bg-violet-600/15'} animate-blob`}></div>
        <div className={`absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] transition-all duration-1000 ${mode === 'login' ? 'bg-fuchsia-600/10' : 'bg-indigo-600/15'} animate-blob animation-delay-2000`}></div>
        
        {/* Fine Grid Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] brightness-100"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="max-w-[480px] w-full relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="text-center mb-10">
          <div className="inline-flex p-3 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl mb-6 group transition-all duration-500 hover:border-indigo-500/50 hover:shadow-indigo-500/10">
            <QrCode className="w-8 h-8 text-indigo-400 group-hover:scale-110 transition-transform" />
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter mb-3">
            {mode === 'login' ? 'Protocol Access' : 'Create Identity'}
          </h1>
          <p className="text-slate-400 font-medium text-sm tracking-wide">
            {mode === 'login' ? 'Sign in to manage your digital card.' : 'Join the new standard of professional networking.'}
          </p>
        </div>

        {/* Enhanced Glass Card */}
        <div className="bg-slate-900/40 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] border border-white/5 overflow-hidden">
          
          {/* Subtle Glow Header */}
          <div className="h-1 w-full bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>

          {/* Mode Selector */}
          <div className="flex p-2 gap-2 bg-black/20 mx-6 mt-8 rounded-2xl border border-white/5">
            <button 
              type="button"
              onClick={() => { setMode('login'); setError(null); setSuccess(null); }}
              className={`flex-1 py-3 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all ${mode === 'login' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Log In
            </button>
            <button 
              type="button"
              onClick={() => { setMode('register'); setError(null); setSuccess(null); }}
              className={`flex-1 py-3 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all ${mode === 'register' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Sign Up
            </button>
          </div>

          <div className="p-8 md:p-10">
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-[13px] font-bold flex items-center animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="w-4 h-4 mr-3 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-[13px] font-bold flex items-center animate-in fade-in slide-in-from-top-2">
                <CheckCircle2 className="w-4 h-4 mr-3 flex-shrink-0" />
                <span>{success}</span>
              </div>
            )}

            <form onSubmit={handleAuth} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Email Endpoint</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors pointer-events-none" />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full pl-11 pr-5 py-4 bg-white/5 border border-white/5 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/40 transition-all outline-none text-white font-medium placeholder:text-slate-600 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Secret Key</label>
                  {mode === 'login' && (
                    <button type="button" className="text-[9px] font-black text-indigo-400/70 hover:text-indigo-400 transition-colors uppercase tracking-widest">Forgot?</button>
                  )}
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors pointer-events-none" />
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-5 py-4 bg-white/5 border border-white/5 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/40 transition-all outline-none text-white font-medium placeholder:text-slate-600 text-sm"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full group relative overflow-hidden bg-white text-slate-950 py-4 rounded-2xl font-black text-sm transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100 flex items-center justify-center space-x-2"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-violet-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span>{mode === 'login' ? 'Authenticate' : 'Begin Journey'}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-10 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-[#0a0c14] text-[9px] uppercase font-black tracking-[0.3em] text-slate-600">Secure Direct Connect</span>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <button 
                type="button"
                onClick={startGoogleAuth}
                className="flex items-center justify-center space-x-3 py-3.5 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 hover:border-white/10 transition-all group"
              >
                <GoogleIcon className="w-4 h-4 text-slate-400 group-hover:text-white" />
                <span className="text-[11px] font-black text-slate-400 group-hover:text-white uppercase tracking-widest">Google</span>
              </button>
              <button 
                type="button"
                className="flex items-center justify-center space-x-3 py-3.5 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 hover:border-white/10 transition-all group"
              >
                <Github className="w-4 h-4 text-slate-400 group-hover:text-white" />
                <span className="text-[11px] font-black text-slate-400 group-hover:text-white uppercase tracking-widest">Github</span>
              </button>
            </div>
          </div>
          
          <div className="px-8 pb-8 text-center">
             <div className="inline-flex items-center space-x-2 text-[10px] font-bold text-slate-600">
                <ShieldCheck className="w-3 h-3 text-indigo-500" />
                <span className="uppercase tracking-[0.1em]">Encrypted Identity Protocol</span>
             </div>
          </div>
        </div>
        
        {/* Footer Links */}
        <div className="mt-8 flex justify-center space-x-6">
           <a href="#" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 hover:text-indigo-400 transition-colors">Privacy</a>
           <a href="#" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 hover:text-indigo-400 transition-colors">Terms</a>
           <a href="#" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 hover:text-indigo-400 transition-colors">Help</a>
        </div>
      </div>

      {/* Google Auth Modal Simulation */}
      {showGoogleModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 backdrop-blur-sm bg-black/80 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl w-full max-w-[400px] overflow-hidden shadow-[0_0_100px_rgba(255,255,255,0.1)] animate-in zoom-in-95 duration-200">
            <div className="p-8">
              <div className="flex justify-center mb-6">
                <div className="flex items-center space-x-2">
                  <svg className="w-8 h-8" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span className="text-xl font-bold text-slate-800 tracking-tight">Google</span>
                </div>
              </div>

              {googleStep === 'pick' ? (
                <>
                  <h3 className="text-lg font-bold text-center text-slate-900 mb-1">Choose an account</h3>
                  <p className="text-xs text-center text-slate-500 mb-8 font-medium">to continue to <span className="font-bold text-slate-700">QRSync</span></p>
                  
                  <div className="space-y-2">
                    <button 
                      type="button"
                      onClick={handleGoogleSelect}
                      className="w-full flex items-center p-3.5 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all group"
                    >
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold mr-4 text-sm">JD</div>
                      <div className="text-left">
                        <p className="text-[13px] font-bold text-slate-900">John Doe</p>
                        <p className="text-[11px] text-slate-500 font-medium">j.doe@gmail.com</p>
                      </div>
                      <CheckCircle2 className="w-4 h-4 ml-auto text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                    
                    <button 
                      type="button"
                      onClick={handleGoogleSelect}
                      className="w-full flex items-center p-3.5 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all group"
                    >
                      <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mr-4">
                        <User className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <p className="text-[13px] font-bold text-slate-900">Use another account</p>
                      </div>
                    </button>
                  </div>
                </>
              ) : (
                <div className="py-16 flex flex-col items-center justify-center">
                  <div className="w-10 h-10 border-[3px] border-indigo-600 border-t-transparent rounded-full animate-spin mb-6"></div>
                  <p className="text-slate-500 font-bold text-sm animate-pulse uppercase tracking-widest">Verifying Protocol...</p>
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
                <button 
                  type="button"
                  onClick={() => setShowGoogleModal(false)}
                  className="text-xs font-black text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest"
                >
                  Cancel
                </button>
                <div className="flex items-center space-x-1.5">
                   <ShieldCheck className="w-3 h-3 text-emerald-500" />
                   <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Safe Auth</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
