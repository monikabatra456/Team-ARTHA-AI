import React, { useState, useEffect } from 'react';
import { BusinessProfile, MatchedOpportunity, MatchResponse, UploadedDocument, SchemeApplication } from './types';
import { PRESET_PROFILES, generateDeterministicMatches } from './data/schemes';
import { HeaderNav } from './components/HeaderNav';
import { OnboardingForm } from './components/OnboardingForm';
import { ProcessingScreen } from './components/ProcessingScreen';
import { ResultsDashboard } from './components/ResultsDashboard';
import { ActionPlanModal } from './components/ActionPlanModal';
import { SignInPage } from './components/SignInPage';
import { useAuth } from './context/AuthContext';
import { AlertCircle, Loader2 } from 'lucide-react';
import { loadApplications, saveApplications } from './utils/applicationData';

const STORAGE_KEY = 'arthai_msme_profile_v1';
const DOCS_STORAGE_KEY = 'arthai_msme_docs_v1';

export function App() {
  const { currentUser, loading: authLoading } = useAuth();

  const [profile, setProfile] = useState<BusinessProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return PRESET_PROFILES[0].profile;
  });

  const [documents, setDocuments] = useState<UploadedDocument[]>(() => {
    try {
      const savedDocs = localStorage.getItem(DOCS_STORAGE_KEY);
      if (savedDocs) {
        return JSON.parse(savedDocs);
      }
    } catch {
      // ignore
    }
    return [];
  });

  const [currentScreen, setCurrentScreen] = useState<'onboarding' | 'processing' | 'results'>('onboarding');
  const [matches, setMatches] = useState<MatchedOpportunity[]>(() => {
    return generateDeterministicMatches(PRESET_PROFILES[0].profile);
  });
  const [applications, setApplications] = useState<SchemeApplication[]>(() => {
    const initialMatches = generateDeterministicMatches(PRESET_PROFILES[0].profile);
    return loadApplications(PRESET_PROFILES[0].profile, initialMatches);
  });
  const [selectedScheme, setSelectedScheme] = useState<MatchedOpportunity | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync profile changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {
      // ignore
    }
  }, [profile]);

  // Sync documents changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(DOCS_STORAGE_KEY, JSON.stringify(documents));
    } catch {
      // ignore
    }
  }, [documents]);

  // Sync applications to localStorage
  useEffect(() => {
    saveApplications(applications);
  }, [applications]);

  const handleProfileFieldChange = (field: keyof BusinessProfile, value: any) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleApplyPreset = (index: number) => {
    if (PRESET_PROFILES[index]) {
      const newProfile = PRESET_PROFILES[index].profile;
      setProfile(newProfile);
      const newMatches = generateDeterministicMatches(newProfile);
      setMatches(newMatches);
    }
  };

  const handleAnalyzeSchemes = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setCurrentScreen('processing');

    try {
      const response = await fetch('/api/match-schemes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ profile, documents })
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data: MatchResponse = await response.json();
      setMatches(data.matches || []);

      // Minimum smooth animation time
      setTimeout(() => {
        setCurrentScreen('results');
      }, 1800);
    } catch (err: any) {
      console.warn('API call failed, running local deterministic fallback:', err);
      // Fallback seamlessly to local deterministic engine
      const localMatches = generateDeterministicMatches(profile);
      setMatches(localMatches);

      setTimeout(() => {
        setCurrentScreen('results');
      }, 1800);
    }
  };


  const handleTrackScheme = (scheme: MatchedOpportunity) => {
    const existing = applications.find((a) => a.scheme_id === scheme.scheme_id);
    if (!existing) {
      const today = new Date().toISOString().split('T')[0];
      const newApp: SchemeApplication = {
        id: `app_${Date.now()}`,
        scheme_id: scheme.scheme_id,
        scheme_name: scheme.name,
        category: scheme.category,
        nodal_agency: scheme.nodal_agency || 'Ministry of MSME',
        benefit_value: scheme.benefit_value,
        applied_subsidy_amount: scheme.benefit_value,
        status: 'Drafting',
        progress_percent: 25,
        application_ref_number: `${scheme.category.toUpperCase()}/${profile.state.slice(0, 2).toUpperCase()}/2026/${Math.floor(
          10000 + Math.random() * 90000
        )}`,
        created_at: today,
        last_updated: today,
        milestones: [
          {
            stage: 'Drafting',
            label: 'DPR & Document Dossier Prepared',
            completed: true,
            date: today,
            note: 'Dossier initiated from matched schemes profile.'
          },
          {
            stage: 'Submitted',
            label: 'Portal Submission & Acknowledgement',
            completed: false,
            note: 'Submit application with Udyam verification on official portal.'
          },
          {
            stage: 'Under Review',
            label: 'Department Scrutiny & Committee Assessment',
            completed: false,
            note: 'Field inspection and verification by nodal officer.'
          },
          {
            stage: 'Approved',
            label: 'Sanction Letter & Disbursal Release',
            completed: false,
            note: 'Sanction order issued & subsidy / guarantee active.'
          }
        ],
        current_action_needed: 'Drafting in progress. Complete DPR and document checklist.',
        officer_remarks: 'Application added to ArthaAI active tracker.',
        portal_url: scheme.official_url,
        attached_docs_count: 2
      };
      const updated = [newApp, ...applications];
      setApplications(updated);
      saveApplications(updated);
    }
  };

  const handleNewSearch = () => {
    setSelectedScheme(null);
    setCurrentScreen('onboarding');
  };

  // 1. Loading state during auth check
  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center font-black text-white text-xl shadow-lg border border-blue-500/40 animate-pulse">
          अ
        </div>
        <div className="flex items-center gap-2 text-slate-400 text-xs">
          <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
          <span>Verifying MSME session...</span>
        </div>
      </div>
    );
  }

  // 2. Unauthenticated state: display dedicated SignInPage
  if (!currentUser) {
    return <SignInPage onSignedIn={() => setCurrentScreen('onboarding')} />;
  }

  // 3. Authenticated state: display the Main Application
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans selection:bg-blue-900 selection:text-white">
      {/* Top Navigation */}
      <HeaderNav
        onNewSearch={handleNewSearch}
        onSelectPreset={handleApplyPreset}
        isResultsView={currentScreen === 'results'}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {errorMessage && (
          <div className="max-w-4xl mx-auto mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        {currentScreen === 'onboarding' && (
          <OnboardingForm
            profile={profile}
            onChange={handleProfileFieldChange}
            onApplyPreset={handleApplyPreset}
            onSubmit={handleAnalyzeSchemes}
            documents={documents}
            onDocumentsChange={setDocuments}
          />
        )}

        {currentScreen === 'processing' && <ProcessingScreen profile={profile} />}

        {currentScreen === 'results' && (
          <ResultsDashboard
            profile={profile}
            matches={matches}
            applications={applications}
            onApplicationsChange={setApplications}
            onSelectScheme={(scheme) => setSelectedScheme(scheme)}
            onEditProfile={() => setCurrentScreen('onboarding')}
          />
        )}
      </main>

      {/* Action Plan Detail Modal */}
      {selectedScheme && (
        <ActionPlanModal
          scheme={selectedScheme}
          profile={profile}
          onClose={() => setSelectedScheme(null)}
          documents={documents}
          onDocumentsChange={setDocuments}
          onTrackScheme={handleTrackScheme}
        />
      )}

      {/* Institutional Portal Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-6 px-4 text-center text-xs space-y-2 mt-12">
        <div className="flex flex-wrap items-center justify-center gap-4 text-slate-300 font-semibold text-[11px]">
          <span>ArthaAI MSME Engine</span>
          <span>•</span>
          <span>Ministry of Micro, Small and Medium Enterprises (MSME)</span>
          <span>•</span>
          <span>CGTMSE</span>
          <span>•</span>
          <span>GeM Procurement</span>
          <span>•</span>
          <span>ZED Certification</span>
        </div>
        <p className="text-slate-500 text-[11px] max-w-xl mx-auto">
          ArthaAI matches MSME enterprises to relevant Central & State government schemes using deterministic eligibility filters and AI-generated roadmaps. All applications must be filed on official state and central government portals.
        </p>
      </footer>
    </div>
  );
}
export default App;

