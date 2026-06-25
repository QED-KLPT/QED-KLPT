import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import {
  SwUpdate,
  VersionInstallationFailedEvent,
  VersionReadyEvent,
} from '@angular/service-worker';
import { filter, fromEvent, tap, timer } from 'rxjs';import { Footer } from './_layout/footer/footer';
import { Header } from './_layout/header/header';
import { BackToTopComponent } from './components/shared/back-to-top';
import { BreadcrumbComponent, BreadcrumbItem } from './components/shared/breadcrumb';
import { QldSideNavComponent } from './components/shared/qld-side-nav/qld-side-nav.component';
import { getBreadcrumbItems, getSideNavItems, getSideNavTitle, SiteNavItem } from './navigation/site-navigation';

// Handle return from external PDF BEFORE Angular bootstraps.
// Runs at module evaluation time — two mechanisms:
// 1) Hash + history.state (if pushState created a distinct entry)
// 2) sessionStorage fallback (if browser coalesced pushState + navigation)
(function handleKlptPdfReturn() {
  const state = window.history.state as Record<string, string> | null;

  if (window.location.hash === '#_klpt_return' && state?.['_klptReturn']) {
    window.history.replaceState(null, '', state['_klptReturn']);
    return;
  }

  const pdfReturn = sessionStorage.getItem('_klptPdfReturn');

  if (pdfReturn) {
    sessionStorage.removeItem('_klptPdfReturn');
    // replaceState only changes the URL silently — it does NOT navigate.
    // If pushState was coalesced and we landed on Step 2, we must actually
    // navigate back to Step 3 before Angular bootstraps.
    window.location.replace(pdfReturn);
  }
})();

const UPDATE_RECHECK_DELAY_MS = 2 * 60 * 1000;
const INLINE_HERO_ROUTE_PREFIXES = [
  '/learning-domains',
  '/klpt-foundations',
  '/learning-observation-tool',
];
const INLINE_HERO_ROUTES = ['/about', '/contact', '/help', '/practice-supports', '/sitemap'];
const COMPACT_INLINE_HERO_ROUTES = [
  '/learning-domains',
  '/klpt-foundations',
  '/learning-observation-tool',
];

