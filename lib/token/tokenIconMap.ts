// Token icon URL mapping by symbol
// Maps token symbols to their icon URLs stored in public/static/token-icons

const TOKEN_ICON_MAP: Record<string, string> = {
  WQDAY: '/static/token-icons/WQDAY-128x128.svg',
  WABEL: '/static/token-icons/WABEL-128x128.svg',
  cvxQDAY: '/static/token-icons/cvxQDAY-128x128.svg',
  QDAY: '/static/token-icons/QDAY-128x128.svg',
  ABEL: '/static/token-icons/ABEL-128x128.svg',
};

export function getTokenIconUrl(symbol: string | null | undefined): string | null {
  if (!symbol) {
    return null;
  }
  return TOKEN_ICON_MAP[symbol] || null;
}

export default TOKEN_ICON_MAP;
