import { BusinessProfile, SchemeSeedData, PresetProfile } from '../types';

export const INDIAN_STATES = [
  'National (All India)',
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Delhi (NCT)',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Chandigarh',
  'Jammu and Kashmir',
  'Ladakh',
  'Puducherry'
];

export const INDUSTRIES = [
  'Manufacturing & Heavy Engineering',
  'Auto Components & Precision Machining',
  'Textiles, Garments & Apparel',
  'Food Processing & Agri-Business',
  'Electronics & Hardware Manufacturing',
  'IT, Software & Digital Services',
  'Chemicals, Plastics & Polymers',
  'Pharmaceuticals & Medical Devices',
  'Leather, Footwear & Accessories',
  'Renewable Energy & Solar Tech',
  'Packaging & Paper Products',
  'Construction, Building Materials & Ceramics',
  'Logistics, Warehousing & Cold Chain',
  'Handicrafts, Artisans & Handlooms',
  'Retail, Wholesale & Distribution',
  'Healthcare & Diagnostic Services'
];

export const TURNOVER_BANDS = [
  'Under ₹25 Lakhs (Micro)',
  '₹25 Lakhs - ₹1.0 Crore (Micro)',
  '₹1.0 Crore - ₹5.0 Crore (Micro)',
  '₹5.0 Crore - ₹25.0 Crore (Small)',
  '₹25.0 Crore - ₹50.0 Crore (Small)',
  '₹50.0 Crore - ₹150.0 Crore (Medium)',
  '₹150.0 Crore - ₹250.0 Crore (Medium)',
  'Above ₹250.0 Crore'
];

export const EMPLOYEE_COUNTS = [
  '1 - 5 Employees',
  '6 - 15 Employees',
  '16 - 50 Employees',
  '51 - 100 Employees',
  '101 - 250 Employees',
  '250+ Employees'
];

export const PRESET_PROFILES: PresetProfile[] = [
  {
    label: 'Apex Precision Tools',
    tag: 'Delhi NCR • Engineering • ₹1.8 Cr',
    profile: {
      name: 'Apex Precision Tools Pvt. Ltd.',
      industry: 'Auto Components & Precision Machining',
      state: 'Delhi (NCT)',
      city: 'New Delhi',
      udyam_registered: true,
      udyam_number: 'UDYAM-DL-08-0049218',
      turnover_band: '₹1.0 Crore - ₹5.0 Crore (Micro)',
      employee_count: '16 - 50 Employees',
      gst_registered: true,
      gstin: '07AABCA1234F1Z8'
    }
  },
  {
    label: 'Kaveri Organic Foods',
    tag: 'Maharashtra • Agri-Processing • ₹75 Lakh',
    profile: {
      name: 'Kaveri Organic Foods LLP',
      industry: 'Food Processing & Agri-Business',
      state: 'Maharashtra',
      city: 'Pune',
      udyam_registered: true,
      udyam_number: 'UDYAM-MH-26-0091823',
      turnover_band: '₹25 Lakhs - ₹1.0 Crore (Micro)',
      employee_count: '6 - 15 Employees',
      gst_registered: true,
      gstin: '27AABCK9876Q1Z2'
    }
  },
  {
    label: 'Shreeji Garments',
    tag: 'Gujarat • Textiles • ₹4.2 Cr',
    profile: {
      name: 'Shreeji Garments & Exports',
      industry: 'Textiles, Garments & Apparel',
      state: 'Gujarat',
      city: 'Surat',
      udyam_registered: true,
      udyam_number: 'UDYAM-GJ-01-0033190',
      turnover_band: '₹1.0 Crore - ₹5.0 Crore (Micro)',
      employee_count: '16 - 50 Employees',
      gst_registered: true,
      gstin: '24AAACS4412M1Z0'
    }
  },
  {
    label: 'NexTech Electronics',
    tag: 'Karnataka • Hardware • ₹12 Cr',
    profile: {
      name: 'NexTech Smart Hardware Pvt. Ltd.',
      industry: 'Electronics & Hardware Manufacturing',
      state: 'Karnataka',
      city: 'Bengaluru',
      udyam_registered: true,
      udyam_number: 'UDYAM-KR-03-0081234',
      turnover_band: '₹5.0 Crore - ₹25.0 Crore (Small)',
      employee_count: '51 - 100 Employees',
      gst_registered: true,
      gstin: '29AABCN5567R1Z9'
    }
  }
];

