import {Icon} from '@rneui/base';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './CardItem.styles';
import {COLORS} from '../../constants/Colors';

export type CardProps = {
  id: string;
  name: string;
  address: string;
  schedule: string;
  handlePress: () => void;
};

/**
 * Component that renders a custom card as items for differents list
 * Use an image, a title, the author and an star (optional) to save the item as favorite
 */
const CardItem = (props: CardProps) => {
  const {name, address, schedule, handlePress} = props;

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.imageContainer}>
        <Icon type="material" name={'store'} color={COLORS.primary} size={50} />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.dataContainer}>
          <Text style={styles.name} numberOfLines={2}>
            {name}
          </Text>
          <Text style={styles.address} numberOfLines={1}>
            {address}
          </Text>
          <Text style={styles.schedule} numberOfLines={1}>
            {schedule}
          </Text>
        </View>
        <View style={styles.iconContainer}>
          <Icon
            type="material"
            name={'keyboard-arrow-right'}
            color={COLORS.secondary}
            size={30}
            onPress={handlePress}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardItem;
