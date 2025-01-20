import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Icon, ListItem, Text } from '@rneui/themed';
import { useAuth } from '../hooks/useAuth';

export const ProfileScreen: React.FC = () => {
  const { user, signOut } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <View style={styles.centerContainer}>
        <Text>Debes iniciar sesión para ver tu perfil</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Card containerStyle={styles.profileCard}>
        <View style={styles.profileHeader}>
          <Icon
            type="material-community"
            name="account-circle"
            size={80}
            color="#2089dc"
          />
          <Text h4 style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
      </Card>

      <Card containerStyle={styles.sectionCard}>
        <Card.Title>Información Personal</Card.Title>
        <Card.Divider />
        <ListItem>
          <Icon
            type="material-community"
            name="phone"
            size={24}
            color="#666"
          />
          <ListItem.Content>
            <ListItem.Title>Teléfono</ListItem.Title>
            <ListItem.Subtitle>{user.phone}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>

        {'dateOfBirth' in user && (
          <ListItem>
            <Icon
              type="material-community"
              name="calendar"
              size={24}
              color="#666"
            />
            <ListItem.Content>
              <ListItem.Title>Fecha de Nacimiento</ListItem.Title>
              <ListItem.Subtitle>{user.dateOfBirth}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        )}

        {'gender' in user && (
          <ListItem>
            <Icon
              type="material-community"
              name="gender-male-female"
              size={24}
              color="#666"
            />
            <ListItem.Content>
              <ListItem.Title>Género</ListItem.Title>
              <ListItem.Subtitle>{user.gender}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        )}

        {'bloodType' in user && (
          <ListItem>
            <Icon
              type="material-community"
              name="water"
              size={24}
              color="#666"
            />
            <ListItem.Content>
              <ListItem.Title>Tipo de Sangre</ListItem.Title>
              <ListItem.Subtitle>{user.bloodType}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        )}
      </Card>

      {'emergencyContact' in user && user.emergencyContact && (
        <Card containerStyle={styles.sectionCard}>
          <Card.Title>Contacto de Emergencia</Card.Title>
          <Card.Divider />
          <ListItem>
            <Icon
              type="material-community"
              name="account"
              size={24}
              color="#666"
            />
            <ListItem.Content>
              <ListItem.Title>Nombre</ListItem.Title>
              <ListItem.Subtitle>{user.emergencyContact.name}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
          <ListItem>
            <Icon
              type="material-community"
              name="phone"
              size={24}
              color="#666"
            />
            <ListItem.Content>
              <ListItem.Title>Teléfono</ListItem.Title>
              <ListItem.Subtitle>{user.emergencyContact.phone}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
          <ListItem>
            <Icon
              type="material-community"
              name="account-heart"
              size={24}
              color="#666"
            />
            <ListItem.Content>
              <ListItem.Title>Relación</ListItem.Title>
              <ListItem.Subtitle>{user.emergencyContact.relationship}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        </Card>
      )}

      {'allergies' in user && user.allergies && user.allergies.length > 0 && (
        <Card containerStyle={styles.sectionCard}>
          <Card.Title>Alergias</Card.Title>
          <Card.Divider />
          {user.allergies.map((allergy, index) => (
            <ListItem key={index}>
              <Icon
                type="material-community"
                name="alert-circle"
                size={24}
                color="#666"
              />
              <ListItem.Content>
                <ListItem.Title>{allergy}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </Card>
      )}

      {'medicalConditions' in user && user.medicalConditions && user.medicalConditions.length > 0 && (
        <Card containerStyle={styles.sectionCard}>
          <Card.Title>Condiciones Médicas</Card.Title>
          <Card.Divider />
          {user.medicalConditions.map((condition, index) => (
            <ListItem key={index}>
              <Icon
                type="material-community"
                name="medical-bag"
                size={24}
                color="#666"
              />
              <ListItem.Content>
                <ListItem.Title>{condition}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </Card>
      )}

      <View style={styles.buttonContainer}>
        <Button
          title="Editar Perfil"
          type="outline"
          icon={{
            type: 'material-community',
            name: 'account-edit',
            color: '#2089dc',
          }}
          containerStyle={styles.button}
        />

        <Button
          title="Cerrar Sesión"
          type="outline"
          icon={{
            type: 'material-community',
            name: 'logout',
            color: '#dc3545',
          }}
          titleStyle={{ color: '#dc3545' }}
          buttonStyle={{ borderColor: '#dc3545' }}
          loading={loading}
          onPress={handleSignOut}
          containerStyle={styles.button}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  profileCard: {
    borderRadius: 12,
    padding: 16,
    margin: 16,
  },
  profileHeader: {
    alignItems: 'center',
  },
  name: {
    marginTop: 16,
    marginBottom: 4,
  },
  email: {
    color: '#666',
  },
  sectionCard: {
    borderRadius: 12,
    padding: 16,
    margin: 16,
  },
  buttonContainer: {
    padding: 16,
  },
  button: {
    marginBottom: 16,
  },
}); 