@Component({
  selector: 'app-root',
  imports: [BackToTopComponent, BreadcrumbComponent, Footer, Header, QldSideNavComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private readonly swUpdate = inject(SwUpdate);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  protected showUpdateNotice = false;
  protected showUpdateFailureNotice = false;
  protected isRefreshing = false;
  protected isPasskeyRoute = false;
  protected pageAnnouncement = '';
  protected sideNavItems: SiteNavItem[] = [];
  protected sideNavTitle: string | null = null;
  protected breadcrumbItems: BreadcrumbItem[] = [];
  protected hasInlineHeroLayout = false;
  protected hasCompactInlineHeroLayout = false;
  protected updateFailureMessage =
    'An update was detected but could not be installed yet. Please try again in a few minutes.';

  private updateCheckInFlight = false;
  private updateRetryTimer: number | null = null;

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.isPasskeyRoute = this.router.url.startsWith('/passkey');
        this.announceRouteChange();
        this.updatePageNavigation();
      });

    this.isPasskeyRoute = this.router.url.startsWith('/passkey');
    this.updatePageNavigation();

    if (!this.swUpdate.isEnabled) {
      console.info('[SW] Service worker updates are disabled in this build.');
      void this.unregisterExistingServiceWorkers();
      return;
    }

    console.info('[SW] Service worker updates are enabled.');

    this.swUpdate.versionUpdates
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => console.info('[SW] Version event received:', event));

    this.swUpdate.versionUpdates
      .pipe(
        filter((event): event is VersionReadyEvent => event.type === 'VERSION_READY'),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.showUpdateFailureNotice = false;
        this.showUpdateNotice = true;
      });

    this.swUpdate.versionUpdates
      .pipe(
        filter(
          (event): event is VersionInstallationFailedEvent =>
            event.type === 'VERSION_INSTALLATION_FAILED',
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((event) => {
        console.warn('[SW] Version installation failed. Will retry shortly.', event.error);
        this.showUpdateNotice = false;
        this.scheduleUpdateRecheck();
      });

    this.swUpdate.unrecoverable.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
      console.error('[SW] Unrecoverable state reached.', event.reason);
      this.showUpdateNotice = false;
      this.updateFailureMessage =
        'This cached version can no longer be safely loaded. Please refresh to restore the latest site.';
      this.showUpdateFailureNotice = true;
    });

    timer(5_000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => void this.checkForSiteUpdate());

    fromEvent(document, 'visibilitychange')
      .pipe(
        filter(() => document.visibilityState === 'visible'),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => void this.checkForSiteUpdate());

    // Handle return from external PDF links (QKLG).
    // When the user clicks Back from the PDF, the browser does a full page load at
    // the URL with #_klpt_return hash. popstate does NOT fire on initial load,
    // so we must detect this synchronously before Angular router processes navigation.
    const klptReturnState = window.history.state as Record<string, string> | null;

    if (window.location.hash === '#_klpt_return' && klptReturnState?.['_klptReturn']) {
      console.log('[QKLG] Detected return from external PDF. Restoring URL to:', klptReturnState['_klptReturn']);
      window.history.replaceState(null, '', klptReturnState['_klptReturn']);
    }

    // Also handle popstate for subsequent Back/Forward within the SPA.
    fromEvent(window, 'popstate')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        const state = window.history.state as Record<string, string> | null;

        if (window.location.hash === '#_klpt_return' && state?.['_klptReturn']) {
          window.history.replaceState(null, '', state['_klptReturn']);
        }
      });
  }

  private announceRouteChange(): void {
    let route = this.activatedRoute;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const title = (route as unknown as { title?: string })?.title ?? 'Page';
    this.pageAnnouncement = `${title} loaded`;
  }

  private updatePageNavigation(): void {
    this.sideNavItems = getSideNavItems(this.router.url);
    this.sideNavTitle = getSideNavTitle(this.router.url);
    this.breadcrumbItems = getBreadcrumbItems(this.router.url);
    const currentPath = this.router.url.split(/[?#]/)[0];
    this.hasInlineHeroLayout =
      INLINE_HERO_ROUTES.includes(currentPath) ||
      INLINE_HERO_ROUTE_PREFIXES.some((prefix) =>
        currentPath === prefix || currentPath.startsWith(`${prefix}/`),
      );
    this.hasCompactInlineHeroLayout = COMPACT_INLINE_HERO_ROUTES.includes(currentPath);
  }

  protected dismissUpdateNotice(): void {
    this.showUpdateNotice = false;
  }

  protected dismissUpdateFailureNotice(): void {
    this.showUpdateFailureNotice = false;
  }

  protected async refreshForUpdate(): Promise<void> {
    if (this.isRefreshing) {
      return;
    }

    this.isRefreshing = true;
    document.location.reload();
  }

  private async checkForSiteUpdate(): Promise<void> {
    if (this.updateCheckInFlight || this.showUpdateNotice || this.isRefreshing) {
      return;
    }

    this.updateCheckInFlight = true;

    try {
      this.showUpdateFailureNotice = false;
      const hasUpdate = await this.swUpdate.checkForUpdate();
      console.info('[SW] checkForUpdate() completed.', { hasUpdate });
    } catch (error) {
      console.warn('[SW] Unable to check for updates. Will retry shortly.', error);
      this.scheduleUpdateRecheck();
    } finally {
      this.updateCheckInFlight = false;
    }
  }

  private scheduleUpdateRecheck(): void {
    if (this.updateRetryTimer) {
      return;
    }

    this.updateRetryTimer = window.setTimeout(() => {
      this.updateRetryTimer = null;
      void this.checkForSiteUpdate();
    }, UPDATE_RECHECK_DELAY_MS);
  }

  private async unregisterExistingServiceWorkers(): Promise<void> {
    if (!('serviceWorker' in navigator)) {
      return;
    }

    const registrations = await navigator.serviceWorker.getRegistrations();
    const baseUrl = new URL(document.baseURI);

    await Promise.all(
      registrations
        .filter((registration) => {
          const scopeUrl = new URL(registration.scope);

          return (
            scopeUrl.origin === baseUrl.origin &&
            (baseUrl.href.startsWith(scopeUrl.href) || scopeUrl.href.startsWith(baseUrl.href))
          );
        })
        .map((registration) => registration.unregister()),
    );

    if ('caches' in window) {
      const cacheNames = await window.caches.keys();
      await Promise.all(
        cacheNames
          .filter((cacheName) => cacheName.startsWith('ngsw:'))
          .map((cacheName) => window.caches.delete(cacheName)),
      );
    }
  }
}
