import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
  NativeEventEmitter,
  Button,
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/cartActions';

let { width } = Dimensions.get('window');

const ProductCard = (props) => {
  const { name, price, image, countInStock } = props;

  let images = image.replace('localhost', '192.168.0.136');

  return (
    <View style={styles.container}>
      <Image
        resizeMode='contain'
        style={styles.image}
        source={{
          uri: images
            ? images
            : 'https://images.pexels.com/photos/128402/pexels-photo-128402.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=640&w=940',
        }}
      />
      <View style={styles.card} />
      <Text style={styles.title}>
        {name.length > 15 ? name.substring(0, 15 - 3) + '....' : name}
      </Text>
      <Text style={styles.price}>${price}</Text>
      {countInStock > 0 ? (
        <View style={{ marginTop: 5 }}>
          <Button
            title={'Add'}
            onPress={() => {
              props.addItemToCart(props);
            }}
            style={{ borderRadius: 20, padding: 10 }}
          />
        </View>
      ) : (
        <Text>No product</Text>
      )}
    </View>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (product) =>
      dispatch(actions.addToCart({ quantity: 1, product })),
  };
};

const styles = StyleSheet.create({
  container: {
    width: width / 2 - 25,
    height: width / 1.7,
    padding: 5,
    borderRadius: 3,
    marginTop: 55,
    marginBottom: 5,
    marginLeft: 10,
    alignItems: 'center',
    backgroundColor: '#fffafa',
    elevation: 8,
  },
  image: {
    width: width / 2 - 20 - 10,
    height: 150,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: -10,
  },
  card: {
    marginBottom: 10,
    height: width / 2 - 20 - 90,
    backgroundColor: 'transparent',
    width: width / 2 - 20 - 10,
  },
  title: {
    fontSize: 14,
    marginTop: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  price: {
    fontSize: 20,
    color: 'orange',
    marginTop: 4,
  },
});

export default connect(null, mapDispatchToProps)(ProductCard);
