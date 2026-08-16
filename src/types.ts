export type SchemeCategory = 'subsidy' | 'tender' | 'loan' | 'certification' | 'grant';

export interface BusinessProfile {
  name: string;
  industry: string;
  state: string;
  city: string;
  udyam_registered: boolean;
  udyam_number?: string;
  turnover_band: string;
  employee_count: string;
  gst_registered: boolean;
  gstin?: string;
}

export interface SchemeSeedData {
  id: string;
  name: string;
  category: SchemeCategory;
  description: string;
  eligibility_criteria: string;
  benefit_value: string;
  deadline: string;
  official_url: string;
  state: string | null; // null = National scheme
  allowed_industries: string[]; // ["all"] or list of specific industries
  min_turnover_lakhs?: number;
  max_turnover_lakhs?: number;
  requires_udyam?: boolean;
  requires_gst?: boolean;
  default_documents: string[];
  nodal_agency: string;
  priority_weight?: number;
}

export interface MatchedOpportunity {
  scheme_id: string;
  name: string;
  category: SchemeCategory;
  benefit_value: string;
  deadline: string;
  official_url: string;
  state: string | null;
  match_score: number;
  match_reason: string;
  action_steps: string[];
  required_documents: string[];
  nodal_agency: string;
  description?: string;
  eligibility_criteria?: string;
}

export interface MatchResponse {
  business_profile: BusinessProfile;
  matches: MatchedOpportunity[];
  scanned_schemes_count: number;
  candidate_count: number;
  evaluated_at: string;
  summary?: string;
}

export interface PresetProfile {
  label: string;
  tag: string;
  profile: BusinessProfile;
}

export interface UploadedDocument {
  id: string;
  name: string;
  size: number;
  docType: 'udyam' | 'gst' | 'itr_financials' | 'machinery_dpr' | 'other';
  textContent?: string;
  uploadedAt: string;
}

export interface DocumentAnalysisResult {
  overall_status: 'verified' | 'needs_attention' | 'ready';
  readiness_score: number;
  verified_points: string[];
  attention_points: string[];
  extracted_entities: {
    udyam_found?: string;
    gstin_found?: string;
    enterprise_name_match?: boolean;
    state_alignment?: boolean;
  };
  summary: string;
}

export type ApplicationStage = 'Drafting' | 'Submitted' | 'Under Review' | 'Approved' | 'Disbursed';

export interface ApplicationMilestone {
  stage: ApplicationStage;
  label: string;
  completed: boolean;
  date?: string;
  note?: string;
}

export interface SchemeApplication {
  id: string;
  scheme_id: string;
  scheme_name: string;
  category: SchemeCategory;
  nodal_agency: string;
  benefit_value: string;
  applied_subsidy_amount?: string;
  status: ApplicationStage;
  progress_percent: number;
  application_ref_number: string;
  created_at: string;
  last_updated: string;
  target_decision_date?: string;
  milestones: ApplicationMilestone[];
  current_action_needed?: string;
  officer_remarks?: string;
  portal_url: string;
  attached_docs_count: number;
}


