export type StageStatus = "complete" | "active" | "upcoming";

export type Stage = {
  name: string;
  status: StageStatus;
  snippet: string;
};

export type ServiceOutcomeKey = "save-business" | "exit-business" | "save-or-exit";

export type ServicePromptDefinition = {
  id: ServiceOutcomeKey;
  label: string;
  desiredOutcome: string;
  promptFile: string;
  stages: Stage[];
};

export type RequirementStatus = "Received" | "Required" | "Recommended";

export const SS_PROMPTS: ServicePromptDefinition[] = [
  {
    id: "save-business",
    label: "Save the Business",
    desiredOutcome: "Reorganize under Subchapter V / Chapter 11",
    promptFile: "Strategy_Session_-_PROMPT_1_-_Save_Business_v060426-V8.md",
    stages: [
      { name: "Intake Received", status: "complete", snippet: "Client onboarding and business intake are logged." },
      { name: "P&L Review", status: "complete", snippet: "Operating budget and revenue picture are under review." },
      { name: "Balance Sheet Review", status: "complete", snippet: "Asset and debt picture is being mapped for a save-path structure." },
      { name: "Business Budget Drafted", status: "complete", snippet: "The reorganization budget is structured from the client financials." },
      { name: "Asset Valuation Ready", status: "complete", snippet: "Current business value and asset picture are prepared for analysis." },
      { name: "Document Review", status: "complete", snippet: "Required financial documents are being checked against the workbook." },
      { name: "Consultant Review", status: "active", snippet: "The service team is validating the save-path build." },
      { name: "Case Packet Drafting", status: "upcoming", snippet: "Preparing the client packet for the save-path strategy review." },
      { name: "Client Follow-Up", status: "upcoming", snippet: "Remaining items are routed back to the client for completion." },
      { name: "Additional Information Needed", status: "upcoming", snippet: "Any missing business or owner data is documented for review." },
      { name: "Strategy Session Ready", status: "upcoming", snippet: "The client packet is staged for counsel review and next steps." },
      { name: "Completed / Closed", status: "upcoming", snippet: "The save-path analysis is finalized and closed out." },
    ],
  },
  {
    id: "exit-business",
    label: "Exit the Business",
    desiredOutcome: "Personal bankruptcy strategy for closing the business",
    promptFile: "Strategy_Session_-_PROMPT_2_-_Exit_the_Business_v2_3.md",
    stages: [
      { name: "Intake Received", status: "complete", snippet: "Client intake and personal questionnaire are logged." },
      { name: "Required Files Verified", status: "complete", snippet: "Workbook, questionnaire, and transcript / handoff packet are confirmed." },
      { name: "Debtor Profile Built", status: "complete", snippet: "Personal financial profile and business closure context are summarized." },
      { name: "Means Test Review", status: "complete", snippet: "Income and Chapter 7 eligibility are analyzed against the personal picture." },
      { name: "Asset & Debt Review", status: "complete", snippet: "Personal assets, liabilities, and exemption issues are being reviewed." },
      { name: "Document Review", status: "complete", snippet: "Personal records and financial documents are checked for accuracy." },
      { name: "Counsel Review", status: "active", snippet: "The exit-path overview is being reviewed for reporting and next steps." },
      { name: "Financial Overview Draft", status: "upcoming", snippet: "The personal case overview and supporting summary are drafted." },
      { name: "Client Follow-Up", status: "upcoming", snippet: "Any outstanding personal or business details are sent back for completion." },
      { name: "Strategy Session Prep", status: "upcoming", snippet: "The final personal overview is prepared for the counsel strategy session." },
      { name: "Filing Ready", status: "upcoming", snippet: "The file is prepared for the next formal step in the exit path." },
      { name: "Completed / Closed", status: "upcoming", snippet: "The exit-path review is finalized and closed." },
    ],
  },
  {
    id: "save-or-exit",
    label: "Save or Exit",
    desiredOutcome: "Undecided path comparing both save and exit options",
    promptFile: "Strategy_Session_-_PROMPT_1_ - Save or Exit (Undecided) (1).md",
    stages: [
      { name: "Intake Received", status: "complete", snippet: "Both-path onboarding and case intake are logged." },
      { name: "Business & Personal Inputs", status: "complete", snippet: "Save-path and personal exit inputs are assembled for comparison." },
      { name: "Workbook Build", status: "complete", snippet: "The undecided workbook is prepared with both business and personal views." },
      { name: "Business Budget Review", status: "complete", snippet: "The save-path business picture is reviewed against the budget documents." },
      { name: "Exit-Path Snapshot", status: "complete", snippet: "Personal asset and means-test picture is summarized for the exit option." },
      { name: "Decision Framework", status: "complete", snippet: "Both paths are organized for counsel review and discussion." },
      { name: "Consultant Review", status: "active", snippet: "The strategy team is validating both paths against the data set." },
      { name: "Counsel Briefing", status: "upcoming", snippet: "The both-path summary is prepared for the live strategy session." },
      { name: "Client Follow-Up", status: "upcoming", snippet: "Outstanding items are gathered so counsel can decide with the client." },
      { name: "Strategy Session Ready", status: "upcoming", snippet: "The client is prepared for the path-selection strategy session." },
      { name: "Decision Point", status: "upcoming", snippet: "The legal team and client evaluate the selected route for next steps." },
      { name: "Completed / Closed", status: "upcoming", snippet: "The undecided analysis is closed and handoff is complete." },
    ],
  },
];

