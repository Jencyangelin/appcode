import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Mail,
  Phone,
  Globe,
  Linkedin,
  Twitter,
  Github,
  Instagram,
  Facebook,
  UserPlus,
  Share2,
  MoreHorizontal,
  Quote,
  Sparkles,
  Check,
  ArrowLeft,
} from "lucide-react";
import { profileService } from "../services/profileService";
import { UserProfile } from "../types";

const PublicCard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (id) {
        try {
          // Fetch from backend (localStorage-based for now)
          const data = await profileService.getProfile(id);
          setProfile(data);
          if (!data) {
            console.error(`Profile not found for ID: ${id}`);
          }
        } catch (err) {
          console.error("Failed to fetch profile:", err);
          setProfile(null);
        }
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  const handleSaveContact = () => {
    if (!profile) return;

    // Create modern vCard
    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${profile.fullName}`,
      `N:${profile.fullName.split(" ").reverse().join(";")};;;`,
      `ORG:${profile.company}`,
      `TITLE:${profile.jobTitle}`,
      `EMAIL;TYPE=INTERNET,WORK:${profile.email}`,
      `TEL;TYPE=CELL:${profile.phone}`,
      `URL:${profile.website}`,
      `NOTE:${profile.bio}`,
      "END:VCARD",
    ].join("\n");

    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${profile.fullName.replace(/\s+/g, "_")}_Contact.vcf`;
    link.click();

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${profile?.fullName} | QRSync`,
          text: `Professional card for ${profile?.fullName} (${profile?.jobTitle} @ ${profile?.company})`,
          url: window.location.href,
        });
      } catch (err) {
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Identity link copied to clipboard.");
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#020617]">
        <div className="w-16 h-16 border-[6px] border-indigo-600 border-t-transparent rounded-full animate-spin mb-6"></div>
        <p className="text-slate-500 font-black uppercase tracking-[0.3em] text-xs animate-pulse">
          Syncing Identity...
        </p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[#020617] text-white">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-red-500/20">
            <Quote className="w-10 h-10 text-red-500 rotate-180" />
          </div>
          <h1 className="text-4xl font-black mb-4 tracking-tighter">
            Unknown Node.
          </h1>
          <p className="text-slate-400 font-medium leading-relaxed mb-10">
            The identity you are looking for has been decommissioned or moved to
            a new endpoint.
          </p>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-indigo-600 text-white px-10 py-5 rounded-2xl font-black hover:bg-indigo-500 transition shadow-2xl shadow-indigo-600/20"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Return to Network</span>
          </Link>
        </div>
      </div>
    );
  }

  const hasSocials =
    profile.socials.linkedin ||
    profile.socials.twitter ||
    profile.socials.github ||
    profile.socials.instagram ||
    profile.socials.facebook;

  return (
    <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center p-0 sm:p-6 overflow-x-hidden selection:bg-indigo-500/30">
      {/* Immersive Mesh Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[70%] bg-indigo-600/20 rounded-full blur-[120px] animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[60%] bg-violet-600/20 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
        <div className="absolute top-[30%] right-[10%] w-[40%] h-[40%] bg-fuchsia-600/10 rounded-full blur-[100px] animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-[440px] w-full relative z-10 min-h-screen sm:min-h-fit animate-in fade-in slide-in-from-bottom-12 duration-1000">
        <div className="bg-slate-900/40 backdrop-blur-[40px] border border-white/5 sm:rounded-[4rem] overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.6)] min-h-screen sm:min-h-fit flex flex-col">
          {/* Header Pass - Dynamic Content */}
          <div className="h-64 bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 relative p-8">
            <div className="flex justify-between items-start">
              <Link
                to="/"
                className="bg-white/10 backdrop-blur-xl p-3 rounded-2xl hover:bg-white/20 transition-all border border-white/10"
              >
                <Globe className="w-5 h-5 text-white" />
              </Link>
              <button
                onClick={handleShare}
                className="bg-white/10 backdrop-blur-xl p-3 rounded-2xl hover:bg-white/20 transition-all border border-white/10"
              >
                <Share2 className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
              <div className="relative group">
                <div className="absolute -inset-2 bg-white/10 rounded-[3rem] blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <img
                  src={profile.avatarUrl}
                  alt={profile.fullName}
                  className="w-44 h-44 rounded-[3rem] border-[10px] border-[#0a0c14] object-cover shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div className="absolute bottom-4 right-4 bg-emerald-500 w-6 h-6 rounded-full border-4 border-[#0a0c14] shadow-lg z-20 animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Content Body */}
          <div className="px-8 pt-28 pb-12 flex-grow text-center">
            <div className="mb-8">
              <h1 className="text-[2.75rem] font-black tracking-tighter mb-2 leading-none">
                {profile.fullName}
              </h1>
              <div className="flex flex-col items-center space-y-2">
                <span className="text-indigo-400 font-black uppercase tracking-[0.2em] text-[10px] px-3 py-1 bg-indigo-500/10 rounded-lg">
                  {profile.jobTitle}
                </span>
                <span className="text-slate-500 font-bold uppercase tracking-[0.1em] text-[11px]">
                  {profile.company}
                </span>
              </div>
            </div>

            {profile.bio && (
              <div className="mb-10 relative group px-2">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-[2.5rem] blur opacity-25"></div>
                <div className="relative bg-white/5 border border-white/5 rounded-[2.5rem] p-8 text-left backdrop-blur-md">
                  <div className="flex items-center space-x-2 mb-4">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
                      Professional Summary
                    </span>
                  </div>
                  <p className="text-slate-300 text-base leading-relaxed font-medium whitespace-pre-wrap italic">
                    "{profile.bio}"
                  </p>
                </div>
              </div>
            )}

            {/* Main Action Deck */}
            <div className="grid grid-cols-1 gap-4 mb-10 px-2">
              <button
                onClick={handleSaveContact}
                disabled={saved}
                className={`flex items-center justify-center space-x-3 py-6 rounded-3xl font-black transition-all shadow-2xl active:scale-95 ${saved ? "bg-emerald-500 text-white" : "bg-white text-slate-950 hover:bg-slate-100 shadow-indigo-500/10"}`}
              >
                {saved ? (
                  <Check className="w-6 h-6 animate-in zoom-in" />
                ) : (
                  <UserPlus className="w-6 h-6" />
                )}
                <span className="text-base">
                  {saved ? "Contact Saved" : "Add to Contacts"}
                </span>
              </button>
            </div>

            {/* Interaction List */}
            <div className="space-y-3 px-2">
              <IdentityItem
                href={`mailto:${profile.email}`}
                icon={<Mail className="text-indigo-400" />}
                label="Direct Endpoint"
                value={profile.email}
              />

              {profile.phone && (
                <IdentityItem
                  href={`tel:${profile.phone}`}
                  icon={<Phone className="text-emerald-400" />}
                  label="Direct Dial"
                  value={profile.phone}
                />
              )}

              {profile.website && (
                <IdentityItem
                  href={profile.website}
                  icon={<Globe className="text-blue-400" />}
                  label="Network Portal"
                  value={profile.website.replace(/^https?:\/\//, "")}
                />
              )}
            </div>

            {/* Networking Grid */}
            <div className="mt-12 pt-8 border-t border-white/5">
              {hasSocials && (
                <div className="flex items-center justify-center gap-4 mb-10">
                  {profile.socials.linkedin && (
                    <SocialLink
                      href={profile.socials.linkedin}
                      icon={<Linkedin className="w-6 h-6" />}
                      color="hover:text-indigo-400"
                    />
                  )}
                  {profile.socials.twitter && (
                    <SocialLink
                      href={profile.socials.twitter}
                      icon={<Twitter className="w-6 h-6" />}
                      color="hover:text-sky-400"
                    />
                  )}
                  {profile.socials.github && (
                    <SocialLink
                      href={profile.socials.github}
                      icon={<Github className="w-6 h-6" />}
                      color="hover:text-white"
                    />
                  )}
                  {profile.socials.instagram && (
                    <SocialLink
                      href={profile.socials.instagram}
                      icon={<Instagram className="w-6 h-6" />}
                      color="hover:text-pink-400"
                    />
                  )}
                  {profile.socials.facebook && (
                    <SocialLink
                      href={profile.socials.facebook}
                      icon={<Facebook className="w-6 h-6" />}
                      color="hover:text-blue-500"
                    />
                  )}
                </div>
              )}

              <div className="flex flex-col items-center space-y-4">
                <div className="inline-flex items-center space-x-3 px-4 py-2 bg-white/5 rounded-full border border-white/5">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                    Verified QRSync Protocol v3.0
                  </span>
                </div>
                <Link
                  to="/"
                  className="text-[9px] font-black text-slate-600 hover:text-indigo-400 transition-colors uppercase tracking-[0.4em]"
                >
                  Get Your Own Card
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const IdentityItem = ({
  href,
  icon,
  label,
  value,
}: {
  href: string;
  icon: any;
  label: string;
  value: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center p-5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-[2.5rem] transition-all group active:scale-[0.98]"
  >
    <div className="bg-[#0a0c14] p-4 rounded-2xl group-hover:scale-110 transition-transform border border-white/5">
      {React.cloneElement(icon, { size: 22 })}
    </div>
    <div className="ml-5 text-left overflow-hidden">
      <p className="text-[9px] text-slate-600 font-black uppercase tracking-[0.2em] mb-0.5">
        {label}
      </p>
      <p className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors truncate">
        {value}
      </p>
    </div>
  </a>
);

const SocialLink = ({
  href,
  icon,
  color,
}: {
  href: string;
  icon: any;
  color: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`p-5 bg-white/5 rounded-3xl transition-all border border-white/5 text-slate-400 hover:scale-110 active:scale-95 ${color}`}
  >
    {icon}
  </a>
);

export default PublicCard;
