import React from 'react';
import { StyleSheet, ScrollView, Dimensions, Text } from 'react-native';

let { width } = Dimensions.get('window');

const FormContainer = (props) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      {props.children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    marginBottom: 400,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  title: {
    alignSelf: 'center',
    fontSize: 20,
    marginTop: 20,
  },
});

export default FormContainer;
