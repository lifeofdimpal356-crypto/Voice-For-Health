import {synthesizeSpeech, type SupportedLanguage} from '../server/geminiService.js';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({error: 'Method not allowed'});
    return;
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const {text, language = 'en'} = body as {
      text?: string;
      language?: SupportedLanguage;
    };
    const audio = await synthesizeSpeech(text || '', language);
    res.status(200).json(audio);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to synthesize voice response.';
    res.status(400).json({error: message});
  }
}
