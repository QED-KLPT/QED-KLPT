export interface SiteNavItem {
  label: string;
  path: string;
  children?: SiteNavItem[];
  icon?: string;
  primary?: boolean;
  sitemap?: boolean;
  sideNav?: boolean;
  exact?: boolean;
  active?: boolean;
  isTitle?: boolean;
}

export interface SiteBreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

export const SITE_NAV_ITEMS: SiteNavItem[] = [
  { label: 'Home', path: '/', icon: 'fa-regular fa-house', exact: true, sitemap: false },
  { label: 'About', path: '/about' },
  {
    label: 'KLPT foundations',
    path: '/klpt-foundations',
    children: [
      {
        label: 'Conducting and documenting quality observations',
        path: '/klpt-foundations/conducting-and-documenting-quality-observations',
      },
      {
        label: 'Analysing and interpreting observational data',
        path: '/klpt-foundations/analysing-and-interpreting-observational-data',
      },
    ],
  },
  {
    label: 'Learning domains',
    path: '/learning-domains',
    children: [
      { label: 'Language and literacy', path: '/learning-domains/language-and-literacy' },
      { label: 'Executive function', path: '/learning-domains/executive-function' },
      {
        label: 'Social and emotional learning',
        path: '/learning-domains/social-and-emotional-learning',
      },
      { label: 'Physicality', path: '/learning-domains/physicality' },
      { label: 'Mathematics and numeracy', path: '/learning-domains/mathematics-and-numeracy' },
    ],
  },
  {
    label: 'KLPT Learning observation tool',
    path: '/klpt-learning-observation-tool',
    sideNav: false,
  },
  { label: 'Contact', path: '/contact' },
];

export function getPrimaryNavItems(): SiteNavItem[] {
  return SITE_NAV_ITEMS.filter((item) => item.primary !== false);
}

export function getSitemapNavItems(): SiteNavItem[] {
  return SITE_NAV_ITEMS.filter((item) => item.sitemap !== false);
}

export function normalizeNavUrl(url: string): string {
  const path = url.split(/[?#]/)[0] || '/';
  return path.length > 1 ? path.replace(/\/+$/, '') : path;
}

export function isNavItemActive(item: SiteNavItem, url: string): boolean {
  const currentUrl = normalizeNavUrl(url);
  const itemPath = normalizeNavUrl(item.path);

  if (item.exact) {
    return currentUrl === itemPath;
  }

  return currentUrl === itemPath || currentUrl.startsWith(`${itemPath}/`);
}

export function withActiveNavState(item: SiteNavItem, url: string, isTitle = false): SiteNavItem {
  const children = item.children?.map((child) => withActiveNavState(child, url));

  return {
    ...item,
    ...(children ? { children } : {}),
    active: isNavItemActive(item, url),
    isTitle,
  };
}

export function getActiveTopLevelNavItem(url: string): SiteNavItem | null {
  const currentUrl = normalizeNavUrl(url);

  if (currentUrl === '/') {
    return null;
  }

  return SITE_NAV_ITEMS.find((item) => item.path !== '/' && isNavItemActive(item, currentUrl)) ?? null;
}

export function getSideNavItems(url: string): SiteNavItem[] {
  const activeItem = getActiveTopLevelNavItem(url);

  if (!activeItem || activeItem.sideNav === false) {
    return [];
  }

  return activeItem.children?.map((child) => withActiveNavState(child, url)) ?? [];
}

export function getSideNavTitle(url: string): string | null {
  const activeItem = getActiveTopLevelNavItem(url);

  if (!activeItem || activeItem.sideNav === false) {
    return null;
  }

  return activeItem.label;
}

export function getBreadcrumbItems(url: string): SiteBreadcrumbItem[] {
  const currentUrl = normalizeNavUrl(url);

  if (currentUrl === '/') {
    return [];
  }

  const matchedTrail = findNavTrail(SITE_NAV_ITEMS, currentUrl);

  if (!matchedTrail.length) {
    return [{ label: 'Home', href: '/' }];
  }

  const fullTrail =
    matchedTrail[0]?.path === '/' ? matchedTrail : [SITE_NAV_ITEMS[0], ...matchedTrail];

  return fullTrail.map((item, index) => {
    const isCurrent = index === fullTrail.length - 1;

    return {
      label: item.label,
      ...(isCurrent ? { current: true } : { href: item.path }),
    };
  });
}

function findNavTrail(items: SiteNavItem[], url: string): SiteNavItem[] {
  const sortedMatches = items
    .filter((item) => isNavItemActive(item, url))
    .sort((a, b) => normalizeNavUrl(b.path).length - normalizeNavUrl(a.path).length);

  for (const item of sortedMatches) {
    const childTrail = item.children ? findNavTrail(item.children, url) : [];

    if (childTrail.length) {
      return [item, ...childTrail];
    }

    return [item];
  }

  return [];
}
