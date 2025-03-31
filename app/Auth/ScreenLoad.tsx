import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Link, Stack } from 'expo-router';
import { Provider as PaperProvider, Card, Button } from 'react-native-paper';

export default function ScreenLoad() {
  return (
    <PaperProvider>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Card style={styles.card}>
            <Card.Content>
              <Image source={require('@/assets/images/LogoPNG.png')} style={styles.image} />
              
              <Card.Content style={{ marginBottom: 25 }}>
                <Text style={styles.labelTitle}>Monitorea tu diabetes</Text>
                <Text style={styles.labelTitle}>con inteligencia artificial</Text>
              </Card.Content>
              
              <Card.Content style={{ marginBottom: 25 }}>
                <Text style={styles.labelSubtitle}>Permite que la inteligencia artificial te</Text>
                <Text style={styles.labelSubtitle}>asista en el manejo de tu diabetes</Text>
              </Card.Content>
            </Card.Content>

            <View style={styles.actions}>
              <Link href="../Auth/LoginScreen" asChild>
                <Button mode="contained" style={styles.button} labelStyle={styles.buttomText}>
                  Iniciar sesión
                </Button>
              </Link>
            </View>
            
            <View style={styles.actions}>
              <Link href="../Auth/Register" asChild>
                <Button mode="contained" style={styles.buttonAlternative} labelStyle={styles.buttonAlternativeText}>
                  Registrarse
                </Button>
              </Link>
            </View>
          </Card>
        </View>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Cambiado a blanco
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF', // Cambiado a blanco
  },
  card: {
    width: '100%',
    padding: 0,
    borderRadius: 8,
    backgroundColor: '#FFFFFF', // Cambiado a blanco
    elevation: 0,
    shadowColor: 'transparent',
    borderWidth: 0,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  labelTitle: {
    marginBottom: 2,
    color: '#4CAF50', // Verde en lugar de rojo
    fontSize: 20,
    fontFamily: 'Poppins',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  labelSubtitle: {
    marginBottom: 0,
    color: '#000000', // Negro para buen contraste en fondo blanco
    fontSize: 12,
    fontFamily: 'Poppins',
    textAlign: 'center',
    fontWeight: '600',
  },
  image: {
    width: 248,
    height: 80,
    marginBottom: 25,
    alignSelf: 'center',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    width: 220,
    height: 46,
    borderRadius: 28.17,
    backgroundColor: '#4CAF50', // Verde
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonAlternative: {
    width: 220,
    height: 46,
    borderRadius: 28.17,
    backgroundColor: '#FFFFFF', // Blanco
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4CAF50', // Verde
  },
  buttonAlternativeText: {
    color: '#4CAF50', // Verde
    fontSize: 16,
    fontWeight: '500',
  },
  buttomText: {
    color: '#FFFFFF', // Texto blanco sobre botón verde
    fontSize: 16,
    fontWeight: '500',
  },
});
