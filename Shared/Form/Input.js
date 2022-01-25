import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

const Input = (props) => {
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder={props.placeholder}
        name={props.name}
        id={props.id}
        value={props.value}
        autoCorrect={props.autoCorrect}
        onChangeText={props.onChangeText}
        secureTextEntry={props.secureTextEntry}
        keyboardType={props.keyboardType}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '90%',
    height: 55,
    borderRadius: 4,
    margin: 10,

    borderWidth: 0.75,
    padding: 8,
    borderColor: '#ff8363',
    alignSelf: 'center',
  },
});

export default Input;
