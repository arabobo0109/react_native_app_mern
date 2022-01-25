import { Container } from 'native-base';
import React, { useState, useEffect } from 'react';
import {
  Image,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Button,
} from 'react-native';
import { isEnabled } from 'react-native/Libraries/Performance/Systrace';
import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/cartActions';

const ProductDesc = (props) => {
  const [item, setItem] = useState(props.route.params.item);
  const [availability, setAvailability] = useState('');

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={{
            uri: item.image
              ? item.image
              : 'https://static1.squarespace.com/static/5a51022ff43b55247f47ccfc/5a567854f9619a96fd6233bb/5b74446c40ec9afbc633e555/1534346950637/Husqvarna+545FR+%282%29.png?format=1500w',
          }}
          resizeMode='contain'
          style={styles.image}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.header}>{item.name}</Text>
        <Text style={styles.contentText}>{item.brand}</Text>
      </View>
      <View style={styles.bottomContent}>
        <Text>${item.price}</Text>
        <Button
          title='Add'
          onPress={() => {
            props.addItemToCart(item);
          }}
        />
      </View>
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
    height: '100%',
  },
  imageContainer: {
    backgroundColor: 'white',
    padding: 0,
    margin: 0,
  },
  image: {
    width: '100%',
    height: 250,
  },
  content: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontWeight: 'bold',
    marginBottom: 20,
  },
  contentText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  bottomContent: {
    margin: 20,
    flexDirection: 'row',
    bottom: 0,
    left: 0,
    justifyContent: 'space-between',
  },
});

export default connect(null, mapDispatchToProps)(ProductDesc);
