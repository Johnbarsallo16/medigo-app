export enum Role {
  CLIENT = 'CLIENT',
  PROVIDER = 'PROVIDER',
  ADMIN = 'ADMIN',
}

export enum ProviderType {
  DOCTOR = 'DOCTOR',
  NURSE = 'NURSE',
  THERAPIST = 'THERAPIST',
  SPECIALIST = 'SPECIALIST',
}

export enum PrescriptionStatus {
  ACTIVE = 'active',
  EXPIRED = 'expired',
  FILLED = 'filled',
  CANCELLED = 'cancelled'
}

export enum VerificationStatus {
  PENDING = 'pending',
  VERIFIED = 'verified',
  REJECTED = 'rejected'
}

export interface Location {
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface Service {
  id: string;
  name: string;
  description?: string;
  price: number;
  duration: number;
}

export interface Availability {
  [key: string]: string[]; // días de la semana como llaves y arrays de horarios como valores
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  status: 'active' | 'inactive' | 'pending';
  createdAt: Date;
  updatedAt: Date;
}

export interface Provider extends User {
  type: ProviderType;
  specialty: string;
  license: string;
  rating: number;
  location: Location;
  availability: Availability;
  services: Service[];
}

export interface Client extends User {
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  bloodType?: string;
  allergies?: string[];
  medicalConditions?: string[];
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export interface Prescription {
  id: string;
  patientId: string;
  doctorId?: string;
  issueDate: Date;
  expiryDate: Date;
  isDigital: boolean;
  status: PrescriptionStatus;
  medications: {
    medicineId: string;
    dosage: string;
    quantity: number;
    maxFills: number;
    fillInterval: number;
    remainingFills: number;
  }[];
  verificationStatus: VerificationStatus;
  verifiedBy?: string;
  lastFillDate?: Date;
}

export interface PrescriptionFill {
  id: string;
  prescriptionId: string;
  pharmacyId: string;
  fillDate: Date;
  medications: {
    medicineId: string;
    quantity: number;
  }[];
  orderId: string;
}

export interface PaymentInfo {
  amount: number;
  commission: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  provider: '2checkout';
  transactionId: string;
  createdAt: Date;
  completedAt?: Date;
} 