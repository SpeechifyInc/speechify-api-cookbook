from __future__ import annotations

import os

import requests
from dotenv import load_dotenv

# Native REST recipe — there is no Voice Agents SDK yet, so we call the API directly with
# requests. When an SDK adds Voice Agents support, the SDK version of this recipe will live
# at ../quickstart (this one keeps the -rest suffix).

BASE_URL = "https://api.speechify.ai/v1"


def main() -> None:
    load_dotenv()

    token = os.environ.get("SPEECHIFY_API_KEY")
    if not token:
        raise SystemExit("Set SPEECHIFY_API_KEY (copy .env.example to .env).")

    session = requests.Session()
    session.headers.update({"Authorization": f"Bearer {token}"})

    def api(method: str, path: str, body: dict | None = None):
        resp = session.request(method, f"{BASE_URL}{path}", json=body, timeout=60)
        resp.raise_for_status()
        return resp.json() if resp.content else None

    # 1. Create an agent.
    agent = api(
        "POST",
        "/agents",
        {
            "name": "Cookbook Demo Agent",
            "prompt": "You are a friendly assistant for the Speechify cookbook. Keep replies short.",
            "first_message": "Hi! I'm a Speechify voice agent. How can I help?",
            "voice_id": "sabrina",  # also: carly, dominic, lyla
        },
    )
    print(f"Created agent: {agent['id']} ({agent['name']})")

    try:
        # 2. Start a conversation. The response gives you everything needed to join the
        #    realtime audio session: a LiveKit `url`, an auth `token`, and the `room`.
        s = api("POST", f"/agents/{agent['id']}/conversations", {})
        print("\nConversation session — join this with a LiveKit client to talk to the agent:")
        print(f"  url:          {s['url']}")
        print(f"  room:         {s['room']}")
        print(f"  token:        {str(s['token'])[:24]}… (JWT)")
        print(f"  conversation: {s['conversation']['id']} (status={s['conversation']['status']})")
    finally:
        # 3. Clean up so demo agents don't accumulate. Remove this to keep your agent.
        api("DELETE", f"/agents/{agent['id']}")
        print(f"\nDeleted agent {agent['id']}")


if __name__ == "__main__":
    main()
