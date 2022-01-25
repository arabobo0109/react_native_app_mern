import React, { useEffect, useState } from 'react';
import { Text, View, Button } from 'react-native';

import { Icon, Select } from 'native-base';

import FormContainer from '../../../Shared/Form/FormContainer';
import Input from '../../../Shared/Form/Input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const countries = require('../../../assets/data/countries.json');

import { connect } from 'react-redux';
import { width } from 'dom-helpers';

const Checkout = (props) => {
  const [orderItem, setOrderItem] = useState();
  const [address, setAddress] = useState();
  const [address2, setAddress2] = useState();
  const [country, setCountry] = useState();
  const [city, setCity] = useState();
  const [zip, setZip] = useState();
  const [phone, setPhone] = useState();

  useEffect(() => {
    setOrderItem(props.cartItems);
    return () => {
      setOrderItem();
    };
  }, []);

  const CheckingOut = () => {
    let order = {
      city: city,
      country: country,
      dateOrderd: Date.now(),
      orderItem: orderItem,
      phone: phone,
      shippingAddress1: address,
      shippingAddress2: address2,
      zip: zip,
    };
    props.navigation.navigate('Payment', { order });
  };

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <FormContainer title={'Shipping Address'}>
        <Input
          placeholder={'phone'}
          name={'phone'}
          value={phone}
          keyboardType={'numeric'}
          onChangeText={(text) => setPhone(text)}
        />
        <Input
          placeholder={'Shipping Address 1'}
          name={'ShippingAddress1'}
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
        <Input
          placeholder={'Shipping Address 2'}
          name={'ShippingAddress2'}
          value={address2}
          onChangeText={(text) => setAddress2(text)}
        />
        <Input
          placeholder={'City'}
          name={'city'}
          value={city}
          onChangeText={(text) => {
            setCity(text);
          }}
        />
        <Input
          placeholder={'Zip Code'}
          name={'zip'}
          value={zip}
          keyboardType={'numeric'}
          onChangeText={(text) => setZip(text)}
        />
        <View
          style={{
            width: '95%',
            alignSelf: 'center',
            marginBottom: 40,
            padding: 10,
          }}
        >
          <Select
            mode='dropdown'
            selectedValue={country}
            placeholder='Select Country'
            placeholderStyle={{ color: '#007aff' }}
            onValueChange={(e) => setCountry(e)}
          >
            {countries.map((i, index) => {
              return <Select.Item label={i.name} value={i.name} key={index} />;
            })}
          </Select>
        </View>

        <View style={{ width: '80%', alignSelf: 'center' }}>
          <Button title='Confirm' onPress={() => CheckingOut()} />
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};
const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

export default connect(mapStateToProps)(Checkout);
