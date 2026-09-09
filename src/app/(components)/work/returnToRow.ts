// Shared between the Work section (which reads it on mount) and the links
// that leave for a case study (which write it). Case studies are pages, not
// overlays, so returning has to reopen the row by hand.
export const RETURN_KEY = "work:return-to";

export function rowDomId(slug: string): string {
  return `work-row-${slug}`;
}

export function rememberRow(slug: string): void {
  try {
    sessionStorage.setItem(RETURN_KEY, slug);
  } catch {
    // Storage unavailable (private mode, blocked cookies). The link still
    // navigates; the reader just lands at the top of the Work section.
  }
}
