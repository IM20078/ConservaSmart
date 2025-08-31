import { Text, View } from "react-native";
import { Colors } from "../Color";
import Botones from "../Componentes/Button";

export default function Inicio({ navigation }: { navigation: any }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fdf8f4", // crema verdoso suave
        paddingHorizontal: 20,
        justifyContent: "space-between",
      }}
    >
      {/* Header con logo o imagen */}
      <View style={{ marginTop: 60, alignItems: "center" }}>
      
        <Text
          style={{
            textAlign: "center",
            color: Colors.textColor,
            fontSize: 28,
            fontWeight: "800",
          }}
        >
          Conserva Smart
        </Text>
        <Text
          style={{
            textAlign: "center",
            color: "#666",
            fontSize: 16,
            marginTop: 10,
          }}
        >
          Tu asistente para crear y organizar recetas de conservas 
        </Text>
      </View>

      {/* Pregunta central */}
      <View style={{ alignItems: "center", marginBottom: 40 }}>
        <Text
          style={{
            textAlign: "center",
            color: Colors.textColor,
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          ¿Cómo quieres empezar?
        </Text>

        <Botones
          onpress={() => navigation.navigate("IngrText")}
          Text="Ingresar ingredientes"
          Background="Primary"
          TextColor="White"
          Width={300}
          BorderRadius={10}
        />
        <Botones
          onpress={() => navigation.navigate("Camara")}
          Text="Usar cámara"
          Background="Secondary"
          TextColor="White"
          Width={300}
          BorderRadius={10}
          MarginTop={20}
        />
      </View>
    </View>
  );
}
