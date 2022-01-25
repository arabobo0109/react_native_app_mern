import { height, style } from 'dom-helpers';
import { Center, ScrollView } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';

let { width } = Dimensions.get('window');

const Carousel = () => {
  const [carouselData, setCarouselData] = useState([]);
  useEffect(() => {
    setCarouselData([
      'https://image.shutterstock.com/image-illustration/tribal-pattern-ornament-width-8418-390w-1997061326.jpg',
      'https://images.pexels.com/photos/375897/pexels-photo-375897.jpeg?auto=compress&cs=tinysrgb&h=151&w=400',
      'https://images.pexels.com/photos/9436715/pexels-photo-9436715.jpeg?auto=compress&cs=tinysrgb&h=150&w=800',
    ]);
    return () => {
      setCarouselData([]);
    };
  }, []);
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.swiper}>
          <Swiper
            containerStyle={{
              elevation: 4,
              backgroundColor: 'white',
              borderRadius: 5,
            }}
            style={{ height: width / 2 }}
            autoplayTimeout={2}
            autoplay={true}
            showsButtons={false}
          >
            {carouselData.map((item) => {
              return (
                <Image
                  key={item}
                  resizeMode='cover'
                  style={styles.imageContainer}
                  source={{
                    uri: item,
                  }}
                />
              );
            })}
          </Swiper>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    marginBottom: 2,
    alignItems: 'center',
  },
  swiper: {
    width: 390,
    height: 140,
    marginTop: 10,
  },
  imageContainer: {
    height: 151,
    width: 300,
    marginHorizontal: 20,
  },
});

export default Carousel;
