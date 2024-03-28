import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ihsan.app',
  appName: 'ihsan',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
