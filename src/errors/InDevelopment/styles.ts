import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorImage: {
    width: 400,
    height: 400,

    marginTop: -50,
  },
  errorText: {
    fontSize: 22,
    fontFamily: 'Roboto-Bold',
    color: '#303030',
    textAlign: 'center',

    marginHorizontal: 25,
    marginBottom: 10,
  },
  tipsText: {
    fontSize: 18,
    fontFamily: 'Roboto-Medium',
    color: '#9A9A9A',
    textAlign: 'center',

    marginHorizontal: 35,
  },
});
