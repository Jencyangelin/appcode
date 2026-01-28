import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  User,
  ArrowRight,
  Share2,
  Scan,
  ExternalLink,
  Settings,
  Edit3,
  Star,
  Copy,
  Check,
  Globe,
} from "lucide-react";
import QRCodeDisplay from "../components/QRCodeDisplay";
import { profileService } from "../services/profileService";
import { UserProfile } from "../types";

interface DashboardProps {
  user: any;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      const data = await profileService.getProfile(user.id);
      setProfile(data);
      setLoading(false);
    };
    loadProfile();
  }, [user.id]);

  // Simple QR format - just the URL, no embedded data
  const getCardQRData = () => {
    // Use the public app URL with the user ID
    return `${window.location.origin}/#/card/${user.id}`;
  };

  // Fallback URL for web sharing
  const getCardUrl = () => {
    const baseUrl = window.location.href.split("#")[0];
    const cleanBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
    return `${cleanBase}#/card/${user.id}`;
  };

  const cardUrl = getCardUrl();
  const qrData = getCardQRData();

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(cardUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-4 md:space-y-0">
        <div>
          <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-black uppercase tracking-[0.2em] text-[10px] mb-2">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
            <span>Profile Console</span>
          </div>
          <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
            Hi, {profile?.fullName.split(" ")[0] || user.email.split("@")[0]}
          </h1>
        </div>
        <div className="flex items-center space-x-3 bg-white dark:bg-white/5 p-2 rounded-2xl shadow-sm border border-slate-100 dark:border-white/5 backdrop-blur-xl">
          <Link
            to="/scan"
            className="flex items-center space-x-2 bg-slate-900 dark:bg-indigo-600 text-white px-5 py-3 rounded-xl font-bold hover:bg-slate-800 dark:hover:bg-indigo-500 transition shadow-lg text-sm"
          >
            <Scan className="w-4 h-4" />
            <span>Scan Network</span>
          </Link>
          <Link
            to="/profile/edit"
            className="flex items-center space-x-2 bg-indigo-50 dark:bg-white/10 text-indigo-600 dark:text-indigo-400 px-5 py-3 rounded-xl font-bold hover:bg-indigo-100 dark:hover:bg-white/20 transition text-sm"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Card</span>
          </Link>
        </div>
      </header>

      {!profile ? (
        <div className="bg-white dark:bg-slate-900/40 rounded-[3rem] border-4 border-dashed border-slate-100 dark:border-white/5 p-20 text-center backdrop-blur-xl">
          <div className="bg-indigo-50 dark:bg-indigo-500/10 w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto mb-8">
            <User className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
            Your card is offline.
          </h2>
          <p className="text-slate-400 dark:text-slate-500 mb-10 max-w-sm mx-auto font-medium">
            Complete your profile identity to generate your unique professional
            routing address.
          </p>
          <Link
            to="/profile/edit"
            className="bg-indigo-600 text-white px-10 py-5 rounded-2xl font-black hover:bg-indigo-700 transition shadow-2xl shadow-indigo-500/20 inline-flex items-center space-x-3"
          >
            <span>Initialize Identity</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* QR Display Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-24">
              <QRCodeDisplay value={qrData} title={profile.fullName} />

              {/* Quick Link Card */}
              <div className="mt-6 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-white/5 shadow-xl shadow-slate-200/50 dark:shadow-none">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Digital Address
                  </span>
                  <Globe className="w-4 h-4 text-indigo-500" />
                </div>
                <div className="flex items-center space-x-3 bg-slate-50 dark:bg-white/5 p-3 rounded-xl border border-slate-100 dark:border-white/5 overflow-hidden">
                  <span className="text-[11px] font-mono text-slate-500 truncate flex-grow">
                    {cardUrl}
                  </span>
                  <button
                    onClick={handleCopyUrl}
                    className="p-2 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-indigo-500"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <p className="mt-4 text-[10px] font-medium text-slate-400 text-center leading-relaxed">
                  This link is encoded into your QR. Use it for your social
                  bios.
                </p>
              </div>
            </div>
          </div>

          {/* Card Preview Details */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white dark:bg-slate-900/40 backdrop-blur-3xl p-10 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-white/5">
              <div className="flex items-center justify-between mb-12">
                <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em]">
                  Identity Real-Time Preview
                </h3>
                <Link
                  to={`/card/${user.id}`}
                  className="text-indigo-600 dark:text-indigo-400 hover:opacity-70 font-black text-xs uppercase tracking-widest flex items-center space-x-2"
                >
                  <span>View Public Page</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-10 pb-10 border-b border-slate-50 dark:border-white/5 mb-10">
                <div className="relative group">
                  <img
                    src={
                      profile.avatarUrl ||
                      `https://picsum.photos/seed/${profile.id}/200`
                    }
                    alt={profile.fullName}
                    className="w-40 h-40 rounded-[2.5rem] object-cover shadow-2xl border-8 border-white dark:border-slate-800 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-slate-900 dark:bg-indigo-600 p-2.5 rounded-xl text-white shadow-xl">
                    <Star className="w-4 h-4 fill-current text-yellow-400" />
                  </div>
                </div>
                <div className="text-center md:text-left pt-2 flex-grow">
                  <h4 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter mb-2 leading-none">
                    {profile.fullName}
                  </h4>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-6">
                    <span className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl text-[10px] font-black uppercase tracking-widest border border-indigo-100 dark:border-indigo-500/20">
                      {profile.jobTitle}
                    </span>
                    <span className="px-3 py-1.5 bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-100 dark:border-white/10">
                      {profile.company}
                    </span>
                  </div>
                  {profile.bio && (
                    <div className="relative">
                      <p className="text-slate-500 dark:text-slate-400 text-xl leading-relaxed font-medium italic whitespace-pre-wrap max-w-xl">
                        "{profile.bio}"
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-8 bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-100 dark:border-white/5 hover:border-indigo-100 dark:hover:border-indigo-500/30 transition-all group">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 group-hover:text-indigo-500 transition-colors">
                    Endpoint
                  </p>
                  <p className="text-slate-900 dark:text-white font-black truncate">
                    {profile.email}
                  </p>
                </div>
                <div className="p-8 bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-100 dark:border-white/5 hover:border-indigo-100 dark:hover:border-indigo-500/30 transition-all group">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 group-hover:text-indigo-500 transition-colors">
                    Connection
                  </p>
                  <p className="text-slate-900 dark:text-white font-black">
                    {profile.phone || "Standby Mode"}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-600 to-violet-700 rounded-[3rem] p-10 text-white flex flex-col md:flex-row items-center justify-between shadow-2xl shadow-indigo-500/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 group-hover:scale-110 transition-transform duration-700"></div>
              <div className="text-center md:text-left mb-8 md:mb-0 relative z-10">
                <h4 className="text-2xl font-black mb-1 tracking-tight">
                  Identity Refresh Required?
                </h4>
                <p className="text-indigo-100 opacity-80 font-medium">
                  Keep your professional brief updated with AI.
                </p>
              </div>
              <Link
                to="/profile/edit"
                className="bg-white text-slate-900 px-10 py-5 rounded-2xl font-black hover:scale-105 active:scale-95 transition-all flex items-center space-x-3 shadow-xl relative z-10"
              >
                <Settings className="w-5 h-5 text-indigo-600" />
                <span>Open Architect</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
