import {Icon} from '@rneui/base';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './CardItem.styles';
import {COLORS} from '../../constants/Colors';

export type CardProps = {
  id: string;
  title: string;
  subtitle: string;
  disclaimer?: string;
  handlePress: () => void;
  disabled?: boolean;
};

/**
 * Component that renders a custom card as items for differents list
 * Use an image, a title, the author and an star (optional) to save the item as favorite
 */
const CardItem = (props: CardProps) => {
  const {title, subtitle, disclaimer, handlePress, disabled = false} = props;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      disabled={disabled}>
      <View style={styles.imageContainer}>
        <Icon type="material" name={'store'} color={COLORS.primary} size={50} />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.dataContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>
          {disclaimer && (
            <Text style={styles.disclaimer} numberOfLines={1}>
              {disclaimer}
            </Text>
          )}
        </View>
        {!disabled && (
          <View style={styles.iconContainer}>
            <Icon
              type="material"
              name={'keyboard-arrow-right'}
              color={COLORS.secondary}
              size={30}
              onPress={handlePress}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CardItem;
