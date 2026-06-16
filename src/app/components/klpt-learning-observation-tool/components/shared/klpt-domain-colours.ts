import { DomainAssetMode } from '../../../../services/domain-asset-mode.service';

export interface KlptDomainColour {
  accent: string;
  glow: string;
}

const KLPT_BLUE_DOMAIN_COLOUR: KlptDomainColour = {
  accent: 'var(--doe-color-primary)',
  glow: 'var(--doe-color-primary)',
};

const KLPT_DOMAIN_COLOURS: KlptDomainColour[] = [
  { accent: '#AC5E16', glow: '#AF6015' },
  { accent: '#005387', glow: '#0077C1' },
  { accent: '#A40862', glow: '#E00C88' },
  { accent: '#1D682A', glow: '#2A853A' },
  { accent: '#91161B', glow: '#CF2027' },
];

export function klptDomainColour(domainIndex: number | undefined): KlptDomainColour {
  const index = Math.max(0, (domainIndex ?? 1) - 1);
  return KLPT_DOMAIN_COLOURS[index % KLPT_DOMAIN_COLOURS.length];
}

export function klptDomainStyle(
  domainIndex: number | undefined,
  depth = 0,
  assetMode: DomainAssetMode = 'colour',
): Record<string, string> {
  const isDarkBlue = assetMode === 'dark-blue';
  const colour = isDarkBlue ? KLPT_BLUE_DOMAIN_COLOUR : klptDomainColour(domainIndex);

  return {
    '--accent': colour.accent,
    '--accent-glow': colour.glow,
    '--depth-soften': isDarkBlue ? '0%' : `${depth * 6}%`,
  };
}
