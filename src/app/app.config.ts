import { ApplicationConfig, provideBrowserGlobalErrorListeners, ErrorHandler } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { TitleStrategy, provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';

import { routes } from './app.routes';
import { siteAccessInterceptor } from './interceptors/site-access.interceptor';
import { CustomTitleStrategy } from './custom-title-strategy';
import { GlobalErrorHandler } from './services/global-error-handler';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    provideHttpClient(withInterceptors([siteAccessInterceptor])),
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
      }),
    ),
    { provide: TitleStrategy, useClass: CustomTitleStrategy },
    provideServiceWorker('ngsw-worker.js', {
      enabled: false,
      registrationStrategy: 'registerImmediately',
    }),
  ],
};
