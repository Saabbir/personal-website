export type CaseLayoutKind = 'ab-test' | 'performance' | 'shopify' | 'analytics' | 'other';

export function workThumb(folder?: string | null) {
  return folder ? `/images/work/${folder}/thumbnail.jpg` : null;
}

export function workCover(folder?: string | null) {
  return folder ? `/images/work/${folder}/cover.jpg` : null;
}

export function caseLayoutKind(
  type?: string | null,
  override?: string | null,
): CaseLayoutKind {
  const allowed: CaseLayoutKind[] = ['ab-test', 'performance', 'shopify', 'analytics', 'other'];
  if (override && allowed.includes(override as CaseLayoutKind)) {
    return override as CaseLayoutKind;
  }

  const source = `${override || ''} ${type || ''}`.toLowerCase();
  if (
    source.includes('ab-test') ||
    source.includes('a/b') ||
    source.includes('ab testing') ||
    source.includes('cro')
  ) {
    return 'ab-test';
  }
  if (
    source.includes('performance') ||
    source.includes('webpagetest') ||
    source.includes('core web')
  ) {
    return 'performance';
  }
  if (source.includes('shopify')) return 'shopify';
  if (
    source.includes('analytics') ||
    source.includes('ga4') ||
    source.includes('gtm')
  ) {
    return 'analytics';
  }
  return 'other';
}

export function formatVisitors(value?: string | number | null) {
  if (value == null || value === '') return '';
  if (typeof value === 'number') return value.toLocaleString();
  return String(value);
}

export function liveLabel(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return 'View live';
  }
}

export function caseEyebrow(
  kind: CaseLayoutKind,
  type?: string | null,
  override?: string | null,
) {
  if (override) return override;
  if (kind === 'ab-test') return 'CRO';
  if (kind === 'performance') return 'Performance';
  if (kind === 'shopify') return 'Shopify';
  if (kind === 'analytics') return 'Analytics';
  return type || 'Case study';
}

export interface CaseTocItem {
  id: string;
  kicker: string;
  label: string;
}

function slugifyHeading(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'section';
}

function textFromHtml(html: string) {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

// Headings have to exist in the HTML. The old client-only TOC stayed empty
// after a View Transitions visit to another case study.
export function withCaseHeadingIds(html: string): { html: string; toc: CaseTocItem[] } {
  const used = new Set<string>();
  const toc: CaseTocItem[] = [];
  let clash = 0;

  const nextHtml = html.replace(/<h2\b([^>]*)>([\s\S]*?)<\/h2>/gi, (full, attrs: string, inner: string) => {
    const kicker = textFromHtml(
      (inner.match(/<span[^>]*class="[^"]*c-case-kicker[^"]*"[^>]*>([\s\S]*?)<\/span>/i) || [])[1] || '',
    );
    const label = textFromHtml(
      inner.replace(/<span[^>]*class="[^"]*c-case-kicker[^"]*"[^>]*>[\s\S]*?<\/span>/i, ''),
    );
    if (!label) return full;

    const existing = (attrs.match(/\bid=["']([^"']+)["']/i) || [])[1];
    let id = existing || slugifyHeading(label);
    while (used.has(id)) {
      clash += 1;
      id = `${slugifyHeading(label)}-${clash}`;
    }
    used.add(id);
    toc.push({ id, kicker, label });

    if (existing === id) return full;
    const cleaned = attrs.replace(/\s*id=["'][^"']*["']/i, '');
    return `<h2 id="${id}"${cleaned}>${inner}</h2>`;
  });

  return { html: nextHtml, toc };
}
