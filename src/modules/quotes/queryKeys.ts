export const quotesKeys = {
  all: ["quotes"] as const,
  random: () => [...quotesKeys.all, "random"] as const,
  byId: (id: number) => [...quotesKeys.all, "byId", id] as const,
};
