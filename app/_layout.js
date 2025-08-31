import { AppProvider } from "@/Context/Appcontext";
import Camara from "@/Pantallas/Camara";
import IngrText from "@/Pantallas/IngrText";
import Inicio from "@/Pantallas/Inicio";
import pantallaInicial from "@/Pantallas/pantallaInicial";
import Recetas from "@/Pantallas/Recetas";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import asegurarIngrediente from "../Pantallas/asegurarIngrediente";
import Recetadetalle from "../Pantallas/RecetaDetalle";
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <>
      <AppProvider>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Pantalla1" component={pantallaInicial} />
          <Stack.Screen name="Inicio" component={Inicio} />
          <Stack.Screen name="Camara" component={Camara} />
          <Stack.Screen name="IngrText" component={IngrText} />
          <Stack.Screen name="Recetas" component={Recetas} />
          <Stack.Screen
            name="asegurarIngrediente"
            component={asegurarIngrediente}
          />

          <Stack.Screen name="RecetaDetalle" component={Recetadetalle} />
        </Stack.Navigator>
        <StatusBar style="light" />
      </AppProvider>
    </>
  );
}
