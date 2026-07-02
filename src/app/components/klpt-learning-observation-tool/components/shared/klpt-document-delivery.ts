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

export function isTouchPrimaryDevice(nav: Navigator = navigator): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false;
  }

  return nav.maxTouchPoints > 0 && !window.matchMedia?.('(pointer: fine)').matches;
}

export function chooseGuaranteedDelivery(nav: Navigator = navigator): GuaranteedDelivery {
  return isIosSafari(nav) ? 'ios-new-tab' : 'anchor-download';
}

export function getDownloadFallbackHint(nav: Navigator = navigator): string {
  if (isTouchPrimaryDevice(nav)) {
    return 'Check your Downloads or Files app to find your document.';
  }

  return "Check your Downloads folder, or press Ctrl+J (Cmd+Shift+J on Mac) to open your browser's Downloads panel.";
}
