import { Provider, User } from '../../types';

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
  providerId: string;
  serviceId: string;
  date: string;
  startTime: string;
  endTime: string;
  type: AppointmentType;
  status: AppointmentStatus;
  price: number;
  paymentId?: string;
  rating?: number;
  review?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  patient?: User;
  provider?: Provider;
}

export interface AppointmentFilters {
  status?: AppointmentStatus[];
  type?: AppointmentType;
  startDate?: string;
  endDate?: string;
  providerId?: string;
  patientId?: string;
}

export interface CreateAppointmentDTO {
  patientId: string;
  providerId: string;
  serviceId: string;
  date: string;
  startTime: string;
  endTime: string;
  type: AppointmentType;
  notes?: string;
}

export interface UpdateAppointmentDTO {
  status?: AppointmentStatus;
  rating?: number;
  review?: string;
  notes?: string;
} 