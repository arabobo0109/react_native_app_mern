import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {
  VStack,
  Input,
  Button,
  IconButton,
  Icon,
  NativeBaseProvider,
  Center,
  Box,
  Divider,
  Heading,
  ScrollView,
  Select,
} from 'native-base';

import baseURL from '../../Configuration/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductList from '../Products/ProductList';
import ProductItemList from './ProductList';
import ProductListHeader from './ProductListHeader';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

let { width, height } = Dimensions.get('window');

const Products = (props) => {
  const [productList, setProductList] = useState([]);
  const [productFilter, setProductFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();

  useEffect(() => {
    //Get token
    AsyncStorage.getItem('jwt')
      .then((res) => {
        setToken(res);
      })
      .catch((error) => console.log(error));

    //get the products
    axios.get(`${baseURL}products`).then((res) => {
      setProductList(res.data.data.product);
      setProductFilter(res.data.data.product);

      setLoading(false);
    });
    return () => {
      setProductFilter([]);
      setProductList([]);
      setLoading(true);
    };
  }, []);

  const productSearch = (text) => {
    if (text == '') {
      setProductFilter(productList);
    }
    setProductFilter(
      productList.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const deleteProducts = (id) => {
    console.log('Everytime delete clicked', id);
    axios
      .delete(`${baseURL}products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const products = productFilter.filter((item) => item.id !== id);
        setProductFilter(products);
      })
      .catch((error) => console.log(error));
  };

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 20,
        }}
      >
        <View style={[{ marginRight: 10, marginTop: 5 }, styles.headerButtton]}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Orders')}
            style={{ flexDirection: 'row' }}
          >
            <FontAwesome5 name='cart-plus' size={22} color='white' />
            <Text style={{ color: 'white', marginLeft: 10 }}>Orders</Text>
          </TouchableOpacity>
        </View>
        <View style={[{ marginRight: 10 }, styles.headerButtton]}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('ProductsForm')}
            style={{ flexDirection: 'row' }}
          >
            <Entypo name='add-to-list' size={24} color='white' />
            <Text style={{ color: 'white', marginLeft: 10 }}>Products</Text>
          </TouchableOpacity>
        </View>
        <View style={[{ marginRight: 10 }, styles.headerButtton]}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Categories')}
            style={{ flexDirection: 'row' }}
          >
            <Fontisto name='shopping-basket-add' size={24} color='white' />
            <Text style={{ color: 'white', marginLeft: 10 }}>Categories</Text>
          </TouchableOpacity>
        </View>
      </View>
      <VStack
        space={3}
        width='95%'
        style={{
          marginLeft: 10,
          elevation: 8,
          marginTop: 10,
          marginBottom: 15,
        }}
        divider={
          <Box px='2'>
            <Divider />
          </Box>
        }
      >
        <VStack width='100%' space={3} alignItems='center'>
          <Input
            placeholder='Search People & Places'
            bg='#fff'
            width='100%'
            onChangeText={(text) => {
              productSearch(text);
            }}
            borderRadius='4'
            py='3'
            px='1'
            fontSize='14'
            _web={{
              _focus: {
                borderColor: 'muted.300',
                style: { boxShadow: 'none' },
              },
            }}
            InputLeftElement={
              <Icon
                m='2'
                ml='3'
                size='6'
                color='gray.400'
                as={<MaterialIcons name='search' />}
              />
            }
            InputRightElement={
              <Icon
                m='2'
                mr='3'
                size='6'
                color='gray.400'
                as={<MaterialIcons name='close' />}
              />
            }
          />
        </VStack>
      </VStack>
      <FlatList
        horizontal={false}
        ListHeaderComponent={<ProductListHeader />}
        data={productFilter}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => {
          return (
            <ProductItemList
              navigation={props.navigation}
              item={item}
              index={index}
              delete={deleteProducts}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerButtton: {
    backgroundColor: '#e36200',
    color: 'white',
    elevation: 10,
    padding: 15,
    borderRadius: 2,
  },
});
export default Products;
