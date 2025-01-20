import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AppointmentListScreen from '../screens/AppointmentListScreen';
import NewAppointmentScreen from '../screens/NewAppointmentScreen';
import AppointmentConfirmationScreen from '../screens/AppointmentConfirmationScreen';

const Stack = createStackNavigator();

const AppointmentsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="AppointmentList"
        component={AppointmentListScreen}
      />
      <Stack.Screen
        name="NewAppointment"
        component={NewAppointmentScreen}
      />
      <Stack.Screen
        name="AppointmentConfirmation"
        component={AppointmentConfirmationScreen}
      />
    </Stack.Navigator>
  );
};

export default AppointmentsNavigator; 