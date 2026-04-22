import { useQuery } from "@tanstack/react-query";

import { fetchRandomQuote } from "../api/quotes";
import { quotesKeys } from "../queryKeys";

export const useRandomQuote = () =>
  useQuery({
    queryKey: quotesKeys.random(),
    queryFn: fetchRandomQuote,
    staleTime: 0,
  });
