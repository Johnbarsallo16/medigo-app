import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Icon, Text } from '@rneui/themed';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useAppointments } from '../hooks/useAppointments';
import { AppointmentType, Provider } from '../types';
import { AppointmentsStackParamList } from '../navigation/AppointmentsNavigator';

type ScheduleAppointmentScreenRouteProp = RouteProp<
  AppointmentsStackParamList,
  'ScheduleAppointment'
>;

export const ScheduleAppointmentScreen: React.FC = () => {
  const route = useRoute<ScheduleAppointmentScreenRouteProp>();
  const navigation = useNavigation();
  const { createAppointment } = useAppointments();

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [provider, setProvider] = useState<Provider | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProvider = async () => {
      if (!route.params?.providerId) return;

      setLoading(true);
      setError(null);
      try {
        // En una implementación real, cargaríamos el proveedor desde el backend
        // const data = await providerService.getProviderById(route.params.providerId);
        // setProvider(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar el proveedor');
      } finally {
        setLoading(false);
      }
    };

    loadProvider();
  }, [route.params?.providerId]);

  const handleSchedule = async () => {
    if (!provider || !selectedDate || !selectedTime || !selectedService) {
      setError('Por favor complete todos los campos');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await createAppointment({
        providerId: provider.id,
        serviceId: selectedService,
        date: selectedDate,
        startTime: selectedTime,
        endTime: format(
          new Date(selectedDate + 'T' + selectedTime),
          'HH:mm',
          { locale: es }
        ),
        type: AppointmentType.IN_PERSON,
      });

      navigation.navigate('AppointmentList');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al agendar la cita');
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Button
          title="Volver"
          onPress={() => navigation.goBack()}
          containerStyle={styles.button}
        />
      </View>
    );
  }

  if (!provider) {
    return (
      <View style={styles.centerContainer}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Card containerStyle={styles.card}>
        <Text h4 style={styles.title}>Agendar Cita</Text>

        <View style={styles.providerInfo}>
          <Icon
            type="material-community"
            name="doctor"
            size={24}
            color="#2089dc"
            style={styles.icon}
          />
          <View style={styles.providerDetails}>
            <Text style={styles.providerName}>{provider.name}</Text>
            <Text style={styles.specialty}>{provider.specialty}</Text>
          </View>
        </View>

        <Card.Divider />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Servicios</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {provider.services.map(service => (
              <Card
                key={service.id}
                containerStyle={[
                  styles.serviceCard,
                  selectedService === service.id && styles.selectedServiceCard,
                ]}
                onPress={() => setSelectedService(service.id)}
              >
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.servicePrice}>${service.price}</Text>
                <Text style={styles.serviceDuration}>{service.duration} min</Text>
              </Card>
            ))}
          </ScrollView>
        </View>

        <Card.Divider />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fecha y Hora</Text>
          {/* Aquí iría un calendario y selector de hora */}
        </View>

        <Button
          title="Agendar Cita"
          onPress={handleSchedule}
          loading={loading}
          disabled={!selectedDate || !selectedTime || !selectedService}
          containerStyle={styles.button}
        />
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
  errorText: {
    color: '#dc3545',
    textAlign: 'center',
    marginBottom: 16,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    margin: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
  },
  providerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  icon: {
    marginRight: 12,
  },
  providerDetails: {
    flex: 1,
  },
  providerName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  specialty: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  serviceCard: {
    width: 150,
    margin: 4,
    padding: 12,
    borderRadius: 8,
  },
  selectedServiceCard: {
    backgroundColor: '#e6f3ff',
    borderColor: '#2089dc',
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  servicePrice: {
    fontSize: 14,
    color: '#2089dc',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  serviceDuration: {
    fontSize: 12,
    color: '#666',
  },
  button: {
    marginTop: 24,
  },
}); 