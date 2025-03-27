import React, { useState } from 'react';
import { Link, Stack } from 'expo-router';
import { View, StyleSheet, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
    
      <Stack.Screen 
        options={{ 
          title: "AGROSCAN",
          headerStyle: { backgroundColor: '#FFFFFF' },
          headerTintColor: '#4CAF50',
          headerTitleStyle: { fontWeight: 'bold' },
          headerTitleAlign: 'center',
        }} 
      />

      <View style={styles.formContainer}>
        <Card style={styles.card}>
          <Card.Content>
            <Image source={require('../../assets/images/LogoPNG.png')} style={styles.image} />

            <Text variant="titleLarge" style={styles.label}>Correo electrónico</Text>
            <TextInput
              style={styles.input}
              placeholder="Correo electrónico"
              placeholderTextColor="#888"  
              keyboardType="email-address"
            />
            <Text variant="titleLarge" style={styles.label}>Contraseña</Text>
            
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Contraseña"
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

            <TouchableOpacity onPress={() => Alert.alert("Botón presionado", "Abrir opciones de contraseña")}>
              <Text variant="titleLarge" style={{...styles.label, color: '#4CAF50', fontWeight: 'bold'}}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
          </Card.Content>

          <View style={styles.actions}>
            <Link href="/Home/MainScreen" asChild>
              <Button mode="contained" style={styles.button}>Iniciar sesión</Button>
            </Link>
          </View>

          <View style={styles.actions}>
            <Text variant="titleLarge" style={styles.labelSubtitle}>¿No tienes una cuenta? </Text>
            <TouchableOpacity>
              <Link href="./Register" asChild>
                <Text variant="titleLarge" style={{...styles.labelSubtitle, color: '#4CAF50', fontWeight: 'bold'}}>Registrate</Text>
              </Link>
            </TouchableOpacity>
          </View>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
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
      marginBottom: 10,
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
    image: {
      width: 278,
      height: 151,
      marginBottom: 30,
      alignSelf: 'center',
    },
    button: {
      width: 210,
      height: 48,

      backgroundColor: '#4CAF50',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  
