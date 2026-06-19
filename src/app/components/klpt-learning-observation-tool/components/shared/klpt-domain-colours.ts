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
  { accent: '#679ed4', glow: '#5089c0' },
  { accent: '#cddff0', glow: '#b8d0e0' },
  { accent: '#0063af', glow: '#004a88' },
  { accent: '#1c447e', glow: '#132e5a' },
  { accent: '#102548', glow: '#0b1a34' },
];

const KLPT_DOMAIN_BACKGROUNDS: string[] = [
  'linear-gradient(135deg, #679ed4 0%, #5089c0 100%)',
  'linear-gradient(135deg, #cddff0 0%, #b8d0e0 100%)',
  'linear-gradient(135deg, #0063af 0%, #004a88 100%)',
  'linear-gradient(135deg, #1c447e 0%, #132e5a 100%)',
  'linear-gradient(135deg, #102548 0%, #0b1a34 100%)',
];

const KLPT_BLUE_DOMAIN_BACKGROUNDS: string[] = [
  '#679ed4',
  '#cddff0',
  '#0063af',
  '#1c447e',
  '#102548',
];

const KLPT_DOMAIN_BORDER_COLORS: string[] = ['#679ed4', '#cddff0', '#0063af', '#1c447e', '#102548'];
const KLPT_BLUE_DOMAIN_BORDER_COLORS: string[] = ['#679ed4', '#cddff0', '#0063af', '#1c447e', '#102548'];

export function klptDomainColour(domainIndex: number | undefined): KlptDomainColour {
  const index = Math.max(0, (domainIndex ?? 1) - 1);
  return KLPT_DOMAIN_COLOURS[index % KLPT_DOMAIN_COLOURS.length];
}

function klptDomainBackground(domainIndex: number | undefined, assetMode: DomainAssetMode): string {
  const index = Math.max(0, (domainIndex ?? 1) - 1);
  return assetMode === 'dark-blue'
    ? KLPT_BLUE_DOMAIN_BACKGROUNDS[index % KLPT_BLUE_DOMAIN_BACKGROUNDS.length]
    : KLPT_DOMAIN_BACKGROUNDS[index % KLPT_DOMAIN_BACKGROUNDS.length];
}

function klptDomainBorderColor(domainIndex: number | undefined, assetMode: DomainAssetMode): string {
  const index = Math.max(0, (domainIndex ?? 1) - 1);
  return assetMode === 'dark-blue'
    ? KLPT_BLUE_DOMAIN_BORDER_COLORS[index % KLPT_BLUE_DOMAIN_BORDER_COLORS.length]
    : KLPT_DOMAIN_BORDER_COLORS[index % KLPT_DOMAIN_BORDER_COLORS.length];
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
    '--domain-background': klptDomainBackground(domainIndex, assetMode),
    '--domain-hover-border': klptDomainBorderColor(domainIndex, assetMode),
  };
}
