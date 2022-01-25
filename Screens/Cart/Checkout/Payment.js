import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Radio, Select } from 'native-base';

const methods = [
  { name: 'Cash on Delivery', value: 1 },
  { name: 'Bank Transfer', value: 2 },
  { name: 'Card Payment', value: 3 },
];

const paymentCards = [
  { name: 'PayPal', value: 1 },
  { name: 'Visa', value: 2 },
  { name: 'MasterCard', value: 3 },
  { name: 'Other', value: 4 },
];

const Payment = (props) => {
  const order = props.route.params;
  const [selected, setSelected] = useState();
  const [card, setCard] = useState();

  return (
    <View>
      <Text
        style={{
          alignSelf: 'center',
          marginBottom: 10,
          marginTop: 5,
          fontWeight: 'bold',
          fontSize: 18,
        }}
      >
        Payment Method
      </Text>
      {methods.map((item, index) => {
        return (
          <TouchableOpacity onPress={() => setSelected(item.value)}>
            <View style={styles.container}>
              <Text>{item.name}</Text>
              <View>
                <Radio.Group
                  name='myRadioGroup'
                  value={item.value}
                  onChange={(item) => setSelected(item)}
                >
                  <Radio value={selected} />
                </Radio.Group>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
      {selected == 3 ? (
        <View
          style={{
            width: '95%',
            alignSelf: 'center',
            marginTop: 10,
          }}
        >
          <Select
            mode='dropdown'
            selectedValue={card}
            placeholder='Select Card'
            placeholderStyle={{ color: '#007aff' }}
            onValueChange={(e) => setCard(e)}
          >
            {paymentCards.map((i) => {
              return (
                <Select.Item label={i.name} value={i.name} key={i.value} />
              );
            })}
          </Select>
        </View>
      ) : null}
      <View style={{ marginTop: 40, alignSelf: 'center' }}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Confirm', { order })}
        >
          <Text
            style={{
              backgroundColor: '#fc5e03',
              padding: 15,
              color: 'white',
              elevation: 5,
              borderRadius: 5,
            }}
          >
            Confirm
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '95%',
    marginLeft: 10,
    padding: 20,
    borderBottomWidth: 0.25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Payment;
