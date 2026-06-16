import "dotenv/config";
import fs from "node:fs";
import { SpeechifyClient } from "@speechify/api";

if (!process.env.SPEECHIFY_API_KEY) {
  throw new Error("Set SPEECHIFY_API_KEY (copy .env.example to .env).");
}

const client = new SpeechifyClient({ token: process.env.SPEECHIFY_API_KEY });

async function main() {
  // `audio.stream` returns an async-iterable stream that emits audio chunks as they
  // are synthesized — useful for long inputs and low time-to-first-byte playback.
  const audioStream = await client.tts.audio.stream({
    accept: "audio/mpeg",
    input:
      "Streaming lets you start playing audio before the whole clip is ready. " +
      "This sentence is being synthesized and written to disk chunk by chunk.",
    voiceId: "george",
    model: "simba-english",
  });

  const outFile = "output.mp3";
  const out = fs.createWriteStream(outFile);
  for await (const chunk of audioStream) {
    out.write(chunk);
  }
  out.end();
  console.log(`Streamed audio to ${outFile}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
