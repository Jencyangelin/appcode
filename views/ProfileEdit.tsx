
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Briefcase, Building, Mail, Phone, Globe, Linkedin, Twitter, Github, Instagram, Facebook, Save, Sparkles, Loader2, Award, Target } from 'lucide-react';
import { profileService } from '../services/profileService';
import { enhanceBio } from '../services/geminiService';
import { UserProfile } from '../types';

interface ProfileEditProps {
  user: any;
}

const ProfileEdit: React.FC<ProfileEditProps> = ({ user }) => {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [enhancing, setEnhancing] = useState(false);
  const [formData, setFormData] = useState<Omit<UserProfile, 'createdAt'>>({
    id: user.id,
    fullName: '',
    jobTitle: '',
    company: '',
    industry: '',
    skills: '',
    email: user.email,
    phone: '',
    website: '',
    bio: '',
    socials: { linkedin: '', twitter: '', github: '', instagram: '', facebook: '' },
    avatarUrl: `https://picsum.photos/seed/${user.id}/400`,
  });

  useEffect(() => {
    const loadData = async () => {
      const existing = await profileService.getProfile(user.id);
      if (existing) {
        setFormData(existing);
      }
    };
    loadData();
  }, [user.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('social_')) {
      const platform = name.split('_')[1];
      setFormData(prev => ({
        ...prev,
        socials: { ...prev.socials, [platform]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleEnhanceBio = async () => {
    if (!formData.bio) return;
    setEnhancing(true);
    const newBio = await enhanceBio(
      formData.bio, 
      formData.fullName, 
      formData.jobTitle, 
      formData.industry, 
      formData.skills
    );
    setFormData(prev => ({ ...prev, bio: newBio }));
    setEnhancing(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await profileService.saveProfile({
      ...formData,
      createdAt: new Date().toISOString()
    });
    setSaving(false);
    navigate('/dashboard');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Craft Your Identity</h1>
        <p className="text-slate-500 mt-2 font-medium">Fine-tune how the world sees your professional brand.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold mb-8 text-slate-800 flex items-center space-x-3">
            <div className="p-2 bg-indigo-50 rounded-lg">
              <User className="w-5 h-5 text-indigo-600" />
            </div>
            <span>Core Information</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
              <input 
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium"
                placeholder="e.g. Alexander Wright"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Job Title</label>
              <input 
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium"
                placeholder="e.g. Strategy Consultant"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Company</label>
              <input 
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium"
                placeholder="e.g. Vertex Systems"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Industry Focus</label>
              <div className="relative group">
                <Target className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
                <input 
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium"
                  placeholder="e.g. Fintech, Healthcare"
                />
              </div>
            </div>
          </div>
        </div>

        {/* AI Bio Section */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-bl-[5rem] -mr-10 -mt-10 pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
            <h2 className="text-xl font-bold text-slate-800 flex items-center space-x-3">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <Sparkles className="w-5 h-5 text-indigo-600" />
              </div>
              <span>Professional Bio</span>
            </h2>
            <button 
              type="button"
              onClick={handleEnhanceBio}
              disabled={enhancing || !formData.bio}
              className="flex items-center space-x-2 bg-slate-900 text-white px-6 py-3 rounded-xl text-sm font-black hover:bg-indigo-600 transition-all shadow-xl shadow-slate-100 disabled:opacity-30 group"
            >
              {enhancing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />}
              <span>AI Smart Refine</span>
            </button>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center">
                <Award className="w-3 h-3 mr-1" /> Key Skills & Expertise (for AI)
              </label>
              <input 
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                className="w-full px-5 py-4 bg-indigo-50/30 border border-indigo-100 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium"
                placeholder="e.g. Leadership, Python, Cloud Architecture..."
              />
              <p className="text-[10px] text-slate-400 font-medium ml-1 italic">Adding skills helps the AI write a more targeted bio.</p>
            </div>

            <textarea 
              name="bio"
              rows={4}
              value={formData.bio}
              onChange={handleChange}
              placeholder="Start typing your bio here..."
              className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-[2rem] outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all resize-none font-medium text-lg leading-relaxed"
            />
          </div>
        </div>

        {/* Contact & Socials */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold mb-8 text-slate-800 flex items-center space-x-3">
            <div className="p-2 bg-indigo-50 rounded-lg">
              <Globe className="w-5 h-5 text-indigo-600" />
            </div>
            <span>Reach & Visibility</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
              <input 
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium"
                placeholder="Work Email"
              />
            </div>
            <div className="relative group">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
              <input 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium"
                placeholder="Phone Number"
              />
            </div>
            <div className="relative group">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
              <input 
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium"
                placeholder="Portfolio or Website URL"
              />
            </div>
          </div>

          {/* Social Media Fields */}
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-6 text-slate-700 flex items-center space-x-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
              <span>Social Media Profiles</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative group">
                <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
                <input 
                  name="social_linkedin"
                  value={formData.socials.linkedin}
                  onChange={handleChange}
                  className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium"
                  placeholder="LinkedIn Profile URL"
                />
              </div>
              <div className="relative group">
                <Twitter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
                <input 
                  name="social_twitter"
                  value={formData.socials.twitter}
                  onChange={handleChange}
                  className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium"
                  placeholder="Twitter Profile URL"
                />
              </div>
              <div className="relative group">
                <Github className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
                <input 
                  name="social_github"
                  value={formData.socials.github}
                  onChange={handleChange}
                  className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium"
                  placeholder="GitHub Profile URL"
                />
              </div>
              <div className="relative group">
                <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
                <input 
                  name="social_instagram"
                  value={formData.socials.instagram}
                  onChange={handleChange}
                  className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium"
                  placeholder="Instagram Profile URL"
                />
              </div>
              <div className="relative group">
                <Facebook className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
                <input 
                  name="social_facebook"
                  value={formData.socials.facebook}
                  onChange={handleChange}
                  className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium"
                  placeholder="Facebook Profile URL"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-10">
          <button 
            type="submit" 
            disabled={saving}
            className="flex items-center space-x-3 bg-indigo-600 text-white px-12 py-5 rounded-[2rem] font-black text-lg hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-100 disabled:opacity-70 active:scale-95"
          >
            {saving ? <Loader2 className="w-6 h-6 animate-spin" /> : <Save className="w-6 h-6" />}
            <span>Finalize Profile</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEdit;
