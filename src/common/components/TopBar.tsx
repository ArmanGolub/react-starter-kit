import { ThemeToggle } from "@/modules/theme";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const LANGS = ["en", "ru"] as const;

export const TopBar = () => {
  const { i18n } = useTranslation();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
        <Link
          to="/"
          className="font-mono text-sm font-semibold tracking-tight hover:text-primary"
        >
          rsk<span className="text-primary">/</span>
        </Link>

        <div className="flex items-center gap-2">
          <div className="flex h-9 items-center rounded-md border p-0.5 font-mono text-xs">
            {LANGS.map((lng) => {
              const active = i18n.language.startsWith(lng);
              return (
                <button
                  key={lng}
                  type="button"
                  onClick={() => i18n.changeLanguage(lng)}
                  className={
                    "flex h-full items-center rounded-sm px-2.5 uppercase transition-colors " +
                    (active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground")
                  }
                >
                  {lng}
                </button>
              );
            })}
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
