import {useNavigation, useRoute} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {postCheckin, resetStore} from '../api/stores';
import {Button} from '@rneui/themed';
import {useTranslation} from 'react-i18next';
import {COLORS} from '../constants/Colors';

const LOADING_ANIMATION = require('../../assets/json/loading.json');
const SUCCESS_ANIMATION = require('../../assets/json/success.json');
const FAIL_ANIMATION = require('../../assets/json/fail.json');

type PropsAnimation = {
  loading: boolean;
  success: boolean;
};

const RenderAnimation = ({loading, success}: PropsAnimation) => {
  if (!loading) {
    return (
      <LottieView
        source={success ? SUCCESS_ANIMATION : FAIL_ANIMATION}
        autoPlay
        style={styles.lottie}
        loop={false}
      />
    );
  } else {
    return (
      <LottieView
        source={LOADING_ANIMATION}
        autoPlay
        loop
        style={styles.lottie}
      />
    );
  }
};

const CheckInScreen = () => {
  const {t} = useTranslation('');
  const navigation = useNavigation();
  const route = useRoute();
  const storeId = (route.params as {storeId: string; taskId: string})?.storeId;
  const taskId = (route.params as {storeId: string; taskId: string})?.taskId;
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    apiCall(storeId, taskId);
  }, [storeId, taskId]);

  const apiCall = useCallback(async (storeId: string, taskId: string) => {
    setLoading(true);
    const resp = await postCheckin({storeId, taskId});
    // const resp = await resetStore();
    if (resp) {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
    setLoading(false);
  }, []);

  const goHome = () => {
    return navigation.navigate(...(['Home'] as never));
  };

  return (
    <View style={styles.container}>
      <RenderAnimation loading={loading} success={success} />
      {!success && (
        <Button
          title={t('checkin.retry')}
          onPress={() => apiCall(storeId, taskId)}
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
        />
      )}
      {!loading && (
        <Button
          title={t('checkin.goHome')}
          type={!success ? 'clear' : 'solid'}
          onPress={goHome}
          containerStyle={{
            ...styles.buttonContainer,
            bottom: !success ? 50 : 100,
          }}
          buttonStyle={success ? styles.button : undefined}
          titleStyle={!success ? styles.link : undefined}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {width: 200, height: 200},
  buttonContainer: {
    width: '90%',
    position: 'absolute',
    bottom: 100,
  },
  button: {
    width: '100%',
    backgroundColor: COLORS.primary,
  },
  link: {
    color: COLORS.primary,
  },
});

export default CheckInScreen;
