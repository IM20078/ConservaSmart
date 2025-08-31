import { Colors } from "@/Color";
import { useAppContext } from "@/Context/Appcontext";
import { analizarImagen } from "@/IA/ia";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
export default function Camara({ navigation }: { navigation: any }) {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<any>(null);
  const { ingredientes, setIngredientes } = useAppContext() as {
    ingredientes: string;
    setIngredientes: React.Dispatch<React.SetStateAction<string>>;
  };

  // Estado para mensaje bonito
  const [mensaje, setMensaje] = useState("");

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Necesitamos permisos para usar la cámara
        </Text>
        <Button onPress={requestPermission} title="Dar permiso" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  async function takePhoto() {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({
        base64: true,
        quality: 0.7,
      });
      const base64Image = `data:image/jpeg;base64,${photo.base64}`;
      const result = await analizarImagen(base64Image);
      console.log(result);

      if (typeof result === "string" && result !== "No") {
        setIngredientes(result);
        navigation.navigate("asegurarIngrediente");
      } else {
        setMensaje("⚠️ No es un ingrediente reconocido");
        setTimeout(() => setMensaje(""), 30000);
      }
    }
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} flash="on" facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Ionicons name="camera-reverse-outline" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <AntDesign name="camerao" size={54} color="white" />
          </TouchableOpacity>
        </View>
      </CameraView>
      <View style={styles.recomendacionesContainer}>
        <Text style={styles.recomendacionesText}>
          💡 Recomendaciones: buena luz, ingrediente centrado y estable
        </Text>
      </View>

      {mensaje ? <Text style={styles.mensaje}>{mensaje}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center" },
  message: { textAlign: "center", paddingBottom: 10 },
  camera: { flex: 1 },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
    justifyContent: "space-around",
    alignItems: "flex-end",
  },
  button: { padding: 10, backgroundColor: "rgba(0,0,0,0.5)", borderRadius: 10 },
  text: { fontSize: 18, fontWeight: "bold", color: "white" },
  mensaje: {
    position: "absolute",
    bottom: 100,
    alignSelf: "center",
    backgroundColor: "#d4edda",
    color: Colors.primaryButton,
    padding: 15,
    borderRadius: 10,
    fontWeight: "bold",
    fontSize: 16,
  },
  recomendacionesContainer: {
    position: "absolute",
    top: 40, // cerca del top
    left: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.4)", // semi-transparente
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  recomendacionesText: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
  },
});
