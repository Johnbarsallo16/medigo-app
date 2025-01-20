export enum AppointmentStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export enum ProviderType {
  HOSPITAL = 'hospital',
  CLINIC = 'clinic',
  DOCTOR = 'doctor'
}

export interface Provider {
  id: string;
  name: string;
  type: ProviderType;
  specialty?: string;
  rating: number;
  avatar: string;
  location: {
    address: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
}

export interface Appointment {
  id: string;
  providerId: string;
  provider: Provider;
  patientId: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  paymentStatus: 'pending' | 'completed';
  amount: number;
  commission: number;
  prescriptionId?: string;
  rating?: {
    score: number;
    comment: string;
  };
} 