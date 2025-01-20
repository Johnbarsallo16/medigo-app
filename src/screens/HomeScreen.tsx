import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Icon, Text } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../hooks/useAuth';
import { RootStackParamList } from '../navigation/types';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { user } = useAuth();

  if (!user) {
    return (
      <View style={styles.centerContainer}>
        <Text h4>Bienvenido a MediGo</Text>
        <Text style={styles.subtitle}>
          La plataforma que conecta pacientes con profesionales de la salud
        </Text>
        <Button
          title="Iniciar Sesión"
          onPress={() => navigation.navigate('Auth')}
          containerStyle={styles.button}
        />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text h4>Hola, {user.name}</Text>
        <Text style={styles.subtitle}>¿Qué necesitas hoy?</Text>
      </View>

      <View style={styles.quickActions}>
        <Card containerStyle={styles.actionCard}>
          <Icon
            type="material-community"
            name="calendar-plus"
            size={32}
            color="#2089dc"
          />
          <Text style={styles.actionText}>Agendar Cita</Text>
          <Button
            title="Agendar"
            size="sm"
            onPress={() => navigation.navigate('Appointments', {
              screen: 'ScheduleAppointment',
              params: {},
            })}
          />
        </Card>

        <Card containerStyle={styles.actionCard}>
          <Icon
            type="material-community"
            name="doctor"
            size={32}
            color="#2089dc"
          />
          <Text style={styles.actionText}>Buscar Doctor</Text>
          <Button
            title="Buscar"
            size="sm"
            onPress={() => navigation.navigate('Providers')}
          />
        </Card>
      </View>

      <Card containerStyle={styles.upcomingCard}>
        <Card.Title>Próxima Cita</Card.Title>
        <Card.Divider />
        <View style={styles.appointmentInfo}>
          <Icon
            type="material-community"
            name="calendar"
            size={24}
            color="#666"
            style={styles.icon}
          />
          <View style={styles.appointmentDetails}>
            <Text style={styles.doctorName}>Dr. María González</Text>
            <Text style={styles.appointmentDate}>Lunes, 25 de Enero - 09:00</Text>
          </View>
        </View>
        <Button
          title="Ver Detalles"
          type="outline"
          size="sm"
          onPress={() => navigation.navigate('Appointments', {
            screen: 'AppointmentDetail',
            params: { appointmentId: '1' },
          })}
        />
      </Card>

      <Card containerStyle={styles.servicesCard}>
        <Card.Title>Servicios</Card.Title>
        <Card.Divider />
        <View style={styles.servicesList}>
          <View style={styles.serviceItem}>
            <Icon
              type="material-community"
              name="pill"
              size={24}
              color="#2089dc"
            />
            <Text style={styles.serviceText}>Recetas</Text>
          </View>
          <View style={styles.serviceItem}>
            <Icon
              type="material-community"
              name="file-document"
              size={24}
              color="#2089dc"
            />
            <Text style={styles.serviceText}>Historial</Text>
          </View>
          <View style={styles.serviceItem}>
            <Icon
              type="material-community"
              name="credit-card"
              size={24}
              color="#2089dc"
            />
            <Text style={styles.serviceText}>Pagos</Text>
          </View>
          <View style={styles.serviceItem}>
            <Icon
              type="material-community"
              name="chat"
              size={24}
              color="#2089dc"
            />
            <Text style={styles.serviceText}>Chat</Text>
          </View>
        </View>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    padding: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  button: {
    marginTop: 24,
    width: '100%',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  actionCard: {
    flex: 1,
    margin: 8,
    padding: 16,
    alignItems: 'center',
  },
  actionText: {
    marginVertical: 12,
    textAlign: 'center',
  },
  upcomingCard: {
    margin: 16,
    padding: 16,
  },
  appointmentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    marginRight: 12,
  },
  appointmentDetails: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  appointmentDate: {
    fontSize: 14,
    color: '#666',
  },
  servicesCard: {
    margin: 16,
    padding: 16,
  },
  servicesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceItem: {
    width: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  serviceText: {
    marginLeft: 8,
    fontSize: 14,
  },
}); 