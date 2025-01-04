import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'id.pustaloka.app',
  appName: 'Pustaloka Ionic',
  webDir: 'www/browser',
  plugins: {
    "CapacitorHttp": {
      "enabled": true,
    }
  }
};

export default config;
