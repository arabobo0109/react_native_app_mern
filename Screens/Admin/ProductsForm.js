import axios from 'axios';
import { Select } from 'native-base';
import React, { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  ToastAndroid,
} from 'react-native';
import baseURL from '../../Configuration/baseUrl';
import Error from '../../Shared/Error';
import Input from '../../Shared/Form/Input';
import CategoryFilter from '../Products/CategoryFilter';
import * as ImagePicker from 'expo-image-picker';
import mime from 'mime';

const ProductsForm = (props) => {
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [brand, setBrand] = useState();
  const [description, setDescription] = useState();
  const [countInStock, setCountInStock] = useState();
  const [mainImage, setMainImage] = useState();
  const [isFeatured, setIsFeatured] = useState(false);
  const [rating, setRating] = useState();
  const [numReviews, setNumReviews] = useState();
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState();
  const [category, setCategory] = useState();
  const [pickerValue, setPickerValue] = useState();
  const [token, setToken] = useState();
  const [item, setItem] = useState(null);

  const toast = () => {
    ToastAndroid.showWithGravityAndOffset(
      'Product Added Successffuly',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };

  useEffect(() => {
    if (!props.route.params) {
      setItem(null);
    } else {
      setItem(props.route.params.item.item);
      setBrand(props.route.params.item.item.brand);
      setName(props.route.params.item.item.name);
      setPrice(props.route.params.item.item.price.toString());
      setDescription(props.route.params.item.item.description);
      setMainImage(props.route.params.item.item.mainImage);
      setCountInStock(props.route.params.item.item.countInStock.toString());
      setCategory(props.route.params.item.item.category._id);
    }
    AsyncStorage.getItem('jwt')
      .then((res) => {
        setToken(res);
      })
      .catch((error) => console.log(error));

    axios
      .get(`${baseURL}categories`)
      .then((res) => {
        setCategories(res.data.data.categoryList);
      })
      .catch((err) => alert('Error', err));

    //Image Picker

    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== granted) {
          alert('Sorry, Permission not granted');
        }
      }
    })();

    return () => {
      setCategories([]);
    };
  }, []);

  const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setMainImage(result.uri);
    }
  };

  const addProduct = () => {
    if (
      name == '' ||
      brand == '' ||
      price == '' ||
      description == '' ||
      category == '' ||
      countInStock == ''
    ) {
      setError('Please fill in all the credentials');
    }
    let formData = new FormData();
    const newImageUri = 'file:///' + mainImage.split('file:/').join('');
    formData.append('image', {
      uri: newImageUri,
      type: mime.getType(newImageUri),
      name: newImageUri.split('/').pop(),
    });
    formData.append('name', name);
    formData.append('brand', brand);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('countInStock', countInStock);
    formData.append('description', description);
    // formData.append('rating', rating);
    // formData.append('numReviews', numReviews);
    // formData.append('isFeatured', isFeatured);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };

    if (item !== null) {
      axios
        .put(`${baseURL}products/${item._id}`, formData, config)
        .then((res) => {
          if (res.status === 200 || res.status == 201) {
            toast();
            setTimeout(() => {
              props.navigation.navigate('Products');
            }, 500);
          }
        })
        .catch((err) => {
          console.log(err);
          ToastAndroid.showWithGravityAndOffset(
            'Something went wrong',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
          );
        });
    } else {
      axios
        .post(`${baseURL}products`, formData, config)
        .then((res) => {
          if (res.status === 200 || res.status == 201) {
            toast();
            setTimeout(() => {
              props.navigation.navigate('Products');
            }, 500);
          }
        })
        .catch((err) => {
          console.log(err);
          ToastAndroid.showWithGravityAndOffset(
            'Something went wrong',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
          );
        });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: mainImage }} />
        <TouchableOpacity onPress={PickImage} style={styles.imagePicker}>
          <MaterialCommunityIcons name='camera-plus' size={30} color='black' />
        </TouchableOpacity>
      </View>
      <View style={styles.label}>
        <Text>Brand</Text>
      </View>
      <Input
        placeholder='Brand'
        name='brand'
        id='brand'
        value={brand}
        onChangeText={(text) => setBrand(text)}
      />
      <View style={styles.label}>
        <Text>Name</Text>
      </View>
      <Input
        placeholder='Name'
        name='name'
        id='name'
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <View style={styles.label}>
        <Text>Price</Text>
      </View>
      <Input
        placeholder='Price'
        name='price'
        id='price'
        value={price}
        onChangeText={(text) => setPrice(text)}
      />
      <View style={styles.label}>
        <Text>Count In Stock</Text>
      </View>
      <Input
        placeholder='Count in Stock'
        name='stock'
        id='stock'
        value={countInStock}
        onChangeText={(text) => setCountInStock(text)}
      />
      <View style={styles.label}>
        <Text>Description</Text>
      </View>
      <Input
        placeholder='Description'
        name='description'
        id='description'
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <View>
        <Select
          mode='dropdown'
          selectedValue={pickerValue}
          placeholder='Select Category'
          placeholderStyle={{ color: '#007aff' }}
          onValueChange={(e) => {
            console.log(e);
            [setPickerValue(e), setCategory(e)];
          }}
        >
          {categories.map((c, index) => {
            return <Select.Item label={c.name} value={c._id} key={index} />;
          })}
        </Select>
      </View>
      <View style={{ alignSelf: 'center', margin: 20 }}>
        <TouchableOpacity
          onPress={() => addProduct()}
          style={{ padding: 20, backgroundColor: 'orange', elevation: 9 }}
        >
          <Text style={{ color: 'white' }}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    fontWeight: '800',
    flex: 1,
    backgroundColor: 'white',
  },
  label: {
    marginLeft: 25,
  },
  imageContainer: {
    alignSelf: 'center',
    width: 200,
    height: 200,
    padding: 0,
    borderRadius: 200 / 2,
    justifyContent: 'center',
    borderColor: 'orange',
    borderWidth: 1,
  },

  image: {
    width: 200,
    borderRadius: 100,
    height: 200,
  },
  imagePicker: {
    position: 'absolute',
    right: 5,
    bottom: 5,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 100,
    elevation: 20,
  },
});

export default ProductsForm;
