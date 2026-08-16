import React, { useState } from 'react';
import {
  ExternalLink,
  Copy,
  Check,
  X,
  ShieldAlert,
  Sparkles,
  CheckCircle2,
  Globe,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface DomainHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DomainHelpModal: React.FC<DomainHelpModalProps> = ({ isOpen, onClose }) => {
  const { unauthorizedDomain, loginDemoUser, clearError } = useAuth();
  const [copied, setCopied] = useState(false);
  const [copiedWildcard, setCopiedWildcard] = useState(false);

  if (!isOpen) return null;

  const domain = unauthorizedDomain || (typeof window !== 'undefined' ? window.location.hostname : '');
  const firebaseConsoleUrl = 'https://console.firebase.google.com/project/artha-ai-3a610/authentication/settings';

  const handleCopy = (text: string, isWildcard = false) => {
    navigator.clipboard.writeText(text);
    if (isWildcard) {
      setCopiedWildcard(true);
      setTimeout(() => setCopiedWildcard(false), 2000);
    } else {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDemoSignIn = () => {
    loginDemoUser('monikabatra890@gmail.com', 'Monika Batra');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div
        id="domain-auth-modal"
        className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden text-slate-900 flex flex-col"
      >
        {/* Header */}
        <div className="p-5 bg-amber-500/10 border-b border-amber-500/20 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-900 flex items-center justify-center shrink-0">
              <Globe className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Authorize Domain in Firebase
              </h3>
              <p className="text-xs text-slate-600">
                Firebase Project: <span className="font-bold text-blue-900">artha-ai-3a610</span>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs text-slate-700">
          <p className="leading-relaxed">
            Google Sign-In requires your preview domain to be whitelisted in Firebase Console under{' '}
            <strong className="text-slate-900">Authentication &gt; Settings &gt; Authorized domains</strong>.
          </p>

          {/* Copy domain card */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Your Current App Domain:
            </span>
            <div className="flex items-center justify-between gap-2 bg-white border border-slate-300 rounded-lg p-2 font-mono text-[11px] text-slate-800 break-all">
              <span className="truncate">{domain}</span>
              <button
                type="button"
                onClick={() => handleCopy(domain, false)}
                className="shrink-0 px-2.5 py-1 rounded bg-blue-900 hover:bg-blue-800 text-white font-sans text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <p className="text-[10px] text-slate-500">
              Tip: You can also add <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800">run.app</code> to authorize all preview URLs.
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-2 bg-blue-50/50 border border-blue-100 rounded-xl p-3.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-950">
              Quick 3-Step Setup in Firebase:
            </span>
            <ol className="space-y-1.5 list-decimal list-inside text-slate-700">
              <li>Open the Firebase Authentication Settings page.</li>
              <li>Under <strong className="text-slate-900">Authorized domains</strong>, click <strong className="text-slate-900">Add domain</strong>.</li>
              <li>Paste the domain above and click <strong className="text-slate-900">Save</strong>.</li>
            </ol>
            <div className="pt-2">
              <a
                href={firebaseConsoleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs shadow-xs"
              >
                <span>Open Firebase Console Settings</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Instant Demo Sign-In Fallback */}
          <div className="border-t border-slate-100 pt-3">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 font-bold text-emerald-950 text-xs">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>Instant Test Mode</span>
                </div>
                <p className="text-[11px] text-emerald-900">
                  Sign in immediately with verified test profile (monikabatra890@gmail.com)
                </p>
              </div>
              <button
                type="button"
                id="btn-modal-demo-login"
                onClick={handleDemoSignIn}
                className="w-full sm:w-auto shrink-0 px-3.5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Sign In as Demo User</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
