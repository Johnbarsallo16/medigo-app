import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Header, SearchBar, Card, ListItem, Button, Text, Avatar } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { appointmentService } from '../services/AppointmentService';
import { Provider } from '../types';

const NewAppointmentScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);

  useEffect(() => {
    if (selectedSpecialty) {
      loadProviders();
    }
  }, [selectedSpecialty]);

  useEffect(() => {
    if (selectedProvider && selectedDate) {
      loadTimeSlots();
    }
  }, [selectedProvider, selectedDate]);

  const loadProviders = async () => {
    try {
      setLoading(true);
      const data = await appointmentService.getProviders(selectedSpecialty);
      setProviders(data);
    } catch (error) {
      console.error('Error loading providers:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadTimeSlots = async () => {
    if (!selectedProvider || !selectedDate) return;

    try {
      setLoading(true);
      const slots = await appointmentService.getAvailableTimeSlots(
        selectedProvider.id,
        selectedDate
      );
      setTimeSlots(slots);
    } catch (error) {
      console.error('Error loading time slots:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAppointment = async () => {
    if (!selectedProvider || !selectedDate || !selectedTime) return;

    try {
      setLoading(true);
      const userId = 'current-user-id'; // En una implementación real, obtener del contexto de autenticación
      await appointmentService.createAppointment(
        userId,
        selectedProvider.id,
        selectedDate,
        selectedTime
      );
      navigation.navigate('AppointmentConfirmation');
    } catch (error) {
      console.error('Error creating appointment:', error);
      // Aquí deberíamos mostrar un mensaje de error al usuario
    }
  };

  const renderSpecialtiesList = () => (
    <View style={styles.section}>
      <Text h4 style={styles.sectionTitle}>Especialidades</Text>
      {['Cardiología', 'Pediatría', 'Dermatología'].map((specialty) => (
        <ListItem
          key={specialty}
          onPress={() => setSelectedSpecialty(specialty)}
          bottomDivider
        >
          <ListItem.Content>
            <ListItem.Title>{specialty}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      ))}
    </View>
  );

  const renderProvidersList = () => (
    <View style={styles.section}>
      <Text h4 style={styles.sectionTitle}>Doctores Disponibles</Text>
      {providers.map((provider) => (
        <Card key={provider.id}>
          <ListItem onPress={() => setSelectedProvider(provider)}>
            <Avatar rounded source={{ uri: provider.avatar }} />
            <ListItem.Content>
              <ListItem.Title>{provider.name}</ListItem.Title>
              <ListItem.Subtitle>{provider.specialty}</ListItem.Subtitle>
              <Text>Rating: {provider.rating} ⭐</Text>
              <Text>{provider.location.address}</Text>
            </ListItem.Content>
          </ListItem>
        </Card>
      ))}
    </View>
  );

  const renderTimeSlots = () => (
    <View style={styles.section}>
      <Text h4 style={styles.sectionTitle}>Horarios Disponibles</Text>
      <View style={styles.timeGrid}>
        {timeSlots.map((time) => (
          <Button
            key={time}
            title={time}
            type={selectedTime === time ? 'solid' : 'outline'}
            onPress={() => setSelectedTime(time)}
            containerStyle={styles.timeButton}
          />
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        centerComponent={{ text: 'Nueva Cita', style: styles.headerText }}
        leftComponent={{
          icon: 'arrow-back',
          color: '#fff',
          onPress: () => navigation.goBack()
        }}
      />
      
      <ScrollView style={styles.scrollView}>
        <SearchBar
          placeholder="Buscar especialidad..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          platform="default"
          containerStyle={styles.searchBar}
        />

        {!selectedSpecialty && renderSpecialtiesList()}
        {selectedSpecialty && !selectedProvider && renderProvidersList()}
        {selectedProvider && renderTimeSlots()}

        {selectedTime && (
          <Button
            title="Confirmar Cita"
            containerStyle={styles.confirmButton}
            onPress={handleCreateAppointment}
            loading={loading}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  searchBar: {
    backgroundColor: 'transparent',
    marginBottom: 10,
  },
  section: {
    padding: 15,
  },
  sectionTitle: {
    marginBottom: 15,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timeButton: {
    width: '30%',
    marginBottom: 10,
  },
  confirmButton: {
    margin: 15,
    marginTop: 30,
  },
});

export default NewAppointmentScreen; 