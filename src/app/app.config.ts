import {ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';
import {registerLocaleData} from '@angular/common';
import localeFrBe from '@angular/common/locales/fr-BE';
import localeFrBeExtra from '@angular/common/locales/extra/fr-BE';

import {routes} from './app.routes';
import {authInterceptor} from './core/interceptors/auth.interceptor';

registerLocaleData(localeFrBe, 'fr-BE', localeFrBeExtra);

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideRouter(routes),
        provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
        { provide: LOCALE_ID, useValue: 'fr-BE' }
    ]
};
