import 'dotenv/config';
import express from 'express';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import {
  askHealthAssistant,
  synthesizeSpeech,
  transcribeAudio,
  type SupportedLanguage,
} from './server/geminiService.js';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json({limit: '15mb'}));

app.get('/api/health', (_req, res) => {
  res.json({ok: true, app: 'Sahaay Voice'});
});

app.post('/api/health-assistant', async (req, res) => {
  try {
    const {question, language = 'en'} = req.body as {
      question?: string;
      language?: SupportedLanguage;
    };
    const guidance = await askHealthAssistant(question || '', language);
    res.json(guidance);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to process health question.';
    res.status(400).json({error: message});
  }
});

app.post('/api/transcribe', async (req, res) => {
  try {
    const {audioBase64, mimeType = 'audio/webm', language = 'en'} = req.body as {
      audioBase64?: string;
      mimeType?: string;
      language?: SupportedLanguage;
    };
    const transcript = await transcribeAudio(audioBase64 || '', mimeType, language);
    res.json({transcript});
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to transcribe voice recording.';
    res.status(400).json({error: message});
  }
});

app.post('/api/tts', async (req, res) => {
  try {
    const {text, language = 'en'} = req.body as {
      text?: string;
      language?: SupportedLanguage;
    };
    const audio = await synthesizeSpeech(text || '', language);
    res.json(audio);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to synthesize voice response.';
    res.status(400).json({error: message});
  }
});

async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const {createServer: createViteServer} = await import('vite');
    const vite = await createViteServer({
      server: {middlewareMode: true},
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(currentDir, 'dist');
    if (fs.existsSync(distDir)) {
      app.use(express.static(distDir));
      app.get('*', (_req, res) => {
        res.sendFile(path.join(distDir, 'index.html'));
      });
    }
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Sahaay Voice server running on http://0.0.0.0:${port}`);
  });
}

startServer();
