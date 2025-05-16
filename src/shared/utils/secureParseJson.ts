export const secureParseJson = <TData>(
  data: string | null
): TData | undefined => {
  try {
    if (!data) return undefined;
    return JSON.parse(data);
  } catch {
    return undefined;
  }
};
