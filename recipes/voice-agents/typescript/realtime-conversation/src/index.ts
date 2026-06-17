import "dotenv/config";

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { SpeechifyClient } from "@speechify/api";
import { connectConversation } from "@speechify/api/realtime";

const HERE = dirname(fileURLToPath(import.meta.url));
const CALLER_WAV = join(HERE, "..", "fixtures", "caller.wav");
const REPLY_WAV = "agent_reply.wav";
const OUTPUT_SAMPLE_RATE = 48000; // session.outputAudio() yields 48 kHz mono PCM16
const FRAME_MS = 20; // stream the caller WAV in 20 ms frames, paced to real time

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

interface Wav {
  sampleRate: number;
  channels: number;
  data: Buffer;
}

// Minimal RIFF/WAVE reader — walks chunks rather than assuming a 44-byte header.
function readWav(path: string): Wav {
  const buf = readFileSync(path);
  let sampleRate = OUTPUT_SAMPLE_RATE;
  let channels = 1;
  let data = Buffer.alloc(0);
  let offset = 12; // skip "RIFF"<size>"WAVE"
  while (offset + 8 <= buf.length) {
    const id = buf.toString("ascii", offset, offset + 4);
    const size = buf.readUInt32LE(offset + 4);
    const body = offset + 8;
    if (id === "fmt ") {
      channels = buf.readUInt16LE(body + 2);
      sampleRate = buf.readUInt32LE(body + 4);
    } else if (id === "data") {
      data = buf.subarray(body, body + size);
    }
    offset = body + size + (size % 2); // chunks are word-aligned
  }
  return { sampleRate, channels, data };
}

// Minimal PCM16 WAV writer.
function writeWav(path: string, pcm: Buffer, sampleRate: number, channels: number): void {
  const header = Buffer.alloc(44);
  header.write("RIFF", 0);
  header.writeUInt32LE(36 + pcm.length, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20); // PCM
  header.writeUInt16LE(channels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(sampleRate * channels * 2, 28);
  header.writeUInt16LE(channels * 2, 32);
  header.writeUInt16LE(16, 34); // bits per sample
  header.write("data", 36);
  header.writeUInt32LE(pcm.length, 40);
  writeFileSync(path, Buffer.concat([header, pcm]));
}

async function converse(client: SpeechifyClient, agentId: string): Promise<void> {
  // Open a realtime conversation and connect to the returned endpoint.
  const conversation = await client.agent.createConversation(agentId);
  const session = await connectConversation(conversation);
  console.log(`connected to ${session.roomName}`);

  // Transcripts (caller + agent) as they stream.
  session.onText((ev) => console.log(`[${ev.role}] ${ev.text}${ev.final ? " (final)" : ""}`));

  // Agent audio out -> collect raw PCM16 (no audio device), written to WAV at the end.
  const replyChunks: Buffer[] = [];
  const saver = (async () => {
    for await (const chunk of session.outputAudio()) {
      replyChunks.push(chunk.data);
    }
  })();

  // Caller audio in <- WAV file, streamed in real time in 20 ms frames.
  const caller = readWav(CALLER_WAV);
  const bytesPerFrame = Math.floor((caller.sampleRate * FRAME_MS) / 1000) * caller.channels * 2;
  for (let i = 0; i < caller.data.length; i += bytesPerFrame) {
    const frame = caller.data.subarray(i, i + bytesPerFrame);
    await session.sendAudio(frame, { sampleRate: caller.sampleRate, channels: caller.channels });
    await sleep(FRAME_MS);
  }

  await sleep(5000); // let the agent finish replying
  await session.disconnect();
  await saver; // outputAudio() ends when the session disconnects

  writeWav(REPLY_WAV, Buffer.concat(replyChunks), OUTPUT_SAMPLE_RATE, 1);
  console.log(`saved agent reply -> ${REPLY_WAV}`);
}

async function main(): Promise<void> {
  const token = process.env.SPEECHIFY_API_KEY;
  if (!token) {
    throw new Error("Set SPEECHIFY_API_KEY (copy .env.example to .env).");
  }

  const client = new SpeechifyClient({ token });

  // Create a throwaway agent to talk to, then clean it up at the end.
  const agent = await client.agent.create({
    name: "Realtime cookbook demo",
    voiceId: "sabrina",
    firstMessage: "Hi! Thanks for calling. How can I help?",
    prompt: "You are a friendly support agent. Keep your replies short.",
  });
  console.log(`created agent ${agent.id}`);
  try {
    await converse(client, agent.id);
  } finally {
    await client.agent.delete(agent.id);
    console.log(`deleted agent ${agent.id}`);
  }
}

// The realtime transport holds open native handles, so exit explicitly once done.
main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
