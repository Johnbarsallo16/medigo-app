import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Icon, Text } from '@rneui/themed';

interface AppointmentSuccessScreenProps {
  navigation: any;
}

export const AppointmentSuccessScreen: React.FC<AppointmentSuccessScreenProps> = ({
  navigation,
}) => {
  return (
    <View style={styles.container}>
      <Icon
        type="material-community"
        name="check-circle"
        size={80}
        color="#28a745"
        style={styles.icon}
      />

      <Text h3 style={styles.title}>
        ¡Cita Agendada!
      </Text>

      <Text style={styles.message}>
        Tu cita ha sido agendada exitosamente. Recibirás un correo electrónico con los detalles
        y recordatorios antes de la cita.
      </Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Ver Mis Citas"
          onPress={() => navigation.navigate('Appointments')}
          containerStyle={styles.button}
        />

        <Button
          title="Volver al Inicio"
          type="outline"
          onPress={() => navigation.navigate('Home')}
          containerStyle={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  icon: {
    marginBottom: 24,
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 32,
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    marginBottom: 16,
  },
}); 