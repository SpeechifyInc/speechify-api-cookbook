from __future__ import annotations

import os

import requests
from dotenv import load_dotenv

# Native REST recipe (no Voice Agents SDK yet). Shows how to start a conversation and
# retrieve its transcript. The transcript is empty until a real audio session has run in
# the conversation's LiveKit room (see quickstart-rest), but the retrieval flow is the same.

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

    agent = api(
        "POST",
        "/agents",
        {
            "name": "Cookbook Transcript Agent",
            "prompt": "You are a helpful assistant.",
            "first_message": "Hello!",
            "voice_id": "sabrina",
        },
    )

    try:
        # Start a conversation to get a conversation id.
        conversation = api("POST", f"/agents/{agent['id']}/conversations", {})["conversation"]
        print(f"Conversation {conversation['id']} (status={conversation['status']})")

        # Fetch the transcript. Paginated: {messages, next_cursor, has_more}.
        transcript = api("GET", f"/agents/conversations/{conversation['id']}/messages")
        messages = transcript["messages"]

        if not messages:
            print(
                "\nNo messages yet — a transcript fills in after someone talks to the agent in\n"
                "the conversation's LiveKit room (see the quickstart-rest recipe). Re-run this\n"
                "against an existing conversation id to print its transcript."
            )
        else:
            print(f"\nTranscript ({len(messages)} messages):")
            for m in messages:
                print(f"  [{m['role']}] {m.get('content') or m.get('text') or ''}")
    finally:
        api("DELETE", f"/agents/{agent['id']}")
        print(f"\nDeleted agent {agent['id']}")


if __name__ == "__main__":
    main()
