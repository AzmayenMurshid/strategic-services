import { NextResponse } from "next/server";
import { getClientByLogin } from "@/lib/api/hubspot/contacts";

type LoginPayload = {
  firstName?: unknown;
  lastName?: unknown;
  recordId?: unknown;
};

function asRequiredString(value: unknown) {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

export async function POST(request: Request) {
  let payload: LoginPayload;

  try {
    payload = (await request.json()) as LoginPayload;
  } catch {
    return NextResponse.json(
      {
        error: {
          code: "INVALID_JSON",
          message: "Request body must be valid JSON.",
        },
      },
      { status: 400 }
    );
  }

  const firstName = asRequiredString(payload.firstName);
  const lastName = asRequiredString(payload.lastName);
  const recordId = asRequiredString(payload.recordId);

  if (!firstName || !lastName || !recordId) {
    return NextResponse.json(
      {
        error: {
          code: "VALIDATION_ERROR",
          message: "firstName, lastName, and recordId are required.",
        },
      },
      { status: 400 }
    );
  }

  try {
    const client = await getClientByLogin({ firstName, lastName, recordId });

    if (!client) {
      return NextResponse.json(
        {
          error: {
            code: "AUTHENTICATION_ERROR",
            message: "No matching client found for the provided login details.",
          },
        },
        { status: 401 }
      );
    }

    return NextResponse.json({ data: client });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error.";

    return NextResponse.json(
      {
        error: {
          code: "EXTERNAL_PROVIDER_ERROR",
          message,
        },
      },
      { status: 500 }
    );
  }
}
