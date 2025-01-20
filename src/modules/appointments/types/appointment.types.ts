import { Provider, User } from '../../../types';

export enum AppointmentStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  NO_SHOW = 'no_show'
}

export enum AppointmentType {
  IN_PERSON = 'in_person',
  VIRTUAL = 'virtual',
  HOME_VISIT = 'home_visit'
}

export interface AppointmentSlot {
  id: string;
  providerId: string;
  date: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  type: AppointmentType;
  price: number;
}

export interface Appointment {
  id: string;
  patientId: string;
  patient: User;
  providerId: string;
  provider: Provider;
  date: string;
  startTime: string;
  endTime: string;
  type: AppointmentType;
  status: AppointmentStatus;
  price: number;
  paymentStatus: 'pending' | 'completed' | 'refunded';
  symptoms?: string;
  notes?: string;
  rating?: {
    score: number;
    comment: string;
    createdAt: Date;
  };
  prescriptionId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AppointmentFilters {
  status?: AppointmentStatus;
  type?: AppointmentType;
  startDate?: string;
  endDate?: string;
  providerId?: string;
  specialtyId?: string;
}

export interface CreateAppointmentDTO {
  patientId: string;
  providerId: string;
  date: string;
  startTime: string;
  endTime: string;
  type: AppointmentType;
  symptoms?: string;
}

export interface UpdateAppointmentDTO {
  status?: AppointmentStatus;
  notes?: string;
  rating?: {
    score: number;
    comment: string;
  };
  prescriptionId?: string;
} 