"use client";

import { createContext, Fragment, useContext, useEffect, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { content, type Lang } from "@/content/site";

const LangContext = createContext<{ lang: Lang; setLang: (lang: Lang) => void }>({ lang: "de", setLang: () => {} });

const STORAGE_KEY = "lang";

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("de");

  // The server always renders German; switch after mount if the visitor chose English before
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved === "en" || saved === "de") setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    // Remounted sections create fresh triggers; measure them once the new text is in place
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [lang]);

  const setLang = (next: Lang) => {
    localStorage.setItem(STORAGE_KEY, next);
    setLangState(next);
  };

  return <LangContext value={{ lang, setLang }}>{children}</LangContext>;
}

export const useLang = () => useContext(LangContext);

export const useContent = () => content[useLang().lang];

// Remounts its children when the language changes so text-splitting animations start fresh
export function LangRemount({ children }: { children: React.ReactNode }) {
  const { lang } = useLang();
  return <Fragment key={lang}>{children}</Fragment>;
}

export function LangSwitch({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();
  const { ui } = content[lang];
  return (
    <div role="group" aria-label={ui.language} className={`flex rounded-lg border border-ink/15 bg-paper/70 p-1 backdrop-blur ${className}`}>
      {(["de", "en"] as const).map((code) => (
        <button
          key={code}
          type="button"
          aria-pressed={lang === code}
          onClick={() => setLang(code)}
          className={`h-9 rounded-md px-3 text-sm uppercase transition-colors duration-300 ${
            lang === code ? "bg-ink text-paper" : "text-ink/60 hover:text-ink"
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  );
}
