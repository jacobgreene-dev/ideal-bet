export function formatTeamNameForCDN(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')        // replace spaces with hyphens
    .replace(/[^\w-]/g, '');     // remove special characters (just in case)
}
