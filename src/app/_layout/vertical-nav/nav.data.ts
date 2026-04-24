export type HorizontalNavItem = {
  label: string;
  route: string;
  matchPrefixes?: string[];
};

export type VerticalNavSection = {
  id: 'home' | 'foundations' | 'learning-domain-tool';
  label: string;
  route: string;
  matchPrefixes: string[];
  horizontalItems: HorizontalNavItem[];
};

export const NAV_SECTIONS: VerticalNavSection[] = [
  {
    id: 'home',
    label: 'Home',
    route: '/',
    matchPrefixes: ['/'],
    horizontalItems: [],
  },
  {
    id: 'foundations',
    label: 'Foundations',
    route: '/foundations/analysing-and-interpreting-observational-data',
    matchPrefixes: ['/foundations'],
    horizontalItems: [
      {
        label: 'Analysing data',
        route: '/foundations/analysing-and-interpreting-observational-data',
        matchPrefixes: ['/foundations/analysing-and-interpreting-observational-data'],
      },
      {
        label: 'Quality observations',
        route: '/foundations/conducting-and-documenting-quality-observations',
        matchPrefixes: ['/foundations/conducting-and-documenting-quality-observations'],
      },
    ],
  },
  {
    id: 'learning-domain-tool',
    label: 'Learning Domains & Tools',
    route: '/learning-domain-tool/using-the-klpt',
    matchPrefixes: ['/learning-domain-tool'],
    horizontalItems: [
      {
        label: 'Using the KLPT',
        route: '/learning-domain-tool/using-the-klpt',
        matchPrefixes: ['/learning-domain-tool/using-the-klpt'],
      },
      {
        label: 'Learning Domains',
        route: '/learning-domain-tool/learning-domains',
        matchPrefixes: ['/learning-domain-tool/learning-domains'],
      },
      {
        label: 'Observation Support Tool',
        route: '/learning-domain-tool/observation-support-tool',
        matchPrefixes: ['/learning-domain-tool/observation-support-tool'],
      },
      {
        label: 'Practice Support',
        route: '/learning-domain-tool/practice-support',
        matchPrefixes: ['/learning-domain-tool/practice-support'],
      },
    ],
  },
];

export function getActiveSection(url: string): VerticalNavSection {
  if (url === '/' || url === '') {
    return NAV_SECTIONS[0];
  }

  return NAV_SECTIONS.slice(1).find((section) => section.matchPrefixes.some((prefix) => url.startsWith(prefix))) ?? NAV_SECTIONS[0];
}
