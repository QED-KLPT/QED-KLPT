export interface KlptDomainColour {
  accent: string;
  glow: string;
}

const KLPT_DOMAIN_COLOURS: KlptDomainColour[] = [
  { accent: '#267ec8', glow: '#2e89d8' },
  { accent: '#c76424', glow: '#d8772e' },
  { accent: '#238a9c', glow: '#48a9ba' },
  { accent: '#c0497d', glow: '#d76698' },
  { accent: '#6f3f97', glow: '#8c65ad' },
];

export function klptDomainColour(domainIndex: number | undefined): KlptDomainColour {
  const index = Math.max(0, (domainIndex ?? 1) - 1);
  return KLPT_DOMAIN_COLOURS[index % KLPT_DOMAIN_COLOURS.length];
}

export function klptDomainStyle(
  domainIndex: number | undefined,
  depth = 0,
): Record<string, string> {
  const colour = klptDomainColour(domainIndex);

  return {
    '--accent': colour.accent,
    '--accent-glow': colour.glow,
    '--depth-soften': `${depth * 6}%`,
  };
}
