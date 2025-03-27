import React, { useState } from 'react';
import { Link, Stack } from 'expo-router';
import { View, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function RegisterScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [birthDate, setBirthDate] = useState('');

  const handleDateChange = (text: any) => {
    let cleaned = text.replace(/\D/g, '');
    if (cleaned.length > 2) {
      cleaned = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    }
    if (cleaned.length > 5) {
      cleaned = `${cleaned.slice(0, 5)}/${cleaned.slice(5, 9)}`;
    }
    setBirthDate(cleaned);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
            title: "Crea cuenta 🚀",

          headerStyle: { backgroundColor: '#FFFFFF' },
          headerTintColor: '#4CAF50',
          headerTitleStyle: { fontWeight: 'bold' },
          headerTitleAlign: 'center',
        }} 
      />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <Card style={styles.card}>
            <Card.Content>

              <Text variant="titleLarge" style={styles.label}>Nombre</Text>
              <TextInput
                style={styles.input}
                placeholder="Tu nombre"
                placeholderTextColor="#888"
              />

              <Text variant="titleLarge" style={styles.label}>Apellido Paterno</Text>
              <TextInput
                style={styles.input}
                placeholder="Tu apellido"
                placeholderTextColor="#888"
              />

              <Text variant="titleLarge" style={styles.label}>Apellido Materno</Text>
              <TextInput
                style={styles.input}
                placeholder="Tu apellido materno"
                placeholderTextColor="#888"
              />
              <Text variant="titleLarge" style={styles.label}>Correo electrónico</Text>
              <TextInput
                style={styles.input}
                placeholder="Tu correo electrónico"
                placeholderTextColor="#888"
                keyboardType="email-address"
              />
              <Text variant="titleLarge" style={styles.label}>Contraseña</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Tu contraseña"
                  placeholderTextColor="#888"
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.icon}>
                  <MaterialCommunityIcons
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={24}
                    color="#4CAF50"
                  />
                </TouchableOpacity>
              </View>



              <Text variant="titleLarge" style={styles.label}>Número de teléfono</Text>
              <TextInput
                style={styles.input}
                placeholder="Tu número de teléfono"
                placeholderTextColor="#888"
                keyboardType="phone-pad"
              />

              <Text variant="titleLarge" style={styles.label}>Fecha de nacimiento</Text>
              <TextInput
                style={styles.input}
                placeholder="DD/MM/YYYY"
                placeholderTextColor="#888"
                keyboardType="numeric"
                maxLength={10}
                value={birthDate}
                onChangeText={handleDateChange}
              />
            </Card.Content>

            <View style={styles.actions}>
              <Link href="./LoginScreen" asChild>
                <Button mode="contained" style={styles.button}>Registrarse</Button>
              </Link>
            </View>

 

            <View style={styles.actions}>
              <Text variant="titleLarge" style={styles.labelSubtitle}>¿Ya tienes una cuenta? </Text>
              <TouchableOpacity>
                <Link href="./LoginScreen" asChild>
                  <Text variant="titleLarge" style={{...styles.labelSubtitle, color: '#4CAF50', fontWeight: 'bold'}}>Inicia sesión</Text>
                </Link>
              </TouchableOpacity>
            </View>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  card: {
    width: '100%',
    padding: 0,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    elevation: 0,
    shadowColor: 'transparent',
  },
  labelTitle: {
    marginBottom: 20,
    color: '#4CAF50',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  label: {
    marginBottom: 6,
    color: '#333333',
    fontSize: 16,
    fontWeight: '600',
  },
  labelSubtitle: {
    marginBottom: 1,
    color: '#333333',
    fontSize: 12,
  },
  input: {
    height: 50,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 15,
    paddingHorizontal: 15,
    color: '#000000',
    backgroundColor: '#F9F9F9',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 10,
    height: 50,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  passwordInput: {
    flex: 1,
    height: '100%',
    color: '#000000',
    fontSize: 16,
  },
  icon: {
    padding: 5,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  actionsSub: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
  },
  button: {
    width: 210,
    height: 48,
    borderRadius: 25,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
