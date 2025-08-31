import { useFonts } from "expo-font";
import React, { useEffect, useRef } from "react";
import {
  ActivityIndicator,
  Animated, // Importamos Animated
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function PantallaInicial({ navigation }: { navigation: any }) {
  const [fontsLoaded] = useFonts({
    "QwitcherGrypen-Regular": require("../assets/fonts/QwitcherGrypen-Regular.ttf"),
    "QwitcherGrypen-Bold": require("../assets/fonts/QwitcherGrypen-Bold.ttf"),
  });

  // Creamos valores animados
  const fadeAnim = useRef(new Animated.Value(0)).current; // Inicia con opacidad 0
  const scaleAnim = useRef(new Animated.Value(0.8)).current; // Inicia con escala 0.8
  const slideAnim = useRef(new Animated.Value(-100)).current; // Inicia 100 píxeles por encima
  useEffect(() => {
    if (!fontsLoaded) return;

    // Animación de deslizamiento y fundido de entrada
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0, // Anima la posición a 0
        duration: 1500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Navega después de que la animación termine
      const timer = setTimeout(() => {
        navigation.replace("Inicio");
      }, 3
      
      );
      return () => clearTimeout(timer);
    });
  }, [navigation, fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          size="large"
          color="#6a8e48"
          style={styles.activityIndicator}
        />
        <Text style={styles.subtitle}>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Usamos Animated.View para animar el contenedor */}
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim, // Vinculamos la opacidad al valor animado
            transform: [{ scale: scaleAnim }], // Vinculamos la escala al valor animado
          },
        ]}
      >
        <Image
          source={require("../assets/images/logo2.png")}
          resizeMode="contain"
          style={styles.logo}
        />
        <Text style={styles.schoolName}>Escuela Los Corralitos-4025</Text>
      </Animated.View>
      <ActivityIndicator
        size="large"
        color="#6a8e48"
        style={styles.activityIndicator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0f4e4",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 0,
  },
  logo: {
    width: 600,
    height: 600,
    marginBottom: 3,
  },
  schoolName: {
    fontSize: 45,
    fontFamily: "QwitcherGrypen-Bold",
    color: "#4a6c4b",
  },
  activityIndicator: {
    marginTop: 0,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 0,
    color: "#6a8e48",
  },
});
