import { NavigatorScreenParams } from '@react-navigation/native';
import { AppointmentsStackParamList } from '../modules/appointments';

export type RootStackParamList = {
  Root: undefined;
  Home: undefined;
  Profile: undefined;
  Auth: undefined;
  Appointments: NavigatorScreenParams<AppointmentsStackParamList>;
  Providers: undefined;
}; 