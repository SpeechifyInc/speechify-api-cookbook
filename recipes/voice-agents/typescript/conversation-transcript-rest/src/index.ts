import "dotenv/config";

// Native REST recipe (no Voice Agents SDK yet). Shows how to start a conversation and
// retrieve its transcript. The transcript is empty until a real audio session has run in
// the conversation's LiveKit room (see quickstart-rest), but the retrieval flow is the same.

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
  const agent = await api("POST", "/agents", {
    name: "Cookbook Transcript Agent",
    prompt: "You are a helpful assistant.",
    first_message: "Hello!",
    voice_id: "sabrina",
  });

  try {
    // Start a conversation to get a conversation id.
    const { conversation } = await api("POST", `/agents/${agent.id}/conversations`, {});
    console.log(`Conversation ${conversation.id} (status=${conversation.status})`);

    // Fetch the transcript. Paginated: { messages, next_cursor, has_more }.
    // Each message has a role (user / assistant) and the spoken text.
    const transcript = await api("GET", `/agents/conversations/${conversation.id}/messages`);

    if (transcript.messages.length === 0) {
      console.log(
        "\nNo messages yet — a transcript fills in after someone talks to the agent in the\n" +
          "conversation's LiveKit room (see the quickstart-rest recipe). Re-run this against\n" +
          "an existing conversation id to print its transcript.",
      );
    } else {
      console.log(`\nTranscript (${transcript.messages.length} messages):`);
      for (const m of transcript.messages) {
        console.log(`  [${m.role}] ${m.content ?? m.text ?? ""}`);
      }
    }
  } finally {
    await api("DELETE", `/agents/${agent.id}`);
    console.log(`\nDeleted agent ${agent.id}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
