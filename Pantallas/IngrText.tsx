import { useAppContext } from "@/Context/Appcontext";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "react-native-paper";

const Ingresar = ({ navigation }: { navigation: any }) => {
  const { ingredientes, setIngredientes } = useAppContext();
  const verRecetas = () => {
    // La lógica de navegación se maneja directamente en el onPress del botón
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>¿Qué tienes en tu cocina?</Text>
      <Text style={styles.subtitle}>
        Ingresa los ingredientes que tienes a la mano y te ayudaremos a encontrar recetas de conservas deliciosas.
      </Text>
      
      <TextInput
        style={styles.input}
        placeholder="Ej: tomate, cebolla, pollo, conejo"
        placeholderTextColor="#999"
        value={ingredientes}
        onChangeText={setIngredientes}
        keyboardType="default"
      />

      <Button
        onPress={() => navigation.navigate("Recetas")}
        mode="contained"
        style={styles.button}
        labelStyle={styles.buttonLabel}
      >
        Generar recetas
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
    textAlign: "center",
    paddingHorizontal: 10,
  },
  input: {
    width: "100%",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 16,
    color: "#333",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  button: {
    marginTop: 40,
    width: "100%",
    borderRadius: 12,
    paddingVertical: 10,
    backgroundColor: "#4CAF50",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textTransform: "uppercase",
  },
});

export default Ingresar;