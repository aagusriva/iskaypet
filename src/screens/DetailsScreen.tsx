import {useRoute} from '@react-navigation/native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Text, View} from 'react-native';

/**
 * Screen that renders an entire detail of an item.
 * Should receive an id by route params and with that id fetch the necessary data to render the item
 */
const DetailsScreen = () => {
  const {t} = useTranslation();
  const route = useRoute();
  const id = (route.params as {id: number})?.id;

  console.log('id', id);

  return (
    <View>
      <Text>{t('details.title')}</Text>
    </View>
  );
};

export default DetailsScreen;
