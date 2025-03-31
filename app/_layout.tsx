import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen
        name="Auth/LoginScreen" // Quitar el "./" del inicio
        options={{ 
          title: "Iniciar Sesión",
          headerStyle: { backgroundColor: '#E8E8E8' },
          headerTintColor: 'rgba(203, 74, 74, 1)',
          headerTitleStyle: { fontWeight: 'bold' },
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="Home/MainScreen" // Quitar el "./" del inicio
        options={{ 
          title: "",
          headerStyle: { backgroundColor: '#E8E8E8' },
          headerTintColor: 'rgba(203, 74, 74, 1)',
          headerTitleStyle: { fontWeight: 'bold' },
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Perfil/PerfilScreen" // Quitar el "./" del inicio
        options={{ 
          title: "Mi perfil",
          headerStyle: { backgroundColor: '#E8E8E8' },
          headerTintColor: 'rgba(203, 74, 74, 1)',
          headerTitleStyle: { fontWeight: 'bold' }
        }}
      />
            <Stack.Screen
        name="Perfil/PerfilConfig" // Quitar el "./" del inicio
        options={{ 
          title: "Mi perfil",
          headerStyle: { backgroundColor: '#E8E8E8' },
          headerTintColor: 'rgba(203, 74, 74, 1)',
          headerTitleStyle: { fontWeight: 'bold' }
        }}
      />
      <Stack.Screen
        name="Auth/ScreenLoad" // Quitar el "./" del inicio
        options={{ 
          title: "ScreenLoad",
          headerStyle: { backgroundColor: '#E8E8E8' },
          headerTintColor: 'rgba(203, 74, 74, 1)',
          headerTitleStyle: { fontWeight: 'bold' },
          headerShown: false,
          
        }}
      />
      
    
            <Stack.Screen
        name="Auth/Register" // Quitar el "./" del inicio
        options={{ 
          title: "Nueva Cuenta",
          headerStyle: { backgroundColor: '#E8E8E8' },
          headerTintColor: 'rgba(203, 74, 74, 1)',
          headerTitleStyle: { fontWeight: 'bold' }
        }}
      />
    </Stack>

    
  );
}