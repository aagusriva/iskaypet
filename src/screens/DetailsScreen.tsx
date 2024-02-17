import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import MapView from 'react-native-maps';
import {Store} from '../interfaces/store';
import CardItem, {CardProps} from '../components/CardItem/CardItem';

/**
 * Screen that renders an entire detail of an store.
 */
const DetailsScreen = () => {
  const {t} = useTranslation();
  const route = useRoute();
  const navigation = useNavigation();
  const store = (route.params as {store: Store})?.store;
  const [data, setData] = useState<CardProps[]>([]);

  useEffect(() => {
    mapData(store);
  }, [store]);

  const mapData = useCallback((store: Store) => {
    const formattedData = store.tasks.map(item => ({
      id: item.id,
      title: item.description,
      subtitle: t(
        item.assigned ? 'details.task.assigned' : 'details.task.notAssigned',
      ),
      disabled: item.assigned,
      handlePress: () => handlePressItem(store.id, item.id),
    }));
    setData(formattedData);
  }, []);

  const handlePressItem = (storeId: string, taskId: string) => {
    return navigation.navigate(...(['CheckIn', {storeId, taskId}] as never));
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
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
      <FlatList
        data={data}
        ListEmptyComponent={<Text style={styles.noData}>{t('noData')}</Text>}
        renderItem={({item}) => <CardItem {...item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 70,
  },
  mapContainer: {
    height: 400,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  map: {
    height: 380,
    width: '100%',
  },
  noData: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
    alignSelf: 'center',
  },
});

export default DetailsScreen;
