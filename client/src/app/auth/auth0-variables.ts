interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
  apiUrl: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'QWpK0VenvgVr7xDi5zfq1e3KZyoN7Zze',
  domain: 'blog2018.auth0.com',
  callbackURL: 'http://localhost:4200/callback',
  apiUrl: 'http://localhost:3000'
};
