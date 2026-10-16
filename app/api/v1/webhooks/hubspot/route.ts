import { NextRequest, NextResponse } from "next/server";
import { notifyClientStageUpdate } from "@/lib/api/hubspot/webhooks";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const contactId =
      (typeof body?.objectId === "string" ? body.objectId : null) ??
      (typeof body?.object?.id === "string" ? body.object.id : null);

    const stageValue =
      typeof body?.properties?.strategic_services_stage === "string"
        ? body.properties.strategic_services_stage
        : typeof body?.propertyValue === "string"
          ? body.propertyValue
          : null;

    if (contactId) {
      notifyClientStageUpdate(contactId, stageValue);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid webhook payload." }, { status: 400 });
  }
}

export function GET() {
  return NextResponse.json({ ok: true, message: "HubSpot webhook endpoint is available." });
}
