import os

from dotenv import load_dotenv
from speechify import Speechify


def main() -> None:
    load_dotenv()

    token = os.environ.get("SPEECHIFY_API_KEY")
    if not token:
        raise SystemExit("Set SPEECHIFY_API_KEY (copy .env.example to .env).")

    client = Speechify(token=token)

    # TODO: write your recipe here. See agents/speechify-tts.md for the API surface.
    _ = client
    print("Replace this with your recipe.")


if __name__ == "__main__":
    main()
