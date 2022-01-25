import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  TextPropTypes,
  Dimensions,
} from 'react-native';
import ProductList from './ProductList';
import SearchProduct from './SearchProduct';
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
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import Carousel from '../../Shared/Carousel';
import CategoryFilter from './CategoryFilter';
import Header from '../../Shared/Header';

import axios from 'axios';
import { set } from 'react-native-reanimated';
import baseURL from '../../Configuration/baseUrl';

let { height } = Dimensions.get('window');

const data = require('../../assets/data/products.json');
const categoriesData = require('../../assets/data/categories.json');
let filteredData;

const ProductContainer = (props) => {
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);
  const [focus, setFocus] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setFocus(false);
    setActive(-1);

    //Get Categories
    axios.get(`${baseURL}categories`).then((res) => {
      setCategories(res.data.data.categoryList);
    });

    //GetProducts
    axios.get(`${baseURL}products`).then((res) => {
      setProducts(res.data.data.product);
      setCategoryFilter(res.data.data.product);
      setFilterProducts(res.data.data.product);
      setInitialState(res.data.data.product);
      setLoading(false);
    });

    return () => {
      setProducts([]);
      setFilterProducts([]);
      setFocus();
      setCategoryFilter([]);
      setCategories([]);
      setActive();
      setCategoryFilter();
      setInitialState();
    };
  }, []);

  const openList = () => {
    setFocus(true);
  };

  const onBLur = () => {
    setFocus(false);
  };
  const changeCategory = (categry) => {
    {
      categry === 'all'
        ? [setCategoryFilter(initialState), setActive(true)]
        : [
            setCategoryFilter(products.filter((i) => i.category === categry)),
            setActive(true),
          ];
    }
  };

  const productSearch = (text) => {
    setFilterProducts(
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };

  return (
    <>
      {loading == false ? (
        <View style={styles.container}>
          <Header />
          <VStack
            space={3}
            width='95%'
            style={{
              backgroundColor: 'transparent',
              marginLeft: 10,
              elevation: 5,
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
                onFocus={openList}
                onChangeText={(text) => {
                  productSearch(text);
                  openList();
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
                    onPress={onBLur}
                    as={<MaterialIcons name='close' />}
                  />
                }
              />
            </VStack>
          </VStack>
          {focus == true ? (
            <SearchProduct
              navigation={props.navigation}
              filterProducts={filterProducts}
            />
          ) : (
            <ScrollView>
              <View style={styles.container}>
                <View>
                  <Carousel />
                </View>
                <View>
                  <CategoryFilter
                    filterCategory={changeCategory}
                    categories={categories}
                    categoryFilter={categoryFilter}
                    active={active}
                    setActive={setActive}
                  />
                </View>
                {categoryFilter?.length > 0 ? (
                  <View style={styles.listContainer}>
                    {categoryFilter.map((item) => {
                      return (
                        <ProductList
                          navigation={props.navigation}
                          key={item._id}
                          item={item}
                        />
                      );
                    })}
                  </View>
                ) : (
                  <View>
                    <Text>No products Found</Text>
                  </View>
                )}
              </View>
            </ScrollView>
          )}
        </View>
      ) : (
        <View style={{ alignSelfl: 'center' }}>
          <ActivityIndicator size='large' color='red' />
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
    backgroundColor: 'white',
  },

  listContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
});
export default ProductContainer;
