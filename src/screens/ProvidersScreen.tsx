import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, Icon, SearchBar, Text } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Provider, ProviderType, Role } from '../types';
import { RootStackParamList } from '../navigation/types';

type ProvidersScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Datos de ejemplo
const mockProviders: Provider[] = [
  {
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
  // Agregar más proveedores aquí...
];

export const ProvidersScreen: React.FC = () => {
  const navigation = useNavigation<ProvidersScreenNavigationProp>();
  const [search, setSearch] = useState('');
  const [filteredProviders, setFilteredProviders] = useState(mockProviders);

  const handleSearch = (text: string) => {
    setSearch(text);
    const filtered = mockProviders.filter(provider =>
      provider.name.toLowerCase().includes(text.toLowerCase()) ||
      provider.specialty.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProviders(filtered);
  };

  const renderProvider = ({ item }: { item: Provider }) => (
    <Card containerStyle={styles.card}>
      <View style={styles.providerHeader}>
        <View style={styles.providerInfo}>
          <Text style={styles.providerName}>{item.name}</Text>
          <Text style={styles.specialty}>{item.specialty}</Text>
          <View style={styles.ratingContainer}>
            <Icon
              type="material-community"
              name="star"
              size={16}
              color="#ffc107"
            />
            <Text style={styles.rating}>{item.rating}</Text>
          </View>
        </View>
        <Icon
          type="material-community"
          name="doctor"
          size={40}
          color="#2089dc"
        />
      </View>

      <View style={styles.locationContainer}>
        <Icon
          type="material-community"
          name="map-marker"
          size={16}
          color="#666"
          style={styles.icon}
        />
        <Text style={styles.location}>{item.location.address}</Text>
      </View>

      <View style={styles.servicesContainer}>
        {item.services.map(service => (
          <View key={service.id} style={styles.serviceItem}>
            <Text style={styles.serviceName}>{service.name}</Text>
            <Text style={styles.servicePrice}>${service.price}</Text>
          </View>
        ))}
      </View>

      <Button
        title="Agendar Cita"
        onPress={() => navigation.navigate('Appointments', {
          screen: 'ScheduleAppointment',
          params: { providerId: item.id },
        })}
      />
    </Card>
  );

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Buscar por nombre o especialidad..."
        onChangeText={handleSearch}
        value={search}
        platform="default"
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.searchInputContainer}
      />

      <FlatList
        data={filteredProviders}
        renderItem={renderProvider}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    padding: 8,
  },
  searchInputContainer: {
    backgroundColor: '#fff',
  },
  list: {
    padding: 8,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    margin: 8,
  },
  providerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
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
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 4,
    color: '#666',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    marginRight: 8,
  },
  location: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  servicesContainer: {
    marginBottom: 16,
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e1e1e1',
  },
  serviceName: {
    fontSize: 14,
  },
  servicePrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2089dc',
  },
}); 