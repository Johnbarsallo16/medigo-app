import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Role, ProviderType } from '../../../types';
import {
  Appointment,
  AppointmentFilters,
  AppointmentSlot,
  AppointmentStatus,
  AppointmentType,
  CreateAppointmentDTO,
  UpdateAppointmentDTO,
} from '../types/appointment.types';

// Simulación de datos para desarrollo frontend
const mockAppointments: Appointment[] = [
  {
    id: '1',
    patientId: 'patient-1',
    patient: {
      id: 'patient-1',
      name: 'Juan Pérez',
      email: 'juan@example.com',
      phone: '+58 412-1234567',
      role: Role.CLIENT,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    providerId: 'provider-1',
    provider: {
      id: 'provider-1',
      name: 'Dr. María González',
      email: 'maria@example.com',
      phone: '+58 412-7654321',
      role: Role.PROVIDER,
      type: ProviderType.DOCTOR,
      specialty: 'Cardiología',
      license: 'MED-12345',
      rating: 4.8,
      location: {
        address: 'Clínica Santa María, Caracas',
        coordinates: {
          latitude: 10.4806,
          longitude: -66.9036,
        },
      },
      availability: {
        monday: ['09:00', '10:00', '11:00'],
        wednesday: ['14:00', '15:00', '16:00'],
        friday: ['09:00', '10:00', '11:00'],
      },
      services: [
        {
          id: 'service-1',
          name: 'Consulta General',
          price: 50,
          duration: 30,
        },
      ],
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    date: '2024-01-25',
    startTime: '09:00',
    endTime: '09:30',
    type: AppointmentType.IN_PERSON,
    status: AppointmentStatus.CONFIRMED,
    price: 50,
    paymentStatus: 'completed',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

class AppointmentService {
  async getAppointments(userId: string, filters?: AppointmentFilters): Promise<Appointment[]> {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Filtrar appointments basado en los criterios
    return mockAppointments.filter(appointment => {
      if (appointment.patientId !== userId) return false;
      if (filters?.status && appointment.status !== filters.status) return false;
      if (filters?.type && appointment.type !== filters.type) return false;
      if (filters?.providerId && appointment.providerId !== filters.providerId) return false;
      if (filters?.startDate && appointment.date < filters.startDate) return false;
      if (filters?.endDate && appointment.date > filters.endDate) return false;
      return true;
    });
  }

  async getAvailableSlots(
    providerId: string,
    date: Date,
    type: AppointmentType
  ): Promise<AppointmentSlot[]> {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1000));

    const formattedDate = format(date, 'yyyy-MM-dd');
    const dayOfWeek = format(date, 'EEEE', { locale: es }).toLowerCase();

    // Encontrar el provider
    const provider = mockAppointments[0].provider; // En una implementación real, buscaríamos el provider
    const availability = provider.availability[dayOfWeek] || [];

    // Generar slots basados en la disponibilidad
    return availability.map(time => ({
      id: `slot-${providerId}-${formattedDate}-${time}`,
      providerId,
      date: formattedDate,
      startTime: time,
      endTime: '09:30', // En una implementación real, calcularíamos esto basado en la duración del servicio
      isAvailable: true,
      type,
      price: provider.services[0].price,
    }));
  }

  async createAppointment(data: CreateAppointmentDTO): Promise<Appointment> {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1000));

    const appointment: Appointment = {
      id: `appointment-${Date.now()}`,
      ...data,
      patient: mockAppointments[0].patient,
      provider: mockAppointments[0].provider,
      status: AppointmentStatus.PENDING,
      price: mockAppointments[0].provider.services[0].price,
      paymentStatus: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockAppointments.push(appointment);
    return appointment;
  }

  async updateAppointment(id: string, data: UpdateAppointmentDTO): Promise<Appointment> {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1000));

    const appointment = mockAppointments.find(a => a.id === id);
    if (!appointment) {
      throw new Error('Appointment not found');
    }

    Object.assign(appointment, {
      ...data,
      updatedAt: new Date(),
    });

    return appointment;
  }

  async cancelAppointment(id: string): Promise<void> {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1000));

    const appointment = mockAppointments.find(a => a.id === id);
    if (!appointment) {
      throw new Error('Appointment not found');
    }

    appointment.status = AppointmentStatus.CANCELLED;
    appointment.updatedAt = new Date();
  }
}

export const appointmentService = new AppointmentService(); 