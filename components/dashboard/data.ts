export type StageStatus = "complete" | "active" | "upcoming";

export type Stage = {
  name: string;
  status: StageStatus;
  snippet: string;
};

export type RequirementStatus = "Received" | "Required" | "Recommended";

export const stages: Stage[] = [
  { name: "Intake Received", status: "complete", snippet: "Application and intake details logged." },
  { name: "Initial Review", status: "complete", snippet: "Case reviewed for completeness." },
  { name: "Client Information Collected", status: "complete", snippet: "Business and owner info gathered." },
  { name: "Financial Overview Requested", status: "complete", snippet: "Financial packet requested from client." },
  { name: "Financial Overview Submitted", status: "complete", snippet: "Client financial summary received." },
  { name: "Documents Under Review", status: "complete", snippet: "Supporting documents are in review." },
  { name: "Consultant Review", status: "active", snippet: "Consultant is validating the file." },
  { name: "Case Packet Drafting", status: "upcoming", snippet: "Drafting the case packet for review." },
  { name: "Client Follow-Up Requested", status: "upcoming", snippet: "Client follow-up items are pending." },
  { name: "Additional Information Needed", status: "upcoming", snippet: "Additional data requested from client." },
  { name: "Case Ready for Submission", status: "upcoming", snippet: "File is prepared for submission." },
  { name: "Completed / Closed", status: "upcoming", snippet: "Case closed out after submission." },
];

export const requiredDocs = [
  { label: "Financial overview packet", status: "Received", tone: "green" },
  { label: "Business tax returns", status: "Required", tone: "red" },
  { label: "Bank statements", status: "Recommended", tone: "amber" },
] as const;

export const documentRequirements = [
  { label: "Financial overview packet", type: "Received", note: "Covers the business financial summary and supporting detail." },
  { label: "Business tax returns", type: "Required", note: "Most recent filed returns for the business entity." },
  { label: "Bank statements", type: "Received", note: "Recent statements to confirm cash flow and account activity." },
  { label: "Owner payroll records", type: "Required", note: "Owner compensation and payroll verification for the business." },
  { label: "Legal entity documents", type: "Recommended", note: "Articles, formation records, EIN verification, or ownership structure documents." },
  { label: "Consultant follow-up items", type: "Recommended", note: "Any additional verification requested by the case consultant." },
  { label: "Owner identification documents", type: "Received", note: "Government-issued ID or ownership verification if requested." },
  { label: "Debt schedule or loan detail", type: "Recommended", note: "Helpful for reviewing financing obligations and staging details." },
] as const;

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
