import {transcribeAudio, type SupportedLanguage} from '../server/geminiService.js';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({error: 'Method not allowed'});
    return;
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const {audioBase64, mimeType = 'audio/webm', language = 'en'} = body as {
      audioBase64?: string;
      mimeType?: string;
      language?: SupportedLanguage;
    };
    const transcript = await transcribeAudio(audioBase64 || '', mimeType, language);
    res.status(200).json({transcript});
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to transcribe voice recording.';
    res.status(400).json({error: message});
  }
}
