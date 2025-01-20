import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppointmentListScreen } from '../screens/AppointmentListScreen';
import { AppointmentDetailScreen } from '../screens/AppointmentDetailScreen';
import { ScheduleAppointmentScreen } from '../screens/ScheduleAppointmentScreen';

export type AppointmentsStackParamList = {
  AppointmentList: undefined;
  AppointmentDetail: {
    appointmentId: string;
  };
  ScheduleAppointment: {
    providerId?: string;
  };
};

const Stack = createNativeStackNavigator<AppointmentsStackParamList>();

export const AppointmentsNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AppointmentList"
        component={AppointmentListScreen}
        options={{
          title: 'Mis Citas',
        }}
      />
      <Stack.Screen
        name="AppointmentDetail"
        component={AppointmentDetailScreen}
        options={{
          title: 'Detalles de la Cita',
        }}
      />
      <Stack.Screen
        name="ScheduleAppointment"
        component={ScheduleAppointmentScreen}
        options={{
          title: 'Agendar Cita',
        }}
      />
    </Stack.Navigator>
  );
}; 