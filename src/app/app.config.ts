import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { includeBearerTokenInterceptor } from 'keycloak-angular';
import { routes } from "./app.routes";

import {
  provideKeycloak,
  createInterceptorCondition,
  IncludeBearerTokenCondition,
  INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
  withAutoRefreshToken,
  AutoRefreshTokenService,
  UserActivityService
} from 'keycloak-angular';

const localhostCondition = createInterceptorCondition<IncludeBearerTokenCondition>({
  urlPattern: /^(http:\/\/localhost:8080)(\/.*)?$/i
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([includeBearerTokenInterceptor])),
    provideKeycloak({
      config: {
        realm: "innovactions",
        url: "http://localhost:8081",
        clientId: "angular"
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: location.origin + "/silent-check-sso.html",
        redirectUri: location.origin + "/"
      },
      features: [
        withAutoRefreshToken({
           onInactivityTimeout: 'logout',
           sessionTimeout: 60000
         })
      ],
      providers: [
        AutoRefreshTokenService,
        UserActivityService,
        {
          provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
          useValue: [localhostCondition]
        }
      ]
    })
  ]
};