export const serviceTimelineMap: Record<ServiceOutcomeKey, Stage[]> = {
  "save-business": SS_PROMPTS[0].stages,
  "exit-business": SS_PROMPTS[1].stages,
  "save-or-exit": SS_PROMPTS[2].stages,
};

export function normalizeServiceKey(value?: string | null): ServiceOutcomeKey {
  const normalizedValue = (value ?? "save-business").trim().toLowerCase();
  const keyMap: Record<string, ServiceOutcomeKey> = {
    "save business": "save-business",
    "save-the-business": "save-business",
    "save_business": "save-business",
    "save-business": "save-business",
    "exit business": "exit-business",
    "exit-the-business": "exit-business",
    "exit_business": "exit-business",
    "exit-business": "exit-business",
    "save or exit": "save-or-exit",
    "save-or-exit": "save-or-exit",
    "save_or_exit": "save-or-exit",
    "undecided": "save-or-exit",
    "both-paths": "save-or-exit",
  };

  return keyMap[normalizedValue] ?? "save-business";
}

export function getServicePromptByKey(serviceKey?: string | null) {
  const key = normalizeServiceKey(serviceKey);
  return SS_PROMPTS.find((prompt) => prompt.id === key) ?? SS_PROMPTS[0];
}

export const stages: Stage[] = serviceTimelineMap["save-business"];

const outcomeDocumentMap: Record<
  ServiceOutcomeKey,
  {
    requiredDocs: Array<{ label: string; status: RequirementStatus; tone: "green" | "red" | "amber" }>;
    documentRequirements: Array<{ label: string; type: RequirementStatus; note: string }>;
  }
