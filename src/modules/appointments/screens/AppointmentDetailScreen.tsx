import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Icon, Text } from '@rneui/themed';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { appointmentService } from '../services/AppointmentService';
import { Appointment, AppointmentStatus } from '../types';
import { AppointmentsStackParamList } from '../navigation/AppointmentsNavigator';

type AppointmentDetailScreenRouteProp = RouteProp<
  AppointmentsStackParamList,
  'AppointmentDetail'
>;

export const AppointmentDetailScreen: React.FC = () => {
  const route = useRoute<AppointmentDetailScreenRouteProp>();
  const navigation = useNavigation();
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointment = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await appointmentService.getAppointmentById(route.params.appointmentId);
        setAppointment(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar la cita');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [route.params.appointmentId]);

  const handleCancel = async () => {
    if (!appointment) return;

    setLoading(true);
    setError(null);
    try {
      const updatedAppointment = await appointmentService.cancelAppointment(appointment.id);
      setAppointment(updatedAppointment);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cancelar la cita');
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

  if (!appointment) {
    return (
      <View style={styles.centerContainer}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  const getStatusColor = (status: AppointmentStatus) => {
    switch (status) {
      case AppointmentStatus.CONFIRMED:
        return '#28a745';
      case AppointmentStatus.PENDING:
        return '#ffc107';
      case AppointmentStatus.IN_PROGRESS:
        return '#17a2b8';
      case AppointmentStatus.COMPLETED:
        return '#6c757d';
      case AppointmentStatus.CANCELLED:
        return '#dc3545';
      case AppointmentStatus.NO_SHOW:
        return '#343a40';
      default:
        return '#6c757d';
    }
  };

  const getStatusText = (status: AppointmentStatus) => {
    switch (status) {
      case AppointmentStatus.CONFIRMED:
        return 'Confirmada';
      case AppointmentStatus.PENDING:
        return 'Pendiente';
      case AppointmentStatus.IN_PROGRESS:
        return 'En Progreso';
      case AppointmentStatus.COMPLETED:
        return 'Completada';
      case AppointmentStatus.CANCELLED:
        return 'Cancelada';
      case AppointmentStatus.NO_SHOW:
        return 'No Asistió';
      default:
        return status;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card containerStyle={styles.card}>
        <View style={styles.header}>
          <Text h4>Detalles de la Cita</Text>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(appointment.status) },
            ]}
          >
            <Text style={styles.statusText}>{getStatusText(appointment.status)}</Text>
          </View>
        </View>

        <Card.Divider />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fecha y Hora</Text>
          <View style={styles.infoRow}>
            <Icon
              type="material-community"
              name="calendar"
              size={24}
              color="#666"
              style={styles.icon}
            />
            <Text style={styles.infoText}>
              {format(new Date(appointment.date), "EEEE d 'de' MMMM 'de' yyyy", {
                locale: es,
              })}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Icon
              type="material-community"
              name="clock"
              size={24}
              color="#666"
              style={styles.icon}
            />
            <Text style={styles.infoText}>
              {appointment.startTime} - {appointment.endTime}
            </Text>
          </View>
        </View>

        <Card.Divider />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información del Doctor</Text>
          <View style={styles.infoRow}>
            <Icon
              type="material-community"
              name="doctor"
              size={24}
              color="#666"
              style={styles.icon}
            />
            <View>
              <Text style={styles.doctorName}>{appointment.provider?.name}</Text>
              <Text style={styles.specialty}>
                {(appointment.provider as any)?.specialty || 'Especialidad no especificada'}
              </Text>
            </View>
          </View>
        </View>

        {appointment.notes && (
          <>
            <Card.Divider />
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Notas</Text>
              <Text style={styles.notes}>{appointment.notes}</Text>
            </View>
          </>
        )}

        {appointment.status !== AppointmentStatus.CANCELLED &&
          appointment.status !== AppointmentStatus.COMPLETED && (
            <>
              <Card.Divider />
              <Button
                title="Cancelar Cita"
                type="outline"
                buttonStyle={{ borderColor: '#dc3545' }}
                titleStyle={{ color: '#dc3545' }}
                onPress={handleCancel}
                loading={loading}
                containerStyle={styles.button}
              />
            </>
          )}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  section: {
    marginVertical: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    marginRight: 12,
  },
  infoText: {
    fontSize: 16,
    textTransform: 'capitalize',
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  specialty: {
    fontSize: 14,
    color: '#666',
  },
  notes: {
    fontSize: 16,
    color: '#666',
  },
  button: {
    marginTop: 8,
  },
}); 