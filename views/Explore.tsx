
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Globe, User, ArrowRight, Star, ExternalLink, Sparkles, ShieldCheck } from 'lucide-react';
import { profileService } from '../services/profileService';
import { UserProfile } from '../types';

const Explore: React.FC = () => {
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadProfiles = async () => {
      const data = await profileService.getPublicProfiles();
      setProfiles(data);
      setLoading(false);
    };
    loadProfiles();
  }, []);

  const filteredProfiles = profiles.filter(p => 
    p.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] pb-24">
      {/* Search Header */}
      <section className="pt-20 pb-16 px-4 border-b border-slate-100 dark:border-white/5 bg-white dark:bg-[#020617]/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-8">
            <Globe className="w-3.5 h-3.5" />
            <span>Global Identity Registry</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-10 tracking-tighter">
            Discover the <span className="text-indigo-600 dark:text-indigo-400">Network.</span>
          </h1>
          
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-10 group-focus-within:opacity-30 transition duration-500"></div>
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text"
                placeholder="Search names, titles, or companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium text-slate-700 dark:text-slate-200 shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 mt-16">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="h-80 bg-white dark:bg-slate-900/50 rounded-[2.5rem] animate-pulse border border-slate-100 dark:border-white/5"></div>
            ))}
          </div>
        ) : filteredProfiles.length === 0 ? (
          <div className="text-center py-24">
            <div className="bg-slate-100 dark:bg-white/5 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <User className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">No identities found</h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Try adjusting your search filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProfiles.map((profile) => (
              <Link 
                to={`/card/${profile.id}`} 
                key={profile.id}
                className="group bg-white dark:bg-slate-900/40 backdrop-blur-3xl rounded-[2.5rem] p-8 border border-slate-100 dark:border-white/5 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 flex flex-col h-full"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="relative">
                    <img 
                      src={profile.avatarUrl} 
                      alt={profile.fullName} 
                      className="w-20 h-20 rounded-2xl object-cover shadow-lg group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-indigo-600 p-1 rounded-lg text-white shadow-lg">
                      <ShieldCheck className="w-3 h-3" />
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Status</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 text-[9px] font-black uppercase tracking-widest">Active Card</span>
                  </div>
                </div>

                <div className="flex-grow">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-1 tracking-tight group-hover:text-indigo-600 transition-colors">{profile.fullName}</h3>
                  <p className="text-slate-400 dark:text-slate-500 font-bold text-xs uppercase tracking-widest mb-4">
                    {profile.jobTitle} @ {profile.company}
                  </p>
                  
                  {profile.bio && (
                    <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 italic font-medium leading-relaxed">
                      "{profile.bio}"
                    </p>
                  )}
                </div>

                <div className="mt-8 pt-6 border-t border-slate-50 dark:border-white/5 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Verified Pro</span>
                  </div>
                  <div className="bg-indigo-50 dark:bg-indigo-500/10 p-2 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* CTA Footer */}
      {!searchTerm && !loading && (
        <section className="max-w-4xl mx-auto px-4 mt-32">
          <div className="bg-slate-900 rounded-[3rem] p-12 text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative z-10">
              <Sparkles className="w-12 h-12 text-indigo-400 mx-auto mb-6" />
              <h2 className="text-3xl font-black text-white mb-4 tracking-tight">Missing from the network?</h2>
              <p className="text-slate-400 mb-10 max-w-sm mx-auto font-medium">Join 50,000+ professionals using the QRSync protocol to share their brand instantly.</p>
              <Link 
                to="/login"
                className="inline-flex items-center space-x-3 bg-white text-slate-900 px-10 py-5 rounded-2xl font-black hover:scale-105 active:scale-95 transition-all shadow-2xl"
              >
                <span>Initialize Identity</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Explore;
