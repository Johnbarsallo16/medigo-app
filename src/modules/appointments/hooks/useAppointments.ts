import { useState, useCallback } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { appointmentService } from '../services/AppointmentService';
import {
  Appointment,
  AppointmentFilters,
  CreateAppointmentDTO,
  UpdateAppointmentDTO,
} from '../types';

export const useAppointments = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = useCallback(async (filters: AppointmentFilters) => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const data = await appointmentService.getAppointments({
        ...filters,
        patientId: user.role === 'CLIENT' ? user.id : undefined,
        providerId: user.role === 'PROVIDER' ? user.id : undefined,
      });
      setAppointments(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar las citas');
    } finally {
      setLoading(false);
    }
  }, [user]);

  const createAppointment = async (appointment: CreateAppointmentDTO) => {
    if (!user) throw new Error('Usuario no autenticado');

    setLoading(true);
    setError(null);

    try {
      const newAppointment = await appointmentService.createAppointment({
        ...appointment,
        patientId: user.id,
      });
      setAppointments(prev => [...prev, newAppointment]);
      return newAppointment;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear la cita');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateAppointment = async (id: string, updates: UpdateAppointmentDTO) => {
    if (!user) throw new Error('Usuario no autenticado');

    setLoading(true);
    setError(null);

    try {
      const updatedAppointment = await appointmentService.updateAppointment(id, updates);
      setAppointments(prev =>
        prev.map(app => (app.id === id ? updatedAppointment : app))
      );
      return updatedAppointment;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar la cita');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (id: string) => {
    if (!user) throw new Error('Usuario no autenticado');

    setLoading(true);
    setError(null);

    try {
      const cancelledAppointment = await appointmentService.cancelAppointment(id);
      setAppointments(prev =>
        prev.map(app => (app.id === id ? cancelledAppointment : app))
      );
      return cancelledAppointment;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cancelar la cita');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const rateAppointment = async (id: string, rating: number, review?: string) => {
    if (!user) throw new Error('Usuario no autenticado');

    setLoading(true);
    setError(null);

    try {
      const ratedAppointment = await appointmentService.rateAppointment(id, rating, review);
      setAppointments(prev =>
        prev.map(app => (app.id === id ? ratedAppointment : app))
      );
      return ratedAppointment;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calificar la cita');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    appointments,
    loading,
    error,
    fetchAppointments,
    createAppointment,
    updateAppointment,
    cancelAppointment,
    rateAppointment,
  };
}; 