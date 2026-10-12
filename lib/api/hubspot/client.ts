import { Client as HubSpotClient } from "@hubspot/api-client";

let cachedClient: HubSpotClient | null = null;

function getHubSpotAccessToken() {
  const token = process.env.HS_ACCESS_TOKEN;

  if (!token) {
    throw new Error("HS_ACCESS_TOKEN is not configured.");
  }

  return token;
}

export function getHubSpotClient() {
  if (!cachedClient) {
    cachedClient = new HubSpotClient({ accessToken: getHubSpotAccessToken() });
  }

  return cachedClient;
}
