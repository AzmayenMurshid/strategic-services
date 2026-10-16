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
      {
        name: "Client Intake",
        status: "complete",
        snippet: "We begin by learning about you, your business, and your current situation. During this step, we gather key information about your SBA loan, business operations, financial concerns, and long-term goals. This helps us understand your unique circumstances and determine the information needed to move forward.",
      },
      {
        name: "Financial Review",
        status: "complete",
        snippet: "Our team carefully reviews the financial documents you provide, including business and personal financial information. We analyze your current financial position, obligations, assets, and overall business performance to create a clear picture of where things stand. This review helps ensure that the attorney has accurate and organized information when evaluating your options.",
      },
      {
        name: "Onboarding",
        status: "complete",
        snippet: "Once the initial review is complete, we meet with you to address any outstanding questions and clarify missing or incomplete information. We walk you through the workbook, explain how to complete it, and ensure all necessary financial details are properly documented. The goal of this step is to build a complete and accurate financial picture that will allow the attorney to provide informed guidance during your Strategy Session.",
      },
      {
        name: "Post Onboarding",
        status: "complete",
        snippet: "After onboarding, we’ll review the information and documents you’ve provided and follow up with a list of any remaining items and questionnaires we may need. This helps make sure your file is complete and ready for the next steps.",
      },
      {
        name: "Complete Your Workbook",
        status: "active",
        snippet: "SAVE: Complete your business budget projections based on realistic expected income and expenses. The goal is to show a positive Net Operating Income and that the business can generate sufficient income to cover its ongoing operating expenses and pay creditors. You’ll also complete your business asset information, including assets currently owned by the business and their estimated values.",
      },
      {
        name: "Workbook Review",
        status: "upcoming",
        snippet: "Congratulations, your workbook is complete! We’ll review the input provided, identify anything that may need clarification or updating, and follow up with you on any remaining questions. Once everything is complete, your workbook will be ready for the next stage of the process.",
      },
      {
        name: "Attorney Coordination",
        status: "upcoming",
        snippet: "[Description pending — to be provided by Jessica]",
      },
      {
        name: "Strategy Session",
        status: "upcoming",
        snippet: "[Description pending — to be provided by Jessica]",
      },
      {
        name: "Post Strategy Session",
        status: "upcoming",
        snippet: "[Description pending — to be provided by Jessica]",
      },
    ],
  },
  {
    id: "exit-business",
    label: "Exit the Business",
    desiredOutcome: "Personal bankruptcy strategy for closing the business",
    promptFile: "Strategy_Session_-_PROMPT_2_-_Exit_the_Business_v2_3.md",
    stages: [
      {
        name: "Client Intake",
        status: "complete",
        snippet: "We begin by learning about you, your business, and your current situation. During this step, we gather key information about your SBA loan, business operations, financial concerns, and long-term goals. This helps us understand your unique circumstances and determine the information needed to move forward.",
      },
      {
        name: "Financial Review",
        status: "complete",
        snippet: "Our team carefully reviews the financial documents you provide, including business and personal financial information. We analyze your current financial position, obligations, assets, and overall business performance to create a clear picture of where things stand. This review helps ensure that the attorney has accurate and organized information when evaluating your options.",
      },
      {
        name: "Onboarding",
        status: "complete",
        snippet: "Once the initial review is complete, we meet with you to address any outstanding questions and clarify missing or incomplete information. We walk you through the workbook, explain how to complete it, and ensure all necessary financial details are properly documented. The goal of this step is to build a complete and accurate financial picture that will allow the attorney to provide informed guidance during your Strategy Session.",
      },
      {
        name: "Post Onboarding",
        status: "complete",
        snippet: "After onboarding, we’ll review the information and documents you’ve provided and follow up with a list of any remaining items and questionnaires we may need. This helps make sure your file is complete and ready for the next steps.",
      },
      {
        name: "Complete Your Workbook",
        status: "active",
        snippet: "EXIT: Complete your business asset information so we have an updated picture of what the business currently owns. You’ll also review and complete your personal budget and personal asset information, including your household income and expenses and the assets you personally own, to make sure the information is complete and up to date.",
      },
      {
        name: "Workbook Review",
        status: "upcoming",
        snippet: "Congratulations, your workbook is complete! We’ll review the input provided, identify anything that may need clarification or updating, and follow up with you on any remaining questions. Once everything is complete, your workbook will be ready for the next stage of the process.",
      },
      {
        name: "Attorney Coordination",
        status: "upcoming",
        snippet: "[Description pending — to be provided by Jessica]",
      },
      {
        name: "Strategy Session",
        status: "upcoming",
        snippet: "[Description pending — to be provided by Jessica]",
      },
      {
        name: "Post Strategy Session",
        status: "upcoming",
        snippet: "[Description pending — to be provided by Jessica]",
      },
    ],
  },
  {
    id: "save-or-exit",
    label: "Save or Exit",
    desiredOutcome: "Undecided path comparing both save and exit options",
    promptFile: "Strategy_Session_-_PROMPT_1_ - Save or Exit (Undecided) (1).md",
    stages: [
      {
        name: "Client Intake",
        status: "complete",
        snippet: "We begin by learning about you, your business, and your current situation. During this step, we gather key information about your SBA loan, business operations, financial concerns, and long-term goals. This helps us understand your unique circumstances and determine the information needed to move forward.",
      },
      {
        name: "Financial Review",
        status: "complete",
        snippet: "Our team carefully reviews the financial documents you provide, including business and personal financial information. We analyze your current financial position, obligations, assets, and overall business performance to create a clear picture of where things stand. This review helps ensure that the attorney has accurate and organized information when evaluating your options.",
      },
      {
        name: "Onboarding",
        status: "complete",
        snippet: "Once the initial review is complete, we meet with you to address any outstanding questions and clarify missing or incomplete information. We walk you through the workbook, explain how to complete it, and ensure all necessary financial details are properly documented. The goal of this step is to build a complete and accurate financial picture that will allow the attorney to provide informed guidance during your Strategy Session.",
      },
      {
        name: "Post Onboarding",
        status: "complete",
        snippet: "After onboarding, we’ll review the information and documents you’ve provided and follow up with a list of any remaining items and questionnaires we may need. This helps make sure your file is complete and ready for the next steps.",
      },
      {
        name: "Complete Your Workbook",
        status: "active",
        snippet: "SAVE & EXIT: Complete the applicable information from both paths. This includes your business budget projections and business assets, along with the relevant personal budget and personal asset information, so your workbook reflects both your business and personal financial situation.",
      },
      {
        name: "Workbook Review",
        status: "upcoming",
        snippet: "Congratulations, your workbook is complete! We’ll review the input provided, identify anything that may need clarification or updating, and follow up with you on any remaining questions. Once everything is complete, your workbook will be ready for the next stage of the process.",
      },
      {
        name: "Attorney Coordination",
        status: "upcoming",
        snippet: "[Description pending — to be provided by Jessica]",
      },
      {
        name: "Strategy Session",
        status: "upcoming",
        snippet: "[Description pending — to be provided by Jessica]",
      },
      {
        name: "Post Strategy Session",
        status: "upcoming",
        snippet: "[Description pending — to be provided by Jessica]",
      },
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
      { label: "Profit and Loss statement covering one full year", status: "Required", tone: "red" },
      { label: "Latest one-year Balance Sheet", status: "Required", tone: "red" },
      { label: "Loan Authorization and Agreement", status: "Required", tone: "red" },
      { label: "Workbook", status: "Required", tone: "red" },
      { label: "Business Tax Return", status: "Recommended", tone: "amber" },
      { label: "3–6 months Business Bank Statement", status: "Recommended", tone: "amber" },
    ],
    documentRequirements: [
      { label: "Profit and Loss statement covering one full year", type: "Required", note: "Provide either September 2025 to October 2026, or the full Profit and Loss for 2025." },
      { label: "Latest one-year Balance Sheet", type: "Required", note: "Most recent one-year balance sheet for the business." },
      { label: "Loan Authorization and Agreement", type: "Required", note: "Executed loan documents required for the SBA review and strategy path." },
      { label: "Workbook", type: "Required", note: "Complete the workbook during Stage 5, which is the final document needed from the client." },
      { label: "Business Tax Return", type: "Recommended", note: "Recommended and can be submitted during or after onboarding." },
      { label: "3–6 months Business Bank Statement", type: "Recommended", note: "Recommended and can be submitted during or after onboarding." },
    ],
  },
  "exit-business": {
    requiredDocs: [
      { label: "Fill out Personal Questionnaire", status: "Required", tone: "red" },
      { label: "Balance Sheet", status: "Required", tone: "red" },
      { label: "Loan Authorization and Agreement", status: "Required", tone: "red" },
      { label: "Workbook", status: "Required", tone: "red" },
      { label: "Business & Personal Tax Return", status: "Recommended", tone: "amber" },
      { label: "3–6 months Business Bank Statement", status: "Recommended", tone: "amber" },
      { label: "3–6 months Personal Bank Statement", status: "Recommended", tone: "amber" },
    ],
    documentRequirements: [
      { label: "Fill out Personal Questionnaire", type: "Required", note: "Complete the personal questionnaire required for the exit strategy review." },
      { label: "Balance Sheet", type: "Required", note: "Latest balance sheet required for the personal and business financial picture." },
      { label: "Loan Authorization and Agreement", type: "Required", note: "Executed agreements required to support the review and filing strategy." },
      { label: "Workbook", type: "Required", note: "Complete the workbook during Stage 5, which is the final document needed from the client." },
      { label: "Business & Personal Tax Return", type: "Recommended", note: "Recommended and can be submitted during or after onboarding." },
      { label: "3–6 months Business Bank Statement", type: "Recommended", note: "Recommended and can be submitted during or after onboarding." },
      { label: "3–6 months Personal Bank Statement", type: "Recommended", note: "Recommended and can be submitted during or after onboarding." },
    ],
  },
  "save-or-exit": {
    requiredDocs: [
      { label: "Profit and Loss statement covering one full year", status: "Required", tone: "red" },
      { label: "Latest one-year Balance Sheet", status: "Required", tone: "red" },
      { label: "Loan Authorization and Agreement", status: "Required", tone: "red" },
      { label: "Workbook", status: "Required", tone: "red" },
      { label: "Business & Personal Tax Return", status: "Recommended", tone: "amber" },
      { label: "3–6 months Business Bank Statement", status: "Recommended", tone: "amber" },
      { label: "3–6 months Personal Bank Statement", status: "Recommended", tone: "amber" },
    ],
    documentRequirements: [
      { label: "Profit and Loss statement covering one full year", type: "Required", note: "Provide either September 2025 to October 2026, or the full Profit and Loss for 2025." },
      { label: "Latest one-year Balance Sheet", type: "Required", note: "Most recent one-year balance sheet for the business." },
      { label: "Loan Authorization and Agreement", type: "Required", note: "Executed loan documents required for the SBA review and strategy path." },
      { label: "Workbook", type: "Required", note: "Complete the workbook during Stage 5, which is the final document needed from the client." },
      { label: "Business & Personal Tax Return", type: "Recommended", note: "Recommended and can be submitted during or after onboarding." },
      { label: "3–6 months Business Bank Statement", type: "Recommended", note: "Recommended and can be submitted during or after onboarding." },
      { label: "3–6 months Personal Bank Statement", type: "Recommended", note: "Recommended and can be submitted during or after onboarding." },
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

export function getRecentUpdatesForStage(currentStageName?: string | null) {
  const stageName = (currentStageName ?? "").trim();

  if (!stageName) {
    return [
      { text: "Your case is waiting for the next stage update.", age: "Just now" },
    ] as const;
  }

  const stageLabel = stageName.toLowerCase();

  if (stageLabel.includes("client intake")) {
    return [
      { text: "Client Intake Completed", age: "Just now" },
      { text: "Your file is now on Financial Review", age: "Next step" },
    ] as const;
  }

  if (stageLabel.includes("financial review")) {
    return [
      { text: "Financial Overview Completed", age: "Just now" },
      { text: "Your file is now on Onboarding", age: "Next step" },
    ] as const;
  }

  if (stageLabel.includes("onboarding")) {
    return [
      { text: "Onboarding Completed", age: "Just now" },
      { text: "Your file is now on Post Onboarding", age: "Next step" },
    ] as const;
  }

  if (stageLabel.includes("post onboarding")) {
    return [
      { text: "Post Onboarding Completed", age: "Just now" },
      { text: "Your file is now on Complete Your Workbook", age: "Next step" },
    ] as const;
  }

  if (stageLabel.includes("complete your workbook")) {
    return [
      { text: "Workbook Submitted", age: "Just now" },
      { text: "Your file is now on Workbook Review", age: "Next step" },
    ] as const;
  }

  if (stageLabel.includes("workbook review")) {
    return [
      { text: "Workbook Review Completed", age: "Just now" },
      { text: "Your file is now on Attorney Coordination", age: "Next step" },
    ] as const;
  }

  if (stageLabel.includes("attorney coordination")) {
    return [
      { text: "Attorney Coordination Completed", age: "Just now" },
      { text: "Your file is now on Strategy Session", age: "Next step" },
    ] as const;
  }

  if (stageLabel.includes("strategy session")) {
    return [
      { text: "Strategy Session Completed", age: "Just now" },
      { text: "Your file is now on Post Strategy Session", age: "Next step" },
    ] as const;
  }

  if (stageLabel.includes("post strategy")) {
    return [
      { text: "Post Strategy Session Completed", age: "Just now" },
      { text: "Your case is now complete", age: "Final step" },
    ] as const;
  }

  return [
    { text: `${stageName} is in progress.`, age: "Now" },
  ] as const;
}

export const fileList = [
  "financial_overview.pdf",
  "bank_statement_2025.pdf",
  "owner_tax_return.pdf",
] as const;
