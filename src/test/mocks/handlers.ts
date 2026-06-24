import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("*/", () =>
    HttpResponse.json({
      status: "ok",
      timestamp: "2026-06-24T00:00:00Z",
    })
  ),

  http.post("*/api/v1/agent", () =>
    HttpResponse.json({
      answer: "test answer",
      sources: ["doc1"],
    })
  ),

  http.post("*/api/documents/chat", () =>
    HttpResponse.json({
      answer: "document answer",
      relevantChunks: ["chunk1"],
    })
  ),
];
