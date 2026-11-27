import type {CommonTopic, Language} from '../types/health';

export interface TranslationCopy {
  brandName: string;
  navAsk: string;
  navTopics: string;
  navSaved: string;
  navEmergency: string;
  headerAction: string;
  heroTitle: string;
  heroSubtitle: string;
  languageLabel: string;
  textSizeLabel: string;
  textNormal: string;
  textLarge: string;
  autoSpeakLabel: string;
  tapToSpeak: string;
  listeningNow: string;
  transcribingAudio: string;
  tapToStop: string;
  orTypeBelow: string;
  questionPlaceholder: string;
  askButton: string;
  gettingAnswer: string;
  clearButton: string;
  quickPromptsHeading: string;
  emptyHeading: string;
  emptyDescription: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  listenButton: string;
  loadingVoice: string;
  stopVoiceButton: string;
  saveNoteButton: string;
  savedNoteButton: string;
  urgencyRoutine: string;
  urgencyConsultSoon: string;
  urgencyUrgent: string;
  summaryHeading: string;
  homeCareHeading: string;
  warningSignsHeading: string;
  doctorQuestionsHeading: string;
  disclaimerText: string;
  topicsTitle: string;
  topicsSubtitle: string;
  askThisTopic: string;
  savedTitle: string;
  savedSubtitle: string;
  savedEmpty: string;
  openNote: string;
  deleteNote: string;
  emergencyTitle: string;
  emergencySubtitle: string;
  callNow: string;
  redFlagsTitle: string;
  redFlagsList: string[];
  helplines: Array<{
    number: string;
    name: string;
    description: string;
  }>;
  micPermissionError: string;
  micUnsupportedError: string;
  quickQuestions: string[];
}

