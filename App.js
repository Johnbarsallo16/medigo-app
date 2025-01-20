import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppointmentsNavigator from './src/modules/appointments/navigation/AppointmentsNavigator';

const theme = {
  lightColors: {
    primary: '#2089dc',
    secondary: '#00b686',
    background: '#f2f2f2',
  },
  darkColors: {
    primary: '#73c0ff',
    secondary: '#40d4a8',
    background: '#1a1a1a',
  },
  mode: 'light',
};

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <AppointmentsNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
} 