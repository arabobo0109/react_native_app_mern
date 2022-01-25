import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
const CartItem = (props) => {
  const data = props.item.item.product;

  const [quantity, setQuantity] = useState();

  return (
    <View
      style={{
        marginTop: 20,
        margin: 20,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 0.5,
      }}
    >
      <View>
        <Image
          style={{ width: 50, height: 50 }}
          source={{
            uri: data.image
              ? data.image
              : 'https://cdn-icons-png.flaticon.com/512/3163/3163203.png',
          }}
        />
        <Text>{data.name}</Text>
      </View>
      <Text>{data.price}</Text>
    </View>
  );
};

const styles = StyleSheet.create();

export default CartItem;
