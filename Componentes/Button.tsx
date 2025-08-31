import { Button } from "react-native-paper";
import { Colors } from "../Color";

interface Datos {
  onpress?: any;
  Text ?: string;
  Background: "Primary" | "Secondary";
  TextColor: "Black" | "White";
  BorderRadius: number;
  Width: number;
  MarginTop?: number;
  MarginLeft?: number;
  MarginRight?: number;
  MarginBottom?: number;
}

export default function Botones(props: Datos) {
  const colorBoton = () => {
    if (props.Background === "Primary") {
      return Colors.primaryButton;
    } else {
      return Colors.secondaryButton;
    }
  };
  const colorDelTexto = () => {
    if (props.TextColor === "Black") {
      return Colors.textColor;
    }else if (props.TextColor === "White") {
      return Colors.textLight;
    }
  };
  return (
    <Button
      onPress={props.onpress}
      mode="contained"
      contentStyle={{
        width: props.Width,
        height: 60, // Altura del contenedor interno
        borderRadius: props.BorderRadius,
        justifyContent: "center", // Centrado vertical
      }}
      style={{
        marginTop: props.MarginTop,
        marginLeft: props.MarginLeft,
        marginBottom: props.MarginBottom,
        marginRight: props.MarginRight,
        backgroundColor: colorBoton(),
      }}
      labelStyle={{
        color: colorDelTexto(),
        fontWeight: "bold",
        textAlign: "center", // Centrado horizontal
        lineHeight: 30, // Ajusta esta propiedad para un centrado vertical más preciso
        fontSize: 20,
      }}
    >
      {props.Text}
    </Button>
  );
}