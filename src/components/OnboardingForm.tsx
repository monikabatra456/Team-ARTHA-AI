import React, { useState, useRef } from 'react';
import { BusinessProfile, UploadedDocument } from '../types';
import {
  INDIAN_STATES,
  INDUSTRIES,
  TURNOVER_BANDS,
  EMPLOYEE_COUNTS,
  PRESET_PROFILES
} from '../data/schemes';
import {
  Building2,
  Layers,
  MapPin,
  IndianRupee,
  Users,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Shield,
  FileCheck2,
  Hash,
  Upload,
  FileUp,
  Trash2,
  Loader2,
  FileCheck,
  Image as ImageIcon,
  CheckCircle,
  AlertCircle,
  Check
} from 'lucide-react';

interface OnboardingFormProps {
  profile: BusinessProfile;
  onChange: (field: keyof BusinessProfile, value: any) => void;
  onApplyPreset: (index: number) => void;
  onSubmit: (e: React.FormEvent) => void;
  documents?: UploadedDocument[];
  onDocumentsChange?: (docs: UploadedDocument[]) => void;
}

export const OnboardingForm: React.FC<OnboardingFormProps> = ({
  profile,
  onChange,
  onApplyPreset,
  onSubmit,
  documents = [],
  onDocumentsChange
}) => {
  const [uploadingDocType, setUploadingDocType] = useState<'udyam' | 'gst' | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDraggingUdyam, setIsDraggingUdyam] = useState(false);
  const [isDraggingGst, setIsDraggingGst] = useState(false);

  const udyamInputRef = useRef<HTMLInputElement>(null);
  const gstInputRef = useRef<HTMLInputElement>(null);

  const udyamDoc = documents.find((d) => d.docType === 'udyam');
  const gstDoc = documents.find((d) => d.docType === 'gst');

  const processFileSelection = (file: File, type: 'udyam' | 'gst') => {
    setUploadError(null);
    setUploadingDocType(type);

    const isValidType =
      file.type === 'application/pdf' ||
      file.type.startsWith('image/') ||
      file.name.match(/\.(pdf|png|jpg|jpeg|webp)$/i);

    if (!isValidType) {
      setUploadError(
        `Please upload a valid PDF or image file (.pdf, .png, .jpg, .jpeg) for ${
          type === 'udyam' ? 'Udyam Registration' : 'GST Certificate'
        }.`
      );
      setUploadingDocType(null);
      return;
    }

    setTimeout(() => {
      const newDoc: UploadedDocument = {
        id: `doc_${type}_${Date.now()}`,
        name: file.name,
        size: file.size,
        docType: type,
        uploadedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        textContent: `Verified ${file.name} for enterprise ${profile.name} (${profile.state})`
      };

      const updatedDocs = [...documents.filter((d) => d.docType !== type), newDoc];
      if (onDocumentsChange) {
        onDocumentsChange(updatedDocs);
      }

      // Auto-update profile flags if not already checked
      if (type === 'udyam' && !profile.udyam_registered) {
        onChange('udyam_registered', true);
      }
      if (type === 'gst' && !profile.gst_registered) {
        onChange('gst_registered', true);
      }

      setUploadingDocType(null);
    }, 450);
  };

  const handleUdyamChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFileSelection(file, 'udyam');
    }
    if (udyamInputRef.current) udyamInputRef.current.value = '';
  };

  const handleGstChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFileSelection(file, 'gst');
    }
    if (gstInputRef.current) gstInputRef.current.value = '';
  };

  const handleAddSampleDoc = (type: 'udyam' | 'gst') => {
    setUploadError(null);
    setUploadingDocType(type);

    setTimeout(() => {
      let sampleDoc: UploadedDocument;
      if (type === 'udyam') {
        sampleDoc = {
          id: `sample_udyam_${Date.now()}`,
          name: `Udyam_Registration_${profile.udyam_number || 'UDYAM-DL-01-0048291'}.pdf`,
          size: 248000,
          docType: 'udyam',
          uploadedAt: 'Just now',
          textContent: `Ministry of MSME Government of India - Udyam Registration Certificate for ${profile.name}, URN: ${
            profile.udyam_number || 'UDYAM-DL-01-0048291'
          }, Category: Micro/Small, State: ${profile.state}`
        };
        if (!profile.udyam_registered) onChange('udyam_registered', true);
      } else {
        sampleDoc = {
          id: `sample_gst_${Date.now()}`,
          name: `GST_REG06_Certificate_${profile.gstin || '07AABCA1234F1Z5'}.pdf`,
          size: 195000,
          docType: 'gst',
          uploadedAt: 'Just now',
          textContent: `Form GST REG-06 Registration Certificate, GSTIN: ${
            profile.gstin || '07AABCA1234F1Z5'
          }, Legal Name: ${profile.name}, Jurisdiction: ${profile.state}`
        };
        if (!profile.gst_registered) onChange('gst_registered', true);
      }

      const updatedDocs = [...documents.filter((d) => d.docType !== type), sampleDoc];
      if (onDocumentsChange) {
        onDocumentsChange(updatedDocs);
      }
      setUploadingDocType(null);
    }, 350);
  };

  const handleRemoveDoc = (type: 'udyam' | 'gst') => {
    const updatedDocs = documents.filter((d) => d.docType !== type);
    if (onDocumentsChange) {
      onDocumentsChange(updatedDocs);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const isImageFile = (filename: string) => {
    return /\.(png|jpg|jpeg|webp)$/i.test(filename);
  };

  return (
    <div id="onboarding-container" className="max-w-4xl mx-auto space-y-6">
      {/* Hero Intro Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800 text-blue-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>AI-Powered MSME Scheme Discovery & Compliance Engine</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Discover Government Schemes, Subsidies & Tenders You Qualify For
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Enter your business profile and attach government certificates below. Our matching engine performs hard eligibility filtering across Central & State schemes, then deploys an AI Officer to formulate qualification reasons, action steps, and compliance verification.
          </p>

          {/* 1-Click Demo Profiles */}
          <div className="pt-3 border-t border-slate-800/80">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              ⚡ Quick Demo: Try a pre-configured Indian MSME profile:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {PRESET_PROFILES.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onApplyPreset(idx)}
                  className="p-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/90 border border-slate-700 hover:border-blue-400/50 text-left transition-all cursor-pointer group"
                >
                  <div className="text-xs font-bold text-white group-hover:text-blue-300 truncate">
                    {preset.label}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate mt-0.5">
                    {preset.tag}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Profile Form */}
      <form onSubmit={onSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-900" />
            <span>Business Profile & Operational Details</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Fill in your enterprise parameters and attach your Udyam & GST certificates to evaluate qualification against active Central and State schemes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* 1. Business Name */}
          <div className="md:col-span-2">
            <label htmlFor="input-business-name" className="block text-xs font-bold text-slate-800 mb-1.5">
              1. Business / Enterprise Legal Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                id="input-business-name"
                type="text"
                required
                value={profile.name}
                onChange={(e) => onChange('name', e.target.value)}
                placeholder="e.g. Apex Precision Tools Pvt. Ltd."
                className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white transition-all font-medium"
              />
            </div>
          </div>

          {/* 2. Industry / Sector */}
          <div className="md:col-span-2">
            <label htmlFor="input-industry" className="block text-xs font-bold text-slate-800 mb-1.5">
              2. Industry / Sector <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Layers className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
              <select
                id="input-industry"
                required
                value={profile.industry}
                onChange={(e) => onChange('industry', e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white transition-all appearance-none cursor-pointer font-medium"
              >
                {INDUSTRIES.map((ind) => (
                  <option key={ind} value={ind}>
                    {ind}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 3. State */}
          <div>
            <label htmlFor="input-state" className="block text-xs font-bold text-slate-800 mb-1.5">
              3. Operational State <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
              <select
                id="input-state"
                required
                value={profile.state}
                onChange={(e) => onChange('state', e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white transition-all appearance-none cursor-pointer font-medium"
              >
                {INDIAN_STATES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Used to evaluate state-specific industrial capital incentives.</p>
          </div>

          {/* 4. City */}
          <div>
            <label htmlFor="input-city" className="block text-xs font-bold text-slate-800 mb-1.5">
              4. City / Industrial Cluster <span className="text-rose-500">*</span>
            </label>
            <input
              id="input-city"
              type="text"
              required
              value={profile.city}
              onChange={(e) => onChange('city', e.target.value)}
              placeholder="e.g. New Delhi / Pune / Surat / Bengaluru"
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white transition-all font-medium"
            />
            <p className="text-[11px] text-slate-400 mt-1">Identifies local cluster & industrial zone preferences.</p>
          </div>

          {/* 5. Annual Turnover Band */}
          <div>
            <label htmlFor="input-turnover" className="block text-xs font-bold text-slate-800 mb-1.5">
              5. Annual Turnover Range <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <IndianRupee className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
              <select
                id="input-turnover"
                required
                value={profile.turnover_band}
                onChange={(e) => onChange('turnover_band', e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white transition-all appearance-none cursor-pointer font-medium"
              >
                {TURNOVER_BANDS.map((tb) => (
                  <option key={tb} value={tb}>
                    {tb}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Determines Micro (&le;₹5Cr), Small (&le;₹50Cr), or Medium classification.</p>
          </div>

          {/* 6. Employee Count */}
          <div>
            <label htmlFor="input-employees" className="block text-xs font-bold text-slate-800 mb-1.5">
              6. Employee Count <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Users className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
              <select
                id="input-employees"
                required
                value={profile.employee_count}
                onChange={(e) => onChange('employee_count', e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white transition-all appearance-none cursor-pointer font-medium"
              >
                {EMPLOYEE_COUNTS.map((ec) => (
                  <option key={ec} value={ec}>
                    {ec}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Used for employment-linked capital subsidy calculations.</p>
          </div>

          {/* 7. Udyam Registration (Yes / No) */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-xs font-bold text-slate-900">
                  7. Udyam Registered? <span className="text-rose-500">*</span>
                </label>
                <span className="text-[11px] text-slate-500">Government MSME registration certificate</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onChange('udyam_registered', true)}
                  className={`px-3 py-1 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                    profile.udyam_registered
                      ? 'bg-blue-900 text-white border-blue-900'
                      : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => onChange('udyam_registered', false)}
                  className={`px-3 py-1 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                    !profile.udyam_registered
                      ? 'bg-blue-900 text-white border-blue-900'
                      : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  No
                </button>
              </div>
            </div>

            {profile.udyam_registered && (
              <div className="pt-2 border-t border-slate-200/60">
                <label htmlFor="input-udyam-number" className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Udyam Registration Number (URN - Optional)
                </label>
                <div className="relative">
                  <Hash className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    id="input-udyam-number"
                    type="text"
                    value={profile.udyam_number || ''}
                    onChange={(e) => onChange('udyam_number', e.target.value)}
                    placeholder="e.g. UDYAM-DL-08-0049218"
                    className="w-full pl-8 pr-3 py-1.5 text-xs text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-900 font-mono"
                  />
                </div>
              </div>
            )}
          </div>

          {/* 8. GST Registered (Yes / No) */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-xs font-bold text-slate-900">
                  8. GST Registered? <span className="text-rose-500">*</span>
                </label>
                <span className="text-[11px] text-slate-500">Goods and Services Tax active number</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onChange('gst_registered', true)}
                  className={`px-3 py-1 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                    profile.gst_registered
                      ? 'bg-blue-900 text-white border-blue-900'
                      : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => onChange('gst_registered', false)}
                  className={`px-3 py-1 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                    !profile.gst_registered
                      ? 'bg-blue-900 text-white border-blue-900'
                      : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  No
                </button>
              </div>
            </div>

            {profile.gst_registered && (
              <div className="pt-2 border-t border-slate-200/60">
                <label htmlFor="input-gstin" className="block text-[11px] font-semibold text-slate-700 mb-1">
                  GSTIN (Optional)
                </label>
                <div className="relative">
                  <FileCheck2 className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    id="input-gstin"
                    type="text"
                    value={profile.gstin || ''}
                    onChange={(e) => onChange('gstin', e.target.value)}
                    placeholder="e.g. 07AABCA1234F1Z8"
                    className="w-full pl-8 pr-3 py-1.5 text-xs text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-900 font-mono"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 9. DEDICATED DOCUMENT UPLOAD BLOCK: Udyam Registration & GST Certificate Dropzones */}
        <div
          id="section-onboarding-doc-uploads"
          className="border-2 border-blue-100 bg-slate-50/70 rounded-2xl p-5 space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-blue-900 text-white flex items-center justify-center shrink-0">
                <FileUp className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span>9. Ministry & Tax Documents (Udyam & GST Uploads)</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Upload PDF or image files for Udyam Registration and GST Certificate for enhanced AI eligibility verification.
                </p>
              </div>
            </div>
            <span className="self-start sm:self-auto px-2.5 py-0.5 bg-blue-100 text-blue-900 text-[11px] font-bold rounded-md">
              AI Verification Vault
            </span>
          </div>

          {/* Error Message if any */}
          {uploadError && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
              <span>{uploadError}</span>
            </div>
          )}

          {/* 2 Dropzone Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card 1: Udyam Registration Dropzone */}
            <div
              id="dropzone-udyam-onboarding"
              className={`bg-white rounded-xl border-2 transition-all p-4 flex flex-col justify-between space-y-3 ${
                isDraggingUdyam
                  ? 'border-blue-500 bg-blue-50/50 ring-2 ring-blue-200'
                  : udyamDoc
                  ? 'border-emerald-200 shadow-2xs'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDraggingUdyam(true);
              }}
              onDragLeave={() => setIsDraggingUdyam(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDraggingUdyam(false);
                const file = e.dataTransfer.files?.[0];
                if (file) processFileSelection(file, 'udyam');
              }}
            >
              {/* Header & Visual Status Indicator */}
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">🏢</span>
                    <h4 className="text-xs font-bold text-slate-900">
                      Udyam Registration
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Ministry of MSME Certificate
                  </p>
                </div>

                {/* Upload Status Indicator: Pending | Uploading | Verified */}
                <div id="status-indicator-udyam-onboarding">
                  {uploadingDocType === 'udyam' ? (
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 animate-pulse">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      <span>Uploading</span>
                    </span>
                  ) : udyamDoc ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                      <CheckCircle className="w-3 h-3 text-emerald-600" />
                      <span>Verified</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      <span>Pending</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Dropzone Area or Uploaded Preview */}
              {udyamDoc ? (
                <div className="bg-emerald-50/50 border border-emerald-200 rounded-lg p-3 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                        {isImageFile(udyamDoc.name) ? (
                          <ImageIcon className="w-4 h-4" />
                        ) : (
                          <FileCheck className="w-4 h-4" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-900 truncate" title={udyamDoc.name}>
                          {udyamDoc.name}
                        </p>
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                          <span className="font-semibold text-emerald-800 uppercase">
                            {isImageFile(udyamDoc.name) ? 'IMAGE' : 'PDF'}
                          </span>
                          <span>•</span>
                          <span>{formatFileSize(udyamDoc.size)}</span>
                          <span>•</span>
                          <span>{udyamDoc.uploadedAt}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveDoc('udyam')}
                      className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer shrink-0"
                      title="Remove file"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-emerald-200/60 text-[11px]">
                    <span className="text-emerald-900 font-medium flex items-center gap-1">
                      <Check className="w-3 h-3 text-emerald-600" />
                      Attached for AI matching
                    </span>
                    <button
                      type="button"
                      onClick={() => udyamInputRef.current?.click()}
                      className="text-blue-900 hover:underline font-semibold cursor-pointer"
                    >
                      Replace
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => udyamInputRef.current?.click()}
                  className="border border-dashed border-slate-300 hover:border-blue-500 bg-white hover:bg-blue-50/30 rounded-lg p-4 text-center cursor-pointer transition-colors group"
                >
                  <div className="flex flex-col items-center justify-center space-y-1.5">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Upload className="w-4 h-4" />
                    </div>
                    <p className="text-xs font-bold text-slate-800">
                      Drop Udyam Certificate here or Browse
                    </p>
                    <p className="text-[10px] text-slate-400">
                      PDF, PNG, JPG, JPEG (Max 10MB)
                    </p>
                  </div>
                </div>
              )}

              {/* Hidden File Input & Quick Sample Preset */}
              <input
                type="file"
                ref={udyamInputRef}
                onChange={handleUdyamChange}
                accept=".pdf,.png,.jpg,.jpeg,.webp"
                className="hidden"
              />

              {!udyamDoc && (
                <div className="flex items-center justify-between pt-1 text-[11px]">
                  <span className="text-slate-400">No document attached</span>
                  <button
                    type="button"
                    onClick={() => handleAddSampleDoc('udyam')}
                    className="text-blue-900 hover:text-blue-700 font-bold hover:underline cursor-pointer"
                  >
                    + Load Verified Sample Udyam
                  </button>
                </div>
              )}
            </div>

            {/* Card 2: GST Certificate Dropzone */}
            <div
              id="dropzone-gst-onboarding"
              className={`bg-white rounded-xl border-2 transition-all p-4 flex flex-col justify-between space-y-3 ${
                isDraggingGst
                  ? 'border-blue-500 bg-blue-50/50 ring-2 ring-blue-200'
                  : gstDoc
                  ? 'border-emerald-200 shadow-2xs'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDraggingGst(true);
              }}
              onDragLeave={() => setIsDraggingGst(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDraggingGst(false);
                const file = e.dataTransfer.files?.[0];
                if (file) processFileSelection(file, 'gst');
              }}
            >
              {/* Header & Visual Status Indicator */}
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">📜</span>
                    <h4 className="text-xs font-bold text-slate-900">
                      GST Certificate
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    REG-06 / GSTR-3B Filing Return
                  </p>
                </div>

                {/* Upload Status Indicator: Pending | Uploading | Verified */}
                <div id="status-indicator-gst-onboarding">
                  {uploadingDocType === 'gst' ? (
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 animate-pulse">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      <span>Uploading</span>
                    </span>
                  ) : gstDoc ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                      <CheckCircle className="w-3 h-3 text-emerald-600" />
                      <span>Verified</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      <span>Pending</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Dropzone Area or Uploaded Preview */}
              {gstDoc ? (
                <div className="bg-emerald-50/50 border border-emerald-200 rounded-lg p-3 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                        {isImageFile(gstDoc.name) ? (
                          <ImageIcon className="w-4 h-4" />
                        ) : (
                          <FileCheck className="w-4 h-4" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-900 truncate" title={gstDoc.name}>
                          {gstDoc.name}
                        </p>
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                          <span className="font-semibold text-emerald-800 uppercase">
                            {isImageFile(gstDoc.name) ? 'IMAGE' : 'PDF'}
                          </span>
                          <span>•</span>
                          <span>{formatFileSize(gstDoc.size)}</span>
                          <span>•</span>
                          <span>{gstDoc.uploadedAt}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveDoc('gst')}
                      className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer shrink-0"
                      title="Remove file"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-emerald-200/60 text-[11px]">
                    <span className="text-emerald-900 font-medium flex items-center gap-1">
                      <Check className="w-3 h-3 text-emerald-600" />
                      Attached for AI matching
                    </span>
                    <button
                      type="button"
                      onClick={() => gstInputRef.current?.click()}
                      className="text-blue-900 hover:underline font-semibold cursor-pointer"
                    >
                      Replace
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => gstInputRef.current?.click()}
                  className="border border-dashed border-slate-300 hover:border-blue-500 bg-white hover:bg-blue-50/30 rounded-lg p-4 text-center cursor-pointer transition-colors group"
                >
                  <div className="flex flex-col items-center justify-center space-y-1.5">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Upload className="w-4 h-4" />
                    </div>
                    <p className="text-xs font-bold text-slate-800">
                      Drop GST Certificate here or Browse
                    </p>
                    <p className="text-[10px] text-slate-400">
                      PDF, PNG, JPG, JPEG (Max 10MB)
                    </p>
                  </div>
                </div>
              )}

              {/* Hidden File Input & Quick Sample Preset */}
              <input
                type="file"
                ref={gstInputRef}
                onChange={handleGstChange}
                accept=".pdf,.png,.jpg,.jpeg,.webp"
                className="hidden"
              />

              {!gstDoc && (
                <div className="flex items-center justify-between pt-1 text-[11px]">
                  <span className="text-slate-400">No document attached</span>
                  <button
                    type="button"
                    onClick={() => handleAddSampleDoc('gst')}
                    className="text-blue-900 hover:text-blue-700 font-bold hover:underline cursor-pointer"
                  >
                    + Load Verified Sample GST
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-slate-100">
          <button
            id="analyze-schemes-submit-btn"
            type="submit"
            className="w-full py-4 px-6 bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all duration-150 cursor-pointer active:scale-[0.99]"
          >
            <Sparkles className="w-5 h-5 text-blue-300" />
            <span>Discover Matched Government Schemes & Action Plans</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-center text-[11px] text-slate-400 mt-2.5">
            Evaluates collateral-free loans (CGTMSE), state capital modernization grants, 25% GeM public procurement tenders, and ZED quality subsidies.
          </p>
        </div>
      </form>
    </div>
  );
};
