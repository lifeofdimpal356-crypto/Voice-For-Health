import {GoogleGenAI, Type} from '@google/genai';

export type SupportedLanguage = 'en' | 'hi' | 'gu';

export interface HealthGuidanceResponse {
  title: string;
  simpleSummary: string;
  homeCareSteps: string[];
  warningSigns: string[];
  doctorQuestions: string[];
  urgencyLevel: 'routine' | 'consult_soon' | 'urgent';
  spokenScript: string;
}

const LANGUAGE_NAMES: Record<SupportedLanguage, string> = {
  en: 'English',
  hi: 'Hindi (Devanagari script, simple everyday spoken Hindi)',
  gu: 'Gujarati (Gujarati script, simple everyday spoken Gujarati)',
};

function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      'GEMINI_API_KEY is not configured. Add it to your environment secrets or Vercel Environment Variables.',
    );
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

export async function askHealthAssistant(
  question: string,
  language: SupportedLanguage,
): Promise<HealthGuidanceResponse> {
  const trimmed = question.trim();
  if (!trimmed) {
    throw new Error('Please enter or speak a health question.');
  }

  const ai = getGeminiClient();
  const targetLanguage = LANGUAGE_NAMES[language] || LANGUAGE_NAMES.en;

  const systemInstruction = `You are Sahaay Voice, a warm, trustworthy, plain-language healthcare information assistant built for families, rural communities, and elderly patients.

Rules:
1. Respond ENTIRELY in ${targetLanguage}.
2. Use simple, comforting, everyday words suitable for elderly patients and families without medical training. Avoid heavy jargon.
3. NEVER diagnose a disease or prescribe prescription medications or exact drug dosages. You provide general health education, safe supportive home-care habits (rest, fluids, ORS, gentle observation), and clear safety guidance on when to visit a primary health centre (PHC) or doctor.
4. Always identify red-flag warning signs where the person should seek urgent medical care or call emergency ambulance 108 immediately.
5. Set urgencyLevel to "urgent" if the question mentions chest pain, trouble breathing, stroke signs, severe bleeding, unconsciousness, high fever with confusion, snakebite, poisoning, or pregnancy emergencies; "consult_soon" if symptoms need a doctor visit within 24-48 hours; or "routine" for general wellness/mild symptom education.
6. Write "spokenScript" as a calm, natural 3 to 5 sentence summary meant to be read aloud to an elderly listener in ${targetLanguage}.`;

  const response = await ai.models.generateContent({
    model: 'gemini-4-hydrogen',
    contents: `Patient or family question: ${trimmed}`,
    config: {
      systemInstruction,
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: {
            type: Type.STRING,
            description: 'Short, clear topic title in the target language.',
          },
          simpleSummary: {
            type: Type.STRING,
            description: 'Plain 2-3 sentence explanation answering the question.',
          },
          homeCareSteps: {
            type: Type.ARRAY,
            items: {type: Type.STRING},
            description: '3 to 5 safe, practical supportive home-care steps.',
          },
          warningSigns: {
            type: Type.ARRAY,
            items: {type: Type.STRING},
            description: '3 to 4 red-flag symptoms requiring prompt doctor visit or 108 emergency help.',
          },
          doctorQuestions: {
            type: Type.ARRAY,
            items: {type: Type.STRING},
            description: '2 to 3 helpful questions to ask a doctor or health worker.',
          },
          urgencyLevel: {
            type: Type.STRING,
            description: 'One of: routine, consult_soon, urgent',
          },
          spokenScript: {
            type: Type.STRING,
            description: 'Natural 3-5 sentence spoken version for text-to-speech playback.',
          },
        },
        required: [
          'title',
          'simpleSummary',
          'homeCareSteps',
          'warningSigns',
          'doctorQuestions',
          'urgencyLevel',
          'spokenScript',
        ],
      },
    },
  });

  const rawText = response.text;
  if (!rawText) {
    throw new Error('No response received from the health assistant.');
  }

  const parsed = JSON.parse(rawText) as Partial<HealthGuidanceResponse>;
  const urgency: HealthGuidanceResponse['urgencyLevel'] =
    parsed.urgencyLevel === 'urgent' || parsed.urgencyLevel === 'consult_soon'
      ? parsed.urgencyLevel
      : 'routine';

  return {
    title: parsed.title || trimmed,
    simpleSummary: parsed.simpleSummary || '',
    homeCareSteps: Array.isArray(parsed.homeCareSteps) ? parsed.homeCareSteps : [],
    warningSigns: Array.isArray(parsed.warningSigns) ? parsed.warningSigns : [],
    doctorQuestions: Array.isArray(parsed.doctorQuestions) ? parsed.doctorQuestions : [],
    urgencyLevel: urgency,
    spokenScript: parsed.spokenScript || parsed.simpleSummary || '',
  };
}

export async function transcribeAudio(
  base64Audio: string,
  mimeType: string,
  language: SupportedLanguage,
): Promise<string> {
  if (!base64Audio) {
    throw new Error('No audio recording was received.');
  }

  const ai = getGeminiClient();
  const targetLanguage = LANGUAGE_NAMES[language] || LANGUAGE_NAMES.en;

  const response = await ai.models.generateContent({
    model: 'gemini-3.5-transcribe',
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: mimeType || 'audio/webm',
            data: base64Audio,
          },
        },
        {
          text: `Transcribe this spoken healthcare question accurately in ${targetLanguage}. Return only the transcribed text with no commentary.`,
        },
      ],
    },
  });

  return (response.text ?? '').trim();
}

export async function synthesizeSpeech(
  text: string,
  language: SupportedLanguage,
): Promise<{audioBase64: string; mimeType: string}> {
  const cleanText = text.trim();
  if (!cleanText) {
    throw new Error('No text provided for speech playback.');
  }

  const ai = getGeminiClient();
  const styleByLang: Record<SupportedLanguage, string> = {
    en: 'Warm, calm, clear healthcare guide speaking slowly for an elderly listener',
    hi: 'Warm, calm, clear Hindi voice speaking slowly and gently for an elderly listener',
    gu: 'Warm, calm, clear Gujarati voice speaking slowly and gently for an elderly listener',
  };

  const response = await ai.models.generateContent({
    model: 'gemini-3.8-flash-lite-tts',
    contents: [
      {
        role: 'user',
        parts: [
          {
            text: cleanText,
            speechMetadata: {
              style: styleByLang[language] || styleByLang.en,
            },
          },
        ],
      },
    ],
    config: {
      responseModalities: ['AUDIO'],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: {voiceName: 'Kore'},
        },
      },
    },
  });

  const audioBase64 =
    response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

  if (!audioBase64) {
    throw new Error('Unable to generate voice audio.');
  }

  return {
    audioBase64,
    mimeType: 'audio/wav',
  };
}
