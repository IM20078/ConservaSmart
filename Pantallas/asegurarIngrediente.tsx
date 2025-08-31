import { useAppContext } from "@/Context/Appcontext";
import React, { useCallback, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "react-native-paper";

// Stylesheet is defined outside the component to prevent re-creation on every render.
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
  ingredienteDestacado: {
    color: "#FF9800",
    fontWeight: "bold",
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

const AsegurarIngredienteScreen = ({ navigation }: { navigation: any }) => {
  const { ingredientes, setIngredientes } = useAppContext();
  // Se crea una nueva variable de estado local para el input
  const [ingredienteInput, setIngredienteInput] = useState(ingredientes);

  const handleGenerateRecipes = useCallback(() => {
    // Se usa el valor del estado local para la validación
    if (!ingredienteInput) {
      Alert.alert(
        "Campo vacío",
        "Por favor, ingresa o confirma el ingrediente."
      );
      return;
    }

    // Se actualiza el ingrediente en el contexto global solo al presionar el botón
    setIngredientes(ingredienteInput);
    navigation.navigate("Recetas");
  }, [ingredienteInput, setIngredientes, navigation]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>
        El ingrediente escaneado es{" "}
        <Text style={styles.ingredienteDestacado}>
          {ingredientes}
        </Text>
        ?
      </Text>
      <Text style={styles.subtitle}>En caso de que no lo sea, ingrésalo</Text>

      <TextInput
        style={styles.input}
        placeholder="Ej: tomate, cebolla, pollo, conejo"
        placeholderTextColor="#999"
        // Se enlaza el input a la nueva variable de estado local
        value={ingredienteInput}
        onChangeText={setIngredienteInput}
        keyboardType="default"
        accessibilityLabel="Campo de texto para ingresar o corregir el ingrediente"
      />

      <Button
        onPress={handleGenerateRecipes}
        mode="contained"
        style={styles.button}
        labelStyle={styles.buttonLabel}
        accessibilityLabel="Generar recetas"
      >
        Generar recetas
      </Button>
    </View>
  );
};

export default AsegurarIngredienteScreen;
