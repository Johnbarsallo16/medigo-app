export default {
  name: 'MediGo',
  slug: 'medigo-app',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff'
  },
  assetBundlePatterns: [
    '**/*'
  ],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.medigo.app',
    buildNumber: '1.0.0',
    infoPlist: {
      NSCameraUsageDescription: 'Esta app necesita acceso a la cámara para escanear códigos QR y tomar fotos de documentos médicos.',
      NSPhotoLibraryUsageDescription: 'Esta app necesita acceso a la galería para subir documentos médicos.',
      NSLocationWhenInUseUsageDescription: 'Esta app necesita acceso a tu ubicación para mostrar servicios médicos cercanos.',
      NSCalendarsUsageDescription: 'Esta app necesita acceso a tu calendario para agendar citas médicas.'
    }
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff'
    },
    package: 'com.medigo.app',
    versionCode: 1,
    permissions: [
      'CAMERA',
      'READ_EXTERNAL_STORAGE',
      'WRITE_EXTERNAL_STORAGE',
      'ACCESS_COARSE_LOCATION',
      'ACCESS_FINE_LOCATION',
      'READ_CALENDAR',
      'WRITE_CALENDAR'
    ]
  },
  web: {
    favicon: './assets/favicon.png'
  },
  extra: {
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
    twoCheckoutSellerId: process.env.TWOCHECKOUT_SELLER_ID,
    twoCheckoutPublishableKey: process.env.TWOCHECKOUT_PUBLISHABLE_KEY,
    environment: process.env.APP_ENV || 'development',
    eas: {
      projectId: process.env.EAS_PROJECT_ID
    }
  },
  plugins: [
    'expo-camera',
    'expo-image-picker',
    'expo-location',
    'expo-notifications',
    [
      'expo-calendar',
      {
        calendarPermission: 'La app necesita acceso al calendario para agendar tus citas médicas.'
      }
    ]
  ],
  updates: {
    fallbackToCacheTimeout: 0,
    url: 'https://u.expo.dev/your-project-id'
  }
}; 