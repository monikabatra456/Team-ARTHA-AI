import React, { useState } from 'react';
import {
  Sparkles,
  Building2,
  ShieldCheck,
  FileCheck,
  ArrowRight,
  RotateCcw,
  LogOut,
  User as UserIcon,
  Loader2,
  AlertCircle,
  X,
  Globe,
  Settings
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DomainHelpModal } from './DomainHelpModal';

interface HeaderNavProps {
  onNewSearch: () => void;
  onSelectPreset: (index: number) => void;
  isResultsView: boolean;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ onNewSearch, onSelectPreset, isResultsView }) => {
  const {
    currentUser,
    loading,
    error,
    isDomainUnauthorized,
    loginWithGoogle,
    loginDemoUser,
    logoutUser,
    clearError
  } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [showDomainModal, setShowDomainModal] = useState(false);

  const handleSignIn = async () => {
    setIsSigningIn(true);
    const result = await loginWithGoogle();
    setIsSigningIn(false);
    if (!result && isDomainUnauthorized) {
      setShowDomainModal(true);
    }
  };

  return (
    <>
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
        {/* Top Institutional Bar */}
        <div className="bg-slate-950 px-4 sm:px-6 py-1.5 border-b border-slate-800 text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-slate-300">ArthaAI National MSME Intelligence</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">Government Schemes, Subsidies & Tenders Engine</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="hidden sm:inline text-slate-400">FY 2026-27 Active Policies</span>
            <span className="text-emerald-400 font-medium">JanSamarth • CGTMSE • GeM • ZED</span>
          </div>
        </div>

        {/* Main App Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onNewSearch}
              className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center font-black text-white text-lg shadow-sm border border-blue-500/40 group-hover:scale-105 transition-transform">
                अ
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black tracking-tight text-white flex items-center gap-1">
                    Artha<span className="text-blue-400">AI</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-900/80 text-blue-200 border border-blue-700">
                    MVP 1.0
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 -mt-0.5">
                  MSME Scheme, Subsidy & Tender Discovery
                </p>
              </div>
            </button>
          </div>

          {/* Right Nav Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {isResultsView && (
              <button
                id="header-new-search-btn"
                type="button"
                onClick={onNewSearch}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-700 hover:bg-blue-600 text-white text-xs font-bold transition-colors cursor-pointer shadow-sm"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">New Business Profile</span>
                <span className="sm:hidden">Reset</span>
              </button>
            )}

            {/* Firebase Google Auth Section */}
            {loading ? (
              <div className="flex items-center gap-1.5 text-xs text-slate-400 px-3 py-1.5">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
            ) : currentUser ? (
              <div className="flex items-center gap-2.5 bg-slate-800/80 border border-slate-700 rounded-xl p-1 sm:pr-3">
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt={currentUser.displayName || 'User Avatar'}
                    className="w-8 h-8 rounded-lg object-cover border border-slate-600"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-lg bg-blue-800 text-white flex items-center justify-center text-xs font-bold">
                    {currentUser.displayName
                      ? currentUser.displayName.charAt(0).toUpperCase()
                      : currentUser.email?.charAt(0).toUpperCase() || 'U'}
                  </div>
                )}
                <div className="hidden sm:flex flex-col text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-200 leading-none truncate max-w-[130px]">
                      {currentUser.displayName || 'Enterprise User'}
                    </span>
                    {currentUser.isDemo && (
                      <span className="px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 text-[9px] font-bold rounded border border-emerald-500/40">
                        Demo
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 leading-none truncate max-w-[130px] mt-1">
                    {currentUser.email}
                  </span>
                </div>
                <button
                  type="button"
                  id="btn-firebase-signout"
                  onClick={logoutUser}
                  title="Sign Out"
                  className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-700/50 rounded-lg transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  id="btn-firebase-google-signin"
                  onClick={handleSignIn}
                  disabled={isSigningIn}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold transition-all shadow-sm cursor-pointer border border-slate-200 disabled:opacity-60"
                >
                  {isSigningIn ? (
                    <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                  ) : (
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                  )}
                  <span>{isSigningIn ? 'Connecting...' : 'Sign in with Google'}</span>
                </button>
                <button
                  type="button"
                  id="btn-quick-demo-signin"
                  onClick={() => loginDemoUser('monikabatra890@gmail.com', 'Monika Batra')}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
                  title="Sign in with verified test profile (monikabatra890@gmail.com)"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Sandbox Sign-in</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Actionable Error & Domain Setup Alert Bar */}
        {error && (
          <div className="bg-amber-500/15 border-t border-amber-500/30 px-4 py-2.5 text-xs text-amber-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="truncate max-w-xl">{error}</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {isDomainUnauthorized && (
                <>
                  <button
                    type="button"
                    onClick={() => setShowDomainModal(true)}
                    className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Settings className="w-3 h-3" />
                    <span>Authorize Domain</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => loginDemoUser('monikabatra890@gmail.com', 'Monika Batra')}
                    className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Sign in with Demo</span>
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={clearError}
                className="text-amber-400 hover:text-amber-200 p-1 rounded cursor-pointer"
                title="Dismiss"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Domain Authorization Helper Modal */}
      <DomainHelpModal
        isOpen={showDomainModal || isDomainUnauthorized}
        onClose={() => setShowDomainModal(false)}
      />
    </>
  );
};


