import React, { useState } from 'react';
import {
  Sparkles,
  Building2,
  ShieldCheck,
  FileCheck2,
  TrendingUp,
  Award,
  ArrowRight,
  CheckCircle2,
  Loader2,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DomainHelpModal } from './DomainHelpModal';

interface SignInPageProps {
  onSignedIn?: () => void;
}

export const SignInPage: React.FC<SignInPageProps> = ({ onSignedIn }) => {
  const {
    loginWithGoogle,
    loginDemoUser,
    isDomainUnauthorized,
    error,
    clearError
  } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [showDomainModal, setShowDomainModal] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);
    const user = await loginWithGoogle();
    setIsSigningIn(false);
    if (user) {
      onSignedIn?.();
    } else if (isDomainUnauthorized) {
      setShowDomainModal(true);
    }
  };

  const handleDemoSignIn = (email: string, name: string) => {
    loginDemoUser(email, name);
    onSignedIn?.();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      {/* Top Institutional Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center font-black text-white text-lg shadow-sm border border-blue-500/40">
              अ
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-white flex items-center gap-1">
                  Artha<span className="text-blue-400">AI</span>
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-900/80 text-blue-200 border border-blue-700">
                  National MSME Portal
                </span>
              </div>
              <p className="text-[11px] text-slate-400 -mt-0.5">
                Schemes, Subsidies & Tender Matching Engine
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-xs text-slate-400">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>FY 2026-27 Active MSME Policies</span>
          </div>
        </div>
      </header>

      {/* Hero & Authentication Card */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Context & Value Props */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/80 text-blue-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Government Schemes & Subsidies Discovery</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Unlock Central & State Benefits Tailored for Your Enterprise
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Connect your business profile to instantly discover eligible capital subsidies, collateral-free credit guarantees (CGTMSE up to ₹5 Cr), and 25% mandatory public procurement quotas on GeM.
              </p>
            </div>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-blue-400 text-xs font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Collateral-Free Credit</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  CGTMSE & JanSamarth instant loan eligibility scoring.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                  <Award className="w-4 h-4" />
                  <span>Capital Subsidies</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Up to 35% PMEGP, CLCSS, and state industrial subsidies.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                  <Building2 className="w-4 h-4" />
                  <span>GeM 25% Quota</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Exclusive central ministry tender reservations for MSMEs.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-purple-400 text-xs font-bold">
                  <FileCheck2 className="w-4 h-4" />
                  <span>Document Compliance</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Automated audit checklist for DPRs, Udyam & GST filings.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Sign In Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-2xl border border-slate-100 text-slate-900 space-y-5">
              <div className="space-y-1 text-center sm:text-left">
                <h2 className="text-xl font-black text-slate-900 tracking-tight">
                  Sign In to ArthaAI
                </h2>
                <p className="text-xs text-slate-500">
                  Authenticate to discover and apply for schemes
                </p>
              </div>

              {/* Primary Google Auth Button */}
              <button
                type="button"
                id="btn-signin-page-google"
                onClick={handleGoogleSignIn}
                disabled={isSigningIn}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all cursor-pointer disabled:opacity-60"
              >
                {isSigningIn ? (
                  <Loader2 className="w-5 h-5 animate-spin text-blue-400" />
                ) : (
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
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
                <span>{isSigningIn ? 'Connecting to Google...' : 'Sign in with Google'}</span>
              </button>

              {/* Divider */}
              <div className="relative flex items-center justify-center">
                <div className="border-t border-slate-200 w-full"></div>
                <span className="bg-white px-3 text-[11px] uppercase tracking-wider text-slate-400 font-semibold absolute">
                  or instant test sign-in
                </span>
              </div>

              {/* Demo Sign in Options */}
              <div className="space-y-2">
                <button
                  type="button"
                  id="btn-signin-demo-primary"
                  onClick={() => handleDemoSignIn('monikabatra890@gmail.com', 'Monika Batra')}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-blue-50/80 hover:bg-blue-100 border border-blue-200 text-left transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-700 text-white flex items-center justify-center font-bold text-xs">
                      MB
                    </div>
                    <div>
                      <div className="text-xs font-bold text-blue-950 flex items-center gap-1.5">
                        <span>Monika Batra</span>
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-blue-200/80 text-blue-900">
                          Officer
                        </span>
                      </div>
                      <span className="text-[11px] text-blue-700">monikabatra890@gmail.com</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                  type="button"
                  id="btn-signin-demo-enterprise"
                  onClick={() => handleDemoSignIn('arun.sharma@precisionauto.in', 'Arun Sharma (Precision Auto MSME)')}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center font-bold text-xs">
                      AS
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">Arun Sharma</div>
                      <span className="text-[11px] text-slate-500">Precision Auto Components (Manufacturing)</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

              {/* Help & Domain Whitelist Assistance Trigger */}
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => setShowDomainModal(true)}
                  className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-blue-700 underline cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Domain Authorization Instructions</span>
                </button>
              </div>

              {/* Trust Footer */}
              <div className="pt-2 border-t border-slate-100 text-center text-[10px] text-slate-400">
                🔒 Enterprise authentication secured via Firebase Auth & Google Identity.
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-4 px-4 text-center text-[11px] text-slate-500">
        ArthaAI • National MSME Scheme & Subsidy Intelligence Portal • Ministry of MSME, Govt of India
      </footer>

      {/* Domain Authorization Modal */}
      <DomainHelpModal
        isOpen={showDomainModal}
        onClose={() => setShowDomainModal(false)}
      />
    </div>
  );
};
