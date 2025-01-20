import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Header, ButtonGroup, Card, ListItem, FAB, Avatar, Badge } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { appointmentService } from '../services/AppointmentService';
import { AppointmentStatus } from '../types';

const AppointmentListScreen = ({ navigation }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const buttons = ['Próximas', 'Pendientes', 'Historial'];
  const statusMap = [AppointmentStatus.CONFIRMED, AppointmentStatus.PENDING, AppointmentStatus.COMPLETED];

  useEffect(() => {
    loadAppointments();
  }, [selectedIndex]);

  const loadAppointments = async () => {
    try {
      setLoading(true);
      const status = statusMap[selectedIndex];
      const userId = 'current-user-id'; // En una implementación real, obtener del contexto de autenticación
      const data = await appointmentService.getAppointments(userId, status);
      setAppointments(data);
    } catch (error) {
      console.error('Error loading appointments:', error);
      // Aquí deberíamos mostrar un mensaje de error al usuario
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const statusColors = {
      [AppointmentStatus.CONFIRMED]: 'success',
      [AppointmentStatus.PENDING]: 'warning',
      [AppointmentStatus.CANCELLED]: 'error',
      [AppointmentStatus.COMPLETED]: 'primary'
    };
    return statusColors[status] || 'primary';
  };

  const getStatusText = (status) => {
    const statusTexts = {
      [AppointmentStatus.CONFIRMED]: 'Confirmada',
      [AppointmentStatus.PENDING]: 'Pendiente',
      [AppointmentStatus.CANCELLED]: 'Cancelada',
      [AppointmentStatus.COMPLETED]: 'Completada'
    };
    return statusTexts[status] || status;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        centerComponent={{ text: 'Mis Citas', style: styles.headerText }}
        leftComponent={{ icon: 'menu', color: '#fff', onPress: () => {} }}
        rightComponent={{ icon: 'event', color: '#fff', onPress: () => {} }}
      />

      <ButtonGroup
        buttons={buttons}
        selectedIndex={selectedIndex}
        onPress={setSelectedIndex}
        containerStyle={styles.buttonGroup}
      />

      <View style={styles.listContainer}>
        {appointments.map((appointment) => (
          <Card key={appointment.id} containerStyle={styles.card}>
            <ListItem>
              <Avatar
                rounded
                source={{ uri: appointment.provider.avatar }}
              />
              <ListItem.Content>
                <ListItem.Title>{appointment.provider.name}</ListItem.Title>
                <ListItem.Subtitle>{appointment.provider.specialty}</ListItem.Subtitle>
                <View style={styles.appointmentInfo}>
                  <ListItem.Subtitle>{`${appointment.date} ${appointment.time}`}</ListItem.Subtitle>
                  <Badge
                    status={getStatusColor(appointment.status)}
                    value={getStatusText(appointment.status)}
                  />
                </View>
              </ListItem.Content>
            </ListItem>
          </Card>
        ))}
      </View>

      <FAB
        visible={true}
        icon={{ name: 'add', color: 'white', type: 'material' }}
        color="#2089dc"
        style={styles.fab}
        onPress={() => navigation.navigate('NewAppointment')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonGroup: {
    marginHorizontal: 10,
    marginTop: 10,
  },
  listContainer: {
    flex: 1,
    padding: 10,
  },
  card: {
    marginBottom: 10,
    borderRadius: 10,
  },
  appointmentInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  fab: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  }
});

export default AppointmentListScreen; 