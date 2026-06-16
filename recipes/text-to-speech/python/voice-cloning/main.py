import base64
import json
import os

from dotenv import load_dotenv
from speechify import Speechify

# Bundled sample: ~26s of NASA ISS spacewalk audio (public domain).
SAMPLE_PATH = os.path.join(os.path.dirname(__file__), "fixtures", "spacewalk.wav")


def main() -> None:
    load_dotenv()

    token = os.environ.get("SPEECHIFY_API_KEY")
    if not token:
        raise SystemExit("Set SPEECHIFY_API_KEY (copy .env.example to .env).")

    client = Speechify(token=token)

    # 1. Clone a voice from an audio sample (10-30s of clean speech works well).
    #    `consent` is REQUIRED: a JSON string attesting you have the speaker's
    #    permission to clone their voice. Use the real consenting person's details.
    with open(SAMPLE_PATH, "rb") as sample:
        voice = client.tts.voices.create(
            name="cookbook-cloned-voice",
            gender="male",
            sample=sample,
            consent=json.dumps({"fullName": "Jane Doe", "email": "jane@example.com"}),
        )
    print(f"Cloned voice created: {voice.id} ({voice.display_name}, type={voice.type})")

    try:
        # 2. Synthesize speech using the cloned voice — pass its id as voice_id.
        speech = client.tts.audio.speech(
            input="Hello from a voice cloned with the Speechify API.",
            voice_id=voice.id,
            audio_format="mp3",
            model="simba-english",
        )
        with open("output.mp3", "wb") as f:
            f.write(base64.b64decode(speech.audio_data))
        print("Wrote output.mp3")
    finally:
        # 3. Clean up so cloned voices don't accumulate on your account.
        #    Remove this to keep the voice and reuse it later via voice.id.
        client.tts.voices.delete(voice.id)
        print(f"Deleted cloned voice {voice.id}")


if __name__ == "__main__":
    main()
