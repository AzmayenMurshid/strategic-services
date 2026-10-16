import { getHubSpotClient } from "./client";

export type ClientProfile = {
  id: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
  hubspotOwnerId: string | null;
  consultantName: string | null;
  strategicServicesStage: string | null;
};

export type ClientLoginLookup = {
  firstName: string;
  lastName: string;
  recordId: string;
};

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function normalizeName(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/gi, "")
    .toLowerCase();
}

function matchesName(input: string, stored: string) {
  const normalizedInput = normalizeName(input);
  const normalizedStored = normalizeName(stored);

  if (!normalizedInput || !normalizedStored) {
    return false;
  }

  if (normalizedInput === normalizedStored) {
    return true;
  }

  // Allow common CRM formatting differences such as middle initials or suffixes.
  return normalizedStored.startsWith(normalizedInput) || normalizedInput.startsWith(normalizedStored);
}

function isNotFoundError(error: unknown) {
  if (!error || typeof error !== "object") {
    return false;
  }

  const withStatusCode = error as { statusCode?: unknown; code?: unknown };
  return withStatusCode.statusCode === 404 || withStatusCode.code === 404;
}

function isMissingScopesError(error: unknown) {
  if (!error || typeof error !== "object") {
    return false;
  }

  const withStatusCode = error as {
    statusCode?: unknown;
    body?: { category?: unknown };
    code?: unknown;
  };

  if (withStatusCode.statusCode !== 403 && withStatusCode.code !== 403) {
    return false;
  }

  return withStatusCode.body?.category === "MISSING_SCOPES";
}

async function resolveConsultantNameByOwnerId(ownerId: string | null) {
  if (!ownerId) {
    return null;
  }

  const numericOwnerId = Number(ownerId);

  if (!Number.isFinite(numericOwnerId)) {
    return null;
  }

  const client = getHubSpotClient();

  try {
    let owner;

    try {
      owner = await client.crm.owners.ownersApi.getById(numericOwnerId, "id", false);
    } catch (error) {
      if (!isNotFoundError(error)) {
        throw error;
      }

      // Some portals expose owner references as userId values instead of owner id.
      owner = await client.crm.owners.ownersApi.getById(numericOwnerId, "userId", false);
    }

    const fullName = [owner.firstName, owner.lastName].filter(Boolean).join(" ").trim();

    return fullName || owner.email || null;
  } catch (error) {
    if (isNotFoundError(error)) {
      return null;
    }

    if (isMissingScopesError(error)) {
      // If owners scopes are not granted, keep dashboard functional and omit consultant name.
      return null;
    }

    throw error;
  } 
}

export async function getClientByLogin({ firstName, lastName, recordId }: ClientLoginLookup) {
  const client = getHubSpotClient();

  try {
    const contact = await client.crm.contacts.basicApi.getById(
      recordId,
      [
        "firstname",
        "lastname",
        "email",
        "phone",
        "mobilephone",
        "contact_owner_id",
        "hubspot_owner_id",
        "hs_object_id",
        "strategic_services_stage",
      ]
    );

    const properties = contact.properties ?? {};
    const remoteFirstName = (properties.firstname ?? "").trim();
    const remoteLastName = (properties.lastname ?? "").trim();
    const hubspotOwnerId = properties.contact_owner_id ?? properties.hubspot_owner_id ?? null;
    const strategicServicesStage = properties.strategic_services_stage ?? null;

    if (!matchesName(firstName, remoteFirstName) || !matchesName(lastName, remoteLastName)) {
      return null;
    }

    const consultantName = await resolveConsultantNameByOwnerId(hubspotOwnerId);

    return {
      id: contact.id,
      firstName: remoteFirstName,
      lastName: remoteLastName,
      email: properties.email ?? null,
      phone: properties.mobilephone ?? properties.phone ?? null,
      hubspotOwnerId,
      consultantName,
      strategicServicesStage,
    } satisfies ClientProfile;
  } catch (error) {
    if (isNotFoundError(error)) {
      return null;
    }

    throw error;
  }
}

export async function getClientByRecordId(recordId: string) {
  const client = getHubSpotClient();

  try {
    const contact = await client.crm.contacts.basicApi.getById(
      recordId,
      [
        "firstname",
        "lastname",
        "email",
        "phone",
        "mobilephone",
        "contact_owner_id",
        "hubspot_owner_id",
        "hs_object_id",
        "strategic_services_stage",
      ]
    );

    const properties = contact.properties ?? {};
    const hubspotOwnerId = properties.contact_owner_id ?? properties.hubspot_owner_id ?? null;
    const strategicServicesStage = properties.strategic_services_stage ?? null;
    const consultantName = await resolveConsultantNameByOwnerId(hubspotOwnerId);

    return {
      id: contact.id,
      firstName: (properties.firstname ?? "").trim(),
      lastName: (properties.lastname ?? "").trim(),
      email: properties.email ?? null,
      phone: properties.mobilephone ?? properties.phone ?? null,
      hubspotOwnerId,
      consultantName,
      strategicServicesStage,
    } satisfies ClientProfile;
  } catch (error) {
    if (isNotFoundError(error)) {
      return null;
    }

    throw error;
  }
}
