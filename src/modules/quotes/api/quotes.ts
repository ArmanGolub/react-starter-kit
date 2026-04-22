import { apiClient } from "@/core/api";

export type Quote = {
  id: number;
  quote: string;
  author: string;
};

export const fetchRandomQuote = async (): Promise<Quote> => {
  const { data } = await apiClient.get<Quote>("/quotes/random");
  return data;
};
