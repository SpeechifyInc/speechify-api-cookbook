import "dotenv/config";

const token = process.env.SPEECHIFY_API_KEY;
if (!token) {
  throw new Error("Set SPEECHIFY_API_KEY (copy .env.example to .env).");
}

const BASE_URL = "https://api.speechify.ai/v1";

async function api(path: string, body: unknown): Promise<any> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`${path} → ${res.status} ${res.statusText}: ${await res.text()}`);
  }
  return res.json();
}

async function main() {
  // 1. Create an agent.
  const agent = await api("/agents", {
    name: "Cookbook Demo Agent",
    prompt: "You are a friendly assistant for the Speechify cookbook. Keep replies short.",
    first_message: "Hi! I'm a Speechify voice agent. How can I help?",
    voice_id: "sabrina",
  });
  console.log(`Created agent: ${agent.id}`);

  // 2. Start a conversation — returns a WebSocket URL + token for the live audio session.
  const conversation = await api(`/agents/${agent.id}/conversations`, {});
  console.log("Conversation session (connect a WebSocket audio client to this):");
  console.log(JSON.stringify(conversation, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
