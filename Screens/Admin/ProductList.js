import { height } from 'dom-helpers';
import { ScrollView } from 'native-base';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  StyleSheet,
  Modal,
} from 'react-native';
import ProductListHeader from './ProductListHeader';
import { AntDesign } from '@expo/vector-icons';

let { width } = Dimensions.get('window');

const ProductItemList = (props) => {
  const [modalVisibilty, setModalVisibility] = useState(false);
  const { item, index } = props;
  const descriptions =
    item.description.length > 5
      ? item.description.substring(0, 5)
      : item.description;
  return (
    <View>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisibilty}
        onRequestClose={() => {
          setModalVisibility(false);
        }}
      >
        <View style={styles.centeredModal}>
          <View style={styles.modalView}>
            <TouchableOpacity
              underlayColor='#E8E8E8
            '
              onPress={() => {
                setModalVisibility(false);
              }}
              style={{
                alignSelf: 'flex-end',
                position: 'absolute',
                top: 5,
                right: 10,
              }}
            >
              <AntDesign name='close' size={24} color='black' />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => [
                props.navigation.navigate('ProductsForm', { item: props }),
                setModalVisibility(false),
              ]}
            >
              <Text
                style={{
                  color: 'white',
                  backgroundColor: '#ff6426',
                  padding: 15,
                  borderRadius: 8,
                }}
              >
                Edit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => [
                props.delete(props.item._id),
                setModalVisibility(false),
              ]}
            >
              <Text
                style={{
                  color: 'white',
                  backgroundColor: '#ff6426',
                  padding: 15,
                  borderRadius: 8,
                  marginTop: 15,
                }}
              >
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('ProductDetail', { item });
        }}
        onLongPress={() => setModalVisibility(true)}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            margin: 10,
            padding: 15,
            elevation: 8,
            backgroundColor: '#ffb16e',
          }}
        >
          <View
            style={{
              marginRight: 10,
              borderRadius: 40,
              width: 40,
              height: 40,
            }}
          >
            {item.image ? (
              <Image
                source={{ uri: item.image }}
                resizeMode='contain'
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 40,
                }}
              />
            ) : null}
          </View>

          <View style={styles.header}>
            <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              style={{ color: 'white' }}
            >
              {item.name}
            </Text>
          </View>
          <View style={styles.header}>
            <Text style={{ color: 'white' }}>{item.brand}</Text>
          </View>
          <View style={styles.header}>
            <Text>{descriptions}...</Text>
          </View>

          <View style={styles.header}>
            <Text>${item.price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    margin: 3,
    width: width / 6,
  },
  centeredModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 70,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
export default ProductItemList;
