import {askHealthAssistant, type SupportedLanguage} from '../server/geminiService.js';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({error: 'Method not allowed'});
    return;
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const {question, language = 'en'} = body as {
      question?: string;
      language?: SupportedLanguage;
    };
    const result = await askHealthAssistant(question || '', language);
    res.status(200).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to process health question.';
    res.status(400).json({error: message});
  }
}
