import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Icon, Input, Text } from '@rneui/themed';
import { useAuth } from '../hooks/useAuth';
import { Role } from '../types';

type AuthMode = 'login' | 'register';

export const AuthScreen: React.FC = () => {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<AuthMode>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Campos comunes
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Campos adicionales para registro
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      if (mode === 'login') {
        await signIn(email, password);
      } else {
        await signUp(email, password, {
          name,
          phone,
          role: Role.CLIENT,
          status: 'active',
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocurrió un error');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setError(null);
  };

  return (
    <View style={styles.container}>
      <Card containerStyle={styles.card}>
        <Icon
          type="material-community"
          name="hospital-building"
          size={60}
          color="#2089dc"
          style={styles.logo}
        />
        <Text h3 style={styles.title}>
          {mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
        </Text>

        {mode === 'register' && (
          <>
            <Input
              placeholder="Nombre completo"
              leftIcon={{
                type: 'material-community',
                name: 'account',
                color: '#86939e',
              }}
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />

            <Input
              placeholder="Teléfono"
              leftIcon={{
                type: 'material-community',
                name: 'phone',
                color: '#86939e',
              }}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </>
        )}

        <Input
          placeholder="Correo electrónico"
          leftIcon={{
            type: 'material-community',
            name: 'email',
            color: '#86939e',
          }}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Input
          placeholder="Contraseña"
          leftIcon={{
            type: 'material-community',
            name: 'lock',
            color: '#86939e',
          }}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {error && (
          <Text style={styles.error}>{error}</Text>
        )}

        <Button
          title={mode === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
          onPress={handleSubmit}
          loading={loading}
          containerStyle={styles.button}
        />

        <Button
          title={mode === 'login' ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
          type="clear"
          onPress={toggleMode}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  card: {
    borderRadius: 12,
    padding: 16,
    margin: 16,
  },
  logo: {
    alignSelf: 'center',
    marginBottom: 24,
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
  },
  error: {
    color: '#dc3545',
    textAlign: 'center',
    marginBottom: 16,
  },
  button: {
    marginBottom: 16,
  },
}); 