import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import CardItem, {CardProps} from '../components/CardItem/CardItem';
import {getStores} from '../api/stores';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Store} from '../interfaces/store';

/**
 * Screen that renders a list of all resumed items.
 * Search by input if user types something and handles pagination
 */
const HomeScreen = () => {
  const {t} = useTranslation();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Array<CardProps>>([]);

  useEffect(() => {
    isFocused && fetchData();
  }, [isFocused]);

  /**
   * Fetch data from api and map it as card component needs.
   */
  const fetchData = async () => {
    setLoading(true);
    const resp = await getStores();

    if (resp) {
      const formattedData = resp.map(item => ({
        id: item.id,
        title: item.name,
        subtitle: item.address.direction,
        disclaimer: t('schedule', {
          from: item.schedule.from,
          end: item.schedule.end,
        }),
        handlePress: () => handlePressItem(item),
      }));
      setData(formattedData);
    } else {
      setData([]);
    }
    setLoading(false);
  };

  const handlePressItem = (store: Store) => {
    return navigation.navigate(...(['Details', {store}] as never));
  };

  if (loading) return <ActivityIndicator style={{marginTop: 20}} />;

  return (
    <View style={styles.container}>
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
  noData: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
    alignSelf: 'center',
  },
});

export default HomeScreen;
