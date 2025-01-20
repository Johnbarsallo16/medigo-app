import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, Icon, Text } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useAppointments } from '../hooks/useAppointments';
import { Appointment, AppointmentStatus } from '../types';
import { AppointmentsStackParamList } from '../navigation/AppointmentsNavigator';

type AppointmentListScreenNavigationProp = NativeStackNavigationProp<
  AppointmentsStackParamList,
  'AppointmentList'
>;

export const AppointmentListScreen: React.FC = () => {
  const navigation = useNavigation<AppointmentListScreenNavigationProp>();
  const { appointments, loading, error, fetchAppointments } = useAppointments();

  useEffect(() => {
    fetchAppointments({
      status: [
        AppointmentStatus.PENDING,
        AppointmentStatus.CONFIRMED,
        AppointmentStatus.IN_PROGRESS,
      ],
    });
  }, [fetchAppointments]);

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

  const renderAppointment = ({ item }: { item: Appointment }) => (
    <Card containerStyle={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.date}>
            {format(new Date(item.date), "EEEE d 'de' MMMM", { locale: es })}
          </Text>
          <Text style={styles.time}>
            {item.startTime} - {item.endTime}
          </Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.status) },
          ]}
        >
          <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
        </View>
      </View>

      <View style={styles.providerInfo}>
        <Icon
          type="material-community"
          name="doctor"
          size={24}
          color="#2089dc"
          style={styles.icon}
        />
        <View style={styles.providerDetails}>
          <Text style={styles.providerName}>{item.provider?.name}</Text>
          <Text style={styles.specialty}>
            {(item.provider as any)?.specialty || 'Especialidad no especificada'}
          </Text>
        </View>
      </View>

      <Button
        title="Ver Detalles"
        type="outline"
        onPress={() =>
          navigation.navigate('AppointmentDetail', {
            appointmentId: item.id,
          })
        }
      />
    </Card>
  );

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Button
          title="Reintentar"
          onPress={() => fetchAppointments({})}
          containerStyle={styles.retryButton}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button
        title="Nueva Cita"
        icon={{
          type: 'material-community',
          name: 'plus',
          color: 'white',
        }}
        onPress={() =>
          navigation.navigate('ScheduleAppointment', {
            providerId: undefined,
          })
        }
        containerStyle={styles.newAppointmentButton}
      />

      <FlatList
        data={appointments}
        renderItem={renderAppointment}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        refreshing={loading}
        onRefresh={() => fetchAppointments({})}
      />
    </View>
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
  retryButton: {
    width: 200,
  },
  newAppointmentButton: {
    margin: 16,
  },
  list: {
    padding: 8,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    margin: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  headerLeft: {
    flex: 1,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    textTransform: 'capitalize',
  },
  time: {
    fontSize: 14,
    color: '#666',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  providerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    marginRight: 12,
  },
  providerDetails: {
    flex: 1,
  },
  providerName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  specialty: {
    fontSize: 14,
    color: '#666',
  },
}); 