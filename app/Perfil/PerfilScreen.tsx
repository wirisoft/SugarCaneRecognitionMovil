import { Link, Stack } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  Dimensions,
  Animated
} from 'react-native';
import { IconButton } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const PerfilScreen = () => {
  // Simplified animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    // Single animation sequence for all elements
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleEditPress = () => {
    console.log('Edit button pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <Stack.Screen 
        options={{ 
          title: "MI PERFIL",
          headerStyle: { backgroundColor: '#FFFFFF' },
          headerTintColor: 'green',
          headerTitleStyle: { 
            fontWeight: 'bold',
            fontFamily: 'Poppins',
          },
          headerTitleAlign: 'center',
        }} 
      />

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Info */}
        <Animated.View 
          style={[
            styles.profileContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <View style={styles.avatarOuterContainer}>
            <LinearGradient
              colors={['green', 'green']}
              style={styles.avatarBorder}
            >
              <View style={styles.avatarContainer}>
                <Image 
                  source={require('../../assets/images/LogoPNG.png')}
                  style={styles.avatar}
                />
              </View>
            </LinearGradient>
            <View style={styles.editButtonContainer}>
              <TouchableOpacity onPress={handleEditPress}>
                <LinearGradient
                  colors={['green', 'green']}
                  style={styles.editButtonGradient}
                >
                  <IconButton 
                    icon="pencil" 
                    size={16} 
                    iconColor="#FFFFFF" 
                  />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.profileName}>Martín</Text>
          <View style={styles.profileUnderline} />
        </Animated.View>
        
        {/* Menu Items */}
        <Animated.View 
          style={[
            styles.menuContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          {/* Perfil */}
          <Link href="../PerfilConfig" asChild>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemContainer}>
                <View style={styles.menuItemContent}>
                  <View style={styles.menuIconContainer}>
                    <IconButton icon="account-outline" size={24} iconColor="green" />
                  </View>
                  <Text style={styles.menuItemText}>Perfil</Text>
                  <IconButton icon="chevron-right" size={20} iconColor="green" />
                </View>
              </View>
            </TouchableOpacity>
          </Link>

          {/* Políticas de privacidad */}
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemContainer}>
              <View style={styles.menuItemContent}>
                <View style={styles.menuIconContainer}>
                  <IconButton icon="shield-outline" size={24} iconColor="green" />
                </View>
                <Text style={styles.menuItemText}>Políticas de privacidad</Text>
                <IconButton icon="chevron-right" size={20} iconColor="green" />
              </View>
            </View>
          </TouchableOpacity>

          {/* Configuraciones */}
          <Link href="../Auth/LoginScreen" asChild>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemContainer}>
                <View style={styles.menuItemContent}>
                  <View style={styles.menuIconContainer}>
                    <IconButton icon="cog-outline" size={24} iconColor="green" />
                  </View>
                  <Text style={styles.menuItemText}>Configuraciones</Text>
                  <IconButton icon="chevron-right" size={20} iconColor="green" />
                </View>
              </View>
            </TouchableOpacity>
          </Link>

          {/* Ayuda */}
          <Link href="../Auth/LoginScreen" asChild>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemContainer}>
                <View style={styles.menuItemContent}>
                  <View style={styles.menuIconContainer}>
                    <IconButton icon="help-circle-outline" size={24} iconColor="green" />
                  </View>
                  <Text style={styles.menuItemText}>Ayuda</Text>
                  <IconButton icon="chevron-right" size={20} iconColor="green" />
                </View>
              </View>
            </TouchableOpacity>
          </Link>

          {/* Cerrar sesión */}
          <Link href="../Auth/LoginScreen" asChild>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemContainer}>
                <View style={styles.menuItemContent}>
                  <View style={styles.menuIconContainer}>
                    <IconButton icon="logout" size={24} iconColor="green" />
                  </View>
                  <Text style={styles.menuItemText}>Cerrar sesión</Text>
                  <IconButton icon="chevron-right" size={20} iconColor="green" />
                </View>
              </View>
            </TouchableOpacity>
          </Link>
        </Animated.View>

        {/* Extra space at the bottom for better scrolling experience */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40,
  },
  avatarOuterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 10,
  },
  avatarBorder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editButtonContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  editButtonGradient: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 16,
    fontFamily: 'Poppins',
    color: 'green',
    letterSpacing: 2,
  },
  profileUnderline: {
    height: 3,
    width: 40,
    backgroundColor: 'green',
    marginTop: 8,
  },
  menuContainer: {
    paddingTop: 10,
  },
  menuItem: {
    marginBottom: 14,
  },
  menuItemContainer: {
    borderRadius: 14,
    overflow: 'hidden',
    elevation: 1,
    backgroundColor: '#FFFFFF',
    shadowColor: '#00CC7A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderWidth: 1,
    borderColor: 'rgba(0,204,122,0.1)',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 14,
  },
  menuIconContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(0,204,122,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuItemText: {
    flex: 1,
    fontSize: 15,
    color: '#333333',
    fontFamily: 'Nunito',
    letterSpacing: 0.5,
  },
  bottomPadding: {
    height: 20,
  },
});

export default PerfilScreen;