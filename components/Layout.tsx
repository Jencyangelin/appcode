import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LogOut, QrCode, Sun, Moon, Github, Globe, Search } from "lucide-react";

interface LayoutProps {
  children?: React.ReactNode;
  user: any;
  onLogout: () => void;
}

const NavLink = ({
  to,
  active,
  children,
}: {
  to: string;
  active: boolean;
  children?: React.ReactNode;
}) => (
  <Link
    to={to}
    className={`text-sm font-black uppercase tracking-[0.1em] transition-all ${
      active
        ? "text-indigo-600 dark:text-indigo-400 scale-105"
        : "text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
    }`}
  >
    {children}
  </Link>
);

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout }) => {
  const location = useLocation();
  const isPublicCard = location.pathname.startsWith("/card/");
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("theme") === "dark" ||
        (!localStorage.getItem("theme") &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  if (isPublicCard) return <>{children}</>;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#020617] transition-colors duration-300">
      <nav className="sticky top-0 z-[100] bg-white/70 dark:bg-[#020617]/70 backdrop-blur-2xl border-b border-slate-100 dark:border-white/5 h-20 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-slate-900 dark:bg-indigo-600 p-2.5 rounded-2xl group-hover:rotate-12 transition-transform shadow-lg">
              <QrCode className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">
              QRSync
            </span>
          </Link>

          <div className="flex items-center space-x-2 md:space-x-8">
            <div className="hidden md:flex items-center space-x-8">
              <NavLink to="/explore" active={location.pathname === "/explore"}>
                Explore
              </NavLink>
              {user && (
                <>
                  <NavLink
                    to="/dashboard"
                    active={location.pathname === "/dashboard"}
                  >
                    Dashboard
                  </NavLink>
                  <NavLink
                    to="/profile/edit"
                    active={location.pathname === "/profile/edit"}
                  >
                    Design
                  </NavLink>
                </>
              )}
            </div>

            <div className="h-6 w-px bg-slate-200 dark:bg-white/10 mx-2 hidden md:block"></div>

            {/* Theme Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10 transition-all border border-transparent dark:border-white/5"
              aria-label="Toggle Theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {user ? (
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 text-slate-400 hover:text-red-500 dark:hover:text-red-400 font-bold text-sm transition-colors group"
              >
                <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="hidden lg:inline">Logout</span>
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-xl font-black text-sm hover:scale-105 active:scale-95 transition-all shadow-xl shadow-slate-200 dark:shadow-none"
              >
                Join Now
              </Link>
            )}
          </div>
        </div>
      </nav>

      <main className="flex-grow">{children}</main>

      <footer className="bg-white dark:bg-[#020617] py-20 border-t border-slate-50 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-12 md:space-y-0">
          <div className="flex flex-col items-center md:items-start space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-slate-100 dark:bg-white/5 p-2 rounded-xl">
                <QrCode className="w-6 h-6 text-slate-400" />
              </div>
              <span className="font-black text-slate-900 dark:text-white tracking-tighter text-2xl">
                QRSync
              </span>
            </div>
            <p className="text-slate-400 dark:text-slate-500 text-sm font-medium max-w-xs text-center md:text-left">
              The professional identity protocol for the next generation of
              digital networking.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-12 text-sm font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
            <a href="#" className="hover:text-indigo-600 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-indigo-600 transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-indigo-600 transition-colors">
              API
            </a>
            <a href="#" className="hover:text-indigo-600 transition-colors">
              Status
            </a>
          </div>

          <div className="flex flex-col items-center md:items-end space-y-4">
            <div className="flex space-x-4">
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 cursor-pointer hover:text-indigo-500 transition-colors">
                <Github className="w-5 h-5 text-slate-400" />
              </div>
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 cursor-pointer hover:text-indigo-500 transition-colors">
                <Globe className="w-5 h-5 text-slate-400" />
              </div>
            </div>
            <p className="text-slate-300 dark:text-slate-700 text-[10px] font-black uppercase tracking-[0.3em]">
              &copy; 2025 QRSync Protocol. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
