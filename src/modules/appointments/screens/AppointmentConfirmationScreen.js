import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Header, Card, Text, Button, Icon } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import QRCode from 'react-native-qrcode-svg';

const AppointmentConfirmationScreen = ({ navigation, route }) => {
  // En una implementación real, estos datos vendrían de route.params
  const appointmentDetails = {
    doctor: {
      name: 'Dr. Juan Pérez',
      specialty: 'Cardiología',
    },
    date: '2024-01-25',
    time: '15:30',
    location: 'Clínica Médica Central',
    code: 'APPT-2024-001',
  };

  const handleAddToCalendar = async () => {
    // Implementar lógica para agregar al calendario
    // Usar expo-calendar
  };

  const handleViewLocation = () => {
    // Implementar navegación al mapa
    navigation.navigate('AppointmentLocation', { appointment: appointmentDetails });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        centerComponent={{ text: 'Confirmación', style: styles.headerText }}
        leftComponent={{
          icon: 'arrow-back',
          color: '#fff',
          onPress: () => navigation.navigate('AppointmentList')
        }}
      />

      <View style={styles.content}>
        <Card containerStyle={styles.card}>
          <Card.Title>¡Cita Confirmada!</Card.Title>
          <Card.Divider />
          
          <View style={styles.detailsContainer}>
            <Text style={styles.label}>Doctor:</Text>
            <Text style={styles.value}>{appointmentDetails.doctor.name}</Text>
            
            <Text style={styles.label}>Especialidad:</Text>
            <Text style={styles.value}>{appointmentDetails.doctor.specialty}</Text>
            
            <Text style={styles.label}>Fecha:</Text>
            <Text style={styles.value}>{appointmentDetails.date}</Text>
            
            <Text style={styles.label}>Hora:</Text>
            <Text style={styles.value}>{appointmentDetails.time}</Text>
            
            <Text style={styles.label}>Ubicación:</Text>
            <Text style={styles.value}>{appointmentDetails.location}</Text>
          </View>

          <View style={styles.qrContainer}>
            <QRCode
              value={appointmentDetails.code}
              size={200}
            />
            <Text style={styles.codeText}>{appointmentDetails.code}</Text>
          </View>
        </Card>

        <View style={styles.actionsContainer}>
          <Button
            icon={<Icon name="event" color="white" style={styles.buttonIcon} />}
            title="Agregar al Calendario"
            onPress={handleAddToCalendar}
            containerStyle={styles.button}
          />
          
          <Button
            icon={<Icon name="place" color="white" style={styles.buttonIcon} />}
            title="Ver Ubicación"
            onPress={handleViewLocation}
            containerStyle={styles.button}
          />
        </View>
      </View>
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
  content: {
    flex: 1,
    padding: 15,
  },
  card: {
    borderRadius: 10,
    padding: 15,
  },
  detailsContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    marginBottom: 5,
  },
  qrContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  codeText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionsContainer: {
    marginTop: 20,
  },
  button: {
    marginVertical: 5,
  },
  buttonIcon: {
    marginRight: 10,
  },
});

export default AppointmentConfirmationScreen; 