export const TRANSLATIONS: Record<Language, TranslationCopy> = {
  en: {
    brandName: 'Sahaay Voice',
    navAsk: 'Ask Voice',
    navTopics: 'Common Topics',
    navSaved: 'Saved Notes',
    navEmergency: 'Emergency Help',
    headerAction: 'Emergency 108',
    heroTitle: 'Simple healthcare answers in your own voice',
    heroSubtitle:
      'Speak or type any everyday health question in English, Hindi, or Gujarati. Clear steps for families and elderly patients.',
    languageLabel: 'Language',
    textSizeLabel: 'Text size',
    textNormal: 'Standard',
    textLarge: 'Large',
    autoSpeakLabel: 'Read answers aloud',
    tapToSpeak: 'Tap to Speak',
    listeningNow: 'Listening...',
    transcribingAudio: 'Understanding your voice...',
    tapToStop: 'Tap to Stop',
    orTypeBelow: 'Or type your question below',
    questionPlaceholder:
      'Example: My grandfather has a mild fever and cough since yesterday. What care helps at home?',
    askButton: 'Get Simple Guidance',
    gettingAnswer: 'Preparing guidance...',
    clearButton: 'Clear',
    quickPromptsHeading: 'Common questions to try',
    emptyHeading: 'Ask a health question anytime',
    emptyDescription:
      'Tap the microphone button and speak naturally, or select a common topic. Sahaay Voice explains home care and when to visit a doctor.',
    step1Title: '1. Speak or type',
    step1Desc: 'Ask in English, Hindi, or Gujarati in your own words.',
    step2Title: '2. Listen or read',
    step2Desc: 'Get simple home-care steps in large, readable text and clear voice.',
    step3Title: '3. Know when to visit a clinic',
    step3Desc: 'See warning signs clearly so your family stays safe.',
    listenButton: 'Listen Aloud',
    loadingVoice: 'Preparing voice...',
    stopVoiceButton: 'Stop Voice',
    saveNoteButton: 'Save Note',
    savedNoteButton: 'Saved',
    urgencyRoutine: 'General Care Guidance',
    urgencyConsultSoon: 'See a Doctor Soon',
    urgencyUrgent: 'Urgent Medical Attention Recommended',
    summaryHeading: 'Simple Explanation',
    homeCareHeading: 'Safe Home Care Steps',
    warningSignsHeading: 'When to See a Doctor Immediately',
    doctorQuestionsHeading: 'Questions to Ask Your Doctor',
    disclaimerText:
      'Informational support only — Sahaay Voice does not diagnose illness or prescribe medicine. Always consult a qualified doctor or primary health centre for medical decisions.',
    topicsTitle: 'Common Family Health Topics',
    topicsSubtitle:
      'Tap any card to get clear, easy-to-understand guidance in your chosen language.',
    askThisTopic: 'Read Guidance',
    savedTitle: 'Saved Care Notes',
    savedSubtitle:
      'Notes saved on this device so family members can review or listen to them again.',
    savedEmpty:
      'No saved notes yet. Ask a question and tap Save Note to keep it here for your family.',
    openNote: 'Open Note',
    deleteNote: 'Remove',
    emergencyTitle: 'Emergency Help & Warning Signs',
    emergencySubtitle:
      'If someone is in sudden danger, do not wait for online answers. Call local emergency services or visit the nearest hospital.',
    callNow: 'Call',
    redFlagsTitle: 'Seek Urgent Care Immediately If You Notice',
    redFlagsList: [
      'Chest pain, tightness, or pain spreading to the arm, jaw, or back',
      'Difficulty breathing, gasping, or bluish lips and fingertips',
      'Sudden weakness on one side of the face or body, or slurred speech',
      'Heavy bleeding, severe burns, poisoning, or snakebite',
      'Unconsciousness, seizures, or high fever with confusion in elders or children',
    ],
    helplines: [
      {
        number: '108',
        name: 'Ambulance & Medical Emergency',
        description: 'Free 24/7 emergency ambulance service across most Indian states.',
      },
      {
        number: '104',
        name: 'Health Information Helpline',
        description: '24/7 medical advice and primary health centre guidance.',
      },
      {
        number: '112',
        name: 'National Emergency Number',
        description: 'Unified emergency helpline for police, fire, and medical rescue.',
      },
    ],
    micPermissionError:
      'Microphone access was blocked. Please allow microphone permission in your browser settings, or type your question below.',
    micUnsupportedError:
      'Voice recording is not supported in this browser. Please type your question below.',
    quickQuestions: [
      'What should we feed someone with loose motions and weakness?',
      'How to care for mild fever and body ache in an elderly parent?',
      'What foods help keep blood pressure steady at home?',
    ],
  },
  hi: {
    brandName: 'Sahaay Voice',
    navAsk: 'आवाज़ से पूछें',
    navTopics: 'सामान्य विषय',
    navSaved: 'सहेजे गए नोट्स',
    navEmergency: 'आपातकालीन मदद',
    headerAction: 'आपातकाल 108',
    heroTitle: 'अपनी आवाज़ में सरल स्वास्थ्य जानकारी',
    heroSubtitle:
      'अंग्रेज़ी, हिन्दी या गुजराती में बोलकर या लिखकर स्वास्थ्य सवाल पूछें। परिवार और बुजुर्गों के लिए आसान और सुरक्षित मार्गदर्शन।',
    languageLabel: 'भाषा',
    textSizeLabel: 'अक्षर आकार',
    textNormal: 'सामान्य',
    textLarge: 'बड़ा',
    autoSpeakLabel: 'उत्तर बोलकर सुनाएँ',
    tapToSpeak: 'बोलने के लिए दबाएँ',
    listeningNow: 'सुन रहे हैं...',
    transcribingAudio: 'आपकी आवाज़ समझ रहे हैं...',
    tapToStop: 'रोकने के लिए दबाएँ',
    orTypeBelow: 'या नीचे अपना सवाल लिखें',
    questionPlaceholder:
      'उदाहरण: दादाजी को कल से हल्का बुखार और खांसी है। घर पर क्या देखभाल करें?',
    askButton: 'सरल सलाह प्राप्त करें',
    gettingAnswer: 'जानकारी तैयार हो रही है...',
    clearButton: 'साफ़ करें',
    quickPromptsHeading: 'पूछने के लिए सामान्य सवाल',
    emptyHeading: 'कभी भी स्वास्थ्य सवाल पूछें',
    emptyDescription:
      'माइक बटन दबाकर आराम से बोलें या नीचे कोई विषय चुनें। सहाय वॉइस घर की देखभाल और डॉक्टर को दिखाने के संकेत सरल भाषा में बताता है।',
    step1Title: '1. बोलें या लिखें',
    step1Desc: 'हिन्दी, गुजराती या अंग्रेज़ी में अपने शब्दों में पूछें।',
    step2Title: '2. सुनें या पढ़ें',
    step2Desc: 'बड़े अक्षरों और स्पष्ट आवाज़ में घरेलू देखभाल के उपाय जानें।',
    step3Title: '3. डॉक्टर से कब मिलें',
    step3Desc: 'खतरे के संकेतों को समय पर पहचानें और सुरक्षित रहें।',
    listenButton: 'सुनें',
    loadingVoice: 'आवाज़ तैयार हो रही है...',
    stopVoiceButton: 'आवाज़ रोकें',
    saveNoteButton: 'नोट सहेजें',
    savedNoteButton: 'सहेजा गया',
    urgencyRoutine: 'सामान्य देखभाल जानकारी',
    urgencyConsultSoon: 'जल्द डॉक्टर को दिखाएँ',
    urgencyUrgent: 'तुरंत चिकित्सा सहायता लें',
    summaryHeading: 'सरल समझ',
    homeCareHeading: 'घर पर सुरक्षित देखभाल',
    warningSignsHeading: 'तुरंत डॉक्टर को कब दिखाएँ',
    doctorQuestionsHeading: 'डॉक्टर से पूछने योग्य सवाल',
    disclaimerText:
      'यह केवल जानकारी के लिए है — सहाय वॉइस बीमारी की जाँच या दवा की पर्ची नहीं देता। किसी भी इलाज या दवा के लिए कृपया डॉक्टर या नज़दीकी स्वास्थ्य केंद्र से सलाह लें।',
    topicsTitle: 'परिवार के सामान्य स्वास्थ्य विषय',
    topicsSubtitle:
      'सरल भाषा में जानकारी पाने के लिए नीचे दिए गए किसी भी विषय को चुनें।',
    askThisTopic: 'जानकारी पढ़ें',
    savedTitle: 'सहेजे गए स्वास्थ्य नोट्स',
    savedSubtitle:
      'आपके फ़ोन या कंप्यूटर पर सहेजे गए नोट्स ताकि परिवार के सदस्य दोबारा पढ़ या सुन सकें।',
    savedEmpty:
      'अभी कोई नोट सहेजा नहीं गया है। कोई सवाल पूछें और "नोट सहेजें" दबाएँ।',
    openNote: 'खोलें',
    deleteNote: 'हटाएँ',
    emergencyTitle: 'आपातकालीन मदद और खतरे के संकेत',
    emergencySubtitle:
      'यदि किसी की तबीयत अचानक गंभीर हो, तो इंतज़ार न करें। तुरंत एम्बुलेंस बुलाएँ या नज़दीकी अस्पताल जाएँ।',
    callNow: 'कॉल करें',
    redFlagsTitle: 'ये लक्षण दिखें तो तुरंत अस्पताल जाएँ',
    redFlagsList: [
      'सीने में दर्द, भारीपन या बांह, जबड़े या पीठ तक दर्द फैलना',
      'सांस लेने में तकलीफ़, हांफना या होंठ-उंगलियों का नीला पड़ना',
      'चेहरे या शरीर के एक हिस्से में अचानक कमजोरी या बोलने में लड़खड़ाहट',
      'तेज़ खून बहना, गंभीर जलना, ज़हर निगलना या सांप का काटना',
      'बेहोशी, दौरे आना या बुजुर्गों व बच्चों में तेज़ बुखार के साथ घबराहट/भ्रम',
    ],
    helplines: [
      {
        number: '108',
        name: 'एम्बुलेंस और चिकित्सा आपातकाल',
        description: 'अधिकांश भारतीय राज्यों में 24 घंटे मुफ़्त आपातकालीन एम्बुलेंस सेवा।',
      },
      {
        number: '104',
        name: 'स्वास्थ्य सलाह हेल्पलाइन',
        description: '24 घंटे चिकित्सीय जानकारी और प्राथमिक स्वास्थ्य केंद्र मार्गदर्शन।',
      },
      {
        number: '112',
        name: 'राष्ट्रीय आपातकालीन नंबर',
        description: 'पुलिस, अग्निशमन और चिकित्सा सहायता के लिए एकीकृत नंबर।',
      },
    ],
    micPermissionError:
      'माइक्रोफ़ोन की अनुमति नहीं मिली। कृपया ब्राउज़र सेटिंग से अनुमति दें या नीचे लिखकर पूछें।',
    micUnsupportedError:
      'इस ब्राउज़र में वॉइस रिकॉर्डिंग उपलब्ध नहीं है। कृपया नीचे अपना सवाल लिखें।',
    quickQuestions: [
      'दस्त और कमजोरी होने पर घर में क्या खाना-पीना देना चाहिए?',
      'बुजुर्ग माता-पिता को हल्का बुखार और शरीर दर्द हो तो क्या देखभाल करें?',
      'ब्लड प्रेशर संतुलित रखने के लिए घर का खानपान कैसा होना चाहिए?',
    ],
  },
  gu: {
    brandName: 'Sahaay Voice',
    navAsk: 'અવાજથી પૂછો',
    navTopics: 'સામાન્ય વિષયો',
    navSaved: 'સાચવેલી નોંધ',
    navEmergency: 'કટોકટી મદદ',
    headerAction: 'કટોકટી 108',
    heroTitle: 'તમારા પોતાના અવાજમાં સરળ આરોગ્ય માહિતી',
    heroSubtitle:
      'ગુજરાતી, હિન્દી અથવા અંગ્રેજીમાં બોલીને કે લખીને આરોગ્ય પ્રશ્ન પૂછો. પરિવાર અને વડીલો માટે સરળ અને વિશ્વસનીય માર્ગદર્શન.',
    languageLabel: 'ભાષા',
    textSizeLabel: 'અક્ષરનું કદ',
    textNormal: 'સામાન્ય',
    textLarge: 'મોટા',
    autoSpeakLabel: 'જવાબ વાંચી સંભળાવો',
    tapToSpeak: 'બોલવા માટે દબાવો',
    listeningNow: 'સાંભળી રહ્યા છીએ...',
    transcribingAudio: 'તમારો અવાજ સમજી રહ્યા છીએ...',
    tapToStop: 'રોકવા માટે દબાવો',
    orTypeBelow: 'અથવા નીચે તમારો પ્રશ્ન લખો',
    questionPlaceholder:
      'ઉદાહરણ: દાદાને ગઈકાલથી હળવો તાવ અને ઉધરસ છે. ઘરે શું કાળજી લેવી?',
    askButton: 'સરળ માર્ગદર્શન મેળવો',
    gettingAnswer: 'માહિતી તૈયાર થઈ રહી છે...',
    clearButton: 'સાફ કરો',
    quickPromptsHeading: 'પૂછવા માટે સામાન્ય પ્રશ્નો',
    emptyHeading: 'ગમે ત્યારે આરોગ્ય પ્રશ્ન પૂછો',
    emptyDescription:
      'માઇક બટન દબાવીને આરામથી બોલો અથવા કોઈ વિષય પસંદ કરો. સહાય વોઇસ ઘરની સંભાળ અને ડૉક્ટરને ક્યારે મળવું તે સરળ રીતે સમજાવે છે.',
    step1Title: '1. બોલો અથવા લખો',
    step1Desc: 'ગુજરાતી, હિન્દી કે અંગ્રેજીમાં તમારા શબ્દોમાં પૂછો.',
    step2Title: '2. સાંભળો અથવા વાંચો',
    step2Desc: 'મોટા અક્ષરો અને સ્પષ્ટ અવાજમાં ઘરેલુ સંભાળના પગલાં જાણો.',
    step3Title: '3. ડૉક્ટરને ક્યારે મળવું',
    step3Desc: 'ચેતવણીના લક્ષણો સમયસર ઓળખો અને સુરક્ષિત રહો.',
    listenButton: 'સાંભળો',
    loadingVoice: 'અવાજ તૈયાર થાય છે...',
    stopVoiceButton: 'અવાજ બંધ કરો',
    saveNoteButton: 'નોંધ સાચવો',
    savedNoteButton: 'સાચવેલ',
    urgencyRoutine: 'સામાન્ય સંભાળ માહિતી',
    urgencyConsultSoon: 'જલ્દી ડૉક્ટરને બતાવો',
    urgencyUrgent: 'તાત્કાલિક તબીબી મદદ લો',
    summaryHeading: 'સરળ સમજૂતી',
    homeCareHeading: 'ઘરે સુરક્ષિત સંભાળના પગલાં',
    warningSignsHeading: 'તાત્કાલિક ડૉક્ટરને ક્યારે બતાવવું',
    doctorQuestionsHeading: 'ડૉક્ટરને પૂછવાના પ્રશ્નો',
    disclaimerText:
      'આ માત્ર માહિતી માટે છે — સહાય વોઇસ રોગનું નિદાન કે દવા લખી આપતું નથી. કોઈપણ સારવાર માટે કૃપા કરીને ડૉક્ટર અથવા નજીકના આરોગ્ય કેન્દ્રની સલાહ લો.',
    topicsTitle: 'પરિવારના સામાન્ય આરોગ્ય વિષયો',
    topicsSubtitle:
      'સરળ ભાષામાં માર્ગદર્શન મેળવવા માટે નીચેનામાંથી કોઈપણ વિષય પસંદ કરો.',
    askThisTopic: 'માર્ગદર્શન વાંચો',
    savedTitle: 'સાચવેલી આરોગ્ય નોંધો',
    savedSubtitle:
      'તમારા ઉપકરણ પર સાચવેલી નોંધો જેથી પરિવારના સભ્યો ફરીથી વાંચી કે સાંભળી શકે.',
    savedEmpty:
      'હજુ સુધી કોઈ નોંધ સાચવેલી નથી. પ્રશ્ન પૂછો અને "નોંધ સાચવો" દબાવો.',
    openNote: 'ખોલો',
    deleteNote: 'દૂર કરો',
    emergencyTitle: 'કટોકટી મદદ અને ચેતવણીના લક્ષણો',
    emergencySubtitle:
      'જો કોઈની તબિયત અચાનક ગંભીર હોય, તો રાહ ન જુઓ. તરત એમ્બ્યુલન્સ બોલાવો અથવા નજીકની હોસ્પિટલે જાઓ.',
    callNow: 'કૉલ કરો',
    redFlagsTitle: 'આ લક્ષણો દેખાય તો તરત હોસ્પિટલ જાઓ',
    redFlagsList: [
      'છાતીમાં દુખાવો, ભારેપણું અથવા હાથ, જડબા કે પીઠમાં દુખાવો ફેલાવો',
      'શ્વાસ લેવામાં તકલીફ, હાંફ ચઢવી અથવા હોઠ-આંગળીઓ ભૂરા પડવા',
      'ચહેરા કે શરીરની એક બાજુ અચાનક નબળાઈ અથવા બોલવામાં લથડવું',
      'વધુ પડતું લોહી વહેવું, ગંભીર દાઝવું, ઝેર પીવું કે સાપ કરડવો',
      'બેભાન થવું, ખેંચ આવવી અથવા વડીલો કે બાળકોમાં વધુ તાવ સાથે મૂંઝવણ',
    ],
    helplines: [
      {
        number: '108',
        name: 'એમ્બ્યુલન્સ અને તબીબી કટોકટી',
        description: 'મોટાભાગના ભારતીય રાજ્યોમાં 24 કલાક મફત કટોકટી એમ્બ્યુલન્સ સેવા.',
      },
      {
        number: '104',
        name: 'આરોગ્ય માહિતી હેલ્પલાઇન',
        description: '24 કલાક તબીબી સલાહ અને પ્રાથમિક આરોગ્ય કેન્દ્ર માર્ગદર્શન.',
      },
      {
        number: '112',
        name: 'રાષ્ટ્રીય કટોકટી નંબર',
        description: 'પોલીસ, ફાયર અને તબીબી મદદ માટે એકીકૃત કટોકટી નંબર.',
      },
    ],
    micPermissionError:
      'માઇક્રોફોનની પરવાનગી મળી નથી. કૃપા કરીને બ્રાઉઝર સેટિંગ્સમાંથી મંજૂરી આપો અથવા નીચે લખો.',
    micUnsupportedError:
      'આ બ્રાઉઝરમાં અવાજ રેકોર્ડિંગ ઉપલબ્ધ નથી. કૃપા કરીને નીચે તમારો પ્રશ્ન લખો.',
    quickQuestions: [
      'ઝાડા અને નબળાઈ હોય ત્યારે ઘરે શું ખાવું-પીવું જોઈએ?',
      'વડીલોને હળવો તાવ અને શરીરનો દુખાવો હોય તો ઘરે શું કાળજી લેવી?',
      'બ્લડ પ્રેશર સંતુલિત રાખવા ઘરે કેવો ખોરાક લેવો જોઈએ?',
    ],
  },
};

export const COMMON_TOPICS: Record<Language, CommonTopic[]> = {
  en: [
    {
      id: 'fever',
      category: 'Seasonal Care',
      title: 'Fever, Cough & Cold Care',
      summary: 'Hydration, rest, temperature checks, and warning signs for elders and children.',
      prompt: 'How should a family safely care for mild fever, cold, and cough at home, and when should we visit a doctor?',
    },
    {
      id: 'ors',
      category: 'Stomach & Hydration',
      title: 'Stomach Upset & ORS Guide',
      summary: 'How to prevent dehydration during loose motions or vomiting using safe fluids.',
      prompt: 'How do we make and give ORS safely at home for loose motions or dehydration, and what warning signs mean hospital care is needed?',
    },
    {
      id: 'bp-sugar',
      category: 'Chronic Care',
      title: 'Blood Pressure & Sugar Habits',
      summary: 'Daily routine, salt and meal balance, regular checkups, and medicine timing.',
      prompt: 'What simple daily habits help elderly parents manage high blood pressure and diabetes safely at home?',
    },
    {
      id: 'joints',
      category: 'Elder Mobility',
      title: 'Knee, Joint & Back Pain',
      summary: 'Gentle movement, warm compresses, fall prevention, and when pain needs evaluation.',
      prompt: 'What safe home habits help relieve knee and joint stiffness in older adults, and when should a doctor check it?',
    },
    {
      id: 'medicine-safety',
      category: 'Medicine Safety',
      title: 'Safe Medicine Habits',
      summary: 'Organizing daily pills, avoiding double doses, and questions for the pharmacist.',
      prompt: 'How can families help elderly parents take daily medicines safely without missing or doubling doses?',
    },
    {
      id: 'maternal-child',
      category: 'Family Health',
      title: 'Mother & Child Nutrition',
      summary: 'Iron-rich foods, clean water, vaccination reminders, and growth checkups.',
      prompt: 'What simple home nutrition and checkup habits support pregnant mothers and young children in rural families?',
    },
  ],
  hi: [
    {
      id: 'fever',
      category: 'मौसमी देखभाल',
      title: 'बुखार, खांसी और जुकाम',
      summary: 'आराम, गुनगुना पानी, तापमान की जाँच और डॉक्टर को दिखाने के संकेत।',
      prompt: 'हल्के बुखार, खांसी और जुकाम में घर पर सुरक्षित देखभाल कैसे करें और डॉक्टर को कब दिखाना चाहिए?',
    },
    {
      id: 'ors',
      category: 'पेट और पानी की कमी',
      title: 'दस्त और ओआरएस (ORS) की सही विधि',
      summary: 'उल्टी या दस्त में शरीर में पानी की कमी रोकने का सुरक्षित तरीका।',
      prompt: 'दस्त या उल्टी में घर पर ओआरएस घोल सही तरीके से कैसे दें और किन संकेतों पर तुरंत अस्पताल जाना चाहिए?',
    },
    {
      id: 'bp-sugar',
      category: 'नियमित देखभाल',
      title: 'ब्लड प्रेशर और शुगर की देखभाल',
      summary: 'कम नमक, समय पर भोजन, नियमित जाँच और दवा के समय का ध्यान।',
      prompt: 'बुजुर्ग माता-पिता के ब्लड प्रेशर और शुगर को घर पर सुरक्षित तरीके से संभालने की आसान आदतें क्या हैं?',
    },
    {
      id: 'joints',
      category: 'बुजुर्गों की देखभाल',
      title: 'घुटने, जोड़ और कमर का दर्द',
      summary: 'हल्की सिकाई, सुरक्षित चलना-फिरना और घर में गिरने से बचाव।',
      prompt: 'बुजुर्गों में घुटनों और जोड़ों के दर्द में घर पर क्या सुरक्षित आराम मिल सकता है और डॉक्टर को कब दिखाएँ?',
    },
    {
      id: 'medicine-safety',
      category: 'दवा सुरक्षा',
      title: 'रोज़ की दवाइयों की सही आदत',
      summary: 'दवा का समय याद रखना, दोहरी खुराक से बचना और सुरक्षित रखरखाव।',
      prompt: 'परिवार के बुजुर्ग अपनी रोज़ की दवाइयाँ बिना भूले और सुरक्षित तरीके से कैसे ले सकते हैं?',
    },
    {
      id: 'maternal-child',
      category: 'मातृ एवं शिशु',
      title: 'माँ और बच्चे का पोषण',
      summary: 'आयरन युक्त आहार, साफ़ पानी, टीकाकरण और नियमित जाँच।',
      prompt: 'गर्भवती महिलाओं और छोटे बच्चों के स्वास्थ्य के लिए घर पर कौन-सा सरल पोषण और जाँच ज़रूरी है?',
    },
  ],
  gu: [
    {
      id: 'fever',
      category: 'મોસમી સંભાળ',
      title: 'તાવ, ઉધરસ અને શરદી',
      summary: 'આરામ, પાણી પીવું, તાવ માપવો અને ડૉક્ટરને બતાવવાના સંકેતો.',
      prompt: 'હળવા તાવ, શરદી અને ઉધરસમાં ઘરે સુરક્ષિત સંભાળ કેવી રીતે લેવી અને ડૉક્ટરને ક્યારે બતાવવું?',
    },
    {
      id: 'ors',
      category: 'પેટ અને પાણીની કમી',
      title: 'ઝાડા-ઊલટી અને ORS માર્ગદર્શન',
      summary: 'શરીરમાં પાણી ઓછું ન થાય તે માટે ORS આપવાની સાચી રીત.',
      prompt: 'ઝાડા કે ઊલટીમાં ઘરે ORS કેવી રીતે આપવું અને કયા લક્ષણો દેખાય તો તરત હોસ્પિટલ જવું જોઈએ?',
    },
    {
      id: 'bp-sugar',
      category: 'નિયમિત સંભાળ',
      title: 'બ્લડ પ્રેશર અને ડાયાબિટીસ સંભાળ',
      summary: 'ઓછું મીઠું, સમયસર ભોજન, નિયમિત તપાસ અને દવાનો સમય.',
      prompt: 'વડીલોના બ્લડ પ્રેશર અને શુગરને ઘરે સુરક્ષિત રીતે સંભાળવા માટે કઈ સરળ આદતો મદદરૂપ છે?',
    },
    {
      id: 'joints',
      category: 'વડીલોની સંભાળ',
      title: 'ઘૂંટણ, સાંધા અને કમરનો દુખાવો',
      summary: 'હળવો શેક, સુરક્ષિત હલનચલન અને ઘરમાં લપસી પડવાથી બચાવ.',
      prompt: 'વડીલોમાં ઘૂંટણ અને સાંધાના દુખાવામાં ઘરે કઈ સુરક્ષિત રાહત મળી શકે અને ડૉક્ટરને ક્યારે બતાવવું?',
    },
    {
      id: 'medicine-safety',
      category: 'દવાની સુરક્ષા',
      title: 'રોજિંદી દવાઓની સુરક્ષિત આદત',
      summary: 'દવાનો સમય યાદ રાખવો અને ભૂલથી બે વાર દવા લેવાથી બચવું.',
      prompt: 'પરિવારના વડીલો પોતાની રોજિંદી દવાઓ ભૂલ્યા વિના અને સુરક્ષિત રીતે કેવી રીતે લઈ શકે?',
    },
    {
      id: 'maternal-child',
      category: 'માતા અને બાળક',
      title: 'માતા અને બાળકનું પોષણ',
      summary: 'લોહતત્વવાળો ખોરાક, સ્વચ્છ પાણી, રસીકરણ અને નિયમિત તપાસ.',
      prompt: 'સગર્ભા માતાઓ અને નાના બાળકોના સારા સ્વાસ્થ્ય માટે ઘરે કયું સરળ પોષણ અને તપાસ જરૂરી છે?',
    },
  ],
};
