import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { Text } from '@rneui/themed';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Appointment, AppointmentFilters } from '../types/appointment.types';
import { appointmentService } from '../services/appointment.service';
import { AppointmentCard } from './AppointmentCard';

interface AppointmentListProps {
  userId: string;
  filters?: AppointmentFilters;
  onAppointmentPress?: (appointment: Appointment) => void;
}

export const AppointmentList: React.FC<AppointmentListProps> = ({
  userId,
  filters,
  onAppointmentPress,
}) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadAppointments = useCallback(async () => {
    try {
      const data = await appointmentService.getAppointments(userId, filters);
      setAppointments(data);
    } catch (error) {
      console.error('Error loading appointments:', error);
    } finally {
      setLoading(false);
    }
  }, [userId, filters]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadAppointments();
    setRefreshing(false);
  }, [loadAppointments]);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  const renderAppointment = ({ item }: { item: Appointment }) => (
    <AppointmentCard
      appointment={item}
      onPress={() => onAppointmentPress?.(item)}
    />
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.centerContainer}>
        <Text>Cargando citas...</Text>
      </View>
    );
  }

  if (appointments.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text>No hay citas programadas</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={appointments}
      renderItem={renderAppointment}
      keyExtractor={(item) => item.id}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          title="Actualizando..."
          tintColor="#2089dc"
          titleColor="#2089dc"
        />
      }
      contentContainerStyle={styles.listContainer}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  listContainer: {
    padding: 16,
  },
  separator: {
    height: 16,
  },
}); 