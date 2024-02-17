import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import MapView from 'react-native-maps';
import {Store} from '../interfaces/store';
import CardItem, {CardProps} from '../components/CardItem/CardItem';
import {Badge} from '@rneui/themed';
import {COLORS} from '../constants/Colors';

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
      disabled: !store.open || item.assigned,
      handlePress: () => handlePressItem(store.id, item.id),
    }));
    setData(formattedData);
  }, []);

  const handlePressItem = (storeId: string, taskId: string) => {
    return navigation.navigate(...(['CheckIn', {storeId, taskId}] as never));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{store.name}</Text>
        <Badge
          value={t(store.open ? 'details.open' : 'details.closed')}
          badgeStyle={{
            backgroundColor: store.open ? COLORS.success : COLORS.error,
          }}
          textStyle={styles.badgeText}
        />
      </View>
      <View style={styles.dataContainer}>
        <Text style={styles.subtitle}>{store.address.direction}</Text>
        <Text style={styles.subtitle}>
          {t('schedule', {
            from: store.schedule.from,
            end: store.schedule.end,
          })}
        </Text>
      </View>
      {data.map(item => (
        <CardItem {...item} key={item.id} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  mapContainer: {
    height: 400,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 10,
  },
  map: {
    height: 380,
    width: '100%',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    maxWidth: '80%',
  },
  noData: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
    alignSelf: 'center',
  },
  badgeText: {
    color: COLORS.white,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'left',
    marginTop: 10,
  },
  dataContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '90%',
    alignSelf: 'center',
  },
});

export default DetailsScreen;
