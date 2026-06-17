from __future__ import annotations

import os

import requests
from dotenv import load_dotenv

# Native REST recipe (no Voice Agents SDK yet). Walks the full agent CRUD lifecycle:
# create -> list -> get -> update -> delete.

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

    # CREATE
    agent = api(
        "POST",
        "/agents",
        {
            "name": "Cookbook Managed Agent",
            "prompt": "You are a helpful assistant.",
            "first_message": "Hello!",
            "voice_id": "sabrina",
        },
    )
    print(f"CREATE  -> {agent['id']} ({agent['name']})")

    try:
        # LIST — GET /agents returns {"agents": [...]}, newest first.
        agents = api("GET", "/agents")["agents"]
        present = any(a["id"] == agent["id"] for a in agents)
        print(f"LIST    -> {len(agents)} agent(s); ours present: {present}")

        # GET one
        fetched = api("GET", f"/agents/{agent['id']}")
        print(f"GET     -> {fetched['id']} voice={fetched['voice_id']} temp={fetched['temperature']}")

        # UPDATE (PATCH) — send only the fields you want to change.
        updated = api(
            "PATCH",
            f"/agents/{agent['id']}",
            {"name": "Cookbook Managed Agent (updated)", "prompt": "You are a concise, helpful assistant."},
        )
        print(f"UPDATE  -> name is now \"{updated['name']}\"")
    finally:
        # DELETE
        api("DELETE", f"/agents/{agent['id']}")
        print(f"DELETE  -> removed {agent['id']}")


if __name__ == "__main__":
    main()
