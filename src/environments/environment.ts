export const environment = {
  production: false,
  apiUrl: 'http://127.0.0.1:8080',
  tokenAllowedDomains: [/127.0.0.1:8080/],
  tokenDisallowedRoutes: [/\/oauth2\/token/],
  oauthCallbackUrl: 'http://127.0.0.1:4200/authorized',
  logoutRedirectToUrl: 'http://127.0.0.1:4200'
};


