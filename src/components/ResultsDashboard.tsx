import React, { useState } from 'react';
import { MatchedOpportunity, BusinessProfile, SchemeCategory, SchemeApplication } from '../types';
import {
  Sparkles,
  Download,
  Building2,
  MapPin,
  IndianRupee,
  Layers,
  ArrowRight,
  Search,
  Filter,
  CheckCircle2,
  ExternalLink,
  RotateCcw,
  ShieldCheck,
  Award,
  BadgePercent,
  Landmark,
  FileCheck,
  Clock,
  Plus,
  ClipboardList,
  Check
} from 'lucide-react';
import { generateMatchedSchemesPDF } from '../utils/pdfExport';
import { ApplicationTracker } from './ApplicationTracker';
import { saveApplications } from '../utils/applicationData';

interface ResultsDashboardProps {
  profile: BusinessProfile;
  matches: MatchedOpportunity[];
  applications: SchemeApplication[];
  onApplicationsChange: (apps: SchemeApplication[]) => void;
  onSelectScheme: (scheme: MatchedOpportunity) => void;
  onEditProfile: () => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  profile,
  matches,
  applications,
  onApplicationsChange,
  onSelectScheme,
  onEditProfile
}) => {
  const [activeViewTab, setActiveViewTab] = useState<'matches' | 'tracker'>('matches');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredMatches = matches.filter((m) => {
    const matchesCat = selectedCategory === 'all' || m.category === selectedCategory;
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.match_reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.benefit_value.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'subsidy':
        return <BadgePercent className="w-3.5 h-3.5" />;
      case 'loan':
        return <Landmark className="w-3.5 h-3.5" />;
      case 'tender':
        return <FileCheck className="w-3.5 h-3.5" />;
      case 'certification':
        return <Award className="w-3.5 h-3.5" />;
      case 'grant':
        return <ShieldCheck className="w-3.5 h-3.5" />;
      default:
        return <Sparkles className="w-3.5 h-3.5" />;
    }
  };

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'subsidy':
        return 'bg-emerald-50 text-emerald-800 border-emerald-300';
      case 'loan':
        return 'bg-blue-50 text-blue-800 border-blue-300';
      case 'tender':
        return 'bg-purple-50 text-purple-800 border-purple-300';
      case 'certification':
        return 'bg-amber-50 text-amber-800 border-amber-300';
      case 'grant':
        return 'bg-indigo-50 text-indigo-800 border-indigo-300';
      default:
        return 'bg-slate-50 text-slate-800 border-slate-300';
    }
  };

  const handleQuickTrackScheme = (scheme: MatchedOpportunity) => {
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
      onApplicationsChange(updated);
      saveApplications(updated);
    }
    setActiveViewTab('tracker');
  };

  const handleOpenFromTracker = (schemeId: string) => {
    const found = matches.find((m) => m.scheme_id === schemeId) || matches[0];
    if (found) {
      onSelectScheme(found);
    }
  };

  return (
    <div id="results-dashboard-container" className="max-w-6xl mx-auto space-y-6">
      {/* Top Profile Summary Header Card */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-7 shadow-md border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-700">
                Evaluation Complete
              </span>
              <span className="text-xs text-slate-400">
                Scanned 40,000+ Central & State Schemes
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Matched Opportunities for {profile.name}
            </h1>

            {/* Profile details pills */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-300 pt-1">
              <span className="inline-flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700">
                <Layers className="w-3.5 h-3.5 text-blue-400" />
                {profile.industry}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                {profile.city}, {profile.state}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700">
                <IndianRupee className="w-3.5 h-3.5 text-emerald-400" />
                {profile.turnover_band}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                {profile.udyam_registered ? 'Udyam Registered' : 'Non-Udyam'}
              </span>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2.5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
            <button
              type="button"
              onClick={() => generateMatchedSchemesPDF(profile, matches)}
              className="px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-600 text-white text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF Report</span>
            </button>

            <button
              type="button"
              onClick={onEditProfile}
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary Section Switcher: Matched Discovery vs Application Status Tracker */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          type="button"
          id="tab-view-matched-schemes"
          onClick={() => setActiveViewTab('matches')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeViewTab === 'matches'
              ? 'bg-blue-900 text-white shadow-sm'
              : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Matched Schemes ({matches.length})</span>
        </button>

        <button
          type="button"
          id="tab-view-application-tracker"
          onClick={() => setActiveViewTab('tracker')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer relative ${
            activeViewTab === 'tracker'
              ? 'bg-blue-900 text-white shadow-sm'
              : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          <Clock className="w-4 h-4 text-amber-500" />
          <span>Application Status Tracker</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
            {applications.length} Active
          </span>
        </button>
      </div>

      {/* Conditional View: Application Status Tracker */}
      {activeViewTab === 'tracker' ? (
        <ApplicationTracker
          profile={profile}
          matches={matches}
          applications={applications}
          onApplicationsChange={onApplicationsChange}
          onOpenSchemeActionPlan={handleOpenFromTracker}
          onExploreSchemes={() => setActiveViewTab('matches')}
        />
      ) : (
        /* Matched Schemes Discovery View */
        <div className="space-y-6">
          {/* Filter and Search Controls */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {[
                { id: 'all', label: `All Schemes (${matches.length})` },
                { id: 'subsidy', label: 'Subsidies' },
                { id: 'loan', label: 'Loans & Guarantees' },
                { id: 'tender', label: 'Tenders & GeM' },
                { id: 'certification', label: 'Quality & ZED' },
                { id: 'grant', label: 'Grants & Protections' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    selectedCategory === tab.id
                      ? 'bg-blue-900 text-white shadow-xs'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Keyword Search Input */}
            <div className="relative min-w-[220px]">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search matched schemes..."
                className="w-full pl-8 pr-3 py-1.5 text-xs text-slate-900 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-900"
              />
            </div>
          </div>

          {/* Opportunity Cards List */}
          <div className="space-y-4">
            {filteredMatches.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center space-y-3">
                <Filter className="w-8 h-8 text-slate-300 mx-auto" />
                <h3 className="text-sm font-bold text-slate-700">No schemes found for this filter</h3>
                <p className="text-xs text-slate-400">
                  Try selecting "All Schemes" or clearing your search keywords.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 rounded-lg bg-blue-900 text-white text-xs font-bold cursor-pointer inline-block"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              filteredMatches.map((scheme, idx) => {
                const isTracked = applications.some((a) => a.scheme_id === scheme.scheme_id);
                const trackedApp = applications.find((a) => a.scheme_id === scheme.scheme_id);

                return (
                  <div
                    key={scheme.scheme_id || idx}
                    className="bg-white border border-slate-200 hover:border-blue-300 rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-md transition-all space-y-4 group"
                  >
                    {/* Card Top Row */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider border ${getCategoryBadgeClass(
                              scheme.category
                            )}`}
                          >
                            {getCategoryIcon(scheme.category)}
                            <span>{scheme.category}</span>
                          </span>

                          <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                            {scheme.match_score}% Match Fit
                          </span>

                          {isTracked && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-300">
                              <Clock className="w-3 h-3 text-amber-600" />
                              <span>Tracking: {trackedApp?.status}</span>
                            </span>
                          )}

                          <span className="text-[11px] text-slate-500 font-medium">
                            {scheme.state ? `${scheme.state} State Incentive` : 'Central Govt / SIDBI'}
                          </span>
                        </div>

                        <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-blue-900 transition-colors tracking-tight">
                          {scheme.name}
                        </h3>
                      </div>

                      {/* Deadline Badge */}
                      <div className="text-left sm:text-right shrink-0">
                        <span className="text-[11px] font-semibold text-slate-500 block">Status / Window</span>
                        <span className="text-xs font-bold text-slate-800">{scheme.deadline}</span>
                      </div>
                    </div>

                    {/* Financial Value Box */}
                    <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-xl p-3.5 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                          Estimated Financial Value / Benefit
                        </span>
                        <span className="text-xs sm:text-sm font-black text-emerald-950">
                          {scheme.benefit_value}
                        </span>
                      </div>
                      <div className="hidden sm:block text-right">
                        <span className="text-[10px] font-semibold text-emerald-700 block">Nodal Agency</span>
                        <span className="text-xs font-medium text-emerald-900 truncate max-w-[200px] block">
                          {scheme.nodal_agency || 'Ministry of MSME'}
                        </span>
                      </div>
                    </div>

                    {/* Plain-Language Reason */}
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        Why you qualify:
                      </span>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                        {scheme.match_reason}
                      </p>
                    </div>

                    {/* Card Footer Actions */}
                    <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-1 text-[11px] text-slate-500">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>
                          {scheme.action_steps ? `${scheme.action_steps.length} Step Application Roadmap` : 'Action Roadmap Available'}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleQuickTrackScheme(scheme)}
                          className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border ${
                            isTracked
                              ? 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'
                          }`}
                        >
                          <Clock className="w-3.5 h-3.5 text-amber-600" />
                          <span>{isTracked ? 'View in Tracker' : 'Track Application'}</span>
                        </button>

                        <a
                          href={scheme.official_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg text-xs transition-colors cursor-pointer"
                          title="Visit Official Portal"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>

                        <button
                          type="button"
                          onClick={() => onSelectScheme(scheme)}
                          className="px-4 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                        >
                          <span>View Action Plan</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

