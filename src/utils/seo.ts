export const SITE_ORIGIN = 'https://saabbir.com';

export function canonicalForPath(pathname: string): string {
  const url = new URL(pathname || '/', SITE_ORIGIN);
  if (url.pathname !== '/' && !url.pathname.endsWith('/')) {
    url.pathname = `${url.pathname}/`;
  }
  return url.href;
}

export function articleCanonicalUrl(pathname: string, originalUrl?: string): string {
  if (originalUrl) return originalUrl;
  return canonicalForPath(pathname);
}

export function toIsoDate(value?: string | null): string | undefined {
  if (!value) return undefined;

  const dmy = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (dmy) {
    const [, day, month, year] = dmy;
    const parsed = new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T00:00:00.000Z`);
    return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString();
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return undefined;

  // Date-only strings should keep the calendar day, not shift by timezone.
  if (!/T|\d{2}:\d{2}/.test(value)) {
    const year = parsed.getFullYear();
    const month = String(parsed.getMonth() + 1).padStart(2, '0');
    const day = String(parsed.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}T00:00:00.000Z`;
  }

  return parsed.toISOString();
}

export function parseContentDate(value?: string | null): Date | undefined {
  const iso = toIsoDate(value);
  if (!iso) return undefined;
  const parsed = new Date(iso);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

export function contentDateValue(value?: string | null): number {
  return parseContentDate(value)?.getTime() ?? 0;
}
