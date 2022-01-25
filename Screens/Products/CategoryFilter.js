import { Badge, Text } from 'native-base';
import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';

const CategoryFilter = (props) => {
  return (
    <View style={{ marginLeft: 15 }}>
      <Text
        style={{
          marginBottom: 8,
          marginTop: 12,
          fontWeight: 'bold',
          color: '#fc5603',
          fontSize: 17,
        }}
      >
        Category
      </Text>
      <ScrollView
        bounces={true}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
      >
        <TouchableOpacity
          onPress={() => {
            props.filterCategory('all');
            props.setActive(-1);
          }}
        >
          <Badge
            style={[
              styles.center,
              { margin: 5, elevation: 4 },
              props.active == -1 ? styles.active : styles.inactive,
            ]}
          >
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/718/718970.png',
              }}
              style={{ width: 100, height: 100 }}
            />
            <Text
              style={{
                color: 'black',
                textAlign: 'center',
                marginTop: 12,
              }}
            >
              All categories
            </Text>
          </Badge>
        </TouchableOpacity>

        {props.categories.map((item) => {
          return (
            <TouchableOpacity
              key={item._id}
              onPress={() => {
                props.filterCategory(item._id);
                props.setActive(props.categories.indexOf(item));
              }}
            >
              <Badge
                style={[
                  styles.center,
                  { margin: 5, elevation: 4 },
                  props.active == props.categories.indexOf(item)
                    ? styles.active
                    : styles.inactive,
                ]}
              >
                <Image
                  source={{ uri: item.image }}
                  style={{ width: 100, height: 100 }}
                />

                <Text style={{ color: 'black', marginTop: 10 }}>
                  {item.name}
                </Text>
              </Badge>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundColor: 'orange',
  },
  inactive: {
    backgroundColor: 'white',
  },
});
export default CategoryFilter;
