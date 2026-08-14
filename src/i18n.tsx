import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type Lang = "zh" | "en";

const translations = {
  zh: {
    title: "秀鲤鱼の个人主页",
    githubBtn: "Github 主页",
    contactBtn: "联系我",
    footer: "© 2026 Mascot Lab · 秀鲤鱼",
    seeMore: "查看更多",
    acesName: "反作弊考试系统",
    acesDesc: "纯属个人整活搓出来的无聊项目",
    acesStore: "从 Microsoft Store",
    acesStoreSecondary: "获取",
    acesFeedback: "反馈问题和建议",
    acesFeedbackSecondary: "GitHub issues",
    acesDocs: "项目文档",
    theme: "切换主题",
    light: "亮色",
    dark: "暗色",
    system: "系统",
    lang: "语言",
  },
  en: {
    title: "Cyprinus-carpio's Personal Homepage",
    githubBtn: "Github homepage",
    contactBtn: "Contact",
    footer: "© 2026 Mascot Lab · Cyprinus-carpio",
    seeMore: "See more",
    acesName: "Anti-Cheat Exam System",
    acesDesc: "A boring project I casually threw together for fun",
    acesStore: "Get it",
    acesStoreSecondary: "from Microsoft Store",
    acesFeedback: "Feedback & suggestions",
    acesFeedbackSecondary: "GitHub issues",
    acesDocs: "Project docs",
    theme: "Theme",
    light: "Light",
    dark: "Dark",
    system: "System",
    lang: "Language",
  },
} as const;

function getSavedLang(): Lang {
  const saved = localStorage.getItem("lang");
  if (saved === "zh" || saved === "en") return saved;
  return "zh";
}

type Translations = typeof translations.zh;

interface I18nContextValue {
  lang: Lang;
  t: Translations;
  setLang: (l: Lang) => void;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getSavedLang);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
  }, []);

  return (
    <I18nContext.Provider value={{ lang, t: translations[lang] as Translations, setLang }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
