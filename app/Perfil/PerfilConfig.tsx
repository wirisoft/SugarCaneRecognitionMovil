import { Link, Stack } from 'expo-router';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  TextInput
} from 'react-native';
import { Appbar, IconButton } from 'react-native-paper';

const PerfileConfigScreen = () => {
  const handleBackPress = () => {
    console.log("Back button pressed");
  };

  const handleEditPress = () => {
    console.log('Edit button pressed');
  };

  const handleUpdateProfile = () => {
    console.log('Update profile button pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#fff" />
      
      {/* Header */}
   <Stack.Screen 
           options={{ 
             title: "MI PERFIL",
             headerStyle: { backgroundColor: '#fff' },
             headerTintColor: 'green',
             headerTitleStyle: { fontWeight: 'bold' },
             headerTitleAlign: 'center',
           }} 
         />
      
      {/* Scrollable Content */}
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Image */}
        <View style={styles.profileContainer}>
          <View style={styles.avatarContainer}>
            <Image 
              source={require('../../assets/images/LogoPNG.png')}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
              <IconButton 
                icon="pencil" 
                size={18} 
                iconColor="#E8E8E8" 
              />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Form Fields */}
        <View style={styles.formContainer}>
          <FormField label="Nombre" value="Martín" />
          <FormField label="Apellido materno" value="Mora" />
          <FormField label="Apellido paterno" value="Ramírez" />
          <FormField label="Número de teléfono" value="+123 567 89000" />
          <FormField label="Correo electrónico" value="MartinUtcv@edu.com" />
          <FormField label="Fecha de nacimiento" value="12 / 05 / 2000" />
          
          {/* Update Profile Button */}
                    <Link href="../PerfilScreen" asChild>
          
          <TouchableOpacity 
            style={styles.updateButton}
            onPress={handleUpdateProfile}
          >
            <Text style={styles.updateButtonText}>Actualizar perfil</Text>
          </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Helper component for form fields
const FormField = (props: any) => {
  const { label, value } = props;
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={styles.fieldInput}
        value={value ? String(value) : ''}
        editable={true}
        placeholderTextColor="#CCCCCC"
      />
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF', // Fondo blanco
    },
    header: {
      backgroundColor: '#FFFFFF', // Header blanco
      elevation: 0,
    },
    headerTitle: {
      color: '#4CAF50', // Verde para el título
      fontWeight: '600',
      textAlign: 'center',
      fontSize: 22,
      fontFamily: 'Poppins',
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      padding: 20,
    },
    profileContainer: {
      alignItems: 'center',
      marginBottom: 20,
    },
    avatarContainer: {
      position: 'relative',
      borderWidth: 2,
      borderColor: '#4CAF50', // Borde verde en la imagen de perfil
      borderRadius: 50,
      padding: 5,
    },
    avatar: {
      width: 90,
      height: 90,
      borderRadius: 45,
      backgroundColor: '#FFFFFF', // Fondo blanco para el avatar
    },
    editButton: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      backgroundColor: '#4CAF50', // Verde para el botón de edición
      borderRadius: 15,
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    formContainer: {
      width: '100%',
    },
    fieldContainer: {
      marginBottom: 20,
    },
    fieldLabel: {
      fontSize: 14,
      color: '#4CAF50', // Verde para los labels
      marginBottom: 5,
      fontWeight: '500',
      fontFamily: 'Nunito',
    },
    fieldInput: {
      backgroundColor: '#FFFFFF', // Fondo blanco para los inputs
      borderRadius: 8,
      padding: 15,
      fontSize: 16,
      color: '#333333', // Texto negro dentro del input
      fontFamily: 'Nunito',
      borderWidth: 1,
      borderColor: '#4CAF50', // Borde verde en los inputs
    },
    updateButton: {
      backgroundColor: '#4CAF50', // Fondo verde en el botón de actualización
      borderRadius: 30,
      padding: 18,
      alignItems: 'center',
      marginTop: 10,
    },
    updateButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
      fontFamily: 'Nunito',
    },
  });

export default PerfileConfigScreen;