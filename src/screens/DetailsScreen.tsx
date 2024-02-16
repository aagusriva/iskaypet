import {useRoute} from '@react-navigation/native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import MapView from 'react-native-maps';
import {Store} from '../interfaces/store';

/**
 * Screen that renders an entire detail of an item.
 * Should receive an id by route params and with that id fetch the necessary data to render the item
 */
const DetailsScreen = () => {
  const {t} = useTranslation();
  const route = useRoute();
  const store = (route.params as {store: Store})?.store;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: Number(store.address.coordinate.lat),
          longitude: Number(store.address.coordinate.lng),
          latitudeDelta: 0,
          longitudeDelta: 0,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // ...StyleSheet.absoluteFillObject,
    height: 400,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  map: {
    // ...StyleSheet.absoluteFillObject,
    height: 380,
    width: '100%',
  },
});

export default DetailsScreen;
