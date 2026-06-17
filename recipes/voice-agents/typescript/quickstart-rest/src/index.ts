import "dotenv/config";

// Native REST recipe — there is no Voice Agents SDK yet, so we call the API directly
// with fetch. When an SDK adds Voice Agents support, the SDK version of this recipe will
// live at ../quickstart (this one keeps the -rest suffix).

const token = process.env.SPEECHIFY_API_KEY;
if (!token) {
  throw new Error("Set SPEECHIFY_API_KEY (copy .env.example to .env).");
}

const BASE_URL = "https://api.speechify.ai/v1";

async function api(method: string, path: string, body?: unknown): Promise<any> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    throw new Error(`${method} ${path} → ${res.status} ${res.statusText}: ${await res.text()}`);
  }
  return res.status === 204 ? undefined : res.json();
}

async function main() {
  // 1. Create an agent.
  const agent = await api("POST", "/agents", {
    name: "Cookbook Demo Agent",
    prompt: "You are a friendly assistant for the Speechify cookbook. Keep replies short.",
    first_message: "Hi! I'm a Speechify voice agent. How can I help?",
    voice_id: "sabrina", // also: carly, dominic, lyla
  });
  console.log(`Created agent: ${agent.id} (${agent.name})`);

  try {
    // 2. Start a conversation. The response gives you everything needed to join the
    //    realtime audio session: a LiveKit `url`, an auth `token`, and the `room` name.
    const session = await api("POST", `/agents/${agent.id}/conversations`, {});
    console.log("\nConversation session — join this with a LiveKit client to talk to the agent:");
    console.log(`  url:          ${session.url}`);
    console.log(`  room:         ${session.room}`);
    console.log(`  token:        ${String(session.token).slice(0, 24)}… (JWT)`);
    console.log(
      `  conversation: ${session.conversation.id} (status=${session.conversation.status})`,
    );
  } finally {
    // 3. Clean up so demo agents don't accumulate. Remove this to keep your agent —
    //    agents are persistent; you'd normally create one and reuse it across calls.
    await api("DELETE", `/agents/${agent.id}`);
    console.log(`\nDeleted agent ${agent.id}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
