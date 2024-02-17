import {useRoute} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const CheckInScreen = () => {
  const route = useRoute();
  const storeId = (route.params as {storeId: string; taskId: string})?.storeId;
  const taskId = (route.params as {storeId: string; taskId: string})?.taskId;

  return (
    <View style={styles.container}>
      <Text>{storeId}</Text>
      <Text>{taskId}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 70,
  },
});

export default CheckInScreen;
