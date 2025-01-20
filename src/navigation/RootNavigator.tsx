import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/themed';
import { AppointmentsNavigator } from '../modules/appointments';
import { HomeScreen, ProfileScreen, ProvidersScreen } from '../screens';
import { RootStackParamList } from './types';

const Tab = createBottomTabNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Appointments':
              iconName = 'calendar';
              break;
            case 'Providers':
              iconName = 'doctor';
              break;
            case 'Profile':
              iconName = 'account';
              break;
            default:
              iconName = 'help';
          }

          return (
            <Icon
              type="material-community"
              name={iconName}
              size={size}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: '#2089dc',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Inicio',
        }}
      />
      <Tab.Screen
        name="Appointments"
        component={AppointmentsNavigator}
        options={{
          title: 'Citas',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Providers"
        component={ProvidersScreen}
        options={{
          title: 'Doctores',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Perfil',
        }}
      />
    </Tab.Navigator>
  );
}; 