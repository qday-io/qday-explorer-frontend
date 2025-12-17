// Token icon URL mapping by symbol
// Maps token symbols to their icon URLs stored in public/assets/token-icons

const TOKEN_ICON_MAP: Record<string, string> = {
  WQDAY: '/assets/token-icons/WQDAY-128x128.svg',
  WABEL: '/assets/token-icons/WABEL-128x128.svg',
  cvxQDAY: '/assets/token-icons/cvxQDAY-128x128.svg',
  QDAY: '/assets/token-icons/QDAY-128x128.svg',
  ABEL: '/assets/token-icons/ABEL-128x128.svg',
  USD8: '/assets/token-icons/usd8-icon-128x128.png',
  USD8t: '/assets/token-icons/usd8-icon-128x128.png',
  USD8s: '/assets/token-icons/usd8-icon-128x128.png',
};

export function getTokenIconUrl(symbol: string | null | undefined): string | null {
  if (!symbol) {
    return null;
  }
  return TOKEN_ICON_MAP[symbol] || null;
}

export default TOKEN_ICON_MAP;
