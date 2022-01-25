import { style } from 'dom-helpers';
import { Badge } from 'native-base';
import React from 'react';
import {
  StyleSheet,
  Image,
  Text,
  SafeAreaView,
  View,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';

const CartIcon = (props) => {
  return (
    <>
      {props.cartItems.length ? (
        <Badge style={styles.badge}>
          <Text style={styles.text}>{props.cartItems.length}</Text>
        </Badge>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

const styles = StyleSheet.create({
  badge: {
    width: 25,
    position: 'absolute',
    flex: 1,
    backgroundColor: 'black',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    top: -6,
    right: -15,
  },
  text: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
export default connect(mapStateToProps)(CartIcon);
