import HomeScreen from '../screens/HomeScreen';
import {useTranslation} from 'react-i18next';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailsScreen from '../screens/DetailsScreen';
import CheckInScreen from '../screens/CheckInScreen';

const Stack = createNativeStackNavigator();

/**
 * Navigator stack for home tab
 * Screns: Home (list of all items), Details (detail screen of a selected item)
 */
const HomeNavigator = () => {
  const {t} = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{title: t('home.title')}}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{title: t('details.title')}}
      />
      <Stack.Screen
        name="CheckIn"
        component={CheckInScreen}
        options={{title: t('checkin.title')}}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
