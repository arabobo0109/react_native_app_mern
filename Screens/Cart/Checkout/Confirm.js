import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import baseURL from '../../../Configuration/baseUrl';
import { clearCart } from '../../../Redux/Actions/cartActions';
import * as actions from '../../../Redux/Actions/cartActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthGlobal from '../../../Context/store/AuthGlobal';

const Confirm = (props) => {
  const finalOrder = props.route.params;
  const context = useContext(AuthGlobal);

  const userData = context.stateUser.user.userId;
  const userId = userData?.replace('user', '');

  const confirmOrder = () => {
    const order = finalOrder.order.order;
    AsyncStorage.getItem('jwt')
      .then((res) => {
        order.user = userId;
        console.log(order);
        axios
          .post(`${baseURL}orders`, order, {
            headers: { Authorization: `Bearer ${res}` },
          })
          .then((res) => {
            if (res.status == 200 || res.status == 201) {
              setTimeout(() => {
                props.clearCart();
                props.navigation.navigate('Cart');
              }, 500);
            }
          });
      })
      .catch((err) => {
        console.log('Errror Encountered', err);
      });

    setTimeout(() => {
      props.clearCart();
      props.navigation.navigate('Cart');
    });
  };

  return (
    <ScrollView>
      <View>
        <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 20 }}>
          Order Confirmed
        </Text>
        {props.route.params ? (
          <View>
            <View>
              {finalOrder.order.order.orderItem.map((x) => {
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginBottom: 10,
                      padding: 10,
                      borderBottomWidth: 0.5,
                    }}
                  >
                    <View>
                      <Image
                        source={{ uri: x.product.image }}
                        style={{ width: 40, height: 50 }}
                      />
                      <Text>{x.product.name}</Text>
                    </View>
                    <Text>{x.product.price}</Text>
                  </View>
                );
              })}
            </View>
            <View>
              <Text>Shipment will arrive at:</Text>
              <View
                style={{
                  flexDirection: 'row',
                }}
              >
                <Text>{finalOrder.order.order.shippingAddress1} ,</Text>
                <Text>{finalOrder.order.order.shippingAddress2} </Text>
                <Text>{finalOrder.order.order.city} </Text>
                <Text>{finalOrder.order.order.zip} </Text>
                <Text> {finalOrder.order.order.country} </Text>
              </View>
            </View>
          </View>
        ) : null}
      </View>
      <View style={{ alignContent: 'center', margin: 20 }}>
        <TouchableOpacity
          onPress={confirmOrder}
          style={{
            backgroundColor: '#fc5e03',
            alignSelf: 'center',
            padding: 20,
            elevation: 8,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: 'white' }}>Place your Order</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const mapDispatchToProps = (dispatch) => {
  return { clearCart: () => dispatch(actions.clearCart()) };
};

export default connect(null, mapDispatchToProps)(Confirm);
