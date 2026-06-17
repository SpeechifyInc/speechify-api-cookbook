import asyncio
import os
import wave
from pathlib import Path

from dotenv import load_dotenv
from speechify import Speechify, realtime

CALLER_WAV = Path(__file__).parent / "fixtures" / "caller.wav"
REPLY_WAV = "agent_reply.wav"
OUTPUT_SAMPLE_RATE = 48000  # session.output_audio() yields 48 kHz mono PCM16
FRAME_MS = 20  # stream the caller WAV in 20 ms frames, paced to real time


async def converse(client: Speechify, agent_id: str) -> None:
    # Open a realtime conversation and connect to the returned endpoint.
    conversation = client.agent.create_conversation(agent_id)
    session = await realtime.connect_conversation(conversation)
    print(f"connected to {session.room_name}")

    # Transcripts (caller + agent) as they stream.
    session.on_text(
        lambda ev: print(f"[{ev.role}] {ev.text}" + (" (final)" if ev.final else ""))
    )

    # Agent audio out -> WAV file (raw PCM16, no audio device).
    reply = wave.open(REPLY_WAV, "wb")
    reply.setnchannels(1)
    reply.setsampwidth(2)
    reply.setframerate(OUTPUT_SAMPLE_RATE)

    async def save_reply() -> None:
        async for chunk in session.output_audio():
            reply.writeframes(chunk.data)

    # Caller audio in <- WAV file, streamed in real time.
    async def stream_caller() -> None:
        wf = wave.open(str(CALLER_WAV), "rb")
        rate, channels = wf.getframerate(), wf.getnchannels()
        frames_per_chunk = int(rate * FRAME_MS / 1000)
        while True:
            data = wf.readframes(frames_per_chunk)
            if not data:
                break
            await session.send_audio(data, sample_rate=rate, num_channels=channels)
            await asyncio.sleep(FRAME_MS / 1000)
        wf.close()

    saver = asyncio.create_task(save_reply())
    await stream_caller()
    await asyncio.sleep(5)  # let the agent finish replying
    await session.disconnect()
    try:
        await asyncio.wait_for(saver, timeout=3)
    except asyncio.TimeoutError:
        saver.cancel()
    reply.close()
    print(f"saved agent reply -> {REPLY_WAV}")


def main() -> None:
    load_dotenv()

    token = os.environ.get("SPEECHIFY_API_KEY")
    if not token:
        raise SystemExit("Set SPEECHIFY_API_KEY (copy .env.example to .env).")

    client = Speechify(token=token)

    # Create a throwaway agent to talk to, then clean it up at the end.
    agent = client.agent.create(
        name="Realtime cookbook demo",
        voice_id="sabrina",
        first_message="Hi! Thanks for calling. How can I help?",
        prompt="You are a friendly support agent. Keep your replies short.",
    )
    print(f"created agent {agent.id}")
    try:
        asyncio.run(converse(client, agent.id))
    finally:
        client.agent.delete(agent.id)
        print(f"deleted agent {agent.id}")


if __name__ == "__main__":
    main()
