import "dotenv/config";

// Native REST recipe (no Voice Agents SDK yet). Walks the full agent CRUD lifecycle:
// create → list → get → update → delete.

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
  // CREATE
  const agent = await api("POST", "/agents", {
    name: "Cookbook Managed Agent",
    prompt: "You are a helpful assistant.",
    first_message: "Hello!",
    voice_id: "sabrina",
  });
  console.log(`CREATE  → ${agent.id} (${agent.name})`);

  try {
    // LIST — agents come back newest-first; confirm ours is present.
    const list = await api("GET", "/agents");
    const agents = Array.isArray(list) ? list : (list.items ?? list.agents ?? []);
    console.log(
      `LIST    → ${agents.length} agent(s); ours present: ${agents.some((a: any) => a.id === agent.id)}`,
    );

    // GET one
    const fetched = await api("GET", `/agents/${agent.id}`);
    console.log(`GET     → ${fetched.id} voice=${fetched.voice_id} temp=${fetched.temperature}`);

    // UPDATE (PATCH) — change the name and prompt.
    const updated = await api("PATCH", `/agents/${agent.id}`, {
      name: "Cookbook Managed Agent (updated)",
      prompt: "You are a concise, helpful assistant.",
    });
    console.log(`UPDATE  → name is now "${updated.name}"`);
  } finally {
    // DELETE
    await api("DELETE", `/agents/${agent.id}`);
    console.log(`DELETE  → removed ${agent.id}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
