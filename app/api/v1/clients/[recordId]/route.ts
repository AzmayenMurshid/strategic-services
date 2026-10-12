import { NextResponse } from "next/server";
import { getClientByRecordId } from "@/lib/api/hubspot/contacts";

type RouteContext = {
  params: Promise<{ recordId: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { recordId } = await context.params;

  if (!recordId?.trim()) {
    return NextResponse.json(
      {
        error: {
          code: "VALIDATION_ERROR",
          message: "recordId is required.",
        },
      },
      { status: 400 }
    );
  }

  try {
    const client = await getClientByRecordId(recordId);

    if (!client) {
      return NextResponse.json(
        {
          error: {
            code: "NOT_FOUND",
            message: "Client was not found.",
          },
        },
        { status: 404 }
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