export const SEEDED_SCHEMES: SchemeSeedData[] = [
  {
    id: 'cgtmse',
    name: 'Credit Guarantee Fund Trust for Micro & Small Enterprises (CGTMSE)',
    category: 'loan',
    description: 'Collateral-free credit facility up to ₹5 Crore for Micro & Small Enterprises backed by 85% government guarantee cover.',
    eligibility_criteria: 'Udyam-registered Micro and Small enterprises in manufacturing or service sectors with active bank account and clean credit history.',
    benefit_value: 'Up to ₹5.00 Crore (100% Collateral-Free Bank Guarantee)',
    deadline: 'Rolling / Open FY 2026-27',
    official_url: 'https://www.cgtmse.in',
    state: null,
    allowed_industries: ['all'],
    max_turnover_lakhs: 5000,
    requires_udyam: true,
    requires_gst: false,
    default_documents: [
      'Udyam Registration Certificate',
      'Past 2 years audited ITR & balance sheets',
      'Current account bank statements (12 months)',
      'Project quotation / Expansion business plan'
    ],
    nodal_agency: 'Ministry of MSME & SIDBI Member Lending Institutions',
    priority_weight: 95
  },
  {
    id: 'msme-zed',
    name: 'MSME Sustainable (ZED) Quality Certification Scheme',
    category: 'certification',
    description: 'Financial subsidy on certification cost, testing equipment grants, and concessional interest rates for Zero Defect Zero Effect manufacturing.',
    eligibility_criteria: 'Manufacturing MSMEs with valid Udyam registration aiming to achieve Bronze, Silver, or Gold ZED rating.',
    benefit_value: '80% Fee Subsidy + ₹5.00 Lakhs Testing Grant',
    deadline: 'Rolling / Open FY 2026-27',
    official_url: 'https://zed.msme.gov.in',
    state: null,
    allowed_industries: [
      'Manufacturing & Heavy Engineering',
      'Auto Components & Precision Machining',
      'Textiles, Garments & Apparel',
      'Food Processing & Agri-Business',
      'Electronics & Hardware Manufacturing',
      'Chemicals, Plastics & Polymers',
      'Pharmaceuticals & Medical Devices',
      'Leather, Footwear & Accessories',
      'Packaging & Paper Products',
      'Construction, Building Materials & Ceramics'
    ],
    requires_udyam: true,
    requires_gst: true,
    default_documents: [
      'Udyam Registration Certificate',
      'Factory electricity bill & premises layout',
      'Authorized Signatory PAN & Aadhaar',
      'Self-assessment declaration on ZED portal'
    ],
    nodal_agency: 'Quality Council of India (QCI) & Ministry of MSME',
    priority_weight: 92
  },
  {
    id: 'gem-public-procurement',
    name: 'GeM MSME Public Procurement Policy (25% Reserved Mandate)',
    category: 'tender',
    description: 'Statutory mandate requiring Central Ministries, Departments, and PSUs to procure minimum 25% of annual requirements exclusively from MSEs.',
    eligibility_criteria: 'All Udyam-registered Micro and Small Enterprises supplying goods or services to government departments.',
    benefit_value: '25% Mandatory Purchase Quota + Free Tender Documents + EMD Exemption',
    deadline: 'Open Year-Round',
    official_url: 'https://gem.gov.in',
    state: null,
    allowed_industries: ['all'],
    max_turnover_lakhs: 5000,
    requires_udyam: true,
    requires_gst: true,
    default_documents: [
      'Udyam Registration Certificate',
      'GSTIN Registration Certificate',
      'Bank Account Mandate & Cancelled Cheque',
      'Product / Service Catalog with HSN/SAC codes'
    ],
    nodal_agency: 'Government e-Marketplace (GeM) & Ministry of Commerce',
    priority_weight: 90
  },
  {
    id: 'pmegp-subsidy',
    name: 'Prime Minister Employment Generation Programme (PMEGP)',
    category: 'subsidy',
    description: 'Credit-linked capital subsidy for setting up new micro-enterprises and expansion of existing viable units in manufacturing and services.',
    eligibility_criteria: 'Individuals, SHGs, and Micro enterprises. Maximum project cost ₹50 Lakhs for manufacturing, ₹20 Lakhs for services.',
    benefit_value: '15% to 35% Margin Money Capital Subsidy (Up to ₹17.5 Lakhs)',
    deadline: 'Rolling / Open FY 2026-27',
    official_url: 'https://www.kviconline.gov.in/pmegpeportal',
    state: null,
    allowed_industries: ['all'],
    max_turnover_lakhs: 500,
    requires_udyam: false,
    requires_gst: false,
    default_documents: [
      'Detailed Project Report (DPR)',
      'Aadhaar Card & PAN Card',
      'Educational qualification certificate (8th pass minimum for >₹10L project)',
      'Caste/Special category certificate (if claiming 35% subsidy)'
    ],
    nodal_agency: 'KVIC (Khadi and Village Industries Commission) & State KVIB',
    priority_weight: 88
  },
  {
    id: 'msme-samadhaan',
    name: 'MSME SAMADHAAN (Delayed Payment Protection Act)',
    category: 'grant',
    description: 'Statutory legal forum enforcing 45-day payment timelines for buyer payments, carrying compound interest at 3x RBI bank rate for defaults.',
    eligibility_criteria: 'Udyam-registered Micro and Small enterprises supplying goods or services to public/private corporate buyers with overdue invoices (>45 days).',
    benefit_value: 'Statutory Interest at 3x RBI Bank Rate + Legal Conciliation Recovery',
    deadline: 'Instant Case Filing Online',
    official_url: 'https://samadhaan.msme.gov.in',
    state: null,
    allowed_industries: ['all'],
    max_turnover_lakhs: 5000,
    requires_udyam: true,
    requires_gst: true,
    default_documents: [
      'Udyam Registration Certificate',
      'Unpaid Buyer Invoices with delivery challans',
      'Purchase Order (PO) / Contract copy',
      'Buyer communication & payment reminder logs'
    ],
    nodal_agency: 'State MSE Facilitation Council (MSEFC) & Ministry of MSME',
    priority_weight: 87
  },
  {
    id: 'delhi-msme-capital-grant',
    name: 'Delhi State MSME Modernization & Capital Equipment Incentive',
    category: 'subsidy',
    description: 'State industrial capital investment subsidy on new plant, modern CNC machinery, and pollution control equipment.',
    eligibility_criteria: 'Manufacturing MSMEs operating in authorized industrial clusters of Delhi (Okhla, Mayapuri, Bawana, Narela, Patparganj).',
    benefit_value: '25% Capital Subsidy up to ₹20.00 Lakhs',
    deadline: 'Active for FY 2026-27',
    official_url: 'https://industries.delhigovt.nic.in',
    state: 'Delhi (NCT)',
    allowed_industries: [
      'Manufacturing & Heavy Engineering',
      'Auto Components & Precision Machining',
      'Electronics & Hardware Manufacturing',
      'Textiles, Garments & Apparel',
      'Packaging & Paper Products',
      'Food Processing & Agri-Business'
    ],
    requires_udyam: true,
    requires_gst: true,
    default_documents: [
      'Delhi Industrial Area premise lease / ownership title',
      'GSTR-3B filings (last 6 months)',
      'Machinery purchase quotation & commercial tax invoice',
      'Pollution NOC / DPCC Consent certificate'
    ],
    nodal_agency: 'Department of Industries, Government of NCT of Delhi',
    priority_weight: 94
  },
  {
    id: 'maharashtra-psi-subsidy',
    name: 'Maharashtra Package Scheme of Incentives (PSI) for MSMEs',
    category: 'subsidy',
    description: 'Substantial industrial development subsidy covering SGST refund, power tariff subsidy of ₹1.50/unit, and 5% interest subvention.',
    eligibility_criteria: 'MSMEs setting up or expanding in Maharashtra (Talukas classified as B, C, D, D+ and No Industry Districts).',
    benefit_value: 'Up to 60% - 80% of Fixed Capital Investment + 5% Interest Rebate',
    deadline: 'Active Policy 2024-2029',
    official_url: 'https://di.maharashtra.gov.in',
    state: 'Maharashtra',
    allowed_industries: [
      'Manufacturing & Heavy Engineering',
      'Auto Components & Precision Machining',
      'Food Processing & Agri-Business',
      'Textiles, Garments & Apparel',
      'Electronics & Hardware Manufacturing',
      'Chemicals, Plastics & Polymers',
      'Pharmaceuticals & Medical Devices'
    ],
    requires_udyam: true,
    requires_gst: true,
    default_documents: [
      'Maharashtra Industrial Development Corporation (MIDC) land / lease allotment',
      'Eligibility Certificate (EC) application form',
      'Chartered Accountant verified project investment statement',
      'Electricity consumer bill & sanction letter'
    ],
    nodal_agency: 'Directorate of Industries, Government of Maharashtra',
    priority_weight: 94
  },
  {
    id: 'gujarat-msme-capital-incentive',
    name: 'Gujarat Atmanirbhar MSME Capital & Interest Subsidy',
    category: 'subsidy',
    description: 'Capital subsidy of 25% on term loan for plant & machinery plus 7% interest subsidy for 7 years for micro, small, and medium units.',
    eligibility_criteria: 'New and expanding manufacturing units registered under Gujarat Industrial Policy.',
    benefit_value: '25% Capital Subsidy (Up to ₹35 Lakhs) + 7% Interest Subsidy for 7 Years',
    deadline: 'Active FY 2026-27',
    official_url: 'https://ic.gujarat.gov.in',
    state: 'Gujarat',
    allowed_industries: [
      'Manufacturing & Heavy Engineering',
      'Textiles, Garments & Apparel',
      'Chemicals, Plastics & Polymers',
      'Pharmaceuticals & Medical Devices',
      'Auto Components & Precision Machining',
      'Food Processing & Agri-Business',
      'Electronics & Hardware Manufacturing'
    ],
    requires_udyam: true,
    requires_gst: true,
    default_documents: [
      'Bank Term Loan Sanction Letter',
      'Audited project expenditure certificate by CA',
      'Udyam Certificate & Gujarat GST return',
      'Factory Inspectorate approval copy'
    ],
    nodal_agency: 'Industries Commissionerate, Government of Gujarat',
    priority_weight: 94
  },
  {
    id: 'karnataka-industrial-incentives',
    name: 'Karnataka Industrial Policy MSME Investment Promotion Subsidy',
    category: 'subsidy',
    description: 'Capital investment subsidy on fixed assets and 100% exemption on stamp duty & land conversion charges.',
    eligibility_criteria: 'Micro, Small, and Medium enterprises establishing operations in Karnataka Zones 1, 2, and 3.',
    benefit_value: 'Up to 30% Capital Investment Subsidy (Max ₹60 Lakhs)',
    deadline: 'Active 2025-2030',
    official_url: 'https://kum.karnataka.gov.in',
    state: 'Karnataka',
    allowed_industries: [
      'Electronics & Hardware Manufacturing',
      'IT, Software & Digital Services',
      'Manufacturing & Heavy Engineering',
      'Auto Components & Precision Machining',
      'Food Processing & Agri-Business',
      'Pharmaceuticals & Medical Devices',
      'Textiles, Garments & Apparel'
    ],
    requires_udyam: true,
    requires_gst: true,
    default_documents: [
      'Karnataka Udyog Mitra Single Window Registration',
      'Bank term loan sanction copy',
      'Detailed project appraisal report',
      'Land title / KIADB lease agreement'
    ],
    nodal_agency: 'Department of Commerce & Industries, Government of Karnataka',
    priority_weight: 93
  },
  {
    id: 'stand-up-india',
    name: 'Stand-Up India Scheme for Greenfield Enterprises',
    category: 'loan',
    description: 'Bank loans between ₹10 Lakhs and ₹1 Crore for setting up greenfield enterprises in manufacturing, services, or agri-allied trading.',
    eligibility_criteria: 'SC/ST and/or Woman entrepreneurs owning at least 51% shareholding in the enterprise.',
    benefit_value: '₹10.00 Lakhs to ₹1.00 Crore Composite Bank Loan',
    deadline: 'Active through FY 2026-27',
    official_url: 'https://www.standupmitra.in',
    state: null,
    allowed_industries: ['all'],
    max_turnover_lakhs: 2500,
    requires_udyam: false,
    requires_gst: false,
    default_documents: [
      'Identity & Address Proof (Aadhaar/Passport)',
      'Category Proof (SC/ST certificate if applicable)',
      'Greenfield project proposal & cost estimates',
      'Shareholding pattern certificate'
    ],
    nodal_agency: 'Department of Financial Services & SIDBI',
    priority_weight: 85
  },
  {
    id: 'msme-champions-design',
    name: 'MSME Champions Design & IPR Intellectual Property Grant',
    category: 'grant',
    description: 'Financial assistance for product design, prototype development, Indian patent registration, and international trademark filings.',
    eligibility_criteria: 'Udyam registered MSMEs undertaking new product design or filing IPR (Patents, Trademarks, GI).',
    benefit_value: 'Up to ₹40 Lakhs for Design Projects + ₹1.0 Lakh Reimbursement per Patent',
    deadline: 'Rolling / Open 2026-27',
    official_url: 'https://champions.gov.in',
    state: null,
    allowed_industries: [
      'Manufacturing & Heavy Engineering',
      'Auto Components & Precision Machining',
      'Electronics & Hardware Manufacturing',
      'Textiles, Garments & Apparel',
      'Handicrafts, Artisans & Handlooms',
      'Pharmaceuticals & Medical Devices',
      'Renewable Energy & Solar Tech'
    ],
    requires_udyam: true,
    requires_gst: true,
    default_documents: [
      'Udyam Registration Certificate',
      'Design project brief / prototype specs',
      'Patent / Trademark filing receipt and fee challan',
      'Design consultant agreement copy'
    ],
    nodal_agency: 'Development Commissioner (MSME), Government of India',
    priority_weight: 86
  },
  {
    id: 'treds-invoice-discounting',
    name: 'TReDS Institutional Liquidity & Invoice Discounting Facility',
    category: 'loan',
    description: 'RBI-regulated electronic platforms enabling MSEs to auction trade receivables against corporate buyers and PSUs for 24-hour liquidity.',
    eligibility_criteria: 'All Udyam registered Micro and Small enterprises with corporate, PSU, or government supply contracts.',
    benefit_value: 'Immediate Cashflow within 24-48 Hours at 7-9% Concessional Interest Rates',
    deadline: 'Instant Digital Onboarding',
    official_url: 'https://www.rxil.in',
    state: null,
    allowed_industries: ['all'],
    max_turnover_lakhs: 5000,
    requires_udyam: true,
    requires_gst: true,
    default_documents: [
      'Udyam Certificate & GSTIN',
      'Company PAN & Board Resolution for TReDS membership',
      'Approved corporate buyer vendor codes',
      'Bank mandate for ECS settlement'
    ],
    nodal_agency: 'RBI, RXIL, M1xchange, Invoicemart',
    priority_weight: 89
  },
  {
    id: 'pm-vishwakarma',
    name: 'PM Vishwakarma Scheme for Traditional Artisans & Craftsmen',
    category: 'grant',
    description: 'End-to-end support including skill training, ₹15,000 tool kit incentive, and collateral-free credit at 5% subsidized interest rate.',
    eligibility_criteria: 'Artisans and craftspeople working with hands and tools in 18 traditional trades (Blacksmith, Carpenter, Goldsmith, Potter, Weaver, etc.).',
    benefit_value: '₹15,000 Tool Incentive + ₹3.00 Lakhs Loan at 5% Subsidized Interest',
    deadline: 'Active Open FY 2026-27',
    official_url: 'https://pmvishwakarma.gov.in',
    state: null,
    allowed_industries: [
      'Handicrafts, Artisans & Handlooms',
      'Textiles, Garments & Apparel',
      'Leather, Footwear & Accessories',
      'Construction, Building Materials & Ceramics'
    ],
    max_turnover_lakhs: 100,
    requires_udyam: false,
    requires_gst: false,
    default_documents: [
      'Aadhaar Card with mobile linkage',
      'Bank passbook copy',
      'Ration Card / Family details',
      'Trade skill declaration at Gram Panchayat / ULB'
    ],
    nodal_agency: 'Ministry of MSME & Ministry of Skill Development',
    priority_weight: 84
  },
  {
    id: 'iso-quality-reimbursement',
    name: 'ISO 9001/14001/HACCP Quality Certification Reimbursement',
    category: 'certification',
    description: 'One-time reimbursement of expenses incurred in acquiring ISO 9001, ISO 14001, HACCP, or equivalent international quality certifications.',
    eligibility_criteria: 'Micro and Small manufacturing enterprises with permanent Udyam registration and valid NABCB-accredited ISO audit.',
    benefit_value: '75% Reimbursement of Certification Costs (Up to ₹75,000)',
    deadline: 'Rolling / Open FY 2026-27',
    official_url: 'https://msme.gov.in',
    state: null,
    allowed_industries: ['all'],
    max_turnover_lakhs: 5000,
    requires_udyam: true,
    requires_gst: true,
    default_documents: [
      'Udyam Registration Certificate',
      'Original ISO Certificate issued by NABCB accredited body',
      'Auditor fee receipts and payment vouchers',
      'Proof of payment via non-cash banking channel'
    ],
    nodal_agency: 'Office of DC-MSME, New Delhi',
    priority_weight: 82
  },
  {
    id: 'ramp-strategic-grant',
    name: 'Raising and Accelerating MSME Performance (RAMP) Grant',
    category: 'grant',
    description: 'World Bank assisted central scheme accelerating MSME technology absorption, green transition, and export competitiveness.',
    eligibility_criteria: 'Manufacturing and technology-enabled MSMEs undergoing green energy audits or export market readiness assessments.',
    benefit_value: 'Direct Technical Assistance + 50% Clean Energy Transition Subsidy',
    deadline: 'Active 2024-2027',
    official_url: 'https://ramp.msme.gov.in',
    state: null,
    allowed_industries: [
      'Manufacturing & Heavy Engineering',
      'Auto Components & Precision Machining',
      'Chemicals, Plastics & Polymers',
      'Pharmaceuticals & Medical Devices',
      'Textiles, Garments & Apparel',
      'Renewable Energy & Solar Tech'
    ],
    requires_udyam: true,
    requires_gst: true,
    default_documents: [
      'Udyam Certificate & Energy Audit Report',
      'Past 3 years audited financials',
      'Green technology purchase proposal',
      'GST returns for preceding 12 months'
    ],
    nodal_agency: 'Ministry of MSME & World Bank',
    priority_weight: 83
  }
];

