import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, Text, Icon } from '@rneui/themed';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Appointment, AppointmentStatus, AppointmentType } from '../types/appointment.types';

interface AppointmentCardProps {
  appointment: Appointment;
  onPress?: () => void;
}

const getStatusColor = (status: AppointmentStatus): string => {
  switch (status) {
    case AppointmentStatus.PENDING:
      return '#ffc107';
    case AppointmentStatus.CONFIRMED:
      return '#28a745';
    case AppointmentStatus.CANCELLED:
      return '#dc3545';
    case AppointmentStatus.COMPLETED:
      return '#17a2b8';
    default:
      return '#6c757d';
  }
};

const getStatusText = (status: AppointmentStatus): string => {
  switch (status) {
    case AppointmentStatus.PENDING:
      return 'Pendiente';
    case AppointmentStatus.CONFIRMED:
      return 'Confirmada';
    case AppointmentStatus.CANCELLED:
      return 'Cancelada';
    case AppointmentStatus.COMPLETED:
      return 'Completada';
    default:
      return 'Desconocido';
  }
};

const getAppointmentTypeIcon = (type: AppointmentType): string => {
  switch (type) {
    case AppointmentType.IN_PERSON:
      return 'hospital-building';
    case AppointmentType.VIRTUAL:
      return 'video';
    case AppointmentType.HOME_VISIT:
      return 'home';
    default:
      return 'calendar';
  }
};

export const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  onPress,
}) => {
  const formattedDate = format(new Date(appointment.date), 'EEEE d \'de\' MMMM \'de\' yyyy', {
    locale: es,
  });

  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress}>
      <Card containerStyle={styles.card}>
        <View style={styles.header}>
          <View style={styles.providerInfo}>
            <Text style={styles.providerName}>{appointment.provider.name}</Text>
            <Text style={styles.specialty}>{appointment.provider.specialty}</Text>
          </View>
          <Icon
            type="material-community"
            name={getAppointmentTypeIcon(appointment.type)}
            size={24}
            color="#2089dc"
          />
        </View>

        <View style={styles.dateTimeContainer}>
          <Icon
            type="material-community"
            name="calendar"
            size={16}
            color="#666"
            style={styles.icon}
          />
          <Text style={styles.dateTime}>
            {formattedDate} - {appointment.startTime}
          </Text>
        </View>

        <View style={styles.locationContainer}>
          <Icon
            type="material-community"
            name="map-marker"
            size={16}
            color="#666"
            style={styles.icon}
          />
          <Text style={styles.location}>{appointment.provider.location.address}</Text>
        </View>

        <View style={styles.footer}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(appointment.status) }]}>
            <Text style={styles.statusText}>{getStatusText(appointment.status)}</Text>
          </View>
          <Text style={styles.price}>${appointment.price}</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    margin: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  providerInfo: {
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
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    marginRight: 8,
  },
  dateTime: {
    fontSize: 14,
    color: '#333',
  },
  location: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2089dc',
  },
}); 