> = {
  "save-business": {
    requiredDocs: [
      { label: "Business financial overview packet", status: "Received", tone: "green" },
      { label: "P&L and balance sheet", status: "Required", tone: "red" },
      { label: "Business tax returns", status: "Required", tone: "red" },
      { label: "Bank statements", status: "Recommended", tone: "amber" },
      { label: "Owner payroll records", status: "Recommended", tone: "amber" },
    ],
    documentRequirements: [
      { label: "Business financial overview packet", type: "Received", note: "Covers the business operating picture and supporting financial summary." },
      { label: "P&L sheet", type: "Required", note: "Profit and Loss sheet for one year." },
      { label: "Balance sheet", type: "Required", note: "Most recent Balance sheet." },
      { label: "Business tax returns", type: "Required", note: "Most recent filed returns for the business entity and supporting financial review." },
      { label: "Business bank statements", type: "Recommended", note: "Recent statements to confirm business cash flow and account activity." },
      { label: "Personal bank statements", type: "Recommended", note: "Recent statements to confirm personal cash flow and account activity." },
      { label: "Owner payroll records", type: "Recommended", note: "Owner compensation and payroll verification for the business." },

    ],
  },
  "exit-business": {
    requiredDocs: [
      { label: "Strategy Session Personal Questionnaire", status: "Required", tone: "red" },
      { label: "Client workbook / personal financial summary", status: "Received", tone: "green" },
      { label: "Transcript or case handoff notes", status: "Required", tone: "red" },
      { label: "Bank statements", status: "Recommended", tone: "amber" },
      { label: "Personal ID and ownership records", status: "Recommended", tone: "amber" },
    ],
    documentRequirements: [
      { label: "Strategy Session Personal Questionnaire", type: "Required", note: "Primary source for debtor details, personal assets, income, and filing-related facts." },
      { label: "Business tax returns", type: "Required", note: "Most recent filed returns for the business entity and supporting financial review." },
      { label: "Personal tax returns", type: "Required", note: "Most recent filed returns for the individual and supporting financial review." },
      { label: "Client workbook / personal financial summary", type: "Received", note: "Ground truth for the means test, personal asset values, and personal debt overview." },
      { label: "Transcript or case handoff notes", type: "Required", note: "Used to close gaps, capture client context, and record key issues for the strategy session." },
      { label: "Business bank statements", type: "Recommended", note: "Supports the review of business cash flow and financial account activity." },
      { label: "Personal bank statements", type: "Recommended", note: "Supports the review of personal cash flow and financial account activity." },
    ],
  },
  "save-or-exit": {
    requiredDocs: [
      { label: "Business P&L and balance sheet", status: "Required", tone: "red" },
      { label: "Strategy Session Personal Questionnaire", status: "Required", tone: "red" },
      { label: "Client workbook / both-path summary", status: "Received", tone: "green" },
      { label: "Transcript or handoff notes", status: "Required", tone: "red" },
      { label: "Bank statements", status: "Recommended", tone: "amber" },
    ],
    documentRequirements: [
      { label: "Business P&L and balance sheet", type: "Required", note: "Required to evaluate both the save path and the liquidation / asset picture." },
      { label: "Strategy Session Personal Questionnaire", type: "Required", note: "Needed for the personal exit picture, means test, and debtor profile." },
      { label: "Client workbook / both-path summary", type: "Received", note: "Ground truth for both the business and personal path analysis." },
      { label: "Business tax returns", type: "Required", note: "Most recent filed returns for the business entity and supporting financial review." },
      { label: "Personal tax returns", type: "Required", note: "Most recent filed returns for the individual and supporting financial review." },
      { label: "Business bank statements", type: "Recommended", note: "Helps validate business cash flow and recent account activity for either path." },
      { label: "Personal bank statements", type: "Recommended", note: "Helps validate personal cash flow and recent account activity for either path." },
      
    ],
  },
};

export function getRequiredDocsForService(serviceKey?: string | null) {
  const key = normalizeServiceKey(serviceKey);
  return outcomeDocumentMap[key].requiredDocs;
}

export function getDocumentRequirementsForService(serviceKey?: string | null) {
  const key = normalizeServiceKey(serviceKey);
  return outcomeDocumentMap[key].documentRequirements;
}

export const requiredDocs = getRequiredDocsForService("save-business");
export const documentRequirements = getDocumentRequirementsForService("save-business");

export const recentUpdates = [
  { text: "Consultant requested additional payroll verification.", age: "2 hours ago" },
  { text: "Financial overview has been reviewed and accepted.", age: "1 day ago" },
  { text: "Client upload was received and forwarded for consultant review.", age: "3 days ago" },
] as const;

export const fileList = [
  "financial_overview.pdf",
  "bank_statement_2025.pdf",
  "owner_tax_return.pdf",
] as const;
