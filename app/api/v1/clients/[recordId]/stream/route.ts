import { NextRequest, NextResponse } from "next/server";
import { subscribeToClientStageUpdates } from "@/lib/api/hubspot/webhooks";

export async function GET(request: NextRequest, context: { params: Promise<{ recordId: string }> }) {
  const { recordId } = await context.params;

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      const heartbeat = setInterval(() => {
        controller.enqueue(encoder.encode(`: heartbeat\n\n`));
      }, 25000);

      const unsubscribe = subscribeToClientStageUpdates(recordId, () => {
        controller.enqueue(encoder.encode(`event: client-stage-update\ndata: {"recordId":"${recordId}"}\n\n`));
      });

      request.signal.addEventListener("abort", () => {
        clearInterval(heartbeat);
        unsubscribe();
        controller.close();
      });
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
