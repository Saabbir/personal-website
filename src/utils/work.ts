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
