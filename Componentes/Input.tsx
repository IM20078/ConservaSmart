import React from 'react';
import { KeyboardTypeOptions, StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';

// 1. Definimos los tipos de los props que recibirá nuestro componente
interface CustomInputProps {
  placeholder: string;
  onChangeText: (text: string) => void;
  value: string;
  iconName ?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  placeholder,
  onChangeText,
  value,
  iconName,
  secureTextEntry = false,
  keyboardType = 'default',
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        mode="outlined"
        style={styles.inputText}
        outlineStyle={styles.inputContainer}
        
        left={iconName ? <TextInput.Icon icon={iconName} style={styles.icon} /> : undefined}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '100%',
    paddingHorizontal: 20,
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingHorizontal: 0,
    minHeight: 55,
    borderWidth: 0,
  },
  inputText: {
    color: '#333333',
    fontSize: 16,
    backgroundColor: '#F5F5F5',
  },
  icon: {
    marginRight: 10,
  },
});

