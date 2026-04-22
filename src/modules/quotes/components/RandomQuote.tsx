import { iconButton } from "@/common/styles";
import { useQueryClient } from "@tanstack/react-query";
import { RefreshCw } from "lucide-react";
import { useTranslation } from "react-i18next";

import { useRandomQuote } from "../hooks/useRandomQuote";
import { quotesKeys } from "../queryKeys";

export const RandomQuote = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { data, isLoading, isError, isFetching } = useRandomQuote();

  const refresh = () =>
    queryClient.invalidateQueries({ queryKey: quotesKeys.random() });

  return (
    <div className="flex items-start justify-between gap-6">
      <div className="min-w-0 flex-1">
        {isLoading ? (
          <p className="font-mono text-sm text-muted-foreground">
            {t("quotes.loading", "Loading…")}
          </p>
        ) : isError ? (
          <p className="font-mono text-sm text-destructive">
            {t("quotes.error", "Couldn't load a quote.")}
          </p>
        ) : data ? (
          <>
            <p className="text-pretty text-lg leading-snug sm:text-xl">
              “{data.quote}”
            </p>
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              — {data.author}
            </p>
          </>
        ) : null}
      </div>
      <button
        type="button"
        onClick={refresh}
        disabled={isFetching}
        className={iconButton}
        aria-label={t("quotes.refresh", "New quote")}
      >
        <RefreshCw
          className={"h-4 w-4 " + (isFetching ? "animate-spin" : "")}
        />
      </button>
    </div>
  );
};
