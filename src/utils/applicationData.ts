import { BusinessProfile, SchemeApplication, MatchedOpportunity } from '../types';

export const APPLICATIONS_STORAGE_KEY = 'arthai_msme_applications_v1';

export function getInitialApplications(profile: BusinessProfile, matches: MatchedOpportunity[]): SchemeApplication[] {
  const currentDate = new Date();
  const dateStr = (daysAgo: number) => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() - daysAgo);
    return d.toISOString().split('T')[0];
  };

  const futureDateStr = (daysAhead: number) => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() + daysAhead);
    return d.toISOString().split('T')[0];
  };

  // Find matching scheme or fallback to standard central schemes
  const subsidyMatch = matches.find((m) => m.category === 'subsidy') || matches[0];
  const loanMatch = matches.find((m) => m.category === 'loan') || matches[1] || matches[0];
  const tenderMatch = matches.find((m) => m.category === 'tender' || m.category === 'certification') || matches[2] || matches[0];

  const apps: SchemeApplication[] = [
    {
      id: 'app_pmegp_01',
      scheme_id: subsidyMatch?.scheme_id || 'pmegp_subsidy',
      scheme_name: subsidyMatch?.name || 'PMEGP Capital Subsidy & Project Assistance',
      category: 'subsidy',
      nodal_agency: subsidyMatch?.nodal_agency || 'KVIC / Ministry of MSME',
      benefit_value: subsidyMatch?.benefit_value || 'Up to 35% Subsidy (₹50 Lakhs Max)',
      applied_subsidy_amount: '₹8.75 Lakhs Subsidy (on ₹25 Lakhs Project)',
      status: 'Under Review',
      progress_percent: 65,
      application_ref_number: `KVIC/PMEGP/${profile.state.slice(0, 2).toUpperCase()}/2026/89421`,
      created_at: dateStr(18),
      last_updated: dateStr(2),
      target_decision_date: futureDateStr(14),
      milestones: [
        {
          stage: 'Drafting',
          label: 'DPR & Document Dossier Prepared',
          completed: true,
          date: dateStr(18),
          note: 'Project report, Udyam registration, and machinery quotations compiled.'
        },
        {
          stage: 'Submitted',
          label: 'Online Submission on PMEGP e-Portal',
          completed: true,
          date: dateStr(14),
          note: 'Acknowledgement receipt received and assigned to District Task Force Committee.'
        },
        {
          stage: 'Under Review',
          label: 'Field Inspection & Bank Appraisal',
          completed: false,
          date: dateStr(2),
          note: 'Physical inspection completed by nodal officer. Awaiting final DLTFC approval meeting.'
        },
        {
          stage: 'Approved',
          label: 'Sanction Letter & Subsidy Margin Disbursal',
          completed: false,
          note: 'Bank sanction letter & margin money transfer to lock-in TDR account.'
        }
      ],
      current_action_needed: 'DLTFC Committee review scheduled for next week. Keep Original Land/Rent Deed ready.',
      officer_remarks: 'Site verified by KVIC field officer. Technical viability score: 88/100.',
      portal_url: 'https://www.kviconline.gov.in/pmegp/',
      attached_docs_count: 4
    },
    {
      id: 'app_cgtmse_02',
      scheme_id: loanMatch?.scheme_id || 'cgtmse_loan',
      scheme_name: loanMatch?.name || 'CGTMSE Collateral-Free Credit Guarantee Scheme',
      category: 'loan',
      nodal_agency: loanMatch?.nodal_agency || 'SIDBI & Ministry of MSME',
      benefit_value: loanMatch?.benefit_value || '100% Collateral-Free Cover up to ₹5 Cr',
      applied_subsidy_amount: '₹75 Lakhs Working Capital + Term Loan',
      status: 'Approved',
      progress_percent: 100,
      application_ref_number: `CGTMSE/SIDBI/${profile.city.slice(0, 3).toUpperCase()}-44120`,
      created_at: dateStr(35),
      last_updated: dateStr(4),
      target_decision_date: dateStr(4),
      milestones: [
        {
          stage: 'Drafting',
          label: 'Credit Appraisal & Scoring Checklist',
          completed: true,
          date: dateStr(35),
          note: 'Financial statements, GST returns, and credit score verified.'
        },
        {
          stage: 'Submitted',
          label: 'Lodged via Member Lending Institution (MLI)',
          completed: true,
          date: dateStr(28),
          note: 'Application uploaded to CGTMSE digital platform by partner bank.'
        },
        {
          stage: 'Under Review',
          label: 'Risk Scrutiny & Guarantee Eligibility',
          completed: true,
          date: dateStr(12),
          note: 'Credit guarantee cover approved with standard 0.37% annual guarantee fee.'
        },
        {
          stage: 'Approved',
          label: 'Guarantee Certificate Issued & Sanctioned',
          completed: true,
          date: dateStr(4),
          note: 'Sanction letter issued. Guarantee Cover Reference #CGT-2026-90812 active.'
        }
      ],
      current_action_needed: 'Loan agreement signed. Funds available for drawdown.',
      officer_remarks: 'Sanction letter issued without collateral requirement.',
      portal_url: 'https://www.cgtmse.in/',
      attached_docs_count: 5
    },
    {
      id: 'app_gem_03',
      scheme_id: tenderMatch?.scheme_id || 'gem_procurement',
      scheme_name: tenderMatch?.name || 'GeM MSME Public Procurement 25% Exemption & EMD Waiver',
      category: 'tender',
      nodal_agency: tenderMatch?.nodal_agency || 'GeM SPV / Ministry of Commerce',
      benefit_value: tenderMatch?.benefit_value || '100% EMD Waiver + 25% Ministry Quota',
      applied_subsidy_amount: 'EMD Exemption on ₹1.2 Cr Central Ministry Tenders',
      status: 'Drafting',
      progress_percent: 25,
      application_ref_number: `GEM/MSME/DFT-${Math.floor(1000 + Math.random() * 9000)}`,
      created_at: dateStr(3),
      last_updated: dateStr(1),
      target_decision_date: futureDateStr(7),
      milestones: [
        {
          stage: 'Drafting',
          label: 'Seller Registration & OEM Catalog Upload',
          completed: false,
          date: dateStr(3),
          note: 'Udyam validated. Catalog items pending brand authorization.'
        },
        {
          stage: 'Submitted',
          label: 'Secondary Verification & Caution Money Deposit',
          completed: false,
          note: 'Verify PAN, bank mandate, and exemption certificate.'
        },
        {
          stage: 'Under Review',
          label: 'GeM Scrutiny & Assessment',
          completed: false,
          note: 'GeM officer vendor assessment.'
        },
        {
          stage: 'Approved',
          label: 'MSME Verified Badge & Direct Purchase Activation',
          completed: false,
          note: 'Access to L1 price matching and 25% procurement preference.'
        }
      ],
      current_action_needed: 'Upload 3 sample product datasheets to complete catalog verification.',
      officer_remarks: 'Draft saved. Ready for submission after catalog review.',
      portal_url: 'https://gem.gov.in/',
      attached_docs_count: 2
    }
  ];

  return apps;
}

export function loadApplications(profile: BusinessProfile, matches: MatchedOpportunity[]): SchemeApplication[] {
  try {
    const stored = localStorage.getItem(APPLICATIONS_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Failed to parse stored applications:', err);
  }

  const initial = getInitialApplications(profile, matches);
  saveApplications(initial);
  return initial;
}

export function saveApplications(apps: SchemeApplication[]): void {
  try {
    localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(apps));
  } catch (err) {
    console.warn('Failed to save applications to localStorage:', err);
  }
}
