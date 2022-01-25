import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Button,
} from 'react-native';
import {
  Box,
  FlatList,
  Heading,
  Avatar,
  HStack,
  VStack,
  Spacer,
  Center,
  NativeBaseProvider,
  ScrollView,
} from 'native-base';
import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/cartActions';
import { style } from 'dom-helpers';
import CartItem from './CartItem';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Ionicons } from '@expo/vector-icons';

let { height, width } = Dimensions.get('window');

const Cart = (props) => {
  const renderData = props.cartItems;
  let total = 0;
  props.cartItems.forEach((cart) => {
    return (total += cart.product.price);
  });
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {props.cartItems.length ? (
        <View>
          <Text style={{ alignSelf: 'center' }}> Cart</Text>
          <ScrollView>
            <SwipeListView
              data={renderData}
              renderItem={(data) => {
                return <CartItem item={data} />;
              }}
              renderHiddenItem={(data) => (
                <View style={styles.hiddenContainer}>
                  <TouchableOpacity
                    onPress={() => props.removeFromCart(data.item)}
                    style={styles.hiddenButton}
                  >
                    <Ionicons name='trash' size={24} color='black' />
                  </TouchableOpacity>
                </View>
              )}
              disableRightSwipe={true}
              previewOpenDelay={3000}
              friction={1000}
              tension={40}
              leftOpenValue={75}
              stopLeftSwipe={75}
              rightOpenValue={-75}
            />
          </ScrollView>
        </View>
      ) : (
        <View>
          <Text>Cart Empty</Text>
          <Text>Shop to get started</Text>
        </View>
      )}
      <View style={styles.bottomContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: 10,
          }}
        >
          <Text>Total Price:</Text>
          <Text style={styles.price}>${total}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginTop: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              props.clearCart();
            }}
          >
            <Text
              style={{
                color: 'white',
                backgroundColor: '#ff6426',
                padding: 10,
                borderRadius: 8,
                marginRight: 15,
              }}
            >
              Clear
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Checkout')}
          >
            <Text
              style={{
                color: 'white',
                backgroundColor: '#ff6426',
                padding: 10,
                borderRadius: 8,
              }}
            >
              Checkout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyCart: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    width: '95%',
    position: 'absolute',
    bottom: 40,
    elevation: 10,
  },
  price: {
    fontSize: 18,
    color: 'red',
  },
  hiddenContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
  },
  hiddenButton: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 25,
    height: 70,
    width: 100,
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
    removeFromCart: (item) => dispatch(actions.removeFromCart(item)),
  };
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

// {props.cartItems.map((data) => {
//     return <CartItem item={data} />;
//   })}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
