import globalAr from "../assets/images/flags/global-ar.svg";

type LangDef = {
    label: string; // English name
    nativeName?: string; // native/local name
    countryCode?: string; // ISO 3166-1 alpha-2 (optional)
    icon?: string; // optional local icon (takes precedence over countryCode)
};

const languages: Record<string, LangDef> = {
    sp: { label: "Spanish", nativeName: "Español", countryCode: "ES" },
    gr: { label: "German", nativeName: "Deutsch", countryCode: "DE" },
    it: { label: "Italian", nativeName: "Italiano", countryCode: "IT" },
    rs: { label: "Russian", nativeName: "русский", countryCode: "RU" },
    en: { label: "English", nativeName: "English", countryCode: "US" },
    cn: { label: "Chinese", nativeName: "中文", countryCode: "CN" },
    fr: { label: "French", nativeName: "français", countryCode: "FR" },
    // Use a neutral global icon for Arabic instead of a country flag
    ar: { label: "Arabic", nativeName: "العربية", countryCode: "AE", icon: globalAr },
    br: { label: "Portuguese (Brazil)", nativeName: "Português (Brasil)", countryCode: "BR" },
    jp: { label: "Japanese", nativeName: "日本語", countryCode: "JP" },
    il: { label: "Hebrew", nativeName: "עברית", countryCode: "IL" },
    kr: { label: "Korean", nativeName: "한국어", countryCode: "KR" },
};

export default languages;
