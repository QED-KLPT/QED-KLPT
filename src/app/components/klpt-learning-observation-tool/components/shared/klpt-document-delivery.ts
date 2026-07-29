export type GuaranteedDelivery = 'ios-new-tab' | 'anchor-download';

export function isIosSafari(nav: Navigator = navigator): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false;
  }

  const userAgent = nav.userAgent;
  const isIosDevice =
    /iPad|iPhone|iPod/.test(userAgent) ||
    (nav.platform === 'MacIntel' && nav.maxTouchPoints > 1);
  const isSafari = /Safari/.test(userAgent) && !/CriOS|FxiOS|EdgiOS|OPiOS/.test(userAgent);

  return isIosDevice && isSafari;
}

export function chooseGuaranteedDelivery(nav: Navigator = navigator): GuaranteedDelivery {
  return isIosSafari(nav) ? 'ios-new-tab' : 'anchor-download';
}
