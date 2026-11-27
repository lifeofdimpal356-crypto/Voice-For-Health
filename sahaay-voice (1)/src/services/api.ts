import type {HealthGuidance, Language} from '../types/health';

async function parseJsonResponse<T>(res: Response): Promise<T> {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message =
      typeof data?.error === 'string' && data.error.trim()
        ? data.error
        : `Request failed (${res.status})`;
    throw new Error(message);
  }
  return data as T;
}

export async function fetchHealthGuidance(
  question: string,
  language: Language,
): Promise<HealthGuidance> {
  const res = await fetch('/api/health-assistant', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({question, language}),
  });
  return parseJsonResponse<HealthGuidance>(res);
}

export async function transcribeVoiceAudio(
  audioBase64: string,
  mimeType: string,
  language: Language,
): Promise<string> {
  const res = await fetch('/api/transcribe', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({audioBase64, mimeType, language}),
  });
  const data = await parseJsonResponse<{transcript: string}>(res);
  return data.transcript;
}

export async function synthesizeVoiceSpeech(
  text: string,
  language: Language,
): Promise<{audioBase64: string; mimeType: string}> {
  const res = await fetch('/api/tts', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({text, language}),
  });
  return parseJsonResponse<{audioBase64: string; mimeType: string}>(res);
}
