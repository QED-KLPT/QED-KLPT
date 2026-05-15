export interface KlptDomainColour {
  accent: string;
  glow: string;
}

const KLPT_DOMAIN_COLOURS: KlptDomainColour[] = [
  { accent: '#AC5E16', glow: '#F6861F' },
  { accent: '#005387', glow: '#0077C1' },
  { accent: '#A40862', glow: '#EA0B8C' },
  { accent: '#1D682A', glow: '#2A953C' },
  { accent: '#91161B', glow: '#CF2027' },
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