// Helper: Deterministic Hard Eligibility Filter
export function filterCandidateSchemes(profile: BusinessProfile): SchemeSeedData[] {
  return SEEDED_SCHEMES.filter((scheme) => {
    // 1. State Filter: Scheme must be National (null) OR match business profile state
    if (scheme.state !== null && scheme.state !== 'National (All India)') {
      const normSchemeState = scheme.state.toLowerCase();
      const normProfileState = profile.state.toLowerCase();
      if (!normProfileState.includes(normSchemeState) && !normSchemeState.includes(normProfileState)) {
        return false;
      }
    }

    // 2. Industry Filter: Must allow 'all' or match business profile industry
    if (!scheme.allowed_industries.includes('all')) {
      const match = scheme.allowed_industries.some(
        (ind) =>
          profile.industry.toLowerCase().includes(ind.toLowerCase()) ||
          ind.toLowerCase().includes(profile.industry.toLowerCase())
      );
      if (!match) {
        return false;
      }
    }

    // 3. Udyam Filter: If strictly requires Udyam and profile has no Udyam, skip or deprioritize
    if (scheme.requires_udyam && !profile.udyam_registered) {
      // Don't completely eliminate national schemes if they can register, but filter state specific ones
      if (scheme.state !== null) return false;
    }

    // 4. GST Filter: If requires GST and profile has no GST
    if (scheme.requires_gst && !profile.gst_registered) {
      if (scheme.state !== null) return false;
    }

    return true;
  });
}

