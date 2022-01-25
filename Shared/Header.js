import { style } from 'dom-helpers';
import React from 'react';
import {
  StyleSheet,
  Image,
  Text,
  SafeAreaView,
  View,
  Dimensions,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

const Header = () => {
  return (
    <View style={styles.header}>
      <View style={{ flexDirection: 'row' }}>
        <Entypo
          style={styles.iconStyle}
          name='location-pin'
          size={34}
          color='#f54500'
        />
        <View style={styles.locationContainer}>
          <Text style={{ fontWeight: 'bold', color: '#f54500' }}>
            Current Location
          </Text>
          <Text>Kogarah,NSW</Text>
        </View>
      </View>
      <Fontisto
        style={{ marginRight: 16 }}
        name='male'
        size={34}
        color='grey'
      />
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 60,
  },
  iconStyle: {
    marginRight: 10,
    marginLeft: 10,
  },

  locationContainer: {
    flexDirection: 'column',
  },
});
export default Header;
