import {Dimensions, StyleSheet} from 'react-native';
import {COLORS} from '../../constants/Colors';
import {SHADOWS} from '../../constants/Shadows';

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width * 0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
    alignSelf: 'center',
    height: 100,
    backgroundColor: COLORS.white,
    ...SHADOWS.card,
  },
  imageContainer: {
    width: '15%',
  },
  contentContainer: {
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
  },
  dataContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '80%',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  address: {
    fontSize: 14,
    fontWeight: 'normal',
    marginVertical: 5
  },
  schedule: {
    fontSize: 10,
    fontWeight: 'normal',
  },
});

export default styles;
