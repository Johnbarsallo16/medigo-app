import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Header, Card, Text, Button, Icon } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';
import { Appointment } from '../types';

type RootStackParamList = {
  AppointmentList: undefined;
  NewAppointment: undefined;
  AppointmentConfirmation: {
    appointment: Appointment;
  };
  AppointmentLocation: {
    appointment: Appointment;
  };
};

type AppointmentConfirmationScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'AppointmentConfirmation'>;
  route: RouteProp<RootStackParamList, 'AppointmentConfirmation'>;
};

const AppointmentConfirmationScreen: React.FC<AppointmentConfirmationScreenProps> = ({ 
  navigation, 
  route 
}) => {
  const { appointment } = route.params;

  const handleAddToCalendar = async () => {
    // Implementar lógica para agregar al calendario
    // Usar expo-calendar
  };

  const handleViewLocation = () => {
    navigation.navigate('AppointmentLocation', { appointment });
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
            <Text style={styles.value}>{appointment.provider.name}</Text>
            
            <Text style={styles.label}>Especialidad:</Text>
            <Text style={styles.value}>{appointment.provider.specialty}</Text>
            
            <Text style={styles.label}>Fecha:</Text>
            <Text style={styles.value}>{appointment.date}</Text>
            
            <Text style={styles.label}>Hora:</Text>
            <Text style={styles.value}>{appointment.time}</Text>
            
            <Text style={styles.label}>Ubicación:</Text>
            <Text style={styles.value}>{appointment.provider.location.address}</Text>
          </View>

          <View style={styles.qrContainer}>
            <QRCode
              value={appointment.id}
              size={200}
            />
            <Text style={styles.codeText}>{appointment.id}</Text>
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