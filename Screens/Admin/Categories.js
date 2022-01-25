import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import baseURL from '../../Configuration/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { FontAwesome5 } from '@expo/vector-icons';

let { width } = Dimensions.get('window');

const Categories = (props) => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState();
  const [token, setToken] = useState();

  useEffect(() => {
    AsyncStorage.getItem('jwt')
      .then((res) => {
        setToken(res);
      })
      .catch((err) => console.log(error));

    axios
      .get(`${baseURL}categories`)
      .then((res) => {
        setCategories(res.data.data.categoryList);
      })
      .catch((error) => alert('Error to load Categories'));

    return () => {
      setCategories();
      setToken();
    };
  }, []);

  const addCategory = () => {
    const name = {
      name: categoryName,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios.post(`${baseURL}categories`, name, config).then((res) => {
      console.log(res.data.data);
      setCategories([...categories, res.data.data]);
    });
    setCategoryName('');
  };

  const deleteCategory = (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .delete(`${baseURL}categories/${id}`, config)
      .then((res) => {
        const newCategories = categories.filter((item) => item._id !== id);
        setCategories(newCategories);
      })
      .catch((err) => alert('Error Found'));
  };

  const CateGoryItem = (props) => {
    return (
      <View
        style={{
          elevation: 5,
          backgroundColor: 'white',
          padding: 10,
          margin: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text>{props.item.name}</Text>
        <TouchableOpacity
          onPress={() => props.delete(props.item._id)}
          style={{
            backgroundColor: '#fc620f',
            padding: 10,
            elevation: 4,
            flexDirection: 'row',
          }}
        >
          <FontAwesome5 name='trash' size={24} color='white' />
          <Text style={{ color: 'white', marginLeft: 10 }}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ position: 'relative', height: '100%' }}>
      <View style={{ marginBottom: 60 }}>
        <FlatList
          data={categories}
          renderItem={({ item, index }) => {
            return (
              <CateGoryItem item={item} index={index} delete={deleteCategory} />
            );
          }}
          keyExtractor={(item) => item._id}
        />
      </View>
      <View style={styles.bottomView}>
        <View style={{ width: width / 1.5, marginLeft: 10, marginTop: 10 }}>
          <TextInput
            value={categoryName}
            style={styles.inputStyle}
            onChangeText={(text) => setCategoryName(text)}
          />
        </View>
        <View>
          <TouchableOpacity
            style={{
              backgroundColor: 'orange',
              padding: 12,
              width: width / 4,
              marginRight: 5,
              elevation: 8,
              marginTop: 12,
            }}
          >
            <Text
              onPress={() => addCategory()}
              style={{ color: 'white', alignSelf: 'center' }}
            >
              Add
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomView: {
    backgroundColor: 'white',
    width: width,
    height: 100,
    padding: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    left: 0,
    elevation: 8,
  },
  inputStyle: {
    height: 50,
    elevation: 2,
    backgroundColor: 'white',
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 5,
  },
});
export default Categories;
