import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

let { width } = Dimensions.get('window');

const ProductListHeader = (props) => {
  return (
    <View style={styles.listHeader}>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: 'bold' }}>Product Image</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: 'bold' }}>Name</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: 'bold' }}>Brand</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: 'bold' }}>Description</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: 'bold' }}>Price</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  listHeader: {
    flexDirection: 'row',
    padding: 5,
    backgroundColor: '#ffeadb',
  },
  headerItem: {
    margin: 3,
    width: width / 6,
  },
});
export default ProductListHeader;
