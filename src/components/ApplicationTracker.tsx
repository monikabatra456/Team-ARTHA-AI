import React, { useState } from 'react';
import {
  SchemeApplication,
  ApplicationStage,
  BusinessProfile,
  MatchedOpportunity,
  SchemeCategory
} from '../types';
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Building2,
  ExternalLink,
  Plus,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Award,
  BadgePercent,
  Landmark,
  FileCheck,
  Search,
  Filter,
  Check,
  Trash2,
  Edit3,
  Calendar,
  Sparkles,
  Layers,
  HelpCircle,
  Download
} from 'lucide-react';
import { saveApplications } from '../utils/applicationData';

interface ApplicationTrackerProps {
  profile: BusinessProfile;
  matches: MatchedOpportunity[];
  applications: SchemeApplication[];
  onApplicationsChange: (apps: SchemeApplication[]) => void;
  onOpenSchemeActionPlan: (schemeId: string) => void;
  onExploreSchemes: () => void;
}

export const ApplicationTracker: React.FC<ApplicationTrackerProps> = ({
  profile,
  matches,
  applications,
  onApplicationsChange,
  onOpenSchemeActionPlan,
  onExploreSchemes
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [editingAppId, setEditingAppId] = useState<string | null>(null);
  const [customRemarks, setCustomRemarks] = useState<string>('');
  const [customRefNo, setCustomRefNo] = useState<string>('');

  // New Application Form State
  const [newSchemeId, setNewSchemeId] = useState<string>(matches[0]?.scheme_id || '');
  const [newRefNumber, setNewRefNumber] = useState<string>('');
  const [newAppliedAmount, setNewAppliedAmount] = useState<string>('');
  const [newStage, setNewStage] = useState<ApplicationStage>('Drafting');

  // Stats calculation
  const totalApps = applications.length;
  const draftingCount = applications.filter((a) => a.status === 'Drafting').length;
  const submittedCount = applications.filter((a) => a.status === 'Submitted').length;
  const underReviewCount = applications.filter((a) => a.status === 'Under Review').length;
  const approvedCount = applications.filter((a) => a.status === 'Approved' || a.status === 'Disbursed').length;

  const STAGES: ApplicationStage[] = ['Drafting', 'Submitted', 'Under Review', 'Approved'];

  const getStageIndex = (stage: ApplicationStage) => {
    switch (stage) {
      case 'Drafting':
        return 0;
      case 'Submitted':
        return 1;
      case 'Under Review':
        return 2;
      case 'Approved':
      case 'Disbursed':
        return 3;
      default:
        return 0;
    }
  };

  const getStageBadgeStyle = (stage: ApplicationStage) => {
    switch (stage) {
      case 'Drafting':
        return 'bg-amber-50 text-amber-900 border-amber-300';
      case 'Submitted':
        return 'bg-blue-50 text-blue-900 border-blue-300';
      case 'Under Review':
        return 'bg-purple-50 text-purple-900 border-purple-300';
      case 'Approved':
      case 'Disbursed':
        return 'bg-emerald-50 text-emerald-900 border-emerald-300';
      default:
        return 'bg-slate-50 text-slate-900 border-slate-300';
    }
  };

  const getStageIcon = (stage: ApplicationStage) => {
    switch (stage) {
      case 'Drafting':
        return <Edit3 className="w-3.5 h-3.5 text-amber-600" />;
      case 'Submitted':
        return <FileText className="w-3.5 h-3.5 text-blue-600" />;
      case 'Under Review':
        return <Clock className="w-3.5 h-3.5 text-purple-600" />;
      case 'Approved':
      case 'Disbursed':
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />;
    }
  };

  const getCategoryIcon = (category: SchemeCategory) => {
    switch (category) {
      case 'subsidy':
        return <BadgePercent className="w-3.5 h-3.5 text-emerald-600" />;
      case 'loan':
        return <Landmark className="w-3.5 h-3.5 text-blue-600" />;
      case 'tender':
        return <FileCheck className="w-3.5 h-3.5 text-purple-600" />;
      case 'certification':
        return <Award className="w-3.5 h-3.5 text-amber-600" />;
      default:
        return <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />;
    }
  };

  // Filter applications
  const filteredApps = applications.filter((app) => {
    const matchesFilter =
      selectedFilter === 'all'
        ? true
        : selectedFilter === 'Approved'
        ? app.status === 'Approved' || app.status === 'Disbursed'
        : app.status === selectedFilter;

    const matchesSearch =
      app.scheme_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.application_ref_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.nodal_agency.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // Advance application stage
  const handleAdvanceStage = (appId: string) => {
    const updated = applications.map((app) => {
      if (app.id !== appId) return app;
      const currentIdx = getStageIndex(app.status);
      if (currentIdx >= STAGES.length - 1) return app;

      const nextStage = STAGES[currentIdx + 1];
      const today = new Date().toISOString().split('T')[0];

      const newPercent =
        nextStage === 'Submitted' ? 50 : nextStage === 'Under Review' ? 75 : 100;

      const updatedMilestones = app.milestones.map((m) => {
        if (m.stage === nextStage) {
          return { ...m, completed: true, date: today };
        }
        if (getStageIndex(m.stage) <= currentIdx) {
          return { ...m, completed: true };
        }
        return m;
      });

      return {
        ...app,
        status: nextStage,
        progress_percent: newPercent,
        last_updated: today,
        milestones: updatedMilestones,
        current_action_needed:
          nextStage === 'Submitted'
            ? 'Application submitted on portal. Awaiting nodal officer assignment.'
            : nextStage === 'Under Review'
            ? 'Scrutiny in progress. Keep supporting books and premises ready for inspection.'
            : 'Sanction letter issued! Subsidy credited / guarantee active.'
      };
    });

    onApplicationsChange(updated);
    saveApplications(updated);
  };

  // Delete application
  const handleDeleteApplication = (appId: string) => {
    const updated = applications.filter((a) => a.id !== appId);
    onApplicationsChange(updated);
    saveApplications(updated);
  };

  // Save quick edits
  const handleSaveEdit = (appId: string) => {
    const updated = applications.map((app) => {
      if (app.id !== appId) return app;
      return {
        ...app,
        application_ref_number: customRefNo.trim() || app.application_ref_number,
        officer_remarks: customRemarks.trim() || app.officer_remarks,
        last_updated: new Date().toISOString().split('T')[0]
      };
    });

    onApplicationsChange(updated);
    saveApplications(updated);
    setEditingAppId(null);
  };

  // Add new application from matched scheme
  const handleAddNewApplication = (e: React.FormEvent) => {
    e.preventDefault();
    const scheme = matches.find((m) => m.scheme_id === newSchemeId) || matches[0];
    if (!scheme) return;

    const today = new Date().toISOString().split('T')[0];
    const generatedRef =
      newRefNumber.trim() ||
      `${scheme.category.toUpperCase()}/${profile.state.slice(0, 2).toUpperCase()}/2026/${Math.floor(
        10000 + Math.random() * 90000
      )}`;

    const stageIdx = getStageIndex(newStage);
    const newPercent =
      newStage === 'Drafting' ? 25 : newStage === 'Submitted' ? 50 : newStage === 'Under Review' ? 75 : 100;

    const newApp: SchemeApplication = {
      id: `app_${Date.now()}`,
      scheme_id: scheme.scheme_id,
      scheme_name: scheme.name,
      category: scheme.category,
      nodal_agency: scheme.nodal_agency || 'Ministry of MSME',
      benefit_value: scheme.benefit_value,
      applied_subsidy_amount: newAppliedAmount.trim() || scheme.benefit_value,
      status: newStage,
      progress_percent: newPercent,
      application_ref_number: generatedRef,
      created_at: today,
      last_updated: today,
      milestones: [
        {
          stage: 'Drafting',
          label: 'Application & Dossier Formulation',
          completed: stageIdx >= 0,
          date: today,
          note: 'Project profile, Udyam compliance, and financial records compiled.'
        },
        {
          stage: 'Submitted',
          label: 'Portal Submission & Acknowledgement',
          completed: stageIdx >= 1,
          date: stageIdx >= 1 ? today : undefined,
          note: 'Lodged on official portal with registration reference.'
        },
        {
          stage: 'Under Review',
          label: 'Officer Scrutiny & Committee Assessment',
          completed: stageIdx >= 2,
          date: stageIdx >= 2 ? today : undefined,
          note: 'Scrutiny of financial records & physical inspection.'
        },
        {
          stage: 'Approved',
          label: 'Sanction Letter & Disbursal Release',
          completed: stageIdx >= 3,
          date: stageIdx >= 3 ? today : undefined,
          note: 'Sanction letter issued & benefit credited.'
        }
      ],
      current_action_needed:
        newStage === 'Drafting'
          ? 'Complete project report & document checklist before submission.'
          : newStage === 'Submitted'
          ? 'Application lodged. Awaiting verification officer assignment.'
          : newStage === 'Under Review'
          ? 'Inspection & scrutiny in progress by nodal department.'
          : 'Benefit sanctioned & approved.',
      officer_remarks: 'Application tracked in ArthaAI MSME Dashboard.',
      portal_url: scheme.official_url,
      attached_docs_count: 3
    };

    const updated = [newApp, ...applications];
    onApplicationsChange(updated);
    saveApplications(updated);

    // Reset form
    setIsAddModalOpen(false);
    setNewRefNumber('');
    setNewAppliedAmount('');
    setNewStage('Drafting');
  };

  return (
    <div id="applications-tracker-section" className="space-y-6">
      {/* Executive Pipeline Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        {/* Total Tracked */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
            <span>Total Applications</span>
            <Layers className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">{totalApps}</div>
          <p className="text-[11px] text-slate-500 truncate">Across Central & State Schemes</p>
        </div>

        {/* Drafting */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-amber-700 text-xs font-bold uppercase tracking-wider">
            <span>1. Drafting</span>
            <Edit3 className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-950">{draftingCount}</div>
          <p className="text-[11px] text-slate-500 truncate">DPR & Document Prep</p>
        </div>

        {/* Under Review */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-purple-700 text-xs font-bold uppercase tracking-wider">
            <span>2. Under Review</span>
            <Clock className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-purple-950">{underReviewCount}</div>
          <p className="text-[11px] text-slate-500 truncate">Department Scrutiny</p>
        </div>

        {/* Approved */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-emerald-700 text-xs font-bold uppercase tracking-wider">
            <span>3. Approved</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-950">{approvedCount}</div>
          <p className="text-[11px] text-slate-500 truncate">Sanction Letters Issued</p>
        </div>
      </div>

      {/* Control Bar: Filters & Actions */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Stage Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {[
            { id: 'all', label: `All (${totalApps})` },
            { id: 'Drafting', label: `Drafting (${draftingCount})` },
            { id: 'Under Review', label: `Under Review (${underReviewCount})` },
            { id: 'Approved', label: `Approved (${approvedCount})` }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedFilter === tab.id
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search & Track New Application CTA */}
        <div className="flex items-center gap-2.5">
          <div className="relative flex-1 sm:w-56">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reference or scheme..."
              className="w-full pl-8 pr-3 py-1.5 text-xs text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-900"
            />
          </div>

          <button
            type="button"
            id="btn-track-new-application"
            onClick={() => setIsAddModalOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Track Application</span>
          </button>
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApps.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center space-y-3">
            <Clock className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-sm font-bold text-slate-800">No applications in this view</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              You don't have any applications matching this filter. You can track a new application from your matched schemes or start drafting now.
            </p>
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedFilter('all')}
                className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
              >
                Clear Filter
              </button>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="px-3.5 py-1.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold cursor-pointer"
              >
                Track a Scheme
              </button>
            </div>
          </div>
        ) : (
          filteredApps.map((app) => {
            const currentStageIdx = getStageIndex(app.status);
            const isEditing = editingAppId === app.id;

            return (
              <div
                key={app.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-md transition-all space-y-5"
              >
                {/* Card Header: Scheme Name, Category, Status, & Reference */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-100 pb-4">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-800 border border-slate-200">
                        {getCategoryIcon(app.category)}
                        <span>{app.category}</span>
                      </span>

                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStageBadgeStyle(
                          app.status
                        )}`}
                      >
                        {getStageIcon(app.status)}
                        <span>{app.status}</span>
                      </span>

                      <span className="text-[11px] text-slate-500 font-mono bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                        Ref: {app.application_ref_number}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                      {app.scheme_name}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Nodal Agency: <strong className="text-slate-700">{app.nodal_agency}</strong> • Applied Value: <strong className="text-emerald-700">{app.applied_subsidy_amount || app.benefit_value}</strong>
                    </p>
                  </div>

                  {/* Actions & Timestamps */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                    <div className="text-left sm:text-right text-[11px] text-slate-400">
                      <span>Updated: </span>
                      <strong className="text-slate-600">{app.last_updated}</strong>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <a
                        href={app.portal_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-slate-400 hover:text-blue-700 hover:bg-slate-100 rounded-lg transition-colors"
                        title="Visit Official Portal"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>

                      <button
                        type="button"
                        onClick={() => {
                          if (isEditing) {
                            setEditingAppId(null);
                          } else {
                            setEditingAppId(app.id);
                            setCustomRefNo(app.application_ref_number);
                            setCustomRemarks(app.officer_remarks || '');
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                        title="Edit Details"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteApplication(app.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete from Tracker"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Multi-Step Pipeline Stepper (Drafting -> Submitted -> Under Review -> Approved) */}
                <div className="space-y-3 bg-slate-50/70 border border-slate-200/80 rounded-xl p-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                      Application Lifecycle Progress
                    </span>
                    <span className="font-extrabold text-blue-900 text-xs">
                      {app.progress_percent}% Complete
                    </span>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 rounded-full ${
                        app.status === 'Approved' || app.status === 'Disbursed'
                          ? 'bg-emerald-500'
                          : app.status === 'Under Review'
                          ? 'bg-purple-600'
                          : app.status === 'Submitted'
                          ? 'bg-blue-600'
                          : 'bg-amber-500'
                      }`}
                      style={{ width: `${app.progress_percent}%` }}
                    />
                  </div>

                  {/* 4-Stage Stepper Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                    {STAGES.map((stageName, idx) => {
                      const isPast = idx < currentStageIdx;
                      const isCurrent = idx === currentStageIdx;
                      const isFuture = idx > currentStageIdx;
                      const milestone = app.milestones.find((m) => m.stage === stageName);

                      return (
                        <div
                          key={stageName}
                          className={`p-2.5 rounded-xl border text-xs transition-all ${
                            isCurrent
                              ? 'bg-white border-blue-400 shadow-xs ring-1 ring-blue-400/30'
                              : isPast
                              ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                              : 'bg-slate-100/60 border-slate-200 text-slate-400'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider">
                              Step {idx + 1}
                            </span>
                            {isPast ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            ) : isCurrent ? (
                              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse shrink-0" />
                            ) : (
                              <span className="w-2 h-2 rounded-full bg-slate-300 shrink-0" />
                            )}
                          </div>

                          <div className={`font-bold text-xs ${isCurrent ? 'text-blue-950' : ''}`}>
                            {stageName}
                          </div>

                          {milestone?.date && (
                            <span className="text-[10px] text-slate-500 block mt-0.5">
                              {milestone.date}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Milestone Details & Next Action */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {/* Current Action / Status Box */}
                  <div className="bg-blue-50/60 border border-blue-200/70 rounded-xl p-3.5 space-y-1">
                    <div className="flex items-center gap-1.5 text-blue-900 font-bold text-xs">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      <span>Current Milestone & Status</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed">
                      {app.current_action_needed || 'Application progressing on schedule through nodal portal.'}
                    </p>
                  </div>

                  {/* Officer / Audit Remarks */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1">
                    <div className="flex items-center gap-1.5 text-slate-700 font-bold text-xs">
                      <Building2 className="w-3.5 h-3.5 text-slate-500" />
                      <span>Nodal Department Notes</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed font-mono text-[11px]">
                      {app.officer_remarks || 'Inspection and verification dossier linked.'}
                    </p>
                  </div>
                </div>

                {/* Inline Edit Form if toggled */}
                {isEditing && (
                  <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 space-y-3 animate-in fade-in">
                    <span className="text-xs font-bold text-amber-950 block">
                      Edit Application Reference & Notes
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                          Acknowledgment / Reference No.
                        </label>
                        <input
                          type="text"
                          value={customRefNo}
                          onChange={(e) => setCustomRefNo(e.target.value)}
                          className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                          Officer / Internal Remarks
                        </label>
                        <input
                          type="text"
                          value={customRemarks}
                          onChange={(e) => setCustomRemarks(e.target.value)}
                          className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setEditingAppId(null)}
                        className="px-3 py-1 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-semibold cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSaveEdit(app.id)}
                        className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold cursor-pointer"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                )}

                {/* Action Bar: Advance Stage, View Roadmap */}
                <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{app.attached_docs_count || 3} Compliance Documents Attached</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onOpenSchemeActionPlan(app.scheme_id)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>View Full Roadmap</span>
                    </button>

                    {currentStageIdx < STAGES.length - 1 ? (
                      <button
                        type="button"
                        onClick={() => handleAdvanceStage(app.id)}
                        className="px-3.5 py-1.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                      >
                        <span>Move to {STAGES[currentStageIdx + 1]}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <span className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-900 text-xs font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Sanction Completed</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add New Application Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden text-slate-900">
            <div className="p-5 bg-blue-950 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-700 flex items-center justify-center">
                  <Plus className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-base font-bold">Track Scheme Application</h3>
                  <p className="text-xs text-blue-200">Monitor status through government approval pipeline</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-blue-300 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddNewApplication} className="p-5 space-y-4 text-xs">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Select Matched Scheme *
                </label>
                <select
                  value={newSchemeId}
                  onChange={(e) => setNewSchemeId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:ring-1 focus:ring-blue-900"
                  required
                >
                  {matches.map((m) => (
                    <option key={m.scheme_id} value={m.scheme_id}>
                      [{m.category.toUpperCase()}] {m.name} ({m.benefit_value})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Initial Tracking Stage *
                  </label>
                  <select
                    value={newStage}
                    onChange={(e) => setNewStage(e.target.value as ApplicationStage)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:ring-1 focus:ring-blue-900"
                  >
                    <option value="Drafting">1. Drafting (DPR & Dossier)</option>
                    <option value="Submitted">2. Submitted (Portal Ref Issued)</option>
                    <option value="Under Review">3. Under Review (Department Inspection)</option>
                    <option value="Approved">4. Approved (Sanction Issued)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Application Ref / Ack No.
                  </label>
                  <input
                    type="text"
                    value={newRefNumber}
                    onChange={(e) => setNewRefNumber(e.target.value)}
                    placeholder="e.g. KVIC/PMEGP/2026/8940"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Applied Subsidy / Loan Amount
                </label>
                <input
                  type="text"
                  value={newAppliedAmount}
                  onChange={(e) => setNewAppliedAmount(e.target.value)}
                  placeholder="e.g. ₹25 Lakhs (35% Subsidy)"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold cursor-pointer"
                >
                  Add to Active Tracker
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
