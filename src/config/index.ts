import Constants from 'expo-constants';

interface Config {
  apiUrl: string;
  supabaseUrl: string;
  supabaseAnonKey: string;
  twoCheckoutSellerId: string;
  twoCheckoutPublishableKey: string;
  environment: 'development' | 'staging' | 'production';
}

const developmentConfig: Config = {
  apiUrl: 'http://localhost:3000',
  supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL || '',
  supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '',
  twoCheckoutSellerId: Constants.expoConfig?.extra?.twoCheckoutSellerId || '',
  twoCheckoutPublishableKey: Constants.expoConfig?.extra?.twoCheckoutPublishableKey || '',
  environment: 'development',
};

const stagingConfig: Config = {
  apiUrl: 'https://staging-api.medigo.com',
  supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL || '',
  supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '',
  twoCheckoutSellerId: Constants.expoConfig?.extra?.twoCheckoutSellerId || '',
  twoCheckoutPublishableKey: Constants.expoConfig?.extra?.twoCheckoutPublishableKey || '',
  environment: 'staging',
};

const productionConfig: Config = {
  apiUrl: 'https://api.medigo.com',
  supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL || '',
  supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '',
  twoCheckoutSellerId: Constants.expoConfig?.extra?.twoCheckoutSellerId || '',
  twoCheckoutPublishableKey: Constants.expoConfig?.extra?.twoCheckoutPublishableKey || '',
  environment: 'production',
};

export const getConfig = (): Config => {
  const environment = Constants.expoConfig?.extra?.environment || 'development';

  switch (environment) {
    case 'production':
      return productionConfig;
    case 'staging':
      return stagingConfig;
    default:
      return developmentConfig;
  }
}; 