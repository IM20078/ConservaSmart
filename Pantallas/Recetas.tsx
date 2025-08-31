// src/screens/Recetas.tsx

import { useAppContext } from "@/Context/Appcontext";
import { TextIA } from "@/IA/ia.js";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { DataTable, Text } from "react-native-paper";

interface Receta {
  id: string;
  nombre: string;
  descripcion: string;
  tabla_nutricional?: Record<string, string | number>;
  ingredientes: string[];
  instrucciones: string[];
}

interface RecetasResponse {
  recetas: Receta[];
}

interface AIErrorResponse {
  error: string;
}

type IAResponse = RecetasResponse | AIErrorResponse;

const Colors = {
  // Paleta de colores más vibrante
  background: "#f4fdf4", // Fondo crema muy suave y cálido
  cardBackground: "#FFFFFF",
  primary: "#4CAF50", // Verde vibrante (similar al anterior, pero más clásico)
  secondary: "#43b915ff", // Naranja vibrante para los acentos
  text: "#333333",
  lightText: "#757575",
  separator: "#e0e0e0",
  error: "#F44336",
};

export default function Recetas({ navigation }: { navigation: any }) {
  const [recetas, setRecetas] = useState<Receta[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { ingredientes } = useAppContext();

  const buscarRecetas = async () => {
    setLoading(true);
    setError(null);
    try {
      const data: any = await TextIA(ingredientes);
      if (data && "error" in data) {
        setError(data.error);
      } else if (data && "recetas" in data) {
        setRecetas(data.recetas);
      } else {
        setError("Respuesta inesperada del servidor.");
      }
    } catch (e: any) {
      setError("Ocurrió un error inesperado al buscar recetas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarRecetas();
  }, [ingredientes]);

  const goToRecetaDetalle = (receta: Receta) => {
    navigation.navigate("RecetaDetalle", { receta });
  };

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color={Colors.secondary} />
        <Text style={styles.loadingText}>Buscando las mejores recetas...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!recetas.length) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.infoText}>
          ¡Ups! No se encontraron recetas con esos ingredientes.
        </Text>
        <TouchableOpacity style={styles.retryButton} onPress={buscarRecetas}>
          <Text style={styles.retryButtonText}>Volver a intentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.headerTitle}>Recetas para ti</Text>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={recetas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => goToRecetaDetalle(item)}
            style={styles.card}
          >
            <Text style={styles.recipeTitle}>{item.nombre}</Text>
            <Text style={styles.recipeDescription}>{item.descripcion}</Text>
            {item.tabla_nutricional && (
              <View style={styles.nutritionTableContainer}>
                <Text style={styles.tableTitle}>Tabla Nutricional</Text>
                <DataTable>
                  <DataTable.Header style={styles.tableHeader}>
                    <DataTable.Title textStyle={styles.tableHeaderText}>
                      Nutriente
                    </DataTable.Title>
                    <DataTable.Title numeric textStyle={styles.tableHeaderText}>
                      Cantidad
                    </DataTable.Title>
                  </DataTable.Header>
                  {Object.entries(item.tabla_nutricional).map(
                    ([key, value]) => (
                      <DataTable.Row key={key}>
                        <DataTable.Cell textStyle={styles.tableCellText}>
                          {key}
                        </DataTable.Cell>
                        <DataTable.Cell
                          numeric
                          textStyle={styles.tableCellText}
                        >
                          {value}
                        </DataTable.Cell>
                      </DataTable.Row>
                    )
                  )}
                </DataTable>
              </View>
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    backgroundColor: Colors.background,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.primary,
    textAlign: "center",
    marginTop: 60,
    marginBottom: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: Colors.separator,
  },
  recipeTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 8,
    textAlign: "center",
  },
  recipeDescription: {
    fontSize: 14,
    color: Colors.lightText,
    lineHeight: 20,
    textAlign: "center",
  },
  nutritionTableContainer: {
    marginTop: 20,
    backgroundColor: Colors.background,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.separator,
  },
  tableTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    textAlign: "center",
    paddingVertical: 10,
    backgroundColor: Colors.separator,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  tableHeader: {
    backgroundColor: "#f5f5f5", // un tono más claro para el encabezado de la tabla
    borderBottomWidth: 1,
    borderBottomColor: Colors.separator,
  },
  tableHeaderText: {
    color: Colors.primary,
    fontWeight: "bold",
  },
  tableCellText: {
    color: Colors.text,
    fontSize: 14,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "600",
    color: Colors.lightText,
    textAlign: "center",
  },
  errorText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.error,
    textAlign: "center",
  },
  infoText: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.lightText,
    textAlign: "center",
  },
  retryButton: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.primary,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  retryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