// Deterministic Fallback Engine matching the LLM System Prompt Schema
export function generateDeterministicMatches(profile: BusinessProfile) {
  const candidates = filterCandidateSchemes(profile);

  // Sort candidates by priority weight
  const sorted = candidates.sort((a, b) => (b.priority_weight || 80) - (a.priority_weight || 80));
  const topMatches = sorted.slice(0, 6);

  return topMatches.map((scheme, idx) => {
    const isStateScheme = scheme.state !== null;
    let baseScore = isStateScheme ? 95 : 90 - idx * 2;
    if (!profile.udyam_registered && scheme.requires_udyam) baseScore -= 15;
    if (!profile.gst_registered && scheme.requires_gst) baseScore -= 10;

    let reason = '';
    if (scheme.id === 'cgtmse') {
      reason = `Your business operates in ${profile.industry} with turnover in the ${profile.turnover_band} range, qualifying for full collateral-free bank guarantees without mortgaging property.`;
    } else if (scheme.id === 'msme-zed') {
      reason = `As a ${profile.udyam_registered ? 'Udyam-registered' : ''} manufacturing enterprise in ${profile.industry}, you are eligible for an 80% government subsidy on quality certification and ₹5 Lakhs testing grants.`;
    } else if (scheme.id === 'gem-public-procurement') {
      reason = `Under the Public Procurement Policy, Central PSUs and ministries are legally mandated to source 25% of annual purchase volume from MSEs like ${profile.name}.`;
    } else if (scheme.id.includes('capital') || scheme.id.includes('subsidy') || isStateScheme) {
      reason = `Your registered location in ${profile.state} and sector focus in ${profile.industry} directly matches state industrial policy capital modernization incentives.`;
    } else if (scheme.id === 'msme-samadhaan') {
      reason = `Your enterprise is legally protected under Section 15 of the MSMED Act to recover delayed B2B receivables within 45 days with 3x RBI compound interest.`;
    } else if (scheme.id === 'treds-invoice-discounting') {
      reason = `Your B2B supply contracts qualify for 24-hour digital invoice discounting at low interest rates via RBI-authorized TReDS platforms.`;
    } else {
      reason = `Your business profile meets the statutory eligibility criteria for ${scheme.name} based on sector, turnover tier, and location.`;
    }

    const action_steps = [
      `Prepare documentation: Gather ${scheme.default_documents.slice(0, 2).join(', ')}.`,
      `Submit application on the official portal at ${scheme.official_url} or visit designated nodal authority.`,
      `Track submission reference ID and upload verified ${profile.gst_registered ? 'GST' : 'tax'} and banking records.`,
      `Liaise with ${scheme.nodal_agency} for inspection or disbursement sanction.`
    ];

    return {
      scheme_id: scheme.id,
      name: scheme.name,
      category: scheme.category,
      benefit_value: scheme.benefit_value,
      deadline: scheme.deadline,
      official_url: scheme.official_url,
      state: scheme.state,
      match_score: Math.min(Math.max(baseScore, 50), 98),
      match_reason: reason,
      action_steps,
      required_documents: scheme.default_documents,
      nodal_agency: scheme.nodal_agency,
      description: scheme.description,
      eligibility_criteria: scheme.eligibility_criteria
    };
  });
}
