import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { DataTable, Text } from "react-native-paper";

// Definimos la interfaz de la receta
interface Receta {
  id: string;
  nombre: string;
  descripcion: string;
  // Cambiamos las interfaces para que coincidan con los datos reales
  ingredientes?: Record<string, string>;
  pasos?: Record<string, string>;
  tabla_nutricional?: Record<string, string | number>;
  Cuidados: Record<string, string | number>;
}

// Definimos los tipos de las props de navegación
interface RecetaDetalleProps {
  route: {
    params: {
      receta: Receta;
    };
  };
}

const Colors = {
  primary: "#4CAF50",
  accent: "#FFC107",
  background: "#F0F4C3",
  cardBackground: "#FFFFFF",
  tableBackground: "#E8F5E9",
  tableHeader: "#C8E6C9",
  tableBorder: "#A5D6A7",
  text: "#333333",
  textLight: "#666666",
};

export default function RecetaDetalle({ route }: RecetaDetalleProps) {
  const { receta } = route.params;

  // Debug: imprime la receta completa
  //console.log("Receta recibida:", receta);

  // Asegurar que ingredientes sea array
  const ingredientes = receta.ingredientes
    ? Object.entries(receta.ingredientes)
    : [];
  // Solución: Usar Object.values() para los pasos
  const pasos = receta.pasos ? Object.values(receta.pasos) : [];
  const cuidados = receta.Cuidados ? Object.values(receta.Cuidados) : [];

  return (
    <ScrollView style={styles.container}>
      <View style={{ padding: 10 }}>
        <Text style={styles.title}>{receta.nombre}</Text>
        <Text style={styles.description}>{receta.descripcion}</Text>


        {/* Ingredientes */}
        {ingredientes.length > 0 && (
          <>
            <Text style={styles.subtitle}>Ingredientes</Text>
            <View style={styles.listContainer}>
              {ingredientes.map((ingrediente, index) => (
                <View key={index} style={styles.listItem}>
                  <Text style={styles.listItemText}>• {ingrediente + "."}</Text>
                </View>
              ))}
            </View>
          </>
        )}

        {/* Pasos / Instrucciones */}
        {pasos.length > 0 && (
          <>
            <Text style={styles.subtitle}>Instrucciones</Text>
            <View style={styles.listContainer}>
              {pasos.map((paso, index) => (
                <View key={index} style={styles.listItem}>
                  <Text style={styles.listItemText} >
                    {index + 1}. {paso}
                  </Text>
                </View>
              ))}
            </View>
          </>
        )}

        {cuidados.length > 0 && (
          <>
            <Text style={styles.subtitle}>Cuidados</Text>
            <View style={styles.listContainer}>
              {cuidados.map((cuidado, index) => (
                <View key={index}>
                  <Text style={styles.cuidados}>
                    {cuidado}
                  </Text>
                </View>
              ))}
            </View>
          </>
        )}
        {/* Tabla Nutricional */}
        {receta.tabla_nutricional && (
          <View style={styles.nutritionTableContainer}>
            <Text style={styles.subtitle}>Tabla Nutricional (por porción)</Text>
            <DataTable>
              <DataTable.Header style={styles.tableHeader}>
                <DataTable.Title textStyle={styles.tableHeaderText}>
                  Nutriente
                </DataTable.Title>
                <DataTable.Title numeric textStyle={styles.tableHeaderText}>
                  Cantidad
                </DataTable.Title>
              </DataTable.Header>
              {Object.entries(receta.tabla_nutricional).map(([key, value]) => (
                <DataTable.Row key={key}>
                  <DataTable.Cell textStyle={styles.tableCellText}>
                    {key}
                  </DataTable.Cell>
                  <DataTable.Cell numeric textStyle={styles.tableCellText}>
                    {value}
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.primary,
    textAlign: "center",
    marginBottom: 10,
    marginTop: 40,
  },
  description: {
    fontSize: 16,
    color: Colors.textLight,
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 24,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.text,
    marginTop: 15,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.tableBorder,
    paddingBottom: 5,
    textAlign: "center",
  },
  listContainer: {
    marginLeft: 10,
  },
  listItem: {
    marginBottom: 8,
  },
  listItemText: {
    fontSize: 16,
    textAlign: "left",
    lineHeight: 19
  },
  nutritionTableContainer: {
    marginTop: 20,
    backgroundColor: Colors.tableBackground,
    borderRadius: 8,
    overflow: "hidden",
  },
  tableHeader: {
    backgroundColor: Colors.tableHeader,
    borderBottomWidth: 1,
    borderBottomColor: Colors.tableBorder,
  },
  tableHeaderText: {
    color: Colors.text,
    fontWeight: "bold",
  },
  tableCellText: {
    color: Colors.text,
  },
  cuidados: {
    fontSize: 16,
    textAlign: "left",
    lineHeight: 20

  }
});
