import { supabase } from '../../../lib/supabase';
import {
  Appointment,
  AppointmentFilters,
  CreateAppointmentDTO,
  UpdateAppointmentDTO,
  AppointmentStatus,
  Provider
} from '../types';

export const appointmentService = {
  async getAppointments(filters: AppointmentFilters): Promise<Appointment[]> {
    let query = supabase
      .from('appointments')
      .select(`
        *,
        patient:patients(*),
        provider:providers(*)
      `);

    if (filters.status) {
      query = query.in('status', filters.status);
    }
    if (filters.type) {
      query = query.eq('type', filters.type);
    }
    if (filters.startDate) {
      query = query.gte('date', filters.startDate);
    }
    if (filters.endDate) {
      query = query.lte('date', filters.endDate);
    }
    if (filters.providerId) {
      query = query.eq('providerId', filters.providerId);
    }
    if (filters.patientId) {
      query = query.eq('patientId', filters.patientId);
    }

    const { data, error } = await query.order('date', { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    return data as Appointment[];
  },

  async getAppointmentById(id: string): Promise<Appointment> {
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        *,
        patient:patients(*),
        provider:providers(*)
      `)
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data as Appointment;
  },

  async createAppointment(appointment: CreateAppointmentDTO): Promise<Appointment> {
    const { data, error } = await supabase
      .from('appointments')
      .insert({
        ...appointment,
        status: AppointmentStatus.PENDING,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data as Appointment;
  },

  async updateAppointment(id: string, updates: UpdateAppointmentDTO): Promise<Appointment> {
    const { data, error } = await supabase
      .from('appointments')
      .update({
        ...updates,
        updatedAt: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data as Appointment;
  },

  async cancelAppointment(id: string): Promise<Appointment> {
    return this.updateAppointment(id, { status: AppointmentStatus.CANCELLED });
  },

  async completeAppointment(id: string): Promise<Appointment> {
    return this.updateAppointment(id, { status: AppointmentStatus.COMPLETED });
  },

  async rateAppointment(id: string, rating: number, review?: string): Promise<Appointment> {
    return this.updateAppointment(id, { rating, review });
  },

  async getProviders(specialty?: string): Promise<Provider[]> {
    // Simulación de datos
    return [];
  },

  async getAvailableTimeSlots(
    providerId: string,
    date: string
  ): Promise<string[]> {
    // Simulación de datos
    return [
      '09:00', '09:30', '10:00', '10:30', '11:00',
      '11:30', '15:00', '15:30', '16:00', '16:30'
    ];
  }
}; 