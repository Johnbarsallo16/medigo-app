import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, ButtonGroup, Text } from '@rneui/themed';
import { AppointmentList } from '../components/AppointmentList';
import { AppointmentStatus } from '../types/appointment.types';
import { useAuth } from '../../../hooks/useAuth';

const filterButtons = ['Próximas', 'Completadas', 'Canceladas'];
const filterMap = {
  0: AppointmentStatus.CONFIRMED,
  1: AppointmentStatus.COMPLETED,
  2: AppointmentStatus.CANCELLED,
};

export const AppointmentsScreen: React.FC = () => {
  const { user } = useAuth();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleAppointmentPress = (appointmentId: string) => {
    // Navegar al detalle de la cita
    console.log('Navigate to appointment details:', appointmentId);
  };

  if (!user) {
    return (
      <View style={styles.centerContainer}>
        <Text>Debes iniciar sesión para ver tus citas</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text h4>Mis Citas</Text>
        <Button
          title="Nueva Cita"
          type="outline"
          size="sm"
          onPress={() => {
            // Navegar a la pantalla de agendar cita
            console.log('Navigate to schedule appointment');
          }}
        />
      </View>

      <ButtonGroup
        buttons={filterButtons}
        selectedIndex={selectedIndex}
        onPress={setSelectedIndex}
        containerStyle={styles.filterButtons}
      />

      <AppointmentList
        userId={user.id}
        filters={{ status: filterMap[selectedIndex as keyof typeof filterMap] }}
        onAppointmentPress={appointment => handleAppointmentPress(appointment.id)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  filterButtons: {
    marginBottom: 16,
    marginHorizontal: 16,
  },
}); 