export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  region: string;
}

export const languages: Language[] = [
  // English (Default)
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', region: 'Global' },
  
  // Southern African Languages
  { code: 'sn', name: 'Shona', nativeName: 'ChiShona', flag: '🇿🇼', region: 'Zimbabwe' },
  { code: 'nd', name: 'Ndebele', nativeName: 'IsiNdebele', flag: '🇿🇼', region: 'Zimbabwe' },
  { code: 'zu', name: 'Zulu', nativeName: 'IsiZulu', flag: '🇿🇦', region: 'South Africa' },
  { code: 'xh', name: 'Xhosa', nativeName: 'IsiXhosa', flag: '🇿🇦', region: 'South Africa' },
  { code: 'af', name: 'Afrikaans', nativeName: 'Afrikaans', flag: '🇿🇦', region: 'South Africa' },
  { code: 'st', name: 'Sotho', nativeName: 'Sesotho', flag: '🇿🇦', region: 'South Africa' },
  { code: 'tn', name: 'Tswana', nativeName: 'Setswana', flag: '🇧🇼', region: 'Botswana' },
  { code: 've', name: 'Venda', nativeName: 'Tshivenda', flag: '🇿🇦', region: 'South Africa' },
  { code: 'ts', name: 'Tsonga', nativeName: 'Xitsonga', flag: '🇿🇦', region: 'South Africa' },
  
  // East African Languages
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', flag: '🇰🇪', region: 'East Africa' },
  { code: 'am', name: 'Amharic', nativeName: 'አማርኛ', flag: '🇪🇹', region: 'Ethiopia' },
  { code: 'om', name: 'Oromo', nativeName: 'Afaan Oromoo', flag: '🇪🇹', region: 'Ethiopia' },
  { code: 'ti', name: 'Tigrinya', nativeName: 'ትግርኛ', flag: '🇪🇹', region: 'Ethiopia' },
  { code: 'rw', name: 'Kinyarwanda', nativeName: 'Ikinyarwanda', flag: '🇷🇼', region: 'Rwanda' },
  { code: 'rn', name: 'Kirundi', nativeName: 'Ikirundi', flag: '🇧🇮', region: 'Burundi' },
  { code: 'lg', name: 'Luganda', nativeName: 'Oluganda', flag: '🇺🇬', region: 'Uganda' },
  { code: 'luo', name: 'Luo', nativeName: 'Dholuo', flag: '🇰🇪', region: 'Kenya' },
  { code: 'kik', name: 'Kikuyu', nativeName: 'Gĩkũyũ', flag: '🇰🇪', region: 'Kenya' },
  
  // West African Languages
  { code: 'yo', name: 'Yoruba', nativeName: 'Yorùbá', flag: '🇳🇬', region: 'Nigeria' },
  { code: 'ig', name: 'Igbo', nativeName: 'Asụsụ Igbo', flag: '🇳🇬', region: 'Nigeria' },
  { code: 'ha', name: 'Hausa', nativeName: 'Harshen Hausa', flag: '🇳🇬', region: 'Nigeria' },
  { code: 'ff', name: 'Fulani', nativeName: 'Fulfulde', flag: '🇳🇬', region: 'West Africa' },
  { code: 'tw', name: 'Twi', nativeName: 'Twi', flag: '🇬🇭', region: 'Ghana' },
  { code: 'ak', name: 'Akan', nativeName: 'Akan', flag: '🇬🇭', region: 'Ghana' },
  { code: 'ee', name: 'Ewe', nativeName: 'Eʋegbe', flag: '🇬🇭', region: 'Ghana' },
  { code: 'wo', name: 'Wolof', nativeName: 'Wolof', flag: '🇸🇳', region: 'Senegal' },
  { code: 'bm', name: 'Bambara', nativeName: 'Bamanankan', flag: '🇲🇱', region: 'Mali' },
  { code: 'mos', name: 'Mossi', nativeName: 'Mooré', flag: '🇧🇫', region: 'Burkina Faso' },
  
  // North African Languages
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇪🇬', region: 'North Africa' },
  { code: 'ber', name: 'Berber', nativeName: 'Tamazight', flag: '🇲🇦', region: 'Morocco' },
  { code: 'kab', name: 'Kabyle', nativeName: 'Taqbaylit', flag: '🇩🇿', region: 'Algeria' },
  
  // Central African Languages
  { code: 'ln', name: 'Lingala', nativeName: 'Lingála', flag: '🇨🇩', region: 'DRC' },
  { code: 'kg', name: 'Kikongo', nativeName: 'Kikongo', flag: '🇨🇩', region: 'DRC' },
  { code: 'lua', name: 'Luba', nativeName: 'Tshiluba', flag: '🇨🇩', region: 'DRC' },
  { code: 'sg', name: 'Sango', nativeName: 'Sängö', flag: '🇨🇫', region: 'CAR' },
  
  // Portuguese-speaking Africa
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹', region: 'Lusophone Africa' },
  { code: 'umb', name: 'Umbundu', nativeName: 'Umbundu', flag: '🇦🇴', region: 'Angola' },
  { code: 'kmb', name: 'Kimbundu', nativeName: 'Kimbundu', flag: '🇦🇴', region: 'Angola' },
  
  // French-speaking Africa
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', region: 'Francophone Africa' },
  
  // Other Major Languages
  { code: 'mg', name: 'Malagasy', nativeName: 'Malagasy', flag: '🇲🇬', region: 'Madagascar' },
  { code: 'ny', name: 'Chichewa', nativeName: 'Chichewa', flag: '🇲🇼', region: 'Malawi' },
  { code: 'bem', name: 'Bemba', nativeName: 'Ichibemba', flag: '🇿🇲', region: 'Zambia' },
  { code: 'ton', name: 'Tonga', nativeName: 'Chitonga', flag: '🇿🇲', region: 'Zambia' }
];

// Language translations for common UI elements
export const translations: Record<string, Record<string, string>> = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    wallet: 'Wallet',
    chama: 'Group Savings',
    exchange: 'Exchange',
    invest: 'Invest',
    remit: 'Remittance',
    settings: 'Security',
    
    // Common actions
    send: 'Send',
    receive: 'Receive',
    add: 'Add',
    cancel: 'Cancel',
    confirm: 'Confirm',
    continue: 'Continue',
    back: 'Back',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    
    // Financial terms
    balance: 'Balance',
    amount: 'Amount',
    currency: 'Currency',
    exchange_rate: 'Exchange Rate',
    fee: 'Fee',
    total: 'Total',
    transaction: 'Transaction',
    investment: 'Investment',
    savings: 'Savings',
    
    // Status
    pending: 'Pending',
    completed: 'Completed',
    failed: 'Failed',
    active: 'Active',
    inactive: 'Inactive',
    
    // Greetings
    welcome: 'Welcome',
    good_morning: 'Good Morning',
    good_afternoon: 'Good Afternoon',
    good_evening: 'Good Evening'
  },
  
  sn: {
    // Navigation (Shona)
    dashboard: 'Bhodhi Rekutonga',
    wallet: 'Chikwama',
    chama: 'Kubatana Kwemari',
    exchange: 'Kuchinja Mari',
    invest: 'Kudyara Mari',
    remit: 'Kutumira Mari',
    settings: 'Chengetedzo',
    
    // Common actions
    send: 'Tumira',
    receive: 'Gamuchira',
    add: 'Wedzera',
    cancel: 'Dzima',
    confirm: 'Simbisa',
    continue: 'Enderera',
    back: 'Dzokera',
    save: 'Chengetedza',
    edit: 'Gadzirisa',
    delete: 'Bvisa',
    
    // Financial terms
    balance: 'Mari Yasara',
    amount: 'Huwandu',
    currency: 'Rudzi Rwemari',
    exchange_rate: 'Mutengo Wekuchinja',
    fee: 'Muripo',
    total: 'Zvose',
    transaction: 'Kutengeserana',
    investment: 'Kudyara',
    savings: 'Kuchengetedza',
    
    // Status
    pending: 'Kumirira',
    completed: 'Zvapera',
    failed: 'Zvakundikana',
    active: 'Zvichishanda',
    inactive: 'Zvisina Kushanda',
    
    // Greetings
    welcome: 'Mauya',
    good_morning: 'Mangwanani',
    good_afternoon: 'Masikati',
    good_evening: 'Manheru'
  },
  
  nd: {
    // Navigation (Ndebele)
    dashboard: 'Ibhodi Lokulawula',
    wallet: 'Isikhwama',
    chama: 'Ukuhlanganisa Imali',
    exchange: 'Ukushintsha Imali',
    invest: 'Ukutshala Imali',
    remit: 'Ukuthumela Imali',
    settings: 'Ukuvikeleka',
    
    // Common actions
    send: 'Thumela',
    receive: 'Amukela',
    add: 'Engeza',
    cancel: 'Khansela',
    confirm: 'Qinisekisa',
    continue: 'Qhubeka',
    back: 'Buyela',
    save: 'Gcina',
    edit: 'Hlela',
    delete: 'Susa',
    
    // Financial terms
    balance: 'Imali Eseleyo',
    amount: 'Inani',
    currency: 'Uhlobo Lwemali',
    exchange_rate: 'Intengo Yokushintsha',
    fee: 'Inkokhelo',
    total: 'Konke',
    transaction: 'Ukuthenga',
    investment: 'Ukutshala',
    savings: 'Ukonga',
    
    // Status
    pending: 'Kulindile',
    completed: 'Kuphelile',
    failed: 'Kuhlulekile',
    active: 'Kusebenza',
    inactive: 'Akusebenzi',
    
    // Greetings
    welcome: 'Siyakwamukela',
    good_morning: 'Livuke Kuhle',
    good_afternoon: 'Litshone Kuhle',
    good_evening: 'Lihle Kakhulu'
  },
  
  sw: {
    // Navigation (Swahili)
    dashboard: 'Dashibodi',
    wallet: 'Mkoba',
    chama: 'Akiba za Kikundi',
    exchange: 'Kubadilishana',
    invest: 'Uwekezaji',
    remit: 'Kutuma Pesa',
    settings: 'Usalama',
    
    // Common actions
    send: 'Tuma',
    receive: 'Pokea',
    add: 'Ongeza',
    cancel: 'Ghairi',
    confirm: 'Thibitisha',
    continue: 'Endelea',
    back: 'Rudi',
    save: 'Hifadhi',
    edit: 'Hariri',
    delete: 'Futa',
    
    // Financial terms
    balance: 'Salio',
    amount: 'Kiasi',
    currency: 'Sarafu',
    exchange_rate: 'Kiwango cha Ubadilishaji',
    fee: 'Ada',
    total: 'Jumla',
    transaction: 'Muamala',
    investment: 'Uwekezaji',
    savings: 'Akiba',
    
    // Status
    pending: 'Inasubiri',
    completed: 'Imekamilika',
    failed: 'Imeshindwa',
    active: 'Inafanya Kazi',
    inactive: 'Haifanyi Kazi',
    
    // Greetings
    welcome: 'Karibu',
    good_morning: 'Habari za Asubuhi',
    good_afternoon: 'Habari za Mchana',
    good_evening: 'Habari za Jioni'
  },
  
  yo: {
    // Navigation (Yoruba)
    dashboard: 'Pẹpẹ Iṣakoso',
    wallet: 'Apo Owo',
    chama: 'Ajo Owo',
    exchange: 'Paaro Owo',
    invest: 'Idoko Owo',
    remit: 'Firanṣẹ Owo',
    settings: 'Aabo',
    
    // Common actions
    send: 'Firanṣẹ',
    receive: 'Gba',
    add: 'Fi Kun',
    cancel: 'Fagilee',
    confirm: 'Jẹrisi',
    continue: 'Tẹsiwaju',
    back: 'Pada',
    save: 'Toju',
    edit: 'Ṣatunṣe',
    delete: 'Pa',
    
    // Financial terms
    balance: 'Iye Owo To Ku',
    amount: 'Iye',
    currency: 'Iru Owo',
    exchange_rate: 'Iye Paaro',
    fee: 'Owo Iṣẹ',
    total: 'Lapapọ',
    transaction: 'Iṣowo',
    investment: 'Idoko',
    savings: 'Ifipamọ',
    
    // Status
    pending: 'Ti Nduro',
    completed: 'Ti Pari',
    failed: 'Ti Kuna',
    active: 'Ti Nṣiṣẹ',
    inactive: 'Ko Ṣiṣẹ',
    
    // Greetings
    welcome: 'Ẹ Ku Abọ',
    good_morning: 'Ẹ Ku Aro',
    good_afternoon: 'Ẹ Ku Ọsan',
    good_evening: 'Ẹ Ku Irọlẹ'
  },
  
  zu: {
    // Navigation (Zulu)
    dashboard: 'Ibhodi Lokulawula',
    wallet: 'Isikhwama',
    chama: 'Ukonga Kweqembu',
    exchange: 'Ukushintsha',
    invest: 'Ukutshala Imali',
    remit: 'Ukuthumela Imali',
    settings: 'Ukuphepha',
    
    // Common actions
    send: 'Thumela',
    receive: 'Thola',
    add: 'Engeza',
    cancel: 'Khansela',
    confirm: 'Qinisekisa',
    continue: 'Qhubeka',
    back: 'Buyela',
    save: 'Londoloza',
    edit: 'Hlela',
    delete: 'Susa',
    
    // Financial terms
    balance: 'Imali Eseleyo',
    amount: 'Inani',
    currency: 'Imali',
    exchange_rate: 'Izinga Lokushintsha',
    fee: 'Imali Yenkonzo',
    total: 'Isamba',
    transaction: 'Ukuthenga',
    investment: 'Ukutshala',
    savings: 'Ukonga',
    
    // Status
    pending: 'Kulindile',
    completed: 'Kuqediwe',
    failed: 'Kuhlulekile',
    active: 'Kuyasebenza',
    inactive: 'Akusebenzi',
    
    // Greetings
    welcome: 'Sawubona',
    good_morning: 'Sawubona Ekuseni',
    good_afternoon: 'Sawubona Emini',
    good_evening: 'Sawubona Kusihlwa'
  },
  
  am: {
    // Navigation (Amharic)
    dashboard: 'ዳሽቦርድ',
    wallet: 'ቦርሳ',
    chama: 'የቡድን ቁጠባ',
    exchange: 'ልውውጥ',
    invest: 'ኢንቨስትመንት',
    remit: 'ገንዘብ መላክ',
    settings: 'ደህንነት',
    
    // Common actions
    send: 'ላክ',
    receive: 'ተቀበል',
    add: 'ጨምር',
    cancel: 'ሰርዝ',
    confirm: 'አረጋግጥ',
    continue: 'ቀጥል',
    back: 'ተመለስ',
    save: 'አስቀምጥ',
    edit: 'አርም',
    delete: 'ሰርዝ',
    
    // Financial terms
    balance: 'ቀሪ ገንዘብ',
    amount: 'መጠን',
    currency: 'ምንዛሬ',
    exchange_rate: 'የልውውጥ ተመን',
    fee: 'ክፍያ',
    total: 'ጠቅላላ',
    transaction: 'ግብይት',
    investment: 'ኢንቨስትመንት',
    savings: 'ቁጠባ',
    
    // Status
    pending: 'በመጠባበቅ ላይ',
    completed: 'ተጠናቋል',
    failed: 'ተሳክቶ አልተሳካም',
    active: 'ንቁ',
    inactive: 'ንቁ አይደለም',
    
    // Greetings
    welcome: 'እንኳን ደህና መጡ',
    good_morning: 'እንደምን አደሩ',
    good_afternoon: 'እንደምን ዋሉ',
    good_evening: 'እንደምን አመሹ'
  }
};

export const getLanguageByCode = (code: string): Language | undefined => {
  return languages.find(lang => lang.code === code);
};

export const getTranslation = (languageCode: string, key: string): string => {
  return translations[languageCode]?.[key] || translations['en'][key] || key;
};

export const getLanguagesByRegion = (region: string): Language[] => {
  return languages.filter(lang => lang.region === region);
};

export const getPopularLanguages = (): Language[] => {
  return languages.filter(lang => 
    ['en', 'sn', 'nd', 'sw', 'yo', 'zu', 'am', 'ar', 'fr', 'pt'].includes(lang.code)
  );
};