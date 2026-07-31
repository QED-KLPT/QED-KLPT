import { DomainAssetMode } from '../../../../services/domain-asset-mode.service';

export interface KlptDomainColour {
  accent: string;
  glow: string;
}

const KLPT_BLUE_DOMAIN_COLOURS: KlptDomainColour[] = [
  { accent: '#003E96', glow: '#003E96' },
  { accent: '#005EB8', glow: '#005EB8' },
  { accent: '#0077C8', glow: '#0077C8' },
  { accent: '#147EB2', glow: '#147EB2' },
  { accent: '#227FA5', glow: '#227FA5' },
];

const KLPT_DOMAIN_COLOURS: KlptDomainColour[] = [
  { accent: '#6F2DBD', glow: '#8C4DD8' },
  { accent: '#1D5FD1', glow: '#4A90E2' },
  { accent: '#C2185B', glow: '#E43D7C' },
  { accent: '#C45100', glow: '#E76B16' },
  { accent: '#2E7D32', glow: '#43A047' },
];

export function klptDomainColour(domainIndex: number | undefined): KlptDomainColour {
  const index = Math.max(0, (domainIndex ?? 1) - 1);
  return KLPT_DOMAIN_COLOURS[index % KLPT_DOMAIN_COLOURS.length];
}

export function klptBlueDomainColour(domainIndex: number | undefined): KlptDomainColour {
  const index = Math.max(0, (domainIndex ?? 1) - 1);
  return KLPT_BLUE_DOMAIN_COLOURS[index % KLPT_BLUE_DOMAIN_COLOURS.length];
}

export function klptDomainStyle(
  domainIndex: number | undefined,
  depth = 0,
  assetMode: DomainAssetMode = 'colour',
): Record<string, string> {
  const isDarkBlue = assetMode === 'dark-blue';
  const colour = isDarkBlue ? klptBlueDomainColour(domainIndex) : klptDomainColour(domainIndex);

  return {
    '--accent': colour.accent,
    '--accent-glow': colour.glow,
    '--depth-soften': isDarkBlue ? '0%' : `${depth * 6}%`,
  };
}
