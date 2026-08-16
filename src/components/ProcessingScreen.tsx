import React, { useState, useEffect } from 'react';
import { Sparkles, Loader2, CheckCircle2, ShieldCheck, Database, FileText } from 'lucide-react';
import { BusinessProfile } from '../types';

interface ProcessingScreenProps {
  profile: BusinessProfile;
}

export const ProcessingScreen: React.FC<ProcessingScreenProps> = ({ profile }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const steps = [
    `Applying hard eligibility filters (State: ${profile.state}, Sector: ${profile.industry}, Turnover: ${profile.turnover_band})...`,
    'Screening Central & State subsidies, CGTMSE credit guarantees, and GeM procurement quotas...',
    'Deploying AI Officer to formulate plain-language qualification reasons and fit scoring...',
    'Synthesizing step-by-step statutory application roadmap and required document checklists...'
  ];

  useEffect(() => {
    const t1 = setTimeout(() => setCurrentStepIndex(1), 750);
    const t2 = setTimeout(() => setCurrentStepIndex(2), 1600);
    const t3 = setTimeout(() => setCurrentStepIndex(3), 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div id="processing-screen-container" className="max-w-2xl mx-auto my-12 text-center space-y-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 shadow-sm space-y-6">
        {/* Animated Central Icon */}
        <div className="relative inline-block mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-900 to-indigo-700 text-white flex items-center justify-center shadow-md">
            <Sparkles className="w-8 h-8 text-blue-200 animate-pulse" />
          </div>
          <div className="absolute -bottom-2 -right-2 p-1.5 bg-white rounded-full shadow-md border border-slate-200">
            <Loader2 className="w-4 h-4 text-blue-900 animate-spin" />
          </div>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Analyzing your business against 40,000+ schemes...
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
            Cross-referencing <strong>{profile.name}</strong> ({profile.industry}) with active Central Ministries, State Industrial Policies, and SIDBI facilities.
          </p>
        </div>

        {/* Step Progress Feed */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-left space-y-3.5 max-w-lg mx-auto">
          {steps.map((text, idx) => {
            const isCompleted = currentStepIndex > idx;
            const isCurrent = currentStepIndex === idx;

            return (
              <div key={idx} className="flex items-start gap-3">
                <div className="pt-0.5 shrink-0">
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 text-blue-900 animate-spin" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-300 bg-white" />
                  )}
                </div>
                <span
                  className={`text-xs leading-relaxed ${
                    isCompleted
                      ? 'text-slate-500 line-through decoration-slate-300'
                      : isCurrent
                      ? 'text-slate-900 font-bold'
                      : 'text-slate-400'
                  }`}
                >
                  {text}
                </span>
              </div>
            );
          })}
        </div>

        {/* Trust Badges Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>ArthaAI Deterministic Candidate Filtering • JanSamarth • GeM • MSME Rules</span>
        </div>
      </div>
    </div>
  );
};
