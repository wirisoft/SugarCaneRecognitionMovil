import { Link } from 'expo-router';
import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions, TouchableOpacity, ScrollView, Image, FlatList, Animated, ImageBackground } from 'react-native';
import { Appbar, Avatar, Badge, Provider as PaperProvider, Button, Card, Title, Paragraph } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { BarChart, PieChart } from 'react-native-chart-kit';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Datos estáticos para demostración
const enfermedadesCaña = [
  { id: 1, nombre: 'Roya', descripcion: 'Enfermedad fúngica que afecta las hojas' },
  { id: 2, nombre: 'Carbón', descripcion: 'Enfermedad causada por el hongo Ustilago scitaminea' },
  { id: 3, nombre: 'Escaldadura', descripcion: 'Enfermedad bacteriana que afecta el sistema vascular' },
  { id: 4, nombre: 'Mosaico', descripcion: 'Enfermedad viral que causa manchas amarillentas' },
];

const AppbarOnlyScreen = () => {
  const [showCamera, setShowCamera] = useState(false);
  const [selectedTab, setSelectedTab] = useState('home');
  const [historialFotos, setHistorialFotos] = useState([
    { 
      id: '1', 
      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQodUIN5BSOYHhT3q7Tdx4njXVpfsZ3HVuLuA&s', 
      fecha: '15/03/2025', 
      enfermedad: 'Roya', 
      descripcion: 'Muestra de caña con síntomas de roya en estadio avanzado. Se observan manchas anaranjadas en las hojas.'
    },
    { 
      id: '2', 
      uri: 'https://www.avance.eeaoc.org.ar/wp-content/uploads/2021/08/carbox1.png', 
      fecha: '10/03/2025', 
      enfermedad: 'Carbón', 
      descripcion: 'Tallos de caña con presencia de carbón. Se observa crecimiento fúngico negro en la parte superior.'
    },
    { 
      id: '3', 
      uri: 'https://www.cincae.org/wp-content/uploads/2013/04/escaldadura5.jpg', 
      fecha: '05/03/2025', 
      enfermedad: 'Escaldadura', 
      descripcion: 'Hojas con síntomas de escaldadura. Se observan líneas blanquecinas y necrosis en los bordes.'
    },
  ]);

  // Animación para el botón de escanear
  const scanButtonAnimation = useRef(new Animated.Value(1)).current;
  
  // Animación para la transición entre tabs
  const fadeAnim = useRef(new Animated.Value(1)).current;
  
  // Animación para el badge
  const badgeScale = useRef(new Animated.Value(1)).current;
  
  // Animación para las tarjetas de historial
  const historyCardAnim = useRef<{ [key: string]: Animated.Value }>({}).current;
  
  // Animación para la cámara
  const cameraAnimation = useRef(new Animated.Value(0)).current;
  
  // Animación para el nuevo elemento en historial
  const newItemAnimation = useRef(new Animated.Value(0)).current;

  // Resetear las animaciones de las tarjetas cuando se añade una nueva foto
  useEffect(() => {
    // Reiniciar las animaciones cuando cambia el historial
    Object.keys(historyCardAnim).forEach(key => {
      delete historyCardAnim[key];
    });
    
    // Si hay una nueva foto, mostrar un pequeño efecto de notificación
    if (historialFotos.length > 0) {
      Animated.timing(newItemAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      }).start(() => {
        Animated.timing(newItemAnimation, {
          toValue: 0,
          duration: 300,
          delay: 2000,
          useNativeDriver: true
        }).start();
      });
    }
  }, [historialFotos.length]);

  // Efecto para animar el badge periódicamente
  useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(badgeScale, {
          toValue: 1.3,
          duration: 1000,
          useNativeDriver: true
        }),
        Animated.timing(badgeScale, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true
        })
      ])
    );
    
    pulseAnimation.start();
    
    return () => pulseAnimation.stop();
  }, []);

  // Efecto para animar la transición entre tabs
  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      })
    ]).start();
  }, [selectedTab]);

  // Efecto para animar la cámara
  useEffect(() => {
    Animated.timing(cameraAnimation, {
      toValue: showCamera ? 1 : 0,
      duration: 300,
      useNativeDriver: true
    }).start();
  }, [showCamera]);

  // Función para crear animaciones para las tarjetas de historial
  const getHistoryCardAnimation = (id: string) => {
    if (!historyCardAnim[id]) {
      historyCardAnim[id] = new Animated.Value(0);
      
      Animated.timing(historyCardAnim[id], {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
        delay: 100 * parseInt(id, 10) % 10, // Usar módulo para evitar retrasos muy largos
      }).start();
    }
    
    return historyCardAnim[id];
  };

  // Animación del botón de escanear
  const animateScanButton = () => {
    Animated.sequence([
      Animated.timing(scanButtonAnimation, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scanButtonAnimation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => setShowCamera(true));
  };

  // Datos de ejemplo para las gráficas
  const datosEnfermedades = {
    labels: ["Roya", "Carbón", "Escaldadura", "Mosaico"],
    datasets: [
      {
        data: [8, 5, 3, 2]
      }
    ]
  };

  const datosPorcentaje = [
    {
      name: "Roya",
      population: 44,
      color: "#FF6384",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12
    },
    {
      name: "Carbón",
      population: 28,
      color: "#36A2EB",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12
    },
    {
      name: "Escaldadura",
      population: 17,
      color: "#FFCE56",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12
    },
    {
      name: "Mosaico",
      population: 11,
      color: "#4BC0C0",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12
    }
  ];
  
  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false
  };

  // Función para abrir la cámara usando ImagePicker (más confiable que Camera)
  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
    if (permissionResult.granted === false) {
      alert("Se requiere permiso para acceder a la cámara");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      // Simulamos la detección de enfermedad
      const nuevaEnfermedad = enfermedadesCaña[Math.floor(Math.random() * enfermedadesCaña.length)];
        
      const nuevaFoto = {
        id: Date.now().toString(),
        uri: result.assets[0].uri,
        fecha: new Date().toLocaleDateString(),
        enfermedad: nuevaEnfermedad.nombre,
        descripcion: `Muestra de caña con síntomas de ${nuevaEnfermedad.nombre}. ${nuevaEnfermedad.descripcion}`
      };
      
      // Guardar la nueva foto en el estado
      setHistorialFotos(prevHistorial => [nuevaFoto, ...prevHistorial]);
      
      // Mostrar alerta y cambiar a la pestaña de historial después de un breve retraso
      alert(`Enfermedad detectada: ${nuevaEnfermedad.nombre}`);
      
      // Opcional: Cambiar automáticamente a la pestaña historial después de tomar una foto
      setTimeout(() => {
        setSelectedTab('history');
      }, 1000);
    }
  };

  // Vista de cámara simulada (por si quieres mantener la experiencia visual)
  const renderCameraView = () => (
    <Animated.View 
      style={[
        styles.cameraSimulatedContainer,
        {
          opacity: cameraAnimation,
          transform: [
            { 
              scale: cameraAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [0.9, 1]
              })
            }
          ]
        }
      ]}
    >
      <ImageBackground 
        source={require('../../assets/images/MuestraCana.png')} 
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
      >
        <View style={styles.cameraHeader}>
          <Text style={styles.cameraTitle}>Fotografíe la muestra de caña</Text>
          <Text style={styles.cameraInstructions}>Asegúrese de que la muestra esté bien iluminada y enfocada</Text>
        </View>

        <View style={styles.cameraFrame}>
          <Animated.View 
            style={[
              styles.cameraTargetFrame,
              {
                transform: [
                  {
                    scale: cameraAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.7, 1]
                    })
                  }
                ]
              }
            ]} 
          />
        </View>

        <View style={styles.cameraButtonContainer}>
          <Button 
            mode="contained" 
            onPress={() => {
              setShowCamera(false);
              openCamera();
            }}
            style={[styles.cameraButton, {backgroundColor: 'green'}]}
          >
            Tomar Foto
          </Button>
          <Button 
            mode="outlined" 
            onPress={() => {
              // Animar la salida de la cámara
              Animated.timing(cameraAnimation, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
              }).start(() => setShowCamera(false));
            }}
            textColor="green"
            style={[styles.cameraButton, { backgroundColor: 'white', borderColor: 'green' }]}    
          >
            Cancelar
          </Button>
        </View>
      </ImageBackground>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <Text style={styles.logoText}>AGROSCAN</Text>

        <View style={{ flex: 1 }} />

        {/* Indicador animado de nueva foto */}
        {selectedTab !== 'history' && (
          <Animated.View style={{
            position: 'absolute',
            right: 40,
            top: '50%',
            backgroundColor: 'white',
            borderRadius: 4,
            padding: 2,
            opacity: newItemAnimation,
            transform: [
              { translateY: -10 },
              { scale: newItemAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [0.8, 1]
              })}
            ]
          }}>
          </Animated.View>
        )}

        <Link href="../Perfil/PerfilScreen" asChild>
          <TouchableOpacity>
            <View style={styles.avatarWrapper}>
              <Avatar.Image
                size={30}
                source={require('../../assets/images/LogoPNG.png')}
                style={styles.avatar}
              />
              <Animated.View style={[
                styles.badge,
                {
                  transform: [{ scale: badgeScale }]
                }
              ]}></Animated.View>
            </View>
          </TouchableOpacity>
        </Link>
      </Appbar.Header>

      {/* Contenido principal */}
      <View style={styles.content}>
        {showCamera ? (
          renderCameraView()
        ) : (
          <>
            {selectedTab === 'home' && (
              <Animated.ScrollView 
                style={[styles.homeContainer, { opacity: fadeAnim }]}
              >
                <View style={styles.heroSection}>
                  <Title style={styles.heroTitle}>Detector de Enfermedades en Caña</Title>
                  <Paragraph style={styles.heroParagraph}>
                    Utiliza nuestra avanzada tecnología para detectar enfermedades en tu cultivo de caña.
                  </Paragraph>
                  <Animated.View style={{
                    transform: [{ scale: scanButtonAnimation }]
                  }}>
                    <Button 
                      mode="contained" 
                      onPress={animateScanButton}
                      style={styles.scanButton}
                    >
                      Escanear Muestra
                    </Button>
                  </Animated.View>
                </View>
                
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginBottom: 20}}>
  <View style={styles.statsSection}>
    <Title style={styles.sectionTitle}>Estadísticas Recientes</Title>
    <Card style={[styles.statCard, {width: screenWidth * 1.5}]}>
      <Card.Content>
        <Title>Enfermedades Detectadas</Title>
        <BarChart
          data={{
            labels: ["Roya", "Carbón", "Escaldadura", "Mosaico"],
            datasets: [
              {
                data: [8, 5, 3, 2]
              }
            ]
          }}
          width={screenWidth * 1.4} // Mucho más ancho para asegurar espacio suficiente
          height={240} // Altura ligeramente mayor
          chartConfig={{
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 0, // No mostrar decimales
            color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            barPercentage: 0.5,
            propsForLabels: {
              fontSize: 12,
            },
          }}
          verticalLabelRotation={0} // Sin rotación vertical
          horizontalLabelRotation={0} // Sin rotación horizontal
          fromZero
          showBarTops={true}
          showValuesOnTopOfBars={true}
          withInnerLines={true}
          yAxisLabel=""
          yAxisSuffix=""
          style={{
            marginVertical: 8,
            borderRadius: 16,
            paddingRight: 25, // Espacio adicional a la derecha
            paddingLeft: 10,   // Espacio adicional a la izquierda
          }}
        />
      </Card.Content>
    </Card>
  </View>
</ScrollView>
              </Animated.ScrollView>
            )}
            
            {selectedTab === 'history' && (
              <Animated.View 
                style={[styles.historyContainer, { opacity: fadeAnim }]}
              >
                <Title style={styles.sectionTitle}>
                  Historial de Escaneos 
                  <Text style={styles.countBadge}> {historialFotos.length}</Text>
                </Title>
                
                {historialFotos.length === 0 ? (
                  <View style={styles.emptyHistory}>
                    <Text style={styles.emptyHistoryText}>No hay escaneos en el historial</Text>
                    <Button 
                      mode="contained" 
                      onPress={animateScanButton}
                      style={[styles.scanButton, {marginTop: 20}]}
                    >
                      Realizar primer escaneo
                    </Button>
                  </View>
                ) : (
                  <FlatList
                    data={historialFotos}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{paddingBottom: 20}}
                    renderItem={({ item, index }) => {
                      const animation = getHistoryCardAnimation(item.id);
                      const isNew = index === 0 && item.id === historialFotos[0].id;
                      
                      return (
                        <Animated.View style={{
                          opacity: animation,
                          transform: [{ 
                            translateY: animation.interpolate({
                              inputRange: [0, 1],
                              outputRange: [50, 0]
                            })
                          }]
                        }}>
                          <Card 
                            style={[
                              styles.historyCard,
                              isNew && styles.newHistoryCard
                            ]}
                          >
                            {isNew && (
                              <View style={styles.newBadge}>
                                <Text style={styles.newBadgeText}>Nuevo</Text>
                              </View>
                            )}
                            <Card.Content style={{padding: 0}}>
                              <View style={styles.historyCardContent}>
                                <Image source={{ uri: item.uri }} style={styles.historyImage} />
                                <View style={styles.historyDetails}>
                                  <Title style={{fontSize: 18, marginBottom: 5}}>{item.enfermedad}</Title>
                                  <Paragraph style={{fontSize: 14, color: '#666', marginBottom: 5}}>Fecha: {item.fecha}</Paragraph>
                                  <Paragraph style={{fontSize: 14}} numberOfLines={3}>{item.descripcion}</Paragraph>
                                </View>
                              </View>
                            </Card.Content>
                          </Card>
                        </Animated.View>
                      );
                    }}
                  />
                )}
              </Animated.View>
            )}
            
            {selectedTab === 'stats' && (
           <Animated.ScrollView 
           style={[styles.statsContainer, { opacity: fadeAnim }]}
           contentContainerStyle={{ alignItems: 'center' }} // Centra todo el contenido
         >
         
           <Title style={styles.sectionTitle}>Análisis de Enfermedades</Title>

<Card style={styles.statCard}>
  <Card.Content style={styles.chartContent}>
    <PieChart
      data={datosPorcentaje}
      width={screenWidth * 0.90} // Más compacto
      height={180} // Reducido en altura
      chartConfig={{
        ...chartConfig,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      }}
      accessor="population"
      backgroundColor="transparent"
      paddingLeft="0"
      center={[0, 0]}
      absolute
      hasLegend={true} // Se oculta la leyenda para ahorrar espacio
      avoidFalseZero={true}
      style={styles.chart}
    />
  </Card.Content>
</Card>
         
             
             <Card style={styles.infoCard}>
               <Card.Content>
                 <Title>Información Adicional</Title>
                 <Paragraph>
                   Este análisis se basa en las muestras analizadas en los últimos 30 días.
                   Las enfermedades más comunes detectadas son Roya (44%) y Carbón (28%).
                   Se recomienda implementar medidas preventivas para estas enfermedades.
                 </Paragraph>
               </Card.Content>
             </Card>
           </Animated.ScrollView>
            )}
          </>
        )}
      </View>

      {/* Barra de navegación inferior con indicadores de notificación */}
      {!showCamera && (
        <View style={styles.bottomNavigation}>
          <TouchableOpacity 
            style={[styles.navButton, selectedTab === 'home' ? styles.activeNavButton : null]} 
            onPress={() => setSelectedTab('home')}
          >
            <Text style={styles.navButtonText}>Inicio</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.navButton, selectedTab === 'history' ? styles.activeNavButton : null]} 
            onPress={() => setSelectedTab('history')}
          >
            <View style={styles.navButtonInner}>
              <Text style={styles.navButtonText}>Historial</Text>
              {selectedTab !== 'history' && historialFotos.length > 0 && (
                <View style={styles.navBadge}>
                  <Text style={styles.navBadgeText}>{historialFotos.length}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.navButton, selectedTab === 'stats' ? styles.activeNavButton : null]} 
            onPress={() => setSelectedTab('stats')}
          >
            <Text style={styles.navButtonText}>Estadísticas</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const App = () => {
  return (
    <PaperProvider>
      <AppbarOnlyScreen />
    </PaperProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  appbar: {
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  avatarWrapper: {
    position: 'relative',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 25,
    padding: 1.5,
    backgroundColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  avatar: {
    backgroundColor: '#e0e0e0',
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'green',
    color: 'white',
    fontSize: 10,
    minWidth: 8,
    height: 8,
    borderRadius: 8,
    paddingHorizontal: 0,
    paddingVertical: 0,
    textAlign: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  homeContainer: {
    flex: 1,
    padding: 15,
  },
  heroSection: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
  },
  heroParagraph: {
    textAlign: 'center',
    color: '#555',
    marginBottom: 20,
  },
  scanButton: {
    backgroundColor: 'green',
    paddingHorizontal: 20,
  },
  statsSection: {
    marginBottom: 20,
    paddingRight: 30, // Espacio adicional a la derecha
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
    marginLeft: 5,
  },
  countBadge: {
    fontSize: 14,
    color: 'green',
    fontWeight: 'bold',
  },

  chartStyle: {
    marginTop: 10,
    marginBottom: 15, // Añadir margen inferior
    borderRadius: 10,
    paddingRight: 20, // Añadir padding derecho para los labels
    paddingBottom: 10, // Añadir padding inferior
  },
  historyContainer: {
    flex: 1,
    padding: 15,
  },
  historyCard: {
    marginBottom: 15,
    elevation: 3,
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
  },
  newHistoryCard: {
    borderLeftWidth: 4,
    borderLeftColor: 'green',
  },
  newBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'green',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    zIndex: 1,
  },
  newBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  historyCardContent: {
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
  },
  historyImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginRight: 15,
  },
  historyDetails: {
    flex: 1,
    paddingRight: 5,
  },
  emptyHistory: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyHistoryText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
  statsContainer: {
    flex: 1,
    padding: 15,
  },

  bottomNavigation: {
    flexDirection: 'row',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#ffffff',
  },
  navButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtonInner: {
    alignItems: 'center',
    position: 'relative',
  },
  activeNavButton: {
    backgroundColor: '#f5f5f5',
    borderTopWidth: 2,
    borderTopColor: 'green',
  },
  navButtonText: {
    fontSize: 14,
    color: '#333',
  },
  navBadge: {
    position: 'absolute',
    top: -8,
    right: -12,
    backgroundColor: 'green',
    borderRadius: 10,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
    paddingHorizontal: 4,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  // Estilos modificados para la cámara simulada y la imagen de fondo
  cameraSimulatedContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'space-between',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backgroundImageStyle: {
    opacity: 0.2,
    resizeMode: 'contain',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '100%',
  },
  cameraHeader: {
    padding: 20,
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  cameraTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cameraInstructions: {
    color: '#ddd',
    textAlign: 'center',
  },
  cameraFrame: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  cameraTargetFrame: {
    width: screenWidth * 0.7,
    height: screenWidth * 0.7,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
  cameraButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  cameraButton: {
    width: '40%',
    marginBottom: 20,
  },
  chartContainer: {
    marginVertical: 10,
  },

  
  infoCard: {
    marginBottom: 20,
    marginHorizontal: 2,
  },
 
  
  statCard: {
    width: '100%',
    borderRadius: 16,
    marginVertical: 10,
    backgroundColor: '#ffffff',
  },
  
  chartTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
    margin: 10,
  },
  chartContent: {
    margin: 10,
    alignItems: 'center',
  },
